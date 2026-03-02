import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { TaskDetail } from '../task-detail/task-detail';

@Component({
  selector: 'app-dashboard-focus-mode',
  imports: [
    TaskDetail,
    MatIcon,
  ],
  templateUrl: './dashboard-focus-mode.html',
  styleUrl: './dashboard-focus-mode.scss',
})
export class DashboardFocusMode {
  private _tasksService = inject(TaskService)
  protected inProgressTasks = this._tasksService.inProgressTasks
}
