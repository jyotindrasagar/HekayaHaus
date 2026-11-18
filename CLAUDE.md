# HekayaHaus website — project rules

## Video & heavy media (hard rule)
- **Never** download, transcode, compress or commit video files (mp4, mov, webm, etc.) into this repo or `public/`.
- Videos are the agency's core product and are streamed at original quality from an external host/player
  (currently YouTube; Vimeo / Mux / Cloudflare Stream are drop-in via `src/data/videos.ts`).
- Only lightweight **poster images / thumbnails** for videos live locally (`public/media/img`).
- The player loads only after the visitor presses play (no autoplay with sound, no preloading).

## Locked design system
- Colours: `#F7F5EF` `#FFFEFA` `#0B0D12` `#555960` `#1746FF` `#0B2FCE` `#DCE5FF` `#08152F` `#D9D8D2` `#C7D4FF` `#FFFFFF` (see `src/styles/tokens.css`). No other hues.
- Fonts: Instrument Serif (display) + Manrope (UI/body), self-hosted via `@fontsource`. No other families.

## Content integrity
- Business facts come from `CONTEXT.md`, `PAGES_AND_CONTENT.md`, `CONTACT_AND_SOCIALS.md`, `ASSETS_AND_MEDIA.md`.
- Do not invent clients, metrics, testimonials, awards, articles, phone numbers or case-study results.
- Verified metrics: 200+ brands/clients (owner-confirmed), 280% video engagement, 95% client satisfaction, 5K+ projects.
- Contact: info@hekayahaus.com · WhatsApp +971 55 248 9492 · careers hr@hekayahaus.com (owner-supplied).
- Structure (owner brief): three pillars Marketing / Performance / Growth (`src/data/services.ts`); nav = Portfolio,
  What We Do, About, Contact, Join the Haus (Careers, University Partnerships, Mentorship & Collaborations); Insights
  lives in the footer; no Industries section. Press items in `FEATURES` (`src/data/site.ts`) — add links only when confirmed.
- Case studies (`src/data/work.ts`): Brief/Challenge/Thinking/Execution/Outcome render only when real data is filled in.

## Images
- Source archive: `public/assets/`. Run `python scripts/optimize_media.py` to regenerate responsive WebP in
  `public/media/img` and `src/data/media.generated.ts`. Use the `<Img>` component, never raw large files.

## Stack
Vite + React 19 + TypeScript, react-router 7, GSAP/ScrollTrigger, Lenis, three + @react-three/fiber (lazy, tiered),
Vercel (analytics, speed insights, `api/contact.ts` serverless form endpoint). `npm run build` also prerenders
per-route `<head>` tags and regenerates `sitemap.xml`.

## Git
Work directly on `main` (owner's instruction); push to `origin main`. No feature branches.
