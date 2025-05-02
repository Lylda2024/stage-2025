import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

  //PDF
  exportToPDF(): void {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Titre du document
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Fiche d'Incident QoS", 105, 20, { align: 'center' });

    // Section 1: Identification de l'Incident
    doc.setFontSize(14);
    doc.text("1. Identification de l'Incident", 15, 35);

    doc.setFontSize(12);
    doc.text(
      `Zone: ${this.incidentForm.get('zone')?.value || 'Non renseigné'}`,
      15,
      45
    );
    doc.text(
      `Localité: ${
        this.incidentForm.get('localite')?.value || 'Non renseigné'
      }`,
      15,
      55
    );
    doc.text(
      `Type d'Anomalie: ${
        this.incidentForm.get('typeAnomalie')?.value || 'Non renseigné'
      }`,
      15,
      65
    );
    doc.text(
      `Priorité: ${
        this.incidentForm.get('priorite')?.value || 'Non renseigné'
      }`,
      15,
      75
    );

    // Détails avec gestion du texte long
    const details = this.incidentForm.get('details')?.value || 'Non renseigné';
    const splitDetails = doc.splitTextToSize(details, 180);
    doc.text(`Détails:`, 15, 85);
    doc.text(splitDetails, 15, 95);

    // Section 2: Contacts
    doc.setFontSize(14);
    doc.text('2. Contacts', 15, 125);

    doc.setFontSize(12);
    doc.text(
      `Contact Témoin: ${
        this.incidentForm.get('contactTemoin')?.value || 'Non renseigné'
      }`,
      15,
      135
    );
    doc.text(
      `Responsable AJS: ${
        this.incidentForm.get('responsableAJS')?.value || 'Non renseigné'
      }`,
      15,
      145
    );
    doc.text(
      `Antenne OCI: ${
        this.incidentForm.get('antenneOCI')?.value || 'Non renseigné'
      }`,
      15,
      155
    );

    // Section 3: Diagnostic Initial
    doc.setFontSize(14);
    doc.text('3. Diagnostic Initial', 15, 175);

    doc.setFontSize(12);
    doc.text(
      `Site(s) BTS: ${
        this.incidentForm.get('siteBTS')?.value || 'Non renseigné'
      }`,
      15,
      185
    );
    doc.text(
      `Porteur Principal: ${
        this.incidentForm.get('porteur')?.value || 'Non renseigné'
      }`,
      15,
      195
    );
    doc.text(
      `Porteur Secondaire: ${
        this.incidentForm.get('porteur2')?.value || 'Non renseigné'
      }`,
      15,
      205
    );

    const actions = this.incidentForm.get('actions')?.value || 'Non renseigné';
    const splitActions = doc.splitTextToSize(actions, 180);
    doc.text(`Actions Recommandées:`, 15, 215);
    doc.text(splitActions, 15, 225);

    doc.text(
      `Ticket OCEANE: ${
        this.incidentForm.get('ticketOCEANE')?.value || 'Non renseigné'
      }`,
      15,
      245
    );

    // Pied de page
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Généré le: ${date}`, 15, 280);
    doc.text('© Orange CI', 180, 280, { align: 'right' });

    // Enregistrement du PDF
    doc.save('fiche_incident_QOS.pdf');
  }
  getStepLabel(stepNumber: number): string {
    switch (stepNumber) {
      case 1:
        return 'Identification Incident';
      case 2:
        return 'Contacts';
      case 3:
        return 'Diagnostic';
      default:
        return 'Étape ' + stepNumber;
    }
  }
}
