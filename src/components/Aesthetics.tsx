import { useState } from 'react';
import { appThemes, brand } from '../content';
import { GooglePlayIcon } from './Chrome';

export function Aesthetics() {
  const [activeThemeId, setActiveThemeId] = useState<string>('espresso');
  const activeTheme = appThemes.find((t) => t.id === activeThemeId) || appThemes[0];

  return (
    <section id="themes" className="relative bg-[#05070c] text-white py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold tracking-[0.3em] text-[#D4A373] uppercase flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#D4A373]" />
              HANDCRAFTED VISUAL DISCIPLINES
            </div>
            <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-white">
              Tactile themes crafted for quiet discipline.
            </h2>
          </div>
          <p className="font-sans text-sm text-neutral-400 max-w-md leading-relaxed">
            Deep Work features four distinct handcrafted themes in the published app. Each is carefully tuned for specific lighting conditions and cognitive states.
          </p>
        </div>

        {/* Theme Picker Tabs */}
        <div className="flex flex-wrap gap-3">
          {appThemes.map((theme) => {
            const isSelected = activeThemeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setActiveThemeId(theme.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? 'border-[#D4A373] bg-[#D4A373]/15 text-[#D4A373] shadow-[0_0_20px_rgba(212,163,115,0.25)]'
                    : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/30'
                }`}
              >
                <span
                  className="size-3 rounded-full border border-black/40 shadow-sm"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <span>{theme.name.toUpperCase()}</span>
                <span className="text-[10px] text-neutral-500 hidden sm:inline">({theme.status})</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Theme Showcase Container */}
        <div className="rounded-2xl border border-white/10 bg-[#0b0f18]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Phone Screen Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[240px] sm:w-[280px] aspect-[9/19.5] rounded-[36px] border-[4px] border-neutral-700 bg-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
              {/* Phone Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-neutral-800 rounded-full" />
              </div>

              {/* Real App Screenshot for the active theme */}
              <img
                key={activeTheme.id}
                src={activeTheme.image}
                alt={`${activeTheme.name} Theme in Deep Work`}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />

              {/* Theme Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/15 rounded-lg px-3 py-2 flex items-center justify-between text-[11px] font-mono text-white">
                <span className="text-[#D4A373] font-bold">{activeTheme.name}</span>
                <span className="text-neutral-400">{activeTheme.status}</span>
              </div>
            </div>
          </div>

          {/* Right: Theme Specs & Design Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold text-[#D4A373] tracking-widest uppercase">
                {activeTheme.label}
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                {activeTheme.name} Theme
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed pt-1">
                {activeTheme.vibe}
              </p>
            </div>

            {/* Typography & Design Spec Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-1.5">
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">TYPOGRAPHY STACK</div>
                <div className="text-sm font-semibold text-white">{activeTheme.typography}</div>
                <div className="text-[11px] text-neutral-400">High-legibility optical weights</div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-1.5">
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">PROGRESS RING ACCENT</div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: activeTheme.accentColor }}
                  />
                  <span className="text-sm font-semibold text-white">{activeTheme.accentColor}</span>
                </div>
                <div className="text-[11px] text-neutral-400">Minimal eye-strain spectrum</div>
              </div>
            </div>

            {/* Theme Highlights */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase">
                Key Interface Elements:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#D4A373]" />
                  <span>25 / 50 / 90m Quick Chips</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#D4A373]" />
                  <span>Integrated Soundbar Controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#D4A373]" />
                  <span>Custom Audio Long-Press</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#D4A373]" />
                  <span>Bottom Navigation: Pomodoro & Blocker</span>
                </li>
              </ul>
            </div>

            {/* CTA to Google Play */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={brand.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-lg bg-[#D4A373] hover:bg-[#e4b585] text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,163,115,0.5)]"
              >
                <GooglePlayIcon className="size-4" />
                <span>Switch Themes in the App</span>
              </a>
              <span className="font-mono text-[11px] text-neutral-400">
                Available in app via palette icon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
