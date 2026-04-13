import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({
  setActivePage,
  activePage,
  theme,
  setTheme,
  language,
  setLanguage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const labels = {
    id: {
      home: 'BERANDA',
      about: 'TENTANG',
      contents: 'KONTEN',
      achievements: 'PRESTASI',
      projects: 'PROYEK',
      dashboard: 'DASBOR',
      contact: 'KONTAK',
      theme: 'MODE',
      lang: 'BAHASA'
    },
    eng: {
      home: 'HOME',
      about: 'ABOUT',
      contents: 'CONTENTS',
      achievements: 'ACHIEVEMENTS',
      projects: 'PROJECTS',
      dashboard: 'DASHBOARD',
      contact: 'CONTACT',
      theme: 'MODE',
      lang: 'LANG'
    }
  };

  const menuItems = [
    { id: 'home', labelKey: 'home', icon: 'fas fa-home' },
    { id: 'about', labelKey: 'about', icon: 'fas fa-user' },
    { id: 'contents', labelKey: 'contents', icon: 'fas fa-newspaper' },
    { id: 'achievements', labelKey: 'achievements', icon: 'fas fa-trophy' },
    { id: 'projects', labelKey: 'projects', icon: 'fas fa-code-branch' },
    { id: 'dashboard', labelKey: 'dashboard', icon: 'fas fa-chart-line' },
    { id: 'contact', labelKey: 'contact', icon: 'fas fa-envelope' }
  ];

  return (
    <>
      <button
        type="button"
        className="mobile-nav-trigger"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      {isMenuOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-mobile-header">
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="profile-header">
          <div className="pixel-avatar">
            <i className="fas fa-user-astronaut"></i>
          </div>
          <h2>DIVA AHMAD PRADANA</h2>
          <div className="username">@divaisreal</div>
          <div className="profile-toggles">
            <div className="toggle-item">
              <span className="toggle-label">{labels[language].theme}</span>
              <button
                type="button"
                className={`slider-toggle ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
                aria-pressed={theme === 'dark'}
              >
                <span className="toggle-side">L</span>
                <span className="toggle-thumb"></span>
                <span className="toggle-side">D</span>
              </button>
            </div>

            <div className="toggle-item">
              <span className="toggle-label">{labels[language].lang}</span>
              <button
                type="button"
                className={`slider-toggle ${language === 'eng' ? 'active' : ''}`}
                onClick={() => setLanguage(language === 'eng' ? 'id' : 'eng')}
                aria-label="Toggle language"
                aria-pressed={language === 'eng'}
              >
                <span className="toggle-side">ID</span>
                <span className="toggle-thumb"></span>
                <span className="toggle-side">EN</span>
              </button>
            </div>
          </div>
        </div>

        <div className="nav-menu-vertical">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setIsMenuOpen(false);
              }}
              className={activePage === item.id ? 'active' : ''}
            >
              <i className={item.icon}></i> {labels[language][item.labelKey]}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          COPYRIGHT © 2026<br />
          Diva Ahmad Pradana<br />
          All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;