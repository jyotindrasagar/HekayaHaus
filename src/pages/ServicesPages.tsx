import { Link, Navigate, useLocation } from 'react-router-dom';
import { PILLARS, SERVICE_PAGES, pillarById, servicesForPillar, type Pillar } from '../data/services';
import { SITE } from '../data/site';
import { PROJECTS } from '../data/work';
import { Seo, faqSchema } from '../lib/seo';
import { PageHero } from '../components/layout/PageHero';
import { Img } from '../components/ui/Img';
import { Reveal, SplitText } from '../components/ui/Reveal';
import { ArrowIcon, Button } from '../components/ui/Buttons';
import { FAQ } from '../components/ui/FAQ';
import { FinalCTA } from '../components/home/Sections';

const serviceSchema = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: `${SITE.url}${path}`,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: ['United Arab Emirates', 'GCC', 'India'],
});

function PillarCard({ p }: { p: Pillar }) {
  return (
    <Reveal as="li" className="pillar-card">
      <Link to={p.route}>
        <div className="pillar-card-media">
          <Img name={p.image} sizes="(min-width: 1024px) 33vw, 100vw" />
        </div>
        <span className="pillar-n">{p.n}</span>
        <h2 className="display-m">{p.name}</h2>
        <p>{p.description}</p>
        <span className="text-link">
          <span>Explore</span>
          <ArrowIcon />
        </span>
      </Link>
    </Reveal>
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
        eyebrow="Creative Media & Marketing Haus"
        title={'Everything a brand needs.\nUnder one roof.'}
        accent={['Under', 'one', 'roof']}
        intro={
          <>
            <p>Explore our full range of creative media &amp; marketing services including video production, social media, CGI VFX, digital marketing, web development, AI solutions, events and more.</p>
            <p className="muted">Join us on a journey where ideas transform into identity, with a dash of creativity and a whole lot of fun.</p>
          </>
        }
        image="design-grid"
        crumbs={crumbs}
      >
        <Button to="/contact-us">Contact us</Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <ul className="pillar-cards">
            {PILLARS.map((p) => (
              <PillarCard key={p.id} p={p} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section services-index" aria-labelledby="idx-title">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Every service</Reveal>
            <SplitText as="h2" text="The complete index." accent={['index']} className="display-l" />
            <span id="idx-title" className="sr-only">Complete service index</span>
          </div>
          {PILLARS.map((p) => (
            <div className="svc-block" key={p.id}>
              <Reveal as="h3" className="svc-block-title">
                <span>{p.n}</span> <Link to={p.route}>{p.name}</Link>
              </Reveal>
              <div className="svc-groups">
                {p.groups.map((g) => (
                  <Reveal key={g.title} className="svc-group">
                    <h4>{g.link ? <Link to={g.link}>{g.title}</Link> : g.title}</h4>
                    <ul>
                      {g.services.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section dark detail-links" aria-labelledby="detail-title">
        <div className="container">
          <Reveal as="p" className="eyebrow eyebrow-light">Specialist services</Reveal>
          <h2 id="detail-title" className="display-m">Go deeper</h2>
          <ul className="detail-link-list">
            {SERVICE_PAGES.map((s) => (
              <Reveal as="li" key={s.slug}>
                <Link to={`/${s.slug}`}>
                  <span className="dl-name">{s.name}</span>
                  <span className="dl-tags">{s.ticker.slice(0, 4).join(' · ')}</span>
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
  const work = PROJECTS.filter((w) => w.services.some((s) => s.to === p.route || related.some((r) => `/${r.slug}` === s.to))).slice(0, 3);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'What we do', path: '/allserviceshekayahaus' },
    { name: p.name, path: p.route },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} jsonLd={serviceSchema(p.name, p.description, p.route)} />
      <PageHero
        eyebrow={`Pillar ${p.n}`}
        title={p.name}
        accent={p.name.split(' ').slice(-1)}
        intro={<p>{p.description}</p>}
        image={p.image}
        crumbs={crumbs}
      >
        <Button href={SITE.calendar} external>Book a discovery call</Button>
        <Button to="/work" variant="ghost">See the work</Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Services</Reveal>
            <SplitText as="h2" text={p.statement} className="display-l" />
          </div>
          <div className="svc-groups svc-groups-lg">
            {p.groups.map((g, i) => (
              <Reveal key={g.title} className="svc-group" delay={i * 60}>
                <span className="svc-group-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-s">{g.title}</h3>
                <ul>
                  {g.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {g.link && (
                  <Link className="text-link" to={g.link}>
                    <span>Learn more</span>
                    <ArrowIcon />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
                  <Link to={`/${s.slug}`}>
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

      {work.length > 0 && <RelatedWork slugs={work.map((w) => w.slug)} />}
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
          <Link to="/work" className="text-link"><span>All work</span><ArrowIcon /></Link>
        </div>
        <ul className="work-grid">
          {items.map((p) => (
            <Reveal as="li" key={p.slug} className="work-tile">
              <Link to={`/work/${p.slug}`}>
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
      <PageHero eyebrow={p.name} title={s.heroTitle} intro={<p>{s.intro}</p>} image={s.image} crumbs={crumbs} ticker={s.ticker}>
        <Button href={SITE.calendar} external>Book appointment</Button>
        <Button to="/contact-us" variant="ghost">Get a quote</Button>
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

      {work.length > 0 && <RelatedWork slugs={work.map((w) => w.slug)} />}

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
