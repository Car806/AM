import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-service-block]').forEach((block, idx) => {
        gsap.from(block, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          delay: (idx % 2) * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 84%',
            once: true,
          },
          clearProps: 'transform,opacity',
        });
      });

      gsap.from('[data-service-line]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-service-line]',
          start: 'top 85%',
          once: true,
        },
        clearProps: 'transform',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#0A0D12] border-t border-[#D8DEE5]/8"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Encabezado editorial asimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7DEBFF] mb-4">
              Capacidades del estudio
            </p>
            <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.04] text-[#F5F7FA] text-[clamp(2rem,4vw,3.5rem)] text-balance">
              Cada negocio exige una arquitectura distinta.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="text-sm sm:text-base leading-relaxed text-[#D8DEE5]/75">
              No partimos de plantillas prefabricadas. Construimos interfaces con intención visual,
              estructura clara y enfoque comercial.
            </p>
          </div>
        </div>

        {/* Composición modular heterogénea para los 6 servicios */}
        <div className="space-y-8 sm:space-y-10">
          {/* Bloque A (Asimétrico 7 / 5): Diseño web personalizado + Landing pages de conversión */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* 01. Diseño web personalizado — Línea de luz que dibuja una estructura */}
            <article
              data-service-block
              className="lg:col-span-7 surface-steel surface-chrome-edge p-7 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[290px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-radial from-[#7DEBFF]/[0.09] to-transparent"
              />
              <div className="flex items-center justify-between gap-4 mb-10">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#7DEBFF] tabular-nums">
                  01
                </span>
                {/* Estructura lineal minimalista */}
                <div className="flex items-center gap-2 w-40" aria-hidden="true">
                  <span data-service-line className="h-[1px] flex-1 bg-gradient-to-r from-[#7DEBFF] to-[#D8DEE5]/20" />
                  <span className="w-2 h-2 border border-[#7DEBFF]/70 rotate-45" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F7FA]">
                  Diseño web personalizado
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#D8DEE5]/80 max-w-[52ch]">
                  Páginas creadas alrededor de la identidad, las necesidades y los objetivos de cada
                  negocio.
                </p>
              </div>
            </article>

            {/* 02. Landing pages de conversión — Vector direccional naranja */}
            <article
              data-service-block
              className="lg:col-span-5 bg-[#050608] border border-[#D8DEE5]/12 p-7 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[290px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#FF5A1F]/[0.14] blur-[60px]"
              />
              <div className="flex items-center justify-between gap-4 mb-10">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#FF7A32] tabular-nums">
                  02
                </span>
                <span className="text-xs tracking-[0.14em] uppercase text-[#D8DEE5]/55">
                  Foco comercial
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-[#F5F7FA]">
                  Landing pages de conversión
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#D8DEE5]/80">
                  Páginas orientadas a presentar una oferta, generar contactos y facilitar la acción
                  del usuario.
                </p>
                <div className="mt-7 h-[1px] w-full bg-gradient-to-r from-[#FF5A1F] via-[#FF7A32]/40 to-transparent" />
              </div>
            </article>
          </div>

          {/* Bloque B (Banda editorial horizontal): Webs para negocios */}
          <article
            data-service-block
            className="border-y border-[#D8DEE5]/14 py-10 sm:py-14 px-2 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative"
          >
            <div className="lg:col-span-1">
              <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#D8DEE5]/60 tabular-nums">
                03
              </span>
            </div>
            <div className="lg:col-span-5">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F7FA]">
                Webs para negocios
              </h3>
            </div>
            <div className="lg:col-span-6 space-y-3">
              <p className="text-sm sm:text-base leading-relaxed text-[#D8DEE5]/80">
                Experiencias digitales para restaurantes, comercios, profesionales, empresas y otras
                marcas.
              </p>
              <p className="text-xs tracking-[0.12em] uppercase text-[#7DEBFF]/80">
                Restaurantes · Comercios · Profesionales · Empresas
              </p>
            </div>
          </article>

          {/* Bloque C (Tríada asimétrica de proporciones distintas): 04, 05, 06 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* 04. Rediseño y modernización — Superficie metálica dividida */}
            <article
              data-service-block
              className="lg:col-span-4 bg-[#171C23]/45 border border-[#D8DEE5]/10 p-7 sm:p-8 flex flex-col justify-between min-h-[260px]"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#D8DEE5]/70 tabular-nums">
                  04
                </span>
                <div className="flex h-3 w-12 overflow-hidden border border-[#D8DEE5]/20" aria-hidden="true">
                  <span className="w-1/2 bg-[#171C23]" />
                  <span className="w-1/2 bg-gradient-to-r from-[#D8DEE5]/50 to-[#FF5A1F]/70" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                  Rediseño y modernización
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#D8DEE5]/80">
                  Actualización visual y funcional de páginas web que necesitan una presencia digital
                  más profesional.
                </p>
              </div>
            </article>

            {/* 05. Diseño adaptable — Planos coordinados escritorio / móvil */}
            <article
              data-service-block
              className="lg:col-span-4 bg-[#050608] border border-[#D8DEE5]/10 p-7 sm:p-8 flex flex-col justify-between min-h-[260px]"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#7DEBFF] tabular-nums">
                  05
                </span>
                {/* Planos proporcionales sin iconos genéricos */}
                <div className="flex items-end gap-1.5" aria-hidden="true">
                  <span className="w-7 h-4 border border-[#7DEBFF]/50" />
                  <span className="w-4 h-5 border border-[#D8DEE5]/35" />
                  <span className="w-2.5 h-4 border border-[#FF5A1F]/60" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                  Diseño adaptable
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#D8DEE5]/80">
                  Experiencias diseñadas para funcionar de manera coherente en móviles, tabletas y
                  ordenadores.
                </p>
              </div>
            </article>

            {/* 06. Optimización de experiencia — Estructura jerárquica */}
            <article
              data-service-block
              className="md:col-span-2 lg:col-span-4 surface-steel p-7 sm:p-8 flex flex-col justify-between min-h-[260px]"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#FF7A32] tabular-nums">
                  06
                </span>
                <div className="flex flex-col gap-1 w-10 items-end" aria-hidden="true">
                  <span className="h-[1px] w-10 bg-[#D8DEE5]/40" />
                  <span className="h-[1px] w-7 bg-[#7DEBFF]/70" />
                  <span className="h-[1px] w-4 bg-[#FF5A1F]" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F7FA]">
                  Optimización de experiencia
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#D8DEE5]/80">
                  Mejora de la estructura, la claridad del contenido, la navegación y los puntos de
                  conversión.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
