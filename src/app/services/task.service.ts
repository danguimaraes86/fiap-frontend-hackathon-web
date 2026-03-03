import { computed, inject, Injectable, signal } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { Unsubscribe } from 'firebase/firestore';
import { getTaskStatusInfo, Task } from '../models/task.models';
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { TaskRepository } from './repositories/task-repository';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _authService = inject(AuthenticationService)
  private _taskRepository = inject(TaskRepository)
  private _unsubscribe: Unsubscribe | null = null;

  private _notificationService = inject(NotificationService)

  private _allUserTasks = signal<Task[]>([]);
  public allTasks = this._allUserTasks.asReadonly();

  public completedTasks = computed(() => {
    const tasks = this._allUserTasks().filter(task => task.status == 'completed')
    return {
      itens: tasks,
      count: tasks.length,
      ...getTaskStatusInfo('in_progress')
    }
  })

  public inProgressTasks = computed(() => {
    const tasks = this._allUserTasks().filter(task => task.status == 'in_progress')
    return {
      itens: tasks,
      count: tasks.length,
      ...getTaskStatusInfo('in_progress')
    }
  })

  public pendingTasks = computed(() => {
    const tasks = this._allUserTasks().filter(task => task.status == 'pending')
    return {
      itens: tasks,
      count: tasks.length,
      ...getTaskStatusInfo('pending')
    }
  })


  startWatchingTasks() {
    const user = this._authService.user();
    if (!user) return;

    if (this._unsubscribe) {
      this._unsubscribe();
    }

    this._unsubscribe = this._taskRepository.watchTasks(user.uid, (tasks) => {
      this._allUserTasks.set(tasks);
    });
  }

  stopWatchingTasks() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  async addTask(task: Omit<Task, 'id' | 'userId'>) {
    try {
      const user = this._authService.user()!
      await this._taskRepository.createTask({
        ...task,
        userId: user.uid
      })
      this._notificationService.handleSucessMessage('Tarefa criada com sucesso')
    } catch (error) {
      this._notificationService.handleFirebaseError('Erro ao adicionar nova tarefa', error as FirebaseError)
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this._taskRepository.deleteTask(taskId);
      this._notificationService.handleSucessMessage('Tarefa removida com sucesso')
    } catch (error) {
      this._notificationService.handleFirebaseError('Erro ao deletar tarefa', error as FirebaseError)
    }
  }

  async updateTask(taskId: string, task: Omit<Task, 'id' | 'userId' | 'createdAt'>) {
    try {
      await this._taskRepository.updateTask(taskId, task)
      this._notificationService.handleSucessMessage('Tarefa atualizada com sucesso')
    } catch (error) {
      this._notificationService.handleFirebaseError('Erro ao atualizar tarefa', error as FirebaseError)
    }
  }

  async updateCompleteStatus(taskId: string, task: Pick<Task, 'status' | 'updatedAt' | 'completedAt'>) {
    try {
      await this._taskRepository.updateTask(taskId, task)
      this._notificationService.handleSucessMessage(`Tarefa ${task.status == 'completed' ? 'concluída' : 'iniciada'}!`)
    } catch (error) {
      this._notificationService.handleFirebaseError('Erro ao atualizar tarefa', error as FirebaseError)
    }
  }

  async startPendingTask(taskId: string) {
    try {
      await this._taskRepository.updateTask(taskId, { status: 'in_progress' })
      this._notificationService.handleSucessMessage('Tarefa iniciada!')
    } catch (error) {
      this._notificationService.handleFirebaseError('Erro ao atualizar tarefa', error as FirebaseError)
    }
  }
}