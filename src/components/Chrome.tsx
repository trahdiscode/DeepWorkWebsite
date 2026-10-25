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
      <path d="M 54,20 L 88,54 L 54,88 L 20,54 Z" fill="rgba(111, 29, 27, 0.35)" />
      <path
        d="M 54,30 L 78,54 L 54,78 L 30,54 Z"
        fill="none"
        stroke="#bb9457"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 54,46 L 62,54 L 54,62 L 46,54 Z" fill="#ffe6a7" />
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
    <header className="fixed inset-x-0 top-0 z-50 text-white backdrop-blur-md bg-black/75 border-b border-[#432818]/60 transition-all">
      <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => go(e)}
          className="flex items-center gap-2.5 group"
          aria-label={`${brand.name} — back to top`}
        >
          <DeepWorkDiamond className="size-5 text-[#bb9457] group-hover:scale-105 transition-transform" />
          <span className="font-display text-sm tracking-[0.24em] font-bold text-white group-hover:text-[#ffe6a7] transition-colors">
            {brand.wordmark}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e)}
              className="font-mono text-label text-neutral-300 hover:text-[#ffe6a7] uppercase transition-colors tracking-widest"
            >
              {item.label}
            </a>
          ))}

          <a
            href={brand.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#bb9457] hover:bg-[#99582a] text-[#432818] hover:text-[#ffe6a7] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(187,148,87,0.3)]"
          >
            <GooglePlayIcon className="size-3.5" />
            <span>Google Play</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-neutral-400 hover:text-[#ffe6a7] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-b border-[#432818] bg-black/95 backdrop-blur-xl px-4 py-6 space-y-4">
          <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-neutral-300">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => go(e, () => setOpen(false))}
                className="hover:text-[#ffe6a7] transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#432818]/60">
            <a
              href={brand.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#bb9457] hover:bg-[#99582a] text-[#432818] py-3 font-mono text-xs font-bold uppercase tracking-wider"
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
    <footer className="border-t border-[#432818]/80 bg-[#000000] text-neutral-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#432818]/40">
          <div className="flex items-center gap-2.5">
            <DeepWorkDiamond className="size-5 text-[#bb9457]" />
            <span className="font-display text-sm tracking-[0.22em] font-bold text-white">
              {brand.wordmark}
            </span>
            <span className="text-[#99582a]">·</span>
            <span className="text-xs font-mono text-neutral-400">Where silence meets absolute discipline.</span>
          </div>

          <div className="flex items-center gap-5 font-mono text-xs">
            <a
              href={brand.developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-[#ffe6a7] transition-colors"
            >
              <GitHubIcon className="size-4" />
              <span>{brand.developer.name}</span>
            </a>
            <span className="text-[#99582a]">·</span>
            <a
              href={brand.developer.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#ffe6a7] transition-colors"
            >
              Source Repo
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <div>© {new Date().getFullYear()} DEEP WORK. Available on Google Play for Android 7+. Zero trackers.</div>
          <a
            href="#top"
            onClick={(e) => go(e)}
            className="text-neutral-400 hover:text-[#ffe6a7] transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
