import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      title: "AI DevSecOps Agent",
      repo: "ai-devsecops-agent-mcp",
      description: "An autonomous agent leveraging Model Context Protocol (MCP) for automated vulnerability remediation and infrastructure-as-code security scanning.",
      tags: ["Python", "MCP", "LLMs", "DevSecOps"]
    },
    {
      title: "Kubernetes Golden Path Provisioner",
      repo: "k8s-golden-path-provisioner",
      description: "Automated self-service provisioning of secure, production-ready Kubernetes namespaces with integrated RBAC, NetworkPolicies, and resource quotas.",
      tags: ["Go", "Kubernetes Operator", "Platform Engineering"]
    },
    {
      title: "Supply Chain Security Pipeline",
      repo: "supply-chain-security-pipeline",
      description: "End-to-end SLSA-compliant CI/CD pipeline featuring container signing (Cosign), SBOM generation (Syft), and vulnerability attestation.",
      tags: ["GitHub Actions", "Sigstore", "Docker"]
    },
    {
      title: "Production-Grade Internal Developer Platform (IDP)",
      repo: "internal-developer-platform-poc",
      description: "A comprehensive IDP abstracting Kubernetes complexity, enabling developers to self-serve infrastructure and deploy applications frictionlessly.",
      tags: ["Backstage", "Crossplane", "Platform Engineering"]
    },
    {
      title: "K8s Gateway API Platform",
      repo: "k8s-gateway-api-platform",
      description: "Modern ingress and traffic routing architecture using the Kubernetes Gateway API for advanced traffic splitting and API management.",
      tags: ["Kubernetes", "Gateway API", "Envoy"]
    },
    {
      title: "Multi-Cluster GitOps Promotion",
      repo: "multi-cluster-gitops-promotion",
      description: "Advanced GitOps workflows for promoting workloads across Dev, Staging, and Production Kubernetes clusters securely.",
      tags: ["ArgoCD", "GitOps", "Kubernetes"]
    },
    {
      title: "Kubernetes Policy-as-Code",
      repo: "k8s-policy-as-code",
      description: "Enforcement of organizational security policies and compliance rules across Kubernetes clusters using admission controllers.",
      tags: ["OPA", "Kyverno", "Security"]
    },
    {
      title: "OpenTelemetry Microservices",
      repo: "opentelemetry-microservice-demo",
      description: "Distributed tracing, metrics, and logging implementation for microservices using the OpenTelemetry standard.",
      tags: ["OpenTelemetry", "Observability", "Golang"]
    },
    {
      title: "Multi-Cloud Terraform Modules",
      repo: "multi-cloud-terraform-modules",
      description: "A library of reusable, secure-by-default Terraform modules for provisioning infrastructure across AWS and Azure.",
      tags: ["Terraform", "AWS", "Azure"]
    },
    {
      title: "FinOps Cost Dashboard",
      repo: "finops-cost-dashboard",
      description: "Cloud cost visibility and optimization dashboard visualizing multi-cloud spend and resource utilization.",
      tags: ["Python", "FinOps", "Cloud Billing"]
    },
    {
      title: "Chaos Engineering GameDay",
      repo: "chaos-slo-gameday",
      description: "Automated chaos engineering experiments to validate Service Level Objectives (SLOs) and platform resilience.",
      tags: ["Chaos Mesh", "SRE", "SLOs"]
    },
    {
      title: "K8s Disaster Recovery",
      repo: "k8s-disaster-recovery-velero",
      description: "Automated cluster state backup and restoration workflows for Kubernetes utilizing VMware Velero.",
      tags: ["Velero", "Disaster Recovery", "Kubernetes"]
    },
    {
      title: "K8s Secret Rotation Operator",
      repo: "k8s-secret-rotation-operator",
      description: "Custom Kubernetes operator for automated, zero-downtime rotation of application secrets and certificates.",
      tags: ["Go", "Kubebuilder", "Security"]
    },
    {
      title: "Cloud Native Secrets Identity",
      repo: "cloud-native-secrets-identity",
      description: "Workload identity federation and dynamic secret injection for cloud-native applications.",
      tags: ["Vault", "Workload Identity", "Security"]
    },
    {
      title: "Ephemeral Preview Environments",
      repo: "ephemeral-preview-environments",
      description: "Automation for spinning up isolated, short-lived preview environments for pull request validation.",
      tags: ["GitHub Actions", "Kubernetes", "CI/CD"]
    },
    {
      title: "Enterprise IAM Auth (Node)",
      repo: "enterprise-iam-auth-poc-node",
      description: "Proof-of-concept for enterprise-grade Identity and Access Management and SSO integration.",
      tags: ["Node.js", "OIDC", "IAM"]
    },
    {
      title: "Enterprise IAM Auth (Python)",
      repo: "enterprise-iam-auth-poc-python",
      description: "Python-based enterprise SSO and IAM integration implementation.",
      tags: ["Python", "OIDC", "IAM"]
    },
    {
      title: "Containerized AI Agent",
      repo: "containerized-ai-agent-poc",
      description: "Secure, containerized execution environment for AI agents with isolated resource constraints.",
      tags: ["Docker", "AI", "Security"]
    },
    {
      title: "GitOps Progressive Delivery",
      repo: "gitops-progressive-delivery",
      description: "Canary and blue-green deployment strategies managed via GitOps operators.",
      tags: ["Flagger", "GitOps", "Kubernetes"]
    }
  ];

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="section animate-fade-in delay-200" style={{ background: 'hsla(var(--glass-bg), 0.3)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Featured</span> Infrastructure Projects
        </h2>
        
        <div className="grid grid-2">
          {displayedProjects.map((project, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>{project.title}</h3>
                <a href={`https://github.com/SumitDalavi/${project.repo}`} target="_blank" rel="noopener noreferrer" className="hover-accent">
                  <ExternalLink size={20} />
                </a>
              </div>
              
              <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>
                {project.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} style={{ fontSize: '0.85rem', color: 'hsl(var(--accent-primary))', background: 'hsla(var(--accent-primary), 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button 
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="btn btn-outline"
            style={{ minWidth: '250px', justifyContent: 'center' }}
          >
            {showAllProjects ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>Show All {projects.length} Projects <ChevronDown size={16} /></>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <a href="#experience" style={{ color: 'hsl(var(--text-secondary))', cursor: 'pointer', display: 'inline-block' }} className="animate-bounce">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <span>View Experience & Certifications</span>
              <ChevronDown size={24} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
