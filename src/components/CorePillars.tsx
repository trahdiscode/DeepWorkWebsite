import { corePillars } from '../content';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';

function PillarGraphic({ step }: { step: string }) {
  switch (step) {
    case '01':
      // Concentric Anti-Scroll Radar Reticle with Live Radar Sweep
      return (
        <div className="relative size-12 flex items-center justify-center shrink-0">
          {/* Subtle radar ping pulse */}
          <div className="absolute inset-0 rounded-full border border-[#bb9457]/50 animate-radar-ping pointer-events-none" />
          
          {/* Concentric rings */}
          <div className="absolute inset-0 rounded-full border border-[#bb9457]/40" />
          <div className="absolute inset-2 rounded-full border border-[#432818]/80 dark:border-[#ffe6a7]/20" />
          
          {/* Live sweeping radar beam */}
          <div className="absolute inset-1 rounded-full overflow-hidden pointer-events-none">
            <div
              className="w-full h-full animate-radar-spin"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 260deg, rgba(187, 148, 87, 0.45) 360deg)',
              }}
            />
          </div>

          {/* Central focus node */}
          <div className="relative size-2 rounded-full bg-[#bb9457] shadow-[0_0_8px_rgba(187,148,87,0.8)]" />
        </div>
      );
    case '02':
      // Granular Filter Matrix with Live Equalization Flow
      return (
        <div className="relative size-12 flex flex-col justify-center gap-1.5 px-1 shrink-0">
          <div className="h-1.5 w-full bg-[#432818]/60 rounded-full overflow-hidden">
            <div className="h-full bg-[#bb9457] rounded-full animate-bar-1" />
          </div>
          <div className="h-1.5 w-4/5 bg-[#6f1d1b]/40 rounded-full overflow-hidden">
            <div className="h-full bg-[#6f1d1b] rounded-full animate-bar-2" />
          </div>
          <div className="h-1.5 w-full bg-[#99582a]/30 rounded-full overflow-hidden">
            <div className="h-full bg-[#ffe6a7] rounded-full animate-bar-3" />
          </div>
        </div>
      );
    case '03':
      // Clean Sinusoidal Acoustic Wave with Flowing Waveform
      return (
        <div className="relative size-12 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 48 32" className="w-11 h-8 overflow-visible" aria-hidden="true">
            <path
              d="M 0 16 Q 12 4, 24 16 T 48 16"
              fill="none"
              stroke="#bb9457"
              strokeWidth="2.2"
              strokeLinecap="round"
              className="drop-shadow-[0_0_4px_rgba(187,148,87,0.5)]"
            />
            <path
              d="M 0 16 Q 12 28, 24 16 T 48 16"
              fill="none"
              stroke="rgba(153, 88, 42, 0.55)"
              strokeWidth="1.5"
              className="animate-wave-dash"
            />
          </svg>
        </div>
      );
    default:
      // Monastic Security Lock with Tactile Shackle Response
      return (
        <div className="relative size-12 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-full border border-[#6f1d1b]/60 group-hover:border-[#bb9457]/70 transition-colors duration-300" />
          <svg
            className="size-5 text-[#bb9457] group-hover:text-[#ffe6a7] transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Shackle with hover translation */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M8 11V7a4 4 0 018 0v4"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            {/* Lock body */}
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Keyhole */}
            <circle cx="12" cy="15" r="1" fill="currentColor" />
            <path strokeLinecap="round" strokeWidth={1.8} d="M12 16v2" />
          </svg>
        </div>
      );
  }
}

export function CorePillars() {
  const { isLight } = useTheme();

  return (
    <section
      id="features"
      className={`relative py-28 px-4 sm:px-6 border-t overflow-hidden w-full max-w-full transition-colors duration-300 ${
        isLight ? 'bg-[#faf7f2] text-[#20130b] border-[#bb9457]/20' : 'bg-[#000000] text-white border-[#432818]/60'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#bb9457] uppercase flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#bb9457]" />
            CORE DEFENSES
          </div>
          <h2 className={`font-display text-3xl sm:text-5xl tracking-wide transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
            Engineered to break the dopamine cycle.
          </h2>
          <p className={`font-sans text-sm sm:text-base leading-relaxed transition-colors ${isLight ? 'text-[#6b584c]' : 'text-neutral-400'}`}>
            Four active defense layers running completely offline on your device hardware.
          </p>
        </div>

        {/* 2x2 Crisp Card Grid with Linear-style Spotlight Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {corePillars.map((pillar) => (
            <SpotlightCard key={pillar.step} className="h-full">
              {/* Card Header */}
              <div className={`flex items-center justify-between pb-6 border-b mb-6 ${isLight ? 'border-[#bb9457]/20' : 'border-[#432818]/60'}`}>
                <div className="flex items-center gap-4">
                  <PillarGraphic step={pillar.step} />
                  <div>
                    <span className={`font-mono text-xs font-bold tracking-widest block ${isLight ? 'text-[#6f1d1b]' : 'text-[#ffe6a7]'}`}>
                      {pillar.step} // DEFENSE
                    </span>
                    <span className="font-mono text-[10px] text-[#bb9457] uppercase tracking-wider font-semibold">
                      {pillar.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-3 my-auto">
                <h3
                  className={`font-display text-xl sm:text-2xl font-bold transition-colors leading-snug ${
                    isLight ? 'text-[#20130b] group-hover:text-[#6f1d1b]' : 'text-white group-hover:text-[#ffe6a7]'
                  }`}
                >
                  {pillar.title}
                </h3>
                <p className={`font-sans text-sm leading-relaxed transition-colors ${isLight ? 'text-[#432818]/85' : 'text-neutral-300'}`}>
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom Subtle Status Cue */}
              <div className={`pt-6 mt-6 border-t flex items-center justify-between font-mono text-[10px] ${isLight ? 'border-[#bb9457]/20 text-[#6b584c]' : 'border-[#432818]/40 text-neutral-500'}`}>
                <span className={`flex items-center gap-1.5 ${isLight ? 'text-[#432818]' : 'text-neutral-400'}`}>
                  <span className="size-1.5 rounded-full bg-[#bb9457]" />
                  SHIPPED ON GOOGLE PLAY
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider">100% OFFLINE</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
