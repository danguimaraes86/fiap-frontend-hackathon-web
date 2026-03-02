import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatChip } from "@angular/material/chips";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { getTaskStatusInfo, Task } from '../../models/task.models';
import { getDateLocaleString } from '../../utils/date-time.utils';

@Component({
  selector: 'app-task-full-details',
  imports: [MatDivider, MatIcon, MatCard, MatCardContent, MatChip],
  templateUrl: './task-full-details.html',
  styleUrl: './task-full-details.scss',
})
export class TaskFullDetails {
  protected payload = inject<{ task: Task }>(MAT_DIALOG_DATA);
  protected task = this.payload.task

  protected getDateLocaleString = getDateLocaleString
  protected getStatusInfo = getTaskStatusInfo
}
