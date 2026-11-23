import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { BrandMark } from './BrandMark';
import { WhatsAppButton } from './WhatsAppButton';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#050608]/95 border-b border-[#D8DEE5]/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 h-16 sm:h-18 flex items-center justify-between gap-8">
        {/* Zona 1: Marca */}
        <a
          href="#inicio"
          aria-label="A tu manera digital, ir al inicio"
          className="focus-visible:outline-2 focus-visible:outline-[#7DEBFF] rounded-sm shrink-0"
        >
          <BrandMark showWordmark compact />
        </a>

        {/* Zona 2: Enlaces de navegación */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7 lg:gap-9">
          {BRAND_CONFIG.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-[13px] lg:text-sm font-medium text-[#D8DEE5]/85 hover:text-[#F5F7FA] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#7DEBFF] hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Acción principal + botón móvil */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <WhatsAppButton label="Cotizar web" variant="header" />
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm border border-[#D8DEE5]/15 bg-[#0A0D12]/90 text-[#F5F7FA] hover:border-[#7DEBFF]/50 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menú móvil accesible */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-t border-[#D8DEE5]/10 bg-[#050608] px-5 py-6"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {BRAND_CONFIG.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="py-3 px-2 text-base font-medium text-[#F5F7FA] hover:text-[#FF7A32] border-b border-[#D8DEE5]/8 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-5">
              <WhatsAppButton
                label="Hablemos por WhatsApp"
                variant="primary"
                className="w-full"
                onClickAfter={handleLinkClick}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
