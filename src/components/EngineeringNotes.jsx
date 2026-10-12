import React, { useState } from 'react';
import { FileCode, ChevronDown, ChevronUp, BookOpen, Terminal, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const EngineeringNotes = () => {
  const [expandedNote, setExpandedNote] = useState(null);

  const notes = [
    {
      id: "durable-incident-agents",
      title: "Designing Resilient Incident Agents: Durable State Machines Over Stateless Prompts",
      category: "SRE & Autonomous Agents",
      readTime: "4 min read",
      summary: "Why automating production remediation with raw LLM scripts fails under network partitions, and how durable execution state machines guarantee idempotent, verifiable recovery.",
      invariants: [
        "Every diagnostic artifact must receive a cryptographically unique Evidence ID before state mutation.",
        "Mutating actions must enforce an explicit human-in-the-loop authorization barrier with cryptographic audit trails.",
        "Incidents cannot be closed immediately post-restart; an explicit observation cooldown tracking p95 latency is mandatory."
      ],
      blueprint: `// Pseudocode: Durable Remediation State Machine
async function executeRemediation(incident) {
  const checkpoint = await loadCheckpoint(incident.id);
  
  if (!checkpoint.diagnosticsCollected) {
    const evidence = await collectTelemetryEvidence(incident);
    await persistCheckpoint(incident.id, { evidenceId: evidence.id, diagnosticsCollected: true });
  }

  if (!checkpoint.humanApproved) {
    await requestApprovalGate(incident.id, checkpoint.evidenceId);
    return; // Suspends execution durably until approval callback
  }

  // Idempotent execution
  await idempotentMitigate(incident.remediationAction);

  // Mandatory sustained cooldown observation
  await observeCooldownWindow({
    metric: 'http_request_duration_seconds{quantile="0.95"}',
    thresholdMs: 150,
    windowDuration: '5m'
  });
}`,
      takeaway: "Autonomous agents in production must treat restarts and transient telemetry drops as standard conditions, maintaining state across process crashes without repeating destructive actions."
    },
    {
      id: "k8s-admission-internals",
      title: "Zero-Trust Kubernetes Admission: Hand-Crafting Webhooks in Go",
      category: "Kubernetes Internals",
      readTime: "5 min read",
      summary: "Deconstructing the AdmissionReview v1 API contract, avoiding bulky controller dependencies, and engineering high-availability fail-closed security policies.",
      invariants: [
        "Security validation webhooks must configure FailurePolicy: Fail backed by multi-replica PodDisruptionBudgets.",
        "JSONPatch operations must strictly adhere to RFC 6902 ordering when appending to container or volume mounts.",
        "TLS certificates must reload dynamically in memory to eliminate API server TLS handshake timeouts during cert rotation."
      ],
      blueprint: `// Handler: Raw AdmissionReview v1 Evaluation
func HandleAdmission(w http.ResponseWriter, r *http.Request) {
    var review admissionv1.AdmissionReview
    if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
        http.Error(w, "invalid request payload", http.StatusBadRequest)
        return
    }

    req := review.Request
    resp := &admissionv1.AdmissionResponse{UID: req.UID, Allowed: true}

    var pod corev1.Pod
    if err := json.Unmarshal(req.Object.Raw, &pod); err == nil {
        if pod.Spec.SecurityContext != nil && pod.Spec.SecurityContext.RunAsRoot != nil && *pod.Spec.SecurityContext.RunAsRoot {
            resp.Allowed = false
            resp.Result = &metav1.Status{Message: "root execution disallowed by security policy"}
        }
    }

    review.Response = resp
    json.NewEncoder(w).Encode(review)
}`,
      takeaway: "Building admission controllers without framework overhead provides minimal binary footprint, deterministic resource consumption, and absolute clarity on raw Kubernetes AdmissionReview API contracts."
    },
    {
      id: "graceful-secrets-rotation",
      title: "Graceful Secret Rotation: The Dual-Credential Grace Window Pattern",
      category: "DevSecOps & Platform Security",
      readTime: "4 min read",
      summary: "How to rotate critical database and API credentials in Kubernetes without triggering connection pool dropouts or race conditions during rolling restarts.",
      invariants: [
        "Backend databases must support dual-password overlap during the rotation transition.",
        "New credentials (V2) must be provisioned and verified valid before Kubernetes Secret resources update.",
        "Old credentials (V1) must only be revoked after all running pods report healthy on V2 across an automated drain cycle."
      ],
      blueprint: `Dual-Credential Grace Window Lifecycle:
1. Operator generates Password_V2 in Database (both V1 and V2 valid)
2. Operator updates Kubernetes Secret with V2
3. Dependent Deployments perform rolling rollout (Pods start with V2)
4. Readiness gates confirm all replicas running on V2
5. Operator revokes Password_V1 after grace window expiration (e.g., 30m)`,
      takeaway: "Never treat secret rotation as an instantaneous atomic switch. High-availability systems require an overlapping grace period where old and new credentials coexist safely."
    },
    {
      id: "agent-sandboxing-boundaries",
      title: "Sandboxing Untrusted AI Code: Linux Cgroups, Namespaces & Network Isolation",
      category: "AI Security & Infrastructure",
      readTime: "4 min read",
      summary: "Why prompt guardrails cannot guarantee safe execution of untrusted AI-generated code, and how Linux kernel primitives establish deterministic, isolated execution boundaries.",
      invariants: [
        "Containers must drop all capabilities (CAP_DROP ALL) and enforce an unprivileged non-root user ID.",
        "Default network mode must be NetworkMode: none unless an authenticated proxy token is explicitly granted.",
        "Cleanup failures must be treated as fatal operational events rather than ignored as background warnings."
      ],
      blueprint: `// Docker/Containerd Execution Policy Spec
HostConfig: {
    NetworkMode: "none",            // Complete network egress isolation
    CapDrop:     ["ALL"],           // Strip all Linux root capabilities
    Memory:      256 * 1024 * 1024, // 256MB hard memory ceiling
    NanoCPUs:    1000000000,        // 1 CPU core throttle
    ReadonlyRootfs: true,           // Read-only filesystem
    SecurityOpt: ["no-new-privileges:true"],
    Tmpfs: map[string]string{
        "/tmp": "rw,noexec,nosuid,size=64m",
    },
}`,
      takeaway: "Security boundaries for autonomous agent code execution must be enforced at the OS and container runtime layers, never relying on probabilistic LLM system prompts."
    }
  ];

  return (
    <section id="engineering-notes" className="section animate-fade-in delay-300" style={{ background: 'rgba(var(--glass-rgb), 0.25)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            <span className="text-gradient">Engineering Notes</span> & Architecture ADRs
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            In-depth decision records, architectural invariants, and design principles synthesized from Kubernetes, platform engineering, and AI infrastructure deployments.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.75rem' }}>
          {notes.map((note) => {
            const isExpanded = expandedNote === note.id;
            return (
              <div 
                key={note.id}
                className="glass-panel"
                style={{ 
                  padding: '2rem',
                  border: isExpanded ? '1px solid hsla(var(--accent-primary), 0.4)' : '1px solid var(--glass-border)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span className="badge-tier" style={{ fontSize: '0.72rem' }}>
                      {note.category}
                    </span>
                    <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem' }}>
                      {note.readTime}
                    </span>
                  </div>
                  <button
                    onClick={() => setExpandedNote(isExpanded ? null : note.id)}
                    className="btn btn-outline"
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', borderRadius: '100px' }}
                  >
                    {isExpanded ? (
                      <>Collapse Note <ChevronUp size={14} /></>
                    ) : (
                      <>Read Full Note <ChevronDown size={14} /></>
                    )}
                  </button>
                </div>

                <h3 style={{ fontSize: '1.35rem', lineHeight: '1.35', marginBottom: '0.75rem' }}>
                  <button
                    onClick={() => setExpandedNote(isExpanded ? null : note.id)}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                    className="hover-accent"
                  >
                    {note.title}
                  </button>
                </h3>

                <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: '1.65', fontSize: '1rem', marginBottom: isExpanded ? '1.75rem' : '0' }}>
                  {note.summary}
                </p>

                {/* Expanded Article Body */}
                {isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                    {/* Architectural Invariants */}
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: 'hsl(var(--accent-primary))', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShieldCheck size={18} />
                        Non-Negotiable System Invariants
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {note.invariants.map((inv, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.95rem' }}>
                            <CheckCircle2 size={16} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                            <span>{inv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architecture Blueprint / Code */}
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: 'hsl(var(--accent-primary))', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Terminal size={18} />
                        Architectural Pattern & Implementation
                      </h4>
                      <div className="diagram-box">
                        <pre>{note.blueprint}</pre>
                      </div>
                    </div>

                    {/* Key Takeaway */}
                    <div style={{ background: 'hsla(var(--accent-primary), 0.08)', borderLeft: '3px solid hsl(var(--accent-primary))', borderRadius: '6px', padding: '1rem 1.25rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'hsl(var(--accent-primary))', display: 'block', marginBottom: '0.25rem' }}>
                        Core Leadership Takeaway:
                      </span>
                      <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        {note.takeaway}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringNotes;
