import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  Auth,
  AuthError,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { SnackBar } from '../components/snack-bar/snack-bar';
import { getFirebaseErrorMessage } from '../configs/firebase-error.utils';
import { firebaseApp } from '../configs/firebase.config';
import { LoginRequest, SignUpRequest } from '../models/authentication.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _firebaseAuth: Auth;
  private _router = inject(Router)
  private readonly _snackBarRef = inject(MatSnackBar);

  private _userSignal = signal<FirebaseUser | null>(null);
  public userSignal = this._userSignal.asReadonly()

  private _isLoading = signal<boolean>(true);
  public isLoading = this._isLoading.asReadonly()

  constructor() {
    this._firebaseAuth = getAuth(firebaseApp)
    this._firebaseAuth.setPersistence(browserLocalPersistence)
  }

  initAuthStateListener() {
    onAuthStateChanged(this._firebaseAuth, (user) => {
      this._userSignal.set(user);
      this._isLoading.set(false)
    });
  }

  isAuthenticated(): boolean {
    return this._userSignal() !== null;
  }

  async signUpUser(request: SignUpRequest): Promise<void> {
    this._isLoading.set(true)
    try {
      const credential = await createUserWithEmailAndPassword(
        this._firebaseAuth,
        request.email,
        request.password
      );
      await updateProfile(credential.user, { displayName: request.name });
    } catch (error) {
      this.handleAuthError(error as AuthError)
    } finally {
      this._isLoading.set(false)
    }
  }

  async userLogin(request: LoginRequest): Promise<void> {
    this._isLoading.set(true)
    try {
      await signInWithEmailAndPassword(
        this._firebaseAuth,
        request.email,
        request.password
      );
    } catch (error) {
      this.handleAuthError(error as AuthError);
    } finally {
      this._isLoading.set(false)
    }
  }

  async userLogout() {
    try {
      await this._firebaseAuth.signOut();
      this._userSignal.set(null);
      this._router.navigate([''])
    } catch (error) {
      this.handleAuthError(error as AuthError);
    }
  }

  private handleAuthError(error: AuthError): void {
    this._snackBarRef.openFromComponent(SnackBar, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      data: getFirebaseErrorMessage(error.code)
    })
    console.error('Firebase Auth Error:', error.code);
  }
}
