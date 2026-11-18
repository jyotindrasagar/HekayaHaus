import { useEffect, useRef } from 'react';
import { SITE } from '../../data/site';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { Button, TextLink } from '../ui/Buttons';
import { getCapabilities } from '../../lib/quality';

/** Paragraph whose words light up as it scrolls past (scrubbed; content is always present). */
function ScrubText({ lines, className = '' }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (getCapabilities().reducedMotion) {
      el.classList.add('lit-all');
      return;
    }
    let raf = 0;
    const words = Array.from(el.querySelectorAll<HTMLElement>('.mw'));
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top is at 85% of the viewport, 1 when its bottom reaches 45%.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const lit = p * words.length;
      words.forEach((w, i) => {
        const o = Math.min(1, Math.max(0.16, lit - i + 0.16));
        w.style.opacity = o.toFixed(3);
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className={`scrub ${className}`} ref={ref}>
      {lines.map((line, li) => (
        <p key={li}>
          {line.split(' ').map((w, i) => (
            <span className="mw" key={i}>
              {w}{' '}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

/** "Your business deserves to be seen…" — the empathy statement right after the hero. */
export function StoryStatement() {
  return (
    <section className="story section" aria-label="Why we exist">
      <div className="container story-grid">
        <Reveal as="p" className="eyebrow">We get it</Reveal>
        <div>
          <ScrubText
            className="story-text"
            lines={[
              'You’ve spent money. You’ve trusted people. You’ve been left with work that looked good but did nothing for the business.',
              'You’re not looking for another agency that talks big and disappears. You’re looking for a partner who grows the brand, builds something people remember, and turns attention into real sales.',
            ]}
          />
          <Reveal className="story-foot" delay={80}>
            <p className="story-claim">That’s what we do.</p>
            <p>
              <strong>200+ brands later</strong>, the results are still the same: clearer identity, stronger presence, and
              measurable growth.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** The Haus — Not an agency. A Haus you can actually trust. */
export function Manifesto() {
  return (
    <section className="manifesto section" id="the-haus" aria-labelledby="manifesto-title">
      <div className="container manifesto-grid">
        <Reveal as="p" className="eyebrow">The Haus</Reveal>
        <div>
          <SplitText
            as="h2"
            text={'Not an agency.\nA Haus you can actually trust.'}
            accent={['actually', 'trust']}
            className="display-xl manifesto-title"
          />
          <span id="manifesto-title" className="sr-only">Not an agency. A Haus you can actually trust.</span>
          <div className="manifesto-cols">
            <Reveal as="p" className="manifesto-lead">
              Most founders we meet carry the same quiet frustration. They’ve been burned before, overpromised,
              under-delivered, or left with beautiful work that never moved the numbers.
            </Reveal>
            <Reveal as="div" delay={100} className="manifesto-body">
              <p>We built HekayaHaus to end that cycle.</p>
              <p>
                Here, creativity is not decoration. It is the engine that grows the business, strengthens the brand, and
                increases sales, with full transparency at every step.
              </p>
            </Reveal>
          </div>
          <ul className="manifesto-nos">
            {['No hidden scopes.', 'No disappearing after the invoice.', 'No “trust us, it’s art.”'].map((t, i) => (
              <Reveal as="li" key={t} delay={i * 90} variant="clip">
                <span>{String(i + 1).padStart(2, '0')}</span>
                {t}
              </Reveal>
            ))}
          </ul>
          <Reveal className="manifesto-foot" delay={100}>
            <p>Just one team, one standard, and 200+ brands who already know the difference.</p>
            <TextLink to="/about">More about the Haus</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * WHERE STORIES BECOME LEGACIES — a photograph opens from a narrow frame to full-bleed as you scroll.
 * Native `position: sticky` + a damped scroll-progress loop (no pinning, can't desync).
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
            <span className="eyebrow">Our promise</span>
            <p className="display-l">
              Where stories
              <br />
              become…
            </p>
          </div>
          <div className="xp-frame">
            <Img name="auto-mercedes-dubai" sizes="(orientation: portrait) 160vh, 110vw" />
          </div>
          <div className="xp-copy container">
            <h2 id="xp-title" className="display-xl">
              Where stories <em>become legacies.</em>
            </h2>
          </div>
          <div className="xp-hint" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <div className="xp-after container">
        <Reveal as="p" className="xp-lead">
          We don’t just create. We grow businesses, build brands that last, and turn attention into sales, with the same
          care we would give our own company.
        </Reveal>
        <ul className="xp-stats">
          {['200+ clients.', 'Proven results.', 'Zero tolerance for the games you’ve already seen.'].map((t, i) => (
            <Reveal as="li" key={t} delay={i * 90}>
              {t}
            </Reveal>
          ))}
        </ul>
        <Reveal className="xp-cta" delay={120}>
          <p>When you’re ready to work with a Haus that actually stands behind its word —</p>
          <Button href={SITE.calendar} external variant="light">
            Book a discovery call
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
