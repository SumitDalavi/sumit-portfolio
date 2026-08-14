import React, { useState } from 'react';
import { Award, Briefcase, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Certifications = () => {
  const [showAllCerts, setShowAllCerts] = useState(false);

  const certs = [
    { title: "Career Essentials in GitHub", issuer: "Microsoft & LinkedIn", date: "", url: "https://www.linkedin.com/learning/certificates/4f871718a297191512ab2f7d6ff99b7a1596f8a987d724b1db5578bb6a90a255" },
    { title: "Career Essentials in GitHub Copilot", issuer: "Microsoft & LinkedIn", date: "", url: "https://www.linkedin.com/learning/certificates/6edff49296042969651c38fe65cf0ec221b81500fef73b64de61de2a3f8ed793" },
    { title: "Career Essentials in Cybersecurity", issuer: "Microsoft & LinkedIn", date: "", url: "https://www.linkedin.com/learning/certificates/776729e64308169345a9f1137f606c668bf1388d490e971363156284f9fb6428" },
    { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", date: "", url: "https://www.linkedin.com/learning/certificates/0e378ce53aaee986999d65ed1bf3b7339c8e26c25c86c707c49057bbde99ae41" },
    { title: "Career Essentials in System Administration", issuer: "Microsoft & LinkedIn", date: "", url: "https://www.linkedin.com/learning/certificates/791392474590ae545334aa23c36f7015fd1dc5b8a0817c201c63e43ea0ee489d" },
    { title: "Career Essentials in Software Development", issuer: "Microsoft & LinkedIn", date: "", url: "https://www.linkedin.com/learning/certificates/19e1540d08a311956d3859d54e0678c1e824a9db8aa25ee98b75c04119292e67" },
    { title: "Docker Foundations Professional Certificate", issuer: "Docker", date: "", url: "https://www.linkedin.com/learning/certificates/86e9ede500c2b9820ae770e1ab6e83bb9059db2d449fd15808bc1e41222fcf2d" },
    { title: "Atlassian Agile Project Management", issuer: "Atlassian", date: "", url: "https://www.linkedin.com/learning/certificates/d2645909f6a2426b9fd9464bb715222dbf1f67af9a18a5f96b6b527f37ab75a3" },
    { title: "Responsible AI Foundations", issuer: "All Tech Is Human / UN", date: "", url: "https://www.linkedin.com/learning/certificates/2c392dda993cf9ef408788bb37bdab1899937d5db8d7a1584ddcd46019d03c9d" },
    { title: "DevOps Certification Training", issuer: "Simplilearn", date: "", url: "https://www.linkedin.com/learning/certificates/a932b18b7b3c18a4a17b50c757c30ede8f2fb31d4794c6725da4bd1d8f028454" },
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
          {/* Experience Summary */}
          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Briefcase size={28} className="text-gradient" />
              <h3 style={{ fontSize: '1.75rem' }}>Experience Profile</h3>
            </div>
            
            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '1.5rem' }}>
              9.5 years of experience spanning backend engineering, cloud infrastructure, CI/CD, GitOps, DevSecOps, and site reliability.
            </p>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "Technical Lead / Senior DevOps (Cloud & Security) @ PTC",
                "Senior Software Engineer @ Excellon Software",
                "Software Development Engineer @ AFour Technologies",
                "Associate Software Developer @ MJB Technology Solutions",
                "Programmer Analyst @ GlobalNest Solutions"
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: 'hsl(var(--accent-primary))', marginTop: '4px' }}>▹</span>
                  <span style={{ fontWeight: idx === 0 ? '600' : '400' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Award size={28} className="text-gradient" />
              <h3 style={{ fontSize: '1.75rem' }}>Certifications & Training</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {displayedCerts.map((cert, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                      {cert.url ? (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }} className="hover-accent">
                          {cert.title} <ExternalLink size={14} />
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h4>
                    <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>{cert.issuer}</span>
                  </div>
                  {cert.date && (
                    <span style={{ background: 'hsla(var(--accent-primary), 0.1)', color: 'hsl(var(--accent-primary))', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
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
