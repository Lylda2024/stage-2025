import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.incidentForm = this.fb.group({
      zone: ['', Validators.required],
      localite: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      urgence: ['moyenne', Validators.required],
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

  loadLocalites(): void {
    const zone = this.incidentForm.get('zone')?.value;
    this.updateLocalites(zone);
  }

  resetForm(): void {
    this.incidentForm.reset();
    this.localites = [];
  }

  onSubmit(): void {
    if (this.incidentForm.valid) {
      const formData = this.incidentForm.value;
      console.log('Données du formulaire:', formData);
      // Appel à un service si besoin
    } else {
      console.error('Formulaire invalide');
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.incidentForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
