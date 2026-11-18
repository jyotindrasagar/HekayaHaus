// Portfolio entries are built ONLY from real HekayaHaus portfolio imagery archived from the original site.
// Descriptions describe what the work shows; no clients, results or metrics are claimed beyond what the
// imagery itself displays. Add verified client names / results here when they are approved.
import type { MediaName } from './media.generated';
import type { PillarId } from './services';
import type { ExternalVideo } from './videos';

/**
 * Case-study sections (brief/challenge/thinking/execution/outcome) are optional and only render when filled in
 * with real, project-specific information. Never manufacture results or attribute achievements without evidence.
 */
export interface Project {
  pillar: PillarId;
  client?: string;
  brief?: string;
  challenge?: string;
  thinking?: string;
  execution?: string;
  outcome?: string;
  /** Externally hosted film for this project (never a local file). */
  video?: ExternalVideo;
  slug: string;
  title: string;
  category: string;
  discipline: string;
  summary: string;
  body: string[];
  cover: MediaName;
  gallery: MediaName[];
  services: { label: string; to: string }[];
  year?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'automotive-films',
    pillar: 'performance',
    title: 'Automotive in Motion',
    category: 'Automotive',
    discipline: 'Commercial film & photography',
    summary: 'Golden-hour location work, studio detail studies and in-cabin perspectives for automotive storytelling.',
    body: [
      'Automotive is a category where every reflection and every line of the bodywork matters. These frames show how HekayaHaus approaches it: rooftop location shoots against the Dubai skyline at golden hour, controlled studio lighting for design details, and intimate in-cabin perspectives that put the viewer behind the wheel.',
      'The same crews, cameras and colour pipeline carry through from stills to motion, so a campaign’s photography and film feel like one story.',
    ],
    cover: 'auto-mercedes-dubai',
    gallery: ['auto-mercedes-dubai-2', 'auto-bmw-x6', 'auto-cockpit'],
    services: [
      { label: 'Media Production', to: '/media-production-dubai' },
      { label: 'Performance', to: '/what-we-do/performance' },
    ],
  },
  {
    slug: 'motorsport-key-art',
    pillar: 'marketing',
    title: 'Motorsport Key Art',
    category: 'Sports & Motorsport',
    discipline: 'Key art & graphic design',
    summary: 'High-energy poster design for motorsport — layered compositing, typography and colour built for impact.',
    body: [
      'A series of motorsport posters combining photographic compositing, bold editorial typography and a strong colour discipline. Each piece is designed to stop the scroll on social and hold its own at large format.',
      'The work spans contemporary Formula 1 portraiture and a classic-car editorial layout, showing range from adrenaline to heritage.',
    ],
    cover: 'poster-f1-verstappen',
    gallery: ['poster-f1-hamilton', 'poster-mustang'],
    services: [
      { label: 'Graphic Design & Branding', to: '/graphics-dubai' },
      { label: 'Marketing', to: '/what-we-do/marketing' },
    ],
  },
  {
    slug: 'film-key-art',
    pillar: 'marketing',
    title: 'Film & Music Key Art',
    category: 'Entertainment',
    discipline: 'Theatrical key art',
    summary: 'Teaser and lyrical-video artwork for feature film releases — moody, cinematic and typographically bold.',
    body: [
      'Release artwork for film: an official teaser poster and the key art for a lyrical video launch. The brief in entertainment is always the same — communicate tone in a single glance — and the work leans on dramatic light, texture and display lettering to do it.',
    ],
    cover: 'poster-teaser',
    gallery: ['poster-lyrical', 'poster-campus-map'],
    services: [
      { label: 'Graphic Design & Branding', to: '/graphics-dubai' },
      { label: 'Audio Production', to: '/audio-direction-dubai' },
    ],
  },
  {
    slug: 'cinematic-portraiture',
    pillar: 'performance',
    title: 'Cinematic Portraiture',
    category: 'Fashion & Beauty',
    discipline: 'Photography & art direction',
    summary: 'Practical light, neon and colour — portrait work that feels like a still from a film.',
    body: [
      'Portrait sessions lit with practical sources — a single tungsten bulb, neon signage, arcade light — and graded for mood. This is the visual language HekayaHaus brings to fashion, beauty and lifestyle campaigns: story first, then light.',
    ],
    cover: 'portrait-lightbulb',
    gallery: ['portrait-neon', 'event-neon-arcade'],
    services: [
      { label: 'Media Production', to: '/media-production-dubai' },
      { label: 'Social Media Marketing', to: '/content-marketing-dubai' },
    ],
  },
  {
    slug: 'kofo-brand-identity',
    pillar: 'marketing',
    title: 'Kofo',
    category: 'Brand Identity',
    discipline: 'Identity & print',
    summary: 'A compact wordmark and holographic stationery system for the Kofo brand.',
    body: [
      'Brand identity for Kofo, carried into print with holographic business cards. A confident lowercase wordmark sits on an iridescent field, so the brand literally shifts colour in the hand — a small object with a memorable first impression.',
    ],
    cover: 'brand-kofo',
    gallery: ['design-grid'],
    services: [
      { label: 'Graphic Design & Branding', to: '/graphics-dubai' },
      { label: 'Marketing', to: '/what-we-do/marketing' },
    ],
  },
  {
    slug: 'events-and-experiences',
    pillar: 'performance',
    title: 'Events & Experiences',
    category: 'Events',
    discipline: 'Event styling, production & coverage',
    summary: 'Stage styling, décor and on-set production — from concept to the night itself.',
    body: [
      'Event work spans concept, décor and stage styling through to on-the-night coverage. These frames show themed installations, floral and stage design, and the production crew at work on set.',
    ],
    cover: 'events-decor',
    gallery: ['film-set-clapper', 'event-neon-arcade'],
    services: [
      { label: 'Events & Activations', to: '/event-organise-dubai' },
      { label: 'Media Production', to: '/media-production-dubai' },
    ],
  },
  {
    slug: 'hospitality-fnb',
    pillar: 'performance',
    title: 'Hospitality & F&B',
    category: 'Hospitality',
    discipline: 'Lifestyle photography',
    summary: 'Behind-the-bar lifestyle imagery made for restaurants, cafés and hospitality brands.',
    body: [
      'Hospitality content lives or dies on atmosphere. This lifestyle shoot captures craft behind the bar — hands, light and motion — producing imagery that works across menus, social and campaigns.',
    ],
    cover: 'fnb-bartender',
    gallery: ['portrait-neon'],
    services: [
      { label: 'Media Production', to: '/media-production-dubai' },
      { label: 'Social Media Marketing', to: '/content-marketing-dubai' },
    ],
  },
  {
    slug: 'digital-products',
    pillar: 'growth',
    title: 'Digital Products',
    category: 'Technology',
    discipline: 'Web design & development',
    summary: 'Landing pages, editorial e-commerce and portfolio websites, from wireframe to launch.',
    body: [
      'Website and product design work, from page-system wireframes to finished landing pages, editorial e-commerce and portfolio builds. Alongside the sites sit illustration systems for product and platform storytelling.',
    ],
    cover: 'web-editorial',
    gallery: ['web-landing', 'web-portfolio', 'web-wireframes', 'tech-isometric-1', 'tech-isometric-2'],
    services: [
      { label: 'Web, CRM, Software & AI', to: '/web-development-dubai' },
      { label: 'Growth', to: '/what-we-do/growth' },
    ],
  },
  {
    slug: 'social-content',
    pillar: 'marketing',
    title: 'Social & Campaign Content',
    category: 'Marketing',
    discipline: 'Social content & design',
    summary: 'Feed-first campaign creative designed as a system — consistent, recognisable, made to perform.',
    body: [
      'Social campaigns designed as systems rather than one-off posts: a consistent grid, a recognisable typographic voice and formats built for the platforms they live on.',
    ],
    cover: 'social-campaign',
    gallery: ['design-grid', 'poster-f1-hamilton'],
    services: [
      { label: 'Social Media Marketing', to: '/content-marketing-dubai' },
      { label: 'Marketing', to: '/what-we-do/marketing' },
    ],
  },
];

export const FEATURED_SLUGS = ['automotive-films', 'motorsport-key-art', 'cinematic-portraiture', 'kofo-brand-identity', 'events-and-experiences', 'digital-products'];
