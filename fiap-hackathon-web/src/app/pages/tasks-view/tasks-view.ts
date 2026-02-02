import { Component, inject, OnInit } from '@angular/core';

import { NgClass } from '@angular/common';
import { MatChip } from "@angular/material/chips";
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { FloatingButton } from "../../components/floating-button/floating-button";
import { TaskDetail } from "../../components/task-detail/task-detail";
import { getTaskStatusInfo } from '../../models/task.models';
import { TaskService } from '../../services/task.service';
import { getDateLocaleString } from '../../utils/date-time.utils';

@Component({
  selector: 'app-tasks-view',
  imports: [
    MatAccordion,
    FloatingButton,
    TaskDetail,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatChip,
    NgClass
  ],
  templateUrl: './tasks-view.html',
  styleUrl: './tasks-view.scss',
})
export class TasksView implements OnInit {
  protected _taskService = inject(TaskService);
  protected getStatusInfo = getTaskStatusInfo;
  protected getDateLocaleString = getDateLocaleString

  ngOnInit() {
    this._taskService.getAllTask()
  }
}