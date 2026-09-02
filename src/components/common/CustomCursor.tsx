import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .interactive');
      if (interactive) {
        setIsHovering(true);
        const customText = interactive.getAttribute('data-cursor-text');
        setCursorText(customText || '');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>

      <style>{`
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background-color: var(--color-blue);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -4px;
          margin-left: -4px;
        }

        .custom-cursor-dot.hovering {
          width: 42px;
          height: 42px;
          margin-top: -21px;
          margin-left: -21px;
          background-color: rgba(23, 70, 255, 0.15);
          border: 1.5px solid var(--color-blue);
          backdrop-filter: blur(2px);
        }

        .cursor-label {
          font-family: var(--font-body);
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--color-blue);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (pointer: coarse) {
          .custom-cursor-dot {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
