import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { LoginRequest } from '../../models/authentication.models';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private readonly _authService = inject(AuthenticationService)
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<LoginForm>)

  loginForm: FormGroup;
  hidePassword = true;
  isLoading = this._authService.isLoading

  constructor() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const loginRequest: LoginRequest = {
        email: formData.email,
        password: formData.senha
      }

      await this._authService.userLogin(loginRequest)

      if (this._authService.isAuthenticated()) {
        this._dialogRef.close()
      }
    }
  }
}