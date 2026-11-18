import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import { SERVICE_PAGES } from './data/services';

// Inner pages are code-split; the homepage ships in the main bundle for the fastest first paint.
const sp = () => import('./pages/ServicesPages');
const wp = () => import('./pages/WorkPages');
const op = () => import('./pages/OtherPages');
const jp = () => import('./pages/JoinPages');
const ServicesHubPage = lazy(() => sp().then((m) => ({ default: m.ServicesHubPage })));
const ServiceDetailPage = lazy(() => sp().then((m) => ({ default: m.ServiceDetailPage })));
const MarketingPillar = lazy(() => sp().then((m) => ({ default: () => <m.PillarPage id="marketing" /> })));
const PerformancePillar = lazy(() => sp().then((m) => ({ default: () => <m.PillarPage id="performance" /> })));
const GrowthPillar = lazy(() => sp().then((m) => ({ default: () => <m.PillarPage id="growth" /> })));
const WorkIndexPage = lazy(() => wp().then((m) => ({ default: m.WorkIndexPage })));
const ProjectPage = lazy(() => wp().then((m) => ({ default: m.ProjectPage })));
const AboutPage = lazy(() => op().then((m) => ({ default: m.AboutPage })));
const InsightsPage = lazy(() => op().then((m) => ({ default: m.InsightsPage })));
const ArticlePage = lazy(() => op().then((m) => ({ default: m.ArticlePage })));
const ContactPage = lazy(() => op().then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => op().then((m) => ({ default: () => <m.LegalPage kind="privacy" /> })));
const TermsPage = lazy(() => op().then((m) => ({ default: () => <m.LegalPage kind="terms" /> })));
const CareersPage = lazy(() => jp().then((m) => ({ default: m.CareersPage })));
const UniversityPage = lazy(() => jp().then((m) => ({ default: m.UniversityPage })));
const MentorshipPage = lazy(() => jp().then((m) => ({ default: m.MentorshipPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Legacy / convenience URLs (also mirrored as real 301s in vercel.json).
const REDIRECTS: Record<string, string> = {
  '/services': '/allserviceshekayahaus',
  '/what-we-do': '/allserviceshekayahaus',
  '/what-we-do/media-production': '/what-we-do/performance',
  '/what-we-do/marketing-branding': '/what-we-do/marketing',
  '/what-we-do/technology': '/what-we-do/growth',
  '/work': '/portfolio',
  '/contact': '/contact-us',
  '/insights': '/blogs',
  '/join': '/careers',
  '/join-the-haus': '/careers',
  '/privacy': '/privacy-policy',
  '/terms-and-conditions': '/terms',
  '/industries': '/allserviceshekayahaus',
  '/why-us': '/#why-us',
  '/process': '/#process',
};

function WorkRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/portfolio/${slug}`} replace />;
}

export function App() {
  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 2500));
    idle(() => {
      sp();
      wp();
      op();
    });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allserviceshekayahaus" element={<ServicesHubPage />} />
        <Route path="/what-we-do/marketing" element={<MarketingPillar />} />
        <Route path="/what-we-do/performance" element={<PerformancePillar />} />
        <Route path="/what-we-do/growth" element={<GrowthPillar />} />
        {SERVICE_PAGES.map((s) => (
          <Route key={s.slug} path={`/${s.slug}`} element={<ServiceDetailPage />} />
        ))}
        <Route path="/portfolio" element={<WorkIndexPage />} />
        <Route path="/portfolio/:slug" element={<ProjectPage />} />
        <Route path="/work/:slug" element={<WorkRedirect />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<InsightsPage />} />
        <Route path="/blogs/:slug" element={<ArticlePage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/university-partnerships" element={<UniversityPage />} />
        <Route path="/mentorship-collaborations" element={<MentorshipPage />} />
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
