import { Component } from '@angular/core';

interface ServiceCard {
  title: string;
  description: string;
}

interface WorkCard {
  title: string;
  summary: string;
  stack: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly intro = {
    name: 'Oscar Ramirez Aguilar',
    role: 'Desarrollador Web',
    description:
      'Diseñador y desarrollador de páginas web para pequeñas y medianas empresas, con enfoque en sitios modernos, funcionales y adaptables a cualquier pantalla.'
  };

  readonly serviceCards: ServiceCard[] = [
    {
      title: 'Diseño Web',
      description:
        'Páginas web atractivas, funcionales y rápidas, pensadas para mejorar la experiencia del visitante y aumentar conversiones.'
    },
    {
      title: 'Responsive Design',
      description:
        'Sitios optimizados para celulares, tablets, laptops y pantallas grandes, priorizando una experiencia mobile-first.'
    },
    {
      title: 'SEO',
      description:
        'Aplicación de prácticas de SEO técnico y de contenido para mejorar visibilidad y posicionamiento en Google.'
    },
    {
      title: 'Autoadministrable',
      description:
        'Implementación de gestores de contenido para que puedas editar y mantener tu web sin depender de terceros.'
    },
    {
      title: 'Mantenimiento',
      description:
        'Soporte para actualizar secciones, corregir contenido y mantener tu sitio web seguro y actualizado.'
    },
    {
      title: 'Marketing Digital',
      description:
        'Apoyo en campañas y analítica con herramientas como Google Ads y Google Analytics para captar más clientes.'
    }
  ];

  readonly workCards: WorkCard[] = [
    {
      title: 'Landing para startup',
      summary: 'Diseño moderno, animaciones suaves y foco en conversión.',
      stack: 'HTML + CSS + jQuery'
    },
    {
      title: 'Tienda online',
      summary: 'Catálogo responsive con checkout optimizado para mobile.',
      stack: 'UI/UX + rendimiento + SEO'
    },
    {
      title: 'Web corporativa',
      summary: 'Sitio autoadministrable con panel de contenido.',
      stack: 'WordPress + HTML5 + CSS3'
    },
    {
      title: 'Portafolio creativo',
      summary: 'Identidad visual personalizada con interacción dinámica.',
      stack: 'JavaScript + Owl Carousel'
    }
  ];
}
