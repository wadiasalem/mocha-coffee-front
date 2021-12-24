import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckReservationsComponent } from './check-reservations.component';

describe('CheckReservationsComponent', () => {
  let component: CheckReservationsComponent;
  let fixture: ComponentFixture<CheckReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
