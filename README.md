# HekayaHaus — website

**Beyond seen. Into felt.** Cinematic site for HekayaHaus FZC-LLC (Dubai): media production, marketing & branding,
technology. Vite + React 19 + TypeScript, GSAP/ScrollTrigger, Lenis, three.js / React Three Fiber.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, build, prerender per-route <head> tags + sitemap.xml
npm run preview  # serve the production build
npm run media    # regenerate responsive WebP images from public/assets (needs Python + Pillow)
```

## Structure
- `src/data/` — all business content (verified, from `PAGES_AND_CONTENT.md` etc.): `site.ts`, `services.ts`
  (3 pillars + 6 legacy service pages), `work.ts` (portfolio), `videos.ts` (external video sources), `seo.ts`.
- `src/components/home/` — homepage sections; `layout/` — header, mobile nav, footer, scroll FX; `three/` — WebGL scenes;
  `ui/` — Img, Reveal/SplitText, Buttons, FAQ, VideoPlayer.
- `src/pages/` — code-split routes. Legacy URLs (`/media-production-dubai`, `/contact-us`, `/blogs`, …) are preserved.
- `api/contact.ts` — Vercel serverless endpoint for the inquiry form.

## Video (important)
Videos are **never** stored in this repo. They stream at full quality from an external host (YouTube today).
Add or swap sources in `src/data/videos.ts` (YouTube, Vimeo or any embeddable player URL). Only small poster images live locally.

## Contact form — one setup step
Set **one** of these in Vercel → Project → Settings → Environment Variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Email delivery via Resend. Optional `CONTACT_FROM_EMAIL` (verified sender), `CONTACT_TO_EMAIL` (default `info@hekayahaus.com`). |
| `CONTACT_WEBHOOK_URL` | POST each inquiry as JSON to Zapier / Make / n8n / a CRM. |

The careers form posts to `api/apply.ts` (CV + portfolio attachments, ≤3.5 MB total) → `RESEND_API_KEY` (to
`CAREERS_TO_EMAIL`, default hr@hekayahaus.com) or `CONTACT_WEBHOOK_URL` (JSON incl. base64 attachments).

Until one is set, the form validates, then tells the visitor it couldn't send and offers a one-click pre-filled email
to info@hekayahaus.com — it never fakes a success. Spam protection: honeypot, minimum fill time, per-IP rate limit.

## Performance & 3D
WebGL scenes load lazily after first paint, only on capable devices (quality tiers: high / balanced / low via
`src/lib/quality.ts`), pause off-screen, cap DPR, drop resolution under load, dispose resources and fall back to the
static CSS composition on context loss, reduced motion or Save-Data. All content works without WebGL or JavaScript animation.
