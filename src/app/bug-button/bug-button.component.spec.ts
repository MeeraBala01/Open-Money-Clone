import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugButtonComponent } from './bug-button.component';

describe('BugButtonComponent', () => {
  let component: BugButtonComponent;
  let fixture: ComponentFixture<BugButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
