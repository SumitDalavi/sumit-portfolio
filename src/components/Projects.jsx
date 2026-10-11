import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, BookOpen, Search, Sparkles, Layers, Shield, Cpu, ArrowRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import CaseStudyModal from './CaseStudyModal';

const PROJECT_CATEGORIES = {
  "durable-incident-agent": "Reliability & SRE",
  "a2a-incident-mesh": "AI Infrastructure",
  "voice-incident-commander": "AI Infrastructure",
  "agent-sandbox-platform": "AI Infrastructure",
  "inference-performance-lab": "AI Infrastructure",
  "k8s-golden-path-provisioner": "Platform Engineering",
  "distributed-job-scheduler": "Reliability & SRE",
  "k8s-admission-webhook-from-scratch": "Kubernetes Internals",
  "llm-gateway-observability": "AI Infrastructure",
  "k8s-secret-rotation-operator": "Security & DevSecOps",
  "hybrid-rag-pipeline": "AI Infrastructure",
  "secure-dev-platform-demo": "Platform Engineering",
  "semantic-llm-cache": "AI Infrastructure",
  "nhi-agent-access-governance": "Security & DevSecOps",
  "llm-cost-autopilot": "AI Infrastructure",
  "multi-cloud-terraform-modules": "Cloud & GitOps",
  "rate-limiter-service": "Reliability & SRE",
  "ai-control-plane-demo": "AI Infrastructure",
  "text-to-sql-guardrails": "AI Infrastructure",
  "cloud-native-secrets-identity": "Security & DevSecOps",
  "ai-devsecops-agent-mcp": "Security & DevSecOps",
  "model-regression-detection": "AI Infrastructure",
  "golden-path-cli": "Platform Engineering",
  "idempotent-payment-ledger": "Reliability & SRE",
  "opentelemetry-microservice-demo": "Reliability & SRE",
  "enterprise-iam-auth-poc-python": "Security & DevSecOps",
  "enterprise-iam-auth-poc-node": "Security & DevSecOps",
  "supply-chain-security-pipeline": "Security & DevSecOps",
  "gitops-progressive-delivery": "Cloud & GitOps",
  "finops-cost-dashboard": "Cloud & GitOps",
  "support-triage-graph": "AI Infrastructure",
  "document-processor-ocr": "AI Infrastructure",
  "llm-output-arbitration": "AI Infrastructure",
  "self-healing-docs-action": "Platform Engineering",
  "prompt-versioning-ab-testing": "AI Infrastructure",
  "k8s-gateway-api-platform": "Kubernetes Internals",
  "ai-failure-forensics": "AI Infrastructure",
  "prompt-ab-testing-platform": "AI Infrastructure",
  "multi-tenant-auth-rbac": "Security & DevSecOps",
  "chaos-slo-gameday": "Reliability & SRE",
  "k8s-policy-as-code": "Security & DevSecOps",
  "webhook-delivery-system": "Reliability & SRE",
  "agent-orchestration-system": "AI Infrastructure",
  "secret-sprawl-remediation-bot": "Security & DevSecOps",
  "multimodal-document-processor": "AI Infrastructure",
  "cspm-noise-reduction-agent": "Security & DevSecOps",
  "agent-orchestration-memory": "AI Infrastructure",
  "eval-dataset-generator": "AI Infrastructure",
  "lora-finetuning-pipeline": "AI Infrastructure",
  "url-shortener-analytics": "Reliability & SRE",
  "automated-eval-dataset-generator": "AI Infrastructure",
  "api-gateway-bff": "Platform Engineering",
  "ai-feature-flag-system": "AI Infrastructure",
  "async-file-processing": "Reliability & SRE",
  "autonomous-content-pipeline": "AI Infrastructure",
  "containerized-ai-agent-poc": "AI Infrastructure",
  "reliable-chat-messaging": "Reliability & SRE",
  "research-assistant-crew": "AI Infrastructure",
  "event-driven-notifications": "Reliability & SRE",
  "rate-limiter-service-node": "Reliability & SRE",
  "real-time-notifications": "Reliability & SRE",
  "full-text-search-api": "Reliability & SRE",
  "event-sourced-audit-log": "Security & DevSecOps",
  "multimodal-clip-search": "AI Infrastructure",
  "ephemeral-preview-environments": "Platform Engineering",
  "internal-developer-platform-poc": "Platform Engineering",
  "multi-cluster-gitops-promotion": "Cloud & GitOps",
  "opa-threat-modeling-library": "Security & DevSecOps",
  "k8s-disaster-recovery-velero": "Kubernetes Internals",
  "service-mesh-security-lab": "Security & DevSecOps"
};

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [viewMode, setViewMode] = useState('case-studies'); // 'case-studies' | 'all-projects'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      title: "Durable Incident Agent",
      repo: "durable-incident-agent",
      description: "Autonomous incident response agent with durable execution workflows, orchestrating remediation steps with state persistence across distributed systems and automated retries.",
      tags: ["Python", "Agents", "SRE"],
      category: "Reliability & SRE"
    },
    {
      title: "A2A Incident Mesh",
      repo: "a2a-incident-mesh",
      description: "Agent-to-Agent communication mesh enabling collaborative incident response, where specialized AI agents autonomously triage and correlate diagnostic telemetry.",
      tags: ["TypeScript", "Multi-Agent", "SRE"],
      category: "AI Infrastructure"
    },
    {
      title: "Voice Incident Commander",
      repo: "voice-incident-commander",
      description: "Voice-driven incident command interface allowing on-call engineers to query telemetry and stage runbooks hands-free, with mandatory on-screen confirmation for mutations.",
      tags: ["Python", "Voice AI", "Platform Engineering"],
      category: "AI Infrastructure"
    },
    {
      title: "Agent Sandbox Platform",
      repo: "agent-sandbox-platform",
      description: "Containerized execution environment for evaluating AI agents, enforcing security boundaries, network policies, and resource constraints via Dockerode.",
      tags: ["TypeScript", "Security", "AI"],
      category: "AI Infrastructure"
    },
    {
      title: "Inference Performance Lab",
      repo: "inference-performance-lab",
      description: "Benchmarking and profiling laboratory for LLM inference, profiling latency, throughput, and token generation costs across various models and deployment configurations.",
      tags: ["Python", "LLMOps", "Performance"],
      category: "AI Infrastructure"
    },
    {
      title: "K8s Golden Path Provisioner",
      repo: "k8s-golden-path-provisioner",
      description: "Self-service Kubernetes operator provisioning standardized namespaces with RBAC, NetworkPolicies, and resource quotas from a single Developer CRD.",
      tags: ["Go", "Kubernetes Operator", "Platform Engineering"],
      category: "Platform Engineering"
    },
    {
      title: "Distributed Job Scheduler",
      repo: "distributed-job-scheduler",
      description: "Leader-election based distributed cron scheduler using Postgres advisory locks to prevent overlapping job execution across worker nodes.",
      tags: ["Go", "PostgreSQL", "Distributed Systems"],
      category: "Reliability & SRE"
    },
    {
      title: "K8s Admission Webhook (Hand-Built)",
      repo: "k8s-admission-webhook-from-scratch",
      description: "Custom Kubernetes mutating and validating admission webhooks built from scratch in Go — enforces security policies and injects sidecars at admission time.",
      tags: ["Go", "Kubernetes", "Security"],
      category: "Kubernetes Internals"
    },
    {
      title: "LLM Gateway and Observability",
      repo: "llm-gateway-observability",
      description: "Observability layer and proxy gateway for LLM requests, tracking token usage, latency, and cost per model with standardised OpenTelemetry traces.",
      tags: ["Python", "OpenTelemetry", "LLMOps"],
      category: "AI Infrastructure"
    },
    {
      title: "Kubernetes Secret Rotation Operator",
      repo: "k8s-secret-rotation-operator",
      description: "Custom Kubernetes operator built with kubebuilder that coordinates secret updates with rolling restarts of dependent pods.",
      tags: ["Go", "Kubernetes Operator", "Security"],
      category: "Security & DevSecOps"
    },
    {
      title: "RAG Pipeline with Hybrid Search",
      repo: "hybrid-rag-pipeline",
      description: "Enterprise-grade RAG system using hybrid retrieval (dense + sparse), Reciprocal Rank Fusion, and inline citation verification for grounded LLM answers.",
      tags: ["TypeScript", "RAG", "ChromaDB"],
      category: "AI Infrastructure"
    },
    {
      title: "Secure Dev Platform Demo",
      repo: "secure-dev-platform-demo",
      description: "Cross-service secure Kubernetes platform integration with automated admission control and network policy enforcement.",
      tags: ["Go", "Kubernetes", "Platform Engineering"],
      category: "Platform Engineering"
    },
    {
      title: "Semantic LLM Cache",
      repo: "semantic-llm-cache",
      description: "Drop-in semantic caching proxy that reduces LLM API costs and latency by detecting semantically similar requests using Redis vector search.",
      tags: ["TypeScript", "Redis", "Vector Search"],
      category: "AI Infrastructure"
    },
    {
      title: "NHI Agent Access Governance",
      repo: "nhi-agent-access-governance",
      description: "Proof-of-concept governing and auditing Non-Human Identity (NHI) access for service accounts, AI agents, MCP servers, and CI/CD bots — implementing least-privilege at scale.",
      tags: ["IAM", "Security", "Governance"],
      category: "Security & DevSecOps"
    },
    {
      title: "LLM Cost Autopilot",
      repo: "llm-cost-autopilot",
      description: "Intelligent routing proxy that classifies request complexity and routes to cost-effective models with asynchronous quality verification.",
      tags: ["TypeScript", "AI", "Cost Optimization"],
      category: "AI Infrastructure"
    },
    {
      title: "Multi-Cloud Terraform Modules",
      repo: "multi-cloud-terraform-modules",
      description: "Library of opinionated, secure-by-default Terraform modules for AWS and Azure with Terratest coverage proving correctness at the module-authoring level.",
      tags: ["Terraform", "AWS", "Azure"],
      category: "Cloud & GitOps"
    },
    {
      title: "Distributed Rate Limiter (Go)",
      repo: "rate-limiter-service",
      description: "API gateway rate limiting service using Redis Lua scripting for atomic token-bucket operations — consistent limits across distributed instances.",
      tags: ["Go", "Redis", "API Gateway"],
      category: "Reliability & SRE"
    },
    {
      title: "Ai Control Plane Demo",
      repo: "ai-control-plane-demo",
      description: "Cross-service AI control-plane integration providing policy guardrails, rate limits, and fallback routing.",
      tags: ["TypeScript", "AI", "Gateway"],
      category: "AI Infrastructure"
    },
    {
      title: "Text-to-SQL with Guardrails",
      repo: "text-to-sql-guardrails",
      description: "Natural language to SQL interface executing safely with DDL-blocking guardrails and validation preventing destructive LLM-generated queries.",
      tags: ["Python", "SQLAlchemy", "Security"],
      category: "AI Infrastructure"
    },
    {
      title: "Cloud Native Secrets and Identity",
      repo: "cloud-native-secrets-identity",
      description: "Workload identity federation and dynamic secret injection for cloud-native applications using Azure Key Vault, HashiCorp Vault, and External Secrets Operator.",
      tags: ["Vault", "Workload Identity", "Security"],
      category: "Security & DevSecOps"
    },
    {
      title: "AI-Assisted DevSecOps Agent (MCP)",
      repo: "ai-devsecops-agent-mcp",
      description: "LLM-powered MCP server that automates security review, vulnerability triage, and remediation suggestion workflows inside developer tooling.",
      tags: ["Python", "MCP", "LLMs", "DevSecOps"],
      category: "Security & DevSecOps"
    },
    {
      title: "Model Regression Detection System",
      repo: "model-regression-detection",
      description: "CI/CD-style pipeline that continuously evaluates LLM-powered features against a golden dataset to detect quality regressions before release.",
      tags: ["TypeScript", "CI/CD", "Testing"],
      category: "AI Infrastructure"
    },
    {
      title: "Golden Path CLI",
      repo: "golden-path-cli",
      description: "Developer CLI tool for scaffolding secure, compliant microservices with built-in CI/CD pipelines, IAM roles, and observability configurations.",
      tags: ["Go", "CLI", "Developer Experience"],
      category: "Platform Engineering"
    },
    {
      title: "Idempotent Payment Ledger",
      repo: "idempotent-payment-ledger",
      description: "Financial ledger API enforcing strict idempotency and ACID transactions for payment processing — prevents duplicate transactions under network retries.",
      tags: ["Python", "PostgreSQL", "FinTech"],
      category: "Reliability & SRE"
    },
    {
      title: "OpenTelemetry Microservices Demo",
      repo: "opentelemetry-microservice-demo",
      description: "Unified distributed traces, metrics, and logs across microservices using CNCF-standard OpenTelemetry with Jaeger and Prometheus backends.",
      tags: ["OpenTelemetry", "Observability", "Golang"],
      category: "Reliability & SRE"
    },
    {
      title: "Enterprise IAM Auth (Python)",
      repo: "enterprise-iam-auth-poc-python",
      description: "Python-based enterprise SSO and IAM integration with OIDC token validation, group-to-role mapping, and policy enforcement middleware.",
      tags: ["Python", "OIDC", "IAM"],
      category: "Security & DevSecOps"
    },
    {
      title: "Enterprise IAM Auth (Node.js)",
      repo: "enterprise-iam-auth-poc-node",
      description: "Enterprise-grade Identity and Access Management PoC with SSO integration using OIDC, JWT validation, and role-based permission enforcement.",
      tags: ["Node.js", "OIDC", "IAM"],
      category: "Security & DevSecOps"
    },
    {
      title: "Supply Chain Security Pipeline",
      repo: "supply-chain-security-pipeline",
      description: "SLSA-aligned CI/CD pipeline with SBOM generation (Syft), container signing (Cosign), vulnerability gating, and build provenance attestation.",
      tags: ["GitHub Actions", "Sigstore", "Docker"],
      category: "Security & DevSecOps"
    },
    {
      title: "GitOps Progressive Delivery",
      repo: "gitops-progressive-delivery",
      description: "Canary and blue-green deployment strategies managed via Argo Rollouts and Flagger — automated metric-gated promotion and instant rollback.",
      tags: ["Flagger", "GitOps", "Kubernetes"],
      category: "Cloud & GitOps"
    },
    {
      title: "FinOps Cost Dashboard",
      repo: "finops-cost-dashboard",
      description: "Cloud cost visibility and optimisation dashboard visualising multi-cloud spend trends, anomalies, and per-team resource utilisation.",
      tags: ["Python", "FinOps", "Cloud Billing"],
      category: "Cloud & GitOps"
    },
    {
      title: "Customer Support Triage Graph",
      repo: "support-triage-graph",
      description: "Stateful customer support ticket routing and escalation engine built with TypeScript and LangGraph.js — classifies and routes tickets automatically.",
      tags: ["TypeScript", "LangGraph", "Agents"],
      category: "AI Infrastructure"
    },
    {
      title: "Document Processor (OCR)",
      repo: "document-processor-ocr",
      description: "OCR-powered document ingestion pipeline that extracts, structures, and indexes text from PDFs and scanned images for downstream processing.",
      tags: ["Python", "OCR", "NLP"],
      category: "AI Infrastructure"
    },
    {
      title: "LLM Output Arbitration",
      repo: "llm-output-arbitration",
      description: "Consensus system that queries multiple LLMs in parallel and uses arbitration logic (majority vote + quality scoring) to select the best output.",
      tags: ["Python", "LLMOps", "Reliability"],
      category: "AI Infrastructure"
    },
    {
      title: "Self-Healing Technical Docs",
      repo: "self-healing-docs-action",
      description: "GitHub Action that monitors code changes to detect stale documentation, identifies specific stale sections, and auto-generates PRs with AI-corrected docs.",
      tags: ["TypeScript", "GitHub Actions", "Automation"],
      category: "Platform Engineering"
    },
    {
      title: "Prompt Versioning and A/B Testing",
      repo: "prompt-versioning-ab-testing",
      description: "Version control system for managing, branching, and testing iterative changes to LLM prompts with rollback support.",
      tags: ["Python", "LLMOps", "Version Control"],
      category: "AI Infrastructure"
    },
    {
      title: "K8s Gateway API Platform",
      repo: "k8s-gateway-api-platform",
      description: "Modern traffic routing architecture using the Kubernetes Gateway API — advanced traffic splitting, A/B routing, and API management replacing legacy Ingress.",
      tags: ["Kubernetes", "Gateway API", "Envoy"],
      category: "Kubernetes Internals"
    },
    {
      title: "AI Failure Forensics Tool",
      repo: "ai-failure-forensics",
      description: "Post-mortem and root-cause analysis tooling for AI pipelines — captures execution traces, input/output diffs, and classifies failure modes automatically.",
      tags: ["Python", "LLMOps", "Observability"],
      category: "AI Infrastructure"
    },
    {
      title: "Prompt A/B Testing Platform",
      repo: "prompt-ab-testing-platform",
      description: "Platform for conducting statistically-significant A/B tests on system prompts, measuring generation quality and conversion rates against control prompts.",
      tags: ["Python", "LLMOps", "A/B Testing"],
      category: "AI Infrastructure"
    },
    {
      title: "Multi-Tenant Auth and RBAC",
      repo: "multi-tenant-auth-rbac",
      description: "B2B multi-tenant authentication engine leveraging PostgreSQL Row-Level Security (RLS) for tenant data isolation.",
      tags: ["NestJS", "PostgreSQL", "IAM"],
      category: "Security & DevSecOps"
    },
    {
      title: "Chaos Engineering + SLO GameDay",
      repo: "chaos-slo-gameday",
      description: "Automated chaos engineering experiments validating Service Level Objectives (SLOs) and platform resilience with Chaos Mesh, measuring error budgets in real time.",
      tags: ["Chaos Mesh", "SRE", "SLOs"],
      category: "Reliability & SRE"
    },
    {
      title: "Kubernetes Policy-as-Code",
      repo: "k8s-policy-as-code",
      description: "Comprehensive Kyverno admission control suite enforcing Pod Security Standards, Network Policies, and image provenance before workloads hit the cluster.",
      tags: ["OPA", "Kyverno", "Security"],
      category: "Security & DevSecOps"
    },
    {
      title: "Webhook Delivery System",
      repo: "webhook-delivery-system",
      description: "Reliable webhook dispatcher with exponential backoff, retry queues, dead-letter handling, and HMAC signature validation.",
      tags: ["Node.js", "BullMQ", "Security"],
      category: "Reliability & SRE"
    },
    {
      title: "Agent Orchestration System",
      repo: "agent-orchestration-system",
      description: "Full agentic orchestration framework supporting tool-use, multi-step planning, and state management for autonomous LLM-powered pipelines.",
      tags: ["Python", "LangGraph", "Agents"],
      category: "AI Infrastructure"
    },
    {
      title: "Secret Sprawl Remediation Bot",
      repo: "secret-sprawl-remediation-bot",
      description: "DevSecOps incident response pipeline parsing secret detection output, automatically revoking compromised credentials via IdP APIs, and opening guided remediation PRs.",
      tags: ["Python", "DevSecOps", "Security"],
      category: "Security & DevSecOps"
    },
    {
      title: "Multimodal Document Processor",
      repo: "multimodal-document-processor",
      description: "Document processor capable of analyzing charts, text, and images simultaneously using multimodal LLMs for intelligent extraction.",
      tags: ["Python", "LLMs", "Multimodal"],
      category: "AI Infrastructure"
    },
    {
      title: "CSPM Noise Reduction Agent",
      repo: "cspm-noise-reduction-agent",
      description: "Intelligent agent that analyses and filters Cloud Security Posture Management (CSPM) alerts to reduce alert fatigue and surface priority risks.",
      tags: ["Python", "Security", "Automation"],
      category: "Security & DevSecOps"
    },
    {
      title: "Agent Orchestration with Memory",
      repo: "agent-orchestration-memory",
      description: "Multi-agent orchestration with tools, persistent memory across interactions, and human-in-the-loop escalation built with LangGraph.",
      tags: ["TypeScript", "LangGraph", "Agents"],
      category: "AI Infrastructure"
    },
    {
      title: "Eval Dataset Generator",
      repo: "eval-dataset-generator",
      description: "Structured evaluation dataset creation tool applying coverage heuristics to generate balanced test cases across difficulty levels and input categories.",
      tags: ["Python", "LLMOps", "Evals"],
      category: "AI Infrastructure"
    },
    {
      title: "LoRA Fine-Tuning Pipeline",
      repo: "lora-finetuning-pipeline",
      description: "End-to-end pipeline for fine-tuning large language models using LoRA (Low-Rank Adaptation) and PEFT — from data prep to checkpoint export.",
      tags: ["Python", "PyTorch", "LoRA"],
      category: "AI Infrastructure"
    },
    {
      title: "URL Shortener and Analytics",
      repo: "url-shortener-analytics",
      description: "Scalable URL shortener featuring asynchronous Kafka click analytics and Redis caching for low-latency redirection.",
      tags: ["Node.js", "Kafka", "Redis"],
      category: "Reliability & SRE"
    },
    {
      title: "Automated Eval Dataset Generator",
      repo: "automated-eval-dataset-generator",
      description: "Pipeline that automatically generates diverse evaluation datasets for LLM applications by synthesising adversarial, edge-case, and representative test inputs.",
      tags: ["Python", "LLMOps", "Testing"],
      category: "AI Infrastructure"
    },
    {
      title: "API Gateway / BFF",
      repo: "api-gateway-bff",
      description: "Backend-For-Frontend gateway aggregating multiple microservices with structured data fetching, request collapsing, and Redis response caching.",
      tags: ["Node.js", "Redis", "Microservices"],
      category: "Platform Engineering"
    },
    {
      title: "AI Feature Flag System",
      repo: "ai-feature-flag-system",
      description: "Feature flag service purpose-built for AI features — supports gradual rollouts, model version flags, and automated rollback triggered by quality metrics.",
      tags: ["TypeScript", "Feature Flags", "AI"],
      category: "AI Infrastructure"
    },
    {
      title: "Async File Processing Pipeline",
      repo: "async-file-processing",
      description: "Event-driven architecture for processing large media files asynchronously via S3 presigned URLs and background workers with progress tracking.",
      tags: ["Node.js", "AWS S3", "Workers"],
      category: "Reliability & SRE"
    },
    {
      title: "Autonomous Content Pipeline",
      repo: "autonomous-content-pipeline",
      description: "A self-correcting loop wrapping a research crew that drafts, critiques, and publishes content once quality gates pass.",
      tags: ["Python", "CrewAI", "LangGraph"],
      category: "AI Infrastructure"
    },
    {
      title: "Containerized AI Agent PoC",
      repo: "containerized-ai-agent-poc",
      description: "Containerized execution environment for AI agents with isolated resource constraints and sandboxed tool access.",
      tags: ["Docker", "AI", "Security"],
      category: "AI Infrastructure"
    },
    {
      title: "Reliable Chat Messaging",
      repo: "reliable-chat-messaging",
      description: "Scalable chat platform managing message delivery and ordering using Redis Streams with consumer groups and persistent message history.",
      tags: ["Node.js", "Redis Streams", "WebSockets"],
      category: "Reliability & SRE"
    },
    {
      title: "Research Assistant Crew",
      repo: "research-assistant-crew",
      description: "Autonomous multi-agent web research and summarisation pipeline built with CrewAI — delegates search, synthesis, and formatting to specialised agents.",
      tags: ["Python", "CrewAI", "Multi-Agent"],
      category: "AI Infrastructure"
    },
    {
      title: "Event-Driven Notification Service",
      repo: "event-driven-notifications",
      description: "Independent email/SMS/push consumer groups subscribing to Kafka topics for reliable fan-out — each channel scales independently with at-least-once delivery.",
      tags: ["TypeScript", "Kafka", "Event-Driven"],
      category: "Reliability & SRE"
    },
    {
      title: "Rate Limiter Service (Node.js)",
      repo: "rate-limiter-service-node",
      description: "Fast, Redis-backed Sliding Window rate limiter built with TypeScript, Express, and ioredis — companion Node.js implementation of the Go rate limiter.",
      tags: ["TypeScript", "Redis", "API Gateway"],
      category: "Reliability & SRE"
    },
    {
      title: "Real-Time Notifications",
      repo: "real-time-notifications",
      description: "Scalable WebSocket notification server powered by Redis Pub/Sub for cross-instance state synchronisation and horizontal worker scaling.",
      tags: ["Node.js", "WebSockets", "Redis"],
      category: "Reliability & SRE"
    },
    {
      title: "Full-Text Search API",
      repo: "full-text-search-api",
      description: "Full-text search engine built natively on Postgres using tsvector and trigram indices — no external search infrastructure required.",
      tags: ["Node.js", "PostgreSQL", "Search"],
      category: "Reliability & SRE"
    },
    {
      title: "Event-Sourced Audit Log",
      repo: "event-sourced-audit-log",
      description: "CQRS and Event Sourcing implementation for structured compliance audit logging with hashed event sequences.",
      tags: ["Node.js", "CQRS", "Compliance"],
      category: "Security & DevSecOps"
    },
    {
      title: "Multimodal CLIP Search",
      repo: "multimodal-clip-search",
      description: "Semantic image search engine using CLIP — enables searching a corpus of images using natural language text queries with cosine similarity ranking.",
      tags: ["Python", "CLIP", "Multimodal"],
      category: "AI Infrastructure"
    },
    {
      title: "Ephemeral Preview Environments",
      repo: "ephemeral-preview-environments",
      description: "Platform automating on-demand ephemeral Kubernetes environments per PR — full stack preview with DNS, TLS, and automatic teardown on merge.",
      tags: ["Kubernetes", "Platform Engineering", "CI/CD"],
      category: "Platform Engineering"
    },
    {
      title: "Internal Developer Platform (IDP) PoC",
      repo: "internal-developer-platform-poc",
      description: "Backstage-based Internal Developer Platform connecting service catalogue, golden-path templates, CI/CD, and cloud resource provisioning in a unified portal.",
      tags: ["Backstage", "Platform Engineering", "IDP"],
      category: "Platform Engineering"
    },
    {
      title: "Multi-Cluster GitOps Promotion",
      repo: "multi-cluster-gitops-promotion",
      description: "Platform-scale GitOps architecture using Argo CD ApplicationSets and Kustomize to manage environment promotion across Dev to Stage to Prod clusters.",
      tags: ["Argo CD", "GitOps", "Kubernetes"],
      category: "Cloud & GitOps"
    },
    {
      title: "OPA Threat Modeling Library",
      repo: "opa-threat-modeling-library",
      description: "Open Policy Agent library codifying STRIDE threat models as Rego policies — automatically evaluates architecture diagrams against security rules.",
      tags: ["OPA", "Rego", "Threat Modeling"],
      category: "Security & DevSecOps"
    },
    {
      title: "K8s Disaster Recovery (Velero)",
      repo: "k8s-disaster-recovery-velero",
      description: "Automated cluster state backup and point-in-time restoration workflows for Kubernetes using VMware Velero with scheduled backups and DR runbooks.",
      tags: ["Velero", "Disaster Recovery", "Kubernetes"],
      category: "Kubernetes Internals"
    },
    {
      title: "Service Mesh Security Lab",
      repo: "service-mesh-security-lab",
      description: "Hands-on Istio lab demonstrating zero-trust networking — mTLS between all services, fine-grained AuthorizationPolicies, and egress gateway controls.",
      tags: ["Istio", "Service Mesh", "Security"],
      category: "Security & DevSecOps"
    }
  ];

  const caseStudyMap = useMemo(() => new Map(caseStudies.map(cs => [cs.repo, cs])), []);

  const categories = useMemo(() => [
    'All',
    'Platform Engineering',
    'Reliability & SRE',
    'AI Infrastructure',
    'Kubernetes Internals',
    'Security & DevSecOps',
    'Cloud & GitOps'
  ], []);

  // Handle URL hash for direct case-study linking (e.g. #study-durable-incident-agent)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#study-')) {
        const studyId = hash.replace('#study-', '');
        const target = caseStudies.find(c => c.id === studyId);
        if (target) {
          setSelectedCaseStudy(target);
          setViewMode('case-studies');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenCaseStudy = (cs) => {
    setSelectedCaseStudy(cs);
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', `#study-${cs.id}`);
    }
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const getProjectCategory = (p) => {
    return p.category || PROJECT_CATEGORIES[p.repo] || caseStudyMap.get(p.repo)?.category || 'Platform Engineering';
  };

  // Filtered 19 Ranked Case Studies with exact category matching
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter(cs => {
      const matchesCategory = activeCategory === 'All' || cs.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        cs.title.toLowerCase().includes(query) || 
        cs.executiveSummary.toLowerCase().includes(query) || 
        cs.problem.toLowerCase().includes(query) ||
        cs.category.toLowerCase().includes(query) ||
        cs.tags.some(t => t.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Filtered 70 All Projects with explicit category matching
  const filteredAllProjects = useMemo(() => {
    return projects.filter(p => {
      const category = getProjectCategory(p);
      const matchesCategory = activeCategory === 'All' || category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [projects, caseStudyMap, activeCategory, searchQuery]);

  const displayedCaseStudies = showAllProjects ? filteredCaseStudies : filteredCaseStudies.slice(0, 6);
  const displayedProjects = showAllProjects ? filteredAllProjects : filteredAllProjects.slice(0, 8);

  return (
    <section id="projects" className="section animate-fade-in delay-200" style={{ background: 'rgba(var(--glass-rgb), 0.3)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            <span className="text-gradient">Engineering Portfolio</span> & Systems Architecture
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Ground-truth systems engineering spanning 9.5+ years of Kubernetes internals, DevSecOps, SRE resilience, and autonomous AI infrastructure.
          </p>
        </div>

        {/* Primary View Switcher: Ranked Case Studies vs All 70 Projects */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setViewMode('case-studies'); setShowAllProjects(false); }}
            className={`btn ${viewMode === 'case-studies' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '100px', padding: '0.65rem 1.75rem', fontSize: '0.95rem' }}
          >
            <Sparkles size={18} />
            Ranked Case Studies ({caseStudies.length})
          </button>
          <button
            onClick={() => { setViewMode('all-projects'); setShowAllProjects(false); }}
            className={`btn ${viewMode === 'all-projects' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '100px', padding: '0.65rem 1.75rem', fontSize: '0.95rem' }}
          >
            <Layers size={18} />
            Full Repository Catalog ({projects.length})
          </button>
        </div>

        {/* Search Bar with Accessible Label */}
        <div className="search-bar-container">
          <label htmlFor="project-search-input" className="sr-only">
            Search case studies and repository catalog
          </label>
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            id="project-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search engineering case studies and repository catalog by title, technology, or keywords"
            placeholder={viewMode === 'case-studies' ? "Search 19 ranked case studies by architecture, tag, or topic..." : "Search all 70 repositories..."}
            className="search-input"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="filter-tabs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MODE 1: RANKED CASE STUDIES (19) */}
        {viewMode === 'case-studies' && (
          <>
            <div className="grid grid-2">
              {displayedCaseStudies.map((cs) => (
                <div 
                  key={cs.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: '2rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    border: cs.rank <= 4 ? '1px solid hsla(var(--accent-primary), 0.4)' : '1px solid var(--glass-border)'
                  }}
                >
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="badge-rank">
                        Rank #{cs.rank}
                      </span>
                      <span className="badge-tier" style={{ fontSize: '0.7rem' }}>
                        {cs.tier.split(':')[0]}
                      </span>
                    </div>
                    <span className="badge-category">
                      {cs.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', lineHeight: '1.3', marginBottom: '0.75rem' }}>
                    <button 
                      onClick={() => handleOpenCaseStudy(cs)}
                      style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                      className="hover-accent"
                    >
                      {cs.title}
                    </button>
                  </h3>

                  <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '1.25rem', lineHeight: '1.6', fontSize: '0.95rem', flexGrow: 1 }}>
                    {cs.executiveSummary}
                  </p>

                  {/* Architecture Teaser */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'hsl(var(--accent-primary))', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                      Core Engineering Problem:
                    </span>
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.5', margin: 0 }}>
                      {cs.problem.length > 130 ? cs.problem.slice(0, 130) + '...' : cs.problem}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {cs.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleOpenCaseStudy(cs)}
                      className="btn btn-primary"
                      style={{ flexGrow: 1, justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                    >
                      <BookOpen size={16} />
                      Deep Dive Case Study
                    </button>
                    <a
                      href={`https://github.com/SumitDalavi/${cs.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ padding: '0.6rem 0.9rem', fontSize: '0.9rem' }}
                      title="View GitHub Repository"
                      aria-label={`View GitHub repository for ${cs.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredCaseStudies.length > 6 && (
              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="btn btn-outline"
                  style={{ minWidth: '280px', justifyContent: 'center' }}
                >
                  {showAllProjects ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>Show All {filteredCaseStudies.length} Ranked Case Studies <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* MODE 2: ALL 70 PROJECTS */}
        {viewMode === 'all-projects' && (
          <>
            <div className="grid grid-2">
              {displayedProjects.map((project, idx) => {
                const cs = caseStudyMap.get(project.repo);
                const category = getProjectCategory(project);
                return (
                  <div 
                    key={idx} 
                    className="glass-panel" 
                    style={{ 
                      padding: '2rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      border: cs ? '1px solid hsla(var(--accent-primary), 0.3)' : '1px solid var(--glass-border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {cs && (
                          <span className="badge-rank">
                            Case Study #{cs.rank}
                          </span>
                        )}
                        <span className="badge-category" style={{ fontSize: '0.7rem' }}>
                          {category}
                        </span>
                      </div>
                      <a 
                        href={`https://github.com/SumitDalavi/${project.repo}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                        title="View on GitHub"
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', lineHeight: '1.4', marginBottom: '0.5rem' }}>
                      <a 
                        href={`https://github.com/SumitDalavi/${project.repo}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover-accent" 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        {project.title}
                      </a>
                    </h3>

                    <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.925rem', flexGrow: 1 }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {cs && (
                      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                        <button
                          onClick={() => handleOpenCaseStudy(cs)}
                          className="btn btn-outline"
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.5rem' }}
                        >
                          <BookOpen size={14} /> View Linked Case Study #{cs.rank}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredAllProjects.length > 8 && (
              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="btn btn-outline"
                  style={{ minWidth: '280px', justifyContent: 'center' }}
                >
                  {showAllProjects ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>Show All {filteredAllProjects.length} Projects <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal View */}
        {selectedCaseStudy && (
          <CaseStudyModal
            caseStudy={selectedCaseStudy}
            onClose={handleCloseCaseStudy}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <a href="#timeline" style={{ color: 'hsl(var(--text-secondary))', cursor: 'pointer', display: 'inline-block' }} className="animate-bounce">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <span>View Career Progression & Leadership</span>
              <ChevronDown size={24} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
