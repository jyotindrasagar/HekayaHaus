import React from 'react';
import { ContactSection } from '../components/contact/ContactSection';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { GENERAL_FAQS } from '../data/siteContent';

export const ContactPage: React.FC = () => {
  return (
    <main className="contact-page-wrapper">
      <div className="contact-page-hero">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>DISCOVERY &amp; PARTNERSHIP</span>
          </div>
          <h1 className="hero-title">
            CONTACT <span className="text-blue editorial-italic">HEKAYAHAUS.</span>
          </h1>
          <p className="contact-page-sub">
            Ready to take the next step? Schedule a discovery session or send us your project requirements.
            Our creative directors review all engagements directly.
          </p>
        </div>
      </div>

      <ContactSection />
      <FAQAccordion items={GENERAL_FAQS} />

      <style>{`
        .contact-page-hero {
          padding-top: clamp(7.5rem, 12vw, 10rem);
          padding-bottom: clamp(2rem, 4vw, 3.5rem);
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .contact-page-sub {
          font-size: clamp(1.1rem, 1.35vw, 1.25rem);
          color: var(--color-muted);
          line-height: 1.6;
          max-width: 720px;
          margin-top: 1.25rem;
        }
      `}</style>
    </main>
  );
};
