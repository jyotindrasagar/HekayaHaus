import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '../../data/siteContent';

export const InsightsSection: React.FC = () => {
  return (
    <section id="insights" className="section section-ivory insights-section" aria-label="Insights and Resources">
      <div className="container">
        {/* Header */}
        <div className="insights-header">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>PERSPECTIVES &amp; ANALYSIS</span>
            </div>
            <h2 className="section-title">
              INSIGHTS <span className="text-blue editorial-italic">&amp; RESOURCES.</span>
            </h2>
          </div>
          <div className="insights-header-right">
            <p className="insights-subtext">
              Ideas, strategic analysis, and technical essays from the HekayaHaus creative leadership.
            </p>
            <Link to="/blogs" className="btn btn-secondary">
              <span>VIEW ALL INSIGHTS</span>
              <ArrowUpRight className="btn-icon btn-icon-arrow" size={16} />
            </Link>
          </div>
        </div>

        {/* 3 Magazine-Cover Cards */}
        <div className="insights-grid">
          {INSIGHTS_ARTICLES.map((article) => (
            <article key={article.id} className="insight-magazine-card">
              <Link to="/blogs" className="card-media-frame" tabIndex={-1}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="card-media-img"
                  loading="lazy"
                />
                <span className="card-category-badge">{article.category}</span>
              </Link>

              <div className="card-content-body">
                <div className="card-meta-line">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="card-article-title">
                  <Link to="/blogs">{article.title}</Link>
                </h3>

                <p className="card-article-excerpt">{article.excerpt}</p>

                <Link to="/blogs" className="card-read-link">
                  <span>Read Article</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .insights-section {
          border-bottom: 1px solid var(--color-border);
        }

        .insights-header {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
          align-items: flex-end;
        }

        @media (min-width: 900px) {
          .insights-header {
            grid-template-columns: 1.2fr 0.8fr;
            justify-content: space-between;
          }
        }

        .insights-subtext {
          font-size: 1.05rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .insights-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }

        .insight-magazine-card {
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          transition: all var(--transition-normal);
        }

        .insight-magazine-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-blue);
          box-shadow: 0 16px 36px rgba(23, 70, 255, 0.08);
        }

        .card-media-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #000;
        }

        .card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .insight-magazine-card:hover .card-media-img {
          transform: scale(1.05);
        }

        .card-category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(8, 21, 47, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .card-content-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-meta-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-muted);
          margin-bottom: 0.75rem;
        }

        .card-article-title {
          font-family: var(--font-display);
          font-size: 1.45rem;
          line-height: 1.25;
          margin-bottom: 0.75rem;
        }

        .card-article-title a {
          color: var(--color-text);
          transition: color var(--transition-fast);
        }

        .card-article-title a:hover {
          color: var(--color-blue);
        }

        .card-article-excerpt {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--color-muted);
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .card-read-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-blue);
          margin-top: auto;
          transition: gap var(--transition-fast);
        }

        .card-read-link:hover {
          gap: 0.65rem;
        }
      `}</style>
    </section>
  );
};
