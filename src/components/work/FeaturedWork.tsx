import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AccordionGallery } from './AccordionGallery';
import { SITE_INFO } from '../../data/siteContent';

export const FeaturedWork: React.FC = () => {
  return (
    <section id="work" className="section section-navy featured-work-section" aria-label="Featured Work">
      <div className="container">
        {/* Section Header */}
        <div className="work-header">
          <div>
            <div className="eyebrow eyebrow-inverse">
              <span className="eyebrow-dot" style={{ backgroundColor: 'var(--color-blue-soft)' }} />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="section-title text-inverse">
              Work that inspires. <br />
              <span className="text-blue editorial-italic">Results that speak.</span>
            </h2>
          </div>

          <div className="work-header-right">
            <p className="work-header-desc text-muted-inverse">
              Every project is a cinematic case study. From Dubai dunes to global concert stages, we build stories that move audiences and drive conversions.
            </p>
            <a
              href={SITE_INFO.youtubePlaylist}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-inverse"
            >
              <span>VIEW FULL PORTFOLIO</span>
              <ArrowUpRight className="btn-icon btn-icon-arrow" size={16} />
            </a>
          </div>
        </div>

        {/* Accordion Gallery Showcase */}
        <AccordionGallery />
      </div>

      <style>{`
        .featured-work-section {
          background-color: var(--color-navy);
          border-bottom: 1px solid var(--color-border-inverse);
          position: relative;
        }

        .work-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3.5rem;
          align-items: flex-end;
        }

        @media (min-width: 900px) {
          .work-header {
            grid-template-columns: 1.2fr 0.8fr;
            justify-content: space-between;
          }
        }

        .work-header-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </section>
  );
};
