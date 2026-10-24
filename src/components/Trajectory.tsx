import { useEffect, useRef } from 'react';
import { trajectory } from '../content';
import { registerScroll } from '../lib/scroll';

export function Trajectory() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const capsuleRef = useRef<SVGGElement>(null);
  const timeCounterRef = useRef<HTMLDivElement>(null);
  const freqRef = useRef<HTMLDivElement>(null);
  const legCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Total path length
    let pathLength = 1000;
    if (pathRef.current) {
      pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${pathLength}`;
      pathRef.current.style.strokeDashoffset = `${pathLength}`;
    }

    const unregister = registerScroll((_lenis, _scrollY) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      // Inking the path: strokeDashoffset decreases from pathLength to 0
      if (pathRef.current) {
        const offset = pathLength * (1 - progress);
        pathRef.current.style.strokeDashoffset = `${offset}`;

        // Capsule riding the path
        if (capsuleRef.current) {
          const pointDist = progress * pathLength;
          const point = pathRef.current.getPointAtLength(Math.min(pointDist, pathLength - 1));
          capsuleRef.current.setAttribute('transform', `translate(${point.x}, ${point.y})`);
        }
      }

      // Elapsed minutes counter (0 to 90 min)
      if (timeCounterRef.current) {
        const totalMinutes = 90;
        const currentMins = Math.floor(progress * totalMinutes);
        const currentSecs = Math.floor((progress * totalMinutes * 60) % 60);
        timeCounterRef.current.textContent = `${String(currentMins).padStart(2, '0')}:${String(currentSecs).padStart(2, '0')} MIN`;
      }

      // Live Cortical Frequency telemetry
      if (freqRef.current) {
        if (progress < 0.15) {
          freqRef.current.textContent = '14.0 Hz (BETA CALIBRATION)';
          freqRef.current.className = 'text-amber-500 font-bold';
        } else if (progress < 0.4) {
          freqRef.current.textContent = '10.0 Hz (ALPHA FLOW LOCK)';
          freqRef.current.className = 'text-cyan-400 font-bold';
        } else if (progress < 0.85) {
          freqRef.current.textContent = '40.0 Hz (PEAK GAMMA SYNCHRONY)';
          freqRef.current.className = 'text-amber-400 font-bold';
        } else {
          freqRef.current.textContent = 'BALANCED (COGNITIVE YIELD)';
          freqRef.current.className = 'text-emerald-400 font-bold';
        }
      }

      // Leg step highlight based on progress intervals [0..0.25], [0.25..0.5], [0.5..0.75], [0.75..1.0]
      legCardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const stepThreshold = idx / legCardsRef.current.length;
        const isActive = progress >= stepThreshold;
        if (isActive) {
          card.style.opacity = '1';
          card.classList.add('border-amber-500/60', 'bg-[#0f1422]');
          card.classList.remove('border-white/5', 'bg-[#0b0f18]/60');
        } else {
          card.style.opacity = '0.35';
          card.classList.remove('border-amber-500/60', 'bg-[#0f1422]');
          card.classList.add('border-white/5', 'bg-[#0b0f18]/60');
        }
      });
    });

    return () => unregister();
  }, []);

  return (
    <section
      id="trajectory"
      ref={sectionRef}
      className="relative bg-[#05070c] text-white h-[320vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-white/10 pb-5 gap-4">
          <div>
            <div className="font-mono text-xs font-semibold tracking-[0.3em] text-amber-500 uppercase flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-500" />
              {trajectory.eyebrow}
            </div>
            <h2 className="font-display text-2xl sm:text-4xl tracking-wide text-white mt-1">
              {trajectory.heading}
            </h2>
          </div>

          {/* Real-time Telemetry Readout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs bg-black/50 border border-white/10 p-3 rounded-lg">
            <div>
              <div className="text-[10px] text-neutral-400">SESSION ELAPSED</div>
              <div ref={timeCounterRef} className="text-sm font-bold text-white">
                00:00 MIN
              </div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-400">DISTRACTION RATE</div>
              <div className="text-sm font-bold text-emerald-400">0.00%</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] text-neutral-400">NEURAL CARRIER</div>
              <div ref={freqRef} className="text-xs text-amber-400">
                14.0 Hz (BETA)
              </div>
            </div>
          </div>
        </div>

        {/* Center Grid: Left SVG Laser Path, Right 4 Phase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center py-4">
          {/* Laser Trajectory Graphic (Hidden on small mobile screens to keep vertical layout neat) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative">
            <svg
              viewBox="0 0 300 480"
              className="w-full max-w-[280px] h-[440px] overflow-visible"
              aria-hidden="true"
            >
              {/* Ghost guide path */}
              <path
                d="M 150 20 C 60 120, 240 180, 150 240 C 60 300, 240 360, 150 460"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Inked Laser Path */}
              <path
                ref={pathRef}
                d="M 150 20 C 60 120, 240 180, 150 240 C 60 300, 240 360, 150 460"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_12px_rgba(245,158,11,0.85)]"
              />

              {/* Waypoints along the path */}
              <circle cx="150" cy="20" r="4" fill="#f59e0b" />
              <circle cx="150" cy="160" r="4" fill="#06b6d4" />
              <circle cx="150" cy="300" r="4" fill="#f59e0b" />
              <circle cx="150" cy="460" r="4" fill="#10b981" />

              {/* Capsule node riding the drawn trajectory */}
              <g ref={capsuleRef} transform="translate(150, 20)">
                <circle r="12" fill="rgba(245, 158, 11, 0.2)" className="animate-ping" />
                <circle r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <circle r="3" fill="#ffffff" />
              </g>
            </svg>
            <div className="font-mono text-[10px] text-neutral-400 tracking-widest mt-2">
              SCROLL-DRIVEN COGNITIVE PATHWAY
            </div>
          </div>

          {/* Right Phase Cards Grid */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-3.5">
            {trajectory.legs.map((leg, idx) => (
              <div
                key={leg.step}
                ref={(el) => {
                  legCardsRef.current[idx] = el;
                }}
                className="rounded-lg border border-white/5 bg-[#0b0f18]/60 p-4 sm:p-5 transition-all duration-300 relative overflow-hidden will-change-transform"
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-500 tracking-widest">
                      {leg.step} // {leg.time}
                    </span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-white font-medium tracking-wide">
                      {leg.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10">
                    {leg.frequency}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {leg.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Ribbon */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-neutral-500">
          <div>TOTAL COGNITIVE FLIGHT: 90 MINUTES UNINTERRUPTED</div>
          <div className="text-amber-500/80">ZERO ATTENTION RESIDUE</div>
        </div>
      </div>
    </section>
  );
}
