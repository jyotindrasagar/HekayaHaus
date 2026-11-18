import { Link, Navigate, useLocation } from 'react-router-dom';
import { PILLARS, SERVICE_PAGES, pillarById, servicesForPillar, type Pillar } from '../data/services';
import { SITE } from '../data/site';
import { PROJECTS } from '../data/work';
import { VIDEOS } from '../data/videos';
import { Seo, faqSchema } from '../lib/seo';
import { PageHero } from '../components/layout/PageHero';
import { Img } from '../components/ui/Img';
import { Reveal, SplitText } from '../components/ui/Reveal';
import { ArrowIcon, Button } from '../components/ui/Buttons';
import { FAQ } from '../components/ui/FAQ';
import { VideoPlayer } from '../components/ui/VideoPlayer';
import { FinalCTA } from '../components/home/Sections';

const serviceSchema = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: `${SITE.url}${path}`,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: ['United Arab Emirates', 'India', 'United States', 'GCC'],
});

/** One pillar's full capability list (used on the hub and on each pillar page). */
function PillarServices({ p, headingLevel = 'h3' }: { p: Pillar; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <ol className="cap-list">
      {p.services.map((s, i) => (
        <Reveal as="li" key={s.name} delay={(i % 3) * 60} className="cap-item">
          <span className="cap-n">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <H className="display-s">{s.name}</H>
            {s.body.map((b) => (
              <p key={b.slice(0, 24)}>{b}</p>
            ))}
            {s.link && (
              <Link className="text-link" to={s.link}>
                <span>Learn more</span>
                <ArrowIcon />
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function ServicesHubPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'What we do', path: '/allserviceshekayahaus' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="Our capabilities"
        title={'Everything your business needs to move forward.\nConnected under one roof.'}
        accent={['Connected', 'under', 'one', 'roof']}
        intro={
          <>
            <p>
              You shouldn’t have to explain your business to five different companies, manage five different teams and
              hope everything comes together. Your brand, your marketing, your content and your technology should work
              towards the same goal.
            </p>
            <p className="muted">
              That’s why HekayaHaus brings them together. Three core pillars. A connected team. The ability to see the
              bigger picture and take care of the details.
            </p>
          </>
        }
        image="design-grid"
        crumbs={crumbs}
      >
        <Button to="/contact-us">Tell us what your business needs</Button>
      </PageHero>

      <nav className="pillar-jump container" aria-label="Pillars">
        {PILLARS.map((p) => (
          <a key={p.id} href={`#pillar-${p.id}`}>
            <span>{p.n}</span> {p.name}
          </a>
        ))}
      </nav>

      {PILLARS.map((p, idx) => (
        <section key={p.id} id={`pillar-${p.id}`} className={`section hub-pillar ${idx % 2 ? 'alt' : ''}`} aria-labelledby={`hp-${p.id}`}>
          <div className="container hub-pillar-grid">
            <div className="hub-pillar-side">
              <Reveal as="p" className="eyebrow">Pillar {p.n} — {p.name}</Reveal>
              <h2 id={`hp-${p.id}`} className="display-l">{p.headline}</h2>
              {p.pageIntro.map((t) => (
                <Reveal as="p" key={t.slice(0, 20)} className="hub-pillar-intro">{t}</Reveal>
              ))}
              <Reveal variant="clip" className="hub-pillar-media" parallax>
                <Img name={p.image} sizes="(min-width: 1024px) 35vw, 100vw" />
              </Reveal>
              <Button to={p.route} variant="ghost">{p.cta}</Button>
            </div>
            <PillarServices p={p} />
          </div>
        </section>
      ))}

      <section className="section dark cross-pillar" aria-labelledby="cross-title">
        <div className="container cross-grid">
          <div>
            <Reveal as="p" className="eyebrow eyebrow-light">Together</Reveal>
            <SplitText as="h2" text="The real advantage is how it all comes together." accent={['all', 'comes', 'together']} className="display-l" />
            <span id="cross-title" className="sr-only">The real advantage is how it all comes together.</span>
          </div>
          <div className="cross-copy">
            <Reveal as="p">
              A great campaign can bring attention. A strong brand can build trust. A well-designed website can convert
              interest. And the right automation can make growth easier to manage.
            </Reveal>
            <Reveal as="p" delay={80}>When these pieces work together, they become more powerful. That’s the HekayaHaus approach.</Reveal>
            <Reveal delay={140}>
              <Button to="/contact-us" variant="light">Tell us what your business needs</Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section detail-links-section" aria-labelledby="detail-title">
        <div className="container">
          <Reveal as="p" className="eyebrow">Specialist services</Reveal>
          <h2 id="detail-title" className="display-m">Go deeper</h2>
          <ul className="detail-link-list light">
            {SERVICE_PAGES.map((s) => (
              <Reveal as="li" key={s.slug}>
                <Link to={`/${s.slug}`} data-cursor="Open">
                  <span className="dl-name">{s.name}</span>
                  <span className="dl-tags">{pillarById(s.pillar).name} · {s.ticker.slice(0, 3).join(' · ')}</span>
                  <ArrowIcon />
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

export function PillarPage({ id }: { id: Pillar['id'] }) {
  const p = pillarById(id);
  const related = servicesForPillar(id);
  const work = PROJECTS.filter((w) => w.pillar === id).slice(0, 3);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'What we do', path: '/allserviceshekayahaus' },
    { name: p.name, path: p.route },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} jsonLd={serviceSchema(p.name, p.pageIntro.join(' '), p.route)} />
      <PageHero
        eyebrow={`Pillar ${p.n} — ${p.name}`}
        title={p.headline}
        intro={
          <>
            {p.pageIntro.map((t) => (
              <p key={t.slice(0, 20)}>{t}</p>
            ))}
            <p className="muted">{p.line}</p>
          </>
        }
        image={p.image}
        crumbs={crumbs}
      >
        <Button href={SITE.calendar} external>Book a discovery call</Button>
        <Button to="/portfolio" variant="ghost">See the portfolio</Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">What’s included</Reveal>
            <SplitText as="h2" text={p.line} className="display-l" />
          </div>
          <PillarServices p={p} headingLevel="h2" />
        </div>
      </section>

      {id === 'performance' && (
        <section className="section dark" aria-label="Media & production reel">
          <div className="container">
            <Reveal as="p" className="eyebrow eyebrow-light">Reel</Reveal>
            <VideoPlayer video={VIDEOS.productionReel} label="Play reel" />
          </div>
        </section>
      )}

      <section className="section split-feature">
        <div className="container split-feature-grid">
          <Reveal variant="clip" className="split-feature-media" parallax>
            <Img name={p.secondary} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <div>
            <Reveal as="p" className="eyebrow">Specialist pages</Reveal>
            <ul className="detail-link-list light">
              {related.map((s) => (
                <Reveal as="li" key={s.slug}>
                  <Link to={`/${s.slug}`} data-cursor="Open">
                    <span className="dl-name">{s.name}</span>
                    <span className="dl-tags">{s.ticker.slice(0, 3).join(' · ')}</span>
                    <ArrowIcon />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {work.length > 0 && <RelatedWork slugs={work.map((w) => w.slug)} title="Case studies" />}
      <FinalCTA />
    </>
  );
}

export function RelatedWork({ slugs, title = 'Related work' }: { slugs: string[]; title?: string }) {
  const items = slugs.map((s) => PROJECTS.find((p) => p.slug === s)!).filter(Boolean);
  return (
    <section className="section related-work" aria-labelledby="rw-title">
      <div className="container">
        <div className="section-head section-head-row">
          <h2 id="rw-title" className="display-m">{title}</h2>
          <Link to="/portfolio" className="text-link"><span>Explore our portfolio</span><ArrowIcon /></Link>
        </div>
        <ul className="work-grid">
          {items.map((p) => (
            <Reveal as="li" key={p.slug} className="work-tile">
              <Link to={`/portfolio/${p.slug}`} data-cursor="View" className="tilt">
                <div className="work-tile-media"><Img name={p.cover} sizes="(min-width: 1024px) 33vw, 100vw" /></div>
                <h3>{p.title}</h3>
                <p>{p.category} · {p.discipline}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceDetailPage() {
  const { pathname } = useLocation();
  const s = SERVICE_PAGES.find((x) => `/${x.slug}` === pathname.replace(/\/+$/, ''));
  if (!s) return <Navigate to="/allserviceshekayahaus" replace />;
  const p = pillarById(s.pillar);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: p.name, path: p.route },
    { name: s.name, path: `/${s.slug}` },
  ];
  const work = PROJECTS.filter((w) => w.services.some((x) => x.to === `/${s.slug}`)).slice(0, 3);
  return (
    <>
      <Seo breadcrumbs={crumbs} jsonLd={[serviceSchema(s.name, s.intro, `/${s.slug}`), faqSchema(s.faqs)]} />
      <PageHero eyebrow={`Pillar ${p.n} — ${p.name}`} title={s.heroTitle} intro={<p>{s.intro}</p>} image={s.image} crumbs={crumbs} ticker={s.ticker}>
        <Button href={SITE.calendar} external>Book a discovery call</Button>
        <Button to="/contact-us" variant="ghost">Start your project</Button>
      </PageHero>

      <section className="section">
        <div className="container caps-grid">
          <div className="caps-side">
            <Reveal as="p" className="eyebrow">Capabilities</Reveal>
            <SplitText as="h2" text={s.heading} className="display-l" />
          </div>
          <ol className="caps-list">
            {s.capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 50}>
                <span className="caps-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {s.slug === 'media-production-dubai' && (
        <section className="section dark" aria-label="Media & production reel">
          <div className="container">
            <VideoPlayer video={VIDEOS.productionReel} label="Play reel" />
          </div>
        </section>
      )}

      <section className="section gallery-section" aria-label={`${s.name} imagery`}>
        <div className="container">
          <ul className="mosaic">
            {s.gallery.map((g, i) => (
              <Reveal as="li" key={g} variant="clip" delay={i * 80} className={`mosaic-${i}`} parallax>
                <Img name={g} sizes="(min-width: 1024px) 40vw, 100vw" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {work.length > 0 && <RelatedWork slugs={work.map((w) => w.slug)} title="Case studies" />}

      <section className="section faq-section" aria-labelledby="sfaq-title">
        <div className="container faq-grid">
          <div>
            <Reveal as="p" className="eyebrow">FAQ</Reveal>
            <h2 id="sfaq-title" className="display-l">{s.name} questions</h2>
          </div>
          <FAQ items={s.faqs} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
