import { Component } from '@angular/core';

interface VideoItem {
  title: string;
  description: string;
  duration: string;
}

@Component({
  selector: 'app-videos',
  standalone: true,
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  readonly videos: VideoItem[] = [
    {
      title: 'Angular: componentes standalone desde cero',
      description: 'Guía práctica para estructurar apps modernas con componentes reutilizables.',
      duration: '12:40'
    },
    {
      title: 'Buenas prácticas con TypeScript en frontend',
      description: 'Tipado estricto, modelos de datos y patrones para proyectos escalables.',
      duration: '09:15'
    },
    {
      title: 'Deploy continuo en Render',
      description: 'Pipeline básico para publicar cambios de forma segura y rápida.',
      duration: '07:58'
    }
  ];
}
