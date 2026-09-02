import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl = 'https://www.youtube-nocookie.com/embed/2_CSwS6nG6o?autoplay=1&rel=0&modestbranding=1',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Cinematic Showreel">
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="video-close-btn" onClick={onClose} aria-label="Close Showreel">
          <X size={24} />
        </button>

        <div className="video-frame-wrapper">
          <iframe
            src={videoUrl}
            title="HekayaHaus Cinematic Showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
            className="video-iframe"
          />
        </div>
      </div>

      <style>{`
        .video-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background-color: rgba(8, 21, 47, 0.94);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: modalFade 0.3s ease forwards;
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .video-modal-container {
          position: relative;
          width: 100%;
          max-width: 1080px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #000;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          border: 1px solid var(--color-border-inverse);
        }

        .video-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          color: #FFFFFF;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all var(--transition-fast);
        }

        .video-close-btn:hover {
          background: var(--color-blue);
          border-color: var(--color-blue);
          transform: scale(1.08);
        }

        .video-frame-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
          overflow: hidden;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>
    </div>
  );
};
