import { useEffect, useRef } from 'react';
import { registerScroll } from '../lib/scroll';
import { GooglePlayIcon } from './Chrome';
import { brand } from '../content';

// Protocol cards mapped to real app theme screenshots
const protocolCards = [
  {
    theme: 'ESPRESSO THEME',
    tag: 'FEATURE 01',
    badge: 'WARM MONASTIC',
    accent: '#D4A373',
    title: 'Tactile Focus Timer & Sound Synth',
    subtitle: 'Espresso Theme • Lora Serif',
    body: '25m, 50m, 90m chips, intention input ("What will you focus on?"), box breathing calibration, and real-time audio triggers for Rain, Brown Noise, Gamma 40Hz, and Alpha 10Hz.',
    screenshot: '/screenshots/theme_espresso.jpg',
    stat: '432Hz / 40Hz SYNTH',
  },
  {
    theme: 'AURORA THEME',
    tag: 'FEATURE 02',
    badge: 'NORDIC SLATE',
    accent: '#8EBBFF',
    title: 'Shorts & Reels Anti-Scroll Engine',
    subtitle: 'Aurora Theme • Outfit Sans',
    body: 'Dedicated blocker architecture terminates YouTube Shorts, Instagram Reels, and infinite scroll loops instantly. Prevents picture-in-picture bypass and locks out distraction.',
    screenshot: '/screenshots/theme_aurora.jpg',
    stat: '0.0ms INTERCEPTION',
  },
  {
    theme: 'BLUSH THEME',
    tag: 'FEATURE 03',
    badge: 'PORCELAIN LIGHT',
    accent: '#A6596A',
    title: 'Mind Vault & Attention Residue',
    subtitle: 'Blush Theme • Clean Daylight Mode',
    body: 'Offload sudden thoughts and errands with an instant tactile swipe without breaking your flow. Calculates the attention residue penalty of every app switch.',
    screenshot: '/screenshots/theme_blush.jpg',
    stat: 'ZERO RESIDUE',
  },
  {
    theme: 'NOTHING OS INSPIRED',
    tag: 'FEATURE 04',
    badge: 'DOT-MATRIX GLYPH',
    accent: '#E11D48',
    title: 'Monastic Strict Lock & YouTube Filter',
    subtitle: 'Nothing OS Inspired • Industrial Minimal',
    body: 'Tamper-proof emergency PIN challenge, dynamic launcher lock, and granular YouTube channel whitelist/blacklist to only allow educational lecture videos.',
    screenshot: '/screenshots/theme_nothing.jpg',
    stat: 'TAMPER-PROOF',
  },
];

export function Protocols() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressGaugeRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unregister = registerScroll((_lenis, _scrollY) => {
      if (!sectionRef.current || !trackRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - viewportWidth + 120);

      const xTranslate = currentProgress * maxTranslate;
      trackRef.current.style.transform = `translate3d(${-xTranslate}px, 0, 0)`;

      if (progressGaugeRef.current) {
        progressGaugeRef.current.style.width = `${(currentProgress * 100).toFixed(1)}%`;
      }

      const centerX = viewportWidth / 2;
      let minDistance = Infinity;
      let activeIdx = 0;

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          activeIdx = idx;
        }

        const proximity = Math.max(0, 1 - distance / (viewportWidth * 0.55));
        const opacity = 0.45 + proximity * 0.55;
        const scale = 0.94 + proximity * 0.06;

        card.style.opacity = opacity.toFixed(3);
        card.style.transform = `scale(${scale.toFixed(3)})`;

        if (proximity > 0.6) {
          card.classList.add('border-[#D4A373]/80', 'shadow-[0_0_35px_rgba(212,163,115,0.25)]');
          card.classList.remove('border-white/10');
        } else {
          card.classList.remove('border-[#D4A373]/80', 'shadow-[0_0_35px_rgba(212,163,115,0.25)]');
          card.classList.add('border-white/10');
        }
      });

      if (activeIndexRef.current) {
        activeIndexRef.current.textContent = `0${activeIdx + 1} / 0${protocolCards.length}`;
      }
    });

    return () => unregister();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-[#05070c] text-white h-[340vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-5 gap-4">
          <div className="space-y-2">
            <div className="font-mono text-xs font-semibold tracking-[0.3em] text-[#D4A373] uppercase flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#D4A373]" />
              OFFICIAL APP THEMES & CAPABILITIES
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-wide max-w-2xl text-white">
              Real screenshots from the published app.
            </h2>
          </div>

          <div className="flex flex-col items-start sm:items-end font-mono text-xs text-neutral-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500">ACTIVE PROTOCOL:</span>
              <span ref={activeIndexRef} className="text-[#D4A373] font-bold tracking-widest">
                01 / 0{protocolCards.length}
              </span>
            </div>
            <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressGaugeRef}
                className="h-full bg-[#D4A373] transition-all duration-75"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Reel of App Themes & Screens */}
        <div className="relative my-auto w-full overflow-visible py-2">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-10 items-center will-change-transform transition-transform ease-out duration-75"
            style={{ width: 'max-content' }}
          >
            {protocolCards.map((item, idx) => (
              <div
                key={item.tag}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="w-[86vw] sm:w-[500px] md:w-[600px] shrink-0 rounded-2xl border border-white/10 bg-[#0b0f18]/95 backdrop-blur-xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all will-change-transform duration-100"
              >
                {/* Card Top Meta */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs tracking-[0.25em] text-[#D4A373] font-bold uppercase">
                      {item.tag}
                    </span>
                    <span className="text-neutral-600">·</span>
                    <span className="font-mono text-xs text-neutral-300 font-semibold">
                      {item.theme}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded border font-semibold"
                    style={{
                      color: item.accent,
                      borderColor: `${item.accent}55`,
                      backgroundColor: `${item.accent}15`,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Smartphone Mockup Container showcasing the real screenshot */}
                <div className="my-4 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Phone Screen Mockup */}
                  <div className="sm:col-span-5 flex justify-center">
                    <div className="relative w-[180px] sm:w-[195px] aspect-[9/19.5] rounded-[24px] border-[3px] border-neutral-700/80 bg-black overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                      {/* Speaker notch */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-20" />
                      
                      {/* The real user screenshot */}
                      <img
                        src={item.screenshot}
                        alt={`${item.theme} screenshot`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="sm:col-span-7 space-y-3">
                    <div className="font-mono text-[11px] text-[#D4A373] tracking-wider uppercase">
                      {item.subtitle}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                      {item.body}
                    </p>

                    <div className="pt-2">
                      <a
                        href={brand.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider transition-colors"
                      >
                        <GooglePlayIcon className="size-3.5" />
                        <span>Install on Google Play</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom telemetry */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STATUS: ACTIVE IN RELEASE
                  </span>
                  <span className="text-[#D4A373] font-bold">{item.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Bottom Telemetry */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-neutral-500">
          <div>SCROLL HORIZONTALLY TO INSPECT THEMES & PROTOCOLS</div>
          <div className="hidden sm:block">VERIFIED OFFLINE ON ANDROID HARDWARE</div>
        </div>
      </div>
    </section>
  );
}
