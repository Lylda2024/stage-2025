import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Degradation } from '../models/degratation.model';
@Injectable({
  providedIn: 'root',
})
export class CarteServiceService {
  constructor() {}
  private selectedDegradation = new BehaviorSubject<Degradation | null>(null);
  private mapBounds = new BehaviorSubject<
    [number, number, number, number] | null
  >(null);
  private mapZoom = new BehaviorSubject<number>(6);

  // Observable de la dégradation sélectionnée
  currentDegradation$ = this.selectedDegradation.asObservable();

  // Observable des limites de la carte
  currentMapBounds$ = this.mapBounds.asObservable();

  // Observable du niveau de zoom
  currentZoom$ = this.mapZoom.asObservable();

  /**
   * Change la dégradation sélectionnée
   */
  selectDegradation(degradation: Degradation | null): void {
    this.selectedDegradation.next(degradation);
  }

  /**
   * Met à jour les limites de la carte
   */
  updateMapBounds(bounds: [number, number, number, number]): void {
    this.mapBounds.next(bounds);
  }

  /**
   * Met à jour le niveau de zoom
   */
  updateZoom(zoom: number): void {
    this.mapZoom.next(zoom);
  }

  /**
   * Centre la carte sur une position spécifique
   */
  centerMap(lat: number, lng: number, zoom: number = 15): void {
    this.updateMapBounds([lat, lng, lat, lng]);
    this.updateZoom(zoom);
  }
}
