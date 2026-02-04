import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { MatChip } from "@angular/material/chips";
import { MatDialog } from '@angular/material/dialog';
import { MatListItem, MatListItemIcon, MatListItemMeta } from '@angular/material/list';
import { DateTime } from 'luxon';
import { getTaskStatusInfo, Task } from '../../models/task.models';
import { TaskService } from '../../services/task.service';
import { getDateLocaleString } from '../../utils/date-time.utils';
import { TaskForm } from '../forms/task-form/task-form';
import { MenuButton } from "./menu-button/menu-button";

@Component({
  selector: 'app-task-detail',
  imports: [
    MatListItem,
    MatListItemIcon,
    MatListItemMeta,
    MatCheckbox,
    MatChip,
    NgClass,
    MenuButton
  ],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {
  protected _taskService = inject(TaskService)

  public task = input.required<Task>()
  protected getStatusInfo = getTaskStatusInfo;
  protected getDateLocaleString = getDateLocaleString;

  protected handleCompleteTask(event: MatCheckboxChange, task: Task) {
    const message = event.checked ? 'Completar tarefa?' : "Remover 'Concluído'?";
    if (!window.confirm(message)) {
      event.source.checked = !event.checked
      return;
    }

    this._taskService.updateCompleteStatus(task.id, {
      status: event.checked ? 'completed' : 'in_progress',
      updatedAt: DateTime.now().toISO(),
      completedAt: event.checked ? DateTime.now().toISO() : null
    })
  }

  protected isTaskCompleted(task: Task) {
    return task.completedAt != undefined || task.completedAt != null
  }
}
