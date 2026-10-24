import { currentFeatures, brand } from '../content';
import { GooglePlayIcon } from './Chrome';

function FeatureIcon({ type }: { type: string }) {
  switch (type) {
    case 'blocker':
      return (
        <svg className="size-6 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="size-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'timer':
      return (
        <svg className="size-6 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'audio':
      return (
        <svg className="size-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      );
    case 'lock':
      return (
        <svg className="size-6 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case 'vault':
      return (
        <svg className="size-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'widget':
      return (
        <svg className="size-6 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      );
    default:
      return (
        <svg className="size-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
  }
}

export function FeaturesMatrix() {
  return (
    <section className="relative bg-[#05070c] text-white py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold tracking-[0.3em] text-[#D4A373] uppercase flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#D4A373]" />
              EXHAUSTIVE CAPABILITIES OVERVIEW
            </div>
            <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-white">
              Every current feature, verified in production.
            </h2>
          </div>
          <a
            href={brand.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-lg bg-[#D4A373] hover:bg-[#e4b585] text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all self-start md:self-end"
          >
            <GooglePlayIcon className="size-4" />
            <span>Install Deep Work App</span>
          </a>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentFeatures.map((feat) => (
            <div
              key={feat.title}
              className="rounded-2xl border border-white/10 bg-[#0b0f18] p-6 flex flex-col justify-between hover:border-[#D4A373]/50 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(212,163,115,0.12)]"
            >
              <div className="space-y-4">
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    <FeatureIcon type={feat.icon} />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#D4A373] bg-[#D4A373]/10 border border-[#D4A373]/30 px-2 py-0.5 rounded">
                    {feat.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    {feat.category}
                  </div>
                  <h3 className="font-display text-lg text-white font-bold group-hover:text-[#D4A373] transition-colors leading-snug">
                    {feat.title}
                  </h3>
                </div>

                <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              {/* Bottom status badge */}
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  SHIPPED ON PLAY STORE
                </span>
                <span className="text-neutral-400">OFFLINE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
