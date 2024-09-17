import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service'; // Import your service
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Order[] = [];  // Array to hold the orders
  buyerId: number | null = null;  // The buyer ID extracted from route params

  constructor(
    private orderService: OrderService,  // Injecting OrderService
    private route: ActivatedRoute,
    private productService:ProductService
  ) {}

  ngOnInit(): void {
    // Extract buyerId from the route
    this.buyerId = Number(localStorage.getItem('userId'));

    // Fetch and filter orders by 'pending' status for the current buyer
    if (this.buyerId) {
      this.orderService.getAll().subscribe((orders: Order[]) => {
        this.cartItems = orders.filter(order => order.status === 'pending' && order.buyer_id === this.buyerId);
      });
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product_id ? this.getProductPrice(item.product_id) : 0), 0);
  }

  getProductPrice(productId: number): number {
    let num : number = 0;
    this.productService.getById(productId).subscribe({
      next: (data) => num = data.id as number,
      error: (e) => console.log(e)
    })

    return num;
  }

  // Method to remove an item from the cart
  removeFromCart(order: Order): void {
    const index = this.cartItems.indexOf(order);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Placeholder methods for Checkout and Clear Cart
  checkout(): void {
    alert('Proceed to Checkout');
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
