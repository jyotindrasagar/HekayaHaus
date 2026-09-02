import React from 'react';
import { BRAND_CLIENTS } from '../../data/siteContent';

export const BrandMarquee: React.FC = () => {
  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...BRAND_CLIENTS, ...BRAND_CLIENTS];

  return (
    <section className="brand-marquee-section" aria-label="Client Trust">
      <div className="container marquee-header-container">
        <p className="marquee-label">TRUSTED BY VISIONARY BRANDS</p>
      </div>

      <div className="marquee-viewport">
        <div className="animate-marquee">
          {marqueeItems.map((brand, idx) => (
            <div key={`${brand.name}-${idx}`} className="brand-logo-item">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="brand-logo-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .brand-marquee-section {
          padding-top: 2rem;
          padding-bottom: 3.5rem;
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          overflow: hidden;
        }

        .marquee-header-container {
          margin-bottom: 1.75rem;
        }

        .marquee-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-muted);
        }

        .marquee-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .brand-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 clamp(1.75rem, 3.5vw, 3.5rem);
          opacity: 0.65;
          filter: grayscale(100%) contrast(120%);
          transition: opacity var(--transition-fast), filter var(--transition-fast), transform var(--transition-fast);
        }

        .brand-logo-item:hover {
          opacity: 1;
          filter: grayscale(0%) contrast(100%);
          transform: scale(1.05);
        }

        .brand-logo-img {
          height: clamp(22px, 3.5vw, 36px);
          max-width: 130px;
          object-fit: contain;
        }
      `}</style>
    </section>
  );
};
