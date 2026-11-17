import type { ReactNode } from 'react';
import type { MediaName } from '../../data/media.generated';
import { Img } from '../ui/Img';
import { Reveal, SplitText } from '../ui/Reveal';
import { Breadcrumbs } from './Layout';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  accent?: string[];
  intro?: ReactNode;
  image?: MediaName;
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
  ticker?: string[];
}

/** Inner-page hero: editorial headline with an image that opens from a vertical slot. */
export function PageHero({ eyebrow, title, accent, intro, image, crumbs, children, ticker }: PageHeroProps) {
  return (
    <header className={`page-hero ${image ? 'has-image' : ''}`}>
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className="page-hero-grid">
          <div className="page-hero-copy">
            <p className="eyebrow hero-in">{eyebrow}</p>
            <SplitText as="h1" text={title} accent={accent} className="display-xl" immediate delay={80} />
            {intro && (
              <div className="page-hero-intro hero-in" style={{ '--d': '420ms' } as React.CSSProperties}>
                {intro}
              </div>
            )}
            {children && (
              <div className="page-hero-actions hero-in" style={{ '--d': '520ms' } as React.CSSProperties}>
                {children}
              </div>
            )}
          </div>
          {image && (
            <div className="page-hero-media hero-in hero-mask" style={{ '--d': '100ms' } as React.CSSProperties}>
              <Img name={image} sizes="(min-width: 1024px) 42vw, 100vw" priority />
            </div>
          )}
        </div>
      </div>
      {ticker && (
        <Reveal className="ticker" variant="fade">
          <div className="ticker-track" aria-label={ticker.join(', ')}>
            {[0, 1].map((k) => (
              <span key={k} aria-hidden={k === 1 || undefined}>
                {ticker.map((t) => (
                  <span key={t}>
                    {t}
                    <i aria-hidden="true">✦</i>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </Reveal>
      )}
    </header>
  );
}
