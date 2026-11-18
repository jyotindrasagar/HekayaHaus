import { useRef, useState } from 'react';
import { SITE } from '../../data/site';
import { Button } from '../ui/Buttons';

export const DEPARTMENTS = [
  'Creative & Content Production',
  'Videography & Photography',
  'Video Editing & Post-production',
  'Graphic Design & Branding',
  'Social Media & Marketing',
  'Performance & Digital Marketing',
  'Sales & Business Development',
  'PR & Influencer Marketing',
  'Web Development & Software',
  'AI & Automation',
  'Project Management & Operations',
  'Internships & Graduate Opportunities',
];
const TYPES = ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Collaboration'];
const MAX_TOTAL = 3.5 * 1024 * 1024; // keeps the request under the serverless body limit
const CV_TYPES = '.pdf,.doc,.docx';
const PORTFOLIO_TYPES = '.pdf,.jpg,.jpeg,.png,.webp,.zip';

type F = Record<
  | 'fullName' | 'email' | 'phone' | 'location' | 'linkedin' | 'portfolioUrl'
  | 'position' | 'employmentType' | 'experience' | 'availability' | 'compensation'
  | 'why' | 'fit' | 'proud' | 'website_url',
  string
>;
const EMPTY: F = {
  fullName: '', email: '', phone: '', location: '', linkedin: '', portfolioUrl: '',
  position: '', employmentType: '', experience: '', availability: '', compensation: '',
  why: '', fit: '', proud: '', website_url: '',
};

const readB64 = (file: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(',')[1] ?? '');
    r.onerror = rej;
    r.readAsDataURL(file);
  });

export function ApplicationForm({ defaultPosition = '' }: { defaultPosition?: string }) {
  const [f, setF] = useState<F>({ ...EMPTY, position: defaultPosition });
  const [cv, setCv] = useState<File | null>(null);
  const [work, setWork] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof F | 'cv' | 'files', string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!f.fullName.trim()) e.fullName = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
    if (!/^\+?[0-9\s()-]{7,20}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone / WhatsApp number.';
    if (!f.location.trim()) e.location = 'Where are you based?';
    if (!f.position) e.position = 'Choose the area you’re interested in.';
    if (!f.employmentType) e.employmentType = 'Choose an employment type.';
    if (f.why.trim().length < 10) e.why = 'Tell us a little about why HekayaHaus.';
    if (!cv) e.cv = 'Please attach your CV / resume.';
    if ((cv?.size ?? 0) + (work?.size ?? 0) > MAX_TOTAL)
      e.files = 'Attachments must total under 3.5 MB. Add a portfolio link above for larger work.';
    return e;
  };

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (inFlight.current) return;
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (ev.currentTarget.elements.namedItem(first === 'files' ? 'cv' : first) as HTMLElement | null)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus('sending');
    try {
      const attachments = [];
      if (cv) attachments.push({ filename: cv.name, content: await readB64(cv) });
      if (work) attachments.push({ filename: work.name, content: await readB64(work) });
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, attachments, elapsed: Date.now() - startedAt.current }),
      });
      if (res.ok) {
        setStatus('sent');
        setF(EMPTY);
        setCv(null);
        setWork(null);
      } else if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors ?? {});
        setStatus('idle');
      } else setStatus('fallback');
    } catch {
      setStatus('fallback');
    } finally {
      inFlight.current = false;
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  if (status === 'sent') {
    return (
      <div className="form-done" ref={statusRef} tabIndex={-1} role="status">
        <p className="eyebrow">Application received</p>
        <h3 className="display-m">Thank you for applying.</h3>
        <p>We appreciate the time you took to apply. Our team will review your application and contact you if there’s a suitable opportunity.</p>
      </div>
    );
  }

  const err = (k: keyof typeof errors) =>
    errors[k] ? (
      <p className="field-error" id={`af-${k}-err`}>
        {errors[k]}
      </p>
    ) : null;
  const a = (k: keyof F) => ({ id: `af-${k}`, name: k, value: f[k], onChange: set(k), 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `af-${k}-err` : undefined });
  const field = (k: keyof F, label: string, input: React.ReactNode, optional?: boolean) => (
    <div className={`field ${errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={`af-${k}`}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {input}
      {err(k)}
    </div>
  );

  const mailBody = `Application — ${f.position || 'HekayaHaus'}\n\nName: ${f.fullName}\nEmail: ${f.email}\nPhone/WhatsApp: ${f.phone}\nLocation: ${f.location}\nLinkedIn: ${f.linkedin}\nPortfolio: ${f.portfolioUrl}\nType: ${f.employmentType}\nExperience: ${f.experience}\nAvailability: ${f.availability}\nCompensation: ${f.compensation}\n\nWhy HekayaHaus?\n${f.why}\n\nWhy a good fit?\n${f.fit}\n\nProud of:\n${f.proud}\n\n(Please attach your CV and portfolio to this email.)`;

  return (
    <form className="contact-form app-form" onSubmit={submit} noValidate>
      <fieldset>
        <legend>Personal details</legend>
        <div className="field-row">
          {field('fullName', 'Full name', <input {...a('fullName')} autoComplete="name" required />)}
          {field('email', 'Email address', <input {...a('email')} type="email" autoComplete="email" required />)}
        </div>
        <div className="field-row">
          {field('phone', 'Phone / WhatsApp', <input {...a('phone')} type="tel" autoComplete="tel" placeholder="+971" required />)}
          {field('location', 'Current location', <input {...a('location')} autoComplete="address-level2" required />)}
        </div>
        <div className="field-row">
          {field('linkedin', 'LinkedIn profile', <input {...a('linkedin')} type="url" placeholder="https://" />, true)}
          {field('portfolioUrl', 'Portfolio / website', <input {...a('portfolioUrl')} type="url" placeholder="https://" />, true)}
        </div>
      </fieldset>
      <fieldset>
        <legend>Your opportunity</legend>
        <div className="field-row">
          {field(
            'position',
            'Position / department',
            <select {...a('position')} required>
              <option value="">Choose one</option>
              {DEPARTMENTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>,
          )}
          {field(
            'employmentType',
            'Employment type',
            <select {...a('employmentType')} required>
              <option value="">Choose one</option>
              {TYPES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>,
          )}
        </div>
        <div className="field-row field-row-3">
          {field('experience', 'Years of experience', <input {...a('experience')} inputMode="numeric" />, true)}
          {field('availability', 'Current availability', <input {...a('availability')} placeholder="e.g. Immediately, 1 month" />, true)}
          {field('compensation', 'Expected salary / compensation', <input {...a('compensation')} />, true)}
        </div>
      </fieldset>
      <fieldset>
        <legend>A little about you</legend>
        {field('why', 'Why HekayaHaus?', <textarea {...a('why')} rows={3} required />)}
        {field('fit', 'What makes you a good fit for this opportunity?', <textarea {...a('fit')} rows={3} />, true)}
        {field('proud', 'What is something you’ve created or accomplished that you’re proud of?', <textarea {...a('proud')} rows={3} />, true)}
      </fieldset>
      <fieldset>
        <legend>Attachments</legend>
        <div className="field-row">
          <div className={`field file-field ${errors.cv ? 'has-error' : ''}`}>
            <label htmlFor="af-cv">Upload your CV / resume</label>
            <input id="af-cv" name="cv" type="file" accept={CV_TYPES} onChange={(e) => { setCv(e.target.files?.[0] ?? null); setErrors((p) => ({ ...p, cv: undefined, files: undefined })); }} aria-invalid={!!errors.cv || undefined} />
            <span className="file-hint">PDF or Word</span>
            {err('cv')}
          </div>
          <div className="field file-field">
            <label htmlFor="af-work">
              Upload portfolio / relevant work <span className="opt">(optional)</span>
            </label>
            <input id="af-work" name="work" type="file" accept={PORTFOLIO_TYPES} onChange={(e) => { setWork(e.target.files?.[0] ?? null); setErrors((p) => ({ ...p, files: undefined })); }} />
            <span className="file-hint">PDF, image or ZIP · total under 3.5 MB — use the portfolio link for larger work</span>
          </div>
        </div>
        {err('files')}
      </fieldset>
      <div className="hp" aria-hidden="true">
        <label htmlFor="af-website_url">Leave this field empty</label>
        <input id="af-website_url" name="website_url" tabIndex={-1} autoComplete="off" value={f.website_url} onChange={set('website_url')} />
      </div>
      <div className="form-actions">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send my application'}
        </Button>
        <p className="form-note">
          Prefer email? Send your profile directly to <a href={`mailto:${SITE.hrEmail}`}>{SITE.hrEmail}</a>.
        </p>
      </div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="form-status">
        {status === 'fallback' && (
          <div className="form-fallback" role="alert">
            <p>
              We couldn’t send this from the website right now. Your answers are still here — send them by email in one
              click and attach your CV.
            </p>
            <a className="btn btn-primary btn-sm" href={`mailto:${SITE.hrEmail}?subject=${encodeURIComponent(`Application — ${f.position || 'HekayaHaus'} — ${f.fullName}`)}&body=${encodeURIComponent(mailBody)}`}>
              <span className="btn-label">Email {SITE.hrEmail}</span>
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
