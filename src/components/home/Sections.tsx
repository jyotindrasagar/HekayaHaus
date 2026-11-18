import { useEffect, useRef, useState } from 'react';
import { CLIENTS, FEATURES, METRICS, SITE } from '../../data/site';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { ArrowIcon, Button } from '../ui/Buttons';
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

/** Featured in — press, recognition and exhibitions. */
export function FeaturedIn() {
  return (
    <section className="featured-in" aria-labelledby="fi-title">
      <div className="container featured-in-inner">
        <h2 id="fi-title" className="featured-in-title">Featured in</h2>
        <ul>
          {FEATURES.map((f, i) => {
            const inner = (
              <>
                <span className="fi-name">{f.name}</span>
                <span className="fi-detail">{f.detail}</span>
                {f.href && <ArrowIcon dir="up-right" />}
              </>
            );
            return (
              <Reveal as="li" key={f.name} delay={i * 80}>
                {f.href ? (
                  <a href={f.href} target="_blank" rel="noopener noreferrer" data-cursor="Read">
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Results — THE WORK SPEAKS. */
export function MetricsSection() {
  return (
    <section className="metrics dark" aria-labelledby="metrics-title">
      <div className="container">
        <div className="metrics-head">
          <div>
            <Reveal as="p" className="eyebrow eyebrow-light">The work speaks</Reveal>
            <SplitText as="h2" text="Experience matters. Evidence matters more." accent={['Evidence', 'matters', 'more']} className="display-l" />
            <span id="metrics-title" className="sr-only">Results</span>
          </div>
          <div className="metrics-copy">
            <Reveal as="p">
              We believe trust should never depend on how confidently someone sells their services. It should come from
              the work they’ve done, the people they’ve worked with and the results they can stand behind.
            </Reveal>
            <Reveal as="p" delay={80}>
              Over the years, HekayaHaus has worked alongside more than 200 businesses and brands, contributing to
              campaigns, productions, brand experiences and digital growth initiatives. From international names to
              businesses building their place in the market, every collaboration adds to what we know and what we’re
              capable of delivering.
            </Reveal>
          </div>
        </div>
        <ul className="metrics-grid">
          {METRICS.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 90}>
              <Counter value={m.value} suffix={m.suffix} />
              <span className="metric-label">{m.label}</span>
            </Reveal>
          ))}
        </ul>
        <ul className="metrics-logos" aria-label={`Including ${CLIENTS.map((c) => c.name).join(', ')}`}>
          {CLIENTS.map((c) => (
            <li key={c.name}>
              <img src={c.logo} alt="" width={c.w} height={c.h} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Why HekayaHaus — Because your business is not a testing ground. */
export function Principles() {
  return (
    <section className="principles section" id="why-us" aria-labelledby="why-title">
      <div className="container principles-grid">
        <div className="principles-side">
          <Reveal as="p" className="eyebrow">Why HekayaHaus</Reveal>
          <SplitText as="h2" text="Because your business is not a testing ground." accent={['not', 'a', 'testing', 'ground']} className="display-l" />
          <span id="why-title" className="sr-only">Why HekayaHaus</span>
          <Reveal className="principles-quote" variant="clip" delay={100} parallax>
            <Img name="portrait-neon" sizes="(min-width: 1024px) 30vw, 90vw" />
            <blockquote>
              <p>“Your ambition deserves more than another service provider. It deserves a partner who sees the bigger picture.”</p>
            </blockquote>
          </Reveal>
        </div>
        <div className="why-copy">
          <Reveal as="p" className="why-lead">
            We know what it’s like to put your trust, time and money into something and still be left with more questions
            than answers.
          </Reveal>
          <Reveal as="p" delay={60}>
            The unclear communication. The missed expectations. The work that looks good in a presentation but doesn’t do
            much for the business. We don’t believe that’s how a professional partnership should feel.
          </Reveal>
          <ol className="principles-list">
            {[
              { t: 'We start with understanding.', b: 'At HekayaHaus, we start with understanding, set clear expectations and take responsibility for the work we commit to.' },
              { t: 'You always know where things stand.', b: 'You know what we’re working towards. You know who’s handling it. And you have a team that understands the bigger picture, not just the task in front of them.' },
              { t: 'No overnight-success promises.', b: 'We won’t promise overnight success or pretend every challenge has an easy answer. We will bring the right people, the right thinking and the commitment to do the work properly.' },
            ].map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 70}>
                <span className="principle-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-s">{p.t}</h3>
                <p>{p.b}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ title = 'There’s more your business can become.' }: { title?: string }) {
  return (
    <section className="final-cta dark" aria-labelledby="cta-title">
      <div className="final-cta-bg" aria-hidden="true" data-parallax>
        <Img name="auto-cockpit" sizes="100vw" decorative />
      </div>
      <div className="container final-cta-inner">
        <Reveal as="p" className="eyebrow eyebrow-light">Ready when you are</Reveal>
        <SplitText as="h2" text={title} accent={['more', 'can', 'become']} className="display-xl" />
        <span id="cta-title" className="sr-only">{title}</span>
        <Reveal as="p" className="final-cta-sub" delay={120}>
          You can keep doing things the way they’ve always been done. Or you can start building what comes next. Tell us
          where you want to take your business. We’ll help you figure out what it takes to get there.
        </Reveal>
        <Reveal className="final-cta-actions" delay={200}>
          <Button to="/contact-us" variant="light">
            Let’s build what’s next
          </Button>
          <Button href={SITE.calendar} external variant="outline-light">
            Book a discovery call
          </Button>
        </Reveal>
        <Reveal as="p" className="final-cta-micro" delay={260}>
          No generic sales pitch. Just an honest conversation about your business.
        </Reveal>
      </div>
    </section>
  );
}
