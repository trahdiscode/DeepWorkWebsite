import { useState, useRef, type ReactNode, type MouseEvent } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../context/ThemeContext';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const { isLight } = useTheme();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColor = isLight ? 'rgba(187, 148, 87, 0.22)' : 'rgba(187, 148, 87, 0.3)';
  const innerGlowColor = isLight ? 'rgba(255, 230, 167, 0.18)' : 'rgba(111, 29, 27, 0.12)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl p-[1px] transition-all duration-300 group overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Spotlight Border Glow */}
      {!reducedMotion && isHovered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 65%)`,
          }}
        />
      )}

      {/* Internal Content Container */}
      <div
        className={`relative h-full w-full rounded-2xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
          isLight
            ? 'bg-gradient-to-b from-white to-[#f7f2ea] border border-[#bb9457]/20 group-hover:border-[#bb9457]/50 shadow-[0_10px_30px_rgba(67,40,24,0.04)] group-hover:shadow-[0_15px_35px_rgba(187,148,87,0.12)]'
            : 'bg-gradient-to-b from-[#140d09] to-[#0a0604] border border-[#432818]/80 group-hover:border-[#bb9457]/60 group-hover:shadow-[0_0_30px_rgba(187,148,87,0.15)]'
        }`}
      >
        {/* Subtle Inner Ambient Glow following mouse */}
        {!reducedMotion && isHovered && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-2xl opacity-60 transition-opacity duration-300 -z-10"
            style={{
              background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, ${innerGlowColor}, transparent 70%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
