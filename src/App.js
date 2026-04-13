import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contents from './pages/Contents';
import Achievements from './pages/Achievements';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  const renderPage = () => {
    switch(activePage) {
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
        setActivePage={setActivePage}
        activePage={activePage}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="content-wrapper">
        <div className="content-right">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;