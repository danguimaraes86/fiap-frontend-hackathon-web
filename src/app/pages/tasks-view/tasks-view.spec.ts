import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { TasksView } from './tasks-view';

describe('TasksView', () => {
  let component: TasksView;
  let fixture: ComponentFixture<TasksView>;
  let taskService: any;
  let authService: any;
  let userPreferencesService: any;

  beforeEach(async () => {
    authService = {
      user: vi.fn().mockReturnValue({ uid: 'uid' })
    }

    taskService = {
      getAllTask: vi.fn(),
      allTasks: vi.fn().mockReturnValue({ itens: [], count: 0 }),
      completedTasks: vi.fn().mockReturnValue({ itens: [], count: 0 }),
      inProgressTasks: vi.fn().mockReturnValue({ itens: [], count: 0 }),
      pendingTasks: vi.fn().mockReturnValue({ itens: [], count: 0 }),
    };

    userPreferencesService = {
      userPreference: vi.fn().mockReturnValue({
        showCompletedTasks: false,
        showPendingTasks: false
      })
    };

    await TestBed.configureTestingModule({
      imports: [TasksView],
      providers: [
        { provide: TaskService, useValue: taskService },
        { provide: AuthenticationService, useValue: authService },
        { provide: UserPreferencesService, useValue: userPreferencesService }
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
