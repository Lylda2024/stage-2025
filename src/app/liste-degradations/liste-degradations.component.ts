import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Degradation {
  id: number;
  zone: string;
  localite: string;
  typeAnomalie: string;
  priorite: string;
  dateCreation: Date;
  statut: 'Nouveau' | 'En cours' | 'Résolu';
}

@Component({
  selector: 'app-liste-degradations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-degradations.component.html',
  styleUrl: './liste-degradations.component.scss',
})
export class ListeDegradationsComponent implements OnInit {
  degradations: Degradation[] = [
    {
      id: 1,
      zone: 'Zone Nord',
      localite: 'Lille',
      typeAnomalie: 'Dégradation Voix & Data',
      priorite: 'P0 - Top Priorité',
      dateCreation: new Date('2023-05-15'),
      statut: 'En cours',
    },
    {
      id: 2,
      zone: 'Zone Sud',
      localite: 'Marseille',
      typeAnomalie: 'Coupure fréquente',
      priorite: 'P1 - Moyenne Priorité',
      dateCreation: new Date('2023-05-10'),
      statut: 'Nouveau',
    },
    {
      id: 3,
      zone: 'Zone Est',
      localite: 'Strasbourg',
      typeAnomalie: 'Problème RACINE',
      priorite: 'P2 - Faible Priorité',
      dateCreation: new Date('2023-05-05'),
      statut: 'Résolu',
    },
  ];

  filteredDegradations: Degradation[] = [];
  searchTerm: string = '';
  currentFilter: string = 'Tous';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredDegradations = [...this.degradations];
  }

  filterByStatus(status: string): void {
    this.currentFilter = status;
    if (status === 'Tous') {
      this.filteredDegradations = [...this.degradations];
    } else {
      this.filteredDegradations = this.degradations.filter(
        (d) => d.statut === status
      );
    }
  }

  searchDegradations(): void {
    if (!this.searchTerm) {
      this.filteredDegradations = [...this.degradations];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredDegradations = this.degradations.filter(
      (d) =>
        d.zone.toLowerCase().includes(term) ||
        d.localite.toLowerCase().includes(term) ||
        d.typeAnomalie.toLowerCase().includes(term)
    );
  }

  editDegradation(id: number): void {
    this.router.navigate(['/edit-degradation', id]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Nouveau':
        return 'badge bg-primary';
      case 'En cours':
        return 'badge bg-warning text-dark';
      case 'Résolu':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  }
}
