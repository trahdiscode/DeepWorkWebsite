import { brand } from '../content';
import { GooglePlayIcon } from './Chrome';

export function DownloadSection() {
  return (
    <section id="download" className="relative bg-[#000000] text-white py-28 px-4 sm:px-6 border-t border-[#432818]/60">
      {/* Background glow with Camel & Dark Wine tones */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial from-[#bb9457]/15 via-[#6f1d1b]/10 to-transparent blur-[120px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 rounded-3xl border border-[#bb9457]/30 bg-gradient-to-b from-[#1c120c] to-[#080503] p-8 sm:p-16 shadow-[0_0_50px_rgba(187,148,87,0.15)]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#bb9457]/40 bg-[#432818]/60 font-mono text-[11px] tracking-widest text-[#ffe6a7] uppercase">
          AVAILABLE ON GOOGLE PLAY STORE
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight">
          Silence the noise.<br />
          <span className="bg-gradient-to-r from-white via-[#ffe6a7] to-[#bb9457] bg-clip-text text-transparent">
            Reclaim your focus.
          </span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-lg mx-auto leading-relaxed">
          100% offline, zero accounts, and zero internet permissions. Install directly on your device from Google Play.
        </p>

        {/* Big Google Play CTA in Warm Camel */}
        <div className="pt-2 flex justify-center">
          <a
            href={brand.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-full bg-[#bb9457] hover:bg-[#99582a] text-[#20130b] hover:text-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_35px_rgba(187,148,87,0.65)] active:scale-95"
          >
            <GooglePlayIcon className="size-5" />
            <span>Install Deep Work App</span>
          </a>
        </div>

        {/* Clean Spec Chips */}
        <div className="pt-6 border-t border-[#432818]/80 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-neutral-400">
          <span>COMPATIBILITY: ANDROID 7.0+</span>
          <span>SIZE: &lt; 15 MB</span>
          <span>PERMISSIONS: ZERO (OFFLINE)</span>
        </div>
      </div>
    </section>
  );
}
