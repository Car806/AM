import React, { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { buildProjectWhatsAppMessage } from '../utils/whatsapp';
import { WhatsAppButton } from './WhatsAppButton';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const screenshots = project.screenshots?.length ? project.screenshots : [project.coverImage];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#050608]/92"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1040px] max-h-[90vh] overflow-y-auto bg-[#0A0D12] border border-[#D8DEE5]/15 rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior fija dentro del modal */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#0A0D12]/95 border-b border-[#D8DEE5]/10">
          <div className="min-w-0">
            <p className="text-xs text-[#7DEBFF] tracking-[0.14em] uppercase truncate">
              {project.businessType}
              {project.location ? ` · ${project.location}` : ''}
            </p>
            <h3
              id="project-modal-title"
              className="font-display text-lg sm:text-xl font-bold text-[#F5F7FA] truncate"
            >
              {project.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Cerrar detalle de ${project.name}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-[#D8DEE5]/15 text-[#D8DEE5] hover:text-[#F5F7FA] hover:border-[#FF5A1F]/70 transition-colors shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Mockup de navegador con captura real */}
          <div className="space-y-4">
            {screenshots.map((src, index) => (
              <div
                key={`${project.id}-shot-${index}`}
                className="rounded-sm overflow-hidden border border-[#D8DEE5]/15 bg-[#050608]"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#171C23]/80 border-b border-[#D8DEE5]/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8DEE5]/25" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8DEE5]/25" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8DEE5]/25" aria-hidden="true" />
                  <span className="ml-3 text-[11px] text-[#D8DEE5]/55 truncate">
                    {project.name}
                  </span>
                </div>
                <img
                  src={src}
                  alt={`Captura real del sitio web ${project.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block object-cover"
                />
              </div>
            ))}
          </div>

          {/* Información verificada disponible */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#D8DEE5]/55 mb-2">
                  Descripción del proyecto
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#D8DEE5]/90">
                  {project.description}
                </p>
              </div>

              {project.challenge && (
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] text-[#D8DEE5]/55 mb-2">
                    Desafío de diseño
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-[#D8DEE5]/85">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] text-[#D8DEE5]/55 mb-2">
                    Solución implementada
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-[#D8DEE5]/85">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-6">
              {project.features && project.features.length > 0 && (
                <div className="p-5 bg-[#050608] border border-[#D8DEE5]/10 rounded-sm">
                  <h4 className="text-xs uppercase tracking-[0.18em] text-[#7DEBFF] mb-3">
                    Aspectos visibles en la interfaz
                  </h4>
                  <ul className="space-y-2.5 text-sm text-[#D8DEE5]/85">
                    {project.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 bg-[#FF5A1F] shrink-0"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] text-[#D8DEE5]/55 mb-2">
                    Tecnologías
                  </h4>
                  <p className="text-sm text-[#D8DEE5]/85">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <WhatsAppButton
                  label="Quiero una web así para mi negocio"
                  message={buildProjectWhatsAppMessage(project.name)}
                  variant="primary"
                  className="w-full"
                />

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#D8DEE5] border border-[#D8DEE5]/20 hover:border-[#7DEBFF]/60 hover:text-[#7DEBFF] rounded-sm transition-colors"
                  >
                    <span>Visitar sitio publicado</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
