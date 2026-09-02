import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/common/Header';
import { MobileMenu } from './components/common/MobileMenu';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { SmoothScroll } from './components/common/SmoothScroll';

import { HomePage } from './pages/HomePage';
import { AllServicesPage } from './pages/AllServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { BlogsPage } from './pages/BlogsPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Desktop Cursor Enhancement */}
      <CustomCursor />

      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Global Navigation Header */}
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Fullscreen Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Route Views */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allserviceshekayahaus" element={<AllServicesPage />} />
        
        {/* Dedicated Service Routes */}
        <Route path="/media-production-dubai" element={<ServiceDetailPage />} />
        <Route path="/content-marketing-dubai" element={<ServiceDetailPage />} />
        <Route path="/graphics-dubai" element={<ServiceDetailPage />} />
        <Route path="/event-organise-dubai" element={<ServiceDetailPage />} />
        <Route path="/web-development-dubai" element={<ServiceDetailPage />} />
        <Route path="/audio-direction-dubai" element={<ServiceDetailPage />} />

        {/* Contact, Blogs & Legal */}
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />

        {/* 404 & Legacy URL Migrations */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Minimal Footer */}
      <Footer />
    </SmoothScroll>
  );
};
