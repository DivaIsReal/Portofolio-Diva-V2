import React, { useState, useEffect, useRef } from 'react';
import './NetworkMonitor.css';

const NetworkMonitor = () => {
  const [metrics, setMetrics] = useState({
    cpu: 38,
    memory: 37,
    disk: 48,
    network: 16,
    latency: 20,
    packets: 7.263,
    bandwidth: 92,
    portScan: 'NONE'
  });

  const [logs, setLogs] = useState([
    { text: '[17:55:02] INFO ARP table updated: 3 new entries', type: 'info' },
    { text: '[17:55:05] WARN MTU mismatch detected on vlan28', type: 'warning' },
    { text: '[17:55:14] OK BGP session re-established with peer', type: 'ok' },
    { text: '[17:56:14] INFO Packet inspection active on eth0', type: 'info' },
    { text: '[17:57:14] OK Firewall rules validated successfully', type: 'ok' },
    { text: '[17:57:25] INFO DNS query resolved: 8.8.8.8', type: 'info' },
    { text: '[17:57:26] OK SSL handshake completed', type: 'ok' },
    { text: '[INFO] New connection established: 167.162.1.105', type: 'info' }
  ]);

  const logContainerRef = useRef(null);

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: random(30, 75),
        memory: random(30, 70),
        disk: random(20, 60),
        network: random(10, 50),
        latency: random(15, 45),
        packets: parseFloat((random(5000, 12000) / 1000).toFixed(3)),
        bandwidth: random(50, 150),
        portScan: (() => {
          const scanStatus = ['NONE', 'SCANNING', 'BLOCKED', 'NONE', 'NONE'];
          return scanStatus[Math.floor(Math.random() * scanStatus.length)];
        })()
      }));

      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour12: false });
      
      const logMessages = [
        `[${time}] INFO Packet captured: ${random(100, 999)} bytes`,
        `[${time}] OK NAT table updated successfully`,
        `[${time}] WARN High latency detected on interface eth0`,
        `[${time}] INFO DNS cache refreshed (${random(10, 50)} entries)`,
        `[${time}] OK SSL certificate valid for 30 days`,
        `[${time}] INFO New connection from ${random(10, 200)}.${random(1, 255)}.${random(1, 255)}.${random(1, 255)}`,
        `[${time}] INFO Firewall rule #${random(1, 20)} applied`,
        `[${time}] OK BGP neighbor ${random(1, 255)}.${random(1, 255)}.${random(1, 255)}.${random(1, 255)} established`
      ];
      
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      const logType = randomLog.includes('WARN') ? 'warning' : (randomLog.includes('OK') ? 'ok' : 'info');
      
      setLogs(prev => {
        const newLogs = [...prev, { text: randomLog, type: logType }];
        while (newLogs.length > 12) newLogs.shift();
        return newLogs;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getPortScanClass = () => {
    if (metrics.portScan === 'SCANNING') return 'status-warning';
    if (metrics.portScan === 'BLOCKED') return 'status-danger';
    return 'status-active';
  };

  return (
    <div className="network-monitor">
      <div className="monitor-header">
        <span className="monitor-status">● LIVE MONITORING</span>
      </div>
      
      <div className="monitor-grid">
        {/* SYSTEM STATUS */}
        <div className="monitor-card">
          <h4><i className="fas fa-server"></i> SYSTEM STATUS</h4>
          <div className="metric-row">
            <span className="metric-label">CPU Usage:</span>
            <span className="metric-value">{metrics.cpu}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${metrics.cpu}%` }}></div>
          </div>
          
          <div className="metric-row">
            <span className="metric-label">Memory:</span>
            <span className="metric-value">{metrics.memory}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${metrics.memory}%` }}></div>
          </div>
          
          <div className="metric-row">
            <span className="metric-label">Disk I/O:</span>
            <span className="metric-value">{metrics.disk}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${metrics.disk}%` }}></div>
          </div>
          
          <div className="metric-row">
            <span className="metric-label">Network:</span>
            <span className="metric-value">{metrics.network}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${metrics.network}%` }}></div>
          </div>
        </div>

        {/* THREAT MONITOR */}
        <div className="monitor-card">
          <h4><i className="fas fa-shield-alt"></i> THREAT MONITOR</h4>
          <div className="metric-row">
            <span className="metric-label">Firewall:</span>
            <span className="metric-value status-active">ACTIVE</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">IDS/IPS:</span>
            <span className="metric-value status-active">MONITORING</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">VPN Tunnel:</span>
            <span className="metric-value status-active">ENCRYPTED</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">Port Scan:</span>
            <span className={`metric-value ${getPortScanClass()}`}>{metrics.portScan}</span>
          </div>
        </div>

        {/* CONNECTION STATS */}
        <div className="monitor-card">
          <h4><i className="fas fa-signal"></i> CONNECTION STATS</h4>
          <div className="metric-row">
            <span className="metric-label">LATENCY:</span>
            <span className="metric-value">{metrics.latency} ms</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">UPTIME:</span>
            <span className="metric-value">99.9%</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">PACKETS/S:</span>
            <span className="metric-value">{metrics.packets.toFixed(3)}</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">BANDWIDTH:</span>
            <span className="metric-value">{metrics.bandwidth} Mb</span>
          </div>
        </div>
      </div>

      {/* CONNECTION LOG */}
      <div className="log-section">
        <div className="log-header"><i className="fas fa-file-alt"></i> CONNECTION LOG</div>
        <div className="log-entries" ref={logContainerRef}>
          {logs.map((log, index) => (
            <div key={index} className={`log-entry ${log.type}`}>
              {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkMonitor;