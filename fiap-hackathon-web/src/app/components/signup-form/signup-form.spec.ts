import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { SignupForm } from './signup-form';

describe('SignupForm', () => {
  let component: SignupForm;
  let fixture: ComponentFixture<SignupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupForm],
      providers: [
        provideRouter([]),
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
