import { useEffect, useRef } from 'react';
import { SITE, CAPABILITIES } from '../../data/site';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { TextLink } from '../ui/Buttons';
import { getCapabilities } from '../../lib/quality';

/** "Not an agency." — words light up as the statement scrolls past (scrubbed, never hides content). */
export function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = textRef.current;
    if (!el || getCapabilities().reducedMotion) {
      el?.classList.add('lit-all');
      return;
    }
    let cleanup = () => {};
    import('../../lib/gsap').then(({ useGsap }) => {
      const { gsap } = useGsap();
      const words = el.querySelectorAll('.mw');
      const tween = gsap.fromTo(
        words,
        { opacity: 0.16 },
        { opacity: 1, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 } },
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => cleanup();
  }, []);

  return (
    <section className="manifesto section" id="about" aria-labelledby="manifesto-title">
      <div className="container manifesto-grid">
        <Reveal as="p" className="eyebrow">The Haus</Reveal>
        <div>
          <Reveal as="h2" className="display-xl manifesto-title" variant="clip">
            <span id="manifesto-title">Not an agency.</span>
          </Reveal>
          <p className="manifesto-text" ref={textRef}>
            {SITE.manifesto.split(' ').map((w, i) => (
              <span className="mw" key={i}>
                {w}{' '}
              </span>
            ))}
          </p>
          <Reveal className="manifesto-foot" delay={100}>
            <blockquote>“{SITE.callout}”</blockquote>
            <TextLink to="/about">More about the Haus</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * A photograph starts in a narrow vertical frame and opens to full-bleed as the visitor scrolls.
 * Built on native `position: sticky` (no pinning) so it can never desync from the scroll position;
 * a damped rAF loop maps scroll progress to the reveal for a smooth, continuous expansion.
 */
export function ExpandingImage() {
  const track = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tr = track.current;
    const st = sticky.current;
    if (!tr || !st) return;
    if (getCapabilities().reducedMotion) {
      st.style.setProperty('--p', '1');
      return;
    }
    let target = 0;
    let current = -1;
    let raf = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const measure = () => {
      const r = tr.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      target = range > 0 ? clamp(-r.top / range) : 1;
    };
    const tick = () => {
      raf = 0;
      // Damped follow: smooth on wheel, trackpad and touch alike.
      current = current < 0 ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      st.style.setProperty('--p', current.toFixed(4));
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="xp" aria-labelledby="xp-title">
      <div className="xp-track" ref={track}>
        <div className="xp-sticky" ref={sticky}>
          <div className="xp-intro container" aria-hidden="true">
            <span className="eyebrow">Capabilities</span>
            <p className="display-l">
              Stories don’t
              <br />
              just happen.
            </p>
          </div>
          <div className="xp-frame">
            <Img name="auto-mercedes-dubai" sizes="(orientation: portrait) 160vh, 110vw" />
          </div>
          <div className="xp-copy container">
            <h2 id="xp-title" className="display-l">
              Stories don’t just happen. <em>We create them.</em>
            </h2>
          </div>
          <div className="xp-hint" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <div className="xp-caps container">
        <ul>
          {CAPABILITIES.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 60}>
              <span className="xp-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
