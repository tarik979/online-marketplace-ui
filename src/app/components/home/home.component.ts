import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Products } from 'src/app/models/products.model';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Products[] = [];
  filteredProducts: Products[] = [];
  paginatedProducts: Products[] = [];
  categories: Category[] = [];
  pageSize = 10;

  filterValues = {
    name: '',
    category: '',
    sold: 'all'
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router,
              private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.retrieveProducts();
    this.getCategories();
  }

  // Fetch all products
  retrieveProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data.filter(p => p.delete == false);
        this.filteredProducts = data.filter(p => p.delete == false);
        this.paginateProducts();
      },
      error: (e) => console.error(e)
    });
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e)
    });
  }

  paginateProducts(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }


  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.paginateProducts();
  }


  applyFilter(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesName = product.name?.toLowerCase().includes(this.filterValues.name.toLowerCase());
      const matchesCategory = !this.filterValues.category || this.getCategoryName(product.categoryId as number) === this.filterValues.category;
      const matchesSold =
        this.filterValues.sold === 'all' ||
        (this.filterValues.sold === 'true' && product.sold) ||
        (this.filterValues.sold === 'false' && !product.sold);

      return matchesName && matchesCategory && matchesSold;
    });
    this.paginateProducts();
  }


  getCategoryName(id: number): string {
    const category = this.categories.find((c) => c.categoryID === id);
    return category ? category.name + "" : '';
  }


  addToCart(product: Products): void {
    if (this.authService.isAuthenticated() && this.authService.isBuyer()) {
      const buyerId = localStorage.getItem('userId');
      if (!buyerId) {
        return;
      }
      const newOrder: Order = {
        status: 'favorite',
        buyer_id: parseInt(buyerId, 10),
        seller_id: product.sallerId,
        location: 'Default Location',
        product_id: product.id as number
      };
      this.orderService.create(newOrder).subscribe({
        next: (response) => {
          console.log('Order successfully created:', response);
        },
        error: (error) => {
          console.error('Error creating order:', error);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
