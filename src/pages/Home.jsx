import React from 'react';
import NetworkMonitor from '../components/NetworkMonitor';
import './Pages.css';

const Home = () => {
  const skills = [
    { name: 'Kali Linux', icon: 'fab fa-linux' },
    { name: 'Cisco', icon: 'fas fa-network-wired' },
    { name: 'Metasploit', icon: 'fas fa-bug' },
    { name: 'Wireshark', icon: 'fas fa-network-wired' },
    { name: 'Parrot OS', icon: 'fas fa-dove' },
    { name: 'Maltego', icon: 'fas fa-project-diagram' },
    { name: 'OWASP ZAP', icon: 'fas fa-bolt' },
    { name: 'Burp Suite', icon: 'fas fa-user-secret' },
    { name: 'Nmap', icon: 'fas fa-search' },
    { name: 'Splunk', icon: 'fas fa-chart-line' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'Kubernetes', icon: 'fas fa-dharmachakra' },
    { name: 'Microsoft Windows', icon: 'fab fa-windows' },
    { name: 'Amazon Web Services', icon: 'fab fa-aws' },
    { name: 'Ansible', icon: 'fas fa-cogs' },
    { name: 'Terraform', icon: 'fas fa-layer-group' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'Grafana', icon: 'fas fa-chart-pie' },
    { name: 'Prometheus', icon: 'fas fa-chart-area' },
    { name: 'Ubuntu', icon: 'fab fa-ubuntu' },
    { name: 'Elasticsearch', icon: 'fas fa-search-plus' }
  ];

  return (
    <div className="page">
      <div className="hero">
        <div className="photo-col">
          <div className="pixel-photo-card">
            <div className="avatar-large">
              <i className="fas fa-laptop-code"></i>
            </div>
            <p className="photo-caption">Network & Security Engineer</p>
          </div>
        </div>
        <div className="bio-col">
          <h1># Hi, I'm Diva Ahmad Pradana</h1>
          <div className="description">
            Based in Yogyakarta, Indonesia ID &nbsp;|&nbsp; Onsite
          </div>
          <div className="description">
            A <strong>Network Infrastructure & Cyber Security Enthusiast</strong> focused on designing, implementing, and securing modern network systems. I have a deep interest in network architecture that is structured, efficient, and secure by design.
          </div>
          <div className="description">
            My specialization covers network design, server configuration, and the application of security principles such as segmentation, access control, and monitoring. With an analytical approach and strong technical understanding, I am committed to building infrastructure that is not only stable and scalable, but also resilient against cyber threats.
          </div>
          <button className="pixel-btn-blue" onClick={() => alert('📄 Download Resume - Diva Ahmad Pradana')}>
            📎 DOWNLOAD RESUME
          </button>
        </div>
      </div>

      <div className="section-title"><i className="fas fa-tools"></i> Skills</div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <i className={skill.icon}></i>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>

      {/* GARIS PEMBATAS */}
      <div className="section-divider"></div>

      {/* NETWORK MONITOR */}
      <div className="section-title"><i className="fas fa-signal"></i> Network Monitor</div>
      <NetworkMonitor />
    </div>
  );
};

export default Home;