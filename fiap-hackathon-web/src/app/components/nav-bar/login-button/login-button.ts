import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { LoginForm } from '../../login-form/login-form';

@Component({
  selector: 'app-login-button',
  imports: [MatIcon, MatButton, MatIconButton],
  templateUrl: './login-button.html',
  styleUrl: './login-button.scss',
})
export class LoginButton {
  protected _dialog = inject(MatDialog)

  protected openLoginModal() {
    this._dialog.open(LoginForm, {
      width: '500px'
    });
  }
}
