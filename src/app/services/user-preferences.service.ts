import { computed, inject, Injectable, signal } from '@angular/core';
import { DEFAULT_USER_PREFERENCES, UserPreferences } from '../models/user-preferences.models';
import { UserPreferencesRepository } from './repositories/user-preferences-repository';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {

  private _repository = inject(UserPreferencesRepository)

  private _userPreference = signal<UserPreferences>({ ...DEFAULT_USER_PREFERENCES, userId: null, id: null })
  public userPreference = this._userPreference.asReadonly()

  constructor() {
    this.applyTheme(this.userPreference().theme)
  }

  async getUserPreferences(userId: string) {
    const preferences = await this._repository.getUserPreferences(userId)
    if (preferences) {
      this._userPreference.set(preferences)
      this.applyTheme(preferences.theme)
    } else {
      this.createUserPreference(userId)
    }
  }

  async createUserPreference(userId: string) {
    const preferences: Omit<UserPreferences, 'id'> = {
      userId, ...DEFAULT_USER_PREFERENCES
    }
    const docId = await this._repository.createUserPreferences(preferences)
    this._userPreference.set({ id: docId, ...preferences })
    this.applyTheme(preferences.theme)

  }

  async updateUserPreference(preferences: UserPreferences) {
    await this._repository.updateUserPreferences(preferences.id!, preferences)
    this._userPreference.update(value => {
      return { ...value, ...preferences }
    })
    this.applyTheme(preferences.theme)

  }

  private applyTheme(theme: 'light' | 'dark') {
    const htmlElement = document.documentElement

    if (theme === 'dark') {
      htmlElement.classList.add('dark-theme')
      document.body.style.colorScheme = 'dark'
    } else {
      htmlElement.classList.remove('dark-theme')
      document.body.style.colorScheme = 'light'
    }
  }
}
