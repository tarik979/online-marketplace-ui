import { ReviewService } from 'src/app/services/review.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { Products } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.mode';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentProduct: Products = {};
  isModalOpen = false;
  currentIndex = -1;
  Products = new MatTableDataSource<Products>();
  displayedColumns: string[] = ['NO.', 'name', 'category', 'seller', 'sold', 'delete'];
  categories: Category[] = [];
  users: User[] = [];
  orders: Order[] = [];
  sellers: User[] = []
  selectedCategoryId: number | null = null;
  selectedSellerId: number | null = null;
  filteredProducts: Products[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoriesService,
              private usersService: UserService,
              private ordersService: OrderService,
              private reviewService: ReviewService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.retrieveProducts();
    this.getUsers();
    this.getAllCategories();
    this.retrieveOrders();
  }

  @ViewChild(MatSort)
  sort!: MatSort;


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Products.filter = filterValue.trim().toLowerCase();
  }

  filterProducts(): void {
    this.filteredProducts = this.Products.data.filter(product => {
      const matchesCategory = !this.selectedCategoryId || product.categoryId === this.selectedCategoryId;
      const matchesSeller = !this.selectedSellerId || product.sallerId === this.selectedSellerId;
      return matchesCategory && matchesSeller;
    });

    this.Products = new MatTableDataSource(this.filteredProducts);
  }

  toggleSoldStatus(product: Products): void {
    if (product.sold) {
      this.productService.unmarksold(product.id as number).subscribe()
    }else{
      this.productService.marksold(product.id as number).subscribe()
    }

    window.location.reload()
  }

  deleteProduct(id: number): void {
    let thisproduct: Products = new Products();
    this.productService.getById(id).subscribe({
      next: (data) => thisproduct = data
    })

    if (!thisproduct.delete) {
      let hasOrders :boolean = false;
      let hasReviews: boolean = false;
      this.ordersService.getAll().subscribe({
        next:(value) => hasOrders = value.filter(o => o.product_id == id).length > 0,
        error: (e) => console.log(e)
        })

        this.reviewService.getAllReviews().subscribe({
          next:(value) => hasReviews = value.filter(o => o.productId == id).length > 0,
          error: (e) => console.log(e)
        })

        if (hasOrders || hasReviews || thisproduct?.sold) {
          this.productService.Setdeleted(id)
        }else{
          this.productService.deleteById(id).subscribe({
            next: (res) => {
              window.location.reload();
            },
            error: (e) => console.log(e)
          });
        }
    }else{
      this.productService.Setdeleted(id)
    }
    location.reload()
  }

  retrieveProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.Products.data = data;
      },
      error: (e) => console.error(e)
    });
  }


  retrieveOrders(): void {
    this.ordersService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (e) => console.log(e)
    });
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.log(e)
    });
  }


  getUsers(): void {
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data.filter(user=> user.role?.name == "ROLE_SELLER");
      },
      error: (e) => console.log(e)
    });
  }

  getCategoryName(id: number): String {
    const category = this.categories.find(c => c.categoryID == id);
    return category ? category.name + "" : "";
  }


  getSellerName(id: number): String {
    const seller = this.users.find(u => u.userId == id);
    return seller ? seller.firstName + " " + seller.lastName : "";
  }

  openDialog(product: Products): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      width: '80%',
      data: {
        product,
        categories: this.categories,
        users: this.users,
        orders: this.orders
      }
    });
  }


  openUpdateDialog(product: any): void {
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '600px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product updated successfully:', result);
        this.retrieveProducts();
      }
    });
  }
}
