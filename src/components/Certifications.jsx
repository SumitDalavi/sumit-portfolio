import React, { useState } from 'react';
import { Award, Briefcase, ExternalLink, ChevronDown, ChevronUp, Target } from 'lucide-react';

const Certifications = () => {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showAllImpact, setShowAllImpact] = useState(false);

  const certs = [
    { title: "Career Essentials in Generative AI", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/4f871718a297191512ab2f7d6ff99b7a1596f8a987d724b1db5578bb6a90a255" },
    { title: "Career Essentials in GitHub Copilot Professional Certificate", issuer: "Github", url: "https://www.linkedin.com/learning/certificates/6edff49296042969651c38fe65cf0ec221b81500fef73b64de61de2a3f8ed793" },
    { title: "Career Essentials in Cybersecurity", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/776729e64308169345a9f1137f606c668bf1388d490e971363156284f9fb6428" },
    { title: "Responsible AI in a Global Context Professional Certificate", issuer: "United Nations University", url: "https://www.linkedin.com/learning/certificates/19e1540d08a311956d3859d54e0678c1e824a9db8aa25ee98b75c04119292e67" },
    { title: "DevOps Professional Certificate", issuer: "PagerDuty", url: "https://www.linkedin.com/learning/certificates/4060469d9f5484c4f4a294d9afa40c467132fdcca9270b9f649dbccc5810d4c6" },
    { title: "Career Essentials in Sustainable Tech", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/5b91e37bb7e50559cc4e19436b130b4b331e970c42efc8efa25eb3c4c1872c93" },
    { title: "Docker Foundations Professional Certificate", issuer: "Docker", url: "https://www.linkedin.com/learning/certificates/86e9ede500c2b9820ae770e1ab6e83bb9059db2d449fd15808bc1e41222fcf2d" },
    { title: "Career Essentials in GitHub Professional Certificate", issuer: "Github", url: "https://www.linkedin.com/learning/certificates/d2645909f6a2426b9fd9464bb715222dbf1f67af9a18a5f96b6b527f37ab75a3" },
    { title: "Atlassian Agile Project Management Professional Certificate", issuer: "Atlassian", url: "https://www.linkedin.com/learning/certificates/2c392dda993cf9ef408788bb37bdab1899937d5db8d7a1584ddcd46019d03c9d" },
    { title: "Responsible AI Foundations Professional Certificate", issuer: "All Tech is Human", url: "https://www.linkedin.com/learning/certificates/791392474590ae545334aa23c36f7015fd1dc5b8a0817c201c63e43ea0ee489d" },
    { title: "Microsoft Azure AI Essentials Professional Certificate", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/14eca8904c6842bc9815bd436823f8a19186441016bcdb27b2187b513035b133" },
    { title: "Microsoft 365 Copilot Essentials Professional Certificate", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/ee2bb658c1780c432c54165cd51b30556286caf7374bf49d2eedd2522db1d2d0" },
    { title: "Microsoft Azure Essentials Professional Certificate", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/2c6b9337ae638b9128edeefbcd6a6bdd19dbdc87f72883df53f36d0c7a8471a3" },
    { title: "Microsoft Security Essentials Professional Certificate", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/5f7fa917defe005ae440fc27a14f2e21d18a7ee3eb5f221a46f22d3ba12cfc4f" },
    { title: "Ubuntu Linux Professional Certificate", issuer: "Canonical", url: "https://www.linkedin.com/learning/certificates/6ecea536d353db15110ec08cb247ebfc2ff7d9878523a604aa49c0e1dc4b6d06" },
    { title: "Career Essentials in System Administration", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/0e378ce53aaee986999d65ed1bf3b7339c8e26c25c86c707c49057bbde99ae41" },
    { title: "Career Essentials in Software Development", issuer: "Microsoft", url: "https://www.linkedin.com/learning/certificates/a932b18b7b3c18a4a17b50c757c30ede8f2fb31d4794c6725da4bd1d8f028454" },
    { title: "Security Champion", issuer: "PTC Software", date: "2022–2026" },
    { title: "Diploma in Japanese (JLPT N4)", issuer: "SPPU, Pune", date: "2021" }
  ];

  const impacts = [
    "Led ThingWorx Flow's Jenkins-to-GitHub Actions CI/CD migration, authoring automation scripts that contributed to reducing deployment lead time by ~70%.",
    "Contributed to accelerating vulnerability remediation cycles by ~40% across Atlas Flow and ThingWorx Flow by implementing automated SAST/DAST scanning pipelines and integrated Jira triage workflows.",
    "Drove cloud infrastructure cost-optimization by architecting selective migrations from durable message queues to high-performance in-memory datastores for non-critical flows.",
    "Facilitated proactive security initiatives including threat modeling, disaster recovery exercises, and automated secret rotation workflows via Azure Key Vault.",
    "Contributed to maintaining ~99.95% SaaS platform uptime through proactive Datadog and Prometheus observability, alerting thresholds, and SLO tracking.",
    "Reduced manual release effort by ~60% across the engineering organization via Docker and Rancher-driven deployment automation."
  ];

  const displayedCerts = showAllCerts ? certs : certs.slice(0, 10);
  const displayedImpacts = showAllImpact ? impacts : impacts.slice(0, 4);

  return (
    <section id="experience" className="section animate-fade-in delay-300">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Experience</span> & Professional Development
        </h2>

        <div className="grid grid-2" style={{ alignItems: 'flex-start' }}>
          {/* Experience & Impact Summary */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Briefcase size={28} className="text-gradient" />
              <h3 style={{ fontSize: '1.75rem' }}>Selected Impact</h3>
            </div>

            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '2rem', lineHeight: '1.7' }}>
              Across my <strong>10 years</strong> of engineering, I focus on measurable improvements to delivery pipelines, cloud infrastructure, and platform security:
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {displayedImpacts.map((impact, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Target size={20} style={{ color: 'hsl(var(--accent-primary))', marginTop: '3px', flexShrink: 0 }} />
                  <span dangerouslySetInnerHTML={{ __html: impact.replace(/~(\d+%)/g, '<strong>~$1</strong>') }} />
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => setShowAllImpact(!showAllImpact)}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {showAllImpact ? (
                  <>Show Less <ChevronUp size={16} /></>
                ) : (
                  <>Show More Impact <ChevronDown size={16} /></>
                )}
              </button>
            </div>
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

              <a href="https://in.linkedin.com/in/sumit-dalavi-762838129/details/certifications/" target="_blank" rel="noopener noreferrer" className="btn btn-linkedin" style={{ width: '100%', justifyContent: 'center' }}>
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
