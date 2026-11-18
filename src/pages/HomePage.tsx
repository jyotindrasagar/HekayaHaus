import { Seo, faqSchema } from '../lib/seo';
import { HOME_FAQS } from '../data/site';
import { HeroSection } from '../components/home/HeroSection';
import { ExpandingImage, Manifesto, StoryStatement } from '../components/home/Manifesto';
import { Showreel } from '../components/home/Showreel';
import { ServicePillars } from '../components/home/ServicePillars';
import { WorkGallery } from '../components/home/WorkGallery';
import { ProcessSection } from '../components/home/ProcessSection';
import { FeaturedIn, FinalCTA, MetricsSection, Principles } from '../components/home/Sections';
import { FAQ } from '../components/ui/FAQ';
import { Reveal, SplitText } from '../components/ui/Reveal';

export default function HomePage() {
  return (
    <>
      <Seo jsonLd={faqSchema(HOME_FAQS)} />
      <HeroSection />
      <StoryStatement />
      <FeaturedIn />
      <Manifesto />
      <Showreel />
      <ServicePillars />
      <ExpandingImage />
      <WorkGallery />
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
    </>
  );
}
