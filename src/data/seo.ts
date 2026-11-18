// Single source of truth for per-route <head> metadata. Used at runtime by <Seo/> and at build time by
// scripts/prerender.mjs (which writes route-specific index.html files and sitemap.xml).
import { SITE } from './site';
import { PILLARS, SERVICE_PAGES } from './services';
import { PROJECTS } from './work';
import { ARTICLES } from './journal';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  priority?: number;
  noindex?: boolean;
}

const img = (name: string) => `/media/img/${name}-1440.webp`;

export function allRoutes(): RouteMeta[] {
  return [
    {
      path: '/',
      title: 'HekayaHaus — Beyond Seen. Into Felt. | Fastest Growing Creative Media Marketing Haus, UAE',
      description:
        'HekayaHaus is a creative media, marketing and technology haus in Dubai. Marketing, Performance and Growth under one roof — trusted by 200+ brands across the UAE, India and beyond.',
      image: img('portrait-lightbulb-duo'),
      priority: 1,
    },
    {
      path: '/allserviceshekayahaus',
      title: 'What We Do — Marketing, Performance & Growth | HekayaHaus',
      description:
        'Everything your business needs to move forward, connected under one roof: Marketing, Performance and Growth — social, branding, PR, media production, performance marketing, web, CRM, AI and SEO.',
      image: img('design-grid'),
      priority: 0.9,
    },
    ...PILLARS.map((p) => ({ path: p.route, title: p.metaTitle, description: p.metaDescription, image: img(p.image), priority: 0.9 })),
    ...SERVICE_PAGES.map((s) => ({ path: `/${s.slug}`, title: s.metaTitle, description: s.metaDescription, image: img(s.image), priority: 0.8 })),
    {
      path: '/portfolio',
      title: 'Portfolio — The Work | HekayaHaus',
      description:
        'Ideas are easy to talk about. This is what happens when they become real — production, marketing, campaigns, branding and digital work by HekayaHaus.',
      image: img('auto-mercedes-dubai'),
      priority: 0.8,
    },
    ...PROJECTS.map((p) => ({
      path: `/portfolio/${p.slug}`,
      title: `${p.title} — ${p.discipline} | HekayaHaus`,
      description: p.summary,
      image: img(p.cover),
      priority: 0.7,
    })),
    {
      path: '/about',
      title: 'About HekayaHaus — A Little About Us | Dubai',
      description:
        'Hekaya means story. Haus means home. A creative media, marketing and technology haus in Dubai with 200+ client and brand collaborations.',
      image: img('film-set-clapper'),
      priority: 0.7,
    },
    {
      path: '/blogs',
      title: 'The HekayaHaus Journal — Insights',
      description: 'Ideas, perspectives and things worth knowing about creativity, marketing, business and technology from HekayaHaus.',
      image: img('design-grid'),
      priority: 0.6,
    },
    ...ARTICLES.map((a) => ({ path: `/blogs/${a.slug}`, title: `${a.title} | HekayaHaus Journal`, description: a.description, image: img(a.image), priority: 0.6 })),
    {
      path: '/contact-us',
      title: 'Contact HekayaHaus — Let’s Talk',
      description: 'Tell us what you’ve been trying to build. Email info@hekayahaus.com, WhatsApp +971 55 248 9492 or book a discovery call.',
      image: img('portrait-neon'),
      priority: 0.8,
    },
    {
      path: '/careers',
      title: 'Join the Haus — Careers & Talent | HekayaHaus',
      description: 'Careers, collaborations and opportunities at HekayaHaus across creative, marketing, performance and technology.',
      image: img('film-set-clapper'),
      priority: 0.6,
    },
    {
      path: '/university-partnerships',
      title: 'University & Placement Partnerships | HekayaHaus',
      description: 'Internships, placements, industry projects and mentorship partnerships with universities and colleges.',
      image: img('design-grid'),
      priority: 0.5,
    },
    {
      path: '/mentorship-collaborations',
      title: 'Mentorship & Collaborations — Beyond Business | HekayaHaus',
      description: 'Building businesses and encouraging the next generation: features, alumni recognition, mentorship and collaborations.',
      image: img('portrait-lightbulb'),
      priority: 0.5,
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
    telephone: SITE.whatsapp,
    sameAs: [SITE.socials.instagram, SITE.socials.linkedin, SITE.socials.youtube],
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
