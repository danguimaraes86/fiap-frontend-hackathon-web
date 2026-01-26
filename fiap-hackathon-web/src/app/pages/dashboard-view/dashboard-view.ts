import { Component, computed, effect, inject, OnDestroy } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FloatingButton } from "../../components/floating-button/floating-button";
import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard-view',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, FloatingButton],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.scss',
})
export class DashboardView implements OnDestroy {
  private _authService = inject(AuthenticationService)
  private _taskService = inject(TaskService)

  protected userDisplayName = computed(() => {
    return this._authService.userSignal()?.displayName || 'Usuário'
  })

  protected welcomeMessage = computed(() => {
    return `Hoje você tem ${this._taskService.tasks().length} tarefas importantes`
  })

  private _effectRef = effect(() => {
    console.log(this._authService.isLoading())
    console.log(this._authService.userSignal())
  })

  ngOnDestroy(): void {
    this._effectRef.destroy()
  }
}
