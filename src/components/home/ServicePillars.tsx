import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PILLARS } from '../../data/services';
import { PROJECTS } from '../../data/work';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { ArrowIcon, Button } from '../ui/Buttons';

/**
 * Three pillars as expanding panels: hover / focus / tap a pillar to open it. On narrow screens all three
 * stack open. Each pillar links to its page and to related case studies.
 */
export function ServicePillars() {
  const [active, setActive] = useState(0);
  return (
    <section className="pillars section" id="what-we-do" aria-labelledby="pillars-title">
      <div className="container">
        <div className="section-head section-head-row">
          <div>
            <Reveal as="p" className="eyebrow">What we do</Reveal>
            <SplitText as="h2" text={'Three pillars.\nOne Haus.'} accent={['One', 'Haus']} className="display-l" />
            <span id="pillars-title" className="sr-only">Three pillars. One Haus.</span>
          </div>
          <Reveal as="p" className="section-intro" delay={120}>
            Everything we do sits under three clear pillars. No fragmented services. No confusion. Just focused power that
            actually moves the business.
          </Reveal>
        </div>

        <ol className="pp" onMouseLeave={() => undefined}>
          {PILLARS.map((p, i) => {
            const cases = PROJECTS.filter((w) => w.pillar === p.id).slice(0, 3);
            const isActive = active === i;
            return (
              <li
                key={p.id}
                className={`pp-item ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
              >
                <div className="pp-media" aria-hidden="true">
                  <Img name={p.image} sizes="(min-width: 1024px) 60vw, 100vw" decorative />
                </div>
                <button
                  type="button"
                  className="pp-tab"
                  aria-expanded={isActive}
                  aria-controls={`pp-body-${p.id}`}
                  onClick={() => setActive(i)}
                  data-cursor="Open"
                >
                  <span className="pp-n">{p.n}</span>
                  <span className="pp-name">{p.name}</span>
                  <span className="pp-line">{p.line}</span>
                </button>
                <div className="pp-body" id={`pp-body-${p.id}`}>
                  {p.intro.map((t) => (
                    <p key={t.slice(0, 20)}>{t}</p>
                  ))}
                  <ul className="pp-bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {cases.length > 0 && (
                    <div className="pp-cases">
                      <span>Case studies</span>
                      {cases.map((c) => (
                        <Link key={c.slug} to={`/portfolio/${c.slug}`} data-cursor="View">
                          {c.title} <ArrowIcon />
                        </Link>
                      ))}
                    </div>
                  )}
                  <Button to={p.route} variant="light">
                    {p.cta}
                  </Button>
                </div>
              </li>
            );
          })}
        </ol>
        <Reveal className="pillars-all">
          <Link to="/allserviceshekayahaus" className="text-link">
            <span>See every capability</span>
            <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
