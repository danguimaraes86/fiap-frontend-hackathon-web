import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from '../../models/task.models';
import { TaskDetail } from './task-detail';

describe('TaskDetail', () => {
  let component: TaskDetail;
  let fixture: ComponentFixture<TaskDetail>;

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
      imports: [TaskDetail]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetail);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', mockTask)
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
