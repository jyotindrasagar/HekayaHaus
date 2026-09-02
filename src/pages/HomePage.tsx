import React, { useState } from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { BrandMarquee } from '../components/trust/BrandMarquee';
import { AboutSection } from '../components/about/AboutSection';
import { SolutionsSection } from '../components/solutions/SolutionsSection';
import { FeaturedWork } from '../components/work/FeaturedWork';
import { IndustriesIndex } from '../components/industries/IndustriesIndex';
import { ProcessTimeline } from '../components/process/ProcessTimeline';
import { MetricsSection } from '../components/proof/MetricsSection';
import { WhyHekayaHaus } from '../components/why/WhyHekayaHaus';
import { InsightsSection } from '../components/insights/InsightsSection';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { FinalCTA } from '../components/cta/FinalCTA';
import { ContactSection } from '../components/contact/ContactSection';
import { VideoModal } from '../components/common/VideoModal';
import { GENERAL_FAQS } from '../data/siteContent';

export const HomePage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <main className="homepage-main">
      {/* 01. Hero Section */}
      <HeroSection onWatchShowreel={() => setIsVideoModalOpen(true)} />

      {/* 02. Client Trust Marquee */}
      <BrandMarquee />

      {/* 03. About Haus / Brand Philosophy */}
      <AboutSection />

      {/* 04. Solutions / What We Do (6 Parallel Pillars) */}
      <SolutionsSection />

      {/* 05. Featured Work (AccordionGallery in Cinematic Navy) */}
      <FeaturedWork />

      {/* 06. Industries We Work With */}
      <IndustriesIndex />

      {/* 07. Our Process (01 Discover -> 05 Scale) */}
      <ProcessTimeline />

      {/* 08. Results / Proven Performance Metrics */}
      <MetricsSection />

      {/* 09. Why HekayaHaus Principles + Signature Quote */}
      <WhyHekayaHaus />

      {/* 10. Insights & Resources (3 Editorial Magazine Covers) */}
      <InsightsSection />

      {/* 11. Homepage FAQs */}
      <FAQAccordion items={GENERAL_FAQS} />

      {/* 12. Final Emotional CTA (Dark Cinematic Navy Portal) */}
      <FinalCTA onWatchShowreel={() => setIsVideoModalOpen(true)} />

      {/* 13. Direct Inquiry & Calendar Booking */}
      <ContactSection />

      {/* Video Modal Player */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </main>
  );
};
