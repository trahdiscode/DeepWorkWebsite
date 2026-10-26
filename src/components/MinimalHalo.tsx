import { useEffect, useRef, useState, useMemo, type MouseEvent } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../context/ThemeContext';

export function MinimalHalo({ className = '' }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const { isLight } = useTheme();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const currentOffsetRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent | globalThis.MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      // Gentle subtle parallax shift
      targetOffsetRef.current = {
        x: normX * 12,
        y: normY * 10,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateParallax = () => {
      currentOffsetRef.current.x += (targetOffsetRef.current.x - currentOffsetRef.current.x) * 0.05;
      currentOffsetRef.current.y += (targetOffsetRef.current.y - currentOffsetRef.current.y) * 0.05;

      setOffset({
        x: currentOffsetRef.current.x,
        y: currentOffsetRef.current.y,
      });

      animFrameRef.current = requestAnimationFrame(updateParallax);
    };

    animFrameRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion]);

  const haloTransform = reducedMotion
    ? undefined
    : {
        transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
      };

  // Pre-calculated ticks for astronomical chronometer precision
  const ticks = useMemo(() => {
    const list = [];
    const cx = 340;
    const cy = 340;
    for (let i = 0; i < 12; i++) {
      const deg = i * 30;
      const rad = ((deg - 90) * Math.PI) / 180;
      const isCardinal = deg % 90 === 0;
      const r1 = isCardinal ? 266 : 273;
      const r2 = isCardinal ? 294 : 287;
      list.push({
        deg,
        isCardinal,
        x1: +(cx + r1 * Math.cos(rad)).toFixed(2),
        y1: +(cy + r1 * Math.sin(rad)).toFixed(2),
        x2: +(cx + r2 * Math.cos(rad)).toFixed(2),
        y2: +(cy + r2 * Math.sin(rad)).toFixed(2),
      });
    }
    return list;
  }, []);

  // 4 Ordinal diamonds on outer orbit
  const ordinals = useMemo(() => {
    const list = [];
    const cx = 340;
    const cy = 340;
    const r = 320;
    for (const deg of [45, 135, 225, 315]) {
      const rad = ((deg - 90) * Math.PI) / 180;
      list.push({
        x: +(cx + r * Math.cos(rad)).toFixed(2),
        y: +(cy + r * Math.sin(rad)).toFixed(2),
      });
    }
    return list;
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none flex items-center justify-center ${className}`}
      style={haloTransform}
    >
      {/* 1. Luminous Solar Aperture / Soft Backdrop Warmth */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-700 ${
          isLight
            ? 'w-[360px] xs:w-[440px] sm:w-[620px] md:w-[680px] h-[360px] xs:h-[440px] sm:h-[620px] md:h-[680px] blur-[50px] sm:blur-[70px] opacity-90'
            : 'w-[360px] xs:w-[440px] sm:w-[600px] md:w-[660px] h-[360px] xs:h-[440px] sm:h-[600px] md:h-[660px] blur-[70px] sm:blur-[90px] opacity-75'
        }`}
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(187, 148, 87, 0.28) 0%, rgba(220, 185, 130, 0.20) 35%, rgba(153, 88, 42, 0.08) 60%, transparent 72%)'
            : 'radial-gradient(circle, rgba(187, 148, 87, 0.16) 0%, rgba(111, 29, 27, 0.22) 45%, transparent 72%)',
        }}
      />

      {/* 2. Precision Astrolabe & Halo Rings (Vector SVG) */}
      <svg
        viewBox="0 0 680 680"
        aria-hidden="true"
        className={`w-[360px] xs:w-[440px] sm:w-[620px] md:w-[680px] h-[360px] xs:h-[440px] sm:h-[620px] md:h-[680px] pointer-events-none transition-colors duration-500 ${
          isLight ? 'drop-shadow-[0_0_12px_rgba(187,148,87,0.3)]' : 'drop-shadow-[0_0_15px_rgba(187,148,87,0.2)]'
        }`}
      >
        {/* Outer Precision Dashed Orbit */}
        <circle
          cx="340"
          cy="340"
          r="320"
          fill="none"
          stroke={isLight ? '#8b4513' : '#bb9457'}
          strokeOpacity={isLight ? 0.65 : 0.22}
          strokeWidth={isLight ? 1.6 : 1}
          strokeDasharray="4 8"
        />

        {/* Primary Celestial Halo Ring */}
        <circle
          cx="340"
          cy="340"
          r="280"
          fill="none"
          stroke={isLight ? '#99582a' : '#bb9457'}
          strokeOpacity={isLight ? 0.85 : 0.35}
          strokeWidth={isLight ? 1.8 : 1.2}
        />

        {/* Inner Micro-Orbit Ring */}
        <circle
          cx="340"
          cy="340"
          r="240"
          fill="none"
          stroke={isLight ? '#bb9457' : '#ffe6a7'}
          strokeOpacity={isLight ? 0.55 : 0.18}
          strokeWidth={isLight ? 1.2 : 0.8}
          strokeDasharray="2 6"
        />

        {/* 12 Chrono / Focus Hour Ticks along Primary Ring */}
        {ticks.map((t) => (
          <line
            key={t.deg}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={
              isLight
                ? t.isCardinal
                  ? '#6f1d1b'
                  : '#99582a'
                : t.isCardinal
                  ? '#ffe6a7'
                  : '#bb9457'
            }
            strokeOpacity={
              isLight
                ? t.isCardinal
                  ? 0.95
                  : 0.75
                : t.isCardinal
                  ? 0.7
                  : 0.35
            }
            strokeWidth={
              isLight
                ? t.isCardinal
                  ? 2.2
                  : 1.5
                : t.isCardinal
                  ? 1.8
                  : 1
            }
            strokeLinecap="round"
          />
        ))}

        {/* 4 Ordinal Diamond Pips on Outer Orbit */}
        {ordinals.map((o, idx) => (
          <rect
            key={idx}
            x={o.x - 2.5}
            y={o.y - 2.5}
            width="5"
            height="5"
            transform={`rotate(45 ${o.x} ${o.y})`}
            fill={isLight ? '#6f1d1b' : '#bb9457'}
            fillOpacity={isLight ? 0.85 : 0.4}
          />
        ))}
      </svg>

      {/* 3. Sleek Sweeping Celestial Light Blade (Straddles the Primary Ring r=280) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 'calc(100% * 620 / 680)',
          height: 'calc(100% * 620 / 680)',
          maxWidth: '620px',
          maxHeight: '620px',
        }}
      >
        <div
          className={`absolute inset-0 rounded-full animate-radar-spin pointer-events-none ${
            isLight ? 'opacity-90' : 'opacity-70'
          }`}
          style={{
            animationDuration: '16s',
            background: isLight
              ? 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(187, 148, 87, 0.25) 305deg, rgba(153, 88, 42, 0.5) 338deg, rgba(111, 29, 27, 0.85) 355deg, transparent 360deg)'
              : 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(187, 148, 87, 0.25) 315deg, rgba(255, 230, 167, 0.8) 355deg, transparent 360deg)',
            // Mask tightly straddles r=280 (which is at ~90.3% radius of 310px)
            WebkitMaskImage: 'radial-gradient(circle, transparent 78%, black 86%, black 93%, transparent 99%)',
            maskImage: 'radial-gradient(circle, transparent 78%, black 86%, black 93%, transparent 99%)',
          }}
        />
      </div>

      {/* 4. Orbiting Satellite Bead (Exact match to r=280 ring) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 'calc(100% * 560 / 680)',
          height: 'calc(100% * 560 / 680)',
          maxWidth: '560px',
          maxHeight: '560px',
        }}
      >
        <div
          className="absolute inset-0 rounded-full animate-radar-spin pointer-events-none"
          style={{
            animationDuration: '16s',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {isLight ? (
              <div className="relative flex items-center justify-center">
                {/* Outer luminous glow ring */}
                <div className="absolute size-4 rounded-full bg-[#bb9457]/35 blur-[2px]" />
                {/* Crisp dark wine jewel with gold border */}
                <div className="size-3 rounded-full bg-[#6f1d1b] border-[1.5px] border-[#faf7f2] shadow-[0_0_10px_rgba(111,29,27,0.85),0_1px_4px_rgba(67,40,24,0.4)] flex items-center justify-center">
                  <div className="size-1 rounded-full bg-[#ffe6a7]" />
                </div>
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                {/* Golden star beacon */}
                <div className="absolute size-5 rounded-full bg-[#bb9457]/40 blur-[3px]" />
                <div className="size-2.5 rounded-full bg-[#ffe6a7] shadow-[0_0_14px_rgba(255,230,167,0.9),0_0_5px_rgba(187,148,87,1)] ring-1 ring-white/40" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
