import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductDialogComponent } from './update-product-dialog.component';

describe('UpdateProductDialogComponent', () => {
  let component: UpdateProductDialogComponent;
  let fixture: ComponentFixture<UpdateProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
