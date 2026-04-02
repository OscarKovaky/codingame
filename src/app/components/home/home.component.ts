import { Component, inject } from '@angular/core';
import { PortfolioMetric, PortfolioMetricsService } from '../../services/portfolio-metrics.service';
import { PortfolioDataService, ServiceCard, WorkCard } from '../../services/portfolio-data.service';
import { ServicesShowcaseComponent } from '../services-showcase/services-showcase.component';
import { WorksCarouselComponent } from '../works-carousel/works-carousel.component';

type CodeTokenType = 'keyword' | 'variable' | 'function' | 'property' | 'string' | 'punctuation' | 'plain' | 'indent';

interface CodeToken {
  text: string;
  type: CodeTokenType;
}

interface CodePreviewLine {
  tokens: CodeToken[];
}

interface HeroHighlight {
  label: string;
  accent: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ServicesShowcaseComponent, WorksCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly portfolioDataService = inject(PortfolioDataService);
  private readonly portfolioMetricsService = inject(PortfolioMetricsService);

  readonly intro = {
    name: '',
    role: '',
    description: ''
  };

  readonly heroHighlights: HeroHighlight[] = [
    { label: 'Experiencias responsivas', accent: '#8b5cff' },
    { label: 'Diseño premium', accent: '#ff70bf' },
    { label: 'Implementación limpia', accent: '#59d7ff' }
  ];

  readonly technologies: HeroHighlight[] = [
    { label: 'Angular', accent: '#ff6a95' },
    { label: 'TypeScript', accent: '#59d7ff' },
    { label: 'HTML5', accent: '#ffb45d' },
    { label: 'CSS3', accent: '#8b5cff' },
    { label: 'Responsive UI', accent: '#5be7b2' },
    { label: 'SEO técnico', accent: '#ffd76c' }
  ];

  readonly codePreviewLines: CodePreviewLine[] = [
    {
      tokens: [
        { text: 'const', type: 'keyword' },
        { text: ' ', type: 'plain' },
        { text: 'brand', type: 'variable' },
        { text: ' = ', type: 'plain' },
        { text: 'createExperience', type: 'function' },
        { text: '({', type: 'punctuation' }
      ]
    },
    {
      tokens: [
        { text: '  ', type: 'indent' },
        { text: 'name', type: 'property' },
        { text: ': ', type: 'plain' },
        { text: "'Oscar Ramirez'", type: 'string' },
        { text: ',', type: 'punctuation' }
      ]
    },
    {
      tokens: [
        { text: '  ', type: 'indent' },
        { text: 'focus', type: 'property' },
        { text: ': [', type: 'plain' },
        { text: "'Angular'", type: 'string' },
        { text: ', ', type: 'punctuation' },
        { text: "'UI'", type: 'string' },
        { text: ', ', type: 'punctuation' },
        { text: "'Responsive'", type: 'string' },
        { text: '],', type: 'punctuation' }
      ]
    },
    {
      tokens: [
        { text: '  ', type: 'indent' },
        { text: 'goal', type: 'property' },
        { text: ': ', type: 'plain' },
        { text: "'Convertir visitas en clientes'", type: 'string' }
      ]
    },
    {
      tokens: [{ text: '});', type: 'punctuation' }]
    },
    {
      tokens: []
    },
    {
      tokens: [
        { text: 'launchProject', type: 'function' },
        { text: '(', type: 'punctuation' },
        { text: 'brand', type: 'variable' },
        { text: ');', type: 'punctuation' }
      ]
    }
  ];

  serviceCards: ServiceCard[] = [];
  workCards: WorkCard[] = [];
  metrics: PortfolioMetric[] = [];

  constructor() {
    this.portfolioDataService.getIntro().subscribe((intro) => Object.assign(this.intro, intro));
    this.portfolioDataService.getServices().subscribe((services) => (this.serviceCards = services));
    this.portfolioDataService.getWork().subscribe((work) => (this.workCards = work));
    this.portfolioMetricsService.getHighlights().subscribe((metrics) => (this.metrics = metrics));
  }
}
