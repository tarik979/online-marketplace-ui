import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryPopUpComponent } from './add-category-pop-up.component';

describe('AddCategoryPopUpComponent', () => {
  let component: AddCategoryPopUpComponent;
  let fixture: ComponentFixture<AddCategoryPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryPopUpComponent]
    });
    fixture = TestBed.createComponent(AddCategoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
