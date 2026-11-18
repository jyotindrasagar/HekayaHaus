import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { PILLARS } from '../../data/services';
import { JOIN_LINKS, Wordmark } from './SiteHeader';

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    document.documentElement.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a, button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('no-scroll');
      prev?.focus();
    };
  }, [open, onClose]);

  const items = [
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'What We Do', to: '/allserviceshekayahaus', sub: PILLARS.map((p) => ({ label: `${p.n} ${p.name}`, to: p.route })) },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact-us' },
    { label: 'Join the Haus', to: '/careers', sub: JOIN_LINKS.map((j) => ({ label: j.short, to: j.to })) },
  ];

  return (
    <div id="mobile-nav" className={`mnav ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open || undefined}>
      <div className="mnav-panel" ref={panel} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mnav-top">
          <Link to="/" onClick={onClose} aria-label="HekayaHaus home">
            <Wordmark light tag={false} />
          </Link>
          <button ref={closeBtn} type="button" className="mnav-close" onClick={onClose} aria-label="Close menu">
            <span />
            <span />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="mnav-list">
            {items.map((n, i) => (
              <li key={n.label} style={{ '--i': i } as React.CSSProperties}>
                <Link to={n.to} onClick={onClose}>
                  {n.label}
                </Link>
                {n.sub && (
                  <ul className="mnav-sub">
                    {n.sub.map((s) => (
                      <li key={s.to}>
                        <Link to={s.to} onClick={onClose}>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mnav-foot">
          <a className="btn btn-light" href={SITE.calendar} target="_blank" rel="noopener noreferrer">
            <span className="btn-label">Book a discovery call</span>
          </a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a>
          <div className="mnav-social">
            <Link to="/blogs" onClick={onClose}>Insights</Link>
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={SITE.socials.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}
