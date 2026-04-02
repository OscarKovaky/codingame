import { Component, Input } from '@angular/core';
import { ServiceCard } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-services-showcase',
  standalone: true,
  templateUrl: './services-showcase.component.html',
  styleUrl: './services-showcase.component.css'
})
export class ServicesShowcaseComponent {
  @Input({ required: true }) services: ServiceCard[] = [];
}
