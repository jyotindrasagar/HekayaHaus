import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import { SERVICE_PAGES } from './data/services';

// Inner pages are code-split; the homepage ships in the main bundle for the fastest first paint.
const ServicesHubPage = lazy(() => import('./pages/ServicesPages').then((m) => ({ default: m.ServicesHubPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServicesPages').then((m) => ({ default: m.ServiceDetailPage })));
const MediaPillar = lazy(() => import('./pages/ServicesPages').then((m) => ({ default: () => <m.PillarPage id="media-production" /> })));
const MarketingPillar = lazy(() => import('./pages/ServicesPages').then((m) => ({ default: () => <m.PillarPage id="marketing-branding" /> })));
const TechPillar = lazy(() => import('./pages/ServicesPages').then((m) => ({ default: () => <m.PillarPage id="technology" /> })));
const WorkIndexPage = lazy(() => import('./pages/WorkPages').then((m) => ({ default: m.WorkIndexPage })));
const ProjectPage = lazy(() => import('./pages/WorkPages').then((m) => ({ default: m.ProjectPage })));
const AboutPage = lazy(() => import('./pages/OtherPages').then((m) => ({ default: m.AboutPage })));
const InsightsPage = lazy(() => import('./pages/OtherPages').then((m) => ({ default: m.InsightsPage })));
const ContactPage = lazy(() => import('./pages/OtherPages').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/OtherPages').then((m) => ({ default: () => <m.LegalPage kind="privacy" /> })));
const TermsPage = lazy(() => import('./pages/OtherPages').then((m) => ({ default: () => <m.LegalPage kind="terms" /> })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Legacy / convenience URLs (also mirrored as real 301s in vercel.json).
const REDIRECTS: Record<string, string> = {
  '/services': '/allserviceshekayahaus',
  '/what-we-do': '/allserviceshekayahaus',
  '/contact': '/contact-us',
  '/portfolio': '/work',
  '/insights': '/blogs',
  '/privacy': '/privacy-policy',
  '/terms-and-conditions': '/terms',
  '/industries': '/#industries',
  '/why-us': '/#why-us',
  '/process': '/#process',
};

export function App() {
  useEffect(() => {
    // Prefetch inner-page chunks when the browser is idle so navigation feels instant.
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 2500));
    idle(() => {
      import('./pages/ServicesPages');
      import('./pages/WorkPages');
      import('./pages/OtherPages');
    });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allserviceshekayahaus" element={<ServicesHubPage />} />
        <Route path="/what-we-do/media-production" element={<MediaPillar />} />
        <Route path="/what-we-do/marketing-branding" element={<MarketingPillar />} />
        <Route path="/what-we-do/technology" element={<TechPillar />} />
        {SERVICE_PAGES.map((s) => (
          <Route key={s.slug} path={`/${s.slug}`} element={<ServiceDetailPage />} />
        ))}
        <Route path="/work" element={<WorkIndexPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<InsightsPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        {Object.entries(REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Layout>
  );
}
