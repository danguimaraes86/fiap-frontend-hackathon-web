import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.models';
import { TaskFullDetails } from './task-full-details';

describe('TaskFullDetails', () => {
  let component: TaskFullDetails;
  let fixture: ComponentFixture<TaskFullDetails>;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    dueDate: '2026-01-01',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    userId: '',
    completedAt: null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFullDetails],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { task: mockTask } }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(TaskFullDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
