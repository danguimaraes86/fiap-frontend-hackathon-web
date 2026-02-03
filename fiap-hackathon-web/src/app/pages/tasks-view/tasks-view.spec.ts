import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';
import { TasksView } from './tasks-view';

describe('TasksView', () => {
  let component: TasksView;
  let fixture: ComponentFixture<TasksView>;
  let taskService: any;
  let authService: any;

  beforeEach(async () => {
    authService = {
      user: vi.fn().mockReturnValue({ uid: 'uid' })
    }

    taskService = {
      getAllTask: vi.fn(),
      tasks: vi.fn().mockReturnValue([])
    };

    await TestBed.configureTestingModule({
      imports: [TasksView],
      providers: [
        { provide: TaskService, useValue: taskService },
        { provide: AuthenticationService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
