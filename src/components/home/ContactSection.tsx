import { SITE } from '../../data/site';
import { SocialIcons } from '../layout/SiteFooter';

export function ContactDetails() {
  return (
    <ul className="contact-details">
      <li>
        <span className="cd-label">Email</span>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </li>
      <li>
        <span className="cd-label">WhatsApp</span>
        <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">{SITE.whatsappDisplay}</a>
      </li>
      <li>
        <span className="cd-label">Website</span>
        <a href={SITE.url}>www.hekayahaus.com</a>
      </li>
      <li>
        <span className="cd-label">Studio</span>
        <span>{SITE.location}</span>
        <span className="cd-sub">Working across the UAE, India and beyond</span>
      </li>
      <li>
        <span className="cd-label">Follow</span>
        <SocialIcons />
      </li>
    </ul>
  );
}
