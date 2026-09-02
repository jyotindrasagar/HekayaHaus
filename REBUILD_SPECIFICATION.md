# Hekaya Haus — Website Rebuild Technical Specification & UI Architecture

> **Purpose**: Technical and visual roadmap for rebuilding Hekaya Haus from scratch with cleaner, simpler UI and advanced animations.  
> **Prepared for**: Development team and Antigravity AI Agent.

---

## 1. Objectives of the Rebuild

1. **Freedom from Framer Constraints**: Replace bloated, proprietary Framer runtime chunks with clean, modern, semantic web code.
2. **Simplified, Sophisticated UI**:
   - More breathing room, refined editorial spacing, and less visual clutter.
   - Clean, dark-mode luxury aesthetic with subtle glassmorphic surfaces.
   - Crisp typographic hierarchy using Google Fonts / Woff2 assets (Syne + Satoshi + Inter).
3. **Advanced, Fluid Animations**:
   - **Smooth Momentum Scrolling**: Integration with Lenis Smooth Scroll.
   - **Hero Text Reveals**: Kinetic staggered reveal or split-line typography fade & rise.
   - **Client Logo Carousel**: Infinite marquee with seamless loop and pause-on-hover.
   - **Interactive Bento Grids**: Subtle tilt, mouse-tracking spotlight radial glow on cards.
   - **Dynamic Cursor / Magnetic Buttons**: Subtle magnetic pull effect on primary CTA buttons.
   - **Video Showcase**: Inline modal or expandable cinema-mode showreel overlay.
   - **Accordion FAQ Transitions**: Silky smooth height animations with rotating chevron icons.

---

## 2. Recommended Tech Stack Options

### Option A: Modern React + Vite / Next.js (Recommended for Scale)
- **Framework**: Vite + React or Next.js 14+ (App Router)
- **Styling**: Vanilla CSS Modules or Tailwind CSS
- **Animation Libraries**:
  - `gsap` + `ScrollTrigger` for complex timeline choreography
  - `lenis` for buttery smooth scrolling
  - `framer-motion` / `lucide-react` for component-level UI animations and icons
- **Form Handling**: Native React form with state handling + webhook / email API dispatch.

### Option B: High-Performance Vanilla JS + CSS3 (Zero Build Overhead)
- **Core**: Semantic HTML5 + modular ES6 JavaScript + Vanilla CSS
- **Libraries**:
  - `Lenis` (via CDN or bundled)
  - `GSAP` 3.x for scroll and timeline triggers
- **Benefits**: Instant loading, zero dependencies to maintain, zero build step required, easily hosted on any static host (Cloudflare Pages, Vercel, Netlify, or standard server).

---

## 3. UI Component Architecture

```
src/ or components/
├── header/
│   ├── NavigationBar (Sticky glass blur, brand logo, routes, calendar CTA)
│   └── MobileDrawer (Full-screen overlay menu with staggered link animations)
├── hero/
│   ├── HeroHeadline ("Beyond Seen Into Felt")
│   ├── HeroActions (Book Appointment & Showreel trigger)
│   └── ClientMarquee (8 brand logos in infinite smooth scroll)
├── showreel/
│   ├── VideoPlayer (Custom controls, sound toggle, full-screen trigger)
│   └── BrandManifesto ("Not an agency — A Haus where creativity, media and tech converge")
├── value-pillars/
│   └── PillarCards (4 core principles: Creative Meets Strategy, Trusted by Visionaries, etc.)
├── services/
│   ├── BentoGrid (6 interactive service cards with glowing border hover effect)
│   └── CapabilityChips (FPV drone, CGI/VFX, Billboard 3D, Real-time data)
├── metrics/
│   └── StatCounters (Animated counter tick for 280%, 95%, 5K+)
├── faqs/
│   └── AccordionGroup (Accessible, smooth toggle with complete Q&A text)
├── contact/
│   ├── InquiryForm (First/Last Name, Email, Phone with +971 selector, Business details)
│   └── DirectBookingCard (Google Calendar direct embed or link card)
└── footer/
    ├── PreFooterCTA ("Where Stories Become Legacies")
    └── FooterBar (Social icons, copyright, legal disclaimer)
```

---

## 4. Key Links & Endpoints to Wire Up

When the rebuild is implemented, ensure these endpoints are wired:
- **Discovery Booking**: `https://calendar.app.google/49AJM36qdqkp8zaG6`
- **Official Mail**: `mailto:info@hekayahaus.com`
- **LinkedIn**: `https://www.linkedin.com/company/hekayahaus-fzc-llc/`
- **Instagram**: `https://www.instagram.com/hekayahaus/`
- **Showreel YouTube Video**: `https://youtu.be/2_CSwS6nG6o`
- **Portfolio Playlist**: `https://www.youtube.com/playlist?list=PLk53-jXewhhfX-5Pxq_Ywe3ByEmBkgEgJ`

---

## 5. Next Steps for Pair Programming

When you are ready to build:
1. Paste your design notes, preferred wireframes, or new layout instructions.
2. Confirm the preferred tech stack (Vite/React or Next.js or Vanilla HTML/CSS/JS).
3. The agent will initialize the project, scaffold the components, plug in the verified copy from [`PAGES_AND_CONTENT.md`](file:///e:/hekaya%20haus/PAGES_AND_CONTENT.md), inject the media assets from [`ASSETS_AND_MEDIA.md`](file:///e:/hekaya%20haus/ASSETS_AND_MEDIA.md), and implement the advanced animations.
