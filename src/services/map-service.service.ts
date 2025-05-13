import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MapServiceService {
  constructor() {}
  /**
   * Récupère la position actuelle de l'utilisateur
   */
  getCurrentPosition(): Observable<{ latitude: number; longitude: number }> {
    if (!navigator.geolocation) {
      return of(null);
    }

    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      })
    ).pipe(
      map((position) => ({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })),
      catchError((error) => {
        console.error('Erreur de géolocalisation:', error);
        return of(null);
      })
    );
  }

  /**
   * Calcule la distance entre deux points en km
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
