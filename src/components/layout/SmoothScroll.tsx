import { useEffect } from 'react';
import Lenis from 'lenis';
import { getCapabilities } from '../../lib/quality';

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset: typeof target === 'number' ? 0 : -80 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
}

/** Lenis momentum scrolling on desktop pointers only; native scroll on touch and reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    const caps = getCapabilities();
    if (caps.reducedMotion || caps.coarsePointer) return;
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, autoRaf: true, smoothWheel: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
