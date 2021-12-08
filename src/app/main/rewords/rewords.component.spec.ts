import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewordsComponent } from './rewords.component';

describe('RewordsComponent', () => {
  let component: RewordsComponent;
  let fixture: ComponentFixture<RewordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
