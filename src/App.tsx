import { useEffect } from 'react';
import { Header, Footer } from './components/Chrome';
import { Hero } from './components/Hero';
import { ThemeShowcase } from './components/ThemeShowcase';
import { CorePillars } from './components/CorePillars';
import { AcousticShield } from './components/AcousticShield';
import { DownloadSection } from './components/DownloadSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { startScroll } from './lib/scroll';

export default function App() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const cleanup = startScroll(reduced);
    return cleanup;
  }, [reduced]);

  return (
    <div className="relative w-full max-w-full overflow-x-hidden min-h-screen bg-black">
      <Header />
      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Hero />
        <ThemeShowcase />
        <CorePillars />
        <AcousticShield />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
