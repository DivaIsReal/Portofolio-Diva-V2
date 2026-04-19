import React, { useEffect, useMemo, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { createImageUrlBuilder } from '@sanity/image-url';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import './Pages.css';
import { hasSanityConfig, sanityClient } from '../lib/sanity';

const imageBuilder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

const getSelectedProjectFromUrl = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return new URLSearchParams(window.location.search).get('project');
};

const updateProjectParamInUrl = (projectId, mode = 'push') => {
  if (typeof window === 'undefined') {
    return;
  }

  const url = new URL(window.location.href);

  if (projectId) {
    url.searchParams.set('project', projectId);
  } else {
    url.searchParams.delete('project');
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;

  if (mode === 'replace') {
    window.history.replaceState({ project: projectId || null }, '', nextUrl);
    return;
  }

  window.history.pushState({ project: projectId || null }, '', nextUrl);
};

const urlFromAssetRef = (assetRef) => {
  if (!assetRef || typeof assetRef !== 'string' || !sanityClient) {
    return null;
  }

  const parts = assetRef.split('-');
  if (parts.length < 4) {
    return null;
  }

  const id = parts[1];
  const dimension = parts[2];
  const format = parts[3];

  return `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${id}-${dimension}.${format}`;
};

const urlFor = (source) => {
  if (!imageBuilder || !source) {
    return null;
  }

  return imageBuilder.image(source).auto('format').fit('max').width(1400).url();
};

const getDocumentationImageUrl = (value) => {
  return value?.assetUrl || urlFor(value) || urlFromAssetRef(value?.asset?._ref) || null;
};

const normalizeMarkdownDocumentation = (value) => {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');
};

const CommandCodeBlock = ({ code = '' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1200);
    } catch (error) {
      setIsCopied(false);
    }
  };

  return (
    <div className="project-command-card">
      <div className="project-command-header">
        <div className="project-command-left">
          <span className="project-command-dot project-command-dot-red" aria-hidden="true"></span>
          <span className="project-command-dot project-command-dot-yellow" aria-hidden="true"></span>
          <span className="project-command-dot project-command-dot-green" aria-hidden="true"></span>
          <span className="project-command-badge">CODE</span>
        </div>
        <button type="button" className="project-command-copy" onClick={handleCopy}>
          <i className="far fa-copy"></i> {isCopied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const portableTextComponents = {
  types: {
    commandBlock: ({ value }) => (
      <CommandCodeBlock code={value?.code || ''} />
    ),
    image: ({ value }) => {
      const imageUrl = getDocumentationImageUrl(value);

      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="project-doc-figure">
          <img
            src={imageUrl}
            alt={value?.alt || 'Project documentation image'}
            className="project-doc-image"
            loading="lazy"
          />
          {value?.caption && <figcaption className="project-doc-caption">{value.caption}</figcaption>}
        </figure>
      );
    }
  }
};

const markdownComponents = {
  code({ inline, children }) {
    const code = String(children || '').replace(/\n$/, '');

    if (inline) {
      return <code>{code}</code>;
    }

    return <CommandCodeBlock code={code} />;
  },
  img({ src, alt }) {
    if (!src) {
      return null;
    }

    return (
      <figure className="project-doc-figure">
        <img src={src} alt={alt || 'Project documentation image'} className="project-doc-image" loading="lazy" />
      </figure>
    );
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(() => getSelectedProjectFromUrl());
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setSelectedProject(getSelectedProjectFromUrl());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!hasSanityConfig || !sanityClient) {
        setLoadError('Konfigurasi Sanity belum diisi di file .env.');
        return;
      }

      setIsLoading(true);
      setLoadError('');

      try {
        const query = `*[_type == "project"] | order(_createdAt desc) {
          _id,
          title,
          "slug": slug.current,
          summary,
          techStack,
          status,
          repoUrl,
          demoUrl,
          "thumbnailUrl": thumbnail.asset->url,
          documentation[]{
            ...,
            _type == "image" => {
              ...,
              "assetUrl": asset->url
            }
          }
        }`;

        const sanityProjects = await sanityClient.fetch(query);

        if (Array.isArray(sanityProjects)) {
          setProjects(sanityProjects);
        }
      } catch (error) {
        setLoadError('Gagal memuat project dari Sanity.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const detailProject = useMemo(() => {
    if (!selectedProject) {
      return null;
    }

    return projects.find((project) => (project.slug || project._id) === selectedProject) || null;
  }, [projects, selectedProject]);

  const renderDocumentation = (documentationValue) => {
    if (!documentationValue) {
      return <p className="project-doc-empty">Dokumentasi belum ditambahkan.</p>;
    }

    if (Array.isArray(documentationValue)) {
      return (
        <div className="project-doc-markdown">
          <PortableText value={documentationValue} components={portableTextComponents} />
        </div>
      );
    }

    return (
      <div className="project-doc-markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
          {normalizeMarkdownDocumentation(documentationValue)}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="page">
      <h1><i className="fas fa-folder-open"></i> Projects</h1>

      {isLoading && <p className="projects-info">Memuat data project dari Sanity...</p>}
      {loadError && <p className="projects-info">{loadError}</p>}

      {!detailProject ? (
        projects.length > 0 ? (
          <div className="projects-grid projects-grid-enhanced">
            {projects.map((project) => (
              <div key={project._id || project.slug} className="project-card">
                <div className="project-thumbnail-wrap">
                  {project.thumbnailUrl ? (
                    <img src={project.thumbnailUrl} alt={project.title} className="project-thumbnail" />
                  ) : (
                    <div className="project-thumbnail project-thumbnail-placeholder">
                      <i className="fas fa-image"></i>
                    </div>
                  )}
                </div>
                <h4>{project.title}</h4>
                <p>{project.summary || 'Deskripsi belum tersedia.'}</p>

                <div className="project-tags">
                  {(project.techStack || []).slice(0, 4).map((tech) => (
                    <span key={tech} className="project-tag">{tech}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="project-detail-btn"
                  onClick={() => {
                    const projectId = project.slug || project._id;
                    setSelectedProject(projectId);
                    updateProjectParamInUrl(projectId, 'push');
                  }}
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <p className="projects-info">Belum ada project dipublish di Sanity.</p>
        )
      ) : (
        <section className="project-detail">
          <button
            type="button"
            className="project-back-btn"
            onClick={() => {
              setSelectedProject(null);
              updateProjectParamInUrl(null, 'replace');
            }}
          >
            <i className="fas fa-arrow-left"></i> Kembali ke daftar project
          </button>

          <div className="project-detail-hero">
            {detailProject.thumbnailUrl ? (
              <img src={detailProject.thumbnailUrl} alt={detailProject.title} className="project-detail-image" />
            ) : (
              <div className="project-detail-image project-thumbnail-placeholder">
                <i className="fas fa-image"></i>
              </div>
            )}

            <div className="project-detail-meta">
              <h2>{detailProject.title}</h2>
              <p>{detailProject.summary || 'Ringkasan belum tersedia.'}</p>
              <div className="project-detail-tags">
                {(detailProject.techStack || []).map((tech) => (
                  <span key={tech} className="project-tag">{tech}</span>
                ))}
              </div>
              {detailProject.status && <div className="project-status">Status: {detailProject.status}</div>}

              <div className="project-links">
                {detailProject.repoUrl && (
                  <a href={detailProject.repoUrl} target="_blank" rel="noreferrer" className="project-link-btn">
                    <i className="fab fa-github"></i> Repository
                  </a>
                )}
                {detailProject.demoUrl && (
                  <a href={detailProject.demoUrl} target="_blank" rel="noreferrer" className="project-link-btn">
                    <i className="fas fa-arrow-up-right-from-square"></i> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="project-doc-section">
            <h3><i className="fas fa-book"></i> Dokumentasi</h3>
            {renderDocumentation(detailProject.documentation)}
          </div>
        </section>
      )}
    </div>
  );
};

export default Projects;