import { brand } from '../content';
import { GooglePlayIcon } from './Chrome';
import { useTheme } from '../context/ThemeContext';

export function Hero() {
  const { isLight } = useTheme();

  return (
    <section
      id="top"
      className={`relative min-h-screen w-full max-w-full flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden select-none transition-colors duration-300 ${
        isLight ? 'bg-[#faf7f2] text-[#20130b]' : 'bg-[#000000] text-white'
      }`}
    >
      {/* Subtle Ambient Radial Lighting with Warm Camel & Dark Wine Undertones */}
      <div
        aria-hidden="true"
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[900px] h-[350px] sm:h-[500px] bg-radial blur-[120px] pointer-events-none transition-all duration-700 ${
          isLight
            ? 'from-[#bb9457]/20 via-[#ffe6a7]/40 to-transparent'
            : 'from-[#bb9457]/15 via-[#6f1d1b]/10 to-transparent'
        }`}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
        {/* Subtle pill tag with Camel accent */}
        <div
          className={`inline-flex max-w-full items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border font-mono text-[10px] sm:text-[11px] tracking-wider sm:tracking-widest uppercase text-center transition-all duration-300 ${
            isLight
              ? 'border-[#bb9457]/50 bg-[#bb9457]/15 text-[#432818] shadow-[0_2px_12px_rgba(187,148,87,0.12)]'
              : 'border-[#bb9457]/30 bg-[#432818]/30 text-[#ffe6a7] shadow-[0_0_20px_rgba(187,148,87,0.15)]'
          }`}
        >
          <span className="size-1.5 sm:size-2 rounded-full bg-[#bb9457] shrink-0" />
          <span className="truncate sm:whitespace-normal">OFFLINE COGNITIVE DEFENSE OS • ANDROID 7+</span>
        </div>

        {/* Monolithic Typography — Solid & Authoritative with Warm Camel Glow */}
        <h1 className="font-display text-[2.75rem] xs:text-[3.5rem] sm:text-[6.5rem] md:text-[8rem] font-black tracking-[0.04em] sm:tracking-[0.14em] uppercase leading-none select-none max-w-full break-words">
          <span className={`block transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>DEEP</span>
          <span
            className={`bg-clip-text text-transparent transition-all duration-300 ${
              isLight
                ? 'bg-gradient-to-r from-[#6f1d1b] via-[#99582a] to-[#bb9457] drop-shadow-[0_2px_15px_rgba(187,148,87,0.3)]'
                : 'bg-gradient-to-r from-white via-[#ffe6a7] to-[#bb9457] drop-shadow-[0_0_45px_rgba(187,148,87,0.4)]'
            }`}
          >
            WORK
          </span>
        </h1>

        {/* Creed Subtitle */}
        <p
          className={`font-sans text-base sm:text-xl font-light max-w-xl mx-auto leading-relaxed px-2 sm:px-0 transition-colors ${
            isLight ? 'text-[#432818]/85' : 'text-neutral-300'
          }`}
        >
          Where silence meets{' '}
          <span className={`font-semibold ${isLight ? 'text-[#6f1d1b]' : 'text-[#ffe6a7]'}`}>absolute discipline</span>.
          An offline focus environment engineered to terminate distraction loops.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto px-4 sm:px-0">
          <a
            href={brand.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto justify-center flex items-center gap-3 rounded-full px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
              isLight
                ? 'bg-[#432818] hover:bg-[#20130b] text-[#ffe6a7] hover:text-white shadow-[0_4px_25px_rgba(67,40,24,0.22)]'
                : 'bg-[#bb9457] hover:bg-[#99582a] text-[#20130b] hover:text-white hover:shadow-[0_0_35px_rgba(187,148,87,0.65)]'
            }`}
          >
            <GooglePlayIcon className="size-4" />
            <span>Get it on Google Play</span>
          </a>

          <a
            href="#themes"
            className={`w-full sm:w-auto justify-center flex items-center gap-2 rounded-full px-6 py-4 font-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
              isLight
                ? 'border-[#bb9457]/40 bg-white/90 text-[#432818] hover:bg-[#bb9457]/15 hover:text-[#6f1d1b] shadow-sm'
                : 'border-[#bb9457]/30 bg-[#432818]/30 hover:bg-[#432818]/60 hover:border-[#bb9457]/60 text-neutral-300 hover:text-[#ffe6a7]'
            }`}
          >
            <span>Explore Themes</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Floating Smartphone Showcase — Grounded, Calm & Stable */}
        <div className="pt-10 sm:pt-14 relative flex justify-center w-full max-w-full">
          {/* Ambient phone aura */}
          <div
            aria-hidden="true"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[450px] sm:h-[550px] bg-radial blur-[80px] sm:blur-[90px] pointer-events-none transition-all duration-700 ${
              isLight
                ? 'from-[#bb9457]/25 via-[#ffe6a7]/35 to-transparent'
                : 'from-[#bb9457]/20 via-[#6f1d1b]/15 to-transparent'
            }`}
          />

          {/* Dark Matte Smartphone Frame (Completely Flat, Clean Slim Bezel, Zero Hardware Buttons) */}
          <div
            className={`relative w-[230px] sm:w-[280px] p-[6px] sm:p-[7px] rounded-[32px] sm:rounded-[36px] border ring-1 transition-all duration-500 ease-out hover:-translate-y-2 group cursor-pointer ${
              isLight
                ? 'bg-[#20130b] border-[#bb9457]/40 shadow-[0_25px_50px_rgba(67,40,24,0.18)] ring-[#bb9457]/20'
                : 'bg-[#0d0a08] border-[#432818]/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-black/80'
            }`}
          >
            {/* Inner Display Screen with Slim Bezel */}
            <div className="relative w-full aspect-[460/1024] rounded-[26px] sm:rounded-[30px] overflow-hidden bg-black ring-1 ring-white/10">
              {/* Refined static glass reflection sheen */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-transparent via-white/5 to-[#ffe6a7]/10 opacity-30 group-hover:opacity-45 transition-opacity duration-300"
              />

              {/* Flagship Screenshot */}
              <img
                src="/screenshots/theme_espresso.jpg"
                alt="Deep Work App in Espresso Theme"
                className="w-full h-full object-cover object-top select-none pointer-events-none"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Micro Specs strip */}
        <div
          className={`pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 font-mono text-[11px] sm:text-xs max-w-full transition-colors ${
            isLight ? 'text-[#6b584c]' : 'text-neutral-400'
          }`}
        >
          <span className={`transition-colors whitespace-nowrap ${isLight ? 'hover:text-[#6f1d1b]' : 'hover:text-[#ffe6a7]'}`}>
            ● ZERO DATA COLLECTION
          </span>
          <span className={`transition-colors whitespace-nowrap ${isLight ? 'hover:text-[#6f1d1b]' : 'hover:text-[#ffe6a7]'}`}>
            ● 100% OFFLINE
          </span>
          <span className={`transition-colors whitespace-nowrap ${isLight ? 'hover:text-[#6f1d1b]' : 'hover:text-[#ffe6a7]'}`}>
            ● NO ACCOUNTS
          </span>
          <span className={`transition-colors whitespace-nowrap ${isLight ? 'hover:text-[#6f1d1b]' : 'hover:text-[#ffe6a7]'}`}>
            ● FREE ON GOOGLE PLAY
          </span>
        </div>
      </div>
    </section>
  );
}
