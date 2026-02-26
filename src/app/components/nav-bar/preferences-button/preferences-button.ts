import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UserPreferencesForm } from '../../forms/user-preferences-form/user-preferences-form';

@Component({
  selector: 'app-preferences-button',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './preferences-button.html',
  styleUrl: './preferences-button.scss',
})
export class PreferencesButton {
  private _dialogRef = inject(MatDialog)

  protected openPreferencesModal() {
    this._dialogRef.open(UserPreferencesForm, {
      minWidth: '320px',
      width: '60%',
    })
  }
}
