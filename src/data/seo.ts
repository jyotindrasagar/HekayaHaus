// Single source of truth for per-route <head> metadata. Used at runtime by <Seo/> and at build time by
// scripts/prerender.mjs (which writes route-specific index.html files and sitemap.xml).
import { SITE } from './site';
import { PILLARS, SERVICE_PAGES } from './services';
import { PROJECTS } from './work';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  priority?: number;
  noindex?: boolean;
}

const img = (name: string) => `/media/img/${name}-1440.webp`;

export const JOURNAL_THEMES = [
  'Cinematic Video Production Trends in Dubai & UAE',
  'AI in Modern Marketing & Automation',
  'Brand Storytelling vs Commodity Content',
  'Luxury Hospitality & Automotive Visual Campaigns',
  'CGI & Fake Out-Of-Home (FOOH) Viral Mechanics',
];

export function allRoutes(): RouteMeta[] {
  return [
    {
      path: '/',
      title: 'HekayaHaus — Beyond Seen. Into Felt. | Creative Media, Production & Marketing Haus, Dubai',
      description:
        'HekayaHaus is a creative media, production, marketing and technology haus in Dubai — cinematic films, CGI & VFX, branding, performance marketing, web and AI for brands across the UAE, GCC and India.',
      image: img('portrait-lightbulb-duo'),
      priority: 1,
    },
    {
      path: '/allserviceshekayahaus',
      title: 'HekayaHaus | Creative Media & Marketing Haus — All Services',
      description:
        'Born from creativity, built on culture. Hekaya Haus transforms ideas into identity that last beyond the screen offering content creation, digital marketing, media production, CGI/VFX, branding, PR, billboards placement, web / App, CRM & AI solutions.',
      image: img('design-grid'),
      priority: 0.9,
    },
    ...PILLARS.map((p) => ({ path: p.route, title: p.metaTitle, description: p.metaDescription, image: img(p.image), priority: 0.9 })),
    ...SERVICE_PAGES.map((s) => ({ path: `/${s.slug}`, title: s.metaTitle, description: s.metaDescription, image: img(s.image), priority: 0.8 })),
    {
      path: '/work',
      title: 'Work — Films, Photography, Key Art, Brands & Digital | HekayaHaus',
      description: 'Selected HekayaHaus work across automotive, motorsport, entertainment, fashion, events, hospitality and digital products.',
      image: img('auto-mercedes-dubai'),
      priority: 0.8,
    },
    ...PROJECTS.map((p) => ({
      path: `/work/${p.slug}`,
      title: `${p.title} — ${p.discipline} | HekayaHaus`,
      description: p.summary,
      image: img(p.cover),
      priority: 0.7,
    })),
    {
      path: '/about',
      title: 'About HekayaHaus — Not an Agency. A Haus. | Dubai',
      description: `${SITE.philosophy} A Haus where creativity, media and technology converge, based in Dubai and serving the UAE, GCC and India.`,
      image: img('film-set-clapper'),
      priority: 0.7,
    },
    {
      path: '/blogs',
      title: 'Insights — HekayaHaus Journal',
      description: 'Insights on social media, video production, branding, AI, and digital marketing from Dubai creative agency Hekaya Haus.',
      image: img('design-grid'),
      priority: 0.5,
    },
    {
      path: '/contact-us',
      title: 'Contact - HekayaHaus',
      description: 'Ready to take the next step? Let’s schedule a call to discuss how we can help your business grow and succeed online.',
      image: img('portrait-neon'),
      priority: 0.8,
    },
    { path: '/privacy-policy', title: 'Privacy Policy | HekayaHaus', description: 'How HekayaHaus FZC-LLC collects and uses information submitted through this website.', priority: 0.2 },
    { path: '/terms', title: 'Terms & Conditions | HekayaHaus', description: 'Terms governing use of the HekayaHaus website.', priority: 0.2 },
  ];
}

export function metaFor(path: string): RouteMeta | undefined {
  const clean = path.replace(/\/+$/, '') || '/';
  return allRoutes().find((r) => r.path === clean);
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/media/brand/hekayahaus-mark.png`,
    slogan: SITE.tagline,
    email: SITE.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    areaServed: ['United Arab Emirates', 'GCC', 'India'],
    sameAs: [SITE.socials.instagram, SITE.socials.linkedin, SITE.socials.youtubePlaylist],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}
