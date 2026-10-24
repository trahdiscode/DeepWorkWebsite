import { useState, type MouseEvent } from 'react';
import { brand, nav } from '../content';
import { scrollToHash } from '../lib/scroll';

function go(e: MouseEvent<HTMLAnchorElement>, then?: () => void) {
  const hash = e.currentTarget.getAttribute('href');
  if (!hash?.startsWith('#')) return;
  e.preventDefault();
  then?.();
  scrollToHash(hash);
}

/** Official Deep Work Focus Diamond Glyph */
function DeepWorkDiamond({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 108 108" aria-hidden="true" className={className}>
      {/* Outer ambient diamond */}
      <path d="M 54,20 L 88,54 L 54,88 L 20,54 Z" fill="rgba(212, 163, 115, 0.15)" />
      {/* Main geometric diamond */}
      <path
        d="M 54,30 L 78,54 L 54,78 L 30,54 Z"
        fill="none"
        stroke="#D4A373"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner core */}
      <path d="M 54,46 L 62,54 L 54,62 L 46,54 Z" fill="#F4E6C3" />
    </svg>
  );
}

/** Google Play Store Icon */
export function GooglePlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-.913V2.727c.16-.365.378-.682.61-.913zm11.242 11.244l2.25 2.25-11.83 6.83 9.58-9.08zm0-2.116L5.271 1.862l11.83 6.83-2.25 2.25zm1.485 1.058l3.774 2.179a1.5 1.5 0 0 1 0 2.597l-3.774 2.179-2.023-2.024 2.023-2.931z" />
    </svg>
  );
}

/** GitHub Icon */
export function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white backdrop-blur-md bg-black/50 border-b border-white/5 transition-all">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => go(e)}
          className="flex items-center gap-3 group"
          aria-label={`${brand.name} — back to top`}
        >
          <DeepWorkDiamond className="size-6 text-[#D4A373] group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-display text-sm md:text-base tracking-[0.24em] font-bold text-white group-hover:text-[#D4A373] transition-colors">
              {brand.wordmark}
            </span>
            <span className="font-mono text-[9px] tracking-[0.18em] text-neutral-400 hidden sm:inline">
              {brand.badge}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e)}
              className="font-mono text-label text-neutral-300 hover:text-[#D4A373] uppercase transition-colors tracking-widest"
            >
              {item.label}
            </a>
          ))}

          <a
            href={brand.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-[4px] bg-[#D4A373] hover:bg-[#e4b585] text-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_15px_rgba(212,163,115,0.4)] active:scale-95"
          >
            <GooglePlayIcon className="size-3.5" />
            <span>Google Play</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden border-b border-neutral-800 bg-[#090b10]/95 px-6 py-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-5">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => go(e, () => setOpen(false))}
                className="font-mono text-sm tracking-widest text-neutral-300 hover:text-[#D4A373] uppercase py-1"
              >
                {item.label}
              </a>
            ))}
            <a
              href={brand.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-[4px] bg-[#D4A373] py-3 font-mono text-xs font-bold uppercase text-black tracking-widest"
            >
              <GooglePlayIcon className="size-4" />
              <span>Get on Google Play</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 bg-[#05070c] text-neutral-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/60">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DeepWorkDiamond className="size-5 text-[#D4A373]" />
              <span className="font-display text-sm tracking-[0.24em] font-bold text-white">
                {brand.wordmark}
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed">
              Where silence meets absolute discipline. Offline cognitive defense system published on Google Play.
            </p>
            <div className="font-mono text-[10px] text-[#D4A373] tracking-widest">
              [ {brand.version} ]
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-300">App Themes</div>
            <ul className="space-y-1.5 text-xs font-mono">
              <li><a href="#themes" className="hover:text-[#D4A373] transition-colors">Espresso (Warm Monastic)</a></li>
              <li><a href="#themes" className="hover:text-[#D4A373] transition-colors">Aurora (Nordic Slate)</a></li>
              <li><a href="#themes" className="hover:text-[#D4A373] transition-colors">Blush / Noir (Porcelain Light)</a></li>
              <li><a href="#themes" className="hover:text-[#D4A373] transition-colors">Nothing OS Inspired (Dot Matrix)</a></li>
            </ul>
          </div>

          {/* Col 3: Developer Details */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-300">Developer</div>
            <div className="space-y-2 text-xs font-mono">
              <div className="text-white font-medium">{brand.developer.name}</div>
              <a
                href={brand.developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-[#D4A373] transition-colors"
              >
                <GitHubIcon className="size-4" />
                <span>github.com/trahdiscode</span>
              </a>
              <a
                href={brand.developer.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-[11px]"
              >
                <span>Source: trahdiscode/DeepWorkApp</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Col 4: Store & Compatibility */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-300">Get App</div>
            <a
              href={brand.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded border border-white/20 bg-black/60 px-4 py-2 text-white hover:border-[#D4A373] hover:text-[#D4A373] transition-all"
            >
              <GooglePlayIcon className="size-4" />
              <div className="text-left">
                <div className="text-[9px] font-mono uppercase leading-none text-neutral-400">Get it on</div>
                <div className="text-xs font-bold leading-tight">Google Play</div>
              </div>
            </a>
            <div className="font-mono text-[11px] text-neutral-400">
              AVAILABLE FOR ANDROID 7+
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} DEEP WORK.</span>
            <span>Crafted by <a href={brand.developer.github} target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-[#D4A373] underline decoration-neutral-700 underline-offset-4">{brand.developer.name}</a>.</span>
            <span>Available for Android 7+. Zero trackers.</span>
          </div>
          <a
            href="#top"
            onClick={(e) => go(e)}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#D4A373] transition-colors"
          >
            <span>RETURN TO SUMMIT</span>
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
