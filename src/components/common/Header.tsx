import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';
import { SITE_INFO } from '../../data/siteContent';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  isDarkSection?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, isDarkSection = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '/#work' },
    { label: 'SOLUTIONS', href: '/allserviceshekayahaus' },
    { label: 'INDUSTRIES', href: '/#industries' },
    { label: 'ABOUT', href: '/#about' },
    { label: 'INSIGHTS', href: '/blogs' },
  ];

  return (
    <header
      className={`site-header ${isScrolled ? 'scrolled' : ''} ${isDarkSection ? 'nav-inverse' : ''}`}
      role="banner"
    >
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-link" aria-label="HekayaHaus Home">
          <div className="brand-lockup">
            <span className="brand-name">HEKAYAHAUS</span>
            <span className="brand-tagline">BEYOND SEEN. INTO FELT.</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-list">
            {navLinks.map((item) => (
              <li key={item.label} className="nav-item">
                {item.href.startsWith('/#') && location.pathname === '/' ? (
                  <a href={item.href.replace('/', '')} className="nav-link">
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.href} className="nav-link">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA & Menu Controls */}
        <div className="header-actions">
          <a
            href={SITE_INFO.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm header-cta"
            aria-label="Book a Discovery Call"
          >
            <span>BOOK A CALL</span>
            <ArrowUpRight className="btn-icon btn-icon-arrow" size={16} />
          </a>

          <button
            onClick={onOpenMobileMenu}
            className="mobile-menu-trigger"
            aria-label="Open Navigation Menu"
            aria-expanded="false"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .brand-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .brand-lockup {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--color-text);
          line-height: 1;
        }

        .nav-inverse .brand-name {
          color: var(--color-text-inverse);
        }

        .brand-tagline {
          font-family: var(--font-body);
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--color-blue);
          text-transform: uppercase;
          margin-top: 3px;
        }

        .desktop-nav {
          display: none;
        }

        @media (min-width: 900px) {
          .desktop-nav {
            display: block;
          }
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }

        .nav-link {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--color-text);
          transition: color var(--transition-fast);
          position: relative;
          padding: 0.25rem 0;
        }

        .nav-inverse .nav-link {
          color: var(--color-text-inverse);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background-color: var(--color-blue);
          transition: width var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--color-blue);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-sm {
          padding: 0.65rem 1.25rem;
          font-size: 0.8125rem;
        }

        .header-cta {
          display: none;
        }

        @media (min-width: 640px) {
          .header-cta {
            display: inline-flex;
          }
        }

        .mobile-menu-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          background: var(--color-surface);
          transition: all var(--transition-fast);
        }

        .nav-inverse .mobile-menu-trigger {
          border-color: var(--color-border-inverse);
          color: var(--color-text-inverse);
          background: rgba(255, 255, 255, 0.08);
        }

        .mobile-menu-trigger:hover {
          border-color: var(--color-blue);
          color: var(--color-blue);
        }

        @media (min-width: 900px) {
          .mobile-menu-trigger {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
