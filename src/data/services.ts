// Three pillars + specialist service pages. Pillar copy supplied by the owner; specialist-page FAQs and
// capability lists come from the original hekayahaus.com (PAGES_AND_CONTENT.md).
import type { MediaName } from './media.generated';

export interface FAQ { q: string; a: string }
export interface Capability { title: string; body: string }
export type PillarId = 'marketing' | 'performance' | 'growth';

export interface PillarService {
  name: string;
  body: string[];
  /** Specialist page with more detail, when one exists. */
  link?: string;
}

export interface Pillar {
  id: PillarId;
  n: string;
  name: string;
  route: string;
  /** Short line under the pillar name (homepage). */
  line: string;
  /** Homepage intro paragraphs. */
  intro: string[];
  /** What We Do page headline + intro. */
  headline: string;
  pageIntro: string[];
  bullets: string[];
  cta: string;
  image: MediaName;
  secondary: MediaName;
  services: PillarService[];
  metaTitle: string;
  metaDescription: string;
}

export const PILLARS: Pillar[] = [
  {
    id: 'marketing',
    n: '01',
    name: 'Marketing',
    route: '/what-we-do/marketing',
    line: 'Building the brand people remember and talk about.',
    intro: [
      'Before people buy from you, they need a reason to care. We build that connection through strategy, storytelling, branding, social media, influencer collaborations and public relations.',
      'From shaping perception to keeping your brand part of the conversation, we make sure your business doesn’t just show up. It stands for something.',
    ],
    headline: 'Give people a reason to choose you.',
    pageIntro: [
      'People don’t connect with businesses because they post frequently. They connect because something about the brand resonates.',
      'We help you find that something, express it consistently and put it in front of the people who matter.',
    ],
    bullets: [
      'Social Media Marketing (SMM)',
      'Branding & Graphic Design',
      'Influencer Marketing',
      'Public Relations (News, TV channels, Magazines, Metro stations, RTA Taxi, Billboards — UAE, India & USA)',
    ],
    cta: 'Explore Marketing',
    image: 'brand-kofo',
    secondary: 'social-campaign',
    services: [
      {
        name: 'Social Media Management',
        link: '/content-marketing-dubai',
        body: [
          'Your social presence should feel like an extension of your brand, not a collection of posts to fill a calendar.',
          'We handle strategy, content planning, creative direction, copywriting, platform management and community engagement to build a presence people recognise and remember.',
        ],
      },
      {
        name: 'Brand Strategy & Identity',
        link: '/graphics-dubai',
        body: [
          'A strong brand is more than a logo. It’s what people think, feel and remember when they encounter your business.',
          'We build brand identities, positioning, visual systems and communication that give your business a distinct place in the market.',
        ],
      },
      {
        name: 'Influencer & Talent Marketing',
        link: '/pr-influencer-marketing-dubai',
        body: [
          'The right voice can introduce your brand to an audience in a way traditional advertising cannot.',
          'We identify relevant creators, develop collaborations, coordinate campaigns and manage talent partnerships with a focus on genuine audience alignment.',
        ],
      },
      {
        name: 'Public Relations & Media Placement',
        link: '/pr-influencer-marketing-dubai',
        body: [
          'Some stories deserve a bigger platform.',
          'We help brands earn visibility through media opportunities and strategic placements across news publications, magazines, television channels and outdoor media.',
          'Available opportunities across the UAE, India and the USA, subject to publication and placement availability.',
        ],
      },
      {
        name: 'Creative Strategy & Campaigns',
        body: [
          'From the first idea to the final execution, we develop creative campaigns that give people a reason to stop, pay attention and act.',
        ],
      },
    ],
    metaTitle: 'Marketing — Social Media, Branding, Influencer & PR Dubai | HekayaHaus',
    metaDescription:
      'Social media marketing, brand strategy and identity, influencer marketing and PR & media placement across the UAE, India and the USA — HekayaHaus, Dubai.',
  },
  {
    id: 'performance',
    n: '02',
    name: 'Performance',
    route: '/what-we-do/performance',
    line: 'Creating work that doesn’t just look good — it performs.',
    intro: [
      'Being seen is only the beginning. What happens next is what matters.',
      'We create the content, campaigns and digital experiences that move people from discovering your brand to engaging with it, trusting it and choosing it. Every creative decision should have a purpose. Every campaign should have a direction.',
    ],
    headline: 'Make every impression work harder.',
    pageIntro: [
      'Attention is valuable. But attention without direction is wasted potential.',
      'We bring creative thinking and performance together to help businesses reach the right audience, communicate the right message and create campaigns with a clear objective.',
    ],
    bullets: ['Media Production (Campaigns, Drone & FPV, Commercials)', 'Performance Marketing', 'Digital Marketing Campaigns'],
    cta: 'Explore Performance',
    image: 'auto-cockpit',
    secondary: 'film-set-clapper',
    services: [
      {
        name: 'Media Production',
        link: '/media-production-dubai',
        body: [
          'Stories deserve to be told properly.',
          'We produce films, commercials, branded content, corporate videos, photography, social-first content and high-end visual experiences. From concept development and scripting to filming, editing, colour grading and final delivery, we take care of the complete production journey.',
        ],
      },
      {
        name: 'Campaign Production & Execution',
        link: '/event-organise-dubai',
        body: [
          'A campaign is more than a collection of assets. It is one connected idea experienced across different touchpoints.',
          'We develop and execute campaigns for launches, promotions, brand awareness, events and audience engagement.',
        ],
      },
      {
        name: 'Performance Marketing',
        link: '/performance-marketing-dubai',
        body: [
          'Getting attention is one thing. Knowing what to do with it is another.',
          'We build and manage paid advertising campaigns across relevant digital platforms, using audience targeting, creative testing, optimisation and performance analysis to improve results.',
        ],
      },
      {
        name: 'Digital Marketing',
        link: '/performance-marketing-dubai',
        body: [
          'Your customers don’t experience your brand in just one place. Neither should your marketing.',
          'We connect digital channels, creative content and marketing strategy into a more consistent customer journey.',
        ],
      },
      {
        name: 'Graphic Design & Creative Content',
        link: '/graphics-dubai',
        body: [
          'From a single visual to a complete campaign identity, we create design that communicates clearly, feels distinctive and stays true to your brand.',
        ],
      },
      {
        name: 'Drone, FPV & Aerial Production',
        link: '/media-production-dubai',
        body: [
          'Some perspectives change the entire story.',
          'We create aerial and FPV visuals for properties, events, commercials, destinations and brand campaigns, subject to location permissions and applicable aviation regulations.',
        ],
      },
      {
        name: 'CGI, 3D & VFX',
        link: '/graphics-dubai',
        body: [
          'When reality needs a little more imagination, we bring ideas to life through computer-generated imagery, visual effects, 3D design and motion-led experiences.',
        ],
      },
      {
        name: 'Audio, Voiceover & Sound',
        link: '/audio-direction-dubai',
        body: ['Original music, multilingual voiceover, dubbing, sound design and mixing — polished sound for cinematic impact.'],
      },
    ],
    metaTitle: 'Performance — Media Production, Campaigns & Performance Marketing Dubai | HekayaHaus',
    metaDescription:
      'Media production, campaigns, drone & FPV, CGI & VFX, performance marketing and digital marketing from HekayaHaus in Dubai.',
  },
  {
    id: 'growth',
    n: '03',
    name: 'Growth',
    route: '/what-we-do/growth',
    line: 'Building systems and technology that scale the brand long after the campaign ends.',
    intro: [
      'Growth shouldn’t depend on doing everything manually or constantly starting from scratch.',
      'We create the digital foundations that help businesses work smarter, connect better with customers and scale with greater control. From your website to the systems running behind it, we help turn growing businesses into better-equipped businesses.',
    ],
    headline: 'Build a business that doesn’t outgrow its own systems.',
    pageIntro: [
      'More customers should mean more opportunity, not more chaos.',
      'We help businesses create the digital infrastructure, intelligent systems and online foundations they need to operate better and grow further.',
    ],
    bullets: ['Websites & E-commerce', 'CRM & Custom Software', 'AI Agents & AI Automation', 'Project Management Systems', 'SEO, AEO & GEO'],
    cta: 'Explore Growth',
    image: 'tech-isometric-1',
    secondary: 'web-editorial',
    services: [
      {
        name: 'Website & E-commerce Development',
        link: '/web-development-dubai',
        body: [
          'Your website should do more than look good. It should communicate value, build confidence and make the next step effortless.',
          'We create business websites, landing pages, high-end digital experiences and e-commerce platforms designed around the people using them.',
        ],
      },
      {
        name: 'CRM & Customer Management Systems',
        link: '/web-development-dubai',
        body: [
          'Opportunities shouldn’t disappear in scattered conversations, forgotten follow-ups or disconnected spreadsheets.',
          'We implement and customise CRM systems that help businesses organise leads, manage relationships and keep their sales process moving.',
        ],
      },
      {
        name: 'AI Agents & AI Automation',
        link: '/web-development-dubai',
        body: [
          'Your team shouldn’t spend its best hours repeating work that technology can handle.',
          'We develop AI agents and automated workflows to streamline customer interactions, lead qualification, internal processes and everyday operations.',
        ],
      },
      {
        name: 'Custom Software & Business Tools',
        link: '/web-development-dubai',
        body: [
          'When off-the-shelf tools don’t fit the way your business works, we build solutions around the way it actually operates.',
          'From internal platforms to specialised business applications, we help turn operational challenges into practical digital systems.',
        ],
      },
      {
        name: 'SEO & AI Search Optimisation',
        body: [
          'Being online isn’t enough if the right people can’t find you.',
          'We improve your digital visibility through search engine optimisation, Answer Engine Optimisation and Generative Engine Optimisation, helping your business become easier to discover across traditional search and emerging AI-powered search experiences.',
        ],
      },
      {
        name: 'Project Management & Workflow Systems',
        body: [
          'A growing business needs more than people working hard. It needs people working together.',
          'We help structure workflows, responsibilities, approvals and project visibility so that work moves with greater clarity and control.',
        ],
      },
    ],
    metaTitle: 'Growth — Websites, CRM, AI Agents & SEO/AEO/GEO Dubai | HekayaHaus',
    metaDescription:
      'Websites and e-commerce, CRM, custom software, AI agents and automation, project management systems and SEO, AEO & GEO from HekayaHaus in Dubai.',
  },
];

export interface ServicePage {
  slug: string; // URL (legacy URLs kept for SEO)
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

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'media-production-dubai',
    pillar: 'performance',
    name: 'Media Production',
    heroTitle: 'Media Production',
    heading: 'Cinematic Visuals That Tell Powerful Stories',
    intro:
      'HekayaHaus is a premium media production company in Dubai delivering campaigns, commercials, drone & FPV, photography, 360 experiences, and advertising content that captivates audiences and elevates brands.',
    ticker: ['Campaigns', 'Commercials', 'Drone & FPV', 'Cinematography', 'Photography', 'Broadcasting', '360 Mapping'],
    metaTitle: 'Media Production Company Dubai | HekayaHaus',
    metaDescription:
      'Professional media production in Dubai — campaigns, commercials, cinematic video, drone & FPV, photography, CGI & VFX. Book a free quote today.',
    image: 'auto-mercedes-dubai',
    gallery: ['auto-cockpit', 'portrait-lightbulb', 'auto-bmw-x6', 'fnb-bartender'],
    capabilities: [
      { title: 'Campaign Production', body: 'One connected idea produced across film, photography and social formats for launches, promotions and brand awareness.' },
      { title: 'Cinematic Videography', body: 'Professional commercial films, brand stories, and narrative videos using cinema-grade equipment.' },
      { title: 'Drone & FPV Videography', body: 'Stunning aerial footage and dynamic shots showcasing Dubai’s skyline and locations, subject to permissions and aviation regulations.' },
      { title: '360 Mapping & Virtual Tours', body: 'Immersive 360° virtual experiences perfect for real estate, hotels, and exhibitions.' },
      { title: 'Live Streaming', body: 'Full event coverage with multi-camera setups and professional live broadcasting.' },
      { title: 'Ad Production', body: 'High-impact TV commercials and digital advertisements with cinematic quality.' },
      { title: 'Product Video Production', body: 'Engaging product films optimized for e-commerce and social media.' },
      { title: 'Post-Production & Color Grading', body: 'Expert editing, motion graphics, color correction, and final delivery.' },
    ],
    faqs: [
      { q: 'What types of video production do you offer in Dubai?', a: 'We offer commercials, brand stories, FPV drone videos, event videography, interviews, and product showcase videos.' },
      { q: 'How long does a professional video production project take in Dubai?', a: 'Simple videos take 1–2 weeks; high-end cinematic productions with VFX take 4–8 weeks.' },
      { q: 'Do you provide photography and videography for events and real estate?', a: 'Yes, we offer premium real estate photography/videography, event coverage, and lifestyle shoots.' },
      { q: 'What is 360 mapping and virtual tours offered by Hekaya Haus?', a: '360 mapping creates immersive virtual tours and experiences for real estate, events, and exhibitions using high-precision equipment.' },
      { q: 'What equipment do you use for media production?', a: 'We use RED, ARRI, Sony cinema cameras, professional drones, 360 cameras, and advanced lighting & stabilization systems.' },
    ],
  },
  {
    slug: 'content-marketing-dubai',
    pillar: 'marketing',
    name: 'Social Media Marketing',
    heroTitle: 'Social Media Marketing',
    heading: 'A social presence people recognise and remember',
    intro:
      'We combine powerful content creation with strategy, community and platform management to help brands in Dubai build awareness, generate leads, and achieve sustainable growth.',
    ticker: ['Social media marketing', 'Content', 'Community', 'Creative direction', 'Copywriting'],
    metaTitle: 'Social Media Marketing Agency Dubai | HekayaHaus',
    metaDescription:
      'Social media management in Dubai — strategy, content creation, creative direction, copywriting, platform and community management by HekayaHaus.',
    image: 'design-grid',
    gallery: ['social-campaign', 'poster-f1-hamilton', 'poster-mustang', 'portrait-neon'],
    capabilities: [
      { title: 'Content Strategy Development', body: 'Research-based content planning aligned with brand goals and audience behavior.' },
      { title: 'Cinematic Content Creation', body: 'High-quality videos, Reels, and visuals that stand out in crowded feeds.' },
      { title: 'Social Media Management', body: 'Full management across Instagram, TikTok, LinkedIn, and other platforms.' },
      { title: 'Creative Direction & Copywriting', body: 'A consistent voice and visual language across every post, caption and campaign.' },
      { title: 'Community Management', body: 'Engaging with your audience so the conversation around your brand keeps growing.' },
      { title: 'Performance Analytics', body: 'Detailed monthly reports with insights and recommendations.' },
    ],
    faqs: [
      { q: 'What does social media management include in Dubai?', a: 'Strategy, content creation, posting, community management, influencer collaborations, and paid advertising across Instagram, TikTok, LinkedIn, and Snapchat.' },
      { q: 'How do you create viral content for Dubai brands?', a: 'We combine trending formats, cultural relevance, cinematic quality, and AI tools to create highly engaging content.' },
      { q: 'What is AI translation and AI character development in marketing?', a: 'AI translation enables multilingual content for GCC markets. AI characters are digital spokespersons for 24/7 engagement and storytelling.' },
    ],
  },
  {
    slug: 'performance-marketing-dubai',
    pillar: 'performance',
    name: 'Performance & Digital Marketing',
    heroTitle: 'Performance & Digital Marketing',
    heading: 'Make every impression work harder',
    intro:
      'We build and manage paid advertising campaigns across relevant digital platforms, using audience targeting, creative testing, optimisation and performance analysis — and connect digital channels into one consistent customer journey.',
    ticker: ['Performance marketing', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'YouTube Ads', 'Digital marketing'],
    metaTitle: 'Performance & Digital Marketing Agency Dubai | HekayaHaus',
    metaDescription:
      'Performance marketing and digital marketing in Dubai — Meta, Google, TikTok and YouTube ads, creative testing, optimisation and analytics by HekayaHaus.',
    image: 'social-campaign',
    gallery: ['design-grid', 'poster-f1-verstappen', 'web-landing', 'tech-isometric-2'],
    capabilities: [
      { title: 'Paid Advertising Campaigns', body: 'Meta Ads, Google Ads, TikTok Ads and YouTube Ads with precise targeting and optimization.' },
      { title: 'Creative Testing', body: 'Testing hooks, formats and messages so budget follows what actually works.' },
      { title: 'Full-Funnel Strategy', body: 'Campaigns that move people from discovering your brand to engaging, trusting and choosing it.' },
      { title: 'Digital Marketing', body: 'Connecting digital channels, creative content and marketing strategy into a consistent customer journey.' },
      { title: 'Email & Automation Marketing', body: 'Nurturing campaigns and marketing automation sequences.' },
      { title: 'Performance Analytics', body: 'Detailed reporting with insights and recommendations for what comes next.' },
    ],
    faqs: [
      { q: 'Do you run paid ads on Meta, Google, and TikTok?', a: 'Yes. We manage full-funnel ad campaigns with detailed tracking and optimization for maximum ROI.' },
      { q: 'How do you create viral content for Dubai brands?', a: 'We combine trending formats, cultural relevance, cinematic quality, and AI tools to create highly engaging content.' },
    ],
  },
  {
    slug: 'graphics-dubai',
    pillar: 'marketing',
    name: 'Graphic Design & Branding',
    heroTitle: 'Graphic Design & Branding',
    heading: 'Identity, elevated — plus CGI, VFX and motion',
    intro:
      'Brand identities, visual systems and graphic design that give your business a distinct place in the market — alongside our CGI, VFX and motion graphics studio for advertising, real estate and entertainment.',
    ticker: ['Graphic designing', 'Branding', 'Motion graphics', 'CGI', '3D animation', 'Stage designing'],
    metaTitle: 'Graphic Design, Branding, CGI & VFX Studio Dubai | HekayaHaus',
    metaDescription:
      'Brand identity, graphic design, key art, CGI, VFX, 3D animation, motion graphics, FOOH campaigns and billboard design from HekayaHaus in Dubai.',
    image: 'poster-f1-verstappen',
    gallery: ['poster-teaser', 'brand-kofo', 'poster-campus-map', 'poster-lyrical'],
    capabilities: [
      { title: 'Brand Identity & Visual Systems', body: 'Logos, positioning, visual guidelines and communication that make a brand recognisable.' },
      { title: 'Graphic Design & Key Art', body: 'From a single visual to a complete campaign identity.' },
      { title: 'Motion Graphics', body: 'Dynamic animated explainers, logos, and kinetic typography.' },
      { title: 'CGI (Computer Generated Imagery)', body: 'Fully computer-created scenes and environments.' },
      { title: 'Visual Effects (VFX)', body: 'Seamless integration of digital effects into live-action footage.' },
      { title: '3D Product Animation', body: 'Realistic 3D product visualizations for marketing.' },
      { title: 'Fake Out Of Home (FOOH) Campaigns', body: 'Viral illusion-based outdoor advertising.' },
      { title: 'Billboard & Large Format 3D Design', body: 'Eye-catching 3D billboard creatives and animations.' },
    ],
    faqs: [
      { q: 'What is the difference between CGI and VFX?', a: 'CGI creates fully computer-generated scenes. VFX adds digital effects to real footage. We excel in both.' },
      { q: 'Do you design billboards and large-format advertising in Dubai?', a: 'Yes. We provide complete billboard design, 3D rendering, printing coordination, and strategic placement.' },
      { q: 'How long does a CGI or VFX project take?', a: 'Simple motion graphics take 1–2 weeks. Complex VFX or 3D animation projects take 4–10 weeks.' },
      { q: 'What is FOOH (Fake Out Of Home) advertising?', a: 'It is a trending digital technique that creates viral illusions in public spaces using CGI and video.' },
    ],
  },
  {
    slug: 'pr-influencer-marketing-dubai',
    pillar: 'marketing',
    name: 'PR & Influencer Marketing',
    heroTitle: 'PR & Influencer Marketing',
    heading: 'Some stories deserve a bigger platform',
    intro:
      'We help brands earn visibility through media opportunities and strategic placements — news publications, TV channels, magazines, metro stations, RTA taxis and billboards across the UAE, India and the USA — and through creator collaborations with genuine audience alignment.',
    ticker: ['Public relations', 'News & TV', 'Magazines', 'Metro & RTA taxi', 'Billboards', 'Influencers'],
    metaTitle: 'PR, Media Placement & Influencer Marketing Dubai | HekayaHaus',
    metaDescription:
      'PR and media placement across news, TV, magazines, metro stations, RTA taxis and billboards in the UAE, India and the USA, plus influencer and talent marketing — HekayaHaus.',
    image: 'event-neon-arcade',
    gallery: ['portrait-neon', 'social-campaign', 'events-decor', 'poster-f1-hamilton'],
    capabilities: [
      { title: 'Public Relations', body: 'Earning visibility for your story across news publications, magazines and television channels.' },
      { title: 'Outdoor & Transit Media', body: 'Metro stations, RTA taxis and billboards — subject to placement availability.' },
      { title: 'Markets: UAE, India & USA', body: 'Placement opportunities across three markets, subject to publication and placement availability.' },
      { title: 'Influencer Marketing', body: 'Discovery, contracting, campaign management and performance tracking with relevant creators.' },
      { title: 'Talent & Celebrity Partnerships', body: 'Booking, riders, hospitality and coordination for talent-led campaigns.' },
    ],
    faqs: [
      { q: 'Do you work with influencers in Dubai?', a: 'Yes. We handle influencer discovery, contracting, campaign management, and performance tracking.' },
      { q: 'Do you design billboards and large-format advertising in Dubai?', a: 'Yes. We provide complete billboard design, 3D rendering, printing coordination, and strategic placement.' },
    ],
  },
  {
    slug: 'web-development-dubai',
    pillar: 'growth',
    name: 'Web, CRM, Software & AI',
    heroTitle: 'Website Development',
    heading: 'Digital Solutions That Scale Your Business',
    intro:
      'We build modern, high-performance websites, custom web applications, bespoke CRM software, and intelligent AI agents and automation that transform workflows and drive conversions.',
    ticker: ['Website', 'E-commerce', 'CRM', 'Software', 'AI agents', 'Automation'],
    metaTitle: 'Web Development, CRM & AI Solutions Dubai | HekayaHaus',
    metaDescription:
      'Custom websites, e-commerce, CRM systems, custom software, API integrations, AI agents and automation built by HekayaHaus in Dubai.',
    image: 'tech-isometric-2',
    gallery: ['web-editorial', 'web-landing', 'web-portfolio', 'web-wireframes'],
    capabilities: [
      { title: 'Custom Website Development', body: 'Fast, SEO-optimized, and conversion-focused websites.' },
      { title: 'E-commerce Solutions', body: 'Online stores with seamless payment gateway integration.' },
      { title: 'Custom CRM Systems', body: 'Tailored sales, project, and client management platforms.' },
      { title: 'AI Agents & Automation', body: 'Smart automation, conversational AI agents, and custom model integrations.' },
      { title: 'Mobile App Development', body: 'Native iOS and Android applications.' },
      { title: 'API Integrations', body: 'Connecting third-party services, analytics, and business tools.' },
      { title: 'Dashboard & Analytics Development', body: 'Custom internal dashboards for business intelligence.' },
      { title: 'Website Maintenance & Support', body: 'Ongoing updates, security, and performance monitoring.' },
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
    slug: 'event-organise-dubai',
    pillar: 'performance',
    name: 'Events & Activations',
    heroTitle: 'Event Organising',
    heading: 'Organising, production and design for events that are felt',
    intro:
      'Corporate events, product launches, brand activations, conferences, luxury weddings, fashion shows, concerts and exhibitions — from 3D concept to stage, sound, light and live stream.',
    ticker: ['Organising', 'Production', 'Designing', 'Activations'],
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
    ],
  },
  {
    slug: 'audio-direction-dubai',
    pillar: 'performance',
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
      { q: 'How long does audio post-production take?', a: 'Voiceovers and mixing take 2–5 days; full custom music composition takes 1–3 weeks.' },
    ],
  },
];

export const pillarById = (id: PillarId) => PILLARS.find((p) => p.id === id)!;
export const servicesForPillar = (id: PillarId) => SERVICE_PAGES.filter((s) => s.pillar === id);
