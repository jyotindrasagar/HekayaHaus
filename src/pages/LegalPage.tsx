import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SITE_INFO } from '../data/siteContent';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const updatedDate = 'January 2026';

  return (
    <main className="legal-page-wrapper">
      <div className="section section-ivory legal-hero">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="hero-title">{title}</h1>
          <p className="legal-hero-sub">
            Last Updated: {updatedDate} · {SITE_INFO.legalName} (Dubai, UAE)
          </p>
        </div>
      </div>

      <div className="section section-surface legal-content-section">
        <div className="container legal-prose">
          {isPrivacy ? (
            <>
              <h2>1. Commitment to Privacy &amp; Data Protection</h2>
              <p>
                {SITE_INFO.legalName} ("HekayaHaus", "we", "us", or "our") respects the executive privacy and confidentiality of our clients, partners, and visitors. This Privacy Policy outlines how we collect, process, and safeguard information submitted through our website and discovery booking channels.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We only collect information directly submitted by you during appointment booking or inquiry form completion:
              </p>
              <ul>
                <li><strong>Identity &amp; Contact:</strong> Full name, corporate email address, contact telephone number, and company name.</li>
                <li><strong>Project Context:</strong> Strategic requirements, creative scopes, brand objectives, and submitted media files.</li>
                <li><strong>Technical Telemetry:</strong> Essential server logs, device type, and anonymized Core Web Vitals telemetry for performance optimization.</li>
              </ul>

              <h2>3. Purpose of Processing</h2>
              <p>
                We use your data solely to provide creative proposals, conduct scheduled strategy consultations, execute media engagements, and uphold our contractual obligations. We never sell, rent, or trade client information to third parties.
              </p>

              <h2>4. Confidentiality &amp; Security</h2>
              <p>
                All creative inquiries, unreleased campaign assets, and commercial discussions are treated under strict professional non-disclosure standards. We employ TLS 1.3 encryption, secure headers, and access-controlled cloud infrastructure.
              </p>

              <h2>5. Contact Information</h2>
              <p>
                For privacy inquiries or data removal requests, contact our legal counsel directly at <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>.
              </p>
            </>
          ) : (
            <>
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing the website or engaging the creative production services of {SITE_INFO.legalName}, you agree to abide by these Terms &amp; Conditions and applicable laws of the United Arab Emirates.
              </p>

              <h2>2. Intellectual Property &amp; Portfolio Rights</h2>
              <p>
                All original visual direction, motion concepts, 3D assets, source code, and design architecture developed by HekayaHaus remain the intellectual property of HekayaHaus until final project delivery and full compensation as defined in mutual engagement agreements.
              </p>

              <h2>3. Scope of Engagements</h2>
              <p>
                All production timelines, filming permits, talent management, and deliverables are governed by individual Master Services Agreements (MSAs) and Statements of Work (SOWs).
              </p>

              <h2>4. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of the United Arab Emirates and the Emirate of Dubai.
              </p>

              <h2>5. Inquiries</h2>
              <p>
                Questions regarding legal agreements may be directed to <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>.
              </p>
            </>
          )}

          <div className="legal-back-row">
            <Link to="/" className="btn btn-secondary btn-sm">
              <span>RETURN TO HOMEPAGE</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .legal-hero {
          padding-top: clamp(7.5rem, 12vw, 10rem);
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
          border-bottom: 1px solid var(--color-border);
        }

        .legal-hero-sub {
          font-size: 0.95rem;
          color: var(--color-muted);
          margin-top: 1rem;
        }

        .legal-prose {
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .legal-prose h2 {
          font-family: var(--font-display);
          font-size: 1.85rem;
          color: var(--color-text);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .legal-prose p, .legal-prose ul {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-muted);
        }

        .legal-prose ul {
          padding-left: 1.5rem;
          list-style: disc;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .legal-prose strong {
          color: var(--color-text);
        }

        .legal-prose a {
          color: var(--color-blue);
          text-decoration: underline;
        }

        .legal-back-row {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }
      `}</style>
    </main>
  );
};
