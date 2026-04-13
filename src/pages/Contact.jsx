import React from 'react';
import './Pages.css';

const Contact = () => {
  return (
    <div className="page contact-page">
      <section className="about-intro">
        <h1 className="about-title">Kontak</h1>
        <p className="about-subtitle">Mari saling terhubung.</p>
      </section>

      <div className="contact-social-heading">Temukan saya di media sosial</div>

      <div className="contact-cards-grid">
        <div className="contact-card contact-card-gmail contact-card-wide">
          <div className="contact-card-content">
            <h3>Tetap Terhubung</h3>
            <p>Hubungi saya melalui email untuk pertanyaan atau kolaborasi.</p>
            <a href="mailto:divaahmadpradana@gmail.com" className="contact-link-btn" target="_blank" rel="noreferrer">
              Pergi ke Gmail <i className="fas fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          <div className="contact-card-icon"><i className="far fa-envelope"></i></div>
        </div>

        <div className="contact-card contact-card-instagram">
          <div className="contact-card-content">
            <h3>Ikuti Perjalanan Saya</h3>
            <p>Ikuti perjalanan kreatif saya.</p>
            <a href="https://instagram.com/divaisreal" className="contact-link-btn" target="_blank" rel="noreferrer">
              Pergi ke Instagram <i className="fas fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          <div className="contact-card-icon"><i className="fab fa-instagram"></i></div>
        </div>

        <div className="contact-card contact-card-linkedin">
          <div className="contact-card-content">
            <h3>Mari Terhubung</h3>
            <p>Terhubung dengan saya secara profesional.</p>
            <a href="https://www.linkedin.com/in/diva-ahmad-pradana/" className="contact-link-btn" target="_blank" rel="noreferrer">
              Pergi ke Linkedin <i className="fas fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          <div className="contact-card-icon"><i className="fab fa-linkedin"></i></div>
        </div>

        <div className="contact-card contact-card-tiktok">
          <div className="contact-card-content">
            <h3>Bergabung dalam Keseruan</h3>
            <p>Tonton konten yang menarik dan menyenangkan.</p>
            <a href="https://tiktok.com/@divaisreal" className="contact-link-btn" target="_blank" rel="noreferrer">
              Pergi ke Tiktok <i className="fas fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          <div className="contact-card-icon"><i className="fab fa-tiktok"></i></div>
        </div>

        <div className="contact-card contact-card-github">
          <div className="contact-card-content">
            <h3>Jelajahi Kode</h3>
            <p>Jelajahi karya sumber terbuka saya.</p>
            <a href="https://github.com/divaisreal" className="contact-link-btn" target="_blank" rel="noreferrer">
              Pergi ke Github <i className="fas fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          <div className="contact-card-icon"><i className="fab fa-github"></i></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;