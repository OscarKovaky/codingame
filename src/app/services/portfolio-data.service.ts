import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  accent: string;
  badge?: string;
  link?: string;
  ctaLabel?: string;
  image?: string;
}

export interface WorkCard {
  title: string;
  summary: string;
  stack: string;
  icon: string;
  type: string;
  url?: string;
  image?: string;
  tags: string[];
  previewText: string;
  ctaLabel?: string;
  accent: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  getIntro(): Observable<{ name: string; role: string; description: string }> {
    return of({
      name: 'Oscar Ramirez Aguilar',
      role: 'Desarrollador web y experiencia digital',
      description:
        'Diseño y desarrollo sitios web modernos para marcas, campañas y negocios que necesitan verse mejor, cargar rápido y convertir con una experiencia premium en cualquier pantalla.'
    });
  }

  getServices(): Observable<ServiceCard[]> {
    return of([
      {
        title: 'Diseño web',
        description:
          'Interfaces visuales, elegantes y estratégicas para comunicar valor desde el primer vistazo.',
        icon: 'DS',
        accent: '#4da2ff',
        badge: 'Brand first',
        ctaLabel: 'Explorar servicio'
      },
      {
        title: 'Responsive design',
        description:
          'Experiencias fluidas para celular, tablet y desktop con foco en legibilidad, velocidad y conversión.',
        icon: 'RD',
        accent: '#00c2a8',
        badge: 'Mobile ready',
        ctaLabel: 'Ver enfoque'
      },
      {
        title: 'SEO',
        description:
          'Buenas prácticas técnicas y de contenido para mejorar visibilidad, estructura y posicionamiento orgánico.',
        icon: 'SE',
        accent: '#8b6bff',
        badge: 'Search growth',
        ctaLabel: 'Conocer alcance'
      },
      {
        title: 'Autoadministrable',
        description:
          'Sitios preparados para que puedas actualizar textos, campañas y contenido sin depender de terceros.',
        icon: 'CM',
        accent: '#ff8f4d',
        badge: 'Editable',
        ctaLabel: 'Ver opciones'
      },
      {
        title: 'Mantenimiento',
        description:
          'Soporte continuo para ajustes, mejoras, actualizaciones y estabilidad de tu presencia digital.',
        icon: 'MT',
        accent: '#ff5f7a',
        badge: 'Continuidad',
        ctaLabel: 'Solicitar soporte'
      },
      {
        title: 'Marketing digital',
        description:
          'Acompañamiento en campañas, analítica y optimización para atraer tráfico con mejor intención de compra.',
        icon: 'MK',
        accent: '#f5c04a',
        badge: 'Performance',
        ctaLabel: 'Revisar estrategia'
      }
    ]);
  }

  getWork(): Observable<WorkCard[]> {
    return of([
      {
        title: 'Sitio de Promociones HSBC',
        summary: 'Plataforma promocional con enfoque visual y navegación por campañas y categorías.',
        stack: 'Angular / frontend web / experiencia responsiva',
        icon: 'HS',
        type: 'Plataforma de promociones web',
        url: 'https://programascub.mx/hsbc_2/',
        tags: ['Campañas', 'Responsive', 'Frontend', 'Promociones'],
        previewText: 'Campañas destacadas, navegación clara y experiencia visual orientada a conversión.',
        ctaLabel: 'Ver proyecto',
        accent: '#e84d8a'
      },
      {
        title: 'Landing para startup',
        summary: 'Página de lanzamiento con narrativa visual, ritmo de scroll y foco en captación.',
        stack: 'Angular / UI motion / performance',
        icon: 'LP',
        type: 'Landing page',
        tags: ['Conversión', 'Animación', 'Branding'],
        previewText: 'Un concepto visual de alto impacto para presentar producto y acelerar demos.',
        ctaLabel: 'Solicitar algo similar',
        accent: '#4da2ff'
      },
      {
        title: 'Web corporativa autoadministrable',
        summary: 'Sitio institucional con jerarquía clara, módulos flexibles y edición sencilla.',
        stack: 'CMS / frontend modular / SEO técnico',
        icon: 'WC',
        type: 'Sitio corporativo',
        tags: ['CMS', 'SEO', 'Contenido'],
        previewText: 'Arquitectura ordenada para crecer secciones, mantener contenido y proyectar confianza.',
        ctaLabel: 'Ver enfoque',
        accent: '#00c2a8'
      },
      {
        title: 'Portafolio creativo',
        summary: 'Experiencia editorial con identidad visual propia y microinteracciones suaves.',
        stack: 'Frontend web / interacción / storytelling',
        icon: 'PC',
        type: 'Portafolio premium',
        tags: ['Editorial', 'UI', 'Motion'],
        previewText: 'Diseñado para mostrar procesos, piezas y valor de marca de manera memorable.',
        ctaLabel: 'Ver inspiración',
        accent: '#8b6bff'
      }
    ]);
  }
}
