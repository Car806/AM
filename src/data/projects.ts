export interface ProjectItem {
  id: string;
  name: string;
  businessType: string;
  location?: string;
  description: string;
  coverImage: string;
  screenshots?: string[];
  technologies?: string[];
  liveUrl?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  accentColor: string;
  layoutVariant: 'wide' | 'editorial' | 'portrait' | 'cinema';
}

export const INITIAL_VISIBLE_PROJECTS = 4;

/**
 * Proyectos reales realizados por A tu manera digital.
 * Cada entrada refleja únicamente información verificable en las capturas reales proporcionadas.
 */
export const REAL_PROJECTS: ProjectItem[] = [
  {
    id: 'skin-solutions-mx',
    name: 'SkinSolutionsMX',
    businessType: 'Medicina Estética de Autor',
    location: 'Guadalajara, Jalisco',
    description:
      'Experiencia digital sobria y editorial para la Dra. Sara Morán de la Torre, centrada en protocolos médico-estéticos personalizados, acceso clínico y agendamiento de valoración.',
    coverImage: '/assets/aistudio/image_16eb8479.png',
    screenshots: ['/assets/aistudio/image_16eb8479.png'],
    features: [
      'Agendamiento directo de valoración',
      'Exploración de menú clínico y casos reales',
      'Acceso clínico y sección Mi Protocolo',
    ],
    accentColor: '#FF5A1F',
    layoutVariant: 'wide',
  },
  {
    id: 'black-heaven',
    name: 'Black Heaven',
    businessType: 'Barbería',
    location: 'Guadalajara',
    description:
      'Sitio de estética oscura y alto contraste que destaca el detalle artesanal de la barbería, su equipo, productos, galería y reserva directa de citas.',
    coverImage: '/assets/aistudio/image_39898d4f.png',
    screenshots: ['/assets/aistudio/image_39898d4f.png'],
    features: [
      'Galería visual de espacios y detalle de servicio',
      'Navegación enfocada en equipo, productos y ubicación',
      'Llamado directo a reserva de cita',
    ],
    accentColor: '#D4A56A',
    layoutVariant: 'editorial',
  },
  {
    id: 'brunessa',
    name: 'Brunessa',
    businessType: 'Brunch · Café · Panadería',
    location: 'Guadalajara',
    description:
      'Plataforma luminosa orientada a producto para explorar bebidas y panadería de la casa, consultar precios y ordenar en línea de forma directa.',
    coverImage: '/assets/aistudio/image_962d7594.png',
    screenshots: ['/assets/aistudio/image_962d7594.png'],
    features: [
      'Catálogo visual de bebidas y menú',
      'Flujo directo de pedido en línea',
      'Secciones de extras y ubicación en Guadalajara',
    ],
    accentColor: '#769156',
    layoutVariant: 'editorial',
  },
  {
    id: 'badial-odontologia',
    name: 'Badial Odontología Integral',
    businessType: 'Salud y Odontología',
    description:
      'Web enfocada en cercanía y confianza para el Dr. Pedro Badial, estructurada para presentar servicios de diagnóstico y ortodoncia con agendamiento inmediato.',
    coverImage: '/assets/aistudio/image_ab7b37e2.png',
    screenshots: ['/assets/aistudio/image_ab7b37e2.png'],
    features: [
      'Presentación clara de servicios y resultados',
      'Trayectoria y perfil profesional del especialista',
      'Botones directos para agendar cita',
    ],
    accentColor: '#E11D2E',
    layoutVariant: 'wide',
  },
  {
    id: 'bioko-cuidado-capilar',
    name: 'BioKo Cuidado Capilar',
    businessType: 'Estética y Cuidado Capilar',
    description:
      'Escaparate editorial con tipografía clásica y composición en columnas diseñada para presentar línea de productos capilares, diagnóstico y rituales de cuidado.',
    coverImage: '/assets/aistudio/image_f6aaad2c.png',
    screenshots: ['/assets/aistudio/image_f6aaad2c.png'],
    features: [
      'Composición editorial enfocada en producto',
      'Presentación estructurada de línea capilar',
      'Jerarquía tipográfica de contraste suave',
    ],
    accentColor: '#9C7B32',
    layoutVariant: 'cinema',
  },
];

export function hasRenderableProjects(projects: readonly ProjectItem[]): boolean {
  return projects.length > 0;
}

export function getVisibleProjects(
  projects: readonly ProjectItem[],
  showAll: boolean,
  initialLimit: number = INITIAL_VISIBLE_PROJECTS
): ProjectItem[] {
  if (showAll) {
    return [...projects];
  }
  return projects.slice(0, Math.max(0, initialLimit));
}
