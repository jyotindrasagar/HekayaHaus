import { Seo, faqSchema } from '../lib/seo';
import { HOME_FAQS } from '../data/site';
import { HeroSection } from '../components/home/HeroSection';
import { ExpandingImage, Manifesto } from '../components/home/Manifesto';
import { Showreel } from '../components/home/Showreel';
import { ServicePillars } from '../components/home/ServicePillars';
import { WorkGallery } from '../components/home/WorkGallery';
import { IndustryExplorer } from '../components/home/IndustryExplorer';
import { ProcessSection } from '../components/home/ProcessSection';
import { FinalCTA, MetricsSection, Principles } from '../components/home/Sections';
import { ContactSection } from '../components/home/ContactSection';
import { FAQ } from '../components/ui/FAQ';
import { Reveal, SplitText } from '../components/ui/Reveal';

export default function HomePage() {
  return (
    <>
      <Seo jsonLd={faqSchema(HOME_FAQS)} />
      <HeroSection />
      <Manifesto />
      <Showreel />
      <ServicePillars />
      <ExpandingImage />
      <WorkGallery />
      <IndustryExplorer />
      <ProcessSection />
      <MetricsSection />
      <Principles />
      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div>
            <Reveal as="p" className="eyebrow">FAQ</Reveal>
            <SplitText as="h2" text="Questions, answered." accent={['answered']} className="display-l" />
            <span id="faq-title" className="sr-only">Frequently asked questions</span>
          </div>
          <FAQ items={HOME_FAQS} />
        </div>
      </section>
      <FinalCTA />
      <ContactSection />
    </>
  );
}
