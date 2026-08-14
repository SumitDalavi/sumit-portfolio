import React from 'react';
import { Shield, Cloud, Terminal, Cpu, Database, Network, Bot, MonitorDot } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud & Platform",
      icon: <Cloud size={24} className="text-gradient" />,
      skills: ["Microsoft Azure (AKS)", "Azure Functions", "AWS (EC2, S3, Lambda)", "PostgreSQL", "Cosmos DB"]
    },
    {
      title: "CI/CD & Release",
      icon: <Terminal size={24} className="text-gradient" />,
      skills: ["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps", "Bitbucket", "Release Orchestration"]
    },
    {
      title: "Security & DevSecOps",
      icon: <Shield size={24} className="text-gradient" />,
      skills: ["SAST/DAST", "Checkmarx", "Wiz", "Veracode", "Threat Modeling", "Azure Key Vault"]
    },
    {
      title: "Infrastructure & GitOps",
      icon: <Network size={24} className="text-gradient" />,
      skills: ["Kubernetes", "Docker", "Terraform", "Helm", "Rancher", "Chef", "Linux/RHEL"]
    },
    {
      title: "Backend & Testing",
      icon: <Cpu size={24} className="text-gradient" />,
      skills: ["Node.js", "TypeScript", "Express.js", "REST APIs", "Kafka", "RabbitMQ", "MongoDB", "Redis"]
    },
    {
      title: "SRE & Observability",
      icon: <Database size={24} className="text-gradient" />,
      skills: ["Prometheus", "Grafana", "Datadog", "ELK Stack", "SLIs/SLOs", "Incident Troubleshooting"]
    },
    {
      title: "AI-Assisted Engineering",
      icon: <Bot size={24} className="text-gradient" />,
      skills: ["GitHub Copilot", "Gemini", "LLMs", "Prompt Engineering", "Responsible AI"]
    },
    {
      title: "Legacy Systems",
      icon: <MonitorDot size={24} className="text-gradient" />,
      skills: ["Erlang/OTP", "Ruby", "IBM Db2", "IBM i/AS400", "RPG IV/RPGLE", "CLLE"]
    }
  ];

  return (
    <section className="section animate-fade-in delay-100">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Core Technical</span> Skills
        </h2>
        
        <div className="grid grid-3">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {category.icon}
                <h3 style={{ fontSize: '1.25rem' }}>{category.title}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    style={{
                      background: 'hsla(var(--accent-primary), 0.1)',
                      border: '1px solid hsla(var(--accent-primary), 0.2)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.875rem'
                    }}
                  >
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

export default Skills;
