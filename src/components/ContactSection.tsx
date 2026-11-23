import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-cta-reveal]', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative z-10 py-28 sm:py-40 px-5 sm:px-8 lg:px-12 bg-[#050608] border-t border-[#D8DEE5]/10 overflow-hidden"
    >
      {/* Luz azul hielo recorriendo suavemente la escena */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-0 w-full h-[1px] beam-ice opacity-40"
      />
      {/* Halo naranja iluminando el núcleo metálico central */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[360px] rounded-full bg-[#FF5A1F]/[0.11] blur-[130px]"
      />

      <div className="relative mx-auto max-w-[980px] surface-steel surface-chrome-edge p-8 sm:p-14 lg:p-20 text-center">
        {/* Elemento metálico central sutil */}
        <div
          aria-hidden="true"
          className="mx-auto mb-8 w-16 h-[2px] bg-gradient-to-r from-[#7DEBFF] via-[#F5F7FA] to-[#FF5A1F]"
        />

        <p
          data-cta-reveal
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF7A32] mb-5"
        >
          Conversemos sobre tu proyecto
        </p>

        <h2
          data-cta-reveal
          className="font-display font-bold tracking-[-0.03em] leading-[1.03] text-[#F5F7FA] text-[clamp(2.2rem,5vw,4rem)] text-balance"
        >
          Tu próxima web
          <br />
          puede empezar aquí.
        </h2>

        <p
          data-cta-reveal
          className="mt-6 text-base sm:text-lg leading-relaxed text-[#D8DEE5]/85 max-w-[560px] mx-auto"
        >
          Cuéntanos qué necesita tu negocio. Hablemos de tu idea y encontremos la mejor forma de
          convertirla en una experiencia digital.
        </p>

        <div
          data-cta-reveal
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <WhatsAppButton label="Hablemos por WhatsApp" variant="primary" />

          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-[15px] font-medium text-[#D8DEE5] hover:text-[#7DEBFF] border border-[#D8DEE5]/20 hover:border-[#7DEBFF]/55 bg-[#050608]/80 rounded-sm transition-colors whitespace-nowrap shrink-0"
          >
            <span>Ver proyectos</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
