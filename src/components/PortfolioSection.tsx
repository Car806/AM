import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import {
  getVisibleProjects,
  hasRenderableProjects,
  INITIAL_VISIBLE_PROJECTS,
  ProjectItem,
  REAL_PROJECTS,
} from '../data/projects';
import { WhatsAppButton } from './WhatsAppButton';
import { ProjectModal } from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  projects?: readonly ProjectItem[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects = REAL_PROJECTS,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const hasProjects = hasRenderableProjects(projects);
  const visibleProjects = getVisibleProjects(projects, showAll, INITIAL_VISIBLE_PROJECTS);
  const canExpand = projects.length > INITIAL_VISIBLE_PROJECTS;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !hasProjects) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((card, i) => {
        gsap.from(card, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          delay: (i % 2) * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            once: true,
          },
          clearProps: 'transform,opacity',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasProjects, showAll]);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative z-10 py-24 sm:py-36 px-5 sm:px-8 lg:px-12 bg-[#050608] border-t border-[#D8DEE5]/8"
    >
      {/* Destello sutil superior */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[70%] max-w-[900px] h-[1px] beam-orange opacity-45"
      />

      <div className="mx-auto max-w-[1360px]">
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div className="max-w-[680px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF7A32] mb-4">
              Portafolio seleccionado
            </p>
            <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.02] text-[#F5F7FA] text-[clamp(2.15rem,4.5vw,3.75rem)] text-balance">
              Trabajo real.
              <br />
              Experiencias únicas.
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-[#D8DEE5]/80 max-w-[440px]">
            Cada proyecto tiene su propio carácter. Estas son algunas de las experiencias digitales
            que hemos creado.
          </p>
        </div>

        {/* Estado vacío elegante si no hubiera proyectos */}
        {!hasProjects ? (
          <div className="surface-steel p-10 sm:p-16 text-center max-w-[780px] mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
              Cada gran experiencia empieza con una idea.
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#D8DEE5]/80 max-w-[520px] mx-auto">
              Estamos preparando esta selección. Mientras tanto, cuéntanos qué tienes en mente y
              diseñemos tu próxima web.
            </p>
            <div className="mt-8">
              <WhatsAppButton label="Hablemos por WhatsApp" variant="primary" />
            </div>
          </div>
        ) : (
          <>
            {/* Composición editorial variable para proyectos reales */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
              {visibleProjects.map((project, index) => {
                // Alternamos proporciones asimétricas: 0 -> 7 cols, 1 -> 5 cols, 2 -> 5 cols, 3 -> 7 cols, 4 -> 12 cols
                const spanClasses =
                  index === 0 || index === 3
                    ? 'lg:col-span-7'
                    : index === 4
                    ? 'lg:col-span-12'
                    : 'lg:col-span-5';

                const mediaHeightClasses =
                  index === 4
                    ? 'aspect-[21/9]'
                    : index === 0 || index === 3
                    ? 'aspect-[19/9]'
                    : 'aspect-[21/10]';

                return (
                  <article
                    key={project.id}
                    data-project-card
                    className={`${spanClasses} group relative bg-[#0A0D12] border border-[#D8DEE5]/12 hover:border-[#D8DEE5]/30 transition-colors duration-300 rounded-sm overflow-hidden flex flex-col`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Ver detalle del proyecto ${project.name}`}
                      className="text-left w-full flex-1 flex flex-col focus-visible:outline-2 focus-visible:outline-[#7DEBFF]"
                    >
                      {/* Marco de navegador sobrio */}
                      <div className="w-full bg-[#171C23]/85 border-b border-[#D8DEE5]/10 px-4 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="w-2 h-2 rounded-full bg-[#D8DEE5]/25" />
                          <span className="w-2 h-2 rounded-full bg-[#D8DEE5]/25" />
                          <span className="w-2 h-2 rounded-full bg-[#D8DEE5]/25" />
                        </div>
                        <span className="text-[11px] text-[#D8DEE5]/60 tracking-wide truncate max-w-[70%]">
                          {project.businessType}
                        </span>
                      </div>

                      {/* Captura real sin recortes agresivos */}
                      <div
                        className={`relative w-full ${mediaHeightClasses} overflow-hidden bg-[#050608]`}
                      >
                        <img
                          src={project.coverImage}
                          alt={`Captura real del diseño web de ${project.name}`}
                          loading="eager"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                        {/* Sutil reflejo inferior para legibilidad y contraste */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0D12]/65 via-transparent to-transparent opacity-55 group-hover:opacity-30 transition-opacity duration-300"
                        />
                      </div>

                      {/* Pie editorial del proyecto */}
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F7FA] group-hover:text-[#FF7A32] transition-colors">
                              {project.name}
                            </h3>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#7DEBFF] whitespace-nowrap shrink-0">
                              <span>Ver proyecto</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-[#D8DEE5]/60">
                            {project.businessType}
                            {project.location ? ` · ${project.location}` : ''}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-[#D8DEE5]/80 line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>

            {/* Control para ampliar o contraer la colección */}
            {canExpand && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  aria-expanded={showAll}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-[#F5F7FA] bg-[#0A0D12] border border-[#D8DEE5]/20 hover:border-[#7DEBFF]/60 hover:text-[#7DEBFF] rounded-sm transition-colors whitespace-nowrap"
                >
                  {showAll ? (
                    <>
                      <Minus className="w-4 h-4" aria-hidden="true" />
                      <span>Mostrar selección inicial</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span>Explorar todos los proyectos ({projects.length})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
