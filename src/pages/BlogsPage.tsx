import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { INSIGHTS_ARTICLES, SITE_INFO } from '../data/siteContent';

const ALL_BLOG_POSTS = [
  ...INSIGHTS_ARTICLES,
  {
    id: 'luxury-hospitality-automotive-campaigns',
    category: 'LUXURY & AUTOMOTIVE',
    title: 'Luxury Hospitality & Automotive Visual Campaigns: Setting the Standard in the GCC',
    excerpt: 'Examining what sets high-conversion visual marketing apart for ultra-luxury brands across Dubai, Riyadh, and Doha.',
    readTime: '5 min read',
    image: '/assets/showcase/media_2.jpg',
    date: 'November 2025',
  },
  {
    id: 'fooh-viral-mechanics',
    category: 'CGI & VFX',
    title: 'CGI & Fake Out-Of-Home (FOOH) Viral Mechanics: The Engineering of Illusion',
    excerpt: 'How hyper-realistic 3D illusions in public spaces capture cultural attention and compound millions in earned media value.',
    readTime: '7 min read',
    image: '/assets/showcase/billboard.png',
    date: 'October 2025',
  },
  {
    id: 'production-trends-uae',
    category: 'PRODUCTION',
    title: 'Cinematic Video Production Trends in Dubai & the UAE for 2026',
    excerpt: 'From high-speed FPV cinematography to real-time LED virtual production stages—what leading producers are prioritizing.',
    readTime: '4 min read',
    image: '/assets/showcase/media_1.jpg',
    date: 'September 2025',
  },
];

export const BlogsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tags = ['ALL', 'STRATEGY', 'MARKETING & AI', 'PRODUCTION', 'CGI & VFX', 'LUXURY & AUTOMOTIVE'];

  const filteredPosts = ALL_BLOG_POSTS.filter((post) => {
    const matchesTag = selectedTag === 'ALL' || post.category.includes(selectedTag);
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <main className="blogs-page-wrapper">
      {/* Hero Header */}
      <section className="section section-ivory blogs-hero">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>EDITORIAL PERSPECTIVES</span>
          </div>
          <h1 className="hero-title">
            INSIGHTS <span className="text-blue editorial-italic">&amp; ARTICLES.</span>
          </h1>
          <p className="blogs-hero-sub">
            Explore analysis, production breakdowns, and strategic thinking on brand building, cinema-grade media, and AI from HekayaHaus.
          </p>

          {/* Tag Filter Bar */}
          <div className="blogs-filter-row">
            <div className="tag-chips-list">
              {tags.map((t) => (
                <button
                  key={t}
                  className={`filter-chip ${selectedTag === t ? 'active' : ''}`}
                  onClick={() => setSelectedTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="search-input-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section section-surface blogs-grid-section">
        <div className="container">
          <div className="blogs-article-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-card-editorial">
                <div className="blog-card-media">
                  <img src={post.image} alt={post.title} className="blog-card-img" loading="lazy" />
                  <span className="blog-card-badge">{post.category}</span>
                </div>

                <div className="blog-card-body">
                  <div className="blog-meta-row">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="blog-post-title">{post.title}</h2>
                  <p className="blog-post-excerpt">{post.excerpt}</p>

                  <a
                    href={`mailto:${SITE_INFO.email}?subject=Inquiry regarding: ${encodeURIComponent(post.title)}`}
                    className="blog-cta-link"
                  >
                    <span>Read Full Whitepaper</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="no-posts-found">
              <p>No articles found matching "{searchQuery}". Try selecting another category.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .blogs-hero {
          padding-top: clamp(7.5rem, 12vw, 10rem);
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
          border-bottom: 1px solid var(--color-border);
        }

        .blogs-hero-sub {
          font-size: clamp(1.1rem, 1.35vw, 1.25rem);
          color: var(--color-muted);
          line-height: 1.6;
          max-width: 760px;
          margin-top: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .blogs-filter-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .tag-chips-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-chip {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: var(--radius-pill);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-muted);
          transition: all var(--transition-fast);
        }

        .filter-chip:hover, .filter-chip.active {
          border-color: var(--color-blue);
          color: #FFFFFF;
          background: var(--color-blue);
        }

        .search-input-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-muted);
        }

        .search-field {
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          background: var(--color-surface);
          font-size: 0.875rem;
          color: var(--color-text);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .search-field:focus {
          border-color: var(--color-blue);
        }

        .blogs-article-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .blogs-article-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .blogs-article-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .blog-card-editorial {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-normal);
        }

        .blog-card-editorial:hover {
          border-color: var(--color-blue);
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(23, 70, 255, 0.08);
        }

        .blog-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #000;
        }

        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .blog-card-editorial:hover .blog-card-img {
          transform: scale(1.05);
        }

        .blog-card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(8, 21, 47, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .blog-card-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-muted);
          margin-bottom: 0.75rem;
        }

        .blog-post-title {
          font-family: var(--font-display);
          font-size: 1.55rem;
          line-height: 1.2;
          color: var(--color-text);
          margin-bottom: 0.75rem;
        }

        .blog-post-excerpt {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--color-muted);
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .blog-cta-link {
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

        .blog-cta-link:hover {
          gap: 0.65rem;
        }

        .no-posts-found {
          padding: 4rem 1rem;
          text-align: center;
          color: var(--color-muted);
          font-size: 1.05rem;
        }
      `}</style>
    </main>
  );
};
