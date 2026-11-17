import { useEffect, useRef, useState } from 'react';
import { PROCESS } from '../../data/site';
import type { MediaName } from '../../data/media.generated';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { InteractiveCanvas } from '../three/InteractiveCanvas';

const loadArch = () => import('../three/ArchitecturalScene');

/** Sticky editorial sequence — the visual changes as each stage scrolls into focus. No scroll-jacking. */
export function ProcessSection() {
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="process section" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">Our process</Reveal>
          <SplitText as="h2" text="From first idea to lasting legacy." accent={['lasting', 'legacy']} className="display-l" />
        </div>
        <div className="process-grid">
          <div className="process-visual" aria-hidden="true">
            <div className="process-sticky">
              <div className="process-frames">
                {PROCESS.map((p, i) => (
                  <div key={p.n} className={`process-img ${i === step ? 'on' : ''} ${i < step ? 'past' : ''}`}>
                    <Img name={p.image as MediaName} sizes="(min-width: 1024px) 40vw, 90vw" decorative />
                  </div>
                ))}
                <InteractiveCanvas load={loadArch} sceneProps={{ step }} className="process-canvas" fallback={null} />
                <span className="process-big">{PROCESS[step].n}</span>
              </div>
              <div className="process-dots">
                {PROCESS.map((p, i) => (
                  <span key={p.n} className={i <= step ? 'on' : ''} />
                ))}
              </div>
            </div>
          </div>
          <ol className="process-steps">
            {PROCESS.map((p, i) => (
              <li
                key={p.n}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={i === step ? 'active' : ''}
              >
                <span className="process-n">{p.n}</span>
                <h3 className="display-m">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
