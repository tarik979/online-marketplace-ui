import { Component } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Products[] = [];

  constructor(private productService: ProductService) {}

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
    console.log(`Product ${product.name} added to cart!`);
  }
}
