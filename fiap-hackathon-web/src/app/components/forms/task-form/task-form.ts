import { Component, inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSelectModule } from '@angular/material/select';
import { DateTime } from 'luxon';
import { TASK_PRIORITIES, TASK_STATUSES, TaskPriority, TaskStatus } from '../../../models/task.models';
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
  priority: FormControl<TaskPriority>,
  dueDate: FormControl<DateTime<boolean> | null>,
  startDate: FormControl<DateTime<boolean> | null>,
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
    MatProgressSpinner,
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

  taskForm: FormGroup<TaskFormData>;
  isLoading = false;

  statusList = Object.values(TASK_STATUSES);
  priorityList = Object.values(TASK_PRIORITIES);

  constructor() {
    this.taskForm = this._fb.group<TaskFormData>({
      title: this._fb.control('', {
        nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]
      }),
      description: this._fb.control(null),
      status: this._fb.control(TASK_STATUSES.PENDING.value, {
        nonNullable: true, validators: [Validators.required]
      }),
      priority: this._fb.control(TASK_PRIORITIES.MEDIUM.value, {
        nonNullable: true, validators: [Validators.required]
      }),
      dueDate: this._fb.control<DateTime | null>(null),
      startDate: this._fb.control<DateTime | null>(null),
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const formValue = this.taskForm.getRawValue();

      this._taskService.addTask({
        title: formValue.title,
        description: formValue.description,
        status: formValue.status,
        priority: formValue.priority,
        dueDate: formValue.dueDate?.toISODate() ?? null,
        startDate: formValue.startDate?.toISODate() ?? null,
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO()
      })

      this._dialogRef.close();
    }
  }

  onCancel(): void {
    this._dialogRef.close();
  }

}
