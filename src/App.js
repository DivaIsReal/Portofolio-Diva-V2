import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contents from './pages/Contents';
import Achievements from './pages/Achievements';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import './App.css';

const VALID_PAGES = ['home', 'about', 'contents', 'achievements', 'projects', 'dashboard', 'contact'];

const PAGE_TO_PATH = {
  home: '/',
  about: '/about',
  contents: '/contents',
  achievements: '/achievements',
  projects: '/projects',
  dashboard: '/dashboard',
  contact: '/contact'
};

const normalizePathname = (pathname) => {
  if (!pathname) {
    return '/';
  }

  if (pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '').toLowerCase() || '/';
};

const getPageFromUrl = () => {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const url = new URL(window.location.href);
  const pathname = normalizePathname(url.pathname);
  const fromPath = Object.entries(PAGE_TO_PATH).find(([, pagePath]) => pagePath === pathname)?.[0];

  if (fromPath) {
    return fromPath;
  }

  const legacyPageParam = url.searchParams.get('page');
  return VALID_PAGES.includes(legacyPageParam) ? legacyPageParam : 'home';
};

const updatePageInUrl = (activePage, mode = 'push') => {
  if (typeof window === 'undefined') {
    return;
  }

  const url = new URL(window.location.href);
  const nextPage = VALID_PAGES.includes(activePage) ? activePage : 'home';
  url.pathname = PAGE_TO_PATH[nextPage] || '/';

  url.searchParams.delete('page');

  if (nextPage !== 'projects') {
    url.searchParams.delete('project');
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const nextState = { ...(window.history.state || {}), page: nextPage };

  if (mode === 'replace') {
    window.history.replaceState(nextState, '', nextUrl);
    return;
  }

  window.history.pushState(nextState, '', nextUrl);
};

function App() {
  const [activePage, setActivePage] = useState(() => getPageFromUrl());
  const [displayPage, setDisplayPage] = useState(() => getPageFromUrl());
  const [transitionStage, setTransitionStage] = useState('enter');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('id');
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    updatePageInUrl(getPageFromUrl(), 'replace');

    const handlePopState = () => {
      setActivePage(getPageFromUrl());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleSetActivePage = (nextPage) => {
    if (!VALID_PAGES.includes(nextPage)) {
      return;
    }

    setActivePage(nextPage);
    updatePageInUrl(nextPage, 'push');
  };

  useEffect(() => {
    if (activePage === 'projects' || typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);

    if (!url.searchParams.has('project')) {
      return;
    }

    url.searchParams.delete('project');
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }, [activePage]);

  useEffect(() => {
    if (activePage === displayPage) {
      return;
    }

    setTransitionStage('exit');

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setDisplayPage(activePage);
      setTransitionStage('enter');
    }, 180);

    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [activePage, displayPage]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const renderPage = (page) => {
    switch(page) {
      case 'home': return <Home />;
      case 'about': return <About />;
      case 'contents': return <Contents />;
      case 'achievements': return <Achievements />;
      case 'projects': return <Projects />;
      case 'dashboard': return <Dashboard />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        setActivePage={handleSetActivePage}
        activePage={activePage}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="content-wrapper">
        <div className={`content-right page-shell page-shell--${transitionStage}`}>
          {renderPage(displayPage)}
        </div>
      </div>
    </div>
  );
}

export default App;