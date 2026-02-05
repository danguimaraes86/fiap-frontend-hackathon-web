import { Component, inject, signal } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatDivider, MatList, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FloatingButton } from "../../components/floating-button/floating-button";
import { TaskDetail } from "../../components/task-detail/task-detail";
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-view',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatList,
    MatDivider,
    MatSlideToggle,
    MatListSubheaderCssMatStyler,
    TaskDetail,
    FloatingButton
  ],
  templateUrl: './tasks-view.html',
  styleUrl: './tasks-view.scss',
})
export class TasksView {
  protected _taskService = inject(TaskService);
  protected allTasks = this._taskService.allTasks
  protected completedTasks = this._taskService.completedTasks
  protected pendingAndProgressTasks = this._taskService.pendingAndProgressTasks

  protected visibilityCompletedTasks = signal<boolean>(false)

  protected handleShowCompletedTasks(event: MatSlideToggleChange) {
    this.visibilityCompletedTasks.set(event.checked)
  }
}