import { useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSculpture3D } from './components/HeroSculpture3D';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { DifferentiatorsSection } from './components/DifferentiatorsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollProgressRef = useRef<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const heroRange = Math.max(window.innerHeight * 1.4, 700);
      const progress = Math.min(Math.max(window.scrollY / heroRange, 0), 1);
      scrollProgressRef.current = progress;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050608] text-[#F5F7FA]">
      {/* Escena 3D de metal pulido con iluminación naranja y azul hielo */}
      <HeroSculpture3D scrollProgressRef={scrollProgressRef} />

      <Navbar />

      <main>
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <DifferentiatorsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
