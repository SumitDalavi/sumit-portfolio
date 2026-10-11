import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Award, Building2 } from 'lucide-react';

const CareerTimeline = () => {
  const experiences = [
    {
      company: "PTC Software Pvt Ltd",
      period: "Apr 2022 – Present",
      role: "Technical Lead / Senior DevOps Engineer — Cloud & Security",
      badge: "Current Role",
      summary: "Backend, cloud, and platform engineering across Atlas Flow and ThingWorx Flow. Led ThingWorx Flow's Jenkins-to-GitHub Actions migration; contributed to Atlas Flow's GitLab CI automation; served as Security Champion and supported observability, release governance, and engineering mentorship.",
      highlights: [
        "Led ThingWorx Flow's Jenkins-to-GitHub Actions CI/CD migration, authoring 8,000+ lines of automation scripts that cut deployment lead time by ~70%.",
        "Improved vulnerability remediation cycles by ~40% across Atlas Flow and ThingWorx Flow by implementing automated SAST/DAST scanning pipelines and integrated Jira triage workflows.",
        "Served as appointed Security Champion, leading proactive threat modeling, automated DR exercises, and enterprise-grade secret rotation via Azure Key Vault.",
        "Maintained ~99.95% enterprise SaaS platform uptime via comprehensive Datadog and Prometheus observability and strict SLO enforcement."
      ],
      skills: ["Kubernetes", "DevSecOps", "GitHub Actions", "GitLab CI", "Azure Key Vault", "Security Champion", "Prometheus", "Datadog", "SRE"]
    },
    {
      company: "Excellon Software",
      period: "May 2021 – Apr 2022",
      role: "Senior Software Engineer",
      badge: "Engineering Leadership",
      summary: "Led TypeScript/Node.js backend development for customer-facing applications. Built Azure components and contributed to Azure DevOps delivery workflows, code reviews, and mentoring.",
      highlights: [
        "Led TypeScript and Node.js backend architecture for high-throughput customer-facing enterprise applications.",
        "Engineered cloud infrastructure components on Microsoft Azure and designed automated Azure DevOps continuous delivery workflows.",
        "Contributed to engineering team outcomes reducing manual release effort by ~60% across the organization via Docker containerization and deployment automation."
      ],
      skills: ["TypeScript", "Node.js", "Microsoft Azure", "Azure DevOps", "Docker", "Microservices"]
    },
    {
      company: "AFour Technologies",
      period: "Aug 2019 – Jan 2021",
      role: "Software Development Engineer",
      badge: "Platform & Data",
      summary: "Contributed to the Marchex Audio Redaction and Intent Finder platform using Node.js/TypeScript, Kafka, and containerized microservices. Supported selective cloud-cost optimization, delivery automation, and follow-the-sun production support.",
      highlights: [
        "Engineered streaming event pipelines and microservices for the Marchex Audio Redaction and Intent Finder platform using Node.js/TypeScript and Apache Kafka.",
        "Drove cloud infrastructure cost-optimization by architecting selective data migrations from durable message queues to high-performance in-memory datastores for non-critical flows.",
        "Automated container build delivery workflows and provided follow-the-sun production support for mission-critical client deployments."
      ],
      skills: ["Node.js", "TypeScript", "Apache Kafka", "Docker", "AWS", "Cost Optimization"]
    },
    {
      company: "MJB Technology Solutions",
      period: "Oct 2018 – Aug 2019",
      role: "Associate Software Developer",
      badge: "Full-Stack Web & Mobile",
      summary: "Developed Angular and Ionic applications for CheckSammy and Experience America, alongside Node.js REST APIs and integrated frontend workflows.",
      highlights: [
        "Engineered responsive web and mobile interfaces using Angular and Ionic for CheckSammy and Experience America client platforms.",
        "Built Node.js REST API backends, authentication middleware, and integrated transactional SQL data layers."
      ],
      skills: ["Angular", "Ionic", "Node.js", "REST APIs", "SQL", "Mobile Development"]
    },
    {
      company: "GlobalNest Solutions Pvt Ltd",
      period: "Jan 2017 – Oct 2018",
      role: "Programmer Analyst",
      badge: "Systems Foundation",
      summary: "Built Angular and Node.js applications with IBM Cloudant, Db2, and SQL integrations, including enterprise IBM i/AS400 development.",
      highlights: [
        "Developed full-stack business applications utilizing Angular and Node.js connected to IBM Cloudant NoSQL and IBM Db2 data stores.",
        "Contributed to enterprise IBM i (AS400) software development, legacy system integrations, and relational database query optimization."
      ],
      skills: ["Angular", "Node.js", "IBM Db2", "Cloudant", "SQL", "IBM i / AS400"]
    }
  ];

  return (
    <section id="timeline" className="section animate-fade-in delay-200">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            <span className="text-gradient">Professional Career</span> & Leadership Timeline
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            A verified 10-year progression starting in January 2017 spanning core backend systems, distributed cloud platforms, and Technical Leadership in DevSecOps and Kubernetes.
          </p>
        </div>

        {/* Timeline Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' }}>
          {experiences.map((exp, idx) => (
            <div 
              key={idx} 
              className="glass-panel"
              style={{ 
                padding: '2.25rem',
                borderLeft: idx === 0 ? '4px solid hsl(var(--accent-primary))' : '1px solid var(--glass-border)',
                position: 'relative'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    <span className="badge-tier" style={{ fontSize: '0.72rem' }}>
                      {exp.badge}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'hsl(var(--text-secondary))', fontSize: '0.875rem' }}>
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', lineHeight: '1.3' }}>
                    {exp.role}
                  </h3>
                  <h4 style={{ fontSize: '1.1rem', color: 'hsl(var(--accent-primary))', fontWeight: 600, marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building2 size={16} />
                    {exp.company}
                  </h4>
                </div>
              </div>

              {/* Summary */}
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.975rem', lineHeight: '1.65', marginBottom: '1.5rem', fontStyle: 'normal' }}>
                {exp.summary}
              </p>

              {/* Highlights */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                {exp.highlights.map((item, hIdx) => (
                  <li key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'hsl(var(--accent-primary))', marginTop: '3px', flexShrink: 0 }} />
                    <span 
                      style={{ color: 'hsl(var(--text-primary))', lineHeight: '1.6', fontSize: '0.925rem' }}
                      dangerouslySetInnerHTML={{ __html: item.replace(/~(\d+%)/g, '<strong style="color: hsl(var(--accent-primary))">~$1</strong>') }}
                    />
                  </li>
                ))}
              </ul>

              {/* Skill Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', paddingTop: '1.25rem', borderTop: '1px solid var(--glass-border)' }}>
                {exp.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tag-pill" style={{ fontSize: '0.75rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
