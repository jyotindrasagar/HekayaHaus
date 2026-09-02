import React from 'react';
import { PROVEN_METRICS } from '../../data/siteContent';

export const MetricsSection: React.FC = () => {
  return (
    <section className="section section-navy metrics-section" aria-label="Proven Performance Metrics">
      <div className="container">
        <div className="metrics-header">
          <div className="eyebrow eyebrow-inverse">
            <span className="eyebrow-dot" style={{ backgroundColor: 'var(--color-blue-soft)' }} />
            <span>MEASURABLE IMPACT</span>
          </div>
          <h2 className="section-title text-inverse">
            RESULTS THAT <span className="text-blue editorial-italic">MATTER.</span>
          </h2>
        </div>

        <div className="metrics-grid">
          {PROVEN_METRICS.map((metric) => (
            <div key={metric.label} className="metric-box">
              <div className={`metric-number ${metric.highlight ? 'highlight-blue' : ''}`}>
                {metric.value}
              </div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .metrics-section {
          background-color: var(--color-navy);
          border-bottom: 1px solid var(--color-border-inverse);
          padding-top: clamp(4.5rem, 8vw, 7rem);
          padding-bottom: clamp(4.5rem, 8vw, 7rem);
        }

        .metrics-header {
          text-align: center;
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(2rem, 4vw, 4rem);
        }

        @media (min-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .metrics-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 1.5rem;
          }
        }

        .metric-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem;
        }

        .metric-number {
          font-family: var(--font-body);
          font-size: clamp(2.5rem, 4.2vw, 4.25rem);
          font-weight: 800;
          line-height: 1;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .metric-number.highlight-blue {
          color: var(--color-blue);
        }

        .metric-label {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-muted-inverse);
        }
      `}</style>
    </section>
  );
};
