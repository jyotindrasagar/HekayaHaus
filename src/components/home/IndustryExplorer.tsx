import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { INDUSTRIES } from '../../data/site';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { ArrowIcon } from '../ui/Buttons';

/** Typography-led index. Fine pointers get a floating image preview; keyboard focus shows it too. */
export function IndustryExplorer() {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !preview.current || !list.current) return;
    const r = list.current.getBoundingClientRect();
    preview.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
  };

  return (
    <section className="industries section" id="industries" aria-labelledby="ind-title">
      <div className="container">
        <div className="section-head section-head-row">
          <div>
            <Reveal as="p" className="eyebrow">Industries</Reveal>
            <SplitText as="h2" text="Built for brands that dream big." accent={['dream', 'big']} className="display-l" />
          </div>
          <Reveal as="p" className="section-intro" delay={100}>
            From luxury brands and automotive giants to lifestyle startups and events — the same Haus, tuned to each
            category’s audience.
          </Reveal>
        </div>
        <div className="ind-wrap" ref={list} onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        <ul className={`ind-list ${active !== null ? 'has-active' : ''}`}>
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.name} className={active === i ? 'active' : ''}>
              <Link to={ind.to} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
                <span className="ind-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="ind-name">{ind.name}</span>
                <ArrowIcon />
              </Link>
            </li>
          ))}
        </ul>
          <div className={`ind-preview ${active !== null ? 'show' : ''}`} ref={preview} aria-hidden="true">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.name} className={`ind-preview-img ${active === i ? 'on' : ''}`}>
                {Math.abs((active ?? -9) - i) <= 1 && <Img name={ind.image} sizes="320px" decorative />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
