import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-logout-button',
  imports: [MatIcon, MatButton, MatIconButton],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
})
export class LogoutButton {
  protected _authService = inject(AuthenticationService)

  protected userLogout() {
    this._authService.userLogout()
  }
}
