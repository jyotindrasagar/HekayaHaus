import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Mail, Phone, Clock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_INFO } from '../../data/siteContent';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Creative & Media Production',
    message: '',
    honeypot: '', // Security honeypot for bots
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    'Creative & Media Production',
    'Branding & Visual Design',
    'Digital Growth & Performance',
    'Technology, Web & AI',
    'PR & Brand Expansion',
    'Immersive CGI & Experiences',
    'Full Haus Retainer / Partnership',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check: bots fill hidden fields
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable transmission and open instant calendar option
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#1746FF', '#0B2FCE', '#DCE5FF'],
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 600);
  };

  return (
    <section id="contact" className="section section-ivory contact-section" aria-label="Contact and Discovery">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Direct Coordinates */}
          <div className="contact-info-col">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>LET'S TALK</span>
            </div>

            <h2 className="section-title contact-title">
              LET'S CREATE <br />
              SOMETHING <br />
              <span className="text-blue editorial-italic">ICONIC TOGETHER.</span>
            </h2>

            <p className="contact-lead-p">
              Tell us about your brand vision, upcoming campaign, or technology requirements.
              Our creative directors review every inquiry directly.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <MapPin className="contact-detail-icon" size={20} />
                <div>
                  <span className="detail-label">HEADQUARTERS</span>
                  <p className="detail-value">{SITE_INFO.location} · Serving GCC &amp; Global</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <Mail className="contact-detail-icon" size={20} />
                <div>
                  <span className="detail-label">DIRECT INQUIRY</span>
                  <a href={`mailto:${SITE_INFO.email}`} className="detail-value mail-link">
                    {SITE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <Phone className="contact-detail-icon" size={20} />
                <div>
                  <span className="detail-label">TELEPHONE</span>
                  <a href={`tel:${SITE_INFO.phone.replace(/\s+/g, '')}`} className="detail-value">
                    {SITE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <Clock className="contact-detail-icon" size={20} />
                <div>
                  <span className="detail-label">HOURS OF OPERATION</span>
                  <p className="detail-value">{SITE_INFO.hours}</p>
                </div>
              </div>
            </div>

            {/* Direct Google Calendar Link Card */}
            <div className="calendar-fast-card">
              <div>
                <h3 className="cal-card-title">Prefer an instant strategy session?</h3>
                <p className="cal-card-desc">Lock in a 30-minute discovery call directly on our leadership calendar.</p>
              </div>
              <a
                href={SITE_INFO.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>OPEN CALENDAR</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-col">
            <div className="form-card-wrapper">
              {isSubmitted ? (
                <div className="submission-success-view">
                  <CheckCircle2 size={54} className="text-blue success-icon" />
                  <h3 className="success-title">Inquiry Received.</h3>
                  <p className="success-desc">
                    Thank you, {formData.name}. A senior creative director from HekayaHaus will respond within 24 hours.
                  </p>
                  <a
                    href={SITE_INFO.calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>SCHEDULE DISCOVERY CALL NOW</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
                  {/* Security Honeypot */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="website_hp">Leave this empty</label>
                    <input
                      type="text"
                      id="website_hp"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errorMessage && (
                    <div className="form-error-banner" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="client-name">
                      YOUR NAME *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Elena Rostova"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="client-email">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="client-email"
                        type="email"
                        className="form-input"
                        placeholder="elena@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="client-company">
                        COMPANY / BRAND
                      </label>
                      <input
                        id="client-company"
                        type="text"
                        className="form-input"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="service-select">
                      WHAT DO YOU NEED HELP WITH?
                    </label>
                    <select
                      id="service-select"
                      className="form-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      {servicesList.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="project-desc">
                      TELL US ABOUT YOUR PROJECT *
                    </label>
                    <textarea
                      id="project-desc"
                      className="form-textarea"
                      placeholder="Share your goals, timeline, and key deliverables..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full submit-inquiry-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                    <ArrowUpRight className="btn-icon btn-icon-arrow" size={18} />
                  </button>

                  <p className="form-privacy-note">
                    We respect executive confidentiality. Your information is never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 5.5rem);
          align-items: flex-start;
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }

        .contact-title {
          margin-bottom: 1.75rem;
        }

        .contact-lead-p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--color-muted);
          margin-bottom: 2.5rem;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        .contact-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .contact-detail-icon {
          color: var(--color-blue);
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .detail-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-muted);
          margin-bottom: 0.2rem;
        }

        .detail-value {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--color-text);
        }

        .mail-link {
          transition: color var(--transition-fast);
        }

        .mail-link:hover {
          color: var(--color-blue);
        }

        .calendar-fast-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cal-card-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--color-text);
          margin-bottom: 0.25rem;
        }

        .cal-card-desc {
          font-size: 0.8125rem;
          color: var(--color-muted);
          line-height: 1.5;
        }

        /* Form Column */
        .form-card-wrapper {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: clamp(2rem, 4vw, 3rem);
          box-shadow: 0 16px 40px rgba(11, 13, 18, 0.05);
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-error-banner {
          background: #FFF2F2;
          color: #D32F2F;
          border: 1px solid #FFCDD2;
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          margin-bottom: 1.25rem;
        }

        .submit-inquiry-btn {
          width: 100%;
          padding: 1.1rem;
          margin-top: 0.5rem;
        }

        .form-privacy-note {
          font-size: 0.75rem;
          color: var(--color-muted);
          text-align: center;
          margin-top: 1rem;
        }

        /* Success View */
        .submission-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 1rem;
          gap: 1.25rem;
        }

        .success-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          color: var(--color-text);
        }

        .success-desc {
          font-size: 1rem;
          color: var(--color-muted);
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  );
};
