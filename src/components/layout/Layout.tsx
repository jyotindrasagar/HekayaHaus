import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SmoothScroll, scrollToTarget } from './SmoothScroll';
import { ScrollFX } from './ScrollFX';

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    update();
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}

/** Scroll restoration + hash links + a short curtain wipe between routes. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const [curtain, setCurtain] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      setCurtain((c) => c + 1);
    }
    if (hash) {
      const t = setTimeout(() => scrollToTarget(hash), 120);
      return () => clearTimeout(t);
    }
    scrollToTarget(0, true);
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return curtain ? <div key={curtain} className="route-curtain" aria-hidden="true" /> : null;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((b, i) => (
          <li key={b.path}>
            {i < items.length - 1 ? <Link to={b.path}>{b.name}</Link> : <span aria-current="page">{b.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <SiteHeader />
      <RouteEffects />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>{children}</Suspense>
      </main>
      <SiteFooter />
      <ScrollFX />
    </>
  );
}
