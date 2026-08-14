import React from 'react';
import { ExternalLink, Code, Star } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "AI-Assisted DevSecOps Agent",
      repo: "ai-devsecops-agent-mcp",
      description: "An MCP Server for automated vulnerability scanning, SRE incident correlation, and Kubernetes event analysis.",
      tags: ["Python", "MCP", "DevSecOps", "AI"],
      impact: "Simulates automated incident response and security analysis using modern Model Context Protocol."
    },
    {
      title: "Self-Service K8s Golden Path",
      repo: "k8s-golden-path-provisioner",
      description: "Kubernetes Operator pattern demonstrating automated, secure self-service environment provisioning.",
      tags: ["Go", "Kubernetes Operator", "Platform Engineering"],
      impact: "Demonstrates friction-less developer onboarding with secure-by-default infrastructure."
    },
    {
      title: "Supply-Chain Security Pipeline",
      repo: "supply-chain-security-pipeline",
      description: "End-to-end secure software supply chain with SBOM generation, image signing (Cosign), and Kyverno admission controls.",
      tags: ["GitHub Actions", "Kyverno", "Cosign", "Trivy"],
      impact: "Enforces zero-trust deployment by blocking unsigned or vulnerable images at the cluster level."
    },
    {
      title: "GitOps Progressive Delivery",
      repo: "gitops-progressive-delivery",
      description: "Advanced deployment strategies (Canary & Blue/Green) using ArgoCD and Argo Rollouts.",
      tags: ["ArgoCD", "Argo Rollouts", "Kubernetes", "GitOps"],
      impact: "Enables zero-downtime deployments with automated rollback on failure metrics."
    }
  ];

  return (
    <section className="section animate-fade-in delay-200" style={{ background: 'hsla(var(--bg-secondary), 0.3)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Featured</span> Projects
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'hsl(var(--text-secondary))', maxWidth: '600px', margin: '0 auto 3rem' }}>
          A curated selection from my 19+ open-source infrastructure and platform engineering projects.
        </p>

        <div className="grid grid-2">
          {projects.map((project, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem' }}>{project.title}</h3>
                <a href={`https://github.com/SumitDalavi/${project.repo}`} target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--text-secondary))' }} className="hover-accent">
                  <Code size={24} />
                </a>
              </div>
              
              <p style={{ marginBottom: '1rem', color: 'hsl(var(--text-secondary))' }}>
                {project.description}
              </p>
              
              <div style={{ background: 'hsla(var(--accent-secondary), 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '3px solid hsl(var(--accent-secondary))' }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'hsl(var(--accent-secondary))' }}>Key Impact:</strong>
                <span style={{ fontSize: '0.95rem' }}>{project.impact}</span>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="https://github.com/SumitDalavi" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View All 19 Projects on GitHub <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
