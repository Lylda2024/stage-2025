import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-apercu-incident',
  imports: [CommonModule],
  templateUrl: './apercu-incident.component.html',
  styleUrl: './apercu-incident.component.scss',
})
export class ApercuIncidentComponent {
  formulaire: any;
  photoPreview: string | null = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.formulaire = nav?.extras?.state?.['formulaire'];
    this.photoPreview = nav?.extras?.state?.['photo'];
  }
  exportToPDF(): void {
    const data = document.getElementById('pdf-content');
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('incident-report.pdf');
      });
    }
  }
}
