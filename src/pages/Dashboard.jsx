import React from 'react';
import './Pages.css';

const Dashboard = () => {
  const stats = [
    { icon: 'fas fa-server', value: '4', label: 'Server Aktif' },
    { icon: 'fas fa-folder-open', value: '12', label: 'Projects' },
    { icon: 'fas fa-mug-hot', value: '328', label: 'Cangkir Kopi' },
    { icon: 'fas fa-bug', value: '999+', label: 'Bug Fixed' }
  ];

  return (
    <div className="page">
      <h1>📊 Dashboard</h1>
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <i className={stat.icon}></i>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="dashboard-quote">
        🎯 "Keep learning, keep securing!"
      </div>
    </div>
  );
};

export default Dashboard;