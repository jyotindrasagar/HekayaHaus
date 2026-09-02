import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { resolveRedirect } from '../data/redirectMap';
import { ArrowUpRight } from 'lucide-react';
import { SITE_INFO } from '../data/siteContent';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 301 URL migration resolution for legacy Framer paths
    const redirectTarget = resolveRedirect(location.pathname);
    if (redirectTarget) {
      navigate(redirectTarget, { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <main className="not-found-wrapper">
      <div className="container text-center not-found-container">
        <span className="not-found-num">404</span>
        <h1 className="hero-title not-found-title">
          PAGE NOT <span className="text-blue editorial-italic">LOCATED.</span>
        </h1>
        <p className="not-found-desc">
          The requested route does not exist or has been restructured within the new HekayaHaus digital architecture.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <span>RETURN TO HOMEPAGE</span>
            <ArrowUpRight size={16} />
          </Link>
          <a
            href={SITE_INFO.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <span>BOOK DISCOVERY CALL</span>
          </a>
        </div>
      </div>

      <style>{`
        .not-found-wrapper {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 0;
          background-color: var(--color-bg);
        }

        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 600px;
        }

        .not-found-num {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-blue);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .not-found-title {
          margin-bottom: 1.5rem;
        }

        .not-found-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--color-muted);
          margin-bottom: 2.5rem;
        }

        .not-found-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
      `}</style>
    </main>
  );
};
