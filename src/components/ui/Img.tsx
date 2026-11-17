import { useEffect, useRef, useState } from 'react';
import { MEDIA, type MediaName } from '../../data/media.generated';

interface ImgProps {
  name: MediaName;
  sizes?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  /** Hide from assistive tech when purely decorative. */
  decorative?: boolean;
}

export const srcFor = (name: MediaName, width = 1440) => {
  const m = MEDIA[name];
  const w = [...m.widths].reverse().find((x) => x <= width) ?? m.widths[0];
  return `/media/img/${name}-${w}.webp`;
};

export function Img({ name, sizes = '100vw', alt, className, priority, style, decorative }: ImgProps) {
  const m = MEDIA[name];
  const srcSet = m.widths.map((w) => `/media/img/${name}-${w}.webp ${w}w`).join(', ');
  const fallback = `/media/img/${name}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`;
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, [name]);
  return (
    <img
      ref={ref}
      onLoad={() => setLoaded(true)}
      className={`img-l ${loaded ? 'is-loaded' : ''} ${className ?? ''}`}
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={decorative ? '' : (alt ?? m.alt)}
      aria-hidden={decorative || undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // @ts-expect-error fetchpriority is valid HTML, React 19 passes it through
      fetchpriority={priority ? 'high' : undefined}
      style={{ backgroundImage: `url(${m.blur})`, backgroundSize: 'cover', ...style }}
    />
  );
}
