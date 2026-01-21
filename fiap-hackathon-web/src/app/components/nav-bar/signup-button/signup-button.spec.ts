import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupButton } from './signup-button';

describe('SignupButton', () => {
  let component: SignupButton;
  let fixture: ComponentFixture<SignupButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
