import React, { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { SITE_INFO } from '../../data/siteContent';
import { Hero3DScene } from './Hero3DScene';

interface HeroSectionProps {
  onWatchShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchShowreel }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="hero-section" onMouseMove={handleMouseMove} aria-label="Introduction">
      {/* Background 3D Depth Particle Scene */}
      <Hero3DScene />

      <div className="container hero-container">
        {/* Left Column: Editorial Statement & Actions */}
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>STRATEGY. CREATIVITY. TECHNOLOGY. IMPACT.</span>
          </div>

          <h1 className="hero-title">
            BEYOND SEEN.<br />
            <span className="text-blue">INTO FELT.</span>
          </h1>

          <p className="hero-description">
            We build brands through cinematic storytelling, strategic marketing, technology and AI.
            From startups to global brands, HekayaHaus delivers everything needed to grow, scale and
            dominate—under one roof.
          </p>

          <div className="hero-actions">
            <a
              href={SITE_INFO.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label="Book a Discovery Call"
            >
              <span>BOOK A DISCOVERY CALL</span>
              <ArrowUpRight className="btn-icon btn-icon-arrow" size={18} />
            </a>

            <button
              onClick={onWatchShowreel}
              className="btn btn-secondary watch-showreel-btn"
              aria-label="Watch Cinematic Showreel"
              data-cursor-text="PLAY"
            >
              <span className="play-icon-bubble">
                <Play size={13} fill="currentColor" />
              </span>
              <span>WATCH SHOWREEL</span>
            </button>
          </div>
        </div>

        {/* Right Column: Sliced Visual Architectural Montage */}
        <div className="hero-visual-col" aria-hidden="true">
          <div
            className="slices-composition"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`,
            }}
          >
            {/* Slice 1 */}
            <div className="slice-card slice-1">
              <img
                src="/assets/showcase/media_1.jpg"
                alt="Automotive Cinematic Film"
                className="slice-img"
                loading="eager"
              />
            </div>
            {/* Slice 2 */}
            <div className="slice-card slice-2">
              <img
                src="/assets/showcase/billboard.png"
                alt="Architectural & CGI Billboard"
                className="slice-img"
                loading="eager"
              />
            </div>
            {/* Slice 3 */}
            <div className="slice-card slice-3">
              <img
                src="/assets/showcase/media_2.jpg"
                alt="Cinematic Portraiture Campaign"
                className="slice-img"
                loading="eager"
              />
            </div>
            {/* Slice 4 */}
            <div className="slice-card slice-4">
              <img
                src="/assets/showcase/cgi_artwork.jpg"
                alt="3D VFX Environment"
                className="slice-img"
                loading="eager"
              />
            </div>

            {/* Vertical Scroll Indicator */}
            <div className="scroll-hint-vertical">
              <span className="scroll-line" />
              <span className="scroll-text">SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: clamp(6rem, 10vw, 9rem);
          padding-bottom: clamp(3rem, 6vw, 5rem);
          background-color: var(--color-bg);
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2.5rem, 5vw, 4.5rem);
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 1024px) {
          .hero-container {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
        }

        .hero-eyebrow {
          margin-bottom: 1.25rem;
        }

        .hero-title {
          margin-bottom: 1.75rem;
        }

        .hero-description {
          font-size: clamp(1.05rem, 1.35vw, 1.25rem);
          line-height: 1.65;
          color: var(--color-muted);
          margin-bottom: 2.5rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.25rem;
        }

        @media (max-width: 520px) {
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .hero-actions .btn {
            width: 100%;
          }
        }

        .watch-showreel-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .play-icon-bubble {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(23, 70, 255, 0.1);
          color: var(--color-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-fast);
        }

        .watch-showreel-btn:hover .play-icon-bubble {
          background: var(--color-blue);
          color: #FFFFFF;
          transform: scale(1.1);
        }

        /* Slices Composition */
        .hero-visual-col {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .slices-composition {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          height: clamp(340px, 50vh, 560px);
          width: 100%;
          max-width: 480px;
          position: relative;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .slice-card {
          flex: 1;
          height: 100%;
          border-radius: var(--radius-sm);
          overflow: hidden;
          position: relative;
          box-shadow: 0 16px 36px rgba(11, 13, 18, 0.12);
          border: 1px solid rgba(217, 216, 210, 0.8);
          transition: transform 0.4s ease, filter 0.4s ease;
        }

        .slice-1 {
          transform: translateY(18px);
        }

        .slice-2 {
          transform: translateY(-14px);
        }

        .slice-3 {
          transform: translateY(24px);
        }

        .slice-4 {
          transform: translateY(-8px);
        }

        @media (max-width: 640px) {
          .slices-composition {
            height: clamp(240px, 40vh, 340px);
            gap: 0.4rem;
            max-width: 340px;
          }
          .slice-1 { transform: translateY(8px); }
          .slice-2 { transform: translateY(-6px); }
          .slice-3 { transform: translateY(10px); }
          .slice-4 { transform: translateY(-4px); }
        }

        .slices-composition:hover .slice-card {
          filter: brightness(0.92);
        }

        .slices-composition .slice-card:hover {
          filter: brightness(1.05);
          transform: scale(1.04) translateY(0);
          z-index: 10;
        }

        .slice-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .scroll-hint-vertical {
          position: absolute;
          right: -32px;
          top: 50%;
          transform: translateY(-50%);
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        @media (min-width: 1200px) {
          .scroll-hint-vertical {
            display: flex;
          }
        }

        .scroll-line {
          width: 1px;
          height: 48px;
          background: var(--color-blue);
          opacity: 0.6;
        }

        .scroll-text {
          writing-mode: vertical-rl;
          font-family: var(--font-body);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-muted);
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};
