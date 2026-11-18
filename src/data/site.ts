// Verified business information. Sources: CONTEXT.md, CONTACT_AND_SOCIALS.md, PAGES_AND_CONTENT.md and copy
// supplied directly by the owner (200+ brands, WhatsApp number, HR email, press features).
export const SITE = {
  name: 'HekayaHaus',
  legalName: 'HekayaHaus FZC-LLC',
  url: 'https://www.hekayahaus.com',
  tagline: 'Beyond Seen. Into Felt.',
  slogan: 'Where Stories Become Legacies',
  positioning: 'Fastest Growing Creative Media Marketing Haus',
  region: 'UAE',
  description:
    'A creative media, marketing and technology haus helping businesses build stronger brands, create meaningful experiences and move forward with purpose.',
  philosophy:
    'Born from creativity, built on culture. Hekaya Haus transforms ideas into identity that lasts beyond the screen.',
  email: 'info@hekayahaus.com',
  hrEmail: 'hr@hekayahaus.com',
  whatsapp: '+971552489492',
  whatsappDisplay: '+971 55 248 9492',
  whatsappUrl: 'https://wa.me/971552489492',
  calendar: 'https://calendar.app.google/49AJM36qdqkp8zaG6',
  location: 'Dubai, United Arab Emirates',
  locationShort: 'Dubai, UAE',
  copyright: `© ${new Date().getFullYear()} HekayaHaus. All rights reserved.`,
  socials: {
    instagram: 'https://www.instagram.com/hekayahaus/',
    linkedin: 'https://www.linkedin.com/company/hekayahaus-fzc-llc/',
    youtube: 'https://www.youtube.com/@HekayaHaus',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLk53-jXewhhfX-5Pxq_Ywe3ByEmBkgEgJ',
  },
} as const;

export const CLIENTS = [
  { name: 'Global Village', logo: '/media/logos/global-village.png', w: 170, h: 127 },
  { name: 'Porsche', logo: '/media/logos/porsche.png', w: 158, h: 200 },
  { name: 'Nike', logo: '/media/logos/nike.png', w: 360, h: 188 },
  { name: 'EA Sports', logo: '/media/logos/ea-sports.png', w: 200, h: 200 },
  { name: 'Hero', logo: '/media/logos/hero.png', w: 360, h: 117 },
  { name: 'Farak', logo: '/media/logos/farak.png', w: 200, h: 23 },
  { name: 'Red Bull', logo: '/media/logos/redbull.svg', w: 200, h: 200 },
  { name: 'Lamborghini', logo: '/media/logos/lamborghini.png', w: 174, h: 200 },
] as const;

/** Owner-confirmed / previously published figures only. */
export const METRICS = [
  { value: 200, suffix: '+', label: 'Brands & clients collaborated with' },
  { value: 280, suffix: '%', label: 'Increased average video engagement' },
  { value: 95, suffix: '%', label: 'Client satisfaction rate' },
  { value: 5, suffix: 'K+', label: 'Projects completed' },
] as const;

/**
 * Press & recognition. `href` is left undefined where no public link has been confirmed yet —
 * the item then renders without a link. Add the URL here when available.
 */
export const FEATURES: { name: string; detail: string; href?: string }[] = [
  { name: 'UAE Stories', detail: 'Nimit Thawrani: Fearless Founder of HekayaHaus', href: 'https://uaestories.com/nimit-thawrani-fearless/' },
  // TODO(owner): confirm the exact KT+150 article / listing URL for HekayaHaus.
  { name: 'Khaleej Times KT+150', detail: 'Recognising the UAE’s next generation of changemakers', href: 'https://www.khaleejtimes.com/uae/khaleej-times-kt150-list-uae-young-innovators' },
  // TODO(owner): add the AAFT Featured Alumni link when available.
  { name: 'AAFT', detail: 'Featured Alumni' },
];

export const PROCESS = [
  { n: '01', title: 'Understand', body: 'Before we suggest anything, we listen. Your business, your challenges, your audience, your goals. We need to understand where you are before deciding where to take you.', image: 'film-set-clapper' },
  { n: '02', title: 'Define', body: 'We find the real opportunity, build the strategy and establish what success should look like. No unnecessary complexity. No recommendations just to make a proposal look impressive.', image: 'design-grid' },
  { n: '03', title: 'Create', body: 'This is where ideas become real. Our creative, marketing and technology teams bring the plan to life with care, precision and attention to detail.', image: 'portrait-neon' },
  { n: '04', title: 'Activate', body: 'We launch, distribute, connect and put the work in front of the right people through the right channels.', image: 'events-decor' },
  { n: '05', title: 'Improve', body: 'We look beyond delivery. We study performance, identify opportunities and refine what comes next. Because the best work should give you somewhere to go next.', image: 'tech-isometric-1' },
] as const;

export const HOME_FAQS = [
  {
    q: 'What services does HekayaHaus offer as a creative media & marketing agency in Dubai?',
    a: 'HekayaHaus works across three pillars — Marketing (social media, branding, influencer marketing and PR), Performance (media production, campaigns, performance and digital marketing) and Growth (websites, CRM, custom software, AI agents and automation, and SEO, AEO & GEO) — under one roof.',
  },
  {
    q: 'Where is Hekaya Haus located and which areas do you serve?',
    a: 'We are based in Dubai, UAE and serve clients across the UAE, GCC, and India, on-location production.',
  },
  {
    q: 'How much do your marketing and production services cost in Dubai?',
    a: 'Pricing depends on the scope. We offer custom packages starting from consultation. Contact us for a free strategy session and transparent quote tailored to your goals.',
  },
  {
    q: 'Why should I choose Hekaya Haus over other agencies in Dubai?',
    a: 'We combine cinematic storytelling, advanced AI tools, in-house production, and full-stack development — delivering end-to-end solutions with measurable ROI.',
  },
  {
    q: 'Do you offer AI-powered solutions?',
    a: 'Yes — AI agents, AI chatbots, AI translation, AI marketing automation, and smart content generation.',
  },
] as const;
