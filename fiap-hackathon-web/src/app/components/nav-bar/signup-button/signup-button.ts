import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { SignupForm } from '../../forms/signup-form/signup-form';

@Component({
  selector: 'app-signup-button',
  imports: [MatIcon, MatButton, MatIconButton],
  templateUrl: './signup-button.html',
  styleUrl: './signup-button.scss',
})
export class SignupButton {
  protected _dialog = inject(MatDialog)

  protected openCadastroModal() {
    this._dialog.open(SignupForm, {
      minWidth: '50%',
    });
  }
}
