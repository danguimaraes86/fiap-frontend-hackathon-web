import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipAvatar } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { FloatingButton } from "../../components/floating-button/floating-button";
import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';
import { getTaskStatusInfo } from '../../models/task.models';

@Component({
  selector: 'app-dashboard-view',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    FloatingButton,
    MatButton,
    MatIcon,
    RouterLink,
    MatChip,
    MatChipAvatar,
    MatBadge,
    MatCardSubtitle
  ],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.scss',
})
export class DashboardView implements OnDestroy {
  private _authService = inject(AuthenticationService)
  private _taskService = inject(TaskService)

  protected pendingAndProgressTasks = this._taskService.pendingAndProgressTasks
  protected tasksCount = signal<number>(0)

  protected pendingTasks = computed(() => {
    return this.pendingAndProgressTasks().filter(task => task.status == 'pending')
  })

  protected inProgressTasks = computed(() => {
    return this.pendingAndProgressTasks().filter(task => task.status == 'in_progress')
  })

  protected taskStatuses = computed(() => {
    const pending = this.pendingTasks();
    const inProgress = this.inProgressTasks();
    
    return [
      { 
        ...getTaskStatusInfo('pending'), 
        icon: 'pending_actions', 
        count: pending.length 
      },
      { 
        ...getTaskStatusInfo('in_progress'), 
        icon: 'assignment_late', 
        count: inProgress.length 
      }
    ];
  });

  protected userDisplayName = computed(() => {
    return this._authService.user()?.displayName || 'Usuário'
  })

  protected welcomeMessage = computed(() => {
    return this.tasksCount() > 0
      ? `Hoje você tem ${this.pendingAndProgressTasks().length} tarefa(s).`
      : 'Seu dia está livre! Nenhuma tarefa para hoje.'
  })

  private _effectRef = effect(() => {
    console.log(this._taskService.allTasks())
    this.tasksCount.set(this.pendingAndProgressTasks().length)
  })

  ngOnDestroy(): void {
    this._effectRef.destroy()
  }
}
