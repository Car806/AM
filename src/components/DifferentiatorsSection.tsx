import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  'Diseño pensado para tu marca, no para una plantilla.',
  'Experiencia diseñada para las personas que visitan tu web.',
  'Una presencia digital alineada con los objetivos de tu negocio.',
];

export const DifferentiatorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-diff-title]', {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });

      gsap.from('[data-diff-item]', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-diff-list]',
          start: 'top 80%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });

      if (flareRef.current) {
        gsap.fromTo(
          flareRef.current,
          { opacity: 0, scaleX: 0.35 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '[data-diff-list]',
              start: 'bottom 88%',
              once: true,
            },
            clearProps: 'transform',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-28 sm:py-40 px-5 sm:px-8 lg:px-12 bg-[#171C23]/40 border-t border-[#D8DEE5]/8 overflow-hidden"
    >
      {/* Estructura metálica diagonal que atraviesa parcialmente la escena */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] h-[180px] -rotate-12 bg-gradient-to-r from-[#0A0D12] via-[#D8DEE5]/[0.08] to-[#050608] border border-[#D8DEE5]/12"
      />

      <div className="relative mx-auto max-w-[1360px]">
        <div className="max-w-[920px]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D8DEE5]/60 mb-6">
            Criterio de diseño
          </p>

          <h2
            data-diff-title
            className="font-display font-bold tracking-[-0.03em] leading-[1.03] text-[#F5F7FA] text-[clamp(2.25rem,5vw,4.35rem)] text-balance"
          >
            No necesitas una web más.
            <br />
            <span className="text-metallic">Necesitas una web que hable por ti.</span>
          </h2>
        </div>

        <div
          data-diff-list
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 border-t border-[#D8DEE5]/12 pt-10 sm:pt-12"
        >
          {PRINCIPLES.map((text, idx) => (
            <div key={text} data-diff-item className="space-y-4">
              <span className="block font-display text-xs font-semibold tracking-[0.18em] text-[#7DEBFF] tabular-nums">
                0{idx + 1}
              </span>
              <p className="text-base sm:text-lg leading-relaxed text-[#F5F7FA]/90">{text}</p>
            </div>
          ))}
        </div>

        {/* Destello naranja de transición al finalizar la última afirmación */}
        <div
          ref={flareRef}
          aria-hidden="true"
          className="mt-14 h-[1px] w-full max-w-[420px] bg-gradient-to-r from-[#FF5A1F] via-[#FF7A32] to-transparent shadow-[0_0_24px_rgba(255,90,31,0.55)]"
        />
      </div>
    </section>
  );
};
