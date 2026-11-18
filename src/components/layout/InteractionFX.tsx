import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getCapabilities } from '../../lib/quality';

/**
 * Desktop-only interaction layer:
 *  - a soft cursor follower that grows over interactive elements and shows the label from [data-cursor]
 *    ("View", "Play", "Drag", "Read" …). The native cursor stays visible for accessibility.
 *  - 3D tilt for any `.tilt` element, following the pointer.
 * Disabled on touch devices and for reduced motion.
 */
export function InteractionFX() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const caps = getCapabilities();
    if (caps.coarsePointer || caps.reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const r = ring.current;
    const l = label.current;
    if (!r || !l) return;
    document.documentElement.classList.add('has-cursor');
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    let tiltEl: HTMLElement | null = null;

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      r.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const resetTilt = () => {
      if (tiltEl) {
        tiltEl.style.removeProperty('--rx');
        tiltEl.style.removeProperty('--ry');
        tiltEl.classList.remove('is-tilting');
        tiltEl = null;
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>('[data-cursor]');
      const interactive = t.closest('a, button, [role="button"], input, select, textarea, label');
      const overFrame = t.closest('iframe, .theatre');
      r.classList.toggle('is-hidden', !!overFrame);
      r.classList.toggle('is-active', !!interactive && !labelled);
      r.classList.toggle('has-label', !!labelled);
      l.textContent = labelled?.dataset.cursor ?? '';
      r.classList.toggle('is-text', !!t.closest('input, textarea'));

      const tilt = t.closest<HTMLElement>('.tilt');
      if (tilt !== tiltEl) resetTilt();
      if (tilt) {
        tiltEl = tilt;
        const b = tilt.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width - 0.5;
        const py = (e.clientY - b.top) / b.height - 0.5;
        tilt.classList.add('is-tilting');
        tilt.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
        tilt.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`);
      }
    };
    const onLeave = () => {
      r.classList.add('is-hidden');
      resetTilt();
    };
    const onDown = () => r.classList.add('is-down');
    const onUp = () => r.classList.remove('is-down');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      cancelAnimationFrame(raf);
      resetTilt();
      document.documentElement.classList.remove('has-cursor');
    };
  }, [pathname]);

  return (
    <div className="cursor is-hidden" ref={ring} aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
