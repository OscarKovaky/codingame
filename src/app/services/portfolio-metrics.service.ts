import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PortfolioMetric {
  label: string;
  value: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioMetricsService {
  getHighlights(): Observable<PortfolioMetric[]> {
    return of([
      { label: 'Proyectos dummy', value: '12', icon: '🧪' },
      { label: 'Servicios activos', value: '6', icon: '⚙️' },
      { label: 'Tiempo de carga', value: '< 1s', icon: '⏱️' }
    ]);
  }
}
