import { corePillars } from '../content';

function PillarGraphic({ step }: { step: string }) {
  switch (step) {
    case '01':
      // Concentric Anti-Scroll Radar Reticle in Warm Camel
      return (
        <div className="relative size-11 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-full border border-[#bb9457]/40" />
          <div className="absolute inset-2 rounded-full border border-[#432818]" />
          <div className="size-2 rounded-full bg-[#bb9457]" />
          <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gradient-to-r from-transparent to-[#bb9457] origin-left -translate-y-1/2" />
        </div>
      );
    case '02':
      // Granular Filter Matrix with Dark Wine, Chocolate & Apricot
      return (
        <div className="relative size-11 flex flex-col justify-center gap-1.5 px-1 shrink-0">
          <div className="h-1.5 w-full bg-[#432818] rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-[#bb9457] rounded-full" />
          </div>
          <div className="h-1.5 w-4/5 bg-[#6f1d1b]/40 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-[#6f1d1b] rounded-full" />
          </div>
          <div className="h-1.5 w-full bg-[#99582a]/30 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-[#ffe6a7] rounded-full" />
          </div>
        </div>
      );
    case '03':
      // Clean Sinusoidal Acoustic Wave
      return (
        <svg viewBox="0 0 48 32" className="size-11 overflow-visible shrink-0" aria-hidden="true">
          <path
            d="M 0 16 Q 12 4, 24 16 T 48 16"
            fill="none"
            stroke="#bb9457"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 0 16 Q 12 28, 24 16 T 48 16"
            fill="none"
            stroke="rgba(153, 88, 42, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      );
    default:
      // Monastic Security Lock with Dark Wine Shield
      return (
        <div className="relative size-11 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-full border border-[#6f1d1b]/60" />
          <svg className="size-5 text-[#bb9457]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      );
  }
}

export function CorePillars() {
  return (
    <section id="features" className="relative bg-[#000000] text-white py-28 px-4 sm:px-6 border-t border-[#432818]/60">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#bb9457] uppercase flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#bb9457]" />
            CORE DEFENSES
          </div>
          <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-white">
            Engineered to break the dopamine cycle.
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed">
            Four active defense layers running completely offline on your device hardware.
          </p>
        </div>

        {/* 2x2 Crisp Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {corePillars.map((pillar) => (
            <div
              key={pillar.step}
              className="rounded-2xl border border-[#432818] bg-gradient-to-b from-[#160e0a] to-[#0a0604] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#bb9457]/70 hover:shadow-[0_0_30px_rgba(187,148,87,0.18)] group"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#432818]/60 mb-6">
                <div className="flex items-center gap-4">
                  <PillarGraphic step={pillar.step} />
                  <div>
                    <span className="font-mono text-xs font-bold text-[#ffe6a7] tracking-widest block">
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
                <h3 className="font-display text-xl sm:text-2xl text-white font-bold group-hover:text-[#ffe6a7] transition-colors leading-snug">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom Subtle Status Cue */}
              <div className="pt-6 mt-6 border-t border-[#432818]/40 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <span className="size-1.5 rounded-full bg-[#bb9457]" />
                  SHIPPED ON GOOGLE PLAY
                </span>
                <span>100% OFFLINE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
