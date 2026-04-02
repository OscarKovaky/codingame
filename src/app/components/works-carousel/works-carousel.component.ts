import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WorkCard } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-works-carousel',
  standalone: true,
  templateUrl: './works-carousel.component.html',
  styleUrl: './works-carousel.component.css'
})
export class WorksCarouselComponent implements OnInit, OnDestroy {
  @Input({ required: true }) works: WorkCard[] = [];

  activeIndex = 0;
  private autoplayId?: ReturnType<typeof setInterval>;

  get activeWork(): WorkCard | undefined {
    return this.works[this.activeIndex];
  }

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  select(index: number): void {
    if (!this.works.length) {
      this.activeIndex = 0;
      return;
    }

    this.activeIndex = ((index % this.works.length) + this.works.length) % this.works.length;
    this.restartAutoplay();
  }

  previous(): void {
    this.activeIndex = this.wrapIndex(this.activeIndex - 1);
    this.restartAutoplay();
  }

  next(): void {
    this.activeIndex = this.wrapIndex(this.activeIndex + 1);
    this.restartAutoplay();
  }

  offsetFor(index: number): number {
    if (!this.works.length) {
      return 0;
    }

    const rawOffset = index - this.activeIndex;
    const half = Math.floor(this.works.length / 2);

    if (rawOffset > half) {
      return rawOffset - this.works.length;
    }

    if (rawOffset < -half) {
      return rawOffset + this.works.length;
    }

    return rawOffset;
  }

  translateYFor(index: number): string {
    return `${Math.abs(this.offsetFor(index)) * 10}px`;
  }

  rotateFor(index: number): string {
    return `${this.offsetFor(index) * -20}deg`;
  }

  scaleFor(index: number): number {
    return Math.max(0.72, 1 - Math.abs(this.offsetFor(index)) * 0.12);
  }

  opacityFor(index: number): number {
    return Math.max(0.34, 1 - Math.abs(this.offsetFor(index)) * 0.22);
  }

  zIndexFor(index: number): number {
    return 10 - Math.abs(this.offsetFor(index));
  }

  private startAutoplay(): void {
    if (this.autoplayId || this.works.length < 2) {
      return;
    }

    this.autoplayId = setInterval(() => {
      this.activeIndex = this.wrapIndex(this.activeIndex + 1);
    }, 4000);
  }

  private stopAutoplay(): void {
    if (!this.autoplayId) {
      return;
    }

    clearInterval(this.autoplayId);
    this.autoplayId = undefined;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  private wrapIndex(index: number): number {
    if (!this.works.length) {
      return 0;
    }

    return ((index % this.works.length) + this.works.length) % this.works.length;
  }
}
