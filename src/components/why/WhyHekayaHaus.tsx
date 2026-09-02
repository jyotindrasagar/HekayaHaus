import React from 'react';
import { WHY_HEKAYAHAUS_PRINCIPLES } from '../../data/siteContent';

export const WhyHekayaHaus: React.FC = () => {
  return (
    <section id="why-us" className="section section-surface why-section" aria-label="Why Choose HekayaHaus">
      <div className="container">
        <div className="why-grid">
          {/* Left Column: Principles */}
          <div className="why-content-col">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>THE HAUS ADVANTAGE</span>
            </div>

            <h2 className="section-title why-title">
              WHY CLIENTS CHOOSE <br />
              <span className="text-blue editorial-italic">HEKAYAHAUS.</span>
            </h2>

            <p className="why-intro-p">
              We eliminate the friction of juggling disconnected production crews, creative shops, media buyers, and software consultancies.
            </p>

            <div className="principles-list">
              {WHY_HEKAYAHAUS_PRINCIPLES.map((item) => (
                <div key={item.title} className="principle-item">
                  <span className="principle-bullet" />
                  <div className="principle-text">
                    <h3 className="principle-name">{item.title}</h3>
                    <p className="principle-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Statement Card with Signature */}
          <div className="why-quote-col">
            <div className="quote-editorial-card">
              <div className="quote-mark">“</div>
              <blockquote className="quote-body">
                We don't just create content. <br />
                <span className="text-blue editorial-italic">We build brands that last.</span>
              </blockquote>
              <div className="quote-author-block">
                <div className="author-signature">HekayaHaus</div>
                <div className="author-meta">Dubai · GCC · Global Creative Leadership</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-section {
          border-bottom: 1px solid var(--color-border);
        }

        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 5.5rem);
          align-items: center;
        }

        @media (min-width: 1024px) {
          .why-grid {
            grid-template-columns: 1.25fr 0.75fr;
          }
        }

        .why-title {
          margin-bottom: 1.5rem;
        }

        .why-intro-p {
          font-size: 1.05rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 600px;
        }

        .principles-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .principles-list {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem 2.25rem;
          }
        }

        .principle-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .principle-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-blue);
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        .principle-name {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--color-text);
          letter-spacing: 0.01em;
          margin-bottom: 0.2rem;
        }

        .principle-desc {
          font-size: 0.84rem;
          color: var(--color-muted);
          line-height: 1.5;
        }

        /* Right Quote Card */
        .why-quote-col {
          display: flex;
          justify-content: center;
        }

        .quote-editorial-card {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: clamp(2.5rem, 5vw, 3.5rem);
          position: relative;
          box-shadow: 0 16px 40px rgba(11, 13, 18, 0.06);
          width: 100%;
          max-width: 480px;
        }

        .quote-mark {
          font-family: var(--font-display);
          font-size: 5rem;
          line-height: 0.6;
          color: var(--color-blue);
          opacity: 0.4;
          margin-bottom: 1.5rem;
        }

        .quote-body {
          font-family: var(--font-display);
          font-size: clamp(1.85rem, 2.6vw, 2.5rem);
          line-height: 1.25;
          color: var(--color-text);
          margin-bottom: 2.5rem;
        }

        .author-signature {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-style: italic;
          color: var(--color-text);
          border-top: 1px solid var(--color-border);
          padding-top: 1.25rem;
          letter-spacing: -0.01em;
        }

        .author-meta {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 0.25rem;
        }
      `}</style>
    </section>
  );
};
