import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      {
      title: "NHI Agent Access Governance",
      repo: "nhi-agent-access-governance",
      description: "Framework for governing and auditing Non-Human Identity (NHI) access, implementing least privilege for service accounts and API keys.",
      tags: ["IAM", "Security", "Governance"]
    },
    {
      {
      title: "K8s Admission Webhook From Scratch",
      repo: "k8s-admission-webhook-from-scratch",
      description: "Custom Kubernetes mutating and validating admission webhooks built from scratch to enforce security policies and inject sidecars.",
      tags: ["Go", "Kubernetes", "Security"]
    },
    {
      {
      title: "API Gateway / BFF",
      repo: "api-gateway-bff",
      description: "Backend-For-Frontend (BFF) gateway aggregating multiple microservices and providing GraphQL-like data fetching.",
      tags: ["Node.js", "Redis", "Microservices"]
    },
    {
      {
      title: "Distributed Job Scheduler",
      repo: "distributed-job-scheduler",
      description: "Leader-election based distributed cron scheduler using Postgres advisory locks to prevent duplicate job execution.",
      tags: ["Go", "PostgreSQL", "Distributed Systems"]
    },
    {
      {
      title: "Idempotent Payment Ledger",
      repo: "idempotent-payment-ledger",
      description: "Financial ledger API enforcing strict idempotency and ACID transactions for payment processing.",
      tags: ["Python", "PostgreSQL", "FinTech"]
    },
    {
      {
      title: "CSPM Noise Reduction Agent",
      repo: "cspm-noise-reduction-agent",
      description: "Intelligent agent that analyzes and filters Cloud Security Posture Management (CSPM) alerts to reduce alert fatigue and prioritize true risks.",
      tags: ["Python", "Security", "Automation"]
    },
    {
      {
      title: "Multi-Tenant Auth & RBAC",
      repo: "multi-tenant-auth-rbac",
      description: "B2B multi-tenant authentication engine leveraging PostgreSQL Row-Level Security (RLS) for absolute data isolation.",
      tags: ["NestJS", "PostgreSQL", "IAM"]
    },
    {
      {
      title: "Golden Path CLI",
      repo: "golden-path-cli",
      description: "Developer CLI tool for scaffolding secure, compliant microservices with built-in CI/CD pipelines, IAM roles, and observability configurations.",
      tags: ["Go", "CLI", "Developer Experience"]
    },
    {
      {
      title: "Event-Sourced Audit Log",
      repo: "event-sourced-audit-log",
      description: "CQRS and Event Sourcing implementation for an immutable, cryptographically verifiable compliance audit log.",
      tags: ["Node.js", "CQRS", "Compliance"]
    },
    {
      {
      title: "Distributed Rate Limiter",
      repo: "rate-limiter-service",
      description: "API gateway rate limiting service using Redis Lua scripting for atomic token-bucket operations.",
      tags: ["Go", "Redis", "API Gateway"]
    },
    {
      {
      title: "Webhook Delivery System",
      repo: "webhook-delivery-system",
      description: "Reliable webhook dispatcher with exponential backoff, retry queues, and HMAC signature validation.",
      tags: ["Node.js", "BullMQ", "Security"]
    },
    {
      {
      title: "Service Mesh Security Lab",
      repo: "service-mesh-security-lab",
      description: "Hands-on lab demonstrating advanced Istio service mesh security patterns including mTLS, authorization policies, and egress gateways.",
      tags: ["Istio", "Service Mesh", "Security"]
    },
    {
      {
      title: "Async File Processing pipeline",
      repo: "async-file-processing",
      description: "Event-driven architecture for processing large media files asynchronously via S3 presigned URLs and background workers.",
      tags: ["Node.js", "AWS S3", "Workers"]
    },
    {
      {
      title: "Real-Time Notifications",
      repo: "real-time-notifications",
      description: "Scalable WebSocket notification server powered by Redis Pub/Sub for cross-instance state synchronization.",
      tags: ["Node.js", "WebSockets", "Redis"]
    },
    {
      {
      title: "Full-Text Search API",
      repo: "full-text-search-api",
      description: "Lightning-fast full-text search engine built natively on Postgres using tsvector and trigram indices.",
      tags: ["Node.js", "PostgreSQL", "Search"]
    },
    {
      {
      title: "Reliable Chat Messaging",
      repo: "reliable-chat-messaging",
      description: "Scalable chat platform guaranteeing message delivery and ordering using Redis Streams.",
      tags: ["Node.js", "Redis Streams", "WebSockets"]
    },
    {
      {
      title: "OPA Threat Modeling Library",
      repo: "opa-threat-modeling-library",
      description: "Open Policy Agent (OPA) library for codifying threat models and automatically evaluating architecture diagrams against security policies.",
      tags: ["OPA", "Rego", "Threat Modeling"]
    },
    {
      {
      title: "Supply Chain Security Pipeline",
      repo: "supply-chain-security-pipeline",
      description: "End-to-end SLSA-compliant CI/CD pipeline featuring container signing (Cosign), SBOM generation (Syft), and vulnerability attestation.",
      tags: ["GitHub Actions", "Sigstore", "Docker"]
    },
    {
      {
      title: "GitOps Progressive Delivery",
      repo: "gitops-progressive-delivery",
      description: "Canary and blue-green deployment strategies managed via GitOps operators.",
      tags: ["Flagger", "GitOps", "Kubernetes"]
    }
    {
      title: "URL Shortener & Analytics",
      repo: "url-shortener-analytics",
      description: "High-performance URL shortener tracking millions of clicks with real-time Kafka-driven analytics and Redis caching.",
      tags: ["Node.js", "Kafka", "Redis"]
    },
    {
      {
      title: "Production-Grade Internal Developer Platform (IDP)",
      repo: "internal-developer-platform-poc",
      description: "A comprehensive IDP abstracting Kubernetes complexity, enabling developers to self-serve infrastructure and deploy applications frictionlessly.",
      tags: ["Backstage", "Crossplane", "Platform Engineering"]
    },
    {
      {
      title: "Multi-Cluster GitOps Promotion",
      repo: "multi-cluster-gitops-promotion",
      description: "Advanced GitOps workflows for promoting workloads across Dev, Staging, and Production Kubernetes clusters securely.",
      tags: ["ArgoCD", "GitOps", "Kubernetes"]
    },
    {
      {
      title: "Ephemeral Preview Environments",
      repo: "ephemeral-preview-environments",
      description: "Automation for spinning up isolated, short-lived preview environments for pull request validation.",
      tags: ["GitHub Actions", "Kubernetes", "CI/CD"]
    },
    {
      {
      title: "K8s Secret Rotation Operator",
      repo: "k8s-secret-rotation-operator",
      description: "Custom Kubernetes operator for automated, zero-downtime rotation of application secrets and certificates.",
      tags: ["Go", "Kubebuilder", "Security"]
    },
    {
      {
      title: "AI DevSecOps Agent",
      repo: "ai-devsecops-agent-mcp",
      description: "An autonomous agent leveraging Model Context Protocol (MCP) for automated vulnerability remediation and infrastructure-as-code security scanning.",
      tags: ["Python", "MCP", "LLMs", "DevSecOps"]
    },
    {
      {
      title: "Secret Sprawl Remediation Bot",
      repo: "secret-sprawl-remediation-bot",
      description: "Automated bot for identifying, triaging, and remediating hardcoded secrets across thousands of repositories using GitHub Advanced Security and Azure Key Vault.",
      tags: ["Python", "DevSecOps", "Security"]
    },
    {
      {
      title: "Kubernetes Golden Path Provisioner",
      repo: "k8s-golden-path-provisioner",
      description: "Automated self-service provisioning of secure, production-ready Kubernetes namespaces with integrated RBAC, NetworkPolicies, and resource quotas.",
      tags: ["Go", "Kubernetes Operator", "Platform Engineering"]
    },
    {
      {
      title: "Cloud Native Secrets Identity",
      repo: "cloud-native-secrets-identity",
      description: "Workload identity federation and dynamic secret injection for cloud-native applications.",
      tags: ["Vault", "Workload Identity", "Security"]
    },
    {
      {
      title: "K8s Gateway API Platform",
      repo: "k8s-gateway-api-platform",
      description: "Modern ingress and traffic routing architecture using the Kubernetes Gateway API for advanced traffic splitting and API management.",
      tags: ["Kubernetes", "Gateway API", "Envoy"]
    },
    {
      {
      title: "OpenTelemetry Microservices",
      repo: "opentelemetry-microservice-demo",
      description: "Distributed tracing, metrics, and logging implementation for microservices using the OpenTelemetry standard.",
      tags: ["OpenTelemetry", "Observability", "Golang"]
    },
    {
      {
      title: "Multi-Cloud Terraform Modules",
      repo: "multi-cloud-terraform-modules",
      description: "A library of reusable, secure-by-default Terraform modules for provisioning infrastructure across AWS and Azure.",
      tags: ["Terraform", "AWS", "Azure"]
    },
    {
      {
      title: "Kubernetes Policy-as-Code",
      repo: "k8s-policy-as-code",
      description: "Enforcement of organizational security policies and compliance rules across Kubernetes clusters using admission controllers.",
      tags: ["OPA", "Kyverno", "Security"]
    },
    {
      {
      title: "K8s Disaster Recovery",
      repo: "k8s-disaster-recovery-velero",
      description: "Automated cluster state backup and restoration workflows for Kubernetes utilizing VMware Velero.",
      tags: ["Velero", "Disaster Recovery", "Kubernetes"]
    },
    {
      {
      title: "Chaos Engineering GameDay",
      repo: "chaos-slo-gameday",
      description: "Automated chaos engineering experiments to validate Service Level Objectives (SLOs) and platform resilience.",
      tags: ["Chaos Mesh", "SRE", "SLOs"]
    },
    {
      {
      title: "FinOps Cost Dashboard",
      repo: "finops-cost-dashboard",
      description: "Cloud cost visibility and optimization dashboard visualizing multi-cloud spend and resource utilization.",
      tags: ["Python", "FinOps", "Cloud Billing"]
    },
    {
      {
      title: "Enterprise IAM Auth (Node)",
      repo: "enterprise-iam-auth-poc-node",
      description: "Proof-of-concept for enterprise-grade Identity and Access Management and SSO integration.",
      tags: ["Node.js", "OIDC", "IAM"]
    },
    {
      {
      title: "Enterprise IAM Auth (Python)",
      repo: "enterprise-iam-auth-poc-python",
      description: "Python-based enterprise SSO and IAM integration implementation.",
      tags: ["Python", "OIDC", "IAM"]
    },
    {
      {
      title: "Containerized AI Agent",
      repo: "containerized-ai-agent-poc",
      description: "Secure, containerized execution environment for AI agents with isolated resource constraints.",
      tags: ["Docker", "AI", "Security"]
    }
  ];

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="section animate-fade-in delay-200" style={{ background: 'hsla(var(--glass-bg), 0.3)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Featured</span> Projects
        </h2>
        
        <div className="grid grid-2">
          {displayedProjects.map((project, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>
                  <a href={`https://github.com/SumitDalavi/${project.repo}`} target="_blank" rel="noopener noreferrer" className="hover-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {project.title}
                  </a>
                </h3>
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
