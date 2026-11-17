/**
 * Vercel serverless endpoint for the inquiry form.
 *
 * Delivery (configure ONE in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY        – sends an email via Resend (free tier). Optional CONTACT_FROM_EMAIL
 *                           (verified sender, default "HekayaHaus Website <onboarding@resend.dev>").
 *   CONTACT_WEBHOOK_URL   – POSTs the inquiry JSON to any webhook (Zapier, Make, n8n, CRM, Slack…).
 *   CONTACT_TO_EMAIL      – recipient for Resend, default info@hekayahaus.com.
 *
 * Without either, the endpoint returns 503 and the form offers a pre-filled email instead —
 * it never pretends a message was delivered.
 */

type Req = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Res = { status: (c: number) => Res; json: (b: unknown) => void; setHeader: (k: string, v: string) => void };

const hits = new Map<string, number[]>(); // best-effort per-instance rate limit

const clean = (v: unknown, max: number) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}) as Record<string, unknown>;

  // Spam protection: honeypot + minimum fill time + rate limit.
  if (clean(body.company_site, 200)) return res.status(200).json({ ok: true });
  if (Number(body.elapsed) < 2500) return res.status(429).json({ error: 'too_fast' });
  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return res.status(429).json({ error: 'rate_limited' });
  hits.set(ip, [...recent, now]);

  const data = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 160),
    phone: clean(body.phone, 30),
    service: clean(body.service, 120),
    message: clean(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  if (!data.firstName) errors.firstName = 'Please enter your first name.';
  if (!data.lastName) errors.lastName = 'Please enter your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (!/^\+?[0-9\s()-]{7,20}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number.';
  if (data.message.length < 10) errors.message = 'Tell us a little more about your project.';
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const to = process.env.CONTACT_TO_EMAIL || 'info@hekayahaus.com';
  const subject = `New inquiry — ${data.firstName} ${data.lastName}${data.service ? ` · ${data.service}` : ''}`;

  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'HekayaHaus Website <onboarding@resend.dev>',
          to: [to],
          reply_to: data.email,
          subject,
          html: `<h2>${esc(subject)}</h2>
            <p><b>Name:</b> ${esc(data.firstName)} ${esc(data.lastName)}<br/>
            <b>Email:</b> ${esc(data.email)}<br/><b>Phone:</b> ${esc(data.phone)}<br/>
            <b>Interested in:</b> ${esc(data.service || '—')}</p>
            <p style="white-space:pre-wrap">${esc(data.message)}</p>`,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return res.status(200).json({ ok: true });
    }
    if (process.env.CONTACT_WEBHOOK_URL) {
      const r = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, subject, source: 'hekayahaus.com', receivedAt: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      return res.status(200).json({ ok: true });
    }
    return res.status(503).json({ error: 'not_configured' });
  } catch (err) {
    console.error('contact delivery failed', err);
    return res.status(502).json({ error: 'delivery_failed' });
  }
}
