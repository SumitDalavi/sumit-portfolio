import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '3rem 0', marginTop: '2rem', background: 'hsla(var(--bg-secondary), 0.5)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          <span className="text-gradient">Sumit Dalavi</span>
        </h3>
        <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '1.25rem' }}>
          Technical Lead | Senior DevSecOps / Platform Engineer
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <a href="mailto:sumit.dalavi1994@gmail.com" className="hover-accent" style={{ fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            sumit.dalavi1994@gmail.com
          </a>
        </p>
        <p style={{ fontSize: '0.875rem', color: 'hsla(var(--text-primary), 0.4)' }}>
          &copy; {new Date().getFullYear()} Sumit Dalavi. Built with React & Vite.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
