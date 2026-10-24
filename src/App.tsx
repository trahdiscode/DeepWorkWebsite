import { useEffect } from 'react';
import { Header, Footer } from './components/Chrome';
import { Hero } from './components/Hero';
import { Protocols } from './components/Protocols';
import { Aesthetics } from './components/Aesthetics';
import { FeaturesMatrix } from './components/FeaturesMatrix';
import { AcousticShield } from './components/AcousticShield';
import { Trajectory } from './components/Trajectory';
import { Access } from './components/Access';
import { useReducedMotion } from './hooks/useReducedMotion';
import { startScroll } from './lib/scroll';

export default function App() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const cleanup = startScroll(reduced);
    return cleanup;
  }, [reduced]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Protocols />
        <Aesthetics />
        <FeaturesMatrix />
        <AcousticShield />
        <Trajectory />
        <Access />
      </main>
      <Footer />
    </>
  );
}
