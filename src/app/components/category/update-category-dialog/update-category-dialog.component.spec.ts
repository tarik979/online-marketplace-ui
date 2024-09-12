import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryDialogComponent } from './update-category-dialog.component';

describe('UpdateCategoryDialogComponent', () => {
  let component: UpdateCategoryDialogComponent;
  let fixture: ComponentFixture<UpdateCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
