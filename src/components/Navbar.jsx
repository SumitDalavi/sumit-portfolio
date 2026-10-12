import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Case Studies", href: "#projects" },
    { label: "Career & Leadership", href: "#timeline" },
    { label: "Engineering Notes", href: "#engineering-notes" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#experience" }
  ];

  return (
    <header 
      className="navbar-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(11, 17, 32, 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand */}
        <a 
          href="#" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-primary))', textDecoration: 'none' }}
          aria-label="Sumit Dalavi Home"
        >
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Sumit<span className="text-gradient">.Dalavi</span>
          </span>
          <span className="badge-tier" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
            Platform Engineer
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '1.75rem', margin: 0, padding: 0 }}>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href}
                  className="nav-link"
                  style={{
                    color: 'hsl(var(--text-secondary))',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a 
            href="https://github.com/SumitDalavi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-nav-btn"
            aria-label="GitHub Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a 
            href="https://in.linkedin.com/in/sumit-dalavi-762838129" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-nav-btn"
            aria-label="LinkedIn Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6 1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-drawer animate-fade-in"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'rgba(11, 17, 32, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <nav aria-label="Mobile Navigation">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: 0, padding: 0 }}>
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      color: 'hsl(var(--text-primary))',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      display: 'block',
                      textDecoration: 'none'
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
