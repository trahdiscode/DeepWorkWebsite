import Lenis from 'lenis';

export type ScrollCallback = (lenis: Lenis, scrollY: number) => void;

let lenisInstance: Lenis | null = null;
const listeners = new Set<ScrollCallback>();
let rafId: number | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function registerScroll(cb: ScrollCallback): () => void {
  listeners.add(cb);
  if (lenisInstance) {
    cb(lenisInstance, window.scrollY);
  }
  return () => {
    listeners.delete(cb);
  };
}

export function scrollToHash(hash: string): void {
  if (hash === '#top') {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }
  const el = document.querySelector(hash);
  if (el) {
    if (lenisInstance) {
      lenisInstance.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export function startScroll(reducedMotion: boolean): () => void {
  if (lenisInstance) {
    lenisInstance.destroy();
    if (rafId !== null) cancelAnimationFrame(rafId);
  }

  const lenis = new Lenis({
    duration: reducedMotion ? 0.01 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reducedMotion,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });
  lenisInstance = lenis;

  // Reveal observer for [data-reveal]
  const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => observer.observe(el));

  function raf(time: number) {
    lenis.raf(time);
    const scrollY = window.scrollY;

    // Dispatches directly to registered listeners for direct DOM style manipulation
    listeners.forEach((listener) => {
      listener(lenis, scrollY);
    });

    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    observer.disconnect();
    lenis.destroy();
    lenisInstance = null;
    listeners.clear();
  };
}
