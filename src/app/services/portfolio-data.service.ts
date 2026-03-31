import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

export interface WorkCard {
  title: string;
  summary: string;
  stack: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  getIntro(): Observable<{ name: string; role: string; description: string }> {
    return of({
      name: 'Oscar Ramirez Aguilar',
      role: 'Desarrollador Web',
      description:
        'Diseñador y desarrollador de páginas web para pequeñas y medianas empresas, con enfoque en sitios modernos, funcionales y adaptables a cualquier pantalla.'
    });
  }

  getServices(): Observable<ServiceCard[]> {
    return of([
      {
        title: 'Diseño Web',
        description:
          'Páginas web atractivas, funcionales y rápidas, pensadas para mejorar la experiencia del visitante y aumentar conversiones.',
        icon: '🎨'
      },
      {
        title: 'Responsive Design',
        description:
          'Sitios optimizados para celulares, tablets, laptops y pantallas grandes, priorizando una experiencia mobile-first.',
        icon: '📱'
      },
      {
        title: 'SEO',
        description:
          'Aplicación de prácticas de SEO técnico y de contenido para mejorar visibilidad y posicionamiento en Google.',
        icon: '🚀'
      },
      {
        title: 'Autoadministrable',
        description:
          'Implementación de gestores de contenido para que puedas editar y mantener tu web sin depender de terceros.',
        icon: '🧩'
      },
      {
        title: 'Mantenimiento',
        description:
          'Soporte para actualizar secciones, corregir contenido y mantener tu sitio web seguro y actualizado.',
        icon: '🛠️'
      },
      {
        title: 'Marketing Digital',
        description:
          'Apoyo en campañas y analítica con herramientas como Google Ads y Google Analytics para captar más clientes.',
        icon: '📈'
      }
    ]);
  }

  getWork(): Observable<WorkCard[]> {
    return of([
      {
        title: 'Landing para startup',
        summary: 'Diseño moderno, animaciones suaves y foco en conversión.',
        stack: 'HTML + CSS + jQuery',
        icon: '✨'
      },
      {
        title: 'Tienda online',
        summary: 'Catálogo responsive con checkout optimizado para mobile.',
        stack: 'UI/UX + rendimiento + SEO',
        icon: '🛍️'
      },
      {
        title: 'Web corporativa',
        summary: 'Sitio autoadministrable con panel de contenido.',
        stack: 'WordPress + HTML5 + CSS3',
        icon: '🏢'
      },
      {
        title: 'Portafolio creativo',
        summary: 'Identidad visual personalizada con interacción dinámica.',
        stack: 'JavaScript + Owl Carousel',
        icon: '💡'
      }
    ]);
  }
}
