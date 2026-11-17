import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_SLUGS, PROJECTS } from '../../data/work';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { ArrowIcon, Button } from '../ui/Buttons';
import { getCapabilities } from '../../lib/quality';

/**
 * Featured work. Desktop: the section pins and the reel of projects travels horizontally with the scroll.
 * Touch / narrow / reduced motion: a native, swipeable scroll-snap rail.
 */
export function WorkGallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const projects = FEATURED_SLUGS.map((s) => PROJECTS.find((p) => p.slug === s)!);

  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;
    const caps = getCapabilities();
    if (caps.reducedMotion || caps.coarsePointer || window.innerWidth < 1024) return;
    let cleanup = () => {};
    import('../../lib/gsap').then(({ useGsap }) => {
      const { gsap, ScrollTrigger } = useGsap();
      el.classList.add('is-pinned');
      const distance = () => tr.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
          onUpdate: (st) => el.style.setProperty('--progress', st.progress.toFixed(3)),
        },
      });
      // parallax inside each card
      const imgs = gsap.utils.toArray<HTMLElement>('.work-card img', tr);
      const inner = imgs.map((img) =>
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }),
      );
      ScrollTrigger.refresh();
      cleanup = () => {
        inner.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
        tween.scrollTrigger?.kill();
        tween.kill();
        el.classList.remove('is-pinned');
        gsap.set(tr, { clearProps: 'transform' });
      };
    });
    return () => cleanup();
  }, []);

  return (
    <section className="work section dark" id="work" ref={section} aria-labelledby="work-title">
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
      <div className="work-viewport">
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
    </section>
  );
}
