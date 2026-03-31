import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

type AppView = 'inicio' | 'cursos' | 'proyectos' | 'cv';

interface CourseCategory {
  title: string;
  courses: string[];
}

interface Project {
  title: string;
  summary: string;
  stack: string;
  result: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasHost', { static: true })
  canvasHost!: ElementRef<HTMLDivElement>;

  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  private renderer?: THREE.WebGLRenderer;
  private visualizerMesh?: THREE.Mesh;
  private frameId?: number;

  readonly views: { id: AppView; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'cursos', label: 'Cursos' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'cv', label: 'CV' }
  ];

  activeView: AppView = 'inicio';

  readonly courseCategories: CourseCategory[] = [
    {
      title: 'Frontend',
      courses: ['Angular avanzado', 'Arquitectura de componentes', 'Accesibilidad web']
    },
    {
      title: 'Backend y datos',
      courses: ['Node.js y APIs REST', 'Diseño de bases de datos', 'Integración con PostgreSQL']
    },
    {
      title: 'Productividad y DevOps',
      courses: ['Git y flujos colaborativos', 'Deploy en Render/Vercel', 'Monitoreo básico de aplicaciones']
    }
  ];

  readonly projects: Project[] = [
    {
      title: 'Portal de ventas',
      summary: 'Migración de sistema heredado a Angular con enfoque en rendimiento.',
      stack: 'Angular, TypeScript, Node.js, PostgreSQL',
      result: 'Reducción de tiempo de carga en 38% y menor tasa de rebote.'
    },
    {
      title: 'Panel de operaciones',
      summary: 'Dashboard de indicadores para seguimiento operativo en tiempo real.',
      stack: 'Angular, RxJS, Charting, APIs internas',
      result: 'Mejora en la visibilidad de KPIs y decisiones más rápidas.'
    },
    {
      title: 'Sitio de portafolio',
      summary: 'Nueva experiencia modular con visualizador 3D embebido.',
      stack: 'Angular Standalone, Three.js, CSS moderno',
      result: 'Mejor presentación de proyectos y diferenciación visual.'
    }
  ];

  readonly cvItems: string[] = [
    'Desarrollador Full Stack con foco en productos web escalables.',
    'Experiencia liderando migraciones frontend y recuperación de funcionalidades.',
    'Trabajo con equipos multidisciplinarios para entregar valor de negocio.',
    'Dominio de Angular, TypeScript, Node.js, SQL y despliegues cloud.'
  ];

  ngAfterViewInit(): void {
    this.initializeThreeScene();
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }

    window.removeEventListener('resize', this.onResize);
    this.renderer?.dispose();
  }

  setView(view: AppView): void {
    this.activeView = view;
  }

  private initializeThreeScene(): void {
    const host = this.canvasHost.nativeElement;
    const { clientWidth, clientHeight } = host;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(clientWidth, clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(0.75, 0.24, 120, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.55,
      roughness: 0.25,
      wireframe: true
    });

    this.visualizerMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.visualizerMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(4, 6, 6);

    this.scene.add(ambientLight);
    this.scene.add(pointLight);

    this.camera.position.z = 3.3;
    this.updateCameraAspect(clientWidth, clientHeight);
  }

  private animate = (): void => {
    if (!this.renderer || !this.visualizerMesh) {
      return;
    }

    this.visualizerMesh.rotation.x += 0.004;
    this.visualizerMesh.rotation.y += 0.007;

    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(this.animate);
  };

  private onResize = (): void => {
    const host = this.canvasHost.nativeElement;
    const { clientWidth, clientHeight } = host;

    if (!this.renderer) {
      return;
    }

    this.renderer.setSize(clientWidth, clientHeight);
    this.updateCameraAspect(clientWidth, clientHeight);
  };

  private updateCameraAspect(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
