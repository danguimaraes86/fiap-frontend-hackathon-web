import { computed, inject, Injectable, signal } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { getTaskStatusInfo, Task } from '../models/task.models';
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

  private _allUserTasks = signal<Task[]>([]);
  public allTasks = this._allUserTasks.asReadonly();

  public completedTasks = computed(() => {
    const tasks = this._allUserTasks().filter(task => task.status == 'completed')
    return {
      itens: tasks,
      count: tasks.length,
      icon: '',
      ...getTaskStatusInfo('in_progress')
    }
  })

  public inProgressTasks = computed(() => {
    const tasks = this._allUserTasks().filter(task => task.status == 'in_progress')
    return {
      itens: tasks,
      count: tasks.length,
      icon: 'assignment_late',
      ...getTaskStatusInfo('in_progress')
    }
  })

  public pendingTasks = computed(() => {
    const tasks = this._allUserTasks().filter(task => task.status == 'pending')
    return {
      itens: tasks,
      count: tasks.length,
      icon: 'pending_actions',
      ...getTaskStatusInfo('pending')
    }
  })

  async getAllTask() {
    const user = this._authService.user()!
    const tasks = await this._taskRepository.getAllTasksByUserId(user.uid)
    this._allUserTasks.set(tasks as Task[])
  }

  async addTask(task: Omit<Task, 'id' | 'userId'>) {
    try {
      const user = this._authService.user()!
      const taskId = await this._taskRepository.createTask({
        ...task,
        userId: user.uid
      })
      this._allUserTasks.update((value) => {
        return [{ ...task, userId: user.uid, id: taskId, completedAt: null }, ...value]
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao adicionar nova tarefa', error as FirebaseError)
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this._taskRepository.deleteTask(taskId);
      this._allUserTasks.update(value => {
        return value.filter(v => v.id != taskId)
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao deletar tarefa', error as FirebaseError)
    }
  }

  async updateTask(taskId: string, task: Omit<Task, 'id' | 'userId' | 'createdAt'>) {
    try {
      await this._taskRepository.updateTask(taskId, task)
      this._allUserTasks.update(value => {
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
      this._allUserTasks.update(value => {
        const updatedTask = value.find(task => task.id == taskId)
        return value.map(v => v.id == taskId ? { ...updatedTask!, ...task } : v)
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao atualizar tarefa', error as FirebaseError)
    }
  }

  async startPendingTask(taskId: string) {
    try {
      await this._taskRepository.updateTask(taskId, { status: 'in_progress' })
      this._allUserTasks.update(value => {
        const updatedTask = value.find(task => task.id == taskId)
        return value.map(v => v.id == taskId ? { ...updatedTask!, status: 'in_progress' } : v)
      })
    } catch (error) {
      this._errorService.handleFirebaseError('Erro ao atualizar tarefa', error as FirebaseError)
    }
  }
}