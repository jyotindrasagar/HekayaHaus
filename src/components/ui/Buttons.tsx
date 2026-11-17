import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function ArrowIcon({ className = '', dir = 'right' }: { className?: string; dir?: 'right' | 'up-right' | 'down' }) {
  const rot = dir === 'up-right' ? -45 : dir === 'down' ? 90 : 0;
  return (
    <svg className={`icon-arrow ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
    </svg>
  );
}

interface BtnProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'light' | 'outline-light';
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

/** Button with a subtle magnetic pull on fine pointers. */
export function Button({ to, href, onClick, children, variant = 'primary', className = '', external, icon, type = 'button', disabled, ariaLabel }: BtnProps) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-icon">{icon ?? <ArrowIcon />}</span>
    </>
  );
  const common = { className: cls, onPointerMove: onMove, onPointerLeave: onLeave, 'aria-label': ariaLabel };
  if (to) return <Link ref={ref as React.Ref<HTMLAnchorElement>} to={to} {...common}>{inner}</Link>;
  if (href)
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...common} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} onClick={onClick} disabled={disabled} {...common}>
      {inner}
    </button>
  );
}

export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`text-link ${className}`}>
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</p>;
}
