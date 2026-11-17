// Videos are NEVER stored in this repo (see CLAUDE.md). They stream from an external host at full quality.
// Add a provider here to switch hosts (e.g. Vimeo, Mux, Cloudflare Stream) without touching components.
import type { MediaName } from './media.generated';

export type VideoProvider = 'youtube' | 'vimeo' | 'iframe';

export interface ExternalVideo {
  id: string;
  title: string;
  provider: VideoProvider;
  /** YouTube/Vimeo video id, or a full embeddable URL for provider 'iframe'. */
  ref: string;
  /** Lightweight local poster image (thumbnail only). */
  poster: MediaName;
  watchUrl: string;
}

export const VIDEOS = {
  showreel: {
    id: 'showreel',
    title: 'HekayaHaus Showreel',
    provider: 'youtube',
    ref: '2_CSwS6nG6o',
    poster: 'showreel-poster',
    watchUrl: 'https://youtu.be/2_CSwS6nG6o',
  },
} satisfies Record<string, ExternalVideo>;

export function embedUrl(v: ExternalVideo): string {
  switch (v.provider) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${v.ref}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${v.ref}?autoplay=1&title=0&byline=0&portrait=0&quality=auto`;
    default:
      return v.ref;
  }
}
