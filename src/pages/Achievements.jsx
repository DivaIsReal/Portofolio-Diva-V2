import React from 'react';
import './Pages.css';

const Achievements = () => {
  const achievements = [
    { icon: 'fas fa-check-circle', text: 'CCNA R&S (Cisco) - 2024' },
    { icon: 'fas fa-check-circle', text: 'MikroTik MTCNA - 2023' },
    { icon: 'fas fa-trophy', text: 'Juara 2 CTF Regional 2024' },
    { icon: 'fas fa-book-open', text: 'CompTIA Security+ (On Progress)' }
  ];

  return (
    <div className="page">
      <h1>🏆 Achievements & Certifications</h1>
      <ul className="achievement-list">
        {achievements.map((item, index) => (
          <li key={index}>
            <i className={item.icon}></i> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;