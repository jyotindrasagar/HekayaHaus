import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SOLUTION_PILLARS, SolutionPillar } from '../../data/siteContent';

export const SolutionsSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<SolutionPillar>(SOLUTION_PILLARS[0]);

  return (
    <section id="solutions" className="section section-ivory solutions-section" aria-label="Our Solutions">
      <div className="container">
        {/* Section Header */}
        <div className="solutions-header">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="section-title">
              END-TO-END SOLUTIONS <br />
              FOR <span className="text-blue editorial-italic">BRAND GROWTH.</span>
            </h2>
          </div>

          <div className="solutions-header-right">
            <p className="solutions-header-desc">
              Strategy, creativity, technology and AI—working together to build powerful brands and measurable business growth.
            </p>
            <Link to="/allserviceshekayahaus" className="explore-all-link">
              <span>EXPLORE ALL SOLUTIONS</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Editorial Interactive Layout: Left Pillars List, Right Dynamic Preview */}
        <div className="solutions-interactive-grid">
          {/* Left Column: Pillars */}
          <div className="pillars-list" role="tablist" aria-label="Solutions Pillars">
            {SOLUTION_PILLARS.map((pillar) => {
              const isActive = activePillar.id === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className={`pillar-row-card ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActivePillar(pillar)}
                  onClick={() => setActivePillar(pillar)}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActivePillar(pillar);
                    }
                  }}
                >
                  <div className="pillar-top-row">
                    <span className="pillar-tag">{pillar.tag}</span>
                    <Link to={pillar.route} className="pillar-direct-link" aria-label={`View ${pillar.title}`}>
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>

                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.shortDesc}</p>

                  {/* Capabilities Tags */}
                  <div className="pillar-caps">
                    {pillar.capabilities.slice(0, 4).map((cap) => (
                      <span key={cap} className="cap-chip">
                        {cap}
                      </span>
                    ))}
                    {pillar.capabilities.length > 4 && (
                      <span className="cap-chip cap-more">
                        +{pillar.capabilities.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Mobile Inline Visual Preview */}
                  {isActive && (
                    <div className="mobile-pillar-preview" aria-hidden="true">
                      <img src={pillar.image} alt={pillar.title} className="mobile-preview-img" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Cinematic Preview */}
          <div className="solutions-preview-col" aria-live="polite">
            <div className="sticky-preview-wrapper">
              <div className="preview-image-container">
                <img
                  src={activePillar.image}
                  alt={activePillar.title}
                  className="preview-image"
                  key={activePillar.id}
                />
                <div className="preview-overlay-info">
                  <span className="preview-tag">{activePillar.tag}</span>
                  <h4 className="preview-title">{activePillar.title}</h4>
                  <ul className="preview-caps-list">
                    {activePillar.capabilities.map((c) => (
                      <li key={c}>
                        <CheckCircle2 size={14} className="text-blue" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={activePillar.route} className="btn btn-primary btn-sm preview-action-btn">
                    <span>VIEW PILLAR CAPABILITIES</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .solutions-section {
          border-bottom: 1px solid var(--color-border);
        }

        .solutions-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
          align-items: flex-end;
        }

        @media (min-width: 900px) {
          .solutions-header {
            grid-template-columns: 1.2fr 0.8fr;
            justify-content: space-between;
          }
        }

        .solutions-header-desc {
          font-size: 1.05rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .explore-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-blue);
          text-transform: uppercase;
          transition: gap var(--transition-fast);
        }

        .explore-all-link:hover {
          gap: 0.75rem;
        }

        .solutions-interactive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 1024px) {
          .solutions-interactive-grid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 3.5rem;
          }
        }

        .pillars-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .pillar-row-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 1.75rem 2rem;
          cursor: pointer;
          transition: all var(--transition-normal);
          position: relative;
        }

        .pillar-row-card:hover, .pillar-row-card.active {
          border-color: var(--color-blue);
          box-shadow: 0 12px 32px rgba(23, 70, 255, 0.07);
          transform: translateY(-2px);
        }

        .pillar-row-card.active {
          border-left: 4px solid var(--color-blue);
        }

        .pillar-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .pillar-tag {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: var(--color-blue);
          text-transform: uppercase;
        }

        .pillar-direct-link {
          color: var(--color-muted);
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .pillar-row-card:hover .pillar-direct-link {
          color: var(--color-blue);
          transform: translate(2px, -2px);
        }

        .pillar-title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 2.2vw, 2.25rem);
          color: var(--color-text);
          margin-bottom: 0.6rem;
          line-height: 1.15;
        }

        .pillar-desc {
          font-size: 0.9375rem;
          color: var(--color-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }

        .pillar-caps {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .cap-chip {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          color: var(--color-text);
        }

        .cap-more {
          background: var(--color-blue-soft);
          border-color: var(--color-border-subtle);
          color: var(--color-blue-deep);
        }

        .mobile-pillar-preview {
          display: block;
          margin-top: 1.25rem;
          border-radius: var(--radius-sm);
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 1px solid var(--color-border);
          animation: previewFadeIn 0.3s ease;
        }

        @media (min-width: 1024px) {
          .mobile-pillar-preview {
            display: none;
          }
        }

        .mobile-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Right Sticky Preview */
        .solutions-preview-col {
          display: none;
        }

        @media (min-width: 1024px) {
          .solutions-preview-col {
            display: block;
          }
        }

        .sticky-preview-wrapper {
          position: sticky;
          top: 7rem;
        }

        .preview-image-container {
          position: relative;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(11, 13, 18, 0.12);
          border: 1px solid var(--color-border);
          aspect-ratio: 4 / 5;
          background: #000;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: previewFadeIn 0.4s ease;
        }

        @keyframes previewFadeIn {
          from {
            opacity: 0.4;
            transform: scale(1.03);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .preview-overlay-info {
          position: absolute;
          inset: auto 0 0 0;
          background: linear-gradient(to top, rgba(8, 21, 47, 0.96) 0%, rgba(8, 21, 47, 0.7) 70%, transparent 100%);
          padding: 2rem 1.75rem;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .preview-tag {
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: var(--color-blue-soft);
          text-transform: uppercase;
        }

        .preview-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: #FFFFFF;
          line-height: 1.15;
        }

        .preview-caps-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }

        .preview-caps-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--color-muted-inverse);
        }

        .preview-action-btn {
          align-self: flex-start;
          margin-top: 0.5rem;
        }
      `}</style>
    </section>
  );
};
