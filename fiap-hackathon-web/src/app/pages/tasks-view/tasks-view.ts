import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatDivider, MatList, MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FloatingButton } from "../../components/floating-button/floating-button";
import { TaskDetail } from "../../components/task-detail/task-detail";
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-view',
  imports: [
    FloatingButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatList,
    MatDivider,
    MatListSubheaderCssMatStyler,
    MatMenuModule,
    MatListModule,
    TaskDetail
  ],
  templateUrl: './tasks-view.html',
  styleUrl: './tasks-view.scss',
})
export class TasksView implements OnInit {
  protected _taskService = inject(TaskService);

  ngOnInit() {
    this._taskService.getAllTask()
  }

}