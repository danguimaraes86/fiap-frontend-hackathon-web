import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {
  MatExpansionPanelActionRow
} from '@angular/material/expansion';
import { MatIcon } from "@angular/material/icon";
import { getTaskStatusInfo, Task } from '../../models/task.models';
import { TaskService } from '../../services/task.service';
import { getDateLocaleString, getFullDateTimeLocaleString } from '../../utils/date-time.utils';
import { TaskForm } from '../forms/task-form/task-form';

@Component({
  selector: 'app-task-detail',
  imports: [
    MatExpansionPanelActionRow,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {
  protected _taskService = inject(TaskService)
  private _dialogRef = inject(MatDialog)

  public task = input.required<Task>()
  protected getStatusInfo = getTaskStatusInfo;

  protected getDateLocaleString = getDateLocaleString;
  protected getFullDateTimeLocaleString = getFullDateTimeLocaleString

  protected handleUpdateTask(task: Task) {
    this._dialogRef.open(TaskForm, {
      minWidth: '50%',
      data: { task }
    })
  }

  protected handleDeleteTask(taskId: string) {
    this._taskService.deleteTask(taskId);
  }
}
