import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

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
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Material Modules
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
  ],

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
  displayedColumns: string[] = [
    'id',
    'zone',
    'localite',
    'typeAnomalie',
    'priorite',
    'dateCreation',
    'statut',
    'actions',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredDegradations = [...this.degradations];
  }

  filterByStatus(status: string): void {
    this.currentFilter = status;
    this.filteredDegradations =
      status === 'Tous'
        ? [...this.degradations]
        : this.degradations.filter((d) => d.statut === status);
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

  getStatusColor(statut: string): string {
    switch (statut) {
      case 'Nouveau':
        return 'primary';
      case 'En cours':
        return 'accent';
      case 'Résolu':
        return 'warn';
      default:
        return '';
    }
  }

  getPriorityColor(priorite: string): string {
    const level = priorite.split(' - ')[0];
    switch (level) {
      case 'P0':
        return 'warn';
      case 'P1':
        return 'accent';
      case 'P2':
        return 'primary';
      default:
        return '';
    }
  }

  // Ajout de la gestion de la pagination
  pageSizeOptions = [5, 10, 20];
  pageSize = 5;
}
