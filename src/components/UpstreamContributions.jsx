import React from 'react';
import { GitPullRequest, ExternalLink, CheckCircle2, GitFork, Calendar } from 'lucide-react';

const UpstreamContributions = () => {
  const contributions = [
    {
      title: "Argo CD — CLI Wait-Condition Correctness",
      repo: "argoproj/argo-cd",
      prNumber: "#29627",
      prUrl: "https://github.com/argoproj/argo-cd/pull/29627",
      mergedDate: "7 October 2026",
      status: "Merged",
      description: "Fixed argocd app wait handling of application-wide operation and hydration conditions when specific resources are selected. Separated global wait conditions from resource-level health and synchronization checks.",
      tags: ["Go", "GitOps", "CLI", "Correctness"]
    },
    {
      title: "OpenTelemetry — Delta Metric Aggregation",
      repo: "open-telemetry/opentelemetry-collector-contrib",
      prNumber: "#50922",
      prUrl: "https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/50922",
      mergedDate: "18 September 2026",
      status: "Merged",
      description: "Added delta-temporality metric aggregation support to the Collector's interval processor, with updated tests covering accumulation across intervals.",
      tags: ["Go", "OpenTelemetry", "Metrics", "Testing"]
    },
    {
      title: "OpenTelemetry — Closing a CI Coverage Gap",
      repo: "open-telemetry/opentelemetry-collector-contrib",
      prNumber: "#50790",
      prUrl: "https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/50790",
      mergedDate: "9 September 2026",
      status: "Merged",
      description: "Added scoped CI execution for tests tagged //go:build !race, which were excluded from race-enabled test runs. Preserved existing race-enabled coverage while adding targeted package discovery and a separate test job.",
      tags: ["GitHub Actions", "Go", "CI/CD", "Test Coverage"]
    }
  ];

  return (
    <section id="upstream" className="section animate-fade-in delay-300">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            <span className="text-gradient">Selected Merged</span> Upstream Contributions
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Direct engineering contributions merged into upstream cloud-native infrastructure, distributed observability, and progressive delivery repositories.
          </p>
        </div>

        <div className="grid grid-3">
          {contributions.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-panel" 
              style={{ 
                padding: '2rem', 
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid hsla(var(--accent-primary), 0.3)'
              }}
            >
              {/* Header Status & Merge Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span className="badge-tier" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={12} />
                  Merged {item.mergedDate}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}>
                  <CheckCircle2 size={15} />
                  {item.status}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.25rem', lineHeight: '1.35', marginBottom: '0.5rem' }}>
                <a 
                  href={item.prUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover-accent"
                  style={{ color: 'inherit' }}
                >
                  {item.title}
                </a>
              </h3>

              {/* Target Repo & PR badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--accent-primary))', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <GitFork size={14} style={{ flexShrink: 0 }} />
                <code style={{ fontSize: '0.85rem' }}>{item.repo} {item.prNumber}</code>
              </div>

              {/* Description */}
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.925rem', lineHeight: '1.65', marginBottom: '1.5rem', flexGrow: 1 }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-pill" style={{ fontSize: '0.75rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Direct Primary Action: View Merged PR */}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <a
                  href={item.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.55rem 1rem' }}
                >
                  <GitPullRequest size={15} />
                  View Merged PR
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Action: More GitHub Activity */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a 
            href="https://github.com/SumitDalavi?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline"
            style={{ borderRadius: '100px', fontSize: '0.9rem', padding: '0.65rem 1.75rem' }}
          >
            <GitPullRequest size={16} />
            Explore More Activity on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpstreamContributions;
