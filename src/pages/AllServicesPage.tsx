import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SOLUTION_PILLARS, SITE_INFO } from '../data/siteContent';

export const AllServicesPage: React.FC = () => {
  return (
    <main className="all-services-page">
      {/* Hero Header */}
      <section className="section section-ivory services-hero">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>COMPREHENSIVE CAPABILITIES</span>
          </div>
          <h1 className="hero-title services-main-h1">
            CREATIVE MEDIA &amp; <br />
            <span className="text-blue editorial-italic">MARKETING HAUS.</span>
          </h1>
          <p className="services-hero-lead">
            Born from creativity, built on culture. Hekaya Haus transforms ideas into identity that lasts beyond the screen—offering
            cinema-grade production, digital marketing, CGI/VFX, branding, billboard placement, web development, CRM &amp; AI solutions under one roof.
          </p>
        </div>
      </section>

      {/* Services Detailed Grid */}
      <section className="section section-surface services-list-section">
        <div className="container">
          <div className="services-detailed-grid">
            {SOLUTION_PILLARS.map((pillar) => (
              <div key={pillar.id} className="service-detail-card">
                <div className="service-card-media">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="service-card-img"
                    loading="lazy"
                  />
                  <span className="service-card-tag">{pillar.tag}</span>
                </div>

                <div className="service-card-body">
                  <h2 className="service-card-title">{pillar.title}</h2>
                  <p className="service-card-desc">{pillar.shortDesc}</p>

                  <div className="service-card-capabilities">
                    <h4 className="caps-list-heading">KEY CAPABILITIES:</h4>
                    <ul className="caps-checklist">
                      {pillar.capabilities.map((c) => (
                        <li key={c}>
                          <CheckCircle2 size={15} className="text-blue" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-card-cta-row">
                    <Link to={pillar.route} className="btn btn-primary btn-sm">
                      <span>EXPLORE {pillar.tag}</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Booking Callout */}
      <section className="section section-navy cta-strip">
        <div className="container strip-content">
          <div>
            <h3 className="strip-title">Have a specific project scope in mind?</h3>
            <p className="strip-desc">Schedule a discovery call with our directors to discuss custom packaging and timelines.</p>
          </div>
          <a
            href={SITE_INFO.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span>BOOK DISCOVERY CALL</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <style>{`
        .services-hero {
          padding-top: clamp(7rem, 12vw, 10rem);
          padding-bottom: clamp(3rem, 6vw, 5rem);
          border-bottom: 1px solid var(--color-border);
        }

        .services-main-h1 {
          margin-bottom: 1.5rem;
        }

        .services-hero-lead {
          font-size: clamp(1.1rem, 1.4vw, 1.3rem);
          color: var(--color-muted);
          line-height: 1.65;
          max-width: 820px;
        }

        .services-detailed-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 900px) {
          .services-detailed-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        .service-detail-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
        }

        .service-detail-card:hover {
          border-color: var(--color-blue);
          box-shadow: 0 16px 40px rgba(23, 70, 255, 0.08);
          transform: translateY(-3px);
        }

        .service-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #000;
        }

        .service-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-detail-card:hover .service-card-img {
          transform: scale(1.04);
        }

        .service-card-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: rgba(8, 21, 47, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .service-card-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .service-card-title {
          font-family: var(--font-display);
          font-size: 1.85rem;
          color: var(--color-text);
          margin-bottom: 0.75rem;
          line-height: 1.15;
        }

        .service-card-desc {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--color-muted);
          margin-bottom: 1.5rem;
        }

        .service-card-capabilities {
          margin-bottom: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--color-border);
        }

        .caps-list-heading {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-muted);
          margin-bottom: 0.75rem;
        }

        .caps-checklist {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        @media (min-width: 600px) {
          .caps-checklist {
            grid-template-columns: 1fr 1fr;
          }
        }

        .caps-checklist li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--color-text);
        }

        .service-card-cta-row {
          margin-top: auto;
        }

        .strip-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          justify-content: space-between;
        }

        @media (min-width: 768px) {
          .strip-content {
            flex-direction: row;
            align-items: center;
          }
        }

        .strip-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          color: #FFFFFF;
          margin-bottom: 0.4rem;
        }

        .strip-desc {
          font-size: 0.9375rem;
          color: var(--color-muted-inverse);
        }
      `}</style>
    </main>
  );
};
