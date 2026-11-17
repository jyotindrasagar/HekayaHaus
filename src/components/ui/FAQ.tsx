import { useId, useState } from 'react';

export function FAQ({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item ${isOpen ? 'open' : ''}`} key={f.q}>
            <h3 className="faq-q">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                id={`${id}-b${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-text">{f.q}</span>
                <span className="faq-plus" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-a" id={`${id}-${i}`} role="region" aria-labelledby={`${id}-b${i}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
