import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE } from '../../data/site';
import { PILLARS } from '../../data/services';
import { ArrowIcon } from '../ui/Buttons';
import { MobileNavigation } from './MobileNavigation';

export const NAV = [
  { label: 'Work', to: '/work' },
  { label: 'What We Do', to: '/allserviceshekayahaus', mega: true },
  { label: 'Industries', to: '/#industries' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/blogs' },
  { label: 'Contact', to: '/contact-us' },
];

export function Wordmark({ light }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? 'wordmark-light' : ''}`}>
      <span className="wordmark-name">
        HEKAYA<span>HAUS</span>
      </span>
      <span className="wordmark-tag">Beyond seen. Into felt.</span>
    </span>
  );
}

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const last = useRef(0);
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last.current + 4 && !megaOpen);
      if (y < last.current - 4) setHidden(false);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [megaOpen]);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [megaOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''} ${megaOpen ? 'mega-open' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="header-brand" aria-label="HekayaHaus home">
            <Wordmark />
          </Link>
          <nav className="header-nav" aria-label="Primary">
            <ul>
              {NAV.map((item) =>
                item.mega ? (
                  <li
                    key={item.label}
                    ref={megaRef}
                    className="has-mega"
                    onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setMegaOpen(true)}
                    onMouseLeave={() => window.matchMedia('(hover: hover)').matches && setMegaOpen(false)}
                  >
                    <button type="button" className="nav-link" aria-expanded={megaOpen} aria-controls="mega-menu" onClick={() => setMegaOpen((o) => !o)}>
                      {item.label}
                      <span className="nav-caret" aria-hidden="true" />
                    </button>
                    <div id="mega-menu" className="mega" hidden={!megaOpen}>
                      <div className="mega-inner">
                        {PILLARS.map((p) => (
                          <Link key={p.id} to={p.route} className="mega-pillar">
                            <span className="mega-n">{p.n}</span>
                            <span className="mega-title">{p.name}</span>
                            <span className="mega-desc">{p.representative.slice(0, 4).join(' · ')}</span>
                            <span className="mega-go">
                              Explore <ArrowIcon />
                            </span>
                          </Link>
                        ))}
                        <Link to="/allserviceshekayahaus" className="mega-all">
                          All services <ArrowIcon />
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    {item.to.includes('#') ? (
                      <Link to={item.to} className="nav-link">
                        {item.label}
                      </Link>
                    ) : (
                      <NavLink to={item.to} className="nav-link">
                        {item.label}
                      </NavLink>
                    )}
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
