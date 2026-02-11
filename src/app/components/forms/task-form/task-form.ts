import { Component, inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DateTime } from 'luxon';
import { Task, TASK_STATUSES, TaskStatus } from '../../../models/task.models';
import { TaskService } from '../../../services/task.service';

@Injectable()
class CustomDatepickerIntl extends MatDatepickerIntl {
  override calendarLabel = 'Calendário';
  override openCalendarLabel = 'Abrir calendário';
  override closeCalendarLabel = 'Fechar calendário';
  override prevMonthLabel = 'Mês anterior';
  override nextMonthLabel = 'Próximo mês';
  override prevYearLabel = 'Ano anterior';
  override nextYearLabel = 'Próximo ano';
  override prevMultiYearLabel = 'Anos anteriores';
  override nextMultiYearLabel = 'Próximos anos';
  override switchToMonthViewLabel = 'Visualização do mês';
  override switchToMultiYearViewLabel = 'Escolher mês e ano';
}

interface TaskFormData {
  title: FormControl<string>,
  description: FormControl<string | null>,
  status: FormControl<TaskStatus>,
  dueDate: FormControl<DateTime<boolean> | null>,
}

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [
    provideLuxonDateAdapter(),
    { provide: MatDatepickerIntl, useClass: CustomDatepickerIntl }
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private _taskService = inject(TaskService)
  private _fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<TaskForm>);
  payload = inject<{ task: Task } | null>(MAT_DIALOG_DATA);

  taskForm: FormGroup<TaskFormData>;
  statusList = Object.values(TASK_STATUSES);

  constructor() {
    this.taskForm = this._fb.group<TaskFormData>({
      title: this._fb.control('', {
        nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]
      }),
      description: this._fb.control(null),
      status: this._fb.control(TASK_STATUSES.PENDING.value, {
        nonNullable: true, validators: [Validators.required]
      }),
      dueDate: this._fb.control<DateTime | null>(null),
    });

    if (this.payload) {
      const { task } = this.payload
      this.taskForm.patchValue({
        title: task.title,
        description: task.description ?? null,
        status: task.status,
        dueDate: task.dueDate ? DateTime.fromISO(task.dueDate) : null,
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.payload ? this.handleUpdateTask() : this.handleCreateTask()
      this._dialogRef.close();
    }
  }

  private handleCreateTask() {
    const formValue = this.taskForm.getRawValue();
    this._taskService.addTask({
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      dueDate: formValue.dueDate?.toISODate() ?? null,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
      completedAt: formValue.status == 'completed' ? DateTime.now().toISO() : null
    })
  }

  private handleUpdateTask() {
    const formValue = this.taskForm.getRawValue()

    this._taskService.updateTask(this.payload!.task.id, {
      title: formValue.title,
      description: formValue.description ?? null,
      status: formValue.status,
      dueDate: formValue.dueDate?.toISODate() ?? null,
      updatedAt: DateTime.now().toISO(),
      completedAt: formValue.status == 'completed' ? DateTime.now().toISO() : null
    })
  }

}
