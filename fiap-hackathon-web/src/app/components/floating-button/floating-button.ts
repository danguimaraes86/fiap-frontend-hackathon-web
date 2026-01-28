import { Component, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { TaskForm } from '../forms/task-form/task-form';

@Component({
  selector: 'app-floating-button',
  imports: [MatIcon, MatFabButton],
  templateUrl: './floating-button.html',
  styleUrl: './floating-button.scss',
})
export class FloatingButton {
  private _dialogRef = inject(MatDialog)

  openTaskForm() {
    this._dialogRef.open(TaskForm, {
      minWidth: '50%'
    })
  }

}
