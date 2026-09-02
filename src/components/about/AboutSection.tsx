import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section section-surface about-section" aria-label="About HekayaHaus">
      <div className="container">
        <div className="about-grid">
          {/* Editorial Content */}
          <div className="about-text-col">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>THE HAUS MANIFESTO</span>
            </div>

            <h2 className="section-title about-headline">
              A CREATIVE HAUS WHERE <br />
              <span className="text-blue editorial-italic">STRATEGY,</span> <br />
              CREATIVITY &amp; <br />
              <span className="editorial-italic">TECHNOLOGY MEET.</span>
            </h2>

            <div className="about-body">
              <p className="about-lead">
                Not a generic marketing agency. A dedicated multidisciplinary Haus where cinematic
                storytelling, high-end production, cutting-edge software engineering, and AI automation converge.
              </p>
              <p className="about-subtext">
                Born from creativity, built on culture. We partner with visionaries across Dubai, the GCC,
                and globally to engineer visual campaigns and digital platforms that captivate audiences,
                command respect, and compound brand equity.
              </p>
            </div>

            <div className="about-cta-row">
              <Link to="/allserviceshekayahaus" className="btn btn-secondary">
                <span>EXPLORE CAPABILITIES</span>
                <ArrowUpRight className="btn-icon btn-icon-arrow" size={16} />
              </Link>
            </div>
          </div>

          {/* Cinematic Media Composition */}
          <div className="about-visual-col">
            <div className="about-image-frame">
              <img
                src="/assets/showcase/tech.jpg"
                alt="HekayaHaus Creative & Technology Architecture"
                className="about-image"
                loading="lazy"
              />
              <div className="about-image-badge">
                <span className="badge-title">DUBAI · GCC · GLOBAL</span>
                <span className="badge-subtitle">Creative &amp; Technology Haus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--color-border);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 5.5rem);
          align-items: center;
        }

        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }

        .about-headline {
          margin-bottom: 2rem;
        }

        .about-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .about-lead {
          font-size: clamp(1.05rem, 1.25vw, 1.2rem);
          line-height: 1.6;
          color: var(--color-text);
          font-weight: 500;
        }

        .about-subtext {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--color-muted);
        }

        .about-image-frame {
          position: relative;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(11, 13, 18, 0.08);
          border: 1px solid var(--color-border);
          aspect-ratio: 4 / 5;
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .about-image-frame:hover .about-image {
          transform: scale(1.03);
        }

        .about-image-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          background: rgba(8, 21, 47, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .badge-title {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--color-blue-soft);
          text-transform: uppercase;
        }

        .badge-subtitle {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: #FFFFFF;
        }
      `}</style>
    </section>
  );
};
