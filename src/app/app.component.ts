import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

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
  private cube?: THREE.Mesh;
  private frameId?: number;

  readonly sections = [
    {
      title: 'Inicio',
      description: 'Presentación rápida con enfoque en valor de negocio y resultados.'
    },
    {
      title: 'Proyectos',
      description: 'Casos destacados con impacto, stack técnico y métricas clave.'
    },
    {
      title: 'Servicios',
      description: 'Desarrollo web, automatización y consultoría técnica.'
    },
    {
      title: 'Contacto',
      description: 'Canal directo para propuestas, colaboraciones y soporte.'
    }
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

  private initializeThreeScene(): void {
    const host = this.canvasHost.nativeElement;
    const { clientWidth, clientHeight } = host;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(clientWidth, clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.3,
      roughness: 0.4,
      wireframe: true
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const pointLight = new THREE.PointLight(0xffffff, 1.4);
    pointLight.position.set(4, 6, 6);

    this.scene.add(ambientLight);
    this.scene.add(pointLight);

    this.camera.position.z = 3.5;
    this.updateCameraAspect(clientWidth, clientHeight);
  }

  private animate = (): void => {
    if (!this.renderer || !this.cube) {
      return;
    }

    this.cube.rotation.x += 0.003;
    this.cube.rotation.y += 0.006;

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
