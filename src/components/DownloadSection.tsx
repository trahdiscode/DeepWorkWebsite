import { brand } from '../content';
import { GooglePlayIcon } from './Chrome';
import { useTheme } from '../context/ThemeContext';

export function DownloadSection() {
  const { isLight } = useTheme();

  return (
    <section
      id="download"
      className={`relative py-28 px-4 sm:px-6 border-t overflow-hidden w-full max-w-full transition-colors duration-300 ${
        isLight ? 'bg-[#faf7f2] text-[#20130b] border-[#bb9457]/20' : 'bg-[#000000] text-white border-[#432818]/60'
      }`}
    >
      {/* Ambient atmospheric glow halo */}
      <div
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[300px] sm:h-[350px] bg-radial blur-[100px] sm:blur-[120px] pointer-events-none transition-all duration-700 ${
          isLight
            ? 'from-[#bb9457]/18 via-[#ffe6a7]/30 to-transparent'
            : 'from-[#bb9457]/15 via-[#6f1d1b]/10 to-transparent'
        }`}
      />

      <div
        className={`max-w-4xl mx-auto relative z-10 text-center space-y-8 rounded-3xl border p-6 sm:p-16 transition-colors duration-300 ${
          isLight
            ? 'border-[#bb9457]/30 bg-gradient-to-b from-[#fffbf5] to-[#f5efe6] shadow-[0_20px_50px_rgba(67,40,24,0.06)]'
            : 'border-[#432818]/80 bg-gradient-to-b from-[#160e09] to-[#080503] shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono text-[10px] sm:text-[11px] tracking-widest uppercase transition-colors ${
            isLight
              ? 'border-[#bb9457]/50 bg-[#bb9457]/15 text-[#432818]'
              : 'border-[#bb9457]/40 bg-[#432818]/60 text-[#ffe6a7]'
          }`}
        >
          <span className="size-1.5 rounded-full bg-[#bb9457]" />
          AVAILABLE ON GOOGLE PLAY STORE
        </div>

        <h2 className={`font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
          Silence the noise.<br />
          <span
            className={`bg-clip-text text-transparent transition-all duration-300 ${
              isLight
                ? 'bg-gradient-to-r from-[#6f1d1b] via-[#99582a] to-[#bb9457]'
                : 'bg-gradient-to-r from-white via-[#ffe6a7] to-[#bb9457]'
            }`}
          >
            Reclaim your focus.
          </span>
        </h2>

        <p className={`font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed transition-colors ${isLight ? 'text-[#432818]/85' : 'text-neutral-300'}`}>
          100% offline, zero accounts, and zero telemetry. Install directly on your device from Google Play.
        </p>

        {/* Big Google Play CTA in Warm Camel */}
        <div className="pt-2 flex justify-center w-full px-2 sm:px-0">
          <a
            href={brand.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative overflow-hidden group w-full sm:w-auto justify-center flex items-center gap-3.5 rounded-full px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
              isLight
                ? 'bg-[#432818] hover:bg-[#20130b] text-[#ffe6a7] hover:text-white shadow-[0_4px_20px_rgba(67,40,24,0.18)]'
                : 'bg-[#bb9457] hover:bg-[#99582a] text-[#20130b] hover:text-white shadow-[0_4px_25px_rgba(0,0,0,0.6)]'
            }`}
          >
            <span className="shimmer-gleam" />
            <GooglePlayIcon className="size-5 shrink-0" />
            <span className="relative z-10">Install Deep Work App</span>
          </a>
        </div>

        {/* Clean Spec Chips */}
        <div
          className={`pt-6 border-t flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-[11px] sm:text-xs transition-colors ${
            isLight ? 'border-[#bb9457]/20 text-[#6b584c]' : 'border-[#432818]/80 text-neutral-400'
          }`}
        >
          <span className="whitespace-nowrap">COMPATIBILITY: ANDROID 7.0+</span>
          <span className="whitespace-nowrap">SIZE: &lt; 15 MB</span>
          <span className="whitespace-nowrap">DATA PRIVACY: ZERO TRACKING</span>
        </div>
      </div>
    </section>
  );
}
