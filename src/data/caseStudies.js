export const caseStudies = [
  {
    rank: 1,
    id: "secure-dev-platform-demo",
    repo: "secure-dev-platform-demo",
    title: "Secure Dev Platform Demo",
    tier: "Tier 1: Flagship Architectural Study",
    category: "Platform Engineering",
    categoryId: "platform",
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
    results: "Validated full 6-stage platform provisioning lifecycle in isolated CI pipelines, verifying policy enforcement across expected-admission and expected-denial test suites.",
    limitations: "Demonstrated scope focuses on core platform orchestration and admission gating; enterprise identity federation and external portal components operate in mock provider mode.",
    tags: ["Kubernetes", "Platform Engineering", "Admission Control", "Go", "NetworkPolicy", "Security"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/secure-dev-platform-demo" },
      { label: "Architecture & Pipeline Spec", url: "https://github.com/SumitDalavi/secure-dev-platform-demo#architecture" },
      { label: "Platform Verification Test Suite", url: "https://github.com/SumitDalavi/secure-dev-platform-demo/tree/main" }
    ]
  },
  {
    rank: 2,
    id: "durable-incident-agent",
    repo: "durable-incident-agent",
    title: "Durable Incident Agent",
    tier: "Tier 1: Flagship Architectural Study",
    category: "Reliability & SRE",
    categoryId: "sre",
    executiveSummary: "Autonomous incident response agent built on durable execution primitives, executing multi-step remediation workflows with human-in-the-loop approval gates and sustained post-mitigation telemetry verification.",
    problem: "Standard automated remediation scripts lack state persistence across crashes, risk executing duplicate actions during retries, and fail to verify whether a mitigation holds over an extended observation window.",
    architecture: "Durable state-machine workflow executing automated anomaly triage, diagnostic artifact collection, approval-gated mitigation, and a sustained cool-down verification loop that observes p95 latency and error rate stability.",
    diagram: `+--------------------+       +----------------------+       +-----------------------+
|  Telemetry Anomaly | ----> | Diagnostic Collector | ----> | Remediation Plan Gen  |
|  (p95 / Error Spike|       | (Logs, Metrics, OTel)|       | (Durable Action Spec) |
+--------------------+       +----------------------+       +-----------+-----------+
                                                                        |
                                                                        v
+--------------------+       +----------------------+       +-----------+-----------+
| Sustained Recovery | <---- | Mitigation Execution | <---- | Human-in-the-Loop     |
| (p95 Cooldown Obs) |       | (Action Checkpoint)  |       | Approval Gate (Auth)  |
+--------------------+       +----------------------+       +-----------------------+`,
    decisions: [
      {
        title: "Durable Step Checkpointing with Evidence Snapshots",
        decision: "Captures structured evidence snapshots and checkpointed step states for every diagnostic evaluation and remediation trigger.",
        rationale: "Maintains recovery progress across process restarts and supplies a structured audit record for post-incident review."
      },
      {
        title: "Sustained Post-Mitigation Cooldown Windows",
        decision: "Enforced an explicit multi-minute observation window tracking p95 latency and error rates before marking an incident resolved.",
        rationale: "Prevents premature incident closure caused by transient metric dips right after pod restarts."
      }
    ],
    remediation: "Eliminated container networking race conditions during parallel diagnostics, added metric cooldown verification, and structured remediation actions with explicit checkpoint boundaries.",
    results: "Validated automated incident triage, approval gate checkpointing, and post-mitigation metric verification across simulated node restart test cases.",
    limitations: "Designed for Kubernetes-orchestrated workloads; external cloud API mitigations rely on adapter contracts rather than universal cloud provider coverage.",
    tags: ["Python", "Durable Execution", "Autonomous Agents", "SRE", "Observability", "Prometheus"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/durable-incident-agent" },
      { label: "Workflow Architecture Document", url: "https://github.com/SumitDalavi/durable-incident-agent#architecture" },
      { label: "Step Checkpoint Verification Suite", url: "https://github.com/SumitDalavi/durable-incident-agent/tree/main" }
    ]
  },
  {
    rank: 3,
    id: "agent-sandbox-platform",
    repo: "agent-sandbox-platform",
    title: "Agent Sandbox Platform",
    tier: "Tier 1: Flagship Architectural Study",
    category: "AI Infrastructure",
    categoryId: "ai",
    executiveSummary: "Containerized runtime sandbox orchestrator built with TypeScript/Node.js and Dockerode, enforcing ephemeral container isolation, execution timeout deadlines, and deterministic cleanup boundaries for untrusted code execution.",
    problem: "Executing untrusted AI-generated code or third-party agent tools directly on host systems risks unauthorized network egress, local resource exhaustion, and lingering zombie processes.",
    architecture: "TypeScript/Node.js supervisor daemon managing ephemeral Docker container lifecycles via Dockerode, enforcing execution timeouts, bounded stdout/stderr stream collection, and synchronous container destruction.",
    diagram: `+-------------------------------------------------------------------------+
|                       Agent Invocation Request                          |
|             (Code Payload, Resource Quota, Tokenized Policy)            |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|         Sandbox Supervisor Daemon (TypeScript / Dockerode)              |
|   - Manages Ephemeral Docker Container Lifecycles                       |
|   - Enforces Process Execution Timeouts & Deadline Clocks               |
|   - Collects stdout/stderr with Strict Output Buffer Caps               |
|   - Runs Execution within Scoped Non-Root Ephemeral Sandboxes           |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                  Execution & Deterministic Cleanup                      |
|   - Streams bounded process output logs                                 |
|   - Synchronous container teardown propagating errors if lingering      |
+-------------------------------------------------------------------------+`,
    decisions: [
      {
        title: "Ephemeral Container Lifecycle & Timeout Enforcement",
        decision: "Orchestrated isolated container instances per task with strict execution timeout deadlines and output stream bounds.",
        rationale: "Prevents runaway processes, unconstrained execution loops, and orphaned containers during untrusted agent tool runs."
      },
      {
        title: "Synchronous Cleanup Failure Propagation",
        decision: "Treated container cleanup or disk unmount errors as fatal operational events rather than swallowing them in the background.",
        rationale: "Prevents resource leaks and ensures hosts never accumulate orphaned sandboxes over high-throughput execution runs."
      }
    ],
    remediation: "Corrected container launcher parity across environments, fixed cleanup failure propagation when containers timed out, and hardened execution schema validation.",
    results: "Successfully executes untrusted code payloads in isolated containers with enforced execution timeouts and verified container destruction on exit.",
    limitations: "Container-based isolation implemented via Dockerode; kernel-level isolation (such as gVisor runsc runtime or Firecracker microVMs), dropped capabilities, and read-only root filesystems represent architectural hardening boundaries identified for future extensions.",
    tags: ["TypeScript", "Node.js", "Dockerode", "Container Security", "Sandboxing", "AI Safety"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/agent-sandbox-platform" },
      { label: "Supervisor Architecture Spec", url: "https://github.com/SumitDalavi/agent-sandbox-platform#architecture" },
      { label: "Sandbox Isolation Test Suite", url: "https://github.com/SumitDalavi/agent-sandbox-platform/tree/main" }
    ]
  },
  {
    rank: 4,
    id: "k8s-admission-webhook-from-scratch",
    repo: "k8s-admission-webhook-from-scratch",
    title: "K8s Admission Webhook (From Scratch)",
    tier: "Tier 1: Flagship Architectural Study",
    category: "Kubernetes Internals",
    categoryId: "k8s",
    executiveSummary: "Custom Kubernetes mutating and validating admission webhooks developed from scratch in Go without third-party frameworks, demonstrating raw API contracts, TLS lifecycle, and fail-open/fail-closed policies.",
    problem: "Most admission controller implementations rely on bulky frameworks that obscure the underlying Kubernetes AdmissionReview v1 JSON serialization, TLS certificate lifecycle, and fail-closed vs fail-open availability tradeoffs.",
    architecture: "Lightweight HTTP/2 webhook server handling MutatingAdmissionWebhook and ValidatingAdmissionWebhook requests directly using standard Go library primitives and k8s.io/api struct models.",
    diagram: `+--------------------+       +---------------------------------------------+
|  kubectl / Client  | ----> |             Kubernetes API Server           |
+--------------------+       +----------------------+----------------------+
                                                    |
                              AdmissionReview (JSON)| (HTTPS POST)
                                                    v
                             +----------------------+----------------------+
                             |      Admission Webhook Server (Go)          |
                             |   - TLS Server with Mounted Certificates    |
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
        title: "Standard Go HTTP Primitives over Framework Abstractions",
        decision: "Built the webhook server using standard Go net/http primitives and k8s.io/api types without controller-runtime abstraction.",
        rationale: "Provides total transparency over AdmissionReview v1 JSON serialization, RFC 6902 JSONPatch generation, and minimal binary footprint."
      },
      {
        title: "Fail-Closed Security Posture Evaluation",
        decision: "Configured FailurePolicy: Fail for security validation webhooks to enforce strict admission security, while documenting the operational availability tradeoffs of fail-closed webhooks.",
        rationale: "Ensures critical admission security policies cannot be bypassed if the webhook is unreachable, treating security rejection as the priority over permissive fail-open bypass."
      }
    ],
    remediation: "Configured TLS server certificate provisioning for API server communication, resolved JSON patch RFC 6902 ordering issues on nested container arrays, and verified non-root pod enforcement.",
    results: "Validated mutating and validating webhook logic against Kubernetes API server AdmissionReview contracts, correctly enforcing label requirements and disallowing unprivileged root containers across automated integration tests.",
    limitations: "Uses static TLS certificate mounting (manual renewal); automated in-cluster rotation via cert-manager and production high-availability configurations (such as multi-replica PodDisruptionBudgets and horizontal scaling) are documented as operational deployment requirements rather than in-tree primitives. Focuses on admission-time contracts rather than runtime kernel enforcement.",
    tags: ["Go", "Kubernetes", "Admission Webhook", "TLS", "JSONPatch", "DevSecOps"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/k8s-admission-webhook-from-scratch" },
      { label: "AdmissionReview Contract Document", url: "https://github.com/SumitDalavi/k8s-admission-webhook-from-scratch#architecture" },
      { label: "Webhook Integration Test Suite", url: "https://github.com/SumitDalavi/k8s-admission-webhook-from-scratch/tree/main" }
    ]
  },
  {
    rank: 5,
    id: "k8s-golden-path-provisioner",
    repo: "k8s-golden-path-provisioner",
    title: "K8s Golden Path Provisioner",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "Platform Engineering",
    categoryId: "platform",
    executiveSummary: "Self-service Kubernetes operator provisioning standardized, isolated namespaces with pre-configured RBAC, default-deny NetworkPolicies, and resource quotas from a single developer CRD.",
    problem: "Development teams often rely on manual ticketing for new Kubernetes namespaces, resulting in inconsistent security configurations, missing network isolation, and unbounded cloud resource consumption.",
    architecture: "A Kubernetes Operator built with Kubebuilder that evolved from an initial PlatformService prototype into a dedicated GoldenPath CRD, reconciling tenant declarations into isolated namespace environments with automated owner RBAC, default-deny NetworkPolicies, and resource quotas.",
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
        title: "CRD Schema Evolution from PlatformService to GoldenPath",
        decision: "Migrated custom resource definitions from an initial PlatformService prototype into a dedicated GoldenPath CRD, leveraging unstructured client reconciliation during the schema evolution.",
        rationale: "Separated higher-level application workload declarations from foundational namespace scaffolding, ensuring clean schema versioning across Kubernetes cluster upgrades."
      }
    ],
    remediation: "Refined CRD validation openAPIV3 schemas during the PlatformService to GoldenPath migration; resolved race condition between namespace provisioning and NetworkPolicy attachment.",
    results: "Automated end-to-end namespace scaffolding from a single CRD, establishing consistent default-deny network isolation, RBAC rolebindings, and resource quotas without manual ticket handoffs.",
    limitations: "Manages Kubernetes-native resources; external cloud resources (databases, queues) rely on external Crossplane/Terraform hooks.",
    tags: ["Go", "Kubernetes Operator", "Kubebuilder", "Platform Engineering", "RBAC"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/k8s-golden-path-provisioner" },
      { label: "Operator Reconciliation Spec", url: "https://github.com/SumitDalavi/k8s-golden-path-provisioner#architecture" },
      { label: "EnvTest Controller Suite", url: "https://github.com/SumitDalavi/k8s-golden-path-provisioner/tree/main" }
    ]
  },
  {
    rank: 6,
    id: "a2a-incident-mesh",
    repo: "a2a-incident-mesh",
    title: "A2A Incident Mesh",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    categoryId: "ai",
    executiveSummary: "Agent-to-Agent communication mesh enabling collaborative multi-agent incident response with structured message contracts, coordinator polling, and distributed deadlock avoidance.",
    problem: "Single-agent LLM systems struggle on multi-service outages requiring concurrent telemetry analysis, network diagnosis, and log correlation due to context limits and lack of domain specialization.",
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
    results: "Validated structured multi-agent interoperability across simulated multi-service incident fixtures, verifying typed JSON-RPC task delegation and preventing coordinator deadlocks.",
    limitations: "Domain outputs currently validated against recorded simulation fixtures; live cloud integration requires authenticated tenant bridges.",
    tags: ["TypeScript", "Multi-Agent Systems", "SRE", "Distributed Systems", "Incident Management"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/a2a-incident-mesh" },
      { label: "Mesh Coordination Architecture", url: "https://github.com/SumitDalavi/a2a-incident-mesh#architecture" },
      { label: "Agent Simulation Fixture Suite", url: "https://github.com/SumitDalavi/a2a-incident-mesh/tree/main" }
    ]
  },
  {
    rank: 7,
    id: "inference-performance-lab",
    repo: "inference-performance-lab",
    title: "Inference Performance Lab",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    categoryId: "ai",
    executiveSummary: "Benchmarking and profiling suite for LLM inference serving, measuring streaming response latencies, Time-to-First-Token (TTFT), and token generation throughput across configurable concurrent client workloads.",
    problem: "Evaluating LLM serving engines without streaming-aware measurement leads to skewed latency averages that conceal initial token wait times and concurrency bottlenecks.",
    architecture: "A Python benchmarking harness featuring streaming response chunk parsers, concurrent client workload execution, and statistical percentile calculations (p50/p95/p99) with finite-value outlier guards.",
    diagram: `[Benchmark Harness] ---> [Configurable Concurrent Workload]
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
        title: "Finite-Value Guards on Streaming Latency Calculations",
        decision: "Implemented strict finite-value validation guards and outlier filtering within the streaming response parser calculations.",
        rationale: "Prevents statistical distortion from dropped packets, incomplete chunks, or model warmup delays during streaming token aggregation."
      }
    ],
    remediation: "Fixed single-token response chunk handling in the streaming parser; calibrated client connection pools to avoid client-side socket exhaustion.",
    results: "Successfully characterized TTFT and token generation throughput across concurrent request workloads, producing reproducible latency distributions and identifying server saturation thresholds.",
    limitations: "Measures application-level serving metrics and client-perceived streaming timings; hardware-level GPU telemetry requires dedicated bare-metal profiling tools.",
    tags: ["Python", "LLM Inference", "Benchmarking", "vLLM", "Performance Engineering"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/inference-performance-lab" },
      { label: "Profiling Methodology Spec", url: "https://github.com/SumitDalavi/inference-performance-lab#architecture" },
      { label: "Benchmark Harness & Test Data", url: "https://github.com/SumitDalavi/inference-performance-lab/tree/main" }
    ]
  },
  {
    rank: 8,
    id: "k8s-secret-rotation-operator",
    repo: "k8s-secret-rotation-operator",
    title: "K8s Secret Rotation Operator",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "Security & DevSecOps",
    categoryId: "security",
    executiveSummary: "Kubernetes operator automating scheduled secret generation, Secret resource reconciliation, and dependent workload rolling restarts, comparing native Kubernetes secret generation against external HashiCorp Vault backends.",
    problem: "Manual credential rotation across Kubernetes clusters is error-prone and uncoordinated, leading to stale secrets and service disruption if workload rollouts are not synchronized with secret updates.",
    architecture: "Custom Kubernetes controller reconciling SecretRotation CRDs to generate updated Secret resources (evaluating native generation versus external Vault integration) and trigger rolling rollout restarts on dependent Deployments.",
    diagram: `[SecretRotation CRD] ---> [Rotation Controller]
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
[Evaluate Generation: Native / Vault]         [Update Target K8s Secret Resource]
            |                                               |
            v                                               v
[Reconcile Target Secret Data]                 [Trigger Rolling Restart of Dependent Pods]`,
    decisions: [
      {
        title: "Native Secret Generation vs. External Vault Architecture",
        decision: "Implemented native Kubernetes Secret generation within the operator while evaluating external Vault backends, deliberately isolating the operator boundary to Kubernetes Secret lifecycle and Deployment rollouts.",
        rationale: "Establishes a clean architectural boundary where the operator manages cluster-level resource reconciliation, treating application-level connection draining and dynamic database credential revocation as separate consumer-side concerns."
      }
    ],
    remediation: "Defined explicit boundary separation between operator Secret reconciliation and downstream client connection draining; evaluated native generation versus external Vault integration patterns.",
    results: "Successfully reconciled rotating credentials and triggered rolling pod restarts across automated controller integration test scenarios.",
    limitations: "Operator manages Kubernetes Secret updates and workload rollout triggers; downstream application in-memory connection refreshing and upstream database user management are intentionally decoupled as external operational boundaries.",
    tags: ["Go", "Kubernetes Operator", "Security", "Secret Management", "DevSecOps"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/k8s-secret-rotation-operator" },
      { label: "Operator Design & Boundary Spec", url: "https://github.com/SumitDalavi/k8s-secret-rotation-operator#architecture" },
      { label: "Controller Integration Test Suite", url: "https://github.com/SumitDalavi/k8s-secret-rotation-operator/tree/main" }
    ]
  },
  {
    rank: 9,
    id: "voice-incident-commander",
    repo: "voice-incident-commander",
    title: "Voice Incident Commander",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    categoryId: "ai",
    executiveSummary: "Hands-free voice interface for on-call engineers, parsing spoken queries into structured Kubernetes diagnostic queries with mandatory on-screen visual confirmation gates for any mutating actions.",
    problem: "During severe critical incidents, engineers on mobile or secondary devices need rapid access to cluster status and runbook triggers without navigating multi-step web consoles.",
    architecture: "WebRTC and WebSocket voice streaming pipeline connected to a speech-to-text engine, intent classification parser for diagnostic inspection, and a strict requirement for visual on-screen approval before any state-mutating runbook execution.",
    diagram: `[Spoken Voice Command] ---> [WebRTC / Audio Streaming]
                                       |
                                       v
                             [Speech-to-Text Pipeline]
                                       |
                                       v
                         [Intent Classification Agent]
                                       |
           +---------------------------+---------------------------+
           | (Read-Only Query)                                     | (Mutating Action)
           v                                                       v
[Execute Diagnostic Query]                               [Visual On-Screen Confirmation Gate]
                                                                   |
                                                         [Engineer Clicks Approve]
                                                                   |
                                                                   v
                                                         [Execute Mutating Runbook]`,
    decisions: [
      {
        title: "On-Screen Visual Approval Barrier for Mutations",
        decision: "Spoken commands are restricted to read-only diagnostics and draft mitigation staging; all state-mutating operations strictly require explicit on-screen visual confirmation.",
        rationale: "Prevents misrecognized speech phonemes or ambient audio noise from triggering destructive cluster actions, enforcing a true two-factor verification boundary."
      }
    ],
    remediation: "Transitioned from pure browser mocks to structured audio fixture testing; implemented stream cancellation on abrupt disconnects.",
    results: "Validated speech-to-intent pipeline for read-only cluster queries and staging draft mitigations, with 100% of mutating actions gated behind visual on-screen confirmation.",
    limitations: "Demonstration runs in local mock audio fixture mode; production deployment depends on external STT API accuracy and ambient noise conditions.",
    tags: ["Python", "Voice AI", "WebRTC", "Platform Engineering", "Incident Management"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/voice-incident-commander" },
      { label: "Audio Pipeline & Security Architecture", url: "https://github.com/SumitDalavi/voice-incident-commander#architecture" },
      { label: "Audio Fixture & Intent Test Suite", url: "https://github.com/SumitDalavi/voice-incident-commander/tree/main" }
    ]
  },
  {
    rank: 10,
    id: "ai-control-plane-demo",
    repo: "ai-control-plane-demo",
    title: "AI Control Plane Demo",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "AI Infrastructure",
    categoryId: "ai",
    executiveSummary: "Control plane proxy orchestrating AI request routing, provider failover simulation, and multi-endpoint mediation supporting both mock/stub and live integration modes.",
    problem: "Directly coupling client applications to single AI provider APIs creates brittle architectures, unpredictable outage behavior, and testing complexity during upstream provider disruptions.",
    architecture: "TypeScript proxy gateway mediating requests across configured AI model endpoints, featuring dual execution modes (deterministic stub simulation for testing versus live upstream forwarding) and error-triggered failover dispatch.",
    diagram: `[Client Application] ---> [AI Control Plane Gateway]
                                    |
            +-----------------------+-----------------------+
            |                       |                       |
            v                       v                       v
[Execution Mode: Stub/Live] [Request Validation & Auth]  [Model Router (Fast vs Primary)]
            |                       |                       |
            +-----------------------+-----------------------+
                                    |
                                    v
                     [Error-Triggered Failover Handler]
                                    |
                 +------------------+------------------+
                 |                                     |
                 v                                     v
       [Primary Model (Fast)]                [Fallback Model (Backup)]`,
    decisions: [
      {
        title: "Stub Simulation vs. Live Endpoint Execution Modes",
        decision: "Engineered dual execution modes: a deterministic stub provider mode for local testing and integration fixtures, alongside live endpoint forwarding with automated failover routing on upstream HTTP errors.",
        rationale: "Enables robust, reproducible end-to-end integration testing and predictable fallback behavior without incurring API billing or external network flakiness."
      }
    ],
    remediation: "Separated mock/stub response fixtures from live network dispatch pipelines and hardened error classification for endpoint failover.",
    results: "Validated seamless request routing and automated failover dispatch across mock and live integration test scenarios, confirming correct fallback routing when primary endpoints return errors.",
    limitations: "Focuses on request routing, stub simulation, and error-handling failover; does not implement specialized in-flight token parsing or self-hosted model inference runtimes.",
    tags: ["TypeScript", "API Gateway", "LLMOps", "Resilience", "Policy Enforcement"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/ai-control-plane-demo" },
      { label: "Gateway Routing & Policy Architecture", url: "https://github.com/SumitDalavi/ai-control-plane-demo#architecture" },
      { label: "Failover Simulation Test Suite", url: "https://github.com/SumitDalavi/ai-control-plane-demo/tree/main" }
    ]
  },
  {
    rank: 11,
    id: "nhi-agent-access-governance",
    repo: "nhi-agent-access-governance",
    title: "NHI Agent Access Governance",
    tier: "Tier 2: Advanced Systems & AI-Infra",
    category: "Security & DevSecOps",
    categoryId: "security",
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
    results: "Validated token expiration enforcement and audit trail generation across simulated agent workflow suites.",
    limitations: "Implementation demonstrates policy evaluation and token exchange; integration with enterprise Active Directory / Okta requires custom identity provider mapping.",
    tags: ["IAM", "Security", "Workload Identity", "SPIFFE", "Governance", "DevSecOps"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/nhi-agent-access-governance" },
      { label: "Identity Governance Architecture Spec", url: "https://github.com/SumitDalavi/nhi-agent-access-governance#architecture" },
      { label: "Token Exchange & Audit Test Suite", url: "https://github.com/SumitDalavi/nhi-agent-access-governance/tree/main" }
    ]
  },
  {
    rank: 12,
    id: "supply-chain-security-pipeline",
    repo: "supply-chain-security-pipeline",
    title: "Supply Chain Security Pipeline",
    tier: "Tier 3: Production Delivery & Security",
    category: "Security & DevSecOps",
    categoryId: "security",
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
    results: "Successfully signed container images with verifiable provenance attestations and validated signature verification in downstream admission checks.",
    limitations: "Attestation applies to build-time artifacts; runtime memory injection protection requires host-level eBPF monitoring.",
    tags: ["DevSecOps", "Cosign", "SLSA", "SBOM", "CI/CD", "Security"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/supply-chain-security-pipeline" },
      { label: "SLSA Pipeline Architecture Spec", url: "https://github.com/SumitDalavi/supply-chain-security-pipeline#architecture" },
      { label: "Provenance & Verification Workflow", url: "https://github.com/SumitDalavi/supply-chain-security-pipeline/tree/main" }
    ]
  },
  {
    rank: 13,
    id: "multi-cluster-gitops-promotion",
    repo: "multi-cluster-gitops-promotion",
    title: "Multi-Cluster GitOps Promotion",
    tier: "Tier 3: Production Delivery & Security",
    category: "Cloud & GitOps",
    categoryId: "cloud",
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
    results: "Validated consistent configuration promotion across 3 simulated cluster environments with fully auditable Git commit history.",
    limitations: "Manages stateless and stateful Kubernetes deployments; database schema migrations require external migration operators.",
    tags: ["GitOps", "ArgoCD", "Kubernetes", "Kustomize", "Platform Engineering"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/multi-cluster-gitops-promotion" },
      { label: "Promotion Flow & Kustomize Spec", url: "https://github.com/SumitDalavi/multi-cluster-gitops-promotion#architecture" },
      { label: "ArgoCD ApplicationSet Manifests", url: "https://github.com/SumitDalavi/multi-cluster-gitops-promotion/tree/main" }
    ]
  },
  {
    rank: 14,
    id: "gitops-progressive-delivery",
    repo: "gitops-progressive-delivery",
    title: "GitOps Progressive Delivery",
    tier: "Tier 3: Production Delivery & Security",
    category: "Cloud & GitOps",
    categoryId: "cloud",
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
        decision: "Configured automated rollback thresholds that abort deployments if error rate spikes during analysis windows.",
        rationale: "Protects production user traffic without requiring human on-call engineer intervention."
      }
    ],
    remediation: "Calibrated metric analysis step windows to avoid false positives during container initial startup spikes.",
    results: "Demonstrated automated detection and rollback of injected synthetic defects during canary traffic progression.",
    limitations: "Relies on statistically significant traffic volumes; low-traffic endpoints require synthetic traffic generator integration during canaries.",
    tags: ["Kubernetes", "Progressive Delivery", "Argo Rollouts", "Prometheus", "SRE"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/gitops-progressive-delivery" },
      { label: "Canary Analysis & Rollout Spec", url: "https://github.com/SumitDalavi/gitops-progressive-delivery#architecture" },
      { label: "Argo Rollouts Analysis Templates", url: "https://github.com/SumitDalavi/gitops-progressive-delivery/tree/main" }
    ]
  },
  {
    rank: 15,
    id: "cloud-native-secrets-identity",
    repo: "cloud-native-secrets-identity",
    title: "Cloud-Native Secrets & Workload Identity",
    tier: "Tier 3: Production Delivery & Security",
    category: "Security & DevSecOps",
    categoryId: "security",
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
    results: "Eliminated static passwords from Kubernetes deployment manifests across all test environments.",
    limitations: "Demonstration covers Azure Key Vault and HashiCorp Vault patterns; AWS Secrets Manager requires corresponding IAM Roles for Service Accounts (IRSA) configuration.",
    tags: ["Security", "Azure Key Vault", "HashiCorp Vault", "Kubernetes", "DevSecOps"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/cloud-native-secrets-identity" },
      { label: "Workload Identity Federation Spec", url: "https://github.com/SumitDalavi/cloud-native-secrets-identity#architecture" },
      { label: "ExternalSecret Synchronization Manifests", url: "https://github.com/SumitDalavi/cloud-native-secrets-identity/tree/main" }
    ]
  },
  {
    rank: 16,
    id: "opentelemetry-microservice-demo",
    repo: "opentelemetry-microservice-demo",
    title: "OpenTelemetry Observability Pipeline",
    tier: "Tier 3: Production Delivery & Security",
    category: "Reliability & SRE",
    categoryId: "sre",
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
    results: "Achieved end-to-end trace propagation across synchronous and asynchronous HTTP/gRPC boundaries with low CPU overhead.",
    limitations: "Demonstrated with local Jaeger and Prometheus backends; enterprise production deployment requires scalable storage backends (e.g. Tempo / Datadog / Dynatrace).",
    tags: ["OpenTelemetry", "Distributed Tracing", "Observability", "Prometheus", "SRE"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/opentelemetry-microservice-demo" },
      { label: "Telemetry Pipeline Architecture", url: "https://github.com/SumitDalavi/opentelemetry-microservice-demo#architecture" },
      { label: "OTel Collector Config & Test Suite", url: "https://github.com/SumitDalavi/opentelemetry-microservice-demo/tree/main" }
    ]
  },
  {
    rank: 17,
    id: "semantic-llm-cache",
    repo: "semantic-llm-cache",
    title: "Semantic LLM Cache",
    tier: "Tier 3: Production Delivery & Security",
    category: "AI Infrastructure",
    categoryId: "ai",
    executiveSummary: "High-performance semantic vector caching proxy that intercepts LLM requests, evaluates semantic similarity via vector embeddings, and returns cached responses to reduce API costs and latency.",
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
     [Instant Cache Hit]                 [Forward to Upstream LLM Provider]
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
    results: "Demonstrated effective cache hit retrieval on semantically equivalent queries, bypassing upstream model calls with local vector store lookups.",
    limitations: "Optimal for read-heavy informational queries; real-time conversational contexts with dynamic variables require cache bypass tags.",
    tags: ["TypeScript", "Vector Search", "Redis", "LLMOps", "Performance", "Caching"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/semantic-llm-cache" },
      { label: "Vector Caching Architecture Spec", url: "https://github.com/SumitDalavi/semantic-llm-cache#architecture" },
      { label: "Similarity Benchmark Test Suite", url: "https://github.com/SumitDalavi/semantic-llm-cache/tree/main" }
    ]
  },
  {
    rank: 18,
    id: "secret-sprawl-remediation-bot",
    repo: "secret-sprawl-remediation-bot",
    title: "Secret Sprawl Remediation Bot",
    tier: "Tier 4: Foundational & Archival Lab",
    category: "Security & DevSecOps",
    categoryId: "security",
    executiveSummary: "Archival security research prototype scanning git history for exposed credentials, triggering automated vault revocation, and opening guided remediation pull requests.",
    problem: "Developers inadvertently committing API keys or cloud credentials to git repositories create immediate security vulnerabilities that require fast, error-free rotation.",
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
    results: "Demonstrated automated secret detection, revocation webhook dispatch, and remediation branch creation in local fixtures.",
    limitations: "Archival lab prototype; production enterprise deployment recommends integrating established commercial scanners (e.g. GitGuardian / Trufflehog) into CI.",
    tags: ["Security", "Secret Detection", "Automation", "Archival Lab", "DevSecOps"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/secret-sprawl-remediation-bot" },
      { label: "Scanner Heuristics & Design Spec", url: "https://github.com/SumitDalavi/secret-sprawl-remediation-bot#architecture" },
      { label: "Mock Repository Fixtures & Tests", url: "https://github.com/SumitDalavi/secret-sprawl-remediation-bot/tree/main" }
    ]
  },
  {
    rank: 19,
    id: "idempotent-payment-ledger",
    repo: "idempotent-payment-ledger",
    title: "Idempotent Payment Ledger",
    tier: "Tier 4: Foundational & Archival Lab",
    category: "Reliability & SRE",
    categoryId: "sre",
    executiveSummary: "Distributed double-entry financial ledger prototype ensuring mathematical balance and deterministic transaction processing with duplicate request suppression using cryptographic idempotency keys and transactional locking.",
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
    results: "Validated duplicate prevention across concurrent duplicate request attempts with zero balance discrepancies in integration test runs.",
    limitations: "Foundational research prototype exploring distributed ledger invariants; does not include payment gateway banking adapters.",
    tags: ["PostgreSQL", "Distributed Systems", "Idempotency", "FinTech", "Foundational Lab"],
    sources: [
      { label: "Source Code Repository", url: "https://github.com/SumitDalavi/idempotent-payment-ledger" },
      { label: "Double-Entry Invariants Specification", url: "https://github.com/SumitDalavi/idempotent-payment-ledger#architecture" },
      { label: "Concurrency Isolation Test Suite", url: "https://github.com/SumitDalavi/idempotent-payment-ledger/tree/main" }
    ]
  }
];
