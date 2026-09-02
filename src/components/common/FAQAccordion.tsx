import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../data/siteContent';

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = 'FREQUENTLY ASKED QUESTIONS',
  subtitle = 'Everything you need to know about partnering with HekayaHaus.',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section section-surface faq-section" aria-label="Frequently Asked Questions">
      <div className="container">
        <div className="faq-header">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>TRANSPARENT GUIDANCE</span>
          </div>
          <h2 className="section-title faq-title">{title}</h2>
          {subtitle && <p className="faq-subtitle">{subtitle}</p>}
        </div>

        <div className="faq-list">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  onClick={() => toggle(idx)}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <ChevronDown
                    size={20}
                    className="faq-chevron"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="faq-answer-pane"
                  >
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          border-bottom: 1px solid var(--color-border);
        }

        .faq-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto clamp(2.5rem, 5vw, 4rem);
        }

        .faq-title {
          margin-bottom: 0.75rem;
        }

        .faq-subtitle {
          font-size: 1rem;
          color: var(--color-muted);
        }

        .faq-list {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          overflow: hidden;
        }

        .faq-item.open {
          border-color: var(--color-blue);
          box-shadow: 0 8px 24px rgba(23, 70, 255, 0.06);
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.75rem;
          text-align: left;
          color: var(--color-text);
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 600;
          gap: 1.25rem;
          transition: color var(--transition-fast);
        }

        .faq-item.open .faq-question-text {
          color: var(--color-blue);
        }

        .faq-chevron {
          color: var(--color-muted);
          transition: transform 0.3s ease, color var(--transition-fast);
          flex-shrink: 0;
        }

        .faq-item.open .faq-chevron {
          color: var(--color-blue);
        }

        .faq-answer-pane {
          padding: 0 1.75rem 1.5rem 1.75rem;
          animation: answerFade 0.3s ease forwards;
        }

        @keyframes answerFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .faq-answer-text {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--color-muted);
        }
      `}</style>
    </section>
  );
};
