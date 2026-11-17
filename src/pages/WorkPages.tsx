import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/work';
import { SITE } from '../data/site';
import { Seo } from '../lib/seo';
import { PageHero } from '../components/layout/PageHero';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/ui/Reveal';
import { ArrowIcon, Button } from '../components/ui/Buttons';
import { FinalCTA } from '../components/home/Sections';
import NotFoundPage from './NotFoundPage';

export function WorkIndexPage() {
  const cats = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="Selected work"
        title={'Work that is\nfelt, not just seen.'}
        accent={['felt']}
        intro={
          <p>
            A selection of films, photography, key art, identity and digital work from the Haus. The full video
            portfolio streams on our{' '}
            <a href={SITE.socials.youtubePlaylist} target="_blank" rel="noopener noreferrer">YouTube playlist</a>.
          </p>
        }
        crumbs={crumbs}
      />
      <section className="section work-index">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter work by category">
            {cats.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <ul className="work-masonry">
            {list.map((p, i) => (
              <Reveal as="li" key={p.slug} className={`wm-item wm-${i % 5}`} variant="clip">
                <Link to={`/work/${p.slug}`}>
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
    { name: 'Work', path: '/work' },
    { name: p.title, path: `/work/${p.slug}` },
  ];
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
              {p.body.map((para, i) => (
                <Reveal as="p" key={i} delay={i * 80}>{para}</Reveal>
              ))}
            </div>
          </div>
        </section>
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
          <Link to={`/work/${next.slug}`} className="container next-project-link">
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
            <h2 className="display-m">Have a story like this to tell?</h2>
            <Button href={SITE.calendar} external>Book a discovery call</Button>
          </div>
        </section>
      </article>
      <FinalCTA />
    </>
  );
}
