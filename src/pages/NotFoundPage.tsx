import { Link } from 'react-router-dom';
import { Seo } from '../lib/seo';
import { Button } from '../components/ui/Buttons';
import { Img } from '../components/ui/Img';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found | HekayaHaus" description="This page doesn’t exist." noindex />
      <section className="not-found">
        <div className="not-found-bg" aria-hidden="true">
          <Img name="portrait-lightbulb-duo" sizes="100vw" decorative />
        </div>
        <div className="container not-found-inner">
          <p className="eyebrow eyebrow-light">404</p>
          <h1 className="display-xl">This story hasn’t been written yet.</h1>
          <p>The page you’re looking for has moved or never existed.</p>
          <div className="not-found-actions">
            <Button to="/" variant="light">Back to home</Button>
            <Link to="/work" className="text-link light"><span>See the work</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
