import { Component, computed, effect, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { FloatingButton } from "../../components/floating-button/floating-button";
import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard-view',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    FloatingButton,
    MatCardFooter,
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.scss',
})
export class DashboardView implements OnInit, OnDestroy {
  private _authService = inject(AuthenticationService)
  private _taskService = inject(TaskService)

  protected tasks = this._taskService.tasks

  protected userDisplayName = computed(() => {
    return this._authService.user()?.displayName || 'Usuário'
  })

  protected welcomeMessage = computed(() => {
    return `Hoje você tem ${this._taskService.tasks().length} tarefas importantes`
  })

  private _effectRef = effect(() => {
    console.log(this._taskService.tasks())
  })

  ngOnInit(): void {
    this._taskService.getAllTask()
  }

  ngOnDestroy(): void {
    this._effectRef.destroy()
  }
}
