import React, { useState } from 'react';
import { PROCESS_STEPS } from '../../data/siteContent';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="section section-surface process-section" aria-label="Our Process">
      <div className="container">
        <div className="process-header">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>HOW WE BUILD</span>
          </div>
          <h2 className="section-title">
            OUR <span className="text-blue editorial-italic">PROCESS.</span>
          </h2>
          <p className="process-intro">
            A battle-tested production sequence that takes ideas from raw strategic insight to global market dominance.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="process-timeline-wrapper">
          <div className="process-progress-line" aria-hidden="true">
            <div
              className="progress-fill"
              style={{ width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          <div className="process-steps-row">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div
                  key={step.step}
                  className={`process-step-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveStep(idx);
                  }}
                >
                  <div className="step-circle">
                    <span>{step.step}</span>
                  </div>

                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <h4 className="step-subtitle">{step.subtitle}</h4>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .process-section {
          border-bottom: 1px solid var(--color-border);
        }

        .process-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto clamp(2.5rem, 5vw, 4rem);
        }

        .process-header .section-title {
          margin-bottom: 1rem;
        }

        .process-intro {
          font-size: 1rem;
          color: var(--color-muted);
          line-height: 1.6;
        }

        .process-timeline-wrapper {
          position: relative;
          margin-top: 2rem;
        }

        .process-progress-line {
          position: absolute;
          top: 28px;
          left: 5%;
          right: 5%;
          height: 2px;
          background: var(--color-border);
          z-index: 1;
          display: none;
        }

        @media (min-width: 900px) {
          .process-progress-line {
            display: block;
          }
        }

        .progress-fill {
          height: 100%;
          background: var(--color-blue);
          transition: width 0.4s ease;
        }

        .process-steps-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 900px) {
          .process-steps-row {
            grid-template-columns: repeat(5, 1fr);
            gap: 1.5rem;
          }
        }

        .process-step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: transform var(--transition-fast);
          padding: 1rem;
        }

        @media (max-width: 899px) {
          .process-step-node {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            gap: 1.25rem;
            padding: 0.75rem 0.5rem;
          }
          .process-step-node .step-circle {
            margin-bottom: 0;
            flex-shrink: 0;
          }
        }

        .process-step-node:hover {
          transform: translateY(-4px);
        }

        .step-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--color-muted);
          margin-bottom: 1.5rem;
          transition: all var(--transition-normal);
          box-shadow: 0 4px 12px rgba(11, 13, 18, 0.04);
        }

        .process-step-node.active .step-circle {
          border-color: var(--color-blue);
          background: var(--color-blue);
          color: #FFFFFF;
          box-shadow: 0 0 0 6px rgba(23, 70, 255, 0.16);
        }

        .process-step-node.past .step-circle {
          border-color: var(--color-blue);
          color: var(--color-blue);
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .step-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--color-text);
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .process-step-node.active .step-title {
          color: var(--color-blue);
        }

        .step-subtitle {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-muted);
          margin-bottom: 0.5rem;
        }

        .step-desc {
          font-size: 0.875rem;
          line-height: 1.55;
          color: var(--color-muted);
        }
      `}</style>
    </section>
  );
};
