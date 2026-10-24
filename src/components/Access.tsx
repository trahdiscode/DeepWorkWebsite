import { useState, type FormEvent } from 'react';
import { access, brand } from '../content';
import { GooglePlayIcon } from './Chrome';

export function Access() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [manifestQueue, setManifestQueue] = useState<number>(849);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      const stored = JSON.parse(localStorage.getItem('deepwork_manifest') || '[]');
      stored.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('deepwork_manifest', JSON.stringify(stored));
    } catch {
      // Fallback
    }

    setManifestQueue((q) => q + 1);
    setSubmitted(true);
  };

  const handleDownloadApk = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `# DEEP WORK — Official Release\n` +
        `Google Play Store:\n` +
        `${brand.playStoreUrl}\n\n` +
        `Themes Included: Espresso, Aurora, Blush, Nothing OS Inspired\n` +
        `Version: ${brand.version}\n` +
        `Status: 100% Offline, Zero Permissions\n`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'DeepWork-GooglePlay-Manifest.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="download" className="relative bg-[#05070c] text-white py-24 px-4 sm:px-8 border-t border-white/5">
      {/* Reticle glow in background */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-radial from-[#D4A373]/15 via-red-600/5 to-transparent blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="font-mono text-xs font-semibold tracking-[0.3em] text-[#D4A373] uppercase flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#D4A373]" />
            {access.eyebrow}
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-wide text-white leading-tight">
            {access.heading}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed">
            {access.body}
          </p>
        </div>

        {/* Telemetry Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {access.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-[#0b0f18] p-5 font-mono space-y-2"
            >
              <div className="text-[10px] text-neutral-400 tracking-widest">{stat.label}</div>
              <div className="text-xl sm:text-2xl font-bold text-[#D4A373] tracking-wider">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Action Center: Google Play Card & Standalone APK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Google Play Official Card */}
          <div className="lg:col-span-7 rounded-2xl border border-[#D4A373]/50 bg-gradient-to-b from-[#121622] to-[#07090e] p-8 sm:p-10 shadow-[0_0_40px_rgba(212,163,115,0.18)] flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-[#D4A373] font-bold px-3 py-1 rounded bg-[#D4A373]/15 border border-[#D4A373]/40">
                  {brand.version}
                </span>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE ON STORE
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl text-white">
                Official Google Play Installation
              </h3>

              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                Download the verified build directly through the Google Play Store for seamless automatic updates, device compatibility checks, and security certification.
              </p>

              {/* Theme chips */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                  Includes All 4 App Themes:
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded border border-white/10 bg-black/40 text-[#D4A373]">
                    ☕ Espresso
                  </span>
                  <span className="px-2.5 py-1 rounded border border-white/10 bg-black/40 text-[#8EBBFF]">
                    🌌 Aurora
                  </span>
                  <span className="px-2.5 py-1 rounded border border-white/10 bg-black/40 text-[#A6596A]">
                    🌸 Blush
                  </span>
                  <span className="px-2.5 py-1 rounded border border-white/10 bg-black/40 text-red-400">
                    🔴 Nothing OS Inspired
                  </span>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs text-neutral-400 border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span>COMPATIBILITY:</span>
                  <span className="text-white">ANDROID 7.0 & ABOVE</span>
                </div>
                <div className="flex justify-between">
                  <span>INTERNET PERMISSION:</span>
                  <span className="text-emerald-400">NONE (100% OFFLINE)</span>
                </div>
              </div>
            </div>

            <a
              href={brand.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl bg-[#D4A373] hover:bg-[#e4b585] text-black py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,163,115,0.65)] active:scale-95 flex items-center justify-center gap-3 text-center"
            >
              <GooglePlayIcon className="size-5" />
              <span>Get it on Google Play</span>
            </a>
          </div>

          {/* Right: Standalone APK & Update Dispatch */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0b0f18] p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                DIRECT APK & UPDATES
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-white">
                Offline Sideloading
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Need to install Deep Work on a de-Googled device or air-gapped environment? Download the package manifest or register for direct APK changelogs.
              </p>

              <button
                type="button"
                onClick={handleDownloadApk}
                className="w-full rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white py-3 font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <svg className="size-4 text-[#D4A373]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Release Package</span>
              </button>
            </div>

            {/* Newsletter / Manifest Dispatch */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="font-mono text-[11px] text-[#D4A373] uppercase tracking-wider">
                Subscribe to Feature Dispatches:
              </div>
              {submitted ? (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-mono text-emerald-400">
                  ✓ Operative #{manifestQueue} confirmed. You will receive release notes.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operative@discipline.space"
                    className="w-full rounded-lg bg-black/60 border border-white/15 px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-neutral-600 focus:border-[#D4A373] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-white/10 hover:bg-white/20 text-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
