import { Link } from 'react-router-dom';
import { CLIENTS, PRINCIPLES, PROCESS, SITE } from '../data/site';
import { PILLARS } from '../data/services';
import { JOURNAL_THEMES } from '../data/seo';
import { Seo } from '../lib/seo';
import { PageHero } from '../components/layout/PageHero';
import { Img } from '../components/ui/Img';
import { Reveal, SplitText } from '../components/ui/Reveal';
import { ArrowIcon, Button } from '../components/ui/Buttons';
import { FinalCTA, MetricsSection } from '../components/home/Sections';
import { ContactDetails } from '../components/home/ContactSection';
import { ContactForm } from '../components/home/ContactForm';
import { BrandMarquee } from '../components/home/BrandMarquee';

export function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="About HekayaHaus"
        title={'Not an agency.\nA Haus.'}
        accent={['A', 'Haus']}
        intro={<p>{SITE.manifesto}</p>}
        image="film-set-clapper"
        crumbs={crumbs}
      >
        <Button href={SITE.calendar} external>Book a discovery call</Button>
      </PageHero>

      <section className="section about-statement">
        <div className="container">
          <Reveal as="p" className="eyebrow">Philosophy</Reveal>
          <SplitText as="h2" text={SITE.philosophy} accent={['identity', 'lasts']} className="display-l about-quote" stagger={30} />
          <div className="about-cols">
            <Reveal as="p">
              <em>Hekaya</em> means story. HekayaHaus ({SITE.legalName}) is a creative media, marketing, production and
              technology Haus based in Dubai, working across the UAE, the GCC and India.
            </Reveal>
            <Reveal as="p" delay={100}>
              We are positioned not merely as a marketing agency, but as a multi-disciplinary Haus where cinematic
              storytelling, film production, CGI and VFX, software engineering and AI automation converge — so a brand’s
              story stays consistent from the first frame to the final click.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section dark about-pillars">
        <div className="container">
          <Reveal as="p" className="eyebrow eyebrow-light">End-to-end capability</Reveal>
          <ul className="about-pillar-list">
            {PILLARS.map((p) => (
              <Reveal as="li" key={p.id}>
                <Link to={p.route}>
                  <span className="pillar-n">{p.n}</span>
                  <span className="display-m">{p.name}</span>
                  <span className="about-pillar-desc">{p.representative.join(' · ')}</span>
                  <ArrowIcon />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container principles-grid">
          <div className="principles-side">
            <Reveal as="p" className="eyebrow">How we work</Reveal>
            <SplitText as="h2" text="Story first, always." accent={['always']} className="display-l" />
            <Reveal variant="clip" className="principles-quote">
              <Img name="portrait-lightbulb" sizes="(min-width: 1024px) 30vw, 90vw" />
            </Reveal>
          </div>
          <ol className="principles-list">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70}>
                <span className="principle-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-s">{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <MetricsSection />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">Process</Reveal>
            <h2 className="display-l">Five stages. One story.</h2>
          </div>
          <ol className="process-row">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 60}>
                <span className="process-n">{p.n}</span>
                <h3 className="display-s">{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-clients" aria-label="Clients">
        <BrandMarquee title={`Chosen by leaders — ${CLIENTS.length} of the brands we’ve worked with`} />
      </section>
      <FinalCTA />
    </>
  );
}

export function InsightsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blogs' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="Insights & resources"
        title={'The Haus\nJournal.'}
        accent={['Journal']}
        intro={
          <p>
            Explore our blog hub, where we serve up a delightful mix of insightful articles, tips, and fun reads,
            tailored to spark your curiosity and inspire your creativity.
          </p>
        }
        image="design-grid"
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container journal">
          <div className="journal-side">
            <Reveal as="p" className="eyebrow">Editorial themes</Reveal>
            <h2 className="display-m">What we write about</h2>
            <Reveal as="p" className="muted">
              New articles are being prepared. In the meantime, follow the work as it happens on Instagram, LinkedIn and
              YouTube.
            </Reveal>
            <div className="journal-links">
              <Button href={SITE.socials.instagram} external variant="ghost">Instagram</Button>
              <Button href={SITE.socials.linkedin} external variant="ghost">LinkedIn</Button>
              <Button href={SITE.socials.youtubePlaylist} external variant="ghost">YouTube</Button>
            </div>
          </div>
          <ol className="journal-themes">
            {JOURNAL_THEMES.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 60}>
                <span className="journal-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="journal-title">{t}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <FinalCTA />
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
            <p className="eyebrow hero-in">Contact us</p>
            <SplitText as="h1" text={'Let’s create something\niconic together.'} accent={['iconic', 'together']} className="display-xl" immediate />
            <span id="contact-h1" className="sr-only">Contact HekayaHaus</span>
            <p className="contact-lead hero-in" style={{ '--d': '400ms' } as React.CSSProperties}>
              Ready to take the next step? Let’s schedule a call to discuss how we can help your business grow and
              succeed.
            </p>
            <div className="hero-in" style={{ '--d': '500ms' } as React.CSSProperties}>
              <Button href={SITE.calendar} external>Book a discovery call</Button>
            </div>
            <div className="hero-in" style={{ '--d': '600ms' } as React.CSSProperties}>
              <ContactDetails />
            </div>
          </div>
          <div className="contact-card hero-in" style={{ '--d': '300ms' } as React.CSSProperties}>
            <h2 className="contact-card-title">Project inquiry</h2>
            <ContactForm />
          </div>
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
              <p>When you submit the inquiry form we receive the details you provide: your name, email address, phone number, the discipline you are interested in and your message. If you book a call, the booking is handled by Google Calendar under Google’s own terms.</p>
              <h2>How we use it</h2>
              <p>We use these details only to respond to your inquiry and to discuss a potential project with you. We do not sell your information.</p>
              <h2>Analytics</h2>
              <p>This website uses privacy-friendly, cookieless Vercel Web Analytics and Speed Insights to understand aggregate traffic and site performance. Embedded videos are served from external players (such as YouTube’s privacy-enhanced mode) only after you press play.</p>
              <h2>Your choices</h2>
              <p>To access, correct or delete the information you have sent us, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
            </>
          ) : (
            <>
              <h2>Use of this website</h2>
              <p>This website is operated by {SITE.legalName}. By using it you agree to use it lawfully and not to interfere with its operation.</p>
              <h2>Intellectual property</h2>
              <p>All work, imagery, video, text and branding shown on this website belong to HekayaHaus or to the respective clients and rights holders, and are shown for portfolio purposes. Client names and logos are trademarks of their owners. Nothing may be reproduced without written permission.</p>
              <h2>No offer</h2>
              <p>Information on this site is provided for general purposes. Projects, pricing and timelines are confirmed only in a written proposal.</p>
              <h2>Contact</h2>
              <p>Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
