export interface SocialLink {
  label: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const WHATSAPP_NUMBER = '523333040082';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, vengo de la web de A tu manera digital y me gustaría recibir información sobre el diseño de una página web para mi negocio.';

export const BRAND_CONFIG = {
  name: 'A tu manera digital',
  shortTagline: 'Tu negocio, a tu manera. Tu web, a otro nivel.',
  heroKicker: 'Estudio digital independiente',
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDefaultMessage: DEFAULT_WHATSAPP_MESSAGE,
  navItems: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ] as NavItem[],
  // Agregar aquí URLs reales cuando existan
  socialLinks: [] as SocialLink[],
  // Agregar ruta o URL real cuando exista una página de privacidad
  privacyPolicyUrl: null as string | null,
} as const;
