import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { embedUrl, type ExternalVideo } from '../../data/videos';
import { Img } from './Img';
import { PlayIcon } from './Buttons';

function Frame({ video }: { video: ExternalVideo }) {
  return (
    <iframe
      src={embedUrl(video)}
      title={video.title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

/** Full-screen cinema overlay with focus management and Esc-to-close. */
export function Theatre({ video, onClose }: { video: ExternalVideo; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('no-scroll');
      prev?.focus();
    };
  }, []);
  return createPortal(
    <div className="theatre" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <button ref={closeRef} type="button" className="theatre-close" onClick={onClose}>
        Close <span aria-hidden="true">✕</span>
      </button>
      <div className="theatre-frame" onClick={(e) => e.stopPropagation()}>
        <Frame video={video} />
      </div>
    </div>,
    document.body,
  );
}

/**
 * External-host video player. The heavy video is never bundled: until the visitor presses play only a
 * lightweight local poster is shown, then the provider's player (YouTube/Vimeo/…) streams at full quality.
 */
export function VideoPlayer({ video, label = 'Play showreel', className = '' }: { video: ExternalVideo; label?: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [theatre, setTheatre] = useState(false);
  const host = video.provider === 'youtube' ? 'YouTube' : video.provider === 'vimeo' ? 'Vimeo' : 'host';

  return (
    <div className={`video ${playing ? 'is-playing' : ''} ${className}`}>
      <div className="video-stage">
        {playing && !theatre ? (
          <div className="video-frame">
            <Frame video={video} />
          </div>
        ) : (
          <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={`${label}: ${video.title}`}>
            <Img name={video.poster} sizes="(min-width: 1200px) 86vw, 100vw" decorative />
            <span className="video-play">
              <span className="video-play-disc">
                <PlayIcon />
              </span>
              <span className="video-play-label">{label}</span>
            </span>
          </button>
        )}
      </div>
      <div className="video-bar">
        <span className="video-title">{video.title}</span>
        <span className="video-bar-actions">
          {playing ? (
            <button type="button" onClick={() => setPlaying(false)}>Stop</button>
          ) : (
            <button type="button" onClick={() => setPlaying(true)}>Play</button>
          )}
          <button type="button" onClick={() => { setPlaying(false); setTheatre(true); }}>Full screen</button>
          <a href={video.watchUrl} target="_blank" rel="noopener noreferrer">Watch on {host}</a>
        </span>
      </div>
      {theatre && <Theatre video={video} onClose={() => setTheatre(false)} />}
    </div>
  );
}
