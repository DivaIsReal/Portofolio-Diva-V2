import React, { useEffect, useMemo, useState } from 'react';
import { PortableText } from '@portabletext/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Pages.css';
import { hasSanityConfig, sanityClient } from '../lib/sanity';

const portableTextComponents = {
  types: {
    commandBlock: ({ value }) => (
      <pre>
        <code>{value?.code || ''}</code>
      </pre>
    )
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

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
          documentation
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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {documentationValue}
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
                  onClick={() => setSelectedProject(project.slug || project._id)}
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
          <button type="button" className="project-back-btn" onClick={() => setSelectedProject(null)}>
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