import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-degratation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './degratation-form.component.html',
  styleUrls: ['./degratation-form.component.scss'],
})
export class DegratationFormComponent implements OnInit {
  incidentForm!: FormGroup;
  zones: string[] = ['Zone 1', 'Zone 2', 'Zone 3'];
  localites: string[] = [];
  currentSection: number = 1;
  totalSections: number = 3;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.incidentForm = this.fb.group({
      // Section 1
      zone: ['', Validators.required],
      localite: ['', Validators.required],
      typeAnomalie: ['', Validators.required],
      priorite: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],

      // Section 2
      contactTemoin: ['', Validators.required],
      responsableAJS: ['', Validators.required],
      antenneOCI: ['', Validators.required],

      // Section 3
      siteBTS: [''],
      porteur: [''],
      porteur2: [''],
      actions: [''],
      ticketOCEANE: [''],
    });

    this.incidentForm.get('zone')?.valueChanges.subscribe((zone) => {
      this.updateLocalites(zone);
    });
  }

  private updateLocalites(zone: string): void {
    this.localites = this.getLocalitesByZone(zone);
    this.incidentForm.get('localite')?.reset();
  }

  private getLocalitesByZone(zone: string): string[] {
    switch (zone) {
      case 'Zone 1':
        return ['Localité A', 'Localité B'];
      case 'Zone 2':
        return ['Localité C', 'Localité D'];
      case 'Zone 3':
        return ['Localité E', 'Localité F'];
      default:
        return [];
    }
  }

  nextSection(): void {
    if (this.currentSection < this.totalSections) {
      this.currentSection++;
    }
  }

  prevSection(): void {
    if (this.currentSection > 1) {
      this.currentSection--;
    }
  }

  isSectionValid(sectionNumber: number): boolean {
    const controls = this.incidentForm.controls;

    switch (sectionNumber) {
      case 1:
        return (
          controls['zone'].valid &&
          controls['localite'].valid &&
          controls['typeAnomalie'].valid &&
          controls['priorite'].valid &&
          controls['details'].valid
        );
      case 2:
        return (
          controls['contactTemoin'].valid &&
          controls['responsableAJS'].valid &&
          controls['antenneOCI'].valid
        );
      default:
        return true;
    }
  }

  resetForm(): void {
    this.incidentForm.reset({
      antenneOCI: '',
      urgence: 'moyenne',
    });
    this.localites = [];
    this.currentSection = 1;
  }

  onSubmit(): void {
    if (this.incidentForm.valid) {
      const formData = this.incidentForm.value;
      console.log('Données du formulaire:', formData);
      // Appel à un service si besoin
    } else {
      console.error('Formulaire invalide');
      this.markAllAsTouched();
      // Aller à la première section invalide
      if (!this.isSectionValid(1)) this.currentSection = 1;
      else if (!this.isSectionValid(2)) this.currentSection = 2;
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.incidentForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
