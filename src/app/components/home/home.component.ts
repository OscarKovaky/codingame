import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { PortfolioDataService, ServiceCard, WorkCard } from '../../services/portfolio-data.service';
import { PortfolioMetric, PortfolioMetricsService } from '../../services/portfolio-metrics.service';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas', { static: true })
  private readonly threeCanvas?: ElementRef<HTMLCanvasElement>;

  private readonly portfolioDataService = inject(PortfolioDataService);
  private readonly portfolioMetricsService = inject(PortfolioMetricsService);

  readonly intro = {
    name: '',
    role: '',
    description: ''
  };

  serviceCards: ServiceCard[] = [];
  workCards: WorkCard[] = [];
  metrics: PortfolioMetric[] = [];

  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private torus?: THREE.Mesh;
  private animationFrameId?: number;

  constructor() {
    this.portfolioDataService.getIntro().subscribe((intro) => Object.assign(this.intro, intro));
    this.portfolioDataService.getServices().subscribe((services) => (this.serviceCards = services));
    this.portfolioDataService.getWork().subscribe((work) => (this.workCards = work));
    this.portfolioMetricsService.getHighlights().subscribe((metrics) => (this.metrics = metrics));
  }

  ngAfterViewInit(): void {
    const canvas = this.threeCanvas?.nativeElement;

    if (!canvas) {
      return;
    }

    const width = canvas.clientWidth || 460;
    const height = canvas.clientHeight || 230;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.z = 2.2;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);

    const geometry = new THREE.TorusKnotGeometry(0.56, 0.18, 120, 16);
    const material = new THREE.MeshStandardMaterial({
      color: '#00d4ff',
      metalness: 0.7,
      roughness: 0.25
    });

    this.torus = new THREE.Mesh(geometry, material);
    this.scene.add(this.torus);

    const light = new THREE.PointLight('#8be9ff', 6, 20);
    light.position.set(2, 2, 3);
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.55);

    this.scene.add(light, ambientLight);

    const animate = () => {
      if (!this.torus || !this.renderer || !this.scene || !this.camera) {
        return;
      }

      this.torus.rotation.x += 0.005;
      this.torus.rotation.y += 0.008;

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.torus?.geometry.dispose();

    if (this.torus?.material instanceof THREE.Material) {
      this.torus.material.dispose();
    }

    this.renderer?.dispose();
  }
}
