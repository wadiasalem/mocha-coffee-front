import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCommandsComponent } from './check-commands.component';

describe('CheckCommandsComponent', () => {
  let component: CheckCommandsComponent;
  let fixture: ComponentFixture<CheckCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckCommandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
