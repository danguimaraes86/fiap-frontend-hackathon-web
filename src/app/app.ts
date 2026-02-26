import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./components/nav-bar/nav-bar";
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private _taskService = inject(TaskService)

  ngOnInit(): void {
    this._taskService.startWatchingTasks()
  }

  ngOnDestroy(): void {
    this._taskService.stopWatchingTasks()
  }
}
