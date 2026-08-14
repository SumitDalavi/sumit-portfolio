import React from 'react';
import { Award, Briefcase } from 'lucide-react';

const Certifications = () => {
  const certs = [
    { title: "Security Champion", issuer: "PTC Software", date: "2022–Present" },
    { title: "Docker Foundations Professional Certificate", issuer: "Docker", date: "" },
    { title: "Atlassian Agile Project Management", issuer: "Atlassian", date: "" },
    { title: "Diploma in Japanese (JLPT N4)", issuer: "SPPU, Pune", date: "2021" },
    { title: "Responsible AI Foundations", issuer: "All Tech Is Human / UN", date: "" }
  ];

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
          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Award size={28} className="text-gradient" />
              <h3 style={{ fontSize: '1.75rem' }}>Certifications & Training</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {certs.map((cert, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{cert.title}</h4>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
