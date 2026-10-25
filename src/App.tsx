import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header, Footer } from './components/Chrome';
import { Hero } from './components/Hero';
import { ThemeShowcase } from './components/ThemeShowcase';
import { CorePillars } from './components/CorePillars';
import { AcousticShield } from './components/AcousticShield';
import { DownloadSection } from './components/DownloadSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { startScroll } from './lib/scroll';

function SiteContent() {
  const reduced = useReducedMotion();
  const { isLight } = useTheme();

  useEffect(() => {
    const cleanup = startScroll(reduced);
    return cleanup;
  }, [reduced]);

  return (
    <div className={`relative w-full max-w-full overflow-x-hidden min-h-screen transition-colors duration-300 ${isLight ? 'bg-[#faf7f2] text-[#20130b]' : 'bg-[#000000] text-white'}`}>
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

export default function App() {
  return (
    <ThemeProvider>
      <SiteContent />
    </ThemeProvider>
  );
}
