import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { Products } from 'src/app/models/products.model';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  favoriteItems: any[] = [];
  buyerId: number | null = null;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.buyerId = Number(localStorage.getItem('userId'));
    if (this.buyerId) {
      this.retrieveAllFavorites();
    }
  }

  retrieveAllFavorites(): void {
    this.orderService.getAll().subscribe((favorites: Order[]) => {
      const filteredFavorites = favorites.filter(
        (order) => order.buyer_id === this.buyerId && order.status === 'favorite'
      );

      const productRequests = filteredFavorites.map((favorite) =>
        this.productService.getById(favorite.product_id as number)
      );

      forkJoin(productRequests).subscribe((products: Products[]) => {
        const detailRequests = products.map((product) => {
          const categoryRequest = this.categoryService.getById(product.categoryId as number);
          const sellerRequest = this.userService.getById(product.sallerId as number);

          return forkJoin({ category: categoryRequest, seller: sellerRequest }).pipe(
            map((details) => ({
              product: product,
              category: details.category,
              seller: details.seller
            }))
          );
        });

        forkJoin(detailRequests).subscribe((finalDetails) => {
          this.favoriteItems = finalDetails;
        });
      });
    });
  }



  removeFromFavorites(orderId: number): void {
    this.orderService.deleteById(orderId).subscribe(() => {
      this.favoriteItems = this.favoriteItems.filter((item) => item.product.orderId !== orderId);
    });
  }

  clearFavorites(): void {
    this.favoriteItems.forEach((item) => {
      this.removeFromFavorites(item.product.orderId as number);
    });
  }
}
