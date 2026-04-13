import React, { useState } from 'react';
import './Pages.css';

const About = () => {
  const [openCareerId, setOpenCareerId] = useState(null);

  const careers = [
    {
      id: 'xcode',
      logo: 'X-C',
      title: 'Penetration Tester & SOC Analyst Tier 2',
      org: 'X-code (PT. Teknologi Server Indonesia) • Daerah Istimewa Yogyakarta, Indonesia',
      period: 'Aug 2025 - Sep 2025 • 2 bulan • Internship • Onsite',
      tasks: [
        'Conducted vulnerability assessment and basic penetration testing on internal network infrastructure.',
        'Monitored SOC alerts, triaged incidents, and escalated suspicious activities for deeper analysis.',
        'Documented findings and provided remediation recommendations to improve security posture.'
      ]
    },
    {
      id: 'kominfo',
      logo: 'KOM',
      title: 'Information Technology Assistant',
      org: 'Kominfo • Sleman, Daerah Istimewa Yogyakarta, Indonesia',
      period: 'Jun 2025 - Jul 2025 • 2 bulan • Internship • Onsite',
      tasks: [
        'Provided technical support and troubleshooting for IT systems, networks, and applications.',
        'Assisted in the maintenance, configuration, and monitoring of hardware and software infrastructure.',
        'Supported IT project implementations and initiatives to improve operational efficiency.'
      ]
    },
    {
      id: 'bipnet',
      logo: 'BIP',
      title: 'Network Operations Center',
      org: 'PT. Broadband Indonesia Pratama (BIPNET) • Daerah Istimewa Yogyakarta, Indonesia',
      period: 'Jan 2023 - Apr 2023 • 4 bulan • Magang • Onsite',
      tasks: [
        'Installed, configured, and maintained network equipment across multiple locations.',
        'Managed cable setups, routers, and switches to ensure optimal connectivity.',
        'Assisted in network troubleshooting and provided technical support to end-users.'
      ]
    }
  ];

  const educations = [
    {
      id: 'uin',
      logo: 'UIN',
      school: 'Universitas Islam Negeri Sunan Kalijaga Yogyakarta',
      degree: "Bachelor's degree • Informatics, (S.Kom)",
      period: '2023 - Present'
    },
    {
      id: 'smk',
      logo: 'SMK',
      school: 'SMK Negeri 1 Pleret',
      degree: 'Vocational High School • Computer and Network Engineering',
      period: '2020 - 2023'
    }
  ];

  return (
    <div className="page about-page">
      <section className="about-intro">
        <h1 className="about-title">Tentang</h1>
        <p className="about-subtitle">Pengenalan singkat mengenai siapa saya.</p>
      </section>

      <section className="about-summary">
        <p className="about-paragraph">
          Saya Diva Ahmad Pradana, seorang Network Infrastructure &amp; Cyber Security Enthusiast yang berbasis di Yogyakarta. Saya berfokus pada perancangan, implementasi, dan pengamanan sistem jaringan modern dengan pendekatan secure by design.
        </p>
        <p className="about-paragraph">
          Spesialisasi saya mencakup network design, konfigurasi server, serta penerapan prinsip keamanan seperti segmentation, access control, dan monitoring. Saya tertarik membangun infrastruktur yang tidak hanya stabil dan skalabel, tetapi juga resilien terhadap ancaman siber.
        </p>
        <p className="about-paragraph">
          Dengan pendekatan analitis dan pemahaman teknis yang kuat, saya berkomitmen untuk mengembangkan solusi jaringan yang selaras dengan kebutuhan operasional serta standar keamanan modern.
        </p>
      </section>

      <section className="career-section">
        <h2 className="career-title"><i className="fas fa-briefcase"></i> Karier</h2>
        <p className="about-subtitle">Perjalanan profesional saya.</p>

        {careers.map((career) => {
          const isOpen = openCareerId === career.id;

          return (
            <div className="career-card" key={career.id}>
              <div className="career-logo">{career.logo}</div>
              <div className="career-content">
                <h3>{career.title}</h3>
                <p className="career-meta">{career.org}</p>
                <p className="career-meta">{career.period}</p>

                <button
                  type="button"
                  className="career-toggle-btn"
                  onClick={() => setOpenCareerId(isOpen ? null : career.id)}
                  aria-expanded={isOpen}
                >
                  <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                  {isOpen ? 'Sembunyikan detail' : 'Tampilkan detail'}
                </button>

                {isOpen && (
                  <div className="career-details">
                    <div className="career-task-title"><i className="fas fa-tasks"></i> TUGAS</div>
                    <ul className="career-tasks">
                      {career.tasks.map((task, idx) => (
                        <li key={idx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <section className="education-section">
        <h2 className="education-title"><i className="fas fa-graduation-cap"></i> Pendidikan</h2>
        <p className="about-subtitle">Perjalanan pendidikan saya.</p>

        {educations.map((education) => (
          <div className="education-card" key={education.id}>
            <div className="education-logo">{education.logo}</div>
            <div className="education-content">
              <h3>{education.school}</h3>
              <p className="career-meta">{education.degree}</p>
              <p className="career-meta">{education.period}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;