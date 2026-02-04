import { inject, Injectable, signal } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { Task } from '../models/task.models';
import { AuthenticationService } from './authentication.service';
import { ErrorService } from './error.service';
import { TaskRepository } from './repositories/task-repository';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _authService = inject(AuthenticationService)
  private _taskRepository = inject(TaskRepository)
  private _errorService = inject(ErrorService)

  private _tasksSignal = signal<Task[]>([]);
  public tasks = this._tasksSignal.asReadonly();

  async getAllTask() {
    const user = this._authService.user()!
    const tasks = await this._taskRepository.getAllTasksByUserId(user.uid)
    this._tasksSignal.set(tasks as Task[])
  }

  async addTask(task: Omit<Task, 'id' | 'userId'>) {
    try {
      const user = this._authService.user()!
      const taskId = await this._taskRepository.createTask({
        ...task,
        userId: user.uid
      })
      this._tasksSignal.update((value) => {
        return [{ ...task, userId: user.uid, id: taskId, completedAt: null }, ...value]
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao adicionar nova tarefa', error as FirebaseError)
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this._taskRepository.deleteTask(taskId);
      this._tasksSignal.update(value => {
        return value.filter(v => v.id != taskId)
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao deletar tarefa', error as FirebaseError)
    }
  }

  async updateTask(taskId: string, task: Omit<Task, 'id' | 'userId' | 'createdAt'>) {
    try {
      await this._taskRepository.updateTask(taskId, task)
      this._tasksSignal.update(value => {
        const updatedTask = value.find(task => task.id == taskId)
        return value.map(v => v.id == taskId ? { ...updatedTask!, ...task } : v)
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao atualizar tarefa', error as FirebaseError)
    }
  }

  async updateCompleteStatus(taskId: string, task: Pick<Task, 'status' | 'updatedAt' | 'completedAt'>) {
    try {
      await this._taskRepository.updateTask(taskId, task)
      this._tasksSignal.update(value => {
        const updatedTask = value.find(task => task.id == taskId)
        return value.map(v => v.id == taskId ? { ...updatedTask!, ...task } : v)
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao atualizar tarefa', error as FirebaseError)
    }
  }
}