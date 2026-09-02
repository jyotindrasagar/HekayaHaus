import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_CASE_STUDIES, CaseStudy } from '../../data/siteContent';

interface AccordionGalleryProps {
  onSelectProject?: (project: CaseStudy) => void;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="accordion-gallery-container" role="region" aria-label="Interactive Case Studies Gallery">
      <div className="accordion-panels-row">
        {FEATURED_CASE_STUDIES.map((project, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={project.id}
              className={`accordion-panel ${isActive ? 'is-expanded' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                setActiveIndex(index);
                if (onSelectProject) onSelectProject(project);
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveIndex(index);
                }
              }}
            >
              {/* Background Image with Grayscale to Color Transition */}
              <div className="panel-bg-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="panel-bg-img"
                  loading="lazy"
                />
                <div className="panel-overlay" />
              </div>

              {/* Vertical Inactive Title Label */}
              <div className="panel-collapsed-label">
                <span className="collapsed-client">{project.client}</span>
                <span className="collapsed-cat">{project.category.split('&')[0]}</span>
              </div>

              {/* Expanded Content View */}
              <div className="panel-expanded-content">
                <div className="panel-header-badge">
                  <span className="badge-client">{project.client}</span>
                  <span className="badge-dot">•</span>
                  <span className="badge-cat">{project.category}</span>
                </div>

                <h3 className="panel-title">{project.title}</h3>
                <p className="panel-desc">{project.description}</p>

                {project.metrics && (
                  <div className="panel-metrics-row">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="panel-metric-item">
                        <span className="metric-val">{m.value}</span>
                        <span className="metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="panel-cta-row">
                  <button className="btn btn-primary btn-sm panel-view-btn" aria-label={`View ${project.client} Case Study`}>
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .accordion-gallery-container {
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
        }

        .accordion-panels-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 680px;
        }

        @media (min-width: 900px) {
          .accordion-panels-row {
            flex-direction: row;
            height: 620px;
          }
        }

        .accordion-panel {
          position: relative;
          flex: 1;
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          background-color: var(--color-navy);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: flex 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .accordion-panel.is-expanded {
          flex: 3.4;
          border-color: var(--color-blue);
          box-shadow: 0 20px 50px rgba(8, 21, 47, 0.35);
        }

        .panel-bg-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .panel-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(80%) brightness(0.65);
          transition: filter 0.65s ease, transform 0.8s ease;
        }

        .is-expanded .panel-bg-img {
          filter: grayscale(0%) brightness(0.85);
          transform: scale(1.03);
        }

        .panel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8, 21, 47, 0.95) 0%, rgba(8, 21, 47, 0.45) 50%, rgba(8, 21, 47, 0.2) 100%);
          transition: opacity 0.4s ease;
        }

        .is-expanded .panel-overlay {
          background: linear-gradient(to top, rgba(8, 21, 47, 0.98) 0%, rgba(8, 21, 47, 0.6) 60%, transparent 100%);
        }

        /* Collapsed State Title */
        .panel-collapsed-label {
          position: absolute;
          bottom: 2rem;
          left: 1.5rem;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          transition: opacity 0.3s ease;
        }

        @media (min-width: 900px) {
          .is-expanded .panel-collapsed-label {
            opacity: 0;
            pointer-events: none;
          }
        }

        .collapsed-client {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: #FFFFFF;
          line-height: 1;
        }

        .collapsed-cat {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--color-blue-soft);
          text-transform: uppercase;
        }

        /* Expanded State Content */
        .panel-expanded-content {
          position: relative;
          z-index: 3;
          padding: 2.5rem 2.25rem;
          display: none;
          flex-direction: column;
          gap: 1rem;
          animation: contentSlideUp 0.45s ease forwards;
        }

        .is-expanded .panel-expanded-content {
          display: flex;
        }

        @keyframes contentSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .panel-header-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-blue-soft);
        }

        .badge-client {
          color: #FFFFFF;
        }

        .panel-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 2.5vw, 2.5rem);
          color: #FFFFFF;
          line-height: 1.1;
        }

        .panel-desc {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--color-muted-inverse);
          max-width: 540px;
        }

        .panel-metrics-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-top: 0.5rem;
          padding: 0.75rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .panel-metric-item {
          display: flex;
          flex-direction: column;
        }

        .metric-val {
          font-family: var(--font-body);
          font-size: 1.4rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.01em;
        }

        .metric-lbl {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-blue-soft);
          text-transform: uppercase;
        }

        .panel-cta-row {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};
