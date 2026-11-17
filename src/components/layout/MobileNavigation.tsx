import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { PILLARS } from '../../data/services';
import { NAV, Wordmark } from './SiteHeader';

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

  return (
    <div id="mobile-nav" className={`mnav ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open || undefined}>
      <div className="mnav-panel" ref={panel} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mnav-top">
          <Link to="/" onClick={onClose} aria-label="HekayaHaus home">
            <Wordmark light />
          </Link>
          <button ref={closeBtn} type="button" className="mnav-close" onClick={onClose} aria-label="Close menu">
            <span />
            <span />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="mnav-list">
            {NAV.filter((n) => !n.mega).slice(0, 1).map((n, i) => (
              <li key={n.label} style={{ '--i': i } as React.CSSProperties}>
                <Link to={n.to} onClick={onClose}>{n.label}</Link>
              </li>
            ))}
            <li style={{ '--i': 1 } as React.CSSProperties}>
              <Link to="/allserviceshekayahaus" onClick={onClose}>What We Do</Link>
              <ul className="mnav-sub">
                {PILLARS.map((p) => (
                  <li key={p.id}>
                    <Link to={p.route} onClick={onClose}>
                      <span>{p.n}</span> {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {NAV.filter((n) => !n.mega).slice(1).map((n, i) => (
              <li key={n.label} style={{ '--i': i + 2 } as React.CSSProperties}>
                <Link to={n.to} onClick={onClose}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mnav-foot">
          <a className="btn btn-light" href={SITE.calendar} target="_blank" rel="noopener noreferrer">
            <span className="btn-label">Book a discovery call</span>
          </a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <div className="mnav-social">
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={SITE.socials.youtubePlaylist} target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}
