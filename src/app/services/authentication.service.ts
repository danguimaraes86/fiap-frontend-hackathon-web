import { inject, Injectable, signal } from '@angular/core';
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
import { firebaseApp } from '../configs/firebase.config';
import { LoginRequest, SignUpRequest } from '../models/authentication.models';
import { getFirebaseErrorMessage } from '../utils/firebase-error.utils';
import { NotificationService } from './notification.service';
import { UserPreferencesService } from './user-preferences.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _firebaseAuth: Auth;
  private _router = inject(Router)
  private _errorService = inject(NotificationService)
  private _preferecesService = inject(UserPreferencesService)

  private _user = signal<FirebaseUser | null>(null);
  public user = this._user.asReadonly()

  private _isLoading = signal<boolean>(true);
  public isLoading = this._isLoading.asReadonly()

  constructor() {
    this._firebaseAuth = getAuth(firebaseApp)
    this._firebaseAuth.setPersistence(browserLocalPersistence)
  }

  initAuthStateListener() {
    onAuthStateChanged(this._firebaseAuth, (user) => {
      this._user.set(user);
      if (user) {
        this._preferecesService.getUserPreferences(user.uid)
      }
      this._isLoading.set(false)
    });
  }

  isAuthenticated(): boolean {
    return this.user() !== null;
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
      await this._preferecesService.createUserPreference(credential.user.uid)
      this._router.navigate(['dashboard'])
    } catch (error) {
      const err = error as AuthError
      this._errorService.handleFirebaseError(getFirebaseErrorMessage(err.code), err)
    } finally {
      this._isLoading.set(false)
    }
  }

  async userLogin(request: LoginRequest): Promise<void> {
    this._isLoading.set(true)
    try {
      const credential = await signInWithEmailAndPassword(
        this._firebaseAuth,
        request.email,
        request.password
      );
      this._preferecesService.getUserPreferences(credential.user.uid)
      this._router.navigate(['dashboard'])
    } catch (error) {
      const err = error as AuthError
      this._errorService.handleFirebaseError(getFirebaseErrorMessage(err.code), err)
    } finally {
      this._isLoading.set(false)
    }
  }

  async userLogout() {
    try {
      await this._firebaseAuth.signOut();
      this._user.set(null);
      this._router.navigate([''])
    } catch (error) {
      const err = error as AuthError
      this._errorService.handleFirebaseError(getFirebaseErrorMessage(err.code), err)
    }
  }
}
