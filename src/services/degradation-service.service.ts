import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Degratation, DegradationResponse } from '../models/degratation.model';

@Injectable({
  providedIn: 'root',
})
export class DegratationService {
  private readonly API_URL = 'https://votre-api.com/api/v1/degradations';
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les dégradations avec pagination et filtres
   */
  getAllDegratations(
    page: number = 1,
    limit: number = 20,
    filters?: { [key: string]: string }
  ): Observable<DegradationResponse> {
    const cacheKey = `all_${page}_${limit}_${JSON.stringify(filters)}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params = params.set(key, filters[key]);
      });
    }

    const request = this.http
      .get<DegradationResponse>(this.API_URL, { params })
      .pipe(
        tap((response) => this.cache.set(cacheKey, response)),
        map((response) => ({
          ...response,
          data: response.data.map(this.transformDegradationDates),
        }))
      );

    this.cache.set(cacheKey, request);
    return request;
  }

  /**
   * Récupère une dégradation spécifique par son ID
   */
  getDegradationById(id: string): Observable<Degratation> {
    return this.http
      .get<Degratation>(`${this.API_URL}/${id}`)
      .pipe(map(this.transformDegradationDates));
  }

  /**
   * Crée une nouvelle dégradation
   */
  createDegradation(
    degradation: Omit<Degratation, 'id'>
  ): Observable<Degratation> {
    return this.http.post<Degratation>(this.API_URL, degradation).pipe(
      tap(() => this.clearCache()),
      map(this.transformDegradationDates)
    );
  }

  /**
   * Met à jour une dégradation existante
   */
  updateDegradation(
    id: string,
    degradation: Partial<Degratation>
  ): Observable<Degratation> {
    return this.http
      .patch<Degratation>(`${this.API_URL}/${id}`, degradation)
      .pipe(
        tap(() => this.clearCache()),
        map(this.transformDegradationDates)
      );
  }

  /**
   * Transforme les dates string en objets Date
   */
  private transformDegradationDates(degradation: any): Degratation {
    return {
      ...degradation,
      dateSignalisation: new Date(degradation.dateSignalisation),
      dateCreation: new Date(degradation.dateCreation),
      dateModification: degradation.dateModification
        ? new Date(degradation.dateModification)
        : null,
    };
  }

  /**
   * Vide le cache
   */
  private clearCache(): void {
    this.cache.clear();
  }
}
