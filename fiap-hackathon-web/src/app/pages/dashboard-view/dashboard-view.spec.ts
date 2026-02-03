import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardView } from './dashboard-view';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

describe('DashboardView', () => {
  let component: DashboardView;
  let fixture: ComponentFixture<DashboardView>;
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
      imports: [DashboardView],
      providers: [
        { provide: TaskService, useValue: taskService },
        { provide: AuthenticationService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
