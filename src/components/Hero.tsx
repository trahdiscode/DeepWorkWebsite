import { useEffect, useRef } from 'react';
import { brand, hero } from '../content';
import { registerScroll } from '../lib/scroll';
import { GooglePlayIcon } from './Chrome';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleDeepRef = useRef<HTMLSpanElement>(null);
  const titleWorkRef = useRef<HTMLSpanElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register with page's single Lenis rAF loop for direct DOM transformations
    const unregister = registerScroll((_lenis, scrollY) => {
      if (!containerRef.current) return;
      const height = containerRef.current.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(scrollY / height, 0), 1);

      // Parallax on Title
      if (titleDeepRef.current) {
        const yOffset = progress * -40;
        titleDeepRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
      if (titleWorkRef.current) {
        const yOffset = progress * -20;
        titleWorkRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }

      // Concentric reticle rings rotate with scroll
      if (reticleRef.current) {
        const rotation = progress * 65;
        const scale = 1 + progress * 0.15;
        reticleRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
      }

      // Matrix subtle background parallax
      if (matrixRef.current) {
        const matrixY = progress * 30;
        matrixRef.current.style.transform = `translate3d(0, ${matrixY}px, 0)`;
      }

      // Fade out scroll indicator
      if (scrollIndicatorRef.current) {
        const indicatorOpacity = Math.max(0, 1 - progress * 4);
        scrollIndicatorRef.current.style.opacity = indicatorOpacity.toFixed(3);
      }

      // Dynamic telemetry readout
      if (coordsRef.current) {
        const focusDepth = (progress * 100).toFixed(1);
        coordsRef.current.textContent = `FOCUS RATIO: ${focusDepth}%`;
      }
    });

    return () => {
      unregister();
    };
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#05070c] text-white flex flex-col justify-between overflow-hidden pt-24 pb-10 px-4 sm:px-8 select-none"
    >
      {/* Dynamic Background Laser Matrix */}
      <div
        ref={matrixRef}
        aria-hidden="true"
        className="absolute inset-0 geometric-matrix pointer-events-none opacity-40 will-change-transform"
      />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[500px] bg-radial from-[#D4A373]/15 via-red-600/5 to-transparent blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[750px] bg-radial from-[#D4A373]/10 via-red-700/5 to-transparent blur-[120px] pointer-events-none"
      />

      {/* Concentric Rotating Reticles */}
      <div
        ref={reticleRef}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform hidden sm:block"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-[#D4A373]/20" />
        <div className="absolute inset-16 rounded-full border border-neutral-700/30" />
        <div className="absolute inset-36 rounded-full border border-[#D4A373]/30" />
        <div className="absolute inset-56 rounded-full border border-dashed border-[#D4A373]/30" />
      </div>

      {/* Corner Crosshairs */}
      <div aria-hidden="true" className="absolute top-24 left-6 sm:left-12 size-4 border-t border-l border-[#D4A373]/60 pointer-events-none" />
      <div aria-hidden="true" className="absolute top-24 right-6 sm:right-12 size-4 border-t border-r border-[#D4A373]/60 pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-12 left-6 sm:left-12 size-4 border-b border-l border-[#D4A373]/60 pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-12 right-6 sm:right-12 size-4 border-b border-r border-[#D4A373]/60 pointer-events-none" />

      {/* Top HUD Telemetry Ribbon */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-2 font-mono text-xs tracking-[0.25em] text-neutral-400">
        <div className="flex items-center gap-2.5 text-[#D4A373] font-bold">
          <span className="size-2 rounded-full bg-[#D4A373] shadow-[0_0_10px_#D4A373] animate-ping" />
          <span>{brand.badge}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-neutral-500">{brand.protocol}</span>
          <span className="hidden md:inline text-neutral-600">|</span>
          <span ref={coordsRef} className="text-[#D4A373] font-medium">FOCUS RATIO: 100.0%</span>
        </div>
      </div>

      {/* Center Typographic Focal Hero */}
      <div className="relative z-10 max-w-6xl w-full mx-auto my-auto text-center py-10 sm:py-16 flex flex-col items-center">
        <div className="font-mono text-xs sm:text-sm font-semibold tracking-[0.35em] text-[#D4A373] uppercase mb-4 sm:mb-6 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#D4A373]" />
          {hero.kicker}
        </div>

        {/* Massive Dual Typographic Head */}
        <h1 className="flex flex-col items-center select-none font-display leading-[0.88] tracking-[0.08em] sm:tracking-[0.14em] uppercase my-2">
          <span
            ref={titleDeepRef}
            className="text-[4rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11rem] font-black text-transparent transition-transform will-change-transform"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.85)',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.15)',
            }}
          >
            {hero.titleWord1}
          </span>
          <span
            ref={titleWorkRef}
            className="text-[4rem] sm:text-[7.5rem] md:text-[9.5rem] lg:text-[11rem] font-black bg-gradient-to-br from-white via-[#EAD1B3] to-[#D4A373] bg-clip-text text-transparent drop-shadow-[0_0_55px_rgba(212,163,115,0.55)] transition-transform will-change-transform"
          >
            {hero.titleWord2}
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-lg md:text-xl font-light tracking-[0.25em] text-neutral-300 uppercase max-w-2xl mx-auto">
          WHERE SILENCE MEETS <strong className="text-white font-bold text-[#D4A373]">ABSOLUTE DISCIPLINE</strong>
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <a
            href={brand.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md bg-[#D4A373] hover:bg-[#e2b17f] text-black px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,163,115,0.55)] active:scale-95"
          >
            <GooglePlayIcon className="size-5" />
            <span>Install from Google Play</span>
          </a>

          <a
            href="#themes"
            className="flex items-center gap-2 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 font-mono text-sm uppercase tracking-wider text-white transition-all"
          >
            <span>Explore App Themes</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mission Telemetry HUD Clocks */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full max-w-3xl border-y border-white/10 py-5 font-mono text-left">
          <div className="border-l-2 border-[#D4A373]/60 pl-4 py-1">
            <div className="text-[10px] tracking-widest text-neutral-400 uppercase">PRESET DURATION</div>
            <div className="text-lg sm:text-xl font-bold tracking-wider text-white">
              25 / 50 / 90 MIN
            </div>
          </div>
          <div className="border-l-2 border-[#D4A373]/60 pl-4 py-1">
            <div className="text-[10px] tracking-widest text-neutral-400 uppercase">ACOUSTIC SHIELD</div>
            <div className="text-lg sm:text-xl font-bold tracking-wider text-[#D4A373]">
              {hero.resonance}
            </div>
          </div>
          <div className="border-l-2 border-[#D4A373]/60 pl-4 py-1">
            <div className="text-[10px] tracking-widest text-neutral-400 uppercase">SECURITY STATUS</div>
            <div className="text-lg sm:text-xl font-bold tracking-wider text-emerald-400">
              100% OFFLINE PRIVACY
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Status & Scroll Cue */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500 border-t border-white/5 pt-4">
        <div>NOW LIVE ON GOOGLE PLAY STORE • ZERO DATA COLLECTION</div>

        <div
          ref={scrollIndicatorRef}
          className="flex items-center gap-2 text-[#D4A373]/90 tracking-widest uppercase transition-opacity"
        >
          <span className="size-1.5 rounded-full bg-[#D4A373] animate-pulse" />
          <span>{hero.scrollPrompt}</span>
          <span aria-hidden="true" className="animate-bounce">↓</span>
        </div>

        <div className="text-neutral-500">[ 100% PRIVATE & OFFLINE ]</div>
      </div>
    </section>
  );
}
