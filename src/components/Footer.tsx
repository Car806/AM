import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { BrandMark } from './BrandMark';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    BRAND_CONFIG.whatsappNumber,
    BRAND_CONFIG.whatsappDefaultMessage
  );

  return (
    <footer className="relative z-10 bg-[#050608] border-t border-[#D8DEE5]/10 py-14 sm:py-16 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1360px] flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <a
              href="#inicio"
              aria-label="Volver al inicio de A tu manera digital"
              className="inline-block focus-visible:outline-2 focus-visible:outline-[#7DEBFF] rounded-sm"
            >
              <BrandMark showWordmark />
            </a>
            <p className="text-sm text-[#D8DEE5]/70 max-w-[400px]">
              {BRAND_CONFIG.shortTagline}
            </p>
          </div>

          <nav aria-label="Enlaces del pie de página" className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href="#proyectos"
              className="text-sm text-[#D8DEE5]/80 hover:text-[#F5F7FA] transition-colors whitespace-nowrap"
            >
              Proyectos
            </a>
            <a
              href="#servicios"
              className="text-sm text-[#D8DEE5]/80 hover:text-[#F5F7FA] transition-colors whitespace-nowrap"
            >
              Servicios
            </a>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#FF7A32] hover:text-[#FF5A1F] transition-colors whitespace-nowrap"
              >
                WhatsApp
              </a>
            )}
            {BRAND_CONFIG.socialLinks.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#D8DEE5]/80 hover:text-[#7DEBFF] transition-colors whitespace-nowrap"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-[#D8DEE5]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#D8DEE5]/55">
          <p>
            © {currentYear} {BRAND_CONFIG.name}. Todos los derechos reservados.
          </p>

          {BRAND_CONFIG.privacyPolicyUrl && (
            <a
              href={BRAND_CONFIG.privacyPolicyUrl}
              className="hover:text-[#D8DEE5] transition-colors"
            >
              Política de privacidad
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};
