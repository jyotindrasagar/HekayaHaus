// Service content is taken from PAGES_AND_CONTENT.md (original hekayahaus.com copy).
import type { MediaName } from './media.generated';

export interface FAQ { q: string; a: string }
export interface Capability { title: string; body: string }

export interface ServicePage {
  slug: string; // legacy URL kept for SEO
  pillar: PillarId;
  name: string;
  heroTitle: string;
  heading: string;
  intro: string;
  ticker: string[];
  metaTitle: string;
  metaDescription: string;
  image: MediaName;
  gallery: MediaName[];
  capabilities: Capability[];
  faqs: FAQ[];
}

export type PillarId = 'media-production' | 'marketing-branding' | 'technology';

export interface Pillar {
  id: PillarId;
  n: string;
  name: string;
  short: string;
  route: string;
  statement: string;
  description: string;
  image: MediaName;
  secondary: MediaName;
  representative: string[];
  groups: { title: string; services: string[]; link?: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const PILLARS: Pillar[] = [
  {
    id: 'media-production',
    n: '01',
    name: 'Media Production & Creative',
    short: 'Media Production',
    route: '/what-we-do/media-production',
    statement: 'Cinematic visuals that tell powerful stories.',
    description:
      'Commercials, brand films, photography, FPV drone, CGI, VFX, sound and live events — produced end-to-end by one in-house team with cinema-grade RED, ARRI and Sony workflows.',
    image: 'auto-cockpit',
    secondary: 'film-set-clapper',
    representative: ['Commercial & brand films', 'Photography', 'FPV drone', 'CGI & VFX', 'Event production', 'Audio & voiceover'],
    groups: [
      {
        title: 'Film & Photography',
        link: '/media-production-dubai',
        services: [
          'Commercial production', 'Brand films', 'Corporate films', 'Product films', 'TV & digital ad production',
          'Photography', 'Videography', 'Cinematic videography', 'Documentary production', 'Real estate photography & video',
          'Lifestyle shoots', 'Drone production', 'FPV drone', 'Aerial cinematography',
        ],
      },
      {
        title: 'Post-Production, CGI & Motion',
        link: '/graphics-dubai',
        services: [
          'Editing', 'Colour grading', 'Post-production', 'CGI', 'VFX', '3D animation', 'Motion graphics',
          '3D product visualization', 'Architectural visualization', 'FOOH (Fake Out Of Home) campaigns',
          'Character animation & AI avatars', 'Billboard & large-format 3D', 'Stage visuals', 'LED content',
        ],
      },
      {
        title: 'Audio',
        link: '/audio-direction-dubai',
        services: [
          'Audio production', 'Original music composition', 'Jingles & brand anthems', 'Voiceovers',
          'Multilingual voiceover', 'Dubbing & localization', 'Sound design & foley', 'Mixing & mastering (Dolby Atmos & stereo)',
          'Podcast production',
        ],
      },
      {
        title: 'Events & Live',
        link: '/event-organise-dubai',
        services: [
          'Event production', 'Event coverage', 'Live streaming', 'Multi-camera broadcasting', 'Brand activations',
          'Exhibition coverage', 'Stage design & production', 'Lighting & AV engineering', 'Concerts & shoots',
          '360 mapping & experiences',
        ],
      },
    ],
    metaTitle: 'Media Production & Creative Studio Dubai | HekayaHaus',
    metaDescription:
      'Commercials, brand films, photography, FPV drone, CGI, VFX, audio and event production from HekayaHaus in Dubai — serving the UAE, GCC and India.',
  },
  {
    id: 'marketing-branding',
    n: '02',
    name: 'Marketing, Branding & Growth',
    short: 'Marketing & Branding',
    route: '/what-we-do/marketing-branding',
    statement: 'Strategic content that drives growth.',
    description:
      'Brand identity, content, social, performance marketing, influencer and PR — powerful creative paired with data-driven distribution so brands are seen, remembered and chosen.',
    image: 'brand-kofo',
    secondary: 'social-campaign',
    representative: ['Brand identity', 'Social media', 'Performance ads', 'SEO', 'Influencer marketing', 'PR & media buying'],
    groups: [
      {
        title: 'Brand & Design',
        link: '/graphics-dubai',
        services: [
          'Brand strategy', 'Brand identity', 'Logo design', 'Visual identity', 'Packaging', 'Graphic design',
          'Creative direction', 'Key art & posters', 'Billboard design',
        ],
      },
      {
        title: 'Content & Social',
        link: '/content-marketing-dubai',
        services: [
          'Content strategy', 'Cinematic content creation', 'Social media management', 'Organic marketing',
          'Community management', 'AI translation for GCC markets', 'AI character development',
        ],
      },
      {
        title: 'Performance & Growth',
        link: '/content-marketing-dubai',
        services: [
          'Performance marketing', 'Paid advertising', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'YouTube Ads', 'SEO',
          'Email marketing', 'Marketing automation', 'Lead generation', 'Performance analytics & reporting',
        ],
      },
      {
        title: 'PR, Partnerships & Events',
        link: '/event-organise-dubai',
        services: [
          'Influencer marketing', 'Public relations', 'Media buying', 'Digital publishing', 'Celebrity collaborations',
          'Celebrity & talent management', 'Brand partnerships', 'Outdoor advertising & billboard placement', 'Event marketing',
        ],
      },
    ],
    metaTitle: 'Branding, Content & Performance Marketing Dubai | HekayaHaus',
    metaDescription:
      'Brand identity, social media, content, Meta/Google/TikTok ads, SEO, influencer marketing and PR from HekayaHaus, a creative marketing haus in Dubai.',
  },
  {
    id: 'technology',
    n: '03',
    name: 'Technology & Digital Experiences',
    short: 'Technology',
    route: '/what-we-do/technology',
    statement: 'Digital solutions that scale your business.',
    description:
      'High-performance websites, e-commerce, apps, bespoke CRM, AI automation and immersive 360 experiences — engineered to transform workflows and drive conversions.',
    image: 'tech-isometric-1',
    secondary: 'web-editorial',
    representative: ['Websites & e-commerce', 'Mobile apps', 'Custom CRM', 'AI chatbots', 'Automation', 'Virtual tours'],
    groups: [
      {
        title: 'Web & Commerce',
        link: '/web-development-dubai',
        services: [
          'Website design', 'Website development', 'E-commerce', 'Landing pages', 'Website maintenance & support',
          'SEO-optimised builds',
        ],
      },
      {
        title: 'Software & Platforms',
        link: '/web-development-dubai',
        services: [
          'Mobile applications (iOS & Android)', 'Custom software', 'CRM', 'ERP', 'API integrations',
          'Dashboards & analytics', 'Automation',
        ],
      },
      {
        title: 'AI Solutions',
        link: '/web-development-dubai',
        services: [
          'AI chatbots', 'AI workflows', 'AI translation', 'AI marketing automation', 'AI character development',
          'Recommendation engines', 'Smart content generation',
        ],
      },
      {
        title: 'Immersive Experiences',
        link: '/media-production-dubai',
        services: [
          'Custom digital experiences', 'Virtual tours', '360 experiences', 'Real estate walkthroughs',
          'Interactive installations', 'AR brand activations',
        ],
      },
    ],
    metaTitle: 'Web Development, Apps, CRM & AI Solutions Dubai | HekayaHaus',
    metaDescription:
      'Websites, e-commerce, mobile apps, custom CRM, API integrations, AI chatbots and immersive 360 experiences built by HekayaHaus in Dubai.',
  },
];

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'media-production-dubai',
    pillar: 'media-production',
    name: 'Media Production',
    heroTitle: 'Media Production',
    heading: 'Cinematic Visuals That Tell Powerful Stories',
    intro:
      'HekayaHaus is a premium media production company in Dubai delivering high-end videography, photography, 360 experiences, and advertising content that captivates audiences and elevates brands.',
    ticker: ['Videography', 'Cinematography', 'Photography', 'Production', 'Drone', 'Broadcasting', '360 Mapping'],
    metaTitle: 'Media Production Company Dubai | HekayaHaus',
    metaDescription:
      'Professional media production in Dubai — cinematic video, FPV drone, photography, CGI & VFX. Trusted by Porsche, Nike, Red Bull. Book a free quote today.',
    image: 'auto-mercedes-dubai',
    gallery: ['auto-cockpit', 'portrait-lightbulb', 'auto-bmw-x6', 'fnb-bartender'],
    capabilities: [
      { title: 'Cinematic Videography', body: 'Professional commercial films, brand stories, and narrative videos using cinema-grade equipment.' },
      { title: '360 Mapping & Virtual Tours', body: 'Immersive 360° virtual experiences perfect for real estate, hotels, and exhibitions.' },
      { title: 'Drone Videography', body: 'Stunning aerial footage and dynamic shots showcasing Dubai’s skyline and locations.' },
      { title: 'Live Streaming', body: 'Full event coverage with multi-camera setups and professional live broadcasting.' },
      { title: 'Ad Production', body: 'High-impact TV commercials and digital advertisements with cinematic quality.' },
      { title: 'Product Video Production', body: 'Engaging product films optimized for e-commerce and social media.' },
      { title: 'Post-Production & Color Grading', body: 'Expert editing, motion graphics, color correction, and final delivery.' },
    ],
    faqs: [
      { q: 'What is 360 mapping and virtual tours offered by Hekaya Haus?', a: '360 mapping creates immersive virtual tours and experiences for real estate, events, and exhibitions using high-precision equipment.' },
      { q: 'What types of video production do you offer in Dubai?', a: 'We offer commercials, brand stories, FPV drone videos, event videography, interviews, and product showcase videos.' },
      { q: 'How long does a professional video production project take in Dubai?', a: 'Simple videos take 1–2 weeks; high-end cinematic productions with VFX take 4–8 weeks.' },
      { q: 'Do you provide photography and videography for events and real estate?', a: 'Yes, we offer premium real estate photography/videography, event coverage, and lifestyle shoots.' },
      { q: 'What equipment do you use for media production?', a: 'We use RED, ARRI, Sony cinema cameras, professional drones, 360 cameras, and advanced lighting & stabilization systems.' },
    ],
  },
  {
    slug: 'content-marketing-dubai',
    pillar: 'marketing-branding',
    name: 'Marketing & Content',
    heroTitle: 'Marketing and Content',
    heading: 'Strategic Content That Drives Growth',
    intro:
      'We combine powerful content creation with data-driven digital marketing to help brands in Dubai build awareness, generate leads, and achieve sustainable growth.',
    ticker: ['Content', 'Social media marketing', 'Digital marketing', 'Performance marketing', 'Influencer marketing'],
    metaTitle: 'Content Marketing & Social Media Agency Dubai | HekayaHaus',
    metaDescription:
      'Content creation, social media management, Meta, Google & TikTok ads, SEO and influencer marketing from HekayaHaus in Dubai.',
    image: 'design-grid',
    gallery: ['social-campaign', 'poster-f1-hamilton', 'poster-mustang', 'portrait-neon'],
    capabilities: [
      { title: 'Content Strategy Development', body: 'Research-based content planning aligned with brand goals and audience behavior.' },
      { title: 'Cinematic Content Creation', body: 'High-quality videos, Reels, and visuals that stand out in crowded feeds.' },
      { title: 'Social Media Management', body: 'Full management across Instagram, TikTok, LinkedIn, and other platforms.' },
      { title: 'Paid Advertising Campaigns', body: 'Meta Ads, Google Ads, TikTok Ads with precise targeting and optimization.' },
      { title: 'SEO & Organic Growth', body: 'Search engine optimization to increase visibility and organic traffic.' },
      { title: 'Influencer Marketing', body: 'Strategic collaborations with relevant UAE influencers.' },
      { title: 'Email & Automation Marketing', body: 'Nurturing campaigns and marketing automation sequences.' },
      { title: 'Performance Analytics', body: 'Detailed monthly reports with insights and recommendations.' },
    ],
    faqs: [
      { q: 'What does social media management include in Dubai?', a: 'Strategy, content creation, posting, community management, influencer collaborations, and paid advertising across Instagram, TikTok, LinkedIn, and Snapchat.' },
      { q: 'How do you create viral content for Dubai brands?', a: 'We combine trending formats, cultural relevance, cinematic quality, and AI tools to create highly engaging content.' },
      { q: 'Do you run paid ads on Meta, Google, and TikTok?', a: 'Yes. We manage full-funnel ad campaigns with detailed tracking and optimization for maximum ROI.' },
      { q: 'What is AI translation and AI character development in marketing?', a: 'AI translation enables multilingual content for GCC markets. AI characters are digital spokespersons for 24/7 engagement and storytelling.' },
      { q: 'Do you work with influencers in Dubai?', a: 'Yes. We handle influencer discovery, contracting, campaign management, and performance tracking.' },
    ],
  },
  {
    slug: 'graphics-dubai',
    pillar: 'media-production',
    name: 'Motion Graphics, CGI & Branding',
    heroTitle: 'Motion Graphics & CGI',
    heading: 'CGI, VFX and motion graphics studio in Dubai',
    intro:
      'Our award-level CGI, VFX, and motion graphics studio in Dubai creates hyper-realistic visuals, 3D animations, and stunning effects for advertising, real estate, and entertainment.',
    ticker: ['Graphic designing', 'Branding', 'Motion graphics', 'CGI', '3D animation', 'Stage designing'],
    metaTitle: 'CGI, VFX & Motion Graphics Studio Dubai | HekayaHaus',
    metaDescription:
      'CGI, VFX, 3D animation, motion graphics, FOOH campaigns, branding and billboard design from HekayaHaus studio in Dubai.',
    image: 'poster-f1-verstappen',
    gallery: ['poster-teaser', 'brand-kofo', 'poster-campus-map', 'poster-lyrical'],
    capabilities: [
      { title: 'Motion Graphics', body: 'Dynamic animated explainers, logos, and kinetic typography.' },
      { title: 'CGI (Computer Generated Imagery)', body: 'Fully computer-created scenes and environments.' },
      { title: 'Visual Effects (VFX)', body: 'Seamless integration of digital effects into live-action footage.' },
      { title: '3D Product Animation', body: 'Realistic 3D product visualizations for marketing.' },
      { title: 'Architectural Visualization', body: 'Photorealistic 3D walkthroughs for real estate developers.' },
      { title: 'Fake Out Of Home (FOOH) Campaigns', body: 'Viral illusion-based outdoor advertising.' },
      { title: 'Character Animation & Avatars', body: 'Custom animated characters and AI digital spokespersons.' },
      { title: 'Billboard & Large Format 3D Design', body: 'Eye-catching 3D billboard creatives and animations.' },
    ],
    faqs: [
      { q: 'What is the difference between CGI and VFX?', a: 'CGI creates fully computer-generated scenes. VFX adds digital effects to real footage. We excel in both.' },
      { q: 'Do you design billboards and large-format advertising in Dubai?', a: 'Yes. We provide complete billboard design, 3D rendering, printing coordination, and strategic placement.' },
      { q: 'How long does a CGI or VFX project take?', a: 'Simple motion graphics take 1–2 weeks. Complex VFX or 3D animation projects take 4–10 weeks.' },
      { q: 'Can you create 3D product visualization and animation?', a: 'Yes — perfect for real estate, automotive, luxury products, and architectural visualization.' },
      { q: 'What is FOOH (Fake Out Of Home) advertising?', a: 'It is a trending digital technique that creates viral illusions in public spaces using CGI and video.' },
    ],
  },
  {
    slug: 'event-organise-dubai',
    pillar: 'media-production',
    name: 'Event Organising & Production',
    heroTitle: 'Event Organising',
    heading: 'Organising, production and design for events that are felt',
    intro:
      'Corporate events, product launches, brand activations, conferences, luxury weddings, fashion shows, concerts and exhibitions — from 3D concept to stage, sound, light and live stream.',
    ticker: ['Organising', 'Production', 'Designing'],
    metaTitle: 'Event Organizing & Production Agency Dubai | HekayaHaus',
    metaDescription:
      'Event organising and production in Dubai — stage design, AV and lighting, celebrity management, brand activations, live streaming and event films.',
    image: 'events-decor',
    gallery: ['event-neon-arcade', 'film-set-clapper', 'portrait-neon', 'fnb-bartender'],
    capabilities: [
      { title: 'Full Stage Design & Production', body: 'From 3D concept blueprints to physical construction, LED screens, trussing, and stage styling.' },
      { title: 'Audiovisual & Lighting Engineering', body: 'Cinema-grade lighting, crystal acoustic arrays, projection mapping.' },
      { title: 'Celebrity & Talent Management', body: 'Booking, riders, hospitality, and performance coordination.' },
      { title: 'Interactive Brand Activations', body: 'Immersive photo booths, AR experiences, experiential environments.' },
      { title: 'Multi-Camera Live Streaming & Broadcasting', body: 'High-definition broadcasting for hybrid and global attendees.' },
      { title: 'Event Videography & Photography', body: 'Real-time social reels and cinematic recap films.' },
    ],
    faqs: [
      { q: 'What types of events do you organize in Dubai?', a: 'Corporate events, product launches, weddings, brand activations, exhibitions, and large-scale parties.' },
      { q: 'Do you handle full stage design and production?', a: 'Yes, from 3D concept design to physical construction, lighting, sound, and live streaming.' },
      { q: 'Can you manage hybrid and virtual events?', a: 'Absolutely. We create seamless hybrid experiences with professional multi-camera production.' },
      { q: 'How early should we book event production services?', a: 'We recommend booking 2–6 months in advance for large events in Dubai.' },
      { q: 'Do you provide event photography and videography?', a: 'Yes, full coverage including cinematic highlights and live streaming.' },
    ],
  },
  {
    slug: 'web-development-dubai',
    pillar: 'technology',
    name: 'Web, App, CRM & AI',
    heroTitle: 'Website Development',
    heading: 'Digital Solutions That Scale Your Business',
    intro:
      'We build modern, high-performance websites, custom web applications, bespoke CRM software, and intelligent AI automation that transform workflows and drive conversions.',
    ticker: ['Website', 'App', 'Software', 'CRM'],
    metaTitle: 'Web Development & AI Solutions Dubai | HekayaHaus',
    metaDescription:
      'Custom websites, e-commerce, mobile apps, CRM systems, API integrations and AI chatbots built by HekayaHaus in Dubai.',
    image: 'tech-isometric-2',
    gallery: ['web-editorial', 'web-landing', 'web-portfolio', 'web-wireframes'],
    capabilities: [
      { title: 'Custom Website Development', body: 'Fast, SEO-optimized, and conversion-focused websites.' },
      { title: 'Mobile App Development', body: 'Native iOS and Android applications.' },
      { title: 'Custom CRM Systems', body: 'Tailored sales, project, and client management platforms.' },
      { title: 'E-commerce Solutions', body: 'Online stores with seamless payment gateway integration.' },
      { title: 'API Integrations', body: 'Connecting third-party services, analytics, and business tools.' },
      { title: 'AI-Powered Features', body: 'Smart automation, conversational AI bots, and custom model integrations.' },
      { title: 'Website Maintenance & Support', body: 'Ongoing updates, security, and performance monitoring.' },
      { title: 'Dashboard & Analytics Development', body: 'Custom internal dashboards for business intelligence.' },
    ],
    faqs: [
      { q: 'Do you build custom websites?', a: 'Yes, we create fast, SEO-optimized, and conversion-focused websites.' },
      { q: 'What are the benefits of an AI chatbot for my business?', a: '24/7 customer support, lead qualification, appointment booking, and reduced workload.' },
      { q: 'Do you develop custom CRM systems?', a: 'Yes, we build tailored CRM solutions for sales, project management, and client tracking.' },
      { q: 'How long does it take to build a website or CRM?', a: 'Basic websites take 4–8 weeks. Complex CRM or mobile apps take 10–20 weeks.' },
      { q: 'Can you integrate AI into websites and apps?', a: 'Yes, including AI chatbots, recommendation engines, and automation tools.' },
    ],
  },
  {
    slug: 'audio-direction-dubai',
    pillar: 'media-production',
    name: 'Audio Production',
    heroTitle: 'Audio Production',
    heading: 'Where every frequency meets feeling',
    intro:
      'Commercial sound design, original scoring, multilingual voiceovers, ADR and podcast production — polished sound for cinematic impact.',
    ticker: ['Audio composition', 'Audio production', 'Audio engineering', 'Voiceover', 'Dubbing'],
    metaTitle: 'Audio Production, Voiceover & Dubbing Dubai | HekayaHaus',
    metaDescription:
      'Music composition, multilingual voiceover, dubbing, sound design and Dolby Atmos mixing from HekayaHaus in Dubai.',
    image: 'film-set-clapper',
    gallery: ['poster-lyrical', 'portrait-lightbulb', 'event-neon-arcade', 'poster-teaser'],
    capabilities: [
      { title: 'Original Music Composition', body: 'Custom cinematic scores, brand anthems, and advertising jingles.' },
      { title: 'Multilingual Voiceover', body: 'Professional talent across Arabic (Khaleeji, Levantine, Egyptian), English (US/UK), Hindi, Urdu, and French.' },
      { title: 'Sound Design & Foley', body: 'High-definition spatial audio and effects for film, VFX, and animations.' },
      { title: 'Audio Mixing & Mastering', body: 'Dolby Atmos and stereo broadcast mastering.' },
      { title: 'Dubbing & Localization', body: 'Synchronized dialogue replacement for movies, TV series, and corporate media.' },
    ],
    faqs: [
      { q: 'What audio services do you offer?', a: 'Voiceovers, dubbing, sound design, music composition, jingles, and full audio post-production.' },
      { q: 'Which languages do you provide voiceovers for?', a: 'Arabic, English, Hindi, Urdu, French, and other GCC and Indian languages.' },
      { q: 'Can you create original music for commercials?', a: 'Yes, our composers create custom tracks and jingles tailored to your brand.' },
      { q: 'Do you offer dubbing services?', a: 'Yes, professional dubbing for videos, films, and advertisements in multiple languages.' },
      { q: 'How long does audio post-production take?', a: 'Voiceovers and mixing take 2–5 days; full custom music composition takes 1–3 weeks.' },
    ],
  },
];

export const pillarById = (id: PillarId) => PILLARS.find((p) => p.id === id)!;
export const servicesForPillar = (id: PillarId) => SERVICE_PAGES.filter((s) => s.pillar === id || (id === 'marketing-branding' && s.slug === 'graphics-dubai'));
