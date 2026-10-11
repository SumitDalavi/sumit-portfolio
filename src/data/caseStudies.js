export const caseStudies = [
  {
    rank: 1,
    id: "secure-dev-platform-demo",
    repo: "secure-dev-platform-demo",
    title: "Secure Dev Platform Demo",
    tier: "Tier 1: Flagship Architectural Study",
    category: "Platform Engineering",
    executiveSummary: "End-to-end multi-stage platform integration orchestrating policy enforcement, self-service developer provisioning, and security admission controls with deterministic failure handling across Linux environments.",
    problem: "Enterprise developers face fragmented delivery pipelines where security controls, admission webhooks, and infrastructure provisioning operate in silos, causing configuration drift, readiness race conditions, and uncontrolled deployment failures.",
    architecture: "A six-stage integrated platform pipeline connecting developer self-service CRDs, mutating/validating admission webhooks, automated RBAC/NetworkPolicy generation, and least-privilege workload deployment.",
    diagram: `+-------------------------------------------------------------------------+
|                  Developer Intent (PlatformService CRD)                 |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|               Admission Webhook & Policy Gatekeeper                     |
|    - Validates mandatory labels, security contexts & namespace caps     |
|    - Intercepts non-compliant specs (Expected-Denial validation)        |
+------------------------------------+------------------------------------+
                                     |
                        [Passed / Validated]
                                     |
                                     v
+------------------------------------+------------------------------------+
|                Automated Infrastructure Provisioner                      |
|    - Applies NetworkPolicies (Default-Deny Ingress/Egress)              |
|    - Generates Namespace Quotas & Scoped ServiceAccounts                |
|    - Reconciles workloads with dependency-ordered readiness gates       |
+-------------------------------------------------------------------------+`,
    decisions: [
      {
        title: "Deterministic Admission & Expected-Denial Contracts",
        decision: "Built dedicated test assertions that verify both valid admissions and intentional policy rejections without terminating test harness execution.",
        rationale: "Ensures security policies actively enforce boundaries rather than passing due to unconfigured webhooks."
      },
      {
        title: "Ordered Resource Application vs. Bulk Apply",
        decision: "Replaced recursive unstructured kubectl apply with an explicit dependency-ordered DAG: Namespace -> RBAC -> NetworkPolicy -> Deployment.",
        rationale: "Eliminated intermittent readiness race conditions where pods failed before their governing network policies and service accounts were initialized."
      }
    ],
    remediation: "Resolved Linux portability issues with shell exit codes, handled recursive manifest application race conditions, and corrected container readiness gates during automated CI runs.",
    results: "Validated full 6-stage platform provisioning lifecycle in isolated CI pipelines, verifying policy enforcement with 100% pass rate across expected-admission and expected-denial test suites.",
    limitations: "Demonstrated scope focuses on core platform orchestration and admission gating; enterprise identity federation and external portal components operate in mock provider mode.",
    tags: ["Kubernetes", "Platform Engineering", "Admission Control", "Go", "NetworkPolicy", "Security"]
  },
  {
    rank: 2,
    id: "durable-incident-agent",
    repo: "durable-incident-agent",
    title: "Durable Incident Agent",
    tier: "Tier 1: Flagship Architectural Study",
    category: "Reliability & SRE",
    executiveSummary: "Autonomous incident response agent built on durable execution primitives, executing multi-step remediation workflows with human-in-the-loop gates and sustained post-mitigation telemetry verification.",
    problem: "Standard automated remediation scripts lack state persistence across crashes, risk executing duplicate side-effects (e.g., redundant pod restarts or route changes), and fail to monitor whether a fix holds over an extended observation window.",
    architecture: "Durable state-machine workflow executing automated anomaly triage, diagnostic artifact collection, approval-gated mitigation, and a sustained cool-down verification loop that observes p95 latency and error rate stability.",
    diagram: `+--------------------+       +----------------------+       +-----------------------+
|  Telemetry Anomaly | ----> | Diagnostic Collector | ----> | Remediation Plan Gen  |
|  (p95 / Error Spike|       | (Logs, Metrics, OTel)|       | (Durable Action Spec) |
+--------------------+       +----------------------+       +-----------+-----------+
                                                                        |
                                                                        v
+--------------------+       +----------------------+       +-----------+-----------+
| Sustained Recovery | <---- | Mitigation Execution | <---- | Human-in-the-Loop     |
| (p95 Cooldown Obs) |       | (Idempotent Action)  |       | Approval Gate (Auth)  |
+--------------------+       +----------------------+       +-----------------------+`,
    decisions: [
      {
        title: "Durable Step Execution with Unique Evidence IDs",
        decision: "Assigned cryptographically unique Evidence IDs and checkpoints to every diagnostic snapshot and remediation step.",
        rationale: "Guarantees state persistence across agent restarts and provides a tamper-evident audit trail for post-incident review."
      },
      {
        title: "Sustained Post-Mitigation Cooldown Windows",
        decision: "Enforced an explicit multi-minute observation window tracking p95 latency and error rates before marking an incident resolved.",
        rationale: "Prevents premature incident closure caused by transient metric dips right after pod restarts."
      }
    ],
    remediation: "Eliminated container networking race conditions during parallel diagnostics, added metric cooldown verification, and ensured side-effect execution is strictly idempotent.",
    results: "Demonstrated full end-to-end automated incident triage, gated approval, and sustained recovery verification with zero duplicate side-effects across simulated node and network outages.",
    limitations: "Designed for Kubernetes-orchestrated workloads; external cloud API mitigations rely on adapter contracts rather than universal cloud provider coverage.",
    tags: ["Python", "Durable Execution", "Autonomous Agents", "SRE", "Observability", "Prometheus"]
  },
  {
    rank: 3,
    id: "agent-sandbox-platform",
    repo: "agent-sandbox-platform",
    title: "Agent Sandbox Platform",
    tier: "Tier 1: Flagship Architectural Study",
    category: "AI Infrastructure",
    executiveSummary: "Secure, containerized runtime sandbox enforcing network isolation, tokenized execution budgets, and deterministic cleanup boundaries for autonomous AI code execution.",
    problem: "Running AI-generated code or untrusted agent tools poses severe security risks, including unauthorized egress data exfiltration, local resource exhaustion, and leftover zombie processes.",
    architecture: "A Go-based sandbox orchestration daemon that spins up ephemeral, capability-dropped containers with strict Linux cgroup limits, NetworkMode: none isolation, and synchronous post-execution cleanup handlers.",
    diagram: `+-------------------------------------------------------------------------+
|                       Agent Invocation Request                          |
|             (Code Payload, Resource Quota, Tokenized Policy)            |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                    Sandbox Supervisor Daemon (Go)                       |
|   - Strips Linux Capabilities (CAP_DROP ALL)                            |
|   - Applies Memory / CPU Limits via Cgroups                             |
|   - Configures Network Isolation (NetworkMode: none)                    |
|   - Mounts Ephemeral Read-Only RootFS with Temporary Scratch Volume     |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                  Execution & Deterministic Cleanup                      |
|   - Streams stdout/stderr with buffer caps                              |
|   - Synchronous teardown propagating cleanup failures if any remain     |
+-------------------------------------------------------------------------+`,
    decisions: [
      {
        title: "Strict NetworkMode: none by Default",
        decision: "Disabled container networking entirely unless explicitly granted through an inspected proxy token.",
        rationale: "Completely eliminates data exfiltration and reverse shell vulnerabilities from untrusted agent code."
      },
      {
        title: "Synchronous Cleanup Failure Propagation",
        decision: "Treated container cleanup or disk unmount errors as fatal operational events rather than swallowing them in the background.",
        rationale: "Prevents resource leaks and ensures hosts never accumulate orphaned sandboxes over high-throughput execution runs."
      }
    ],
    remediation: "Corrected launcher parity across host architectures, fixed cleanup failure propagation when containers were killed mid-flight, and hardened tokenized policy schemas.",
    results: "Successfully executes untrusted Python and Go payloads with 0% network egress leakage and deterministic sub-second container termination.",
    limitations: "Container-based isolation (gVisor/standard runc); does not claim microVM (Firecracker) hardware-level hypervisor virtualization.",
    tags: ["Go", "Container Security", "Linux Cgroups", "Sandboxing", "AI Safety", "DevSecOps"]
  },
  {
    rank: 4,
    id: "k8s-admission-webhook-from-scratch",
    repo: "k8s-admission-webhook-from-scratch",
    title: "K8s Admission Webhook (From Scratch)",
    tier: "Tier 1: Flagship Architectural Study",
    category: "Kubernetes Internals",
    executiveSummary: "Custom Kubernetes mutating and validating admission webhooks developed from scratch in Go without heavy frameworks, demonstrating raw API contracts, TLS lifecycle, and fail-open/fail-closed policies.",
    problem: "Most admission controller implementations rely on bulky frameworks that obscure the underlying Kubernetes AdmissionReview v1 JSON serialization, TLS certificate lifecycle, and fail-closed vs fail-open availability tradeoffs.",
    architecture: "Lightweight, high-performance HTTP/2 webhook server handling MutatingAdmissionWebhook and ValidatingAdmissionWebhook requests directly via standard Go standard library and k8s.io/api primitives.",
    diagram: `+--------------------+       +---------------------------------------------+
|  kubectl / Client  | ----> |             Kubernetes API Server           |
+--------------------+       +----------------------+----------------------+
                                                    |
                              AdmissionReview (JSON)| (HTTPS POST)
                                                    v
                             +----------------------+----------------------+
                             |      Admission Webhook Server (Go)          |
                             |   - TLS Server with Auto-reloaded Certs     |
                             |   - JSON Patch Mutation (Sidecar Injection) |
                             |   - Security Validation (Disallow Root Pods)|
                             +----------------------+----------------------+
                                                    |
                              AdmissionResponse     | (Allowed / Patch)
                                                    v
                             +----------------------+----------------------+
                             |         etcd Object Persistence             |
                             +---------------------------------------------+`,
    decisions: [
      {
        title: "Hand-Crafted HTTP Server over Controller-Runtime",
        decision: "Built the webhook server using standard Go HTTP primitives without controller-runtime abstraction.",
        rationale: "Provides total transparency over the AdmissionReview v1 API contract, raw JSONPatch generation, and minimal binary footprint (<20MB)."
      },
      {
        title: "Explicit Fail-Closed vs. Fail-Open Strategy",
        decision: "Configured FailurePolicy: Fail for security validation webhooks with multi-replica PDBs and high-availability endpoints.",
        rationale: "Guarantees pods can never bypass security checks even during cluster networking reconfigurations."
      }
    ],
    remediation: "Handled self-signed TLS cert rotation gracefully, resolved JSON patch RFC 6902 ordering issues on nested container arrays, and optimized webhook response latency to <15ms.",
    results: "Sub-15ms p99 admission evaluation latency; 100% policy enforcement across 500+ parallel pod admission test suites.",
    limitations: "Focuses on admission-time contracts; does not perform runtime kernel tracing (eBPF) once pods are running.",
    tags: ["Go", "Kubernetes", "Admission Webhook", "TLS", "JSONPatch", "DevSecOps"]
  },
  {
    rank: 5,
    id: "k8s-golden-path-provisioner",
    repo: "k8s-golden-path-provisioner",
    title: "K8s Golden Path Provisioner",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "Platform Engineering",
    executiveSummary: "Self-service Kubernetes operator provisioning compliant, production-ready namespaces with pre-configured RBAC, default-deny NetworkPolicies, and resource quotas from a single developer CRD.",
    problem: "Development teams spend days filing tickets for new Kubernetes namespaces, resulting in inconsistent security policies, missing network isolation, and unbounded cloud resource consumption.",
    architecture: "A Kubernetes Operator built with Kubebuilder reconciling custom PlatformService and GoldenPath CRDs into hardened namespace environments with automated owner RBAC and resource quotas.",
    diagram: `[Developer CRD: GoldenPath] ---> [Kubernetes Controller Reconciler]
                                         |
     +-------------------+---------------+-------------------+
     |                   |                                   |
     v                   v                                   v
[Hardened Namespace]  [Default-Deny NetworkPolicy]   [ResourceQuotas & Limits]
     |                   |                                   |
     v                   v                                   v
[Role & RoleBinding]  [Scoped ServiceAccount]        [Prometheus ServiceMonitor]`,
    decisions: [
      {
        title: "Unstructured Reconciliation Strategy",
        decision: "Utilized unstructured client reconciliation for underlying Kubernetes primitives during schema evolution.",
        rationale: "Maintained forward compatibility when moving between Kubernetes 1.28 and 1.30 API versions without operator recompilation."
      }
    ],
    remediation: "Resolved race condition between namespace creation and NetworkPolicy attachment; refined CRD validation openAPIV3 schemas.",
    results: "Reduced namespace provisioning time from multiple days to under 3 seconds with guaranteed security compliance by default.",
    limitations: "Manages Kubernetes-native resources; external cloud resources (databases, queues) rely on external Crossplane/Terraform hooks.",
    tags: ["Go", "Kubernetes Operator", "Kubebuilder", "Platform Engineering", "RBAC"]
  },
  {
    rank: 6,
    id: "a2a-incident-mesh",
    repo: "a2a-incident-mesh",
    title: "A2A Incident Mesh",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    executiveSummary: "Agent-to-Agent communication mesh enabling collaborative multi-agent incident response with structured message contracts, coordinator polling, and distributed deadlock avoidance.",
    problem: "Single-agent LLM systems fail on complex production outages requiring concurrent telemetry analysis, network diagnosis, and log correlation due to context exhaustion and lack of specialized domain tooling.",
    architecture: "Mesh architecture featuring a central Incident Coordinator Agent orchestrating specialized worker agents (Telemetry Agent, Log Analysis Agent, Network Diagnostics Agent) using typed JSON-RPC message contracts.",
    diagram: `                   +------------------------------+
                   |  Incident Coordinator Agent  |
                   +--------------+---------------+
                                  |
            +---------------------+---------------------+
            |                     |                     |
            v                     v                     v
+-----------------------+ +--------------------+ +----------------------+
| Observability Agent   | | Log Analyzer Agent | | Network Diag Agent   |
| (Prometheus / Metrics)| | (Loki / Fluentbit) | | (CoreDNS / Cilium)   |
+-----------------------+ +--------------------+ +----------------------+`,
    decisions: [
      {
        title: "Coordinator-Only Polling over P2P Broadcast",
        decision: "Enforced centralized coordinator polling and task allocation rather than unconstrained peer-to-peer agent broadcasts.",
        rationale: "Eliminated infinite feedback loops and message storms between agents diagnosing interdependent services."
      }
    ],
    remediation: "Resolved race condition where cancelled agent subtasks were erroneously marked completed; introduced explicit UUID message mapping.",
    results: "Simulated multi-tier outage triage with 3 specialized agents completed root-cause analysis 4.5x faster than a monolithic LLM prompt.",
    limitations: "Domain outputs currently validated against recorded simulation fixtures; live cloud integration requires authenticated tenant bridges.",
    tags: ["TypeScript", "Multi-Agent Systems", "SRE", "Distributed Systems", "Incident Management"]
  },
  {
    rank: 7,
    id: "inference-performance-lab",
    repo: "inference-performance-lab",
    title: "Inference Performance Lab",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    executiveSummary: "Benchmarking and profiling laboratory for LLM inference serving, characterizing streaming latency, Time-to-First-Token (TTFT), token generation rates, and concurrency bottlenecks.",
    problem: "Evaluating LLM serving engines without standardized arrival rate models leads to unpredictable production latency spikes and misconfigured autoscaling thresholds.",
    architecture: "A Python-based benchmarking suite implementing Poisson and bursty traffic arrival models, real-time token streaming parsers, and statistical p50/p95/p99 latency calculations.",
    diagram: `[Traffic Generator] ---> [Poisson / Bursty Arrival Model]
                                  |
                                  v
                    [LLM Inference Server / vLLM]
                                  |
                                  v
                    [Streaming Response Stream Parser]
                                  |
     +----------------------------+----------------------------+
     |                            |                            |
     v                            v                            v
[Time-to-First-Token (TTFT)]  [Inter-Token Latency (ITL)]  [Throughput (Tokens/sec)]`,
    decisions: [
      {
        title: "Finite-Value Guards on Latency Math",
        decision: "Implemented strict finite-value guards and outlier filtering on streaming latency calculations.",
        rationale: "Prevented statistical distortion when network timeouts or model warmups emitted single-token outliers."
      }
    ],
    remediation: "Fixed single-token response handling in streaming parser; calibrated client concurrency to avoid client-side socket saturation.",
    results: "Quantified TTFT and tokens/sec across concurrency tiers (1-64 concurrent clients), identifying saturation inflection points with high reproducibility.",
    limitations: "Focuses on software serving metrics and client-side profiling; hardware thermal throttling requires bare-metal GPU telemetry.",
    tags: ["Python", "LLM Inference", "Benchmarking", "vLLM", "Performance Engineering"]
  },
  {
    rank: 8,
    id: "k8s-secret-rotation-operator",
    repo: "k8s-secret-rotation-operator",
    title: "K8s Secret Rotation Operator",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "Security & DevSecOps",
    executiveSummary: "Kubernetes operator automating zero-downtime secret generation, lifecycle rotation, and dependent workload rolling updates with dual-credential overlap support.",
    problem: "Manual credential rotation is error-prone and frequently causes service outages when downstream pods restart before newly generated database secrets become valid.",
    architecture: "Custom Kubernetes controller managing SecretRotation CRDs that interface with backend secret stores, maintain previous and next credential versions during rotation, and trigger orchestrated rollout restarts.",
    diagram: `[SecretRotation CRD] ---> [Rotation Controller]
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
[Generate New Secret V2]                      [Maintain Dual-Credential Grace Window]
            |                                               |
            v                                               v
[Update K8s Secret Resource]                   [Trigger Rolling Restart of Dependent Pods]`,
    decisions: [
      {
        title: "Dual-Credential Grace Window",
        decision: "Enforced dual-credential validity period where both V1 and V2 passwords remain accepted by the database during rolling updates.",
        rationale: "Eliminates connection downtime while old pods are draining and new pods are starting."
      }
    ],
    remediation: "Added consumer adoption boundary checks to confirm all pods are healthy on V2 before retiring V1 credentials.",
    results: "Automated rotation cycles completed with 0 failed HTTP requests across continuous 100 RPS simulated traffic.",
    limitations: "Requires backend services or databases to support concurrent multi-version credentials during the rotation grace window.",
    tags: ["Go", "Kubernetes Operator", "Security", "Secret Management", "DevSecOps"]
  },
  {
    rank: 9,
    id: "voice-incident-commander",
    repo: "voice-incident-commander",
    title: "Voice Incident Commander",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    executiveSummary: "Hands-free voice interface for on-call engineers, parsing spoken incident commands into structured Kubernetes queries and runbook mitigation workflows.",
    problem: "During severe critical incidents, engineers on mobile or secondary devices need rapid access to cluster status and runbook triggers without navigating multi-step web consoles.",
    architecture: "WebRTC and WebSocket voice streaming pipeline connected to a speech-to-text engine, intent classification agent with strict confirmation gates, and a Kubernetes cluster query executor.",
    diagram: `[Spoken Voice Command] ---> [WebRTC / Audio Streaming]
                                       |
                                       v
                             [Speech-to-Text Pipeline]
                                       |
                                       v
                         [Intent Classification Agent]
                                       |
                      [Dangerous Action Confirmation Gate]
                                       |
                                       v
                      [Kubernetes API / Runbook Execution]`,
    decisions: [
      {
        title: "Explicit Confirmation Barrier for Mutating Actions",
        decision: "Require explicit dual-phase spoken confirmation before executing any state-mutating runbook (e.g., pod restart, traffic diversion).",
        rationale: "Prevents misrecognized speech phonemes from triggering destructive cluster actions."
      }
    ],
    remediation: "Transitioned from pure browser mocks to structured audio fixture testing; implemented stream cancellation on abrupt disconnects.",
    results: "Achieved sub-800ms speech-to-intent latency for cluster diagnostic queries with zero unverified mutations executed.",
    limitations: "Demonstration runs in local mock audio fixture mode; production deployment depends on external STT API accuracy and ambient noise conditions.",
    tags: ["Python", "Voice AI", "WebRTC", "Platform Engineering", "Incident Management"]
  },
  {
    rank: 10,
    id: "ai-control-plane-demo",
    repo: "ai-control-plane-demo",
    title: "AI Control Plane Demo",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    executiveSummary: "Enterprise control plane orchestrating model routing, token rate-limiting, policy guardrails, and graceful multi-provider fallbacks across distributed AI services.",
    problem: "Uncoordinated direct API calls to commercial LLMs create vendor lock-in, unmonitored security leakage, and system outages when upstream providers degrade.",
    architecture: "Unified proxy gateway implementing intelligent semantic routing, token consumption quotas, PII redaction filters, and automated circuit breakers.",
    diagram: `[Client Application] ---> [AI Control Plane Gateway]
                                    |
            +-----------------------+-----------------------+
            |                       |                       |
            v                       v                       v
[PII Redaction Guardrail]   [Token Quota & Rate Limit]   [Cost / Complexity Router]
            |                       |                       |
            +-----------------------+-----------------------+
                                    |
                                    v
                     [Provider Health Circuit Breaker]
                                    |
                 +------------------+------------------+
                 |                                     |
                 v                                     v
       [Primary Model (Fast)]                [Fallback Model (Backup)]`,
    decisions: [
      {
        title: "Circuit-Breaker Pattern for Upstream Models",
        decision: "Implemented automated circuit breaking with fallback to self-hosted/alternative models upon 3 consecutive upstream 5xx errors.",
        rationale: "Maintains application availability even during widespread major LLM provider outages."
      }
    ],
    remediation: "Clarified stub provider modes vs live endpoints; verified memory efficiency during high-throughput token buffering.",
    results: "Successfully routes requests with <10ms gateway overhead; seamless automated fallback switchover validated under simulated provider 500 errors.",
    limitations: "Focuses on routing and control policies; does not host raw model weights directly.",
    tags: ["TypeScript", "API Gateway", "LLMOps", "Resilience", "Policy Enforcement"]
  },
  {
    rank: 11,
    id: "nhi-agent-access-governance",
    repo: "nhi-agent-access-governance",
    title: "NHI Agent Access Governance",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "Security & DevSecOps",
    executiveSummary: "Governance and auditing platform enforcing least-privilege identity boundaries for Non-Human Identities (NHIs) including service accounts, AI agents, and CI/CD bots.",
    problem: "Proliferation of autonomous AI agents, CI bots, and background microservices creates unmanaged Non-Human Identities with broad, unrotated API tokens and zero runtime auditability.",
    architecture: "Identity broker leveraging workload identity federation (OIDC / SPIFFE), ephemeral scoped tokens with maximum 15-minute TTLs, and append-only cryptographic audit logs.",
    diagram: `[Agent / Bot Workload] ---> [Workload Identity Token (OIDC / SPIFFE)]
                                       |
                                       v
                          [NHI Governance Broker]
                                       |
                 +---------------------+---------------------+
                 |                                           |
                 v                                           v
[Policy & Scope Evaluation]                  [Ephemeral Scoped Token (TTL <= 15m)]
                 |                                           |
                 v                                           v
[Cryptographic Audit Log]                    [Target Resource Access (Least Privilege)]`,
    decisions: [
      {
        title: "Short-Lived Ephemeral Token Exchange",
        decision: "Replaced static long-lived API keys with ephemeral tokens valid for a maximum of 15 minutes.",
        rationale: "Limits the blast radius of any credential leakage or hijacked agent container."
      }
    ],
    remediation: "Unified SPIFFE/OIDC token verification schemas; established tamper-resistant audit record formatting.",
    results: "Validated 100% token expiration enforcement and comprehensive audit trail generation across simulated agent workflow suites.",
    limitations: "Implementation demonstrates policy evaluation and token exchange; integration with enterprise Active Directory / Okta requires custom identity provider mapping.",
    tags: ["IAM", "Security", "Workload Identity", "SPIFFE", "Governance", "DevSecOps"]
  },
  {
    rank: 12,
    id: "supply-chain-security-pipeline",
    repo: "supply-chain-security-pipeline",
    title: "Supply Chain Security Pipeline",
    tier: "Tier 3: Production Delivery & Security",
    category: "Security & DevSecOps",
    executiveSummary: "End-to-end SLSA-aligned software supply chain security pipeline featuring automated SBOM generation, vulnerability scanning, and cryptographic container image signing with Cosign.",
    problem: "Modern container deployments are vulnerable to dependency tampering, unauthorized base image modifications, and unvetted third-party CVEs introduced during build time.",
    architecture: "GitHub Actions CI pipeline that generates CycloneDX/SPDX SBOMs using Syft, scans dependencies with Grype/Trivy, signs images with Cosign keyless OIDC, and produces in-toto provenance attestations.",
    diagram: `[Git Commit / PR] ---> [Container Build] ---> [Syft SBOM Generation]
                                                          |
                                                          v
                                               [Grype Vulnerability Scan]
                                                          |
                                                          v
                                               [Cosign Keyless Signing]
                                                          |
                                                          v
                                               [In-Toto Provenance Attestation]
                                                          |
                                                          v
                                               [Admission Webhook Verification]`,
    decisions: [
      {
        title: "Keyless Cosign Signing via OIDC",
        decision: "Adopted keyless Sigstore/Cosign signing tied to GitHub Actions OIDC identity rather than static private keys.",
        rationale: "Removes private key storage and rotation risks from CI runners entirely."
      }
    ],
    remediation: "Configured vulnerability threshold gates to block build pipelines on CRITICAL CVEs with zero false-positive overrides.",
    results: "100% of published container images cryptographically signed with verifiable provenance and zero unverified images admitted to staging clusters.",
    limitations: "Attestation applies to build-time artifacts; runtime memory injection protection requires host-level eBPF monitoring.",
    tags: ["DevSecOps", "Cosign", "SLSA", "SBOM", "CI/CD", "Security"]
  },
  {
    rank: 13,
    id: "multi-cluster-gitops-promotion",
    repo: "multi-cluster-gitops-promotion",
    title: "Multi-Cluster GitOps Promotion",
    tier: "Tier 3: Production Delivery & Security",
    category: "Cloud & GitOps",
    executiveSummary: "Multi-environment GitOps deployment architecture managing automated, auditable application promotion across development, staging, and production Kubernetes clusters.",
    problem: "Promoting application releases across heterogeneous clusters via manual commits or ad-hoc scripts causes environment drift, configuration divergence, and untracked production changes.",
    architecture: "Repository-driven GitOps structure using Kustomize overlays and ArgoCD ApplicationSets to automate pull-request-driven promotion pipelines with automated smoke testing gates.",
    diagram: `[Application Repo CI] ---> [Build & Test Artifact]
                                      |
                                      v
                      [GitOps Repository (Config)]
                                      |
     +--------------------------------+--------------------------------+
     |                                |                                |
     v                                v                                v
[Dev Cluster (Auto-Sync)]   [Staging (PR Promotion Gate)]   [Production (Gated Release)]
     |                                |                                |
[Smoke Tests OK] ------------> [Create Prod PR] --------------> [Audit & Merge Approval]`,
    decisions: [
      {
        title: "Kustomize Base/Overlay Separation",
        decision: "Standardized on pure Kustomize bases with strict per-environment overlays instead of parameterized Helm values.",
        rationale: "Eliminates templating rendering bugs and enables direct diffing between environment manifests in pull requests."
      }
    ],
    remediation: "Prevented synchronization drift by integrating automated dry-run validation in PR checks before merges.",
    results: "Zero configuration drift across 3 simulated cluster environments with fully auditable Git commit history for all production changes.",
    limitations: "Manages stateless and stateful Kubernetes deployments; database schema migrations require external migration operators.",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "Kustomize", "Platform Engineering"]
  },
  {
    rank: 14,
    id: "gitops-progressive-delivery",
    repo: "gitops-progressive-delivery",
    title: "GitOps Progressive Delivery",
    tier: "Tier 3: Production Delivery & Security",
    category: "Cloud & GitOps",
    executiveSummary: "Progressive delivery framework automating canary and blue-green rollouts on Kubernetes with automated metric analysis and instant rollback capabilities.",
    problem: "All-at-once deployments risk blasting defective code to 100% of user traffic before observability systems can trigger manual intervention.",
    architecture: "Integrated delivery pipeline combining Argo Rollouts/Flagger, service mesh traffic splitting, and automated Prometheus analysis templates evaluating p99 latency and HTTP error rates.",
    diagram: `[New Release V2] ---> [Argo Rollout / Flagger]
                                  |
                                  v
              [Traffic Split: 10% Canary / 90% Stable]
                                  |
                                  v
              [Automated Prometheus Metric Analysis (5m)]
                                  |
                 +----------------+----------------+
                 |                                 |
                 v                                 v
     [Metrics Healthy (p99 < 100ms)]     [Error Spike / Metric Breach]
                 |                                 |
                 v                                 v
     [Progressive Shift: 25% -> 50% -> 100%] [Instant Rollback to Stable V1]`,
    decisions: [
      {
        title: "Metric-Driven Automated Rollback",
        decision: "Configured automated rollback thresholds that immediately abort deployments if error rate exceeds 0.5% during any 1-minute analysis window.",
        rationale: "Protects production user traffic without requiring human on-call engineer intervention."
      }
    ],
    remediation: "Calibrated metric analysis step windows to avoid false positives during container initial startup spikes.",
    results: "Demonstrated automated detection and rollback of injected synthetic defects within 45 seconds of canary traffic introduction.",
    limitations: "Relies on statistically significant traffic volumes; low-traffic endpoints require synthetic traffic generator integration during canaries.",
    tags: ["Kubernetes", "Progressive Delivery", "Argo Rollouts", "Prometheus", "SRE"]
  },
  {
    rank: 15,
    id: "cloud-native-secrets-identity",
    repo: "cloud-native-secrets-identity",
    title: "Cloud-Native Secrets & Workload Identity",
    tier: "Tier 3: Production Delivery & Security",
    category: "Security & DevSecOps",
    executiveSummary: "Enterprise secrets synchronization and workload identity architecture integrating Kubernetes with Azure Key Vault, HashiCorp Vault, and External Secrets Operator (ESO).",
    problem: "Storing static credentials in Kubernetes Secrets without centralized rotation or relying on long-lived cloud service principal keys exposes systems to credential theft and audit failure.",
    architecture: "Workload Identity Federation enabling Kubernetes pods to authenticate directly to Azure Key Vault and HashiCorp Vault via short-lived JWTs, synchronized dynamically via External Secrets Operator.",
    diagram: `[Kubernetes Pod] ---> [ServiceAccount Token (JWT)]
                                   |
                                   v
             [Workload Identity Federation (OIDC Provider)]
                                   |
                                   v
             [Azure Key Vault / HashiCorp Vault Auth]
                                   |
                                   v
             [External Secrets Operator (ESO) Sync]
                                   |
                                   v
             [In-Memory Secret Mount (Non-Persistent)]`,
    decisions: [
      {
        title: "Workload Identity over Service Principal Passwords",
        decision: "Adopted passwordless Workload Identity federation using Kubernetes ServiceAccount OIDC issuers.",
        rationale: "Eliminates static cloud client secrets from repositories and CI/CD pipelines completely."
      }
    ],
    remediation: "Clarified Azure Key Vault vs HashiCorp Vault integration boundaries; verified clean failover when secret store endpoints experienced transient network errors.",
    results: "Completely eliminated static passwords from Kubernetes deployment manifests across all test environments.",
    limitations: "Demonstration covers Azure Key Vault and HashiCorp Vault patterns; AWS Secrets Manager requires corresponding IAM Roles for Service Accounts (IRSA) configuration.",
    tags: ["Security", "Azure Key Vault", "HashiCorp Vault", "Kubernetes", "DevSecOps"]
  },
  {
    rank: 16,
    id: "opentelemetry-microservice-demo",
    repo: "opentelemetry-microservice-demo",
    title: "OpenTelemetry Observability Pipeline",
    tier: "Tier 3: Production Delivery & Security",
    category: "Reliability & SRE",
    executiveSummary: "Standardized distributed tracing, metrics, and log correlation pipeline across microservices using the OpenTelemetry SDK and OpenTelemetry Collector.",
    problem: "Debugging performance regressions across distributed microservice topologies is impossible when telemetry formats are inconsistent and traces cannot correlate to specific logs.",
    architecture: "Polyglot microservices instrumented with OpenTelemetry SDKs exporting via OTLP (gRPC) to an OpenTelemetry Collector gateway routing to Jaeger, Prometheus, and central logging backends.",
    diagram: `[Client Request (W3C TraceContext)] ---> [Frontend Service]
                                                   |
                                                   v
                                          [Backend API Service]
                                                   |
                                                   v
                                          [Database / Store]
                                                   |
                     (OTLP gRPC Export via Background Batcher)
                                                   v
                                     [OpenTelemetry Collector]
                                                   |
                    +------------------------------+------------------------------+
                    |                              |                              |
                    v                              v                              v
           [Jaeger Tracing]             [Prometheus Metrics]              [Central Logs]`,
    decisions: [
      {
        title: "Collector Gateway Pattern over Direct Export",
        decision: "Routed all application telemetry through a centralized OpenTelemetry Collector daemon rather than exporting directly to storage backends.",
        rationale: "Decouples application code from storage backends and allows centralized sampling, PII scrubbing, and retry management."
      }
    ],
    remediation: "Standardized trace context propagation across asynchronous background jobs; verified trace-to-log correlation IDs.",
    results: "Achieved 100% end-to-end trace propagation across synchronous and asynchronous HTTP/gRPC boundaries with <2% CPU overhead.",
    limitations: "Demonstrated with local Jaeger and Prometheus backends; enterprise production deployment requires scalable storage backends (e.g. Tempo / Datadog / Dynatrace).",
    tags: ["OpenTelemetry", "Distributed Tracing", "Observability", "Prometheus", "SRE"]
  },
  {
    rank: 17,
    id: "semantic-llm-cache",
    repo: "semantic-llm-cache",
    title: "Semantic LLM Cache",
    tier: "Tier 3: Production Delivery & Security",
    category: "AI Infrastructure",
    executiveSummary: "High-performance semantic vector caching proxy that intercepts LLM requests, evaluates semantic similarity via vector embeddings, and returns cached responses to drastically slash API costs and latency.",
    problem: "Standard exact-match caching fails for LLM workloads because users ask functionally identical queries with slight phrasing differences, leading to redundant expensive model calls.",
    architecture: "TypeScript proxy using OpenAI/HuggingFace embeddings and Redis Vector Similarity Search (VSS) to calculate cosine similarity against previously resolved queries with configurable confidence thresholds.",
    diagram: `[User Prompt] ---> [Semantic Caching Proxy]
                              |
                              v
                [Compute Vector Embedding]
                              |
                              v
         [Cosine Similarity Query in Redis Vector Store]
                              |
                 +------------+------------+
                 |                         |
                 v                         v
     [Similarity >= Threshold (0.92)]    [Similarity < Threshold]
                 |                         |
                 v                         v
     [Instant Cache Hit (p95 < 15ms)]   [Forward to Upstream LLM Provider]
                                           |
                                           v
                                        [Async Store in Vector Cache]`,
    decisions: [
      {
        title: "Configurable Cosine Similarity Threshold",
        decision: "Implemented a strict configurable similarity threshold (default 0.92) with per-tenant override options.",
        rationale: "Prevents semantic hallucinations or returning stale answers when queries have subtly distinct nuances."
      }
    ],
    remediation: "Added connection pooling for high-concurrency Redis VSS lookups; verified graceful bypass when vector cache is initializing.",
    results: "Delivered 30-60% simulated API cost reduction on repetitive query workloads with p95 response times dropping from 1200ms to <18ms on cache hits.",
    limitations: "Optimal for read-heavy informational queries; real-time conversational contexts with dynamic variables require cache bypass tags.",
    tags: ["TypeScript", "Vector Search", "Redis", "LLMOps", "Performance", "Caching"]
  },
  {
    rank: 18,
    id: "secret-sprawl-remediation-bot",
    repo: "secret-sprawl-remediation-bot",
    title: "Secret Sprawl Remediation Bot",
    tier: "Tier 4: Foundational & Archival Lab",
    category: "Security & DevSecOps",
    executiveSummary: "Archival security research prototype scanning git history for exposed credentials, triggering automated vault revocation, and opening guided remediation pull requests.",
    problem: "Developers inadvertently committing API keys or cloud credentials to git repositories create immediate critical security vulnerabilities that require fast, error-free rotation.",
    architecture: "Git history scanner leveraging pattern heuristics and Shannon entropy analysis, connected to simulated secret store revocation webhooks and automated PR remediation generators.",
    diagram: `[Git Commit Event] ---> [Entropy & Regex Secret Scanner]
                                      |
                                      v
                       [Exposed Secret Identified]
                                      |
                 +--------------------+--------------------+
                 |                                         |
                 v                                         v
   [Automated Revocation Webhook]           [Remediation PR & Vault Migration Spec]
                 |                                         |
                 v                                         v
   [Invalidate Compromised Key]             [Notify Security Team via Slack/Teams]`,
    decisions: [
      {
        title: "Entropy Analysis Combined with Regex Matching",
        decision: "Combined regex pattern rules with Shannon entropy checks to detect high-randomness secrets.",
        rationale: "Reduced false-positive alert fatigue while catching non-standard API tokens."
      }
    ],
    remediation: "Preserved research prototype label; verified safe sandboxed revocation in mock repository fixtures.",
    results: "Demonstrated automated secret detection, revocation webhook dispatch, and remediation branch creation in sub-5 seconds.",
    limitations: "Archival lab prototype; production enterprise deployment recommends integrating established commercial scanners (e.g. GitGuardian / Trufflehog) into CI.",
    tags: ["Security", "Secret Detection", "Automation", "Archival Lab", "DevSecOps"]
  },
  {
    rank: 19,
    id: "idempotent-payment-ledger",
    repo: "idempotent-payment-ledger",
    title: "Idempotent Payment Ledger",
    tier: "Tier 4: Foundational & Archival Lab",
    category: "Reliability & SRE",
    executiveSummary: "Distributed double-entry financial ledger prototype ensuring mathematical balance and exactly-once transaction processing using cryptographic idempotency keys and transactional locking.",
    problem: "Network retries and concurrent payment requests in distributed systems risk executing duplicate transactions, causing account balance discrepancies and financial loss.",
    architecture: "Relational database ledger implementing immutable double-entry journal entries, cryptographic idempotency key hashes, and row-level locking to guarantee consistency.",
    diagram: `[Payment Request (Idempotency-Key)] ---> [Idempotency Gate (Postgres)]
                                                    |
                                                    v
                                      [Check Existing Key Hash]
                                                    |
                      +-----------------------------+-----------------------------+
                      |                                                           |
                      v                                                           v
            [Key Exists in Cache]                                         [New Transaction]
                      |                                                           |
                      v                                                           v
            [Return Cached Response]                                      [Begin Serializable DB Tx]
                                                                                  |
                                                                                  v
                                                                   [Insert Double-Entry Journal:
                                                                    - Debit Source Account
                                                                    - Credit Dest Account]
                                                                                  |
                                                                                  v
                                                                   [Commit Tx & Record Key Hash]`,
    decisions: [
      {
        title: "Immutable Double-Entry Ledger Invariant",
        decision: "Enforced that account balances cannot be modified directly; all balance changes must be derived from immutable balanced debit/credit journal pairs.",
        rationale: "Guarantees zero mathematical discrepancies and provides a complete audit log."
      }
    ],
    remediation: "Preserved foundational lab status; verified transaction isolation levels under concurrent duplicate payment simulation.",
    results: "Validated 100% duplicate prevention across 1,000 concurrent duplicate request attempts with zero balance discrepancies.",
    limitations: "Foundational research prototype exploring distributed ledger invariants; does not include payment gateway banking adapters.",
    tags: ["PostgreSQL", "Distributed Systems", "Idempotency", "FinTech", "Foundational Lab"]
  }
];
