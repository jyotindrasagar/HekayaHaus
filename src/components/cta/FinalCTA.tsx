import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { SITE_INFO } from '../../data/siteContent';

interface FinalCTAProps {
  onWatchShowreel: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onWatchShowreel }) => {
  return (
    <section className="section section-navy final-cta-section" aria-label="Call to Action">
      {/* Background Atmosphere & Glow */}
      <div className="cta-atmosphere-glow" aria-hidden="true" />

      <div className="container final-cta-container">
        <div className="final-cta-content">
          <div className="eyebrow eyebrow-inverse">
            <span className="eyebrow-dot" style={{ backgroundColor: 'var(--color-blue-soft)' }} />
            <span>START YOUR LEGACY</span>
          </div>

          <h2 className="final-cta-title">
            READY TO BUILD <br />
            SOMETHING <br />
            <span className="text-blue editorial-italic">EXTRAORDINARY?</span>
          </h2>

          <p className="final-cta-desc">
            Whether you're launching a new flagship brand, scaling an existing business, or redefining your digital presence—we're here to make it unforgettable.
          </p>

          <div className="final-cta-actions">
            <a
              href={SITE_INFO.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              aria-label="Book a Discovery Call"
            >
              <span>BOOK A DISCOVERY CALL</span>
              <ArrowUpRight className="btn-icon btn-icon-arrow" size={18} />
            </a>

            <button
              onClick={onWatchShowreel}
              className="btn btn-secondary-inverse btn-lg cta-showreel-btn"
              aria-label="Watch Cinematic Showreel"
              data-cursor-text="PLAY"
            >
              <span className="play-icon-bubble">
                <Play size={14} fill="currentColor" />
              </span>
              <span>WATCH SHOWREEL</span>
            </button>
          </div>
        </div>

        {/* Visual Silhouette Atmosphere */}
        <div className="final-cta-visual" aria-hidden="true">
          <div className="celestial-portal-ring">
            <div className="portal-core" />
          </div>
        </div>
      </div>

      <style>{`
        .final-cta-section {
          background-color: var(--color-navy);
          border-bottom: 1px solid var(--color-border-inverse);
          position: relative;
          padding-top: clamp(6rem, 12vw, 10rem);
          padding-bottom: clamp(6rem, 12vw, 10rem);
          overflow: hidden;
        }

        .cta-atmosphere-glow {
          position: absolute;
          top: 30%;
          right: 15%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(23, 70, 255, 0.28) 0%, rgba(8, 21, 47, 0) 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .final-cta-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 992px) {
          .final-cta-container {
            grid-template-columns: 1.25fr 0.75fr;
          }
        }

        .final-cta-title {
          font-family: var(--font-display);
          font-size: clamp(2.35rem, 6.5vw, 6.5rem);
          line-height: 0.98;
          color: #FFFFFF;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .final-cta-desc {
          font-size: clamp(1.05rem, 1.35vw, 1.25rem);
          line-height: 1.65;
          color: var(--color-muted-inverse);
          margin-bottom: 3rem;
          max-width: 580px;
        }

        .final-cta-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.25rem;
        }

        @media (max-width: 520px) {
          .final-cta-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .final-cta-actions .btn {
            width: 100%;
          }
        }

        .btn-lg {
          padding: 1.15rem 2.25rem;
          font-size: 0.9375rem;
        }

        .cta-showreel-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .play-icon-bubble {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .cta-showreel-btn:hover .play-icon-bubble {
          background: var(--color-blue);
          transform: scale(1.1);
        }

        /* Celestial Portal Silhouette */
        .final-cta-visual {
          display: none;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 992px) {
          .final-cta-visual {
            display: flex;
          }
        }

        .celestial-portal-ring {
          position: relative;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1.5px solid rgba(220, 229, 255, 0.25);
          box-shadow: 0 0 80px rgba(23, 70, 255, 0.4), inset 0 0 60px rgba(23, 70, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: floatGentle 6s ease-in-out infinite;
        }

        .portal-core {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(23, 70, 255, 0.5) 0%, rgba(8, 21, 47, 0.8) 75%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};
