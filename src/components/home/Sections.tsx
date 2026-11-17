import { useEffect, useRef, useState } from 'react';
import { METRICS, PRINCIPLES, SITE, TRUSTED_BY } from '../../data/site';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { Button } from '../ui/Buttons';
import { getCapabilities } from '../../lib/quality';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || getCapabilities().reducedMotion) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="metric-value" aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {n}
        <em>{suffix}</em>
      </span>
    </span>
  );
}

export function MetricsSection() {
  return (
    <section className="metrics dark" aria-labelledby="metrics-title">
      <div className="container">
        <div className="metrics-head">
          <Reveal as="p" className="eyebrow eyebrow-light">Results</Reveal>
          <Reveal as="h2" className="display-m" id="metrics-title">Performance you can measure.</Reveal>
        </div>
        <ul className="metrics-grid">
          {METRICS.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 90}>
              <Counter value={m.value} suffix={m.suffix} />
              <span className="metric-label">{m.label}</span>
            </Reveal>
          ))}
          <Reveal as="li" delay={270}>
            <span className="metric-value">{TRUSTED_BY.replace('k+', '')}<em>K+</em></span>
            <span className="metric-label">Trusted by</span>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section className="principles section" id="why-us" aria-labelledby="why-title">
      <div className="container principles-grid">
        <div className="principles-side">
          <Reveal as="p" className="eyebrow">Why HekayaHaus</Reveal>
          <SplitText as="h2" text="Why visionaries choose the Haus." accent={['the', 'Haus']} className="display-l" />
          <Reveal className="principles-quote" variant="clip" delay={100} parallax>
            <Img name="portrait-neon" sizes="(min-width: 1024px) 30vw, 90vw" />
            <blockquote>
              <p>“{SITE.callout}”</p>
            </blockquote>
          </Reveal>
        </div>
        <ol className="principles-list">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 70}>
              <span className="principle-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display-s">{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta dark" aria-labelledby="cta-title">
      <div className="final-cta-bg" aria-hidden="true" data-parallax>
        <Img name="auto-cockpit" sizes="100vw" decorative />
      </div>
      <div className="container final-cta-inner">
        <Reveal as="p" className="eyebrow eyebrow-light">Ready when you are</Reveal>
        <SplitText as="h2" text={'Where stories\nbecome legacies.'} accent={['become', 'legacies']} className="display-xl" />
        <Reveal as="p" className="final-cta-sub" delay={120}>
          Launching a new brand, scaling an existing one or redefining your digital presence — let’s make it
          unforgettable.
        </Reveal>
        <Reveal className="final-cta-actions" delay={200}>
          <Button href={SITE.calendar} external variant="light">
            Book a discovery call
          </Button>
          <Button to="/contact-us" variant="outline-light">
            Get started
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
