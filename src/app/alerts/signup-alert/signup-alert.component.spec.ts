import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAlertComponent } from './signup-alert.component';

describe('SignupAlertComponent', () => {
  let component: SignupAlertComponent;
  let fixture: ComponentFixture<SignupAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
