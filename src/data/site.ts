// Verified business information. Sources: CONTEXT.md, CONTACT_AND_SOCIALS.md, PAGES_AND_CONTENT.md.
export const SITE = {
  name: 'HekayaHaus',
  legalName: 'HekayaHaus FZC-LLC',
  url: 'https://www.hekayahaus.com',
  tagline: 'Beyond Seen. Into Felt.',
  slogan: 'Where Stories Become Legacies',
  philosophy:
    'Born from creativity, built on culture. Hekaya Haus transforms ideas into identity that lasts beyond the screen.',
  positioning: 'Leading Creative Marketing Haus',
  manifestoTitle: 'Not an agency.',
  manifesto:
    'A Haus where creativity, media and technology converge. We craft cinematic narratives, world-class events and integrated, data-driven marketing.',
  callout: 'Your brand deserves campaigns that not just market but actually connect with people!',
  email: 'info@hekayahaus.com',
  calendar: 'https://calendar.app.google/49AJM36qdqkp8zaG6',
  location: 'Dubai, United Arab Emirates',
  locationShort: 'Dubai, UAE',
  regions: ['UAE', 'GCC', 'India'],
  copyright: `${new Date().getFullYear()} Copyright © HekayaHaus. All rights reserved.`,
  socials: {
    instagram: 'https://www.instagram.com/hekayahaus/',
    linkedin: 'https://www.linkedin.com/company/hekayahaus-fzc-llc/',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLk53-jXewhhfX-5Pxq_Ywe3ByEmBkgEgJ',
    youtubeShowreel: 'https://youtu.be/2_CSwS6nG6o',
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

// Published on the original site's "Performance You Can Measure" block.
export const METRICS = [
  { value: 280, suffix: '%', label: 'Increased average video engagement' },
  { value: 95, suffix: '%', label: 'Client satisfaction rate' },
  { value: 5, suffix: 'K+', label: 'Projects completed' },
] as const;

export const TRUSTED_BY = '5.3k+';

// "Why Choose Us" pillars, verbatim from the original homepage.
export const PRINCIPLES = [
  {
    title: 'Creative Meets Strategy',
    body: 'Our work lives at the intersection of art and analytics. Every concept, campaign, and cinematic shot is backed by insight, crafted to look beautiful and perform brilliantly.',
  },
  {
    title: 'Trusted by Visionaries',
    body: 'From luxury brands and automotive giants to lifestyle startups and events — we’ve partnered with clients who dream big and expect results that last. Our reputation is built on discretion, reliability, and creative excellence.',
  },
  {
    title: 'Future-Ready Creativity',
    body: 'AI-driven marketing, immersive experiences, and digital-first storytelling — we evolve faster than the trends. Hekaya Haus isn’t just keeping up with the future — we’re designing it.',
  },
  {
    title: 'Story First, Always',
    body: 'Every brand has a story — but not everyone can tell it right. At Hekaya Haus, storytelling is our foundation. We don’t just make visuals; we build emotions that connect audiences to your brand’s soul.',
  },
] as const;

// "Stories don't just happen. We create them." capability list, verbatim.
export const CAPABILITIES = [
  { title: 'FPV drone & aerial cinematography', body: 'Dynamic perspectives that make every scene feel larger than life.' },
  { title: 'CGI, VFX & 3D motion', body: 'We build worlds beyond imagination — from hyper-real visuals to full-scale cinematic environments.' },
  { title: 'PR, media buying & digital publishing', body: 'Your story, seen and heard — everywhere it matters.' },
  { title: 'Ad campaigns (Meta, Google, TikTok, YT)', body: 'Creative storytelling meets smart distribution — across Meta, Google, TikTok, and YouTube.' },
  { title: 'Voiceover, audio mixing & mastering', body: 'Where every frequency meets feeling — polished sound for cinematic impact.' },
  { title: 'Graphic Designing & Branding', body: 'Identity, elevated. From timeless logos to visual systems — we build brands that look as iconic as they feel.' },
] as const;

export const PROCESS = [
  { n: '01', title: 'Discover', body: 'We study your brand, your audience and the market you compete in — so every idea starts from insight.', image: 'film-set-clapper' },
  { n: '02', title: 'Strategize', body: 'We turn that insight into a clear creative and channel roadmap tied to the outcomes you care about.', image: 'design-grid' },
  { n: '03', title: 'Create', body: 'Film, photography, CGI, design, sound and code — produced in-house, under one roof.', image: 'portrait-neon' },
  { n: '04', title: 'Launch', body: 'We release across the platforms, screens and stages where your audience actually is.', image: 'events-decor' },
  { n: '05', title: 'Scale', body: 'We measure, learn and optimise with data and AI to compound what works.', image: 'tech-isometric-1' },
] as const;

export const INDUSTRIES = [
  { name: 'Luxury', to: '/work/kofo-brand-identity', image: 'brand-kofo' },
  { name: 'Automotive', to: '/work/automotive-films', image: 'auto-bmw-x6' },
  { name: 'Hospitality', to: '/work/hospitality-fnb', image: 'fnb-bartender' },
  { name: 'Restaurants & Cafés', to: '/work/hospitality-fnb', image: 'fnb-bartender' },
  { name: 'Real Estate', to: '/media-production-dubai', image: 'auto-mercedes-dubai-2' },
  { name: 'Fashion', to: '/work/cinematic-portraiture', image: 'portrait-neon' },
  { name: 'Beauty', to: '/work/cinematic-portraiture', image: 'portrait-lightbulb' },
  { name: 'Corporate', to: '/what-we-do/technology', image: 'web-wireframes' },
  { name: 'Startups', to: '/what-we-do/marketing-branding', image: 'tech-isometric-2' },
  { name: 'Technology', to: '/work/digital-products', image: 'tech-isometric-1' },
  { name: 'Retail & E-commerce', to: '/web-development-dubai', image: 'web-editorial' },
  { name: 'Events', to: '/work/events-and-experiences', image: 'events-decor' },
  { name: 'Entertainment', to: '/work/film-key-art', image: 'poster-teaser' },
  { name: 'Sports & Motorsport', to: '/work/motorsport-key-art', image: 'poster-f1-verstappen' },
] as const;

export const HOME_FAQS = [
  {
    q: 'What services does HekayaHaus offer as a creative media & marketing agency in Dubai?',
    a: 'Hekaya Haus is a full-service creative agency in Dubai offering media production, social media management, digital marketing, CGI & VFX, branding, events, audio production, web development, CRM systems, and AI solutions under one roof.',
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
    a: 'We combine cinematic storytelling, advanced AI tools, in-house 360 production, and full-stack development — delivering end-to-end solutions with measurable ROI.',
  },
  {
    q: 'Do you offer AI-powered solutions?',
    a: 'Yes — AI chatbots, AI translation, AI character development, AI marketing automation, and smart content generation.',
  },
] as const;
