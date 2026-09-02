import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { SITE_INFO } from '../../data/siteContent';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { label: 'WORK', href: '/#work' },
    { label: 'SOLUTIONS', href: '/allserviceshekayahaus' },
    { label: 'INDUSTRIES', href: '/#industries' },
    { label: 'ABOUT HAUS', href: '/#about' },
    { label: 'INSIGHTS & BLOGS', href: '/blogs' },
    { label: 'CONTACT US', href: '/contact-us' },
  ];

  return (
    <div className="mobile-drawer-overlay" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <div className="mobile-drawer-header">
        <div className="brand-lockup">
          <span className="brand-name">HEKAYAHAUS</span>
          <span className="brand-tagline">BEYOND SEEN. INTO FELT.</span>
        </div>
        <button onClick={onClose} className="drawer-close-btn" aria-label="Close navigation menu">
          <X size={26} />
        </button>
      </div>

      <nav className="mobile-nav-content">
        <ul className="mobile-links-list">
          {links.map((link, idx) => (
            <li key={link.label} className="mobile-link-item">
              <span className="link-num">0{idx + 1}</span>
              <Link to={link.href} onClick={onClose} className="mobile-nav-anchor">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-footer">
          <a
            href={SITE_INFO.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-full"
            onClick={onClose}
          >
            <span>BOOK A DISCOVERY CALL</span>
            <ArrowUpRight size={18} />
          </a>

          <div className="mobile-contact-meta">
            <div className="meta-row">
              <Mail size={16} className="text-blue" />
              <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>
            </div>
            <div className="meta-row">
              <MapPin size={16} className="text-blue" />
              <span>{SITE_INFO.location}</span>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background-color: var(--color-navy);
          color: var(--color-text-inverse);
          display: flex;
          flex-direction: column;
          padding: 1.5rem var(--container-pad);
          overflow-y: auto;
          animation: drawerFadeIn 0.3s ease forwards;
        }

        @keyframes drawerFadeIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-border-inverse);
        }

        .mobile-drawer-header .brand-name {
          color: #FFFFFF;
        }

        .drawer-close-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          border: 1px solid var(--color-border-inverse);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .drawer-close-btn:hover {
          border-color: var(--color-blue);
          color: var(--color-blue);
        }

        .mobile-nav-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 2.5rem;
          padding-bottom: 2rem;
        }

        .mobile-links-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-link-item {
          display: flex;
          align-items: baseline;
          gap: 1rem;
        }

        .link-num {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-blue);
          letter-spacing: 0.1em;
        }

        .mobile-nav-anchor {
          font-family: var(--font-display);
          font-size: clamp(2rem, 8vw, 3rem);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .mobile-nav-anchor:hover {
          color: var(--color-blue);
        }

        .mobile-menu-footer {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .btn-full {
          width: 100%;
          padding: 1.1rem;
        }

        .mobile-contact-meta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--color-muted-inverse);
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
      `}</style>
    </div>
  );
};
