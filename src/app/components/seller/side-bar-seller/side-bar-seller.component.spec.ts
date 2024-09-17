import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarSellerComponent } from './side-bar-seller.component';

describe('SideBarSellerComponent', () => {
  let component: SideBarSellerComponent;
  let fixture: ComponentFixture<SideBarSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarSellerComponent]
    });
    fixture = TestBed.createComponent(SideBarSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
