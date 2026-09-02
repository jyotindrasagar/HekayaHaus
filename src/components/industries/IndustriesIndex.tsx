import React, { useState } from 'react';
import { INDUSTRIES } from '../../data/siteContent';

export const IndustriesIndex: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="industries" className="section section-ivory industries-section" aria-label="Industries We Work With">
      <div className="container">
        <div className="industries-header">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>SECTOR EXPERTISE</span>
          </div>
          <h2 className="section-title">
            INDUSTRIES <span className="text-blue editorial-italic">WE WORK WITH.</span>
          </h2>
          <p className="industries-intro">
            Tailored creative, media, and tech solutions calibrated specifically for the nuances of distinct luxury and commercial sectors.
          </p>
        </div>

        {/* Editorial Index Grid */}
        <div className="industries-grid">
          {INDUSTRIES.map((ind, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={ind.id}
                className={`industry-cell ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                tabIndex={0}
              >
                <div className="cell-num">0{idx < 9 ? `0${idx + 1}` : idx + 1}</div>
                <div className="cell-content">
                  <h3 className="industry-name">{ind.name}</h3>
                  <span className="industry-category">{ind.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .industries-section {
          border-bottom: 1px solid var(--color-border);
        }

        .industries-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto clamp(2.5rem, 5vw, 4rem);
        }

        .industries-header .section-title {
          margin-bottom: 1rem;
        }

        .industries-intro {
          font-size: 1rem;
          color: var(--color-muted);
          line-height: 1.6;
        }

        .industries-grid {
          display: grid;
          grid-template-columns: 1fr;
          border-top: 1px solid var(--color-border);
        }

        @media (min-width: 640px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .industry-cell {
          padding: 1.75rem 2rem;
          border-bottom: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          background: var(--color-surface);
          transition: all var(--transition-fast);
          cursor: default;
        }

        .industry-cell:nth-child(3n) {
          border-right: none;
        }

        @media (max-width: 1023px) and (min-width: 640px) {
          .industry-cell:nth-child(3n) {
            border-right: 1px solid var(--color-border);
          }
          .industry-cell:nth-child(2n) {
            border-right: none;
          }
        }

        @media (max-width: 639px) {
          .industry-cell {
            border-right: none;
          }
        }

        .industry-cell:hover, .industry-cell.hovered {
          background: #FFFFFF;
          border-left: 3px solid var(--color-blue);
          padding-left: calc(2rem - 3px);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(23, 70, 255, 0.05);
        }

        .cell-num {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-blue);
          padding-top: 0.25rem;
        }

        .cell-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .industry-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--color-text);
          line-height: 1.2;
          font-weight: 400;
        }

        .industry-category {
          font-size: 0.8125rem;
          color: var(--color-muted);
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
};
