export interface DegradationFilter {
  etat?: 'Ouvert' | 'En cours' | 'Clos';
  typePb?: 'voix' | 'data' | 'voix & data' | 'infrastructure';
  dateDebut?: Date;
  dateFin?: Date;
  zone?: string;
  priorite?: 'Haute' | 'Moyenne' | 'Basse';
  createdBy?: string;
  assignedTo?: string;
  searchText?: string;
  sortBy?: 'dateSignalisation' | 'priorite' | 'zone';
  sortOrder?: 'asc' | 'desc';
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface FilterState {
  filter: DegradationFilter;
  pagination: Pagination;
}
