import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { SignUpRequest } from '../../../models/authentication.models';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signup-form',
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
  templateUrl: './signup-form.html',
  styleUrls: ['./signup-form.scss']
})
export class SignupForm {
  private readonly _authService = inject(AuthenticationService)
  private readonly _formBuilder = inject(FormBuilder)
  private readonly _dialogRef = inject(MatDialogRef<SignupForm>)

  signupForm: FormGroup;
  hidePassword = true;
  isLoading = this._authService.isLoading

  constructor() {
    this.signupForm = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const signupRequest: SignUpRequest = {
        name: formData.nome,
        email: formData.email,
        password: formData.senha
      }

      await this._authService.signUpUser(signupRequest)

      if (this._authService.isAuthenticated()) {
        this._dialogRef.close()
      }
    }
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (!senha || !confirmarSenha) {
      return null;
    }

    if (confirmarSenha.value === '') {
      return null;
    }

    if (senha.value !== confirmarSenha.value) {
      confirmarSenha.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = confirmarSenha.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        confirmarSenha.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
      return null;
    }
  }
}