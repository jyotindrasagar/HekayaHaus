import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/work';
import { PILLARS } from '../data/services';
import { SITE } from '../data/site';
import { Seo } from '../lib/seo';
import { PageHero } from '../components/layout/PageHero';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { ArrowIcon, Button } from '../components/ui/Buttons';
import { VideoPlayer } from '../components/ui/VideoPlayer';
import { FinalCTA } from '../components/home/Sections';
import NotFoundPage from './NotFoundPage';

export function WorkIndexPage() {
  const filters = ['All', ...PILLARS.map((p) => p.name)];
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => PILLARS.find((x) => x.id === p.pillar)?.name === filter);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="The work"
        title={'Ideas are easy to talk about.\nThis is what happens when they become real.'}
        accent={['become', 'real']}
        intro={
          <>
            <p>
              Every project has a story behind it. A challenge to solve, an ambition to pursue, a moment worth creating.
              Our portfolio brings together the work we’ve created with brands and businesses across production,
              marketing, campaigns, branding and digital experiences.
            </p>
            <p className="muted">Different briefs. Different worlds. One commitment to making the work count.</p>
          </>
        }
        crumbs={crumbs}
      >
        <Button to="/contact-us">Discuss a project</Button>
      </PageHero>
      <section className="section work-index">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter work by pillar">
            {filters.map((c) => (
              <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
          <ul className="work-masonry" key={filter}>
            {list.map((p, i) => (
              <Reveal as="li" key={p.slug} className={`wm-item wm-${i % 5}`} variant="clip">
                <Link to={`/portfolio/${p.slug}`} data-cursor="View" className="tilt">
                  <div className="wm-media">
                    <Img name={p.cover} sizes="(min-width: 1024px) 50vw, 100vw" />
                  </div>
                  <div className="wm-meta">
                    <h2>{p.title}</h2>
                    <p>{p.category} · {p.discipline}</p>
                    <ArrowIcon />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal className="work-index-more">
            <p>More of our film work streams on YouTube.</p>
            <Button href={SITE.socials.youtube} external variant="ghost">HekayaHaus on YouTube</Button>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx < 0) return <NotFoundPage />;
  const p = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: p.title, path: `/portfolio/${p.slug}` },
  ];
  // Case-study chapters render only when real, project-specific information has been provided.
  const chapters = [
    { k: 'The Brief', lead: 'Every meaningful project starts with a reason.', v: p.brief },
    { k: 'The Challenge', lead: 'What needed to change?', v: p.challenge },
    { k: 'The Thinking', lead: 'The strategy, creative direction and decisions behind the work.', v: p.thinking },
    { k: 'The Execution', lead: 'From concept to production and delivery.', v: p.execution },
    { k: 'The Outcome', lead: 'The impact of the project.', v: p.outcome },
  ].filter((c) => c.v);
  return (
    <>
      <Seo
        breadcrumbs={crumbs}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: p.title,
          genre: p.discipline,
          description: p.summary,
          creator: { '@id': `${SITE.url}/#organization` },
          image: `${SITE.url}/media/img/${p.cover}-1440.webp`,
        }}
      />
      <article className="project">
        <PageHero eyebrow={`${p.category} — ${p.discipline}`} title={p.title} intro={<p>{p.summary}</p>} crumbs={crumbs} />
        <Reveal className="project-cover container" variant="clip" parallax>
          <Img name={p.cover} sizes="(min-width: 1400px) 1400px, 100vw" priority />
        </Reveal>
        <section className="section">
          <div className="container project-body">
            <dl className="project-facts">
              {p.client && (
                <div><dt>Client</dt><dd>{p.client}</dd></div>
              )}
              <div><dt>Category</dt><dd>{p.category}</dd></div>
              <div><dt>Discipline</dt><dd>{p.discipline}</dd></div>
              <div>
                <dt>Services</dt>
                <dd>
                  {p.services.map((s) => (
                    <Link key={s.to} to={s.to}>{s.label}</Link>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="project-text">
              {chapters.length > 0
                ? chapters.map((c, i) => (
                    <Reveal key={c.k} className="project-chapter" delay={i * 60}>
                      <h2 className="eyebrow">{c.k}</h2>
                      <p className="project-chapter-lead">{c.lead}</p>
                      <p>{c.v}</p>
                    </Reveal>
                  ))
                : p.body.map((para, i) => (
                    <Reveal as="p" key={i} delay={i * 80}>{para}</Reveal>
                  ))}
            </div>
          </div>
        </section>
        {p.video && (
          <section className="section dark" aria-label={`${p.title} film`}>
            <div className="container">
              <VideoPlayer video={p.video} label="Play film" />
            </div>
          </section>
        )}
        {p.gallery.length > 0 && (
          <section className="section project-gallery" aria-label={`${p.title} gallery`}>
            <div className="container">
              <ul className={`mosaic mosaic-n${Math.min(p.gallery.length, 5)}`}>
                {p.gallery.map((g, i) => (
                  <Reveal as="li" key={g} variant="clip" delay={i * 70} className={`mosaic-${i}`} parallax>
                    <Img name={g} sizes="(min-width: 1024px) 50vw, 100vw" />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}
        <section className="next-project dark">
          <Link to={`/portfolio/${next.slug}`} className="container next-project-link" data-cursor="Next">
            <span className="eyebrow eyebrow-light">Next project</span>
            <span className="display-xl">{next.title}</span>
            <span className="next-project-media" aria-hidden="true">
              <Img name={next.cover} sizes="40vw" decorative />
            </span>
            <ArrowIcon />
          </Link>
        </section>
        <section className="section project-cta">
          <div className="container project-cta-inner">
            <div>
              <h2 className="display-m">Have something in mind?</h2>
              <p className="muted">Let’s create something worth remembering.</p>
            </div>
            <Button to="/contact-us">Start your project</Button>
          </div>
        </section>
      </article>
    </>
  );
}
