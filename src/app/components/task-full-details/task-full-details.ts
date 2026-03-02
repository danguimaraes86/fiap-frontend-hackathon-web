import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatChip } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { getTaskStatusInfo, Task } from '../../models/task.models';
import { getDateLocaleString } from '../../utils/date-time.utils';
import { TaskForm } from '../forms/task-form/task-form';

@Component({
  selector: 'app-task-full-details',
  imports: [
    MatCard,
    MatCardContent,
    MatDialogActions,
    MatDialogClose,
    MatDivider,
    MatIcon,
    MatChip,
    MatButton,
  ],
  templateUrl: './task-full-details.html',
  styleUrl: './task-full-details.scss',
})
export class TaskFullDetails {
  private _dialogRef = inject(MatDialog)

  protected payload = inject<{ task: Task }>(MAT_DIALOG_DATA);
  protected task = this.payload.task

  protected getDateLocaleString = getDateLocaleString
  protected getStatusInfo = getTaskStatusInfo

  protected handleUpdateTask(task: Task) {
    this._dialogRef.open(TaskForm, {
      minWidth: '320px',
      width: '60%',
      data: { task }
    })
  }
}
