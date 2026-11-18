import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_SLUGS, PROJECTS } from '../../data/work';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { ArrowIcon, Button } from '../ui/Buttons';
import { getCapabilities } from '../../lib/quality';
import { getLenis } from '../layout/SmoothScroll';

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

  // Click-and-drag anywhere on the gallery (mouse/pen). Touch keeps native swiping.
  // Horizontal (sticky) mode: dragging moves the page scroll, which drives the reel, so drag and
  // wheel always agree. Rail mode: dragging moves the rail's own scrollLeft.
  useEffect(() => {
    const el = section.current;
    const vp = viewport.current;
    if (!el || !vp) return;
    const stage = el.querySelector<HTMLElement>('.work-stage') ?? el;
    let active = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;

    const scrollTop = () => window.scrollY;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      if ((e.target as HTMLElement).closest('.work-head a, .work-head button')) return;
      active = true;
      moved = false;
      startX = lastX = e.clientX;
      lastT = performance.now();
      velocity = 0;
      startScroll = horizontal ? scrollTop() : vp.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        stage.classList.add('is-dragging');
        stage.setPointerCapture?.(e.pointerId);
      }
      if (!moved) return;
      e.preventDefault();
      const now = performance.now();
      velocity = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
      if (horizontal) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(startScroll - dx, { immediate: true, force: true });
        else window.scrollTo(0, startScroll - dx);
      }
      else vp.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      if (!active) return;
      active = false;
      stage.classList.remove('is-dragging');
      const lenis = getLenis();
      if (!moved) return;
      // Flick momentum.
      const fling = -velocity * 320;
      if (Math.abs(fling) > 20) {
        if (horizontal) {
          if (lenis) lenis.scrollTo(scrollTop() + fling, { duration: 0.9, force: true });
          else window.scrollTo({ top: scrollTop() + fling, behavior: 'smooth' });
        } else vp.scrollBy({ left: fling, behavior: 'smooth' });
      }
    };
    // A drag must not also count as a click on a project.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const noNativeDrag = (e: DragEvent) => e.preventDefault();

    stage.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    stage.addEventListener('click', onClick, true);
    stage.addEventListener('dragstart', noNativeDrag);
    return () => {
      stage.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('click', onClick, true);
      stage.removeEventListener('dragstart', noNativeDrag);
    };
  }, [horizontal]);

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
    let hold = 0;
    const measureSize = () => {
      // Track starts after the viewport's left padding; travel until the last card clears the right gutter.
      const padL = parseFloat(getComputedStyle(vp).paddingLeft) || 0;
      const gutter = Math.max(24, padL * 0.5);
      distance = Math.max(0, padL + tr.scrollWidth - vp.clientWidth + gutter);
      // Extra scroll at the end so the final card rests in view before the section releases.
      hold = Math.round(window.innerHeight * 0.35);
      setHeight(distance + window.innerHeight + hold);
    };
    const measure = () => {
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight - hold;
      target = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
    };
    const tick = () => {
      raf = 0;
      current = current < 0 ? target : current + (target - current) * 0.18;
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
          <SplitText as="h2" text="Don’t take our word for it. Look closer." accent={['Look', 'closer']} className="display-l" />
        </div>
        <div className="work-head-side">
          <Reveal as="p">Different challenges. Different ambitions. Different industries. Every project begins with understanding what needs to change — and ends with something built to make a difference.</Reveal>
          <Button to="/portfolio" variant="outline-light">Explore our portfolio</Button>
        </div>
      </div>
      <div className="work-viewport" ref={viewport}>
        <ul className="work-track" ref={track}>
          {projects.map((p, i) => (
            <li key={p.slug} className="work-card" data-cursor="Drag">
              <Link to={`/portfolio/${p.slug}`}>
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
            <Link to="/portfolio">
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
