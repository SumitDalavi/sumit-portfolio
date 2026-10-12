import React from 'react';
import { Code, Globe, Mail, FileText, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="section animate-fade-in" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="container">
        <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)', lineHeight: 1.15, marginBottom: '1rem' }}>
            Hi, I'm <span className="text-gradient">Sumit Dalavi</span>
          </h1>
          <h2 style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.65rem)', color: 'hsl(var(--text-primary))', marginBottom: '1rem', fontWeight: 600, lineHeight: 1.4 }}>
            Senior Platform Engineer building secure, reliable Kubernetes platforms and developer workflows.
          </h2>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <span style={{ background: 'hsla(var(--accent-primary), 0.12)', color: 'hsl(var(--accent-primary))', border: '1px solid hsla(var(--accent-primary), 0.3)', padding: '0.35rem 0.85rem', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 500 }}>
              DevSecOps
            </span>
            <span style={{ background: 'hsla(var(--accent-primary), 0.12)', color: 'hsl(var(--accent-primary))', border: '1px solid hsla(var(--accent-primary), 0.3)', padding: '0.35rem 0.85rem', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 500 }}>
              SRE & Observability
            </span>
            <span style={{ background: 'hsla(var(--accent-primary), 0.12)', color: 'hsl(var(--accent-primary))', border: '1px solid hsla(var(--accent-primary), 0.3)', padding: '0.35rem 0.85rem', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 500 }}>
              Cloud Infrastructure
            </span>
          </div>
          <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            With <strong>10 years of engineering experience</strong> spanning backend systems, cloud infrastructure, CI/CD, GitOps, DevSecOps, and SRE. I specialize in building robust Node.js/TypeScript foundations combined with hands-on ownership of Kubernetes platforms.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            As a <strong>Security Champion</strong> and advocate for <strong>AI-Assisted Engineering</strong>, I have contributed to reducing deployment lead times by ~70% and accelerating vulnerability remediation cycles by ~40% for cloud-native platforms.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/SumitDalavi" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Code size={20} />
              GitHub
            </a>
            <a href="https://in.linkedin.com/in/sumit-dalavi-762838129" target="_blank" rel="noopener noreferrer" className="btn btn-linkedin">
              <Globe size={20} />
              LinkedIn
            </a>
            <a href="mailto:sumit.dalavi1994@gmail.com" className="btn btn-outline">
              <Mail size={20} />
              Contact Email
            </a>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '2rem', left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <a href="#projects" style={{ color: 'hsl(var(--text-secondary))', cursor: 'pointer' }} className="animate-bounce">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <span>Scroll to Explore</span>
            <ChevronDown size={24} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
