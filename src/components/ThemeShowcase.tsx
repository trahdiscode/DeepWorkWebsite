import { useState } from 'react';
import { appThemes, brand } from '../content';
import { GooglePlayIcon } from './Chrome';
import { useTheme } from '../context/ThemeContext';

export function ThemeShowcase() {
  const [activeId, setActiveId] = useState('espresso');
  const activeTheme = appThemes.find((t) => t.id === activeId) || appThemes[0];
  const { isLight } = useTheme();

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
  };

  return (
    <section
      id="themes"
      className={`relative py-28 px-4 sm:px-6 border-t overflow-hidden w-full max-w-full transition-colors duration-300 ${
        isLight ? 'bg-[#f5efe6] text-[#20130b] border-[#bb9457]/20' : 'bg-[#000000] text-white border-[#432818]/60'
      }`}
    >
      {/* Morphing dynamic ambient backlight behind the phone */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] blur-[100px] sm:blur-[150px] pointer-events-none opacity-20 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle, ${activeTheme.accentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto space-y-14 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#bb9457] uppercase">
            TACTILE DESIGN SYSTEM
          </div>
          <h2 className={`font-display text-3xl sm:text-5xl tracking-wide transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
            Four themes. Zero visual noise.
          </h2>
          <p className={`font-sans text-sm sm:text-base leading-relaxed transition-colors ${isLight ? 'text-[#6b584c]' : 'text-neutral-400'}`}>
            Switch effortlessly between dark monastic, high-tech slate, airy daylight, and industrial dot-matrix.
          </p>
        </div>

        {/* Minimalist Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {appThemes.map((theme) => {
            const isSelected = activeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelect(theme.id)}
                className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full font-mono text-xs font-medium tracking-wider transition-all duration-300 border ${
                  isSelected
                    ? isLight
                      ? 'border-[#432818] bg-[#432818] text-[#ffe6a7] shadow-[0_4px_16px_rgba(67,40,24,0.18)] scale-105'
                      : 'border-[#bb9457] bg-[#bb9457]/20 text-[#ffe6a7] shadow-[0_0_20px_rgba(187,148,87,0.3)] scale-105'
                    : isLight
                    ? 'border-[#bb9457]/30 bg-white/80 text-[#432818] hover:border-[#bb9457] hover:bg-white hover:scale-102'
                    : 'border-[#432818]/60 bg-[#140d09]/60 text-neutral-400 hover:text-[#ffe6a7] hover:border-[#bb9457]/40 hover:scale-102'
                }`}
              >
                <span
                  className="size-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>

        {/* Central Stage */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 items-center rounded-3xl border backdrop-blur-xl p-6 sm:p-12 transition-all duration-300 ${
            isLight
              ? 'border-[#bb9457]/25 bg-white/95 shadow-[0_15px_45px_rgba(67,40,24,0.06)]'
              : 'border-[#432818]/80 bg-[#140d09]/80 shadow-2xl'
          }`}
        >
          {/* Left: Phone Screen Mockup */}
          <div className="md:col-span-5 flex justify-center">
            {/* Dark Matte Smartphone Frame (Completely Flat, Clean Slim Bezel, Zero Hardware Buttons) */}
            <div
              className={`relative w-[235px] sm:w-[265px] p-[6px] sm:p-[7px] rounded-[32px] sm:rounded-[36px] border ring-1 transition-all duration-500 ease-out hover:-translate-y-1.5 group cursor-pointer ${
                isLight
                  ? 'bg-[#20130b] border-[#bb9457]/40 shadow-[0_25px_50px_rgba(67,40,24,0.16)] ring-[#bb9457]/20'
                  : 'bg-[#0d0a08] border-[#432818]/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-black/80'
              }`}
            >
              {/* Inner Display Screen with Slim Bezel */}
              <div className="relative w-full aspect-[460/1024] rounded-[26px] sm:rounded-[30px] overflow-hidden bg-black ring-1 ring-white/10">
                {/* Subtle glass reflection sheen */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-transparent via-white/5 to-[#ffe6a7]/10 opacity-30 group-hover:opacity-45 transition-opacity duration-300"
                />

                <img
                  key={activeTheme.id}
                  src={activeTheme.image}
                  alt={`${activeTheme.name} Theme Preview`}
                  className="w-full h-full object-cover object-top select-none pointer-events-none transition-opacity duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>

          {/* Right: Theme Details */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span
                className="font-mono text-xs font-semibold tracking-widest uppercase transition-colors duration-500"
                style={{ color: activeTheme.accentColor }}
              >
                {activeTheme.label} • {activeTheme.mode}
              </span>
              <h3 className={`font-display text-2xl sm:text-4xl transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
                {activeTheme.name}
              </h3>
              <p className={`font-sans text-sm sm:text-base leading-relaxed pt-1 transition-colors ${isLight ? 'text-[#432818]/85' : 'text-neutral-300'}`}>
                {activeTheme.desc}
              </p>
            </div>

            {/* Spec Box */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div
                className={`p-3.5 rounded-xl border space-y-1 transition-colors ${
                  isLight
                    ? 'border-[#bb9457]/20 bg-[#faf7f2] hover:border-[#bb9457]/50'
                    : 'border-[#432818] bg-black/60 hover:border-[#bb9457]/40'
                }`}
              >
                <div className="text-[10px] text-[#bb9457] uppercase font-semibold">TYPOGRAPHY</div>
                <div className={`font-medium transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
                  {activeTheme.typography}
                </div>
              </div>
              <div
                className={`p-3.5 rounded-xl border space-y-1 transition-colors ${
                  isLight
                    ? 'border-[#bb9457]/20 bg-[#faf7f2] hover:border-[#bb9457]/50'
                    : 'border-[#432818] bg-black/60 hover:border-[#bb9457]/40'
                }`}
              >
                <div className="text-[10px] text-[#bb9457] uppercase font-semibold">PALETTE</div>
                <div className={`font-medium transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
                  {activeTheme.paletteName}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={brand.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex max-w-full items-center justify-center text-center gap-2.5 rounded-full px-5 sm:px-6 py-3 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isLight
                    ? 'bg-[#432818] hover:bg-[#20130b] text-[#ffe6a7] hover:text-white shadow-[0_4px_18px_rgba(67,40,24,0.18)]'
                    : 'bg-[#bb9457] hover:bg-[#99582a] text-[#20130b] hover:text-white hover:shadow-[0_0_25px_rgba(187,148,87,0.6)]'
                }`}
              >
                <GooglePlayIcon className="size-4 shrink-0" />
                <span className="truncate sm:whitespace-normal">Switch in App via Palette Icon</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
