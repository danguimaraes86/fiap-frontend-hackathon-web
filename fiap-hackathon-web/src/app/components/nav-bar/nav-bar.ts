import { Component, computed, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from "@angular/material/toolbar";
import { AuthenticationService } from '../../services/authentication.service';
import { LoginButton } from "./login-button/login-button";
import { Logo } from "./logo/logo";
import { LogoutButton } from "./logout-button/logout-button";
import { SignupButton } from "./signup-button/signup-button";

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbar, Logo, MatProgressSpinner, LogoutButton, LoginButton, SignupButton],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit {
  protected _authService = inject(AuthenticationService)
  protected isAuthenticated = computed(() => this._authService.isAuthenticated())
  protected isLoading = computed(() => this._authService.isLoading())

  ngOnInit(): void {
    this._authService.initAuthStateListener()
  }
}
