import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class NotififServiceService {
  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  showSuccess(messageKey: string, interpolateParams?: object): void {
    this.translate.get(messageKey, interpolateParams).subscribe((message) => {
      this.snackBar.open(message, 'OK', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
    });
  }

  showError(messageKey: string, interpolateParams?: object): void {
    this.translate.get(messageKey, interpolateParams).subscribe((message) => {
      this.snackBar.open(message, 'X', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    });
  }

  showWarning(messageKey: string, interpolateParams?: object): void {
    this.translate.get(messageKey, interpolateParams).subscribe((message) => {
      this.snackBar.open(message, 'OK', {
        duration: 4000,
        panelClass: ['warning-snackbar'],
      });
    });
  }
}
