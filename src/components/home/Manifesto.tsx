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
 * A photograph starts in a narrow vertical frame and opens to full-bleed while the visitor scrolls,
 * with the capability statement revealing over it. Pinned only on wide, motion-friendly screens.
 */
export function ExpandingImage() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const caps = getCapabilities();
    if (caps.reducedMotion || window.innerWidth < 900) {
      el.classList.add('expanded');
      return;
    }
    let cleanup = () => {};
    import('../../lib/gsap').then(({ useGsap }) => {
      const { gsap } = useGsap();
      const frame = el.querySelector('.xp-frame');
      const img = el.querySelector('.xp-frame img');
      const copy = el.querySelector('.xp-copy');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=140%', scrub: 1.2, pin: '.xp-pin', anticipatePin: 1 },
        defaults: { ease: 'none' },
      });
      tl.fromTo(frame, { clipPath: 'inset(8% 38% 8% 38% round 2px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, 0)
        .fromTo(img, { scale: 1.35 }, { scale: 1.02 }, 0)
        .fromTo(copy, { opacity: 0, y: 60 }, { opacity: 1, y: 0 }, 0.45);
      cleanup = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => cleanup();
  }, []);

  return (
    <section className="xp" ref={section} aria-labelledby="xp-title">
      <div className="xp-pin">
        <div className="xp-frame">
          <Img name="auto-mercedes-dubai" sizes="100vw" />
        </div>
        <div className="xp-copy container">
          <h2 id="xp-title" className="display-l">
            Stories don’t just happen. <em>We create them.</em>
          </h2>
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
