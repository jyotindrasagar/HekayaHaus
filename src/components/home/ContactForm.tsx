import { useRef, useState } from 'react';
import { SITE } from '../../data/site';
import { PILLARS } from '../../data/services';
import { Button } from '../ui/Buttons';

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';
interface Fields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company_site: string; // honeypot
}
const EMPTY: Fields = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '', company_site: '' };

const SERVICE_OPTIONS = [...PILLARS.map((p) => p.name), 'Not sure yet — help me decide'];

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (!f.lastName.trim()) e.lastName = 'Please enter your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!/^\+?[0-9\s()-]{7,20}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number, e.g. +971 …';
  if (f.message.trim().length < 10) e.message = 'Tell us a little about your business (at least 10 characters).';
  if (f.message.length > 4000) e.message = 'Please keep this under 4,000 characters.';
  return e;
}

function mailtoFor(f: Fields) {
  const body = `Name: ${f.firstName} ${f.lastName}\nEmail: ${f.email}\nPhone: ${f.phone}\nInterested in: ${f.service || '—'}\n\n${f.message}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(`Project inquiry — ${f.firstName} ${f.lastName}`)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ compact }: { compact?: boolean }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return; // duplicate-submission guard
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, elapsed: Date.now() - startedAt.current }),
      });
      if (res.ok) {
        setStatus('sent');
        setF(EMPTY);
      } else if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors ?? {});
        setStatus('idle');
      } else {
        // Endpoint not configured / unavailable — never pretend it was sent.
        setStatus('fallback');
      }
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
        <p className="eyebrow">Message received</p>
        <h3 className="display-m">Thank you for reaching out.</h3>
        <p>Your story has reached the right place. Someone from our team will be in touch shortly.</p>
        <Button href={SITE.calendar} external>Book a discovery call</Button>
      </div>
    );
  }

  const field = (k: keyof Fields, label: string, input: React.ReactNode) => (
    <div className={`field ${errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={`cf-${k}`}>{label}</label>
      {input}
      {errors[k] && (
        <p className="field-error" id={`cf-${k}-err`}>
          {errors[k]}
        </p>
      )}
    </div>
  );
  const aria = (k: keyof Fields) => ({ id: `cf-${k}`, name: k, 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `cf-${k}-err` : undefined });

  return (
    <form className={`contact-form ${compact ? 'compact' : ''}`} onSubmit={submit} noValidate>
      <div className="field-row">
        {field('firstName', 'First name', <input {...aria('firstName')} autoComplete="given-name" value={f.firstName} onChange={set('firstName')} required />)}
        {field('lastName', 'Last name', <input {...aria('lastName')} autoComplete="family-name" value={f.lastName} onChange={set('lastName')} required />)}
      </div>
      <div className="field-row">
        {field('email', 'Email', <input {...aria('email')} type="email" autoComplete="email" value={f.email} onChange={set('email')} required />)}
        {field('phone', 'Phone number', <input {...aria('phone')} type="tel" autoComplete="tel" placeholder="+971" value={f.phone} onChange={set('phone')} required />)}
      </div>
      {field(
        'service',
        'What do you need help with?',
        <select {...aria('service')} value={f.service} onChange={set('service')}>
          <option value="">Choose a discipline (optional)</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>,
      )}
      {field(
        'message',
        'Tell us about your business, your website and socials?',
        <textarea {...aria('message')} rows={compact ? 4 : 5} placeholder="What does your business sell or offer?" value={f.message} onChange={set('message')} required />,
      )}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-company_site">Leave this field empty</label>
        <input id="cf-company_site" name="company_site" tabIndex={-1} autoComplete="off" value={f.company_site} onChange={set('company_site')} />
      </div>
      <div className="form-actions">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Start the conversation'}
        </Button>
        <p className="form-note">
          Your information stays with our team. We’ll review your enquiry and get back to you.
        </p>
      </div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="form-status">
        {status === 'fallback' && (
          <div className="form-fallback" role="alert">
            <p>
              We couldn’t send this from the website right now. Your message is still here — send it by email in one
              click and it will reach the team directly.
            </p>
            <a className="btn btn-primary btn-sm" href={mailtoFor(f)}>
              <span className="btn-label">Email {SITE.email}</span>
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
