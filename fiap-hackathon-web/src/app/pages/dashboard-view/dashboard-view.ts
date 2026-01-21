import { JsonPipe } from '@angular/common';
import { Component, effect, inject, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard-view',
  imports: [JsonPipe],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.scss',
})
export class DashboardView implements OnDestroy {
  protected _authService = inject(AuthenticationService)

  private _effectRef = effect(() => {
    console.log(this._authService.isLoading())
    console.log(this._authService.userSignal())
  })

  ngOnDestroy(): void {
    this._effectRef.destroy()
  }
}
