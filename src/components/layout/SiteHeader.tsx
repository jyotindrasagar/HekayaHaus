import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE } from '../../data/site';
import { PILLARS } from '../../data/services';
import { ArrowIcon } from '../ui/Buttons';
import { MobileNavigation } from './MobileNavigation';

export const JOIN_LINKS = [
  { label: 'Careers — Join the Haus', short: 'Careers', to: '/careers', desc: 'Roles, internships and freelance collaborations.' },
  { label: 'University Partnerships', short: 'University Partnerships', to: '/university-partnerships', desc: 'Placements, industry projects and student opportunities.' },
  { label: 'Mentorship & Collaborations', short: 'Mentorship & Collaborations', to: '/mentorship-collaborations', desc: 'Alumni, entrepreneurship and features beyond business.' },
];

export const NAV: { label: string; to: string; menu?: 'pillars' | 'join' }[] = [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'What We Do', to: '/allserviceshekayahaus', menu: 'pillars' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact-us' },
  { label: 'Join the Haus', to: '/careers', menu: 'join' },
];

/** The HekayaHaus H mark (from the brand logo file), coloured with currentColor via CSS mask. */
export function LogoMark({ className = '' }: { className?: string }) {
  return <span className={`logo-mark ${className}`} aria-hidden="true" />;
}

export function Wordmark({ light, tag = true }: { light?: boolean; tag?: boolean }) {
  return (
    <span className={`wordmark ${light ? 'wordmark-light' : ''}`}>
      <LogoMark />
      <span className="wordmark-text">
        <span className="wordmark-name">HEKAYAHAUS</span>
        {tag && <span className="wordmark-tag">Beyond seen. Into felt.</span>}
      </span>
    </span>
  );
}

function Dropdown({ item, open, setOpen }: { item: (typeof NAV)[number]; open: boolean; setOpen: (v: boolean) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open, setOpen]);
  const hover = () => window.matchMedia('(hover: hover)').matches;
  const id = `menu-${item.menu}`;
  return (
    <li ref={ref} className="has-mega" onMouseEnter={() => hover() && setOpen(true)} onMouseLeave={() => hover() && setOpen(false)}>
      <button type="button" className="nav-link" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {item.label}
        <span className="nav-caret" aria-hidden="true" />
      </button>
      <div id={id} className="mega" hidden={!open}>
        <div className={`mega-inner ${item.menu === 'join' ? 'mega-join' : ''}`}>
          {item.menu === 'pillars'
            ? PILLARS.map((p) => (
                <Link key={p.id} to={p.route} className="mega-pillar" data-cursor="Explore">
                  <span className="mega-n">{p.n}</span>
                  <span className="mega-title">{p.name}</span>
                  <span className="mega-desc">{p.line}</span>
                  <span className="mega-go">
                    {p.cta} <ArrowIcon />
                  </span>
                </Link>
              ))
            : JOIN_LINKS.map((j, i) => (
                <Link key={j.to} to={j.to} className="mega-pillar" data-cursor="Open">
                  <span className="mega-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mega-title">{j.label}</span>
                  <span className="mega-desc">{j.desc}</span>
                  <span className="mega-go">
                    Open <ArrowIcon />
                  </span>
                </Link>
              ))}
          <Link to={item.to} className="mega-all">
            {item.menu === 'pillars' ? 'All capabilities' : 'Join the Haus'} <ArrowIcon />
          </Link>
        </div>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last.current + 4 && !openMenu);
      if (y < last.current - 4) setHidden(false);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [openMenu]);

  useEffect(() => {
    setOpenMenu(null);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''} ${openMenu ? 'mega-open' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="header-brand" aria-label="HekayaHaus home">
            <Wordmark />
          </Link>
          <nav className="header-nav" aria-label="Primary">
            <ul>
              {NAV.map((item) =>
                item.menu ? (
                  <Dropdown key={item.label} item={item} open={openMenu === item.menu} setOpen={(v) => setOpenMenu(v ? item.menu! : null)} />
                ) : (
                  <li key={item.label}>
                    <NavLink to={item.to} className="nav-link">
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <a className="btn btn-primary btn-sm header-cta" href={SITE.calendar} target="_blank" rel="noopener noreferrer">
            <span className="btn-label">Book a call</span>
          </a>
          <button type="button" className="menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(true)}>
            <span />
            <span />
          </button>
        </div>
      </header>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
