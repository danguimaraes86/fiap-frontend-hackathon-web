import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from 'firebase/app';
import { SnackBar } from '../components/snack-bar/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _snackBarRef = inject(MatSnackBar);

  public handleFirebaseError(message: string, error: FirebaseError) {
    this._snackBarRef.openFromComponent(SnackBar, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      data: message
    })
    console.error(error.message);
  }

  public handleSucessMessage(message: string) {
    this._snackBarRef.openFromComponent(SnackBar, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
      data: message
    })
  }

}
