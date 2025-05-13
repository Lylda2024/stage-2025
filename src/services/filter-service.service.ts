import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isEqual } from 'lodash-es';

export interface DegradationFilter {
  etat: string | null;
  typePb: string | null;
  dateDebut: Date | null;
  dateFin: Date | null;
  zone: string | null;
  priorite: number | null;
}

const DEFAULT_FILTERS: DegradationFilter = {
  etat: null,
  typePb: null,
  dateDebut: null,
  dateFin: null,
  zone: null,
  priorite: null,
};

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private activeFilters = new BehaviorSubject<DegradationFilter>(
    DEFAULT_FILTERS
  );
  currentFilters$ = this.activeFilters.asObservable();

  /**
   * Met à jour partiellement les filtres
   * @param newFilters Les nouveaux filtres à appliquer
   */
  updateFilters(newFilters: Partial<DegradationFilter>): void {
    const current = this.activeFilters.getValue();
    const updated = { ...current, ...newFilters };

    // Ne pas émettre si les filtres sont identiques
    if (!isEqual(current, updated)) {
      this.activeFilters.next(updated);
    }
  }

  /**
   * Réinitialise tous les filtres
   */
  resetFilters(): void {
    this.activeFilters.next(DEFAULT_FILTERS);
  }

  /**
   * Récupère les filtres actuels (synchrone)
   */
  getCurrentFilters(): DegradationFilter {
    return this.activeFilters.getValue();
  }
}
