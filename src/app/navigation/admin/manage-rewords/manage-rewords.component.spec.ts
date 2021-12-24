import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRewordsComponent } from './manage-rewords.component';

describe('ManageRewordsComponent', () => {
  let component: ManageRewordsComponent;
  let fixture: ComponentFixture<ManageRewordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRewordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRewordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
