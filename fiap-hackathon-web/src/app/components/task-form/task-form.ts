import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSelectModule } from '@angular/material/select';
import { TaskPriority, TaskStatus } from '../../models/task.models';


@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private _fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<TaskForm>);

  taskForm: FormGroup;
  isLoading = false;

  statuses: TaskStatus[] = ['pending', 'in_progress', 'completed', 'cancelled'];
  priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  statusLabels = {
    pending: 'Pendente',
    in_progress: 'Em Progresso',
    completed: 'Concluída',
    cancelled: 'Cancelada'
  };

  priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    urgent: 'Urgente'
  };

  constructor() {
    this.taskForm = this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: [null],
      startDate: [null],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const formValue = this.taskForm.value;

      // Formatar as datas para ISO string
      const taskData = {
        ...formValue,
        dueDate: formValue.dueDate ? new Date(formValue.dueDate).toISOString() : undefined,
        startDate: formValue.startDate ? new Date(formValue.startDate).toISOString() : undefined
      };

      this._dialogRef.close(taskData);
    }
  }

  onCancel(): void {
    this._dialogRef.close();
  }

}
