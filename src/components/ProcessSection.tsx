import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStage {
  number: string;
  title: string;
  description: string;
}

const STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Entendemos el negocio, sus objetivos, su público y sus necesidades.',
  },
  {
    number: '02',
    title: 'Dirección creativa',
    description:
      'Definimos la estructura, el estilo visual y la experiencia que mejor se adapta al proyecto.',
  },
  {
    number: '03',
    title: 'Diseño y desarrollo',
    description:
      'Construimos la web cuidando el diseño, la navegación, la adaptación a dispositivos y las funcionalidades acordadas.',
  },
  {
    number: '04',
    title: 'Publicación',
    description: 'Preparamos la entrega y la puesta en marcha de acuerdo con el alcance contratado.',
  },
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-process-timeline]',
              start: 'top 72%',
              end: 'bottom 68%',
              scrub: 0.4,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('[data-process-step]').forEach((step) => {
        gsap.from(step, {
          y: 26,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            once: true,
          },
          clearProps: 'transform,opacity',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-36 px-5 sm:px-8 lg:px-12 bg-[#0A0D12] border-t border-[#D8DEE5]/8"
    >
      <div className="mx-auto max-w-[1360px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Columna izquierda: Titular sticky en escritorio */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7DEBFF] mb-4">
              Metodología
            </p>
            <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.03] text-[#F5F7FA] text-[clamp(2.1rem,4.2vw,3.6rem)] text-balance">
              De la idea
              <br />a la experiencia.
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#D8DEE5]/75 max-w-[400px]">
              Un recorrido claro desde la conversación inicial hasta la puesta en marcha de tu
              página web.
            </p>
          </div>
        </div>

        {/* Columna derecha: Línea luminosa azul hielo -> naranja conectando 4 etapas */}
        <div data-process-timeline className="lg:col-span-7 relative pl-8 sm:pl-12">
          {/* Carril base oscuro */}
          <div
            aria-hidden="true"
            className="absolute left-2.5 sm:left-3.5 top-2 bottom-2 w-[1px] bg-[#D8DEE5]/15"
          />
          {/* Haz luminoso animado con progreso de scroll */}
          <div
            ref={beamRef}
            aria-hidden="true"
            className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-[#7DEBFF] via-[#42BFFF] to-[#FF5A1F]"
          />

          <ol className="space-y-12 sm:space-y-16">
            {STAGES.map((stage, idx) => {
              const isLateStage = idx >= 2;
              return (
                <li key={stage.number} data-process-step className="relative">
                  {/* Nodo luminoso sobre la línea */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-8 sm:-left-12 top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0A0D12] border flex items-center justify-center ${
                      isLateStage ? 'border-[#FF5A1F]/70' : 'border-[#7DEBFF]/70'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLateStage ? 'bg-[#FF5A1F]' : 'bg-[#7DEBFF]'
                      }`}
                    />
                  </span>

                  <div className="border-b border-[#D8DEE5]/10 pb-8 sm:pb-10">
                    <span
                      className={`font-display text-xs font-semibold tracking-[0.2em] tabular-nums ${
                        isLateStage ? 'text-[#FF7A32]' : 'text-[#7DEBFF]'
                      }`}
                    >
                      {stage.number}
                    </span>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F7FA]">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#D8DEE5]/80 max-w-[52ch]">
                      {stage.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
