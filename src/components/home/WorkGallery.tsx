import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_SLUGS, PROJECTS } from '../../data/work';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { ArrowIcon, Button } from '../ui/Buttons';
import { getCapabilities } from '../../lib/quality';

/**
 * Featured work. Desktop (fine pointer, ≥1024px): the section becomes a tall scroll track with a native
 * `position: sticky` stage, and the reel slides horizontally with a damped follow of scroll progress —
 * no JS pinning, so it can't desync, stick or skip. Touch / narrow / reduced motion: a swipeable rail.
 */
export function WorkGallery() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [horizontal, setHorizontal] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const projects = FEATURED_SLUGS.map((s) => PROJECTS.find((p) => p.slug === s)!);

  useEffect(() => {
    const caps = getCapabilities();
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const update = () => setHorizontal(mq.matches && !caps.reducedMotion);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    const vp = viewport.current;
    if (!horizontal || !el || !tr || !vp) {
      setHeight(undefined);
      if (tr) tr.style.transform = '';
      return;
    }
    let distance = 0;
    let target = 0;
    let current = -1;
    let raf = 0;
    const measureSize = () => {
      distance = Math.max(0, tr.scrollWidth - vp.clientWidth + 48);
      setHeight(distance + window.innerHeight);
    };
    const measure = () => {
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      target = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
    };
    const tick = () => {
      raf = 0;
      current = current < 0 ? target : current + (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0004) current = target;
      tr.style.transform = `translate3d(${(-current * distance).toFixed(1)}px, 0, 0)`;
      el.style.setProperty('--progress', current.toFixed(4));
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(() => {
      measureSize();
      onScroll();
    });
    ro.observe(tr);
    measureSize();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      tr.style.transform = '';
    };
  }, [horizontal]);

  return (
    <section
      className={`work section dark ${horizontal ? 'is-horizontal' : ''}`}
      id="work"
      ref={section}
      aria-labelledby="work-title"
      style={{ height }}
    >
      <div className="work-stage">
      <div className="work-head container">
        <div>
          <Reveal as="p" className="eyebrow eyebrow-light">Featured work</Reveal>
          <SplitText as="h2" text="Work that is felt." accent={['felt']} className="display-l" />
        </div>
        <div className="work-head-side">
          <Reveal as="p">Film, photography, key art, identity and digital — a selection from the Haus.</Reveal>
          <Button to="/work" variant="outline-light">All work</Button>
        </div>
      </div>
      <div className="work-viewport" ref={viewport}>
        <ul className="work-track" ref={track}>
          {projects.map((p, i) => (
            <li key={p.slug} className="work-card">
              <Link to={`/work/${p.slug}`}>
                <div className="work-card-media">
                  <Img name={p.cover} sizes="(min-width: 1024px) 46vw, 82vw" />
                </div>
                <div className="work-card-meta">
                  <span className="work-card-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.category} · {p.discipline}</p>
                  </div>
                  <span className="work-card-go">
                    View project <ArrowIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li className="work-card work-card-end">
            <Link to="/work">
              <span className="display-m">See all work</span>
              <ArrowIcon />
            </Link>
          </li>
        </ul>
      </div>
      <div className="work-progress container" aria-hidden="true">
        <span />
      </div>
      </div>
    </section>
  );
}
