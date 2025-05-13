export interface Degradation {
  id: string;
  latitude: number;
  longitude: number;
  zone: string;
  typePb: 'voix' | 'data' | 'voix & data' | 'infrastructure';
  problemes: string;
  dateSignalisation: Date;
  dateCreation: Date;
  dateModification?: Date;
  etat: 'Ouvert' | 'En cours' | 'Clos';
  priorite: 'Haute' | 'Moyenne' | 'Basse';
  photos?: string[];
  commentaires?: string;
  createdBy?: string;
  assignedTo?: string;
}

export interface DegradationResponse {
  data: Degradation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface DegradationCreateRequest
  extends Omit<Degradation, 'id' | 'dateCreation' | 'dateModification'> {
  // Champs spécifiques à la création
}

export interface DegradationUpdateRequest
  extends Partial<Omit<Degradation, 'id' | 'dateCreation'>> {
  // Champs spécifiques à la mise à jour
}
