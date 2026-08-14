import React, { useState } from 'react';
import { Award, Briefcase, ExternalLink, ChevronDown, ChevronUp, Target } from 'lucide-react';

const Certifications = () => {
  const [showAllCerts, setShowAllCerts] = useState(false);

  const certs = [
    { title: "Career Essentials in Generative AI", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/4f871718a297191512ab2f7d6ff99b7a1596f8a987d724b1db5578bb6a90a255" },
    { title: "Career Essentials in GitHub Copilot Professional Certificate", issuer: "Github", url: "https://www.linkedin.com/learning/certificates/6edff49296042969651c38fe65cf0ec221b81500fef73b64de61de2a3f8ed793" },
    { title: "Career Essentials in Cybersecurity", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/776729e64308169345a9f1137f606c668bf1388d490e971363156284f9fb6428" },
    { title: "Career Essentials in System Administration", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/0e378ce53aaee986999d65ed1bf3b7339c8e26c25c86c707c49057bbde99ae41" },
    { title: "Responsible AI Foundations Professional Certificate", issuer: "All Tech is Human", url: "https://www.linkedin.com/learning/certificates/791392474590ae545334aa23c36f7015fd1dc5b8a0817c201c63e43ea0ee489d" },
    { title: "Responsible AI in a Global Context Professional Certificate", issuer: "United Nations University", url: "https://www.linkedin.com/learning/certificates/19e1540d08a311956d3859d54e0678c1e824a9db8aa25ee98b75c04119292e67" },
    { title: "Docker Foundations Professional Certificate", issuer: "Docker", url: "https://www.linkedin.com/learning/certificates/86e9ede500c2b9820ae770e1ab6e83bb9059db2d449fd15808bc1e41222fcf2d" },
    { title: "Career Essentials in GitHub Professional Certificate", issuer: "Github", url: "https://www.linkedin.com/learning/certificates/d2645909f6a2426b9fd9464bb715222dbf1f67af9a18a5f96b6b527f37ab75a3" },
    { title: "Atlassian Agile Project Management Professional Certificate", issuer: "Atlassian", url: "https://www.linkedin.com/learning/certificates/2c392dda993cf9ef408788bb37bdab1899937d5db8d7a1584ddcd46019d03c9d" },
    { title: "Career Essentials in Software Development", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/a932b18b7b3c18a4a17b50c757c30ede8f2fb31d4794c6725da4bd1d8f028454" },
    { title: "Security Champion", issuer: "PTC Software", date: "2022–Present" },
    { title: "Diploma in Japanese (JLPT N4)", issuer: "SPPU, Pune", date: "2021" }
  ];

  const displayedCerts = showAllCerts ? certs : certs.slice(0, 4);

  return (
    <section className="section animate-fade-in delay-300">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Experience</span> & Professional Development
        </h2>
        
        <div className="grid grid-2">
          {/* Experience & Impact Summary */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Briefcase size={28} className="text-gradient" />
              <h3 style={{ fontSize: '1.75rem' }}>Selected Impact</h3>
            </div>
            
            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2rem', lineHeight: '1.7' }}>
              Across my <strong>9.5 years</strong> of engineering at PTC, Excellon, and AFour, I focus on measurable improvements to delivery pipelines and platform security:
            </p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Target size={20} style={{ color: 'hsl(var(--accent-primary))', marginTop: '3px', flexShrink: 0 }} />
                <span>
                  Led a Jenkins-to-GitHub Actions CI/CD migration for ThingWorx Flow, authoring 8,000+ lines of automation scripts that <strong>cut deployment lead time by ~70%</strong>.
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Target size={20} style={{ color: 'hsl(var(--accent-primary))', marginTop: '3px', flexShrink: 0 }} />
                <span>
                  Improved vulnerability remediation cycles by <strong>~40%</strong> by implementing automated SAST/DAST (Checkmarx, Veracode, Invicti) and automated Jira triage.
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Target size={20} style={{ color: 'hsl(var(--accent-primary))', marginTop: '3px', flexShrink: 0 }} />
                <span>
                  Maintained <strong>~99.95% uptime</strong> for enterprise SaaS platforms (Atlas Flow & ThingWorx Flow) via comprehensive Datadog/Prometheus observability and SLOs.
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Target size={20} style={{ color: 'hsl(var(--accent-primary))', marginTop: '3px', flexShrink: 0 }} />
                <span>
                  Reduced manual release effort by <strong>~60%</strong> at Excellon Software via Docker/Rancher driven deployments.
                </span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Award size={28} className="text-gradient" />
              <h3 style={{ fontSize: '1.75rem' }}>Certifications</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {displayedCerts.map((cert, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                  <div style={{ paddingRight: '1rem' }}>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem', lineHeight: '1.4' }}>
                      {cert.url ? (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }} className="hover-accent">
                          {cert.title} <ExternalLink size={14} style={{ flexShrink: 0 }} />
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h4>
                    <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>{cert.issuer}</span>
                  </div>
                  {cert.date && (
                    <span style={{ background: 'hsla(var(--accent-primary), 0.1)', color: 'hsl(var(--accent-primary))', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                      {cert.date}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="btn btn-outline" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {showAllCerts ? (
                  <>Show Less <ChevronUp size={16} /></>
                ) : (
                  <>Show All {certs.length} Certifications <ChevronDown size={16} /></>
                )}
              </button>
              
              <a href="https://in.linkedin.com/in/sumit-dalavi-762838129/details/certifications/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                View Credentials on LinkedIn <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
