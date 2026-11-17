import { useEffect, useRef, useState } from 'react';
import { SITE, TRUSTED_BY } from '../../data/site';
import { VIDEOS } from '../../data/videos';
import { Button, PlayIcon } from '../ui/Buttons';
import { SplitText } from '../ui/Reveal';
import { Img, srcFor } from '../ui/Img';
import { Theatre } from '../ui/VideoPlayer';
import { InteractiveCanvas } from '../three/InteractiveCanvas';
import { BrandMarquee } from './BrandMarquee';

const loadHero = () => import('../three/HeroScene');

/** CSS-only sliced portrait: the LCP image and the fallback for every device without WebGL. */
function SlicedPortrait() {
  const slices = [
    { x: 2, w: 15, y: 22, h: 60, d: -0.6 },
    { x: 19, w: 17, y: 6, h: 88, d: 0.2 },
    { x: 38, w: 20, y: 0, h: 100, d: 1 },
    { x: 60, w: 17, y: 10, h: 80, d: 0.5 },
    { x: 79, w: 14, y: 26, h: 56, d: -0.8 },
  ];
  return (
    <div className="sliced" aria-hidden="true">
      {slices.map((s, i) => (
        <div
          key={i}
          className="slice"
          style={
            {
              left: `${s.x}%`,
              width: `${s.w}%`,
              top: `${s.y}%`,
              height: `${s.h}%`,
              '--depth': s.d,
              '--i': i,
            } as React.CSSProperties
          }
        >
          <div className="slice-img" style={{ width: `${10000 / s.w}%`, height: `${10000 / s.h}%`, left: `${(-s.x * 100) / s.w}%`, top: `${(-s.y * 100) / s.h}%` }}>
            <Img name="portrait-lightbulb-duo" sizes="(min-width: 1024px) 50vw, 100vw" priority={i === 2} decorative />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [reel, setReel] = useState(false);

  // Pointer depth for the CSS composition (the WebGL scene tracks the pointer itself).
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--px', cx.toFixed(4));
      el.style.setProperty('--py', cy.toFixed(4));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const on = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => {
      window.removeEventListener('pointermove', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy">
          <p className="eyebrow hero-in" style={{ '--d': '0ms' } as React.CSSProperties}>
            {SITE.positioning} · Dubai
          </p>
          <SplitText
            as="h1"
            text={'Beyond seen.\nInto felt.'}
            accent={['Into', 'felt']}
            className="hero-title"
            immediate
            delay={120}
            stagger={90}
          />
          <span id="hero-title" className="sr-only">HekayaHaus — Beyond seen. Into felt.</span>
          <p className="hero-lead hero-in" style={{ '--d': '520ms' } as React.CSSProperties}>
            Your brand story, told through cinematic production, strategic marketing and technology —
            under one roof.
          </p>
          <p className="hero-sub hero-in" style={{ '--d': '620ms' } as React.CSSProperties}>
            {SITE.manifesto}
          </p>
          <div className="hero-actions hero-in" style={{ '--d': '720ms' } as React.CSSProperties}>
            <Button href={SITE.calendar} external>
              Book a discovery call
            </Button>
            <button type="button" className="reel-link" onClick={() => setReel(true)}>
              <span>Watch showreel</span>
              <span className="reel-disc">
                <PlayIcon />
              </span>
            </button>
          </div>
        </div>

        <div className="hero-visual hero-in" style={{ '--d': '0ms' } as React.CSSProperties}>
          <InteractiveCanvas
            load={loadHero}
            eager
            className="hero-canvas"
            sceneProps={{ src: srcFor('portrait-lightbulb-duo', 1440) }}
            fallback={<SlicedPortrait />}
          />
          <p className="hero-scroll" aria-hidden="true">
            <span>Scroll to explore</span>
            <span className="hero-scroll-line" />
          </p>
          <div className="hero-trusted">
            <strong>{TRUSTED_BY}</strong>
            <span>Trusted by</span>
          </div>
        </div>
      </div>
      <BrandMarquee />
      {reel && <Theatre video={VIDEOS.showreel} onClose={() => setReel(false)} />}
      <noscript>
        <Img name="portrait-lightbulb-duo" />
      </noscript>
    </section>
  );
}
