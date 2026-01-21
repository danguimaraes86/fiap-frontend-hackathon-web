import { Component, computed, inject } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { AuthenticationService } from '../../services/authentication.service';
import { LoginButton } from "./login-button/login-button";
import { Logo } from "./logo/logo";
import { LogoutButton } from "./logout-button/logout-button";
import { SignupButton } from "./signup-button/signup-button";

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbar, Logo, LogoutButton, LoginButton, SignupButton],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  protected _authService = inject(AuthenticationService)
  protected isAuthenticated = computed(() => this._authService.isAuthenticated())
  protected isLoading = computed(() => this._authService.isLoading())
}
