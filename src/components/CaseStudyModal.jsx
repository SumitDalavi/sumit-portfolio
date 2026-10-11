import React, { useEffect } from 'react';
import { X, ExternalLink, Shield, Cpu, CheckCircle2, AlertTriangle, Layers, GitBranch, ArrowRight } from 'lucide-react';

const CaseStudyModal = ({ caseStudy, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!caseStudy) return null;

  return (
    <div 
      className="modal-backdrop animate-fade-in" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div 
        className="modal-container glass-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span className="badge-rank">
              Rank #{caseStudy.rank}
            </span>
            <span className="badge-tier">
              {caseStudy.tier}
            </span>
            <span className="badge-category">
              {caseStudy.category}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <h2 id="case-study-title" style={{ fontSize: '1.85rem', lineHeight: '1.2' }}>
              <span className="text-gradient">{caseStudy.title}</span>
            </h2>
            <button 
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close case study"
            >
              <X size={22} />
            </button>
          </div>

          <p style={{ color: 'hsl(var(--text-secondary))', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {caseStudy.executiveSummary}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <a 
              href={`https://github.com/SumitDalavi/${caseStudy.repo}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
            >
              <GitBranch size={16} />
              View Source Repository on GitHub
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Problem Statement */}
          <section className="modal-section">
            <h3 className="modal-section-title">
              <Shield size={20} className="text-gradient" />
              Problem & Engineering Constraints
            </h3>
            <p className="modal-section-text">
              {caseStudy.problem}
            </p>
          </section>

          {/* Architecture & Flow Diagram */}
          <section className="modal-section">
            <h3 className="modal-section-title">
              <Layers size={20} className="text-gradient" />
              Architecture & Data Flow
            </h3>
            <p className="modal-section-text" style={{ marginBottom: '1rem' }}>
              {caseStudy.architecture}
            </p>
            {caseStudy.diagram && (
              <div className="diagram-box">
                <pre>{caseStudy.diagram}</pre>
              </div>
            )}
          </section>

          {/* Key Architectural Decisions (ADRs) */}
          {caseStudy.decisions && caseStudy.decisions.length > 0 && (
            <section className="modal-section">
              <h3 className="modal-section-title">
                <Cpu size={20} className="text-gradient" />
                Architectural Decisions & Tradeoffs (ADRs)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {caseStudy.decisions.map((adr, idx) => (
                  <div key={idx} className="adr-card">
                    <h4 style={{ fontSize: '1.05rem', color: 'hsl(var(--accent-primary))', marginBottom: '0.35rem' }}>
                      {adr.title}
                    </h4>
                    <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      <strong>Decision:</strong> {adr.decision}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>
                      <strong>Rationale:</strong> {adr.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Engineering Evolution & Remediation */}
          <section className="modal-section">
            <h3 className="modal-section-title">
              <ArrowRight size={20} className="text-gradient" />
              Engineering Evolution & Solved Blockers
            </h3>
            <p className="modal-section-text">
              {caseStudy.remediation}
            </p>
          </section>

          {/* Recorded Results & Evidence */}
          <section className="modal-section">
            <h3 className="modal-section-title">
              <CheckCircle2 size={20} style={{ color: '#10b981' }} />
              Recorded Evidence & Verification
            </h3>
            <div className="evidence-card">
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                {caseStudy.results}
              </p>
            </div>
          </section>

          {/* Scope Boundaries & Limitations */}
          <section className="modal-section">
            <h3 className="modal-section-title">
              <AlertTriangle size={20} style={{ color: '#f59e0b' }} />
              Scope Boundaries & Production Limitations
            </h3>
            <p className="modal-section-text" style={{ fontStyle: 'italic', color: 'hsl(var(--text-secondary))' }}>
              {caseStudy.limitations}
            </p>
          </section>

          {/* Tech Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
            {caseStudy.tags.map((tag, tIdx) => (
              <span key={tIdx} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <a 
            href={`https://github.com/SumitDalavi/${caseStudy.repo}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline"
            style={{ fontSize: '0.9rem' }}
          >
            Open on GitHub <ExternalLink size={14} />
          </a>
          <button 
            onClick={onClose}
            className="btn btn-primary"
            style={{ fontSize: '0.9rem' }}
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
