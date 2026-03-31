import { Component } from '@angular/core';

@Component({
  selector: 'app-cv',
  standalone: true,
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CvComponent {
  readonly cvItems: string[] = [
    'Desarrollador Full Stack con foco en aplicaciones web escalables.',
    'Experiencia en Angular, TypeScript, Node.js y PostgreSQL.',
    'Implementación de pipelines de despliegue y monitoreo básico.',
    'Trabajo colaborativo con equipos de producto y diseño.'
  ];
}
