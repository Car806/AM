import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { WhatsAppButton } from './WhatsAppButton';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-stagger]', {
        y: 22,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-10 sm:pt-28 sm:pb-12 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Haz de luz sutil azul hielo en plano superior y reflejo naranja inferior derecho */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[22%] left-0 w-[55vw] max-w-[680px] h-[1px] beam-ice opacity-65"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#42BFFF]/[0.06] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[-8%] w-[520px] h-[520px] rounded-full bg-[#FF5A1F]/[0.11] blur-[120px]"
      />

      {/* Escena central legible sobre el objeto 3D */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] my-auto py-8 sm:py-12">
        <div className="max-w-[660px] relative sm:bg-transparent bg-[#050608]/85 border border-[#D8DEE5]/10 sm:border-0 p-5 sm:p-0 rounded-sm">
          <p
            data-hero-stagger
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7DEBFF] mb-6"
          >
            {BRAND_CONFIG.heroKicker}
          </p>

          <h1
            data-hero-stagger
            className="font-display font-bold tracking-[-0.03em] leading-[0.98] text-[#F5F7FA] text-[clamp(2.5rem,6vw,5.25rem)] text-balance"
          >
            Tu negocio.
            <br />
            Una{' '}
            <span className="text-metallic-orange relative inline-block">
              web
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#FF7A32] to-transparent"
              />
            </span>{' '}
            fuera
            <br />
            de lo común.
          </h1>

          <p
            data-hero-stagger
            className="mt-7 text-base sm:text-lg leading-relaxed text-[#D8DEE5]/85 max-w-[540px]"
          >
            Diseñamos experiencias digitales a medida para marcas y negocios que quieren destacar,
            conectar con sus clientes y crecer en internet.
          </p>

          <div
            data-hero-stagger
            className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <WhatsAppButton label="Quiero mi página web" variant="primary" />

            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-[15px] font-medium text-[#D8DEE5] hover:text-[#7DEBFF] border border-[#D8DEE5]/20 hover:border-[#7DEBFF]/50 bg-[#050608]/75 rounded-sm transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explorar proyectos</span>
              <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Indicador minimalista de scroll */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] flex items-center justify-between pt-4">
        <a
          href="#escena-narrativa"
          className="group inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-[#D8DEE5]/70 hover:text-[#F5F7FA] transition-colors"
        >
          <span className="relative block w-8 h-[1px] bg-[#D8DEE5]/35 overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-[#7DEBFF] animate-[pulse_2.4s_ease-in-out_infinite] group-hover:w-full transition-all" />
          </span>
          <span>Desplaza para descubrir</span>
        </a>

        <span className="hidden sm:inline-block text-xs text-[#D8DEE5]/55 tracking-wide">
          Guadalajara · Diseño y desarrollo web
        </span>
      </div>
    </section>
  );
};
