import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeOrdersComponent } from './coffee-orders.component';

describe('CoffeeOrdersComponent', () => {
  let component: CoffeeOrdersComponent;
  let fixture: ComponentFixture<CoffeeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
