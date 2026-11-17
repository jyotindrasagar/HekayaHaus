import { SITE } from '../../data/site';
import { VIDEOS } from '../../data/videos';
import { Reveal, SplitText } from '../ui/Reveal';
import { VideoPlayer } from '../ui/VideoPlayer';

export function Showreel() {
  return (
    <section className="showreel section dark" id="showreel" aria-labelledby="showreel-title">
      <div className="container">
        <div className="showreel-head">
          <Reveal as="p" className="eyebrow eyebrow-light">Showreel</Reveal>
          <SplitText as="h2" text="Watch the stories move." accent={['move']} className="display-l" />
          <Reveal as="p" className="showreel-note" delay={150}>
            Commercials, events, CGI and campaigns — the reel plays in full quality from our video host. For the
            complete portfolio, visit the{' '}
            <a href={SITE.socials.youtubePlaylist} target="_blank" rel="noopener noreferrer">
              HekayaHaus YouTube playlist
            </a>
            .
          </Reveal>
        </div>
        <Reveal variant="scale">
          <VideoPlayer video={VIDEOS.showreel} />
        </Reveal>
        <span id="showreel-title" className="sr-only">HekayaHaus showreel</span>
      </div>
    </section>
  );
}
