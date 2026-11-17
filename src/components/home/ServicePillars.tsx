import { Link } from 'react-router-dom';
import { PILLARS } from '../../data/services';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { ArrowIcon, Button } from '../ui/Buttons';

export function ServicePillars() {
  return (
    <section className="pillars section" id="what-we-do" aria-labelledby="pillars-title">
      <div className="container">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">What we do</Reveal>
          <SplitText as="h2" text={'Three disciplines.\nOne Haus.'} accent={['One', 'Haus']} className="display-l" />
          <Reveal as="p" className="section-intro" delay={120}>
            Production, marketing and technology under one roof — so the story you tell on screen, in the feed and
            in the product is the same story.
          </Reveal>
        </div>

        <ol className="pillar-list">
          {PILLARS.map((p, i) => (
            <li key={p.id} className={`pillar ${i % 2 ? 'pillar-rev' : ''}`}>
              <Link to={p.route} className="pillar-media" aria-label={`Explore ${p.name}`} tabIndex={-1}>
                <Reveal variant="clip" className="pillar-img-main" parallax>
                  <Img name={p.image} sizes="(min-width: 1024px) 50vw, 100vw" />
                </Reveal>
                <Reveal variant="clip" className="pillar-img-sub" delay={180}>
                  <Img name={p.secondary} sizes="(min-width: 1024px) 18vw, 40vw" />
                </Reveal>
              </Link>
              <div className="pillar-copy">
                <Reveal as="span" className="pillar-n">{p.n}</Reveal>
                <Reveal as="h3" className="display-m">
                  <Link to={p.route}>{p.name}</Link>
                </Reveal>
                <Reveal as="p" className="pillar-statement" delay={60}>{p.statement}</Reveal>
                <Reveal as="p" className="pillar-desc" delay={100}>{p.description}</Reveal>
                <Reveal as="ul" className="chips" delay={140}>
                  {p.representative.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </Reveal>
                <Reveal delay={180}>
                  <Button to={p.route} variant="ghost">
                    Explore {p.short}
                  </Button>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
        <Reveal className="pillars-all">
          <Link to="/allserviceshekayahaus" className="text-link">
            <span>See every service</span>
            <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
