import localePt from '@angular/common/locales/pt';
import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { AuthenticationService } from './services/authentication.service';

export function initializeAuth(authService: AuthenticationService) {
  authService.initAuthStateListener();
  return firstValueFrom(toObservable(authService.isLoading).pipe(
    filter(loading => !loading),
  ))
}

registerLocaleData(localePt);
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      return initializeAuth(inject(AuthenticationService))
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ]
};
