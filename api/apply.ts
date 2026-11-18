/**
 * Vercel serverless endpoint for "Join the Haus" applications (with CV / portfolio attachments).
 *
 * Configure in Vercel → Project → Settings → Environment Variables:
 *   RESEND_API_KEY       – required to deliver applications with attachments (Resend).
 *   CAREERS_TO_EMAIL     – recipient, default hr@hekayahaus.com.
 *   CONTACT_FROM_EMAIL   – verified sender, default "HekayaHaus Website <onboarding@resend.dev>".
 *   CONTACT_WEBHOOK_URL  – optional alternative; receives the application JSON incl. base64 attachments.
 *
 * Without configuration it returns 503 and the form offers a pre-filled email to hr@hekayahaus.com instead.
 */
type Req = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Res = { status: (c: number) => Res; json: (b: unknown) => void; setHeader: (k: string, v: string) => void };

export const config = { api: { bodyParser: { sizeLimit: '4.5mb' } } };

const hits = new Map<string, number[]>();
const clean = (v: unknown, max: number) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const ALLOWED = /\.(pdf|docx?|jpe?g|png|webp|zip)$/i;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}) as Record<string, unknown>;

  if (clean(body.website_url, 200)) return res.status(200).json({ ok: true }); // honeypot
  if (Number(body.elapsed) < 4000) return res.status(429).json({ error: 'too_fast' });
  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 30 * 60_000);
  if (recent.length >= 3) return res.status(429).json({ error: 'rate_limited' });
  hits.set(ip, [...recent, now]);

  const keys = ['fullName', 'email', 'phone', 'location', 'linkedin', 'portfolioUrl', 'position', 'employmentType', 'experience', 'availability', 'compensation', 'why', 'fit', 'proud'] as const;
  const d = Object.fromEntries(keys.map((k) => [k, clean(body[k], k === 'why' || k === 'fit' || k === 'proud' ? 3000 : 300)])) as Record<(typeof keys)[number], string>;

  const errors: Record<string, string> = {};
  if (!d.fullName) errors.fullName = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = 'Please enter a valid email address.';
  if (!/^\+?[0-9\s()-]{7,20}$/.test(d.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!d.location) errors.location = 'Where are you based?';
  if (!d.position) errors.position = 'Choose the area you’re interested in.';
  if (!d.employmentType) errors.employmentType = 'Choose an employment type.';
  if (d.why.length < 10) errors.why = 'Tell us a little about why HekayaHaus.';

  const raw = Array.isArray(body.attachments) ? (body.attachments as { filename?: unknown; content?: unknown }[]).slice(0, 2) : [];
  const attachments = raw
    .map((a) => ({ filename: clean(a.filename, 120).replace(/[^\w.\- ]/g, '_'), content: String(a.content ?? '') }))
    .filter((a) => a.filename && ALLOWED.test(a.filename) && /^[A-Za-z0-9+/=]+$/.test(a.content));
  if (!attachments.length) errors.cv = 'Please attach your CV / resume.';
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const subject = `Application — ${d.position} — ${d.fullName}`;
  const rows = keys.map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#555960"><b>${k}</b></td><td style="white-space:pre-wrap">${esc(d[k] || '—')}</td></tr>`).join('');

  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'HekayaHaus Website <onboarding@resend.dev>',
          to: [process.env.CAREERS_TO_EMAIL || 'hr@hekayahaus.com'],
          reply_to: d.email,
          subject,
          html: `<h2>${esc(subject)}</h2><table>${rows}</table>`,
          attachments,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return res.status(200).json({ ok: true });
    }
    if (process.env.CONTACT_WEBHOOK_URL) {
      const r = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'application', ...d, subject, attachments /* base64 */, receivedAt: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      return res.status(200).json({ ok: true });
    }
    return res.status(503).json({ error: 'not_configured' });
  } catch (err) {
    console.error('application delivery failed', err);
    return res.status(502).json({ error: 'delivery_failed' });
  }
}
