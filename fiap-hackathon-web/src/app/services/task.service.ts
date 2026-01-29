import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.models';
import { AuthenticationService } from './authentication.service';
import { TaskRepository } from './repositories/task-repository';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _authService = inject(AuthenticationService)
  private _taskRepository = inject(TaskRepository)

  private _tasksSignal = signal<Task[]>([]);
  public tasks = this._tasksSignal.asReadonly();

  async getAllTask() {
    const user = this._authService.user()!
    const tasks = await this._taskRepository.getAllTasksByUserId(user.uid)
    this._tasksSignal.set(tasks)
  }

  async addTask(task: Omit<Task, 'id' | 'userId' | 'completedAt'>) {
    const user = this._authService.user()!
    const taskId = await this._taskRepository.createTask({
      ...task,
      userId: user.uid,
    })
    this._tasksSignal.update((value) => {
      return [...value, { ...task, userId: user.uid, id: taskId, completedAt: null }]
    })
  }

}