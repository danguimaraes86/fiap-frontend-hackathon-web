import { Component, computed, inject } from '@angular/core';
import { DashboardCardFullDetails } from "../../components/dashboard-card-full-details/dashboard-card-full-details";
import { DashboardFocusMode } from "../../components/dashboard-focus-mode/dashboard-focus-mode";
import { FloatingButton } from "../../components/floating-button/floating-button";
import { UserPreferencesService } from '../../services/user-preferences.service';

@Component({
  selector: 'app-dashboard-view',
  imports: [
    DashboardCardFullDetails,
    FloatingButton,
    DashboardFocusMode
  ],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.scss',
})
export class DashboardView {
  private _userPerferences = inject(UserPreferencesService)

  protected focusMode = computed(() => {
    return this._userPerferences.userPreference().focusMode
  })
}
