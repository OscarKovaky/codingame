import { Component } from '@angular/core';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  readonly posts: BlogPost[] = [
    {
      title: 'Cómo organizar un diseño por componentes en Angular',
      date: '2026-03-15',
      excerpt: 'Separar responsabilidades permite escalar la app sin romper la experiencia de usuario.'
    },
    {
      title: 'Dark mode sin complicaciones',
      date: '2026-03-10',
      excerpt: 'Usar variables CSS hace más simple mantener consistencia entre tema claro y oscuro.'
    },
    {
      title: 'Checklist para publicar tu portafolio técnico',
      date: '2026-02-28',
      excerpt: 'Contenido, performance y accesibilidad como base para una presentación profesional.'
    }
  ];
}
