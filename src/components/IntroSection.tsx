import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 36,
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

      gsap.from(bodyRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.85,
        delay: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="escena-narrativa"
      ref={sectionRef}
      className="relative z-10 min-h-[76vh] flex items-center py-24 sm:py-36 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-transparent via-[#0A0D12]/90 to-[#0A0D12]"
    >
      {/* Línea horizontal de transición óptica */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-[1px] beam-ice opacity-35"
      />

      <div className="mx-auto w-full max-w-[1360px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Columna izquierda libre para dejar respirar el desplazamiento lateral de la escultura 3D */}
        <div className="hidden lg:block lg:col-span-5" aria-hidden="true" />

        <div className="lg:col-span-7 bg-[#050608]/60 lg:bg-transparent p-6 sm:p-8 lg:p-0 border border-[#D8DEE5]/10 lg:border-0 rounded-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A32] mb-5">
            Visión del estudio
          </p>

          <h2
            ref={headlineRef}
            className="font-display font-bold tracking-[-0.025em] leading-[1.06] text-[#F5F7FA] text-[clamp(2rem,4.4vw,3.85rem)] text-balance"
          >
            Tu presencia digital merece algo{' '}
            <span className="text-metallic-ice">mejor</span>.
          </h2>

          <p
            ref={bodyRef}
            className="mt-7 text-base sm:text-xl leading-relaxed text-[#D8DEE5]/85 max-w-[580px]"
          >
            Una página web no debería ser solamente una dirección en internet. Debe transmitir quién
            eres, qué ofreces y por qué tus clientes deberían elegirte.
          </p>

          <div className="mt-10 h-[1px] w-32 bg-gradient-to-r from-[#FF5A1F] via-[#7DEBFF] to-transparent" />
        </div>
      </div>
    </section>
  );
};
