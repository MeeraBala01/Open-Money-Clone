import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowComponent } from './cashflow.component';

describe('CashflowComponent', () => {
  let component: CashflowComponent;
  let fixture: ComponentFixture<CashflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
