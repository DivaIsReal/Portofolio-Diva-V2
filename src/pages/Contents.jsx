import React from 'react';
import './Pages.css';

const Contents = () => {
  const contents = [
    { title: '🔒 5 Tips Hardening SSH Server', desc: 'Linux security guide for beginners' },
    { title: '🌐 Routing OSPF untuk Pemula', desc: 'Dynamic routing explained' },
    { title: '🐳 Docker untuk Network Lab', desc: 'Containerization for network simulation' },
    { title: '🛡️ IDS/IPS dengan Snort', desc: 'Intrusion detection system' }
  ];

  return (
    <div className="page">
      <h1>📝 Contents & Articles</h1>
      <div className="projects-grid">
        {contents.map((item, index) => (
          <div key={index} className="project-card">
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;