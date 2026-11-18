import { SITE } from '../data/site';
import { Seo } from '../lib/seo';
import { PageHero } from '../components/layout/PageHero';
import { Img } from '../components/ui/Img';
import { Reveal, SplitText } from '../components/ui/Reveal';
import { Button } from '../components/ui/Buttons';
import { ApplicationForm, DEPARTMENTS } from '../components/join/ApplicationForm';
import { FeatureList } from './OtherPages';

const PERKS = [
  { t: 'Real Work', b: 'Get involved in projects for businesses and recognised brands.' },
  { t: 'Room to Grow', b: 'Learn through execution, collaboration and responsibility.' },
  { t: 'Different Perspectives', b: 'Work alongside people from creative, commercial and technical backgrounds.' },
  { t: 'Build Something', b: 'Be part of a growing company where your contribution can make a difference.' },
];

export function CareersPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Join the Haus', path: '/careers' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="Careers · Collaborations · Opportunities"
        title={'Don’t just look for a place to work.\nFind a place to build.'}
        accent={['place', 'to', 'build']}
        intro={
          <>
            <p>
              We’re building something that doesn’t stand still. And we’re always interested in meeting people who don’t
              either. The curious ones. The ones who take initiative, challenge ideas, learn fast and care about the work
              they put their name on.
            </p>
            <p className="muted">
              Whether you’re an experienced professional, a fresh graduate or someone with a talent that deserves a bigger
              platform, there could be a place for you at HekayaHaus.
            </p>
          </>
        }
        image="film-set-clapper"
        crumbs={crumbs}
      >
        <Button href="#apply">Apply to join us</Button>
      </PageHero>

      <section className="section">
        <div className="container about-story-grid">
          <div>
            <Reveal as="p" className="eyebrow">Life at the Haus</Reveal>
            <SplitText
              as="h2"
              text="Experience different industries. Turn ideas into things people actually experience."
              accent={['actually', 'experience']}
              className="display-l"
            />
            <Reveal as="p" className="muted perks-intro">
              At HekayaHaus, you’ll get the opportunity to be part of projects across media, marketing, performance and
              technology — and to understand how businesses actually operate.
            </Reveal>
          </div>
          <ol className="perks">
            {PERKS.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 70} className="tilt">
                <span className="principle-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-s">{p.t}</h3>
                <p>{p.b}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dark" aria-labelledby="opp-title">
        <div className="container">
          <Reveal as="p" className="eyebrow eyebrow-light">Opportunities</Reveal>
          <SplitText as="h2" text="Different talents. One Haus." accent={['One', 'Haus']} className="display-l" />
          <span id="opp-title" className="sr-only">Opportunities</span>
          <p className="opp-intro">We welcome applications across:</p>
          <ul className="opp-list">
            {DEPARTMENTS.map((d, i) => (
              <Reveal as="li" key={d} delay={(i % 4) * 50}>
                <a href="#apply">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {d}
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="apply" aria-labelledby="apply-title">
        <div className="container apply-grid">
          <div className="apply-side">
            <Reveal as="p" className="eyebrow">Join the Haus — application form</Reveal>
            <h2 id="apply-title" className="display-l">Let’s get to know you.</h2>
            <p className="muted">Tell us a little about yourself, what you do and what you’d like to bring to HekayaHaus.</p>
            <p className="muted">
              We appreciate the time you take to apply. Our team will review your application and contact you if there’s a
              suitable opportunity.
            </p>
            <p>
              Prefer email? Send your profile directly to <a className="inline-link" href={`mailto:${SITE.hrEmail}`}>{SITE.hrEmail}</a>.
            </p>
          </div>
          <div className="contact-card">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}

export function UniversityPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Join the Haus', path: '/careers' },
    { name: 'University Partnerships', path: '/university-partnerships' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="Building the next generation"
        title="Great talent deserves the right opportunity."
        accent={['right', 'opportunity']}
        intro={
          <>
            <p>
              We believe the next generation of creative thinkers, marketers, entrepreneurs and technologists shouldn’t have
              to wait until graduation to experience the real world.
            </p>
            <p className="muted">
              Through university connections, placement partnerships and industry engagement, we aim to create meaningful
              opportunities for students to learn, contribute and discover what they’re capable of.
            </p>
          </>
        }
        image="design-grid"
        crumbs={crumbs}
      >
        <Button href={`mailto:${SITE.hrEmail}?subject=${encodeURIComponent('University partnership enquiry')}`}>Explore university partnerships</Button>
      </PageHero>
      <section className="section">
        <div className="container about-story-grid">
          <div>
            <Reveal as="p" className="eyebrow">Ways to partner</Reveal>
            <h2 className="display-l">Let’s build opportunities together.</h2>
          </div>
          <div className="about-story-copy">
            <Reveal as="p">
              We welcome conversations with universities, colleges and educational institutions interested in internships,
              placements, industry projects, mentorship and collaborative initiatives.
            </Reveal>
            <ul className="partner-list">
              {['Internships', 'Placements', 'Industry projects', 'Mentorship', 'Collaborative initiatives'].map((t, i) => (
                <Reveal as="li" key={t} delay={i * 60}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </Reveal>
              ))}
            </ul>
            <Reveal className="partner-note">
              <p>
                Partnership enquiries: <a className="inline-link" href={`mailto:${SITE.hrEmail}`}>{SITE.hrEmail}</a>
              </p>
              <p className="muted small">Partner institutions will be shown here once a placement or partnership relationship has been formally established.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export function MentorshipPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Join the Haus', path: '/careers' },
    { name: 'Mentorship & Collaborations', path: '/mentorship-collaborations' },
  ];
  return (
    <>
      <Seo breadcrumbs={crumbs} />
      <PageHero
        eyebrow="Beyond business"
        title={'Building businesses.\nEncouraging the next generation.'}
        accent={['next', 'generation']}
        intro={
          <p>
            Our relationship with creativity and entrepreneurship goes beyond the work we deliver for clients. We believe
            knowledge becomes more valuable when it’s shared, and experience becomes more meaningful when it helps someone
            else take their first step.
          </p>
        }
        image="portrait-lightbulb"
        crumbs={crumbs}
      />
      <section className="section">
        <div className="container about-story-grid">
          <div>
            <Reveal as="p" className="eyebrow">Features & recognition</Reveal>
            <h2 className="display-l">Stories, features and alumni recognition.</h2>
          </div>
          <div className="about-story-copy">
            <FeatureList />
          </div>
        </div>
      </section>
      <section className="section alumni">
        <div className="container alumni-grid">
          <Reveal className="alumni-card tilt">
            <p className="eyebrow">Featured Alumni — AAFT</p>
            <h3 className="display-s">Recognising our journey and connection with the institution through its Featured Alumni initiative.</h3>
          </Reveal>
          <Reveal className="alumni-card tilt" delay={100}>
            <p className="eyebrow">AAFT</p>
            <h3 className="display-s">Entrepreneurship &amp; Mentorship.</h3>
          </Reveal>
        </div>
      </section>
      <section className="section dark about-close">
        <div className="container about-close-inner">
          <Reveal className="about-close-media" variant="clip">
            <Img name="event-neon-arcade" sizes="(min-width: 1024px) 30vw, 80vw" />
          </Reveal>
          <SplitText as="h2" text="Your next chapter could start here." accent={['start', 'here']} className="display-l" />
          <Reveal as="p">
            Whether you’re looking to join our team, build a university partnership or collaborate with us, we’d love to hear
            from you.
          </Reveal>
          <Reveal className="final-cta-actions">
            <Button to="/contact-us" variant="light">Connect with HekayaHaus</Button>
            <Button to="/careers" variant="outline-light">Join the Haus</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
