import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Products } from 'src/app/models/products.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Products[] = [];

  constructor(private productService: ProductService,
              private orderService:OrderService,
              private authService:AuthService,
              private router:Router) {}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => console.error(e)
    });
  }

  addToCart(product: Products): void {

    if (this.authService.isAuthenticated() && this.authService.isBuyer()) {
      const buyerId = localStorage.getItem('userId');

    if (!buyerId) {
      return;
    }

    const sellerId = product.sallerId;
    const location = 'Default Location';

    // Create the order object
    const newOrder: Order = {
      status: 'pending',
      buyer_id: parseInt(buyerId, 10),
      seller_id: sellerId,
      location: location,
      product_id: product.id as number
    };

    // Send the order to the backend using the OrderService
    this.orderService.create(newOrder).subscribe({
      next: (response) => {
        console.log('Order successfully created:', response);
      },
      error: (error) => {
        console.error('Error creating order:', error);
      }
    });
    } else{
      this.router.navigate(['/login']);
    }
    }

}
