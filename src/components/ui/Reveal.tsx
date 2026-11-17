import { createElement, Fragment, useEffect, useRef, type ElementType, type ReactNode } from 'react';

// One shared IntersectionObserver for every reveal on the page, plus a cheap scroll-position fallback so
// elements that are skipped over by fast scrolling or anchor jumps are never left hidden.
let io: IntersectionObserver | null = null;
const pending = new Set<Element>();
let scheduled = false;

function reveal(el: Element) {
  el.classList.add('in');
  pending.delete(el);
  io?.unobserve(el);
}

function sweep() {
  scheduled = false;
  const limit = window.innerHeight * 0.96;
  pending.forEach((el) => {
    if (el.getBoundingClientRect().top < limit) reveal(el);
  });
}

function schedule() {
  if (!scheduled && pending.size) {
    scheduled = true;
    requestAnimationFrame(sweep);
  }
}

function observe(el: Element) {
  if (typeof window === 'undefined') return () => {};
  if (!('IntersectionObserver' in window)) {
    el.classList.add('in');
    return () => {};
  }
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) reveal(e.target);
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }
  pending.add(el);
  io.observe(el);
  schedule();
  return () => {
    pending.delete(el);
    io?.unobserve(el);
  };
}

interface RevealProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  delay?: number;
  variant?: 'up' | 'fade' | 'clip' | 'scale';
  id?: string;
  style?: React.CSSProperties;
  /** Image inside drifts with scroll (see ScrollFX). */
  parallax?: boolean;
}

export function Reveal({ as = 'div', className = '', children, delay = 0, variant = 'up', id, style, parallax }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? observe(ref.current) : undefined), []);
  return createElement(
    as,
    { ref, id, className: `rv rv-${variant} ${className}`, style: { ...style, '--d': `${delay}ms` }, 'data-parallax': parallax ? '' : undefined },
    children,
  );
}

interface SplitProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words to render in cobalt / italic. */
  accent?: string[];
  italic?: string[];
  delay?: number;
  stagger?: number;
  /** Render immediately (hero) instead of on scroll. */
  immediate?: boolean;
  lineBreaks?: boolean;
}

/** Word-level masked reveal. Text stays readable to screen readers via aria-label. */
export function SplitText({ text, as = 'h2', className = '', accent = [], italic = [], delay = 0, stagger = 55, immediate, lineBreaks = true }: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (immediate) {
      const el = ref.current;
      const raf = requestAnimationFrame(() => el.classList.add('in'));
      return () => cancelAnimationFrame(raf);
    }
    return observe(ref.current);
  }, [immediate]);

  const lines = lineBreaks ? text.split('\n') : [text.replace(/\n/g, ' ')];
  let i = 0;
  const clean = (w: string) => w.replace(/[.,!?]/g, '');
  return createElement(
    as,
    { ref, className: `split ${className}`, 'aria-label': text.replace(/\n/g, ' ') },
    lines.map((line, li) => (
      <span className="split-line" key={li} aria-hidden="true">
        {line.split(' ').filter(Boolean).map((word, wi) => {
          const idx = i++;
          const cls = [accent.includes(clean(word)) ? 'accent' : '', italic.includes(clean(word)) ? 'ital' : '']
            .filter(Boolean)
            .join(' ');
          return (
            <Fragment key={wi}>
              <span className="split-mask">
                <span className={`split-word ${cls}`} style={{ '--d': `${delay + idx * stagger}ms` } as React.CSSProperties}>
                  {word}
                </span>
              </span>{' '}
            </Fragment>
          );
        })}
      </span>
    )),
  );
}
