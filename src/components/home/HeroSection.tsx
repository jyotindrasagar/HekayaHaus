import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CLIENTS, SITE } from '../../data/site';
import { VIDEOS } from '../../data/videos';
import { Button, PlayIcon } from '../ui/Buttons';
import { SplitText } from '../ui/Reveal';
import { Img, srcFor } from '../ui/Img';
import { Theatre } from '../ui/VideoPlayer';
import { InteractiveCanvas } from '../three/InteractiveCanvas';
import { LogoMark } from '../layout/SiteHeader';

const loadHero = () => import('../three/HeroScene');
const INTRO_KEY = 'hh-intro-seen';

function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return false;
  }
}

/** First-load sequence: HEKAYAHAUS alone, strong and clean — then the page opens. ~1.9s, once per visit. */
function IntroSequence({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* private mode */
    }
    document.documentElement.classList.add('no-scroll');
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove('no-scroll');
      onDone();
    }, 2100);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove('no-scroll');
    };
  }, [onDone]);
  return createPortal(
    <div className="intro" aria-hidden="true" onClick={onDone}>
      <div className="intro-inner">
        <LogoMark className="intro-mark" />
        <p className="intro-word">
          {'HEKAYAHAUS'.split('').map((c, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties}>
              {c}
            </span>
          ))}
        </p>
      </div>
    </div>,
    document.body,
  );
}

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
          style={{ left: `${s.x}%`, width: `${s.w}%`, top: `${s.y}%`, height: `${s.h}%`, '--depth': s.d, '--i': i } as React.CSSProperties}
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
  const [intro, setIntro] = useState(shouldPlayIntro);
  const [playedIntro] = useState(intro);
  // When the intro plays, hold the hero's own reveal until the curtain lifts.
  const base = playedIntro ? 1650 : 100;

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

  const d = (ms: number) => ({ '--d': `${base + ms}ms` }) as React.CSSProperties;

  return (
    <section className={`hero ${playedIntro ? 'hero-after-intro' : ''}`} ref={ref} aria-labelledby="hero-title">
      {intro && <IntroSequence onDone={() => setIntro(false)} />}
      <div className="hero-grid container">
        <div className="hero-copy">
          <p className="eyebrow hero-in" style={d(0)}>
            {SITE.positioning} • {SITE.region}
          </p>
          <span id="hero-title" className="sr-only">HekayaHaus — Beyond seen. Into felt.</span>
          <SplitText
            as="h1"
            text={'Beyond seen.\nInto felt.'}
            accent={['Into', 'felt']}
            className="hero-title"
            immediate
            delay={base + 80}
            stagger={90}
          />
          <p className="hero-lead hero-in" style={d(480)}>
            Your business deserves to be seen for what it can become.
          </p>
          <div className="hero-logos hero-in" style={d(580)} aria-label={`Trusted by brands including ${CLIENTS.map((c) => c.name).join(', ')}`}>
            <div className="hero-logos-track">
              {[0, 1].map((k) => (
                <ul key={k} aria-hidden={k === 1 || undefined}>
                  {CLIENTS.map((c) => (
                    <li key={c.name}>
                      <img src={c.logo} alt={k ? '' : c.name} width={c.w} height={c.h} loading="eager" decoding="async" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="hero-actions hero-in" style={d(680)}>
            <Button href={SITE.calendar} external>
              Book a discovery call
            </Button>
            <button type="button" className="reel-link" onClick={() => setReel(true)} data-cursor="Play">
              <span>Watch showreel</span>
              <span className="reel-disc">
                <PlayIcon />
              </span>
            </button>
          </div>
          <p className="hero-note hero-in" style={d(780)}>
            Built through collaborations with <strong>200+ clients and brands</strong> across industries, markets and ambitions.
          </p>
        </div>

        <div className="hero-visual hero-in" style={d(0)}>
          <InteractiveCanvas load={loadHero} eager className="hero-canvas" sceneProps={{ src: srcFor('portrait-lightbulb-duo', 1440), startDelay: playedIntro ? 1.6 : 0 }} fallback={<SlicedPortrait />} />
          <p className="hero-scroll" aria-hidden="true">
            <span>Scroll to explore</span>
            <span className="hero-scroll-line" />
          </p>
          <div className="hero-trusted">
            <strong>200+</strong>
            <span>Brands trust the Haus</span>
          </div>
        </div>
      </div>
      {reel && <Theatre video={VIDEOS.showreel} onClose={() => setReel(false)} />}
    </section>
  );
}
