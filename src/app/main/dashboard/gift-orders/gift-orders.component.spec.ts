import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftOrdersComponent } from './gift-orders.component';

describe('GiftOrdersComponent', () => {
  let component: GiftOrdersComponent;
  let fixture: ComponentFixture<GiftOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
