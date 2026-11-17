import { SITE } from '../../data/site';
import { Reveal, SplitText } from '../ui/Reveal';
import { SocialIcons } from '../layout/SiteFooter';
import { ContactForm } from './ContactForm';

export function ContactDetails() {
  return (
    <ul className="contact-details">
      <li>
        <span className="cd-label">Studio</span>
        <span>{SITE.location}</span>
        <span className="cd-sub">Serving the UAE, GCC &amp; India — on-location production</span>
      </li>
      <li>
        <span className="cd-label">Email</span>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </li>
      <li>
        <span className="cd-label">Discovery call</span>
        <a href={SITE.calendar} target="_blank" rel="noopener noreferrer">Book a time on our calendar</a>
      </li>
      <li>
        <span className="cd-label">Follow</span>
        <SocialIcons />
      </li>
    </ul>
  );
}

export function ContactSection({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-side">
          <Reveal as="p" className="eyebrow">Let’s talk</Reveal>
          <SplitText as={headingLevel} text={'Let’s create something\niconic together.'} accent={['iconic', 'together']} className="display-l" />
          <span id="contact-title" className="sr-only">Contact HekayaHaus</span>
          <Reveal as="p" className="contact-lead" delay={100}>
            Ready to take the next step? Tell us about your project and let’s schedule a call to discuss how we can
            help your business grow and succeed.
          </Reveal>
          <Reveal delay={160}>
            <ContactDetails />
          </Reveal>
        </div>
        <Reveal className="contact-card" variant="fade" delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
