import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIncomeComponent } from './check-income.component';

describe('CheckIncomeComponent', () => {
  let component: CheckIncomeComponent;
  let fixture: ComponentFixture<CheckIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
