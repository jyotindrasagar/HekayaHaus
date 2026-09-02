import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { SITE_INFO } from '../data/siteContent';

interface ServiceData {
  slug: string;
  tag: string;
  title: string;
  headline: string;
  intro: string;
  image: string;
  capabilities: { name: string; desc: string }[];
  equipmentOrFocus?: string;
  faqs: { question: string; answer: string }[];
}

const SERVICE_REGISTRY: Record<string, ServiceData> = {
  'media-production-dubai': {
    slug: 'media-production-dubai',
    tag: 'PRODUCTION',
    title: 'Media Production Company Dubai',
    headline: 'Cinematic Visuals That Tell Powerful Stories',
    intro: 'HekayaHaus is a premium media production company in Dubai delivering high-end videography, photography, 360 experiences, and cinema-grade advertising content that captivates audiences and elevates brands.',
    image: '/assets/showcase/media_1.jpg',
    equipmentOrFocus: 'Equipped with ARRI, RED, Sony cinema cameras, FPV cinema drones, and master color suites.',
    capabilities: [
      { name: 'Cinematic Videography', desc: 'Commercial films, brand stories, and narrative videos using cinema-grade lenses and stabilization.' },
      { name: '360 Mapping & Virtual Tours', desc: 'Immersive virtual tours and 360° visual mapping engineered for luxury real estate, hotels, and exhibitions.' },
      { name: 'Drone Videography & FPV', desc: 'Dynamic aerial cinematography capturing panoramic Dubai skylines and high-speed motion.' },
      { name: 'Live Streaming & Broadcast', desc: 'Multi-camera television-standard live coverage for major conferences, expos, and concerts.' },
      { name: 'Commercial Ad Production', desc: 'High-impact TV and digital commercial films crafted for maximum emotional resonance and brand recall.' },
      { name: 'Post-Production & Color Grading', desc: 'Hollywood-level color grading (DaVinci Resolve), sound mixing, and narrative editing.' },
    ],
    faqs: [
      { question: 'What is 360 mapping and virtual tours offered by Hekaya Haus?', answer: '360 mapping creates immersive virtual tours and architectural experiences for real estate, events, and exhibitions using high-precision spatial equipment.' },
      { question: 'What types of video production do you offer in Dubai?', answer: 'We offer commercial films, brand manifestos, high-speed FPV drone videos, event recaps, executive interviews, and cinematic product showcase films.' },
      { question: 'How long does a professional video production project take in Dubai?', answer: 'Agile commercial films typically take 1–2 weeks; high-end cinematic productions with complex VFX take 4–8 weeks.' },
      { question: 'Do you provide photography and videography for real estate and events?', answer: 'Yes, we provide ultra-luxury real estate videography/photography, VIP event coverage, and editorial lifestyle campaigns.' },
      { question: 'What camera equipment do you use for media production?', answer: 'We shoot on ARRI Alexa, RED V-Raptor, Sony FX series cinema packages, professional DJI Inspire/FPV drones, and advanced cinema lighting arrays.' },
    ],
  },
  'content-marketing-dubai': {
    slug: 'content-marketing-dubai',
    tag: 'GROWTH',
    title: 'Content Marketing & Social Media Agency Dubai',
    headline: 'Strategic Content That Drives Measurable Growth',
    intro: 'We combine powerful cinematic content creation with rigorous data-driven performance marketing to help brands in Dubai and the GCC build authority, generate qualified leads, and achieve sustainable scale.',
    image: '/assets/showcase/marketing.png',
    capabilities: [
      { name: 'Content Strategy & Architecture', desc: 'Deep behavioral research and content scheduling aligned with market timing and business conversion goals.' },
      { name: 'Cinematic Social Content', desc: 'High-definition Reels, TikToks, and episodic social series that command attention in crowded algorithmic feeds.' },
      { name: 'Full Social Media Management', desc: 'End-to-end community building, copywriting, scheduling, and reputation management across Instagram, TikTok, and LinkedIn.' },
      { name: 'Paid Advertising Campaigns', desc: 'Laser-targeted Meta Ads, Google Performance Max, TikTok Ads, and YouTube distribution managed for maximum ROAS.' },
      { name: 'SEO & Organic Growth', desc: 'High-intent search engine optimization and digital publishing that secures first-page dominance.' },
      { name: 'Influencer & Talent Alliances', desc: 'Vetted collaborations with prominent UAE and regional GCC creators, handled end-to-end.' },
    ],
    faqs: [
      { question: 'What does social media management include in Dubai?', answer: 'Strategy, creative direction, on-location video shooting, copywriting, community management, influencer partnerships, and paid advertising campaigns.' },
      { question: 'How do you create viral content for Dubai brands?', answer: 'We combine cultural relevance, cinematic visual pacing, high-retention audio hooks, and AI-assisted distribution algorithms.' },
      { question: 'Do you run paid ads on Meta, Google, and TikTok?', answer: 'Yes. We manage full-funnel paid advertising with rigorous attribution tracking, A/B creative testing, and weekly ROI reporting.' },
      { question: 'What is AI translation and AI character development in marketing?', answer: 'AI translation enables localized Arabic/English bilingual content for GCC markets. AI characters serve as 24/7 digital ambassadors.' },
      { question: 'Do you manage influencer contracting and deliverables?', answer: 'Yes. We handle influencer discovery, vetting, legal contracts, creative briefs, and post-campaign performance attribution.' },
    ],
  },
  'graphics-dubai': {
    slug: 'graphics-dubai',
    tag: 'CGI & DESIGN',
    title: 'CGI, VFX & Motion Graphics Studio Dubai',
    headline: 'Award-Level CGI, 3D Motion & Visual Systems',
    intro: 'Our specialized CGI, VFX, and motion design studio creates hyper-realistic 3D environments, visual effects, and iconic brand identity systems for luxury advertising, architecture, and entertainment.',
    image: '/assets/showcase/cgi_artwork.jpg',
    capabilities: [
      { name: 'Motion Graphics & Kinetic Type', desc: 'Sophisticated animated brand identities, broadcast packages, and typography animations.' },
      { name: 'Hyper-Realistic CGI Environments', desc: 'Full digital environments, vehicle CGI, and architectural spaces built down to micro-surface detail.' },
      { name: 'Visual Effects (VFX)', desc: 'Seamless photorealistic CGI integration into live-action footage for commercials and brand films.' },
      { name: 'Fake Out Of Home (FOOH)', desc: 'Trending viral CGI illusions interacting with real-world landmarks across Dubai and global capitals.' },
      { name: 'Architectural 3D Visualization', desc: 'High-end interior and exterior 3D walkthroughs for premier developers and hospitality groups.' },
      { name: 'Billboard & Large-Format 3D', desc: 'Striking 3D anamorphic billboard creatives designed for curved LED screens and high-visibility plazas.' },
    ],
    faqs: [
      { question: 'What is the difference between CGI and VFX?', answer: 'CGI involves creating entire computer-generated scenes and objects. VFX seamlessly composites digital elements into real live-action video footage.' },
      { question: 'Do you design anamorphic 3D billboards in Dubai?', answer: 'Yes. We produce complete 3D anamorphic optical illusions for major LED screens across Dubai and the UAE.' },
      { question: 'How long does a CGI or VFX project take?', answer: 'Motion graphics take 1–2 weeks; complex 3D photorealistic animations or VFX campaigns take 4–10 weeks.' },
      { question: 'Can you produce 3D product visualizations?', answer: 'Yes, ideal for automotive, horology, luxury fragrance, and real estate pre-sales.' },
      { question: 'What is FOOH (Fake Out Of Home) advertising?', answer: 'FOOH combines real live-action street footage with hyper-realistic CGI to create viral digital stunts that generate millions of organic impressions.' },
    ],
  },
  'event-organise-dubai': {
    slug: 'event-organise-dubai',
    tag: 'EVENTS & PR',
    title: 'Event Organizing & Production Agency Dubai',
    headline: 'High-Impact Brand Activations & Production',
    intro: 'From international product launches and conferences to luxury galas and immersive brand activations, HekayaHaus orchestrates unforgettable physical experiences backed by seamless production engineering.',
    image: '/assets/showcase/contact_render.png',
    capabilities: [
      { name: 'Full Stage Design & Build', desc: 'Complete 3D architectural stage modeling, structural fabrication, LED screens, and styling.' },
      { name: 'Audiovisual & Lighting Engineering', desc: 'Concert-grade acoustics, intelligent moving fixtures, laser mapping, and projection arrays.' },
      { name: 'Celebrity & Talent Management', desc: 'Booking, hospitality riders, VIP protocol, and rehearsal coordination for headlining talent.' },
      { name: 'Interactive Brand Activations', desc: 'Sensory pop-ups, custom photo moments, and experiential consumer touchpoints.' },
      { name: 'Multi-Camera Live Broadcasting', desc: 'Zero-latency global broadcast streaming with dedicated technical directors.' },
      { name: 'Real-Time Event Content Reels', desc: 'On-site editors delivering viral social highlights during the event itself.' },
    ],
    faqs: [
      { question: 'What types of events do you organize in Dubai?', answer: 'Corporate summits, luxury brand activations, product reveals, fashion shows, concerts, and private VIP galas.' },
      { question: 'Do you handle physical stage construction and lighting?', answer: 'Yes, we manage 3D CAD blueprints, permits, trussing, staging, lighting rigs, sound engineering, and LED walls.' },
      { question: 'Can you produce hybrid global events?', answer: 'Yes. We deliver seamless hybrid experiences uniting in-person attendees with interactive global digital audiences.' },
      { question: 'How far in advance should we book event production in Dubai?', answer: 'We advise booking 2–6 months in advance for large-scale summits or public activations.' },
      { question: 'Do you provide photo and video teams for the event?', answer: 'Yes, we deploy specialized photo/video squads including real-time social reel editors.' },
    ],
  },
  'web-development-dubai': {
    slug: 'web-development-dubai',
    tag: 'TECHNOLOGY & AI',
    title: 'Web Development & AI Solutions Dubai',
    headline: 'High-Performance Web Platforms & AI Systems',
    intro: 'We build ultra-fast, visually stunning bespoke websites, native mobile applications, custom CRM platforms, and tailored AI workflows engineered to streamline business operations and convert visitors.',
    image: '/assets/showcase/tech.jpg',
    capabilities: [
      { name: 'Custom Editorial Websites', desc: 'Bespoke web experiences built with modern architecture (React/Vite/Next), fluid animation, and zero bloat.' },
      { name: 'Custom CRM Platforms', desc: 'Tailored enterprise platforms for pipeline tracking, automated client communications, and executive dashboards.' },
      { name: 'Mobile Applications (iOS/Android)', desc: 'Native and cross-platform apps built for fluid performance, security, and intuitive UX.' },
      { name: 'AI Marketing Automation', desc: 'Intelligent lead qualification bots, customer support chatbots, and automated multi-channel sequences.' },
      { name: 'E-Commerce Platforms', desc: 'Luxury retail stores with secure GCC payment gateway integration (Stripe, Apple Pay, Tabby, Tamara).' },
      { name: 'Security & Enterprise Maintenance', desc: 'Continuous uptime monitoring, SSL/TLS hardening, CDN optimization, and defense against attacks.' },
    ],
    faqs: [
      { question: 'Do you build custom websites rather than basic templates?', answer: 'Yes. Every website is custom designed and engineered to reflect the brand’s luxury positioning with bespoke typography, motion, and speed.' },
      { question: 'What are the benefits of integrating AI into our website?', answer: '24/7 intelligent customer engagement, automated appointment bookings, instant multilingual response, and automated CRM data capture.' },
      { question: 'Do you engineer custom CRM solutions?', answer: 'Yes. We build proprietary CRM systems tailored specifically to your sales workflows without recurring per-seat SaaS costs.' },
      { question: 'How long does it take to develop a custom web platform?', answer: 'Bespoke corporate websites take 3–6 weeks; complex web platforms, CRM systems, or mobile apps take 8–16 weeks.' },
      { question: 'Are your websites mobile-responsive and SEO-optimized?', answer: 'Yes. Every build adheres to strict Core Web Vitals performance benchmarks, fluid responsive typography, and complete schema metadata.' },
    ],
  },
  'audio-direction-dubai': {
    slug: 'audio-direction-dubai',
    tag: 'AUDIO & SOUND',
    title: 'Audio Production, Voiceover & Dubbing Dubai',
    headline: 'Cinematic Soundscapes & Multilingual Voiceovers',
    intro: 'Where frequency meets feeling. We compose original musical scores, design custom audio identities, and deliver cinema-grade voiceovers across multiple languages for films, advertisements, and podcasts.',
    image: '/assets/showcase/audio.jpg',
    capabilities: [
      { name: 'Original Music Scoring', desc: 'Cinematic orchestral and electronic compositions crafted to define a brand’s unique musical signature.' },
      { name: 'Multilingual Voiceover Talent', desc: 'Professional native voice talent across Arabic (Khaleeji, Levantine, Egyptian), English, Hindi, Urdu, and French.' },
      { name: 'Sound Design & Foley', desc: 'Detailed acoustic layering, custom sound effects, and spatial audio that gives physical presence to visuals.' },
      { name: 'Audio Mixing & Mastering', desc: 'Dolby Atmos and stereo broadcast mastering adhering to strict international streaming loudness standards.' },
      { name: 'Commercial Audio Dubbing', desc: 'Frame-accurate dialogue replacement and localization for global distribution.' },
      { name: 'Sonic Brand Identities', desc: 'Signature audio logos and memorable audio mnemonics that reinforce brand recall in seconds.' },
    ],
    faqs: [
      { question: 'What audio production services do you offer in Dubai?', answer: 'Original music composition, multilingual voiceover casting, sound design, Foley, audio dubbing, and broadcast mastering.' },
      { question: 'Which languages do you provide voiceovers for?', answer: 'Arabic (Khaleeji, MSA, Egyptian, Levantine), English (US, UK, Neutral), French, Hindi, Urdu, and other regional languages.' },
      { question: 'Can you create original music for commercial advertisements?', answer: 'Yes, our in-house composers create original soundtracks and audio logos with full global sync licensing.' },
      { question: 'Do you offer professional dubbing for film and corporate video?', answer: 'Yes. We provide synchronized voice dubbing with native speakers and pristine studio audio capture.' },
      { question: 'What is the turnaround time for voiceover recording?', answer: 'Standard voiceovers are delivered within 24–48 hours; custom scores take 1–3 weeks depending on complexity.' },
    ],
  },
};

export const ServiceDetailPage: React.FC = () => {
  const location = useLocation();
  const pathSlug = location.pathname.replace(/^\//, '');
  const service = SERVICE_REGISTRY[pathSlug] || SERVICE_REGISTRY['media-production-dubai'];

  return (
    <main className="service-detail-page">
      {/* Hero Header */}
      <section className="section section-ivory detail-hero">
        <div className="container">
          <div className="detail-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/allserviceshekayahaus">Solutions</Link>
            <ChevronRight size={14} />
            <span>{service.title}</span>
          </div>

          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>{service.tag}</span>
          </div>

          <h1 className="hero-title detail-h1">{service.headline}</h1>
          <p className="detail-hero-lead">{service.intro}</p>

          <div className="detail-actions">
            <a
              href={SITE_INFO.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>BOOK STRATEGY SESSION</span>
              <ArrowUpRight className="btn-icon btn-icon-arrow" size={16} />
            </a>
            <Link to="/contact-us" className="btn btn-secondary">
              <span>SUBMIT INQUIRY</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Media Showcase */}
      <section className="section section-surface detail-media-section">
        <div className="container">
          <div className="detail-image-wrapper">
            <img src={service.image} alt={service.title} className="detail-feature-img" />
            {service.equipmentOrFocus && (
              <div className="detail-equipment-pill">
                <span>{service.equipmentOrFocus}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specialized Capabilities Grid */}
      <section className="section section-ivory detail-caps-section">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>SPECIALIZED DISCIPLINES</span>
          </div>
          <h2 className="section-title detail-caps-title">
            ENGINEERED FOR <span className="text-blue editorial-italic">EXCELLENCE.</span>
          </h2>

          <div className="detail-caps-grid">
            {service.capabilities.map((cap, i) => (
              <div key={cap.name} className="cap-card">
                <div className="cap-num">0{i + 1}</div>
                <h3 className="cap-name">{cap.name}</h3>
                <p className="cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated FAQs */}
      <FAQAccordion
        items={service.faqs}
        title={`${service.tag} FAQs`}
        subtitle={`Key details regarding our ${service.title.toLowerCase()} workflows and delivery standards.`}
      />

      {/* Pre-Footer Action */}
      <section className="section section-navy detail-cta-section">
        <div className="container text-center">
          <h2 className="section-title text-inverse" style={{ marginBottom: '1.5rem' }}>
            READY TO ELEVATE YOUR <span className="text-blue editorial-italic">BRAND?</span>
          </h2>
          <p className="detail-cta-sub text-muted-inverse">
            Partner with HekayaHaus to bring cinema-grade precision and measurable performance to your brand.
          </p>
          <a
            href={SITE_INFO.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            <span>BOOK A DISCOVERY CALL</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <style>{`
        .detail-hero {
          padding-top: clamp(7rem, 12vw, 10rem);
          padding-bottom: clamp(3rem, 6vw, 4.5rem);
          border-bottom: 1px solid var(--color-border);
        }

        .detail-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--color-muted);
          margin-bottom: 1.5rem;
        }

        .detail-breadcrumbs a {
          color: var(--color-muted);
          transition: color var(--transition-fast);
        }

        .detail-breadcrumbs a:hover {
          color: var(--color-blue);
        }

        .detail-h1 {
          margin-bottom: 1.5rem;
        }

        .detail-hero-lead {
          font-size: clamp(1.1rem, 1.4vw, 1.3rem);
          color: var(--color-muted);
          line-height: 1.65;
          max-width: 820px;
          margin-bottom: 2.5rem;
        }

        .detail-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.25rem;
        }

        .detail-media-section {
          padding-top: 0;
          padding-bottom: clamp(3rem, 6vw, 5rem);
          border-bottom: 1px solid var(--color-border);
        }

        .detail-image-wrapper {
          position: relative;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(11, 13, 18, 0.1);
          border: 1px solid var(--color-border);
          aspect-ratio: 16 / 8;
          background: #000;
        }

        .detail-feature-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-equipment-pill {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(8, 21, 47, 0.85);
          backdrop-filter: blur(10px);
          color: #FFFFFF;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .detail-caps-section {
          border-bottom: 1px solid var(--color-border);
        }

        .detail-caps-title {
          margin-bottom: 3.5rem;
        }

        .detail-caps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .detail-caps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .detail-caps-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .cap-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 2.25rem 2rem;
          transition: all var(--transition-normal);
        }

        .cap-card:hover {
          border-color: var(--color-blue);
          box-shadow: 0 12px 32px rgba(23, 70, 255, 0.08);
          transform: translateY(-3px);
        }

        .cap-num {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-blue);
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .cap-name {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: var(--color-text);
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .cap-desc {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--color-muted);
        }

        .detail-cta-section {
          padding: clamp(5rem, 8vw, 7rem) 0;
        }

        .detail-cta-sub {
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </main>
  );
};
