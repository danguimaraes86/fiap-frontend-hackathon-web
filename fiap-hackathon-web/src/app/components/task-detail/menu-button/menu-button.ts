import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { Task } from '../../../models/task.models';
import { TaskService } from '../../../services/task.service';
import { TaskForm } from '../../forms/task-form/task-form';
import { TaskFullDetails } from '../../task-full-details/task-full-details';

@Component({
  selector: 'app-menu-button',
  imports: [MatMenuTrigger, MatMenu, MatIcon, MatMenuItem, MatIconButton],
  templateUrl: './menu-button.html',
  styleUrl: './menu-button.scss',
})
export class MenuButton {
  private _taskService = inject(TaskService)
  private _dialogRef = inject(MatDialog)

  public task = input.required<Task>()

  protected handleUpdateTask(task: Task) {
    this._dialogRef.open(TaskForm, {
      minWidth: '50%',
      data: { task }
    })
  }

  protected handleDeleteTask(taskId: string) {
    this._taskService.deleteTask(taskId);
  }

  protected handleShowTaskFullDetails(task: Task) {
    this._dialogRef.open(TaskFullDetails, {
      minWidth: '50%',
      data: { task }
    })
  }
}
