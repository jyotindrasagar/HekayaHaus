import { Link, useParams } from 'react-router-dom';
import { CLIENTS, FEATURES, SITE } from '../data/site';
import { ARTICLES, JOURNAL_CATEGORIES } from '../data/journal';
import { Seo } from '../lib/seo';
import { PageHero } from '../components/layout/PageHero';
import { Img } from '../components/ui/Img';
import { Reveal, SplitText } from '../components/ui/Reveal';
import { ArrowIcon, Button } from '../components/ui/Buttons';
import { FinalCTA, MetricsSection } from '../components/home/Sections';
import { ContactDetails } from '../components/home/ContactSection';
import { ContactForm } from '../components/home/ContactForm';
import NotFoundPage from './NotFoundPage';

const BELIEFS = [
  { t: 'People before platforms.', b: 'Behind every business is a person who has taken a risk, invested time and built something they believe in. We never lose sight of that.' },
  { t: 'Creativity needs direction.', b: 'Beautiful work has its place. But when creativity meets purpose, it becomes far more powerful.' },
  { t: 'Trust is built in the details.', b: 'Clear communication, realistic expectations, consistency and accountability aren’t extras. They’re the foundation of every good partnership.' },
  { t: 'Growth is never one-dimensional.', b: 'Marketing, production, technology and business operations should work together. We look beyond individual tasks to understand the bigger opportunity.' },
  { t: 'Never stop moving forward.', b: 'Markets change. People change. Technology changes. We stay curious, keep learning and keep finding better ways to do things.' },
];

/** Press / alumni / recognition list, shared by About and Mentorship. */
export function FeatureList({ dark }: { dark?: boolean }) {
  return (
    <ul className={`feature-list ${dark ? 'on-dark' : ''}`}>
      {FEATURES.map((f) => (
        <Reveal as="li" key={f.name}>
          {f.href ? (
            <a href={f.href} target="_blank" rel="noopener noreferrer" data-cursor="Read">
              <span className="fl-name">{f.name}</span>
              <span className="fl-detail">{f.detail}</span>
              <ArrowIcon dir="up-right" />
            </a>
          ) : (
            <div>
              <span className="fl-name">{f.name}</span>
              <span className="fl-detail">{f.detail}</span>
            </div>
          )}
        </Reveal>
      ))}
    </ul>
  );
}

export function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="A little about us"
        title={'We didn’t build HekayaHaus to make more noise.\nWe built it to make things matter.'}
        accent={['make', 'things', 'matter']}
        intro={
          <>
            <p>
              There are businesses with incredible ideas that never get the attention they deserve. Brands with real
              potential that struggle to find their voice. People with big ambitions who need the right people beside them.
            </p>
            <p className="muted">
              We saw an opportunity to bring creativity, strategy and technology together — not as separate services, but
              as a better way to help businesses move forward. That’s where HekayaHaus began.
            </p>
          </>
        }
        image="film-set-clapper"
        crumbs={crumbs}
      />

      <section className="section about-story">
        <div className="container about-story-grid">
          <div>
            <Reveal as="p" className="eyebrow">Our story</Reveal>
            <SplitText as="h2" text="Every business has a story. We believe it deserves to be told right." accent={['told', 'right']} className="display-l" />
          </div>
          <div className="about-story-copy">
            <Reveal className="about-meaning">
              <p><span>Hekaya</span> means story.</p>
              <p><span>Haus</span> means home.</p>
            </Reveal>
            <Reveal as="p" delay={60}>
              Together, they represent what we set out to create: a creative home for ideas, people and businesses ready to
              become something more.
            </Reveal>
            <Reveal as="p" delay={100}>
              What started with a passion for visual storytelling has grown into a creative media, marketing and technology
              company working with businesses and recognised brands across different markets. Over 200 client and brand
              collaborations later, our perspective remains the same.
            </Reveal>
            <Reveal as="p" delay={140}>
              Good work isn’t about making something look impressive for a moment. It’s about understanding what matters,
              creating with intention and delivering something that moves the business forward.
            </Reveal>
            <Reveal as="p" delay={180}>
              Today, HekayaHaus brings together creative minds, strategists, marketers, production specialists and
              technology talent under one roof. And we’re only getting started.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section dark about-philosophy">
        <div className="container">
          <Reveal as="p" className="eyebrow eyebrow-light">Our philosophy</Reveal>
          <SplitText as="h2" text="Beyond Seen. Into Felt." accent={['Into', 'Felt']} className="display-xl" />
          <div className="about-phil-cols">
            <Reveal as="p">Being visible is easy. Being remembered is different.</Reveal>
            <Reveal as="p" delay={60}>
              We believe the strongest brands don’t just occupy space in someone’s feed, on a screen or across a city. They
              create a feeling. They build trust. They give people a reason to return. That’s the standard we bring to our work.
            </Reveal>
            <Reveal as="p" delay={120}>
              We want the businesses we work with to be recognised for what they do, remembered for how they make people
              feel and chosen for the value they bring.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container principles-grid">
          <div className="principles-side">
            <Reveal as="p" className="eyebrow">What we believe</Reveal>
            <h2 className="display-l">Five beliefs we work by.</h2>
            <Reveal variant="clip" className="principles-quote" parallax>
              <Img name="portrait-lightbulb" sizes="(min-width: 1024px) 30vw, 90vw" />
            </Reveal>
          </div>
          <ol className="principles-list">
            {BELIEFS.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 60}>
                <span className="principle-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-s">{p.t}</h3>
                <p>{p.b}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-experience">
        <div className="container about-story-grid">
          <div>
            <Reveal as="p" className="eyebrow">Our experience</Reveal>
            <SplitText as="h2" text="We’ve worked across more than one kind of ambition." accent={['one', 'kind', 'of', 'ambition']} className="display-l" />
          </div>
          <div className="about-story-copy">
            <Reveal as="p">
              From international brand campaigns and large-scale sporting experiences to growing businesses building their
              identity, our experience spans different challenges and creative environments.
            </Reveal>
            <Reveal as="p" delay={60}>
              Our work and collaborations have included names such as Red Bull, Nike, Lamborghini, EA Sports and Porsche,
              alongside businesses and brands across the UAE and beyond.
            </Reveal>
            <Reveal as="p" delay={120}>
              We bring those experiences into every new brief — with the understanding that every client deserves attention,
              regardless of the size of their project.
            </Reveal>
            <ul className="about-logos" aria-label={CLIENTS.map((c) => c.name).join(', ')}>
              {CLIENTS.map((c) => (
                <li key={c.name}>
                  <img src={c.logo} alt="" width={c.w} height={c.h} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MetricsSection />

      <section className="section beyond-business" aria-labelledby="bb-title">
        <div className="container about-story-grid">
          <div>
            <Reveal as="p" className="eyebrow">Beyond business</Reveal>
            <SplitText as="h2" text="Building businesses. Encouraging the next generation." accent={['next', 'generation']} className="display-l" />
            <span id="bb-title" className="sr-only">Featured alumni and entrepreneurship</span>
          </div>
          <div className="about-story-copy">
            <Reveal as="p">
              Our relationship with creativity and entrepreneurship goes beyond the work we deliver for clients. We believe
              knowledge becomes more valuable when it’s shared, and experience becomes more meaningful when it helps someone
              else take their first step.
            </Reveal>
            <FeatureList />
            <Reveal className="bb-cta">
              <Button to="/mentorship-collaborations" variant="ghost">Mentorship & collaborations</Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section dark about-close">
        <div className="container about-close-inner">
          <SplitText as="h2" text="There’s a place for your next big idea here." accent={['next', 'big', 'idea']} className="display-l" />
          <Reveal as="p">
            Whether you’re building something new, repositioning an established business or looking for a team to take your
            next project further, we’d like to hear your story.
          </Reveal>
          <Reveal>
            <Button to="/contact-us" variant="light">Meet HekayaHaus</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function InsightsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blogs' },
  ];
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const rest = ARTICLES.filter((a) => a !== featured);
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="The HekayaHaus Journal"
        title={'Better thinking makes better business.'}
        accent={['better', 'business']}
        intro={
          <>
            <p>
              Ideas, perspectives and things worth knowing. The way people discover brands is changing. The way businesses
              grow is changing. And the way we create, communicate and connect needs to evolve with it.
            </p>
            <p className="muted">
              Here, we explore the ideas, strategies, shifts and lessons shaping the worlds of creativity, marketing, business
              and technology. No recycled advice. Just perspectives worth your time.
            </p>
          </>
        }
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container">
          <ul className="journal-cats" aria-label="Categories">
            {JOURNAL_CATEGORIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <Reveal className="journal-featured" variant="fade">
            <Link to={`/blogs/${featured.slug}`} data-cursor="Read" className="tilt">
              <div className="jf-media">
                <Img name={featured.image} sizes="(min-width: 1024px) 55vw, 100vw" />
              </div>
              <div className="jf-copy">
                <p className="eyebrow">Editor’s pick · {featured.category}</p>
                <h2 className="display-m">{featured.title}</h2>
                <p>{featured.description}</p>
                <span className="text-link"><span>Read the article</span><ArrowIcon /></span>
              </div>
            </Link>
          </Reveal>
          {rest.length > 0 && (
            <ul className="work-grid journal-grid">
              {rest.map((a) => (
                <Reveal as="li" key={a.slug} className="work-tile">
                  <Link to={`/blogs/${a.slug}`}>
                    <div className="work-tile-media"><Img name={a.image} sizes="33vw" /></div>
                    <h3>{a.title}</h3>
                    <p>{a.category} · {a.readTime}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
          <Reveal className="journal-follow">
            <p>Follow the work as it happens:</p>
            <Button href={SITE.socials.instagram} external variant="ghost">Instagram</Button>
            <Button href={SITE.socials.linkedin} external variant="ghost">LinkedIn</Button>
            <Button href={SITE.socials.youtube} external variant="ghost">YouTube</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return <NotFoundPage />;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blogs' },
    { name: a.title, path: `/blogs/${a.slug}` },
  ];
  const date = new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <>
      <Seo
        type="article"
        breadcrumbs={crumbs}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.description,
          datePublished: a.date,
          image: `${SITE.url}/media/img/${a.image}-1440.webp`,
          author: { '@type': 'Organization', name: SITE.name },
          publisher: { '@id': `${SITE.url}/#organization` },
          mainEntityOfPage: `${SITE.url}/blogs/${a.slug}`,
        }}
      />
      <article className="article">
        <PageHero eyebrow={`${a.category} · ${date} · ${a.readTime}`} title={a.title} intro={<p>{a.description}</p>} crumbs={crumbs} />
        <div className="container article-body">
          {a.body.map((para, i) =>
            para.startsWith('## ') ? (
              <h2 key={i} className="display-s">{para.slice(3)}</h2>
            ) : (
              <p key={i}>{para}</p>
            ),
          )}
        </div>
        <section className="section article-cta dark">
          <div className="container about-close-inner">
            <h2 className="display-l">Have a challenge worth discussing?</h2>
            <p>Let’s turn a good question into a better direction.</p>
            <Button to="/contact-us" variant="light">Talk to our team</Button>
          </div>
        </section>
      </article>
    </>
  );
}

export function ContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact-us' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <section className="contact contact-page section" aria-labelledby="contact-h1">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><span aria-current="page">Contact</span></li>
            </ol>
          </nav>
        </div>
        <div className="container contact-grid">
          <div className="contact-side">
            <p className="eyebrow hero-in">Let’s talk</p>
            <SplitText as="h1" text={'Tell us what you’ve been trying to build.'} accent={['trying', 'to', 'build']} className="display-xl" immediate />
            <span id="contact-h1" className="sr-only">Contact HekayaHaus</span>
            <div className="contact-lead hero-in" style={{ '--d': '400ms' } as React.CSSProperties}>
              <p>Maybe you’ve got a business that’s ready for its next chapter.</p>
              <p>Maybe you’ve invested in marketing before and haven’t seen the results you expected.</p>
              <p>
                Maybe there’s an idea you’ve been sitting on, a brand that needs a new direction or a problem you haven’t
                found the right people to solve.
              </p>
              <p>
                Whatever brings you here, we’d like to understand it. No assumptions. No ready-made packages pushed your way.
                Just a conversation about where you are, where you want to go and what it might take to get there.
              </p>
            </div>
          </div>
          <div className="contact-card hero-in" style={{ '--d': '300ms' } as React.CSSProperties}>
            <h2 className="contact-card-title">Let’s start with your story.</h2>
            <p className="contact-card-intro">A little about you helps us make the first conversation more meaningful.</p>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="section direct-contact" aria-labelledby="direct-title">
        <div className="container direct-grid">
          <div>
            <Reveal as="p" className="eyebrow">Prefer a direct conversation?</Reveal>
            <h2 id="direct-title" className="display-l">Sometimes a quick conversation is the best place to start.</h2>
          </div>
          <div>
            <ContactDetails />
            <div className="direct-actions">
              <Button href={SITE.whatsappUrl} external>Connect on WhatsApp</Button>
              <Button href={SITE.calendar} external variant="ghost">Book a discovery call</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-close dark">
        <div className="container">
          <SplitText as="p" text="You bring the ambition. Let’s work on what comes next." accent={['what', 'comes', 'next']} className="display-l" />
        </div>
      </section>
    </>
  );
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const path = isPrivacy ? '/privacy-policy' : '/terms';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero eyebrow="Legal" title={title} crumbs={crumbs} intro={<p>{SITE.legalName} · {SITE.location}</p>} />
      <section className="section">
        <div className="container legal">
          {isPrivacy ? (
            <>
              <h2>Information we collect</h2>
              <p>When you submit an enquiry or a job application we receive the details you provide: for example your name, email address, phone number, the service you are interested in and your message, and — for applications — your CV, portfolio and the information on the form. If you book a call, the booking is handled by Google Calendar under Google’s own terms.</p>
              <h2>How we use it</h2>
              <p>We use these details only to respond to your enquiry, to discuss a potential project or to assess your application. Your information stays with our team; we do not sell it.</p>
              <h2>Analytics</h2>
              <p>This website uses privacy-friendly, cookieless Vercel Web Analytics and Speed Insights to understand aggregate traffic and site performance. Embedded videos are served from external players (such as YouTube’s privacy-enhanced mode) only after you press play.</p>
              <h2>Your choices</h2>
              <p>To access, correct or delete the information you have sent us, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> (or <a href={`mailto:${SITE.hrEmail}`}>{SITE.hrEmail}</a> for applications).</p>
            </>
          ) : (
            <>
              <h2>Use of this website</h2>
              <p>This website is operated by {SITE.legalName}. By using it you agree to use it lawfully and not to interfere with its operation.</p>
              <h2>Intellectual property</h2>
              <p>All work, imagery, video, text and branding shown on this website belong to HekayaHaus or to the respective clients and rights holders, and are shown for portfolio purposes. Client names and logos are trademarks of their owners. Nothing may be reproduced without written permission.</p>
              <h2>No offer</h2>
              <p>Information on this site is provided for general purposes. Projects, pricing, timelines and media placements are confirmed only in a written proposal and remain subject to availability.</p>
              <h2>Contact</h2>
              <p>Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
