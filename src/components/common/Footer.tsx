import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_INFO } from '../../data/siteContent';

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-container">
        {/* Top Section: Brand Statement & Columns */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-link" aria-label="HekayaHaus Home">
              <span className="footer-brand-name">HEKAYAHAUS</span>
              <span className="footer-brand-tagline">BEYOND SEEN. INTO FELT.</span>
            </Link>
            <p className="footer-bio">
              A global creative company blending strategy, creativity, technology and AI to build brands that people remember.
            </p>
            <div className="footer-socials">
              <a
                href={SITE_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SITE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={SITE_INFO.youtubePlaylist}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label="YouTube"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">SOLUTIONS</h4>
            <ul className="footer-links">
              <li><Link to="/media-production-dubai">Creative & Media Production</Link></li>
              <li><Link to="/graphics-dubai">Branding & Visual Design</Link></li>
              <li><Link to="/content-marketing-dubai">Digital Growth & Performance</Link></li>
              <li><Link to="/web-development-dubai">Technology, Web & AI</Link></li>
              <li><Link to="/event-organise-dubai">PR & Brand Expansion</Link></li>
              <li><Link to="/audio-direction-dubai">Audio Direction & Foley</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">COMPANY</h4>
            <ul className="footer-links">
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#process">Our Process</a></li>
              <li><a href="/#work">Case Studies</a></li>
              <li><Link to="/contact-us">Careers & Partnerships</Link></li>
              <li><a href={SITE_INFO.calendarLink} target="_blank" rel="noopener noreferrer">Book Discovery Call</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">RESOURCES</h4>
            <ul className="footer-links">
              <li><Link to="/blogs">Insights & Articles</Link></li>
              <li><a href={SITE_INFO.youtubeShowreel} target="_blank" rel="noopener noreferrer">Watch Showreel</a></li>
              <li><a href="/#why-us">Why HekayaHaus</a></li>
              <li><Link to="/contact-us">Contact & Help</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom">
          <p className="copyright-text">{SITE_INFO.copyright}</p>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="legal-sep">•</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          padding-top: clamp(3.5rem, 6vw, 5.5rem);
          padding-bottom: 2.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 2.5rem;
          }
        }

        .footer-brand-col {
          max-width: 360px;
        }

        .footer-logo-link {
          display: inline-flex;
          flex-direction: column;
          margin-bottom: 1.25rem;
        }

        .footer-brand-name {
          font-family: var(--font-display);
          font-size: 1.85rem;
          color: var(--color-text);
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .footer-brand-tagline {
          font-family: var(--font-body);
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--color-blue);
          text-transform: uppercase;
          margin-top: 4px;
        }

        .footer-bio {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--color-muted);
          margin-bottom: 1.75rem;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .social-icon-link {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text);
          transition: all var(--transition-fast);
        }

        .social-icon-link:hover {
          border-color: var(--color-blue);
          color: var(--color-blue);
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
          margin-bottom: 1.25rem;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links li a {
          font-size: 0.875rem;
          color: var(--color-muted);
          transition: color var(--transition-fast);
        }

        .footer-links li a:hover {
          color: var(--color-blue);
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          font-size: 0.8125rem;
          color: var(--color-muted);
        }

        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
          }
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-legal-links a {
          color: var(--color-muted);
          transition: color var(--transition-fast);
        }

        .footer-legal-links a:hover {
          color: var(--color-blue);
        }

        .legal-sep {
          color: var(--color-border);
        }
      `}</style>
    </footer>
  );
};
