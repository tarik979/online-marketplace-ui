import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellerComponent } from './order-seller.component';

describe('OrderSellerComponent', () => {
  let component: OrderSellerComponent;
  let fixture: ComponentFixture<OrderSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSellerComponent]
    });
    fixture = TestBed.createComponent(OrderSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
