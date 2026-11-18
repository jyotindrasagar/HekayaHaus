import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { PILLARS, SERVICE_PAGES } from '../../data/services';
import { JOIN_LINKS, Wordmark } from './SiteHeader';

export function SocialIcons() {
  return (
    <ul className="socials">
      <li>
        <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="HekayaHaus on Instagram">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg>
        </a>
      </li>
      <li>
        <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="HekayaHaus on LinkedIn">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 9.5h3V19H5zM6.5 4.8a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM10.5 9.5h2.9v1.3c.4-.8 1.4-1.6 3-1.6 3 0 3.6 2 3.6 4.6V19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3.2z" fill="currentColor" /></svg>
        </a>
      </li>
      <li>
        <a href={SITE.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="HekayaHaus on YouTube">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3z" fill="currentColor" /></svg>
        </a>
      </li>
      <li>
        <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${SITE.whatsappDisplay}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.6 1.5c.1.2 0 .4-.1.6l-.4.5c-.1.1-.1.3 0 .5a6 6 0 002.6 2.4c.2.1.4.1.5 0l.5-.6c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.3.3.5 0 .9-.7 1.6-1.6 1.7-1 .1-2.4-.3-4-1.7-1.8-1.6-2.4-3.2-2.4-4 0-.4.1-.7.2-1z" fill="currentColor" /></svg>
        </a>
      </li>
      <li>
        <a href={`mailto:${SITE.email}`} aria-label={`Email ${SITE.email}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M3.5 6l8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
        </a>
      </li>
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" aria-label="HekayaHaus home">
              <Wordmark />
            </Link>
            <p>{SITE.description}</p>
            <SocialIcons />
          </div>
          <nav aria-label="Explore">
            <h2 className="footer-h">Explore</h2>
            <ul>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blogs">Insights</Link></li>
              <li><Link to="/contact-us">Contact</Link></li>
              {JOIN_LINKS.map((j) => (
                <li key={j.to}><Link to={j.to}>{j.short}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Capabilities">
            <h2 className="footer-h">Capabilities</h2>
            <ul>
              {PILLARS.map((p) => (
                <li key={p.id}><Link to={p.route}>{p.n} — {p.name}</Link></li>
              ))}
              <li><Link to="/allserviceshekayahaus">All capabilities</Link></li>
            </ul>
          </nav>
          <nav aria-label="Services">
            <h2 className="footer-h">Services</h2>
            <ul>
              {SERVICE_PAGES.map((s) => (
                <li key={s.slug}><Link to={`/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="footer-h">Get in touch</h2>
            <p className="footer-touch">Have a project, an ambition or a challenge worth discussing?</p>
            <address>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a>
              <br />
              {SITE.location}
            </address>
          </div>
        </div>
        <div className="footer-mega" aria-hidden="true">
          Beyond seen. <em>Into felt.</em>
        </div>
        <div className="footer-bottom">
          <p>{SITE.copyright}</p>
          <p className="footer-legal">
            <span>{SITE.legalName}</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
