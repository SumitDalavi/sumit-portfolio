import React from 'react';
import { Code, Globe, Mail, FileText, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="section animate-fade-in" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="container">
        <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            Hi, I'm <span className="text-gradient">Sumit Dalavi</span>
          </h1>
          <h2 style={{ fontSize: '1.5rem', color: 'hsl(var(--text-secondary))', marginBottom: '2rem', fontWeight: 400 }}>
            Technical Lead | Senior DevOps / Platform Engineer | DevSecOps
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            With over <strong>9.5 years of experience</strong> spanning backend engineering, cloud infrastructure, CI/CD, GitOps, DevSecOps, and SRE. I specialize in building robust Node.js/TypeScript foundations combined with hands-on ownership of Kubernetes platforms.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            As a <strong>Security Champion</strong> and advocate for <strong>AI-Assisted Engineering</strong>, I have a proven track record of cutting deployment lead times by ~70% and improving vulnerability remediation cycles by ~40% for enterprise SaaS platforms at scale.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/SumitDalavi" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Code size={20} />
              GitHub
            </a>
            <a href="https://in.linkedin.com/in/sumit-dalavi-762838129" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Globe size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'hsl(var(--text-secondary))' }} className="animate-bounce">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <span>Scroll to Explore</span>
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
