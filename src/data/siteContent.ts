export interface SolutionPillar {
  id: string;
  tag: string;
  title: string;
  shortDesc: string;
  capabilities: string[];
  image: string;
  route: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  category: string;
  image?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface MetricItem {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  videoUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface InsightArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const SITE_INFO = {
  name: 'HekayaHaus',
  legalName: 'HekayaHaus FZC-LLC',
  tagline: 'Beyond Seen. Into Felt.',
  sloganExtended: 'Where Stories Become Legacies',
  supportingPositioning: 'We build brands that people remember through cinematic storytelling, strategic marketing, technology, and AI.',
  email: 'info@hekayahaus.com',
  calendarLink: 'https://calendar.app.google/49AJM36qdqkp8zaG6',
  instagram: 'https://www.instagram.com/hekayahaus/',
  linkedin: 'https://www.linkedin.com/company/hekayahaus-fzc-llc/',
  youtubeShowreel: 'https://youtu.be/2_CSwS6nG6o',
  youtubePlaylist: 'https://www.youtube.com/playlist?list=PLk53-jXewhhfX-5Pxq_Ywe3ByEmBkgEgJ',
  location: 'Dubai, UAE',
  address: 'Downtown Dubai & Media City, Dubai, United Arab Emirates',
  phone: '+971 50 123 4567',
  hours: 'Mon – Fri: 9:00 AM – 6:00 PM GST',
  copyright: '2026 Copyright © HekayaHaus. All rights reserved.',
};

export const BRAND_CLIENTS = [
  { name: 'Porsche', logo: '/assets/logos/porsche.png' },
  { name: 'Lamborghini', logo: '/assets/logos/lamborghini.png' },
  { name: 'Nike', logo: '/assets/logos/nike.png' },
  { name: 'Red Bull', logo: '/assets/logos/redbull.svg' },
  { name: 'EA Sports', logo: '/assets/logos/ea_sports.png' },
  { name: 'Global Village', logo: '/assets/logos/global_village.png' },
  { name: 'Hero', logo: '/assets/logos/hero.jpg' },
  { name: 'Farak', logo: '/assets/logos/farak.png' },
];

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    id: 'media-production',
    tag: 'PRODUCTION',
    title: 'Creative & Media Production',
    shortDesc: 'Cinema-grade storytelling combining ARRI/RED camera workflows, FPV drones, and post-production mastery.',
    capabilities: [
      'Commercial Films',
      'Brand Films',
      'Photography & Editorial',
      'Videography',
      'Drone & FPV Cinematography',
      'Post Production & Color Grading',
    ],
    image: '/assets/showcase/media_1.jpg',
    route: '/media-production-dubai',
  },
  {
    id: 'branding-design',
    tag: 'IDENTITY',
    title: 'Branding & Design',
    shortDesc: 'From iconic visual identities to comprehensive design systems that evoke luxury and demand attention.',
    capabilities: [
      'Brand Strategy',
      'Logo & Visual Identity',
      'Visual Guidelines',
      'Packaging Design',
      'Graphic Design',
      'Creative Direction',
    ],
    image: '/assets/showcase/billboard.png',
    route: '/graphics-dubai',
  },
  {
    id: 'digital-growth',
    tag: 'GROWTH',
    title: 'Digital Growth',
    shortDesc: 'Data-backed performance marketing and content engines engineered for tangible commercial scale.',
    capabilities: [
      'Social Media Strategy',
      'Performance Marketing',
      'Meta & Google Ads',
      'SEO & Organic Content',
      'Lead Generation',
      'Email Marketing & Funnels',
    ],
    image: '/assets/showcase/marketing.png',
    route: '/content-marketing-dubai',
  },
  {
    id: 'technology-ai',
    tag: 'TECHNOLOGY',
    title: 'Technology & AI',
    shortDesc: 'Bespoke web applications, custom CRM platforms, and intelligent AI automation pipelines.',
    capabilities: [
      'Web Development',
      'Mobile Apps (iOS / Android)',
      'Custom CRM Platforms',
      'AI Chatbots & Agents',
      'AI Automations',
      'Internal Workflow Tools',
    ],
    image: '/assets/showcase/tech.jpg',
    route: '/web-development-dubai',
  },
  {
    id: 'pr-expansion',
    tag: 'EXPANSION',
    title: 'PR & Brand Expansion',
    shortDesc: 'High-visibility media placements, global influencer alignments, and strategic celebrity partnerships.',
    capabilities: [
      'Public Relations',
      'Media Buying & Billboard Placements',
      'Influencer Campaigns',
      'Event & Concert Coverage',
      'Brand Partnerships',
      'Celebrity Collaborations',
    ],
    image: '/assets/showcase/contact_render.png',
    route: '/event-organise-dubai',
  },
  {
    id: 'immersive-experiences',
    tag: 'EXPERIENCES',
    title: 'Immersive Experiences',
    shortDesc: 'Hyper-realistic CGI, 3D architectural mapping, virtual worlds, and interactive installations.',
    capabilities: [
      'CGI & VFX',
      '3D Animation',
      '360 Virtual Mapping & Tours',
      'Virtual Experiences',
      'Interactive Installations',
      'Exhibition & Stage Content',
    ],
    image: '/assets/showcase/cgi_artwork.jpg',
    route: '/graphics-dubai',
  },
];

export const INDUSTRIES: IndustryItem[] = [
  { id: 'luxury', name: 'Luxury Brands', category: 'High-End Retail & Lifestyle' },
  { id: 'automotive', name: 'Automotive', category: 'Supercars & Commercial OEM' },
  { id: 'hospitality', name: 'Hospitality', category: '5-Star Resorts & Hotels' },
  { id: 'fb', name: 'F&B', category: 'Fine Dining & Hospitality' },
  { id: 'realestate', name: 'Real Estate', category: 'Ultra-Luxury Architecture & Estates' },
  { id: 'fashion', name: 'Fashion', category: 'Haute Couture & Streetwear' },
  { id: 'beauty', name: 'Beauty', category: 'Cosmetics & Wellness' },
  { id: 'healthcare', name: 'Healthcare', category: 'Medical & Aesthetic Centers' },
  { id: 'corporate', name: 'Corporate', category: 'Enterprise & Financial Institutions' },
  { id: 'government', name: 'Government', category: 'Civic & Tourism Initiatives' },
  { id: 'startups', name: 'Startups', category: 'Venture-Backed Innovators' },
  { id: 'technology', name: 'Technology', category: 'AI, SaaS & Hardware' },
  { id: 'retail', name: 'Retail', category: 'Global Consumer Brands' },
  { id: 'events', name: 'Events', category: 'Concerts, Expos & Galas' },
  { id: 'entertainment', name: 'Entertainment', category: 'Media & Gaming Franchises' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Immersion & Research',
    description: 'We research your brand DNA, market positioning, audience motivations, and competitor gaps to establish the creative foundation.',
  },
  {
    step: '02',
    title: 'STRATEGIZE',
    subtitle: 'The Architectural Roadmap',
    description: 'We craft a rigorous multi-channel roadmap where narrative art direction meets quantifiable business objectives.',
  },
  {
    step: '03',
    title: 'CREATE',
    subtitle: 'Cinema-Grade Production',
    description: 'Our in-house directors, designers, and software engineers produce world-class creative assets and bespoke digital experiences.',
  },
  {
    step: '04',
    title: 'LAUNCH',
    subtitle: 'Precision Execution',
    description: 'We deploy across global channels, orchestrating media buying, digital distribution, PR, and interactive activations.',
  },
  {
    step: '05',
    title: 'SCALE',
    subtitle: 'Data & AI Optimization',
    description: 'We continually refine performance using predictive analytics, AI automation, and iterative testing to compound brand equity.',
  },
];

export const PROVEN_METRICS: MetricItem[] = [
  { value: '250+', label: 'BRANDS SERVED' },
  { value: '12+', label: 'INDUSTRIES' },
  { value: '5M+', label: 'CONTENT VIEWS', highlight: true },
  { value: '300%', label: 'AVG. CLIENT GROWTH' },
  { value: '98%', label: 'CLIENT RETENTION' },
  { value: '50+', label: 'COUNTRIES REACHED' },
];

export const WHY_HEKAYAHAUS_PRINCIPLES = [
  { title: 'Strategy First', desc: 'We solve the right business problems before shooting a single frame or writing a line of code.' },
  { title: 'Premium Quality', desc: 'Obsessive attention to detail in every frame, typographic hierarchy, and interaction.' },
  { title: 'Data Driven', desc: 'Creative work backed by behavioral insights, search trends, and rigorous analytics.' },
  { title: 'AI Powered', desc: 'Modern workflows utilizing machine intelligence to accelerate turnaround and amplify impact.' },
  { title: 'End-to-End', desc: 'From initial brand architecture to film production and software engineering, under one roof.' },
  { title: 'Faster Turnaround', desc: 'Agile multidisciplinary pods that execute without bureaucratic agency inertia.' },
  { title: 'Dedicated Team', desc: 'Direct access to senior creative partners and technical leads.' },
  { title: 'Results Focused', desc: 'Every campaign, asset, and experience is built to generate measurable commercial return.' },
];

export const FEATURED_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'porsche',
    client: 'PORSCHE',
    category: 'Brand Film & Performance',
    title: 'Engineering Emotion Across Dubai Dunes',
    tagline: 'High-speed cinema-grade cinematography capturing precision and adrenaline.',
    description: 'A cinematic commercial film highlighting vehicle dynamics, night racing through Dubai, and emotional storytelling.',
    image: '/assets/showcase/media_1.jpg',
    metrics: [
      { label: 'Views', value: '1.4M+' },
      { label: 'Engagement Rate', value: '+340%' },
    ],
  },
  {
    id: 'nike',
    client: 'NIKE',
    category: 'Visual Campaign & Activation',
    title: 'The Relentless Pursuit of Movement',
    tagline: 'High-energy storytelling blending athlete portraits with raw urban rhythm.',
    description: 'Multi-platform visual campaign featuring regional athletes, cinematic slow-motion cinematography, and bespoke sound design.',
    image: '/assets/showcase/media_2.jpg',
    metrics: [
      { label: 'Social Reach', value: '2.8M' },
      { label: 'Brand Recall', value: '+92%' },
    ],
  },
  {
    id: 'global-village',
    client: 'GLOBAL VILLAGE',
    category: 'Event Coverage & Live Broadcasting',
    title: 'Connecting Cultures on a Global Stage',
    tagline: 'Full-scale multi-camera concert coverage and aerial FPV drone perspectives.',
    description: 'High-definition live coverage, real-time social reels, and aerial festival cinematography seen by millions.',
    image: '/assets/showcase/media_3.jpg',
    metrics: [
      { label: 'Realtime Impressions', value: '5.2M' },
      { label: 'Attendee Growth', value: '+28%' },
    ],
  },
  {
    id: 'lamborghini',
    client: 'LAMBORGHINI',
    category: 'Launch Film & CGI',
    title: 'Pure Supercar Kinetic Art',
    tagline: 'Hyper-realistic 3D CGI environments merged with track-level film capture.',
    description: 'Unveiling a flagship launch through photorealistic CGI, dynamic motion graphics, and adrenaline-charged soundscapes.',
    image: '/assets/showcase/drone.png',
    metrics: [
      { label: 'Watch Time', value: '96% Avg' },
      { label: 'Lead Inquiries', value: '420+' },
    ],
  },
];

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'story-first-approach',
    category: 'STRATEGY',
    title: 'Why Brands Need a Story-First Approach in the Age of Noise',
    excerpt: 'In an era of endless commodity feeds, brands that tell unforgettable human stories generate emotional resonance and generational loyalty.',
    readTime: '4 min read',
    image: '/assets/showcase/content_1.jpg',
    date: 'February 2026',
  },
  {
    id: 'ai-transforming-marketing',
    category: 'MARKETING & AI',
    title: 'How AI is Transforming Digital Marketing from Prediction to Production',
    excerpt: 'How leading creative studios leverage neural translation, smart segmentation, and automated workflows without sacrificing creative soul.',
    readTime: '6 min read',
    image: '/assets/showcase/tech.jpg',
    date: 'January 2026',
  },
  {
    id: 'future-cinematic-storytelling',
    category: 'PRODUCTION',
    title: 'The Future of Cinematic Storytelling: Virtual Production & 360 Mapping',
    excerpt: 'Behind the camera on how real-time LED volumes, FPV drones, and spatial audio are changing commercial advertising forever.',
    readTime: '5 min read',
    image: '/assets/showcase/content_3.jpg',
    date: 'December 2025',
  },
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: 'What services does HekayaHaus offer as a creative media & marketing agency in Dubai?',
    answer: 'Hekaya Haus is a full-service creative house in Dubai offering cinema-grade media production, social media strategy, digital marketing, CGI & VFX, branding, events, audio production, web development, custom CRM systems, and AI automation under one roof.',
  },
  {
    question: 'Where is Hekaya Haus located and which areas do you serve?',
    answer: 'We are based in Dubai, UAE and serve visionary clients across the UAE, GCC (Saudi Arabia, Qatar, etc.), and India with on-location production and digital capability.',
  },
  {
    question: 'How much do your marketing and production services cost in Dubai?',
    answer: 'Pricing depends on project scope, deliverables, and production tier. We offer bespoke engagements starting from consultation. Contact us for a strategic discovery session and transparent quote tailored to your goals.',
  },
  {
    question: 'Why should I choose Hekaya Haus over generic marketing agencies in Dubai?',
    answer: 'We combine cinematic storytelling, advanced AI tools, in-house 360 production, and full-stack software development — delivering end-to-end solutions that elevate brand perception and produce measurable commercial growth.',
  },
  {
    question: 'Do you offer AI-powered solutions?',
    answer: 'Yes. We engineer custom AI chatbots, multilingual neural translation, AI digital character development, AI marketing automation, and smart content generation pipelines.',
  },
];
