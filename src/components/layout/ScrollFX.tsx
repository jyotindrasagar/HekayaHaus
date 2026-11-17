import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCapabilities } from '../../lib/quality';

/**
 * Page-wide scroll choreography so scene changes feel continuous rather than cut:
 *  - dark "scenes" open from a rounded, inset card into full-bleed as they arrive, and the
 *    previous scene dims and recedes slightly as it leaves;
 *  - images marked [data-parallax] drift inside their frames;
 *  - the hero copy and visual ease out (fade + lift) as you scroll past;
 *  - ScrollTrigger is refreshed as late images load so pinned sections never jump.
 * All of it is scrubbed (tied to scroll position), lazy-loaded, and skipped for reduced motion.
 */
export function ScrollFX() {
  const { pathname } = useLocation();

  useEffect(() => {
    const caps = getCapabilities();
    if (caps.reducedMotion) return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let refreshTimer = 0;
    const onImgLoad = () => {
      clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => import('../../lib/gsap').then(({ ScrollTrigger }) => ScrollTrigger.refresh()), 200);
    };

    // Let the page's own components mount (and create their pins) first.
    const start = window.setTimeout(() => {
      import('../../lib/gsap').then(({ useGsap }) => {
        if (cancelled) return;
        const { gsap, ScrollTrigger } = useGsap();
        ctx = gsap.context(() => {
          const lite = caps.coarsePointer || caps.tier === 'low';

          // 1. Dark scenes open up as they enter.
          gsap.utils.toArray<HTMLElement>('main .dark').forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: lite ? 'inset(0% 2% 0% 2% round 18px)' : 'inset(0% 3.5% 0% 3.5% round 28px)' },
              {
                clipPath: 'inset(0% 0% 0% 0% round 0px)',
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: 0.9 },
              },
            );
          });

          // 2. The section before each dark scene dims back slightly as the next one covers it.
          if (!lite) {
            gsap.utils.toArray<HTMLElement>('main section').forEach((el) => {
              const next = el.nextElementSibling as HTMLElement | null;
              if (!next || !next.matches('.dark') || el.matches('.dark, .hero, .xp')) return;
              gsap.to(el, {
                opacity: 0.55,
                ease: 'none',
                scrollTrigger: { trigger: next, start: 'top 75%', end: 'top 15%', scrub: 0.9 },
              });
            });
          }

          // 3. Image drift inside frames.
          if (!lite) {
            gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach((img) => {
              gsap.fromTo(
                img,
                { yPercent: -6, scale: 1.12 },
                {
                  yPercent: 6,
                  scale: 1.12,
                  ease: 'none',
                  scrollTrigger: { trigger: img.closest('[data-parallax]'), start: 'top bottom', end: 'bottom top', scrub: 1.2 },
                },
              );
            });
          }

          // 4. Hero eases out.
          const hero = document.querySelector<HTMLElement>('main .hero');
          if (hero) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 } });
            tl.to('.hero-copy', { yPercent: -18, opacity: 0.2, ease: 'none' }, 0).to('.hero-visual', { yPercent: lite ? 0 : 10, scale: 0.94, opacity: 0.35, ease: 'none' }, 0);
          }

          // 5. Inner-page hero media drifts and settles.
          const phm = document.querySelector<HTMLElement>('main .page-hero-media img');
          if (phm && !lite) {
            gsap.to(phm, { yPercent: 8, scale: 1.06, ease: 'none', scrollTrigger: { trigger: phm, start: 'top top+=80', end: 'bottom top', scrub: 1 } });
          }
        });
        ScrollTrigger.refresh();
      });
    }, 350);

    document.addEventListener('load', onImgLoad, true);
    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(refreshTimer);
      document.removeEventListener('load', onImgLoad, true);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
