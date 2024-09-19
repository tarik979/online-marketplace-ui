import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDetailsDialogComponent } from 'src/app/components/product/product-details-dialog/product-details-dialog.component';
import { UpdateProductDialogComponent } from 'src/app/components/product/update-product-dialog/update-product-dialog.component';
import { Category } from 'src/app/models/category.model';
import { Order } from 'src/app/models/order.model';
import { Products } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.mode';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent {
  currentProduct: Products = {};
  isModalOpen = false;
  currentIndex = -1;
  Products = new MatTableDataSource<Products>;
  displayedColumns: string[] = ['NO.', 'name', 'category', 'sold', 'delete']; // Added 'sold' column
  categories: Category[] = [];
  users: User[] = [];
  submitted = false;
  orders: Order[] = [];
  sellerId: number = 0;

  filterValues = {
    name: '',
    category: '',
    sold: 'all'
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService,
    private usersService: UserService,
    private ordersService: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.retrieveProducts();
    this.getUsers();
    this.getAllCategories();
    this.retrieveOrders();
    this.Products.filterPredicate = this.createFilter();
  }


  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.Products.sort = this.sort;
  }

  applyFilter(): void {
    this.Products.filter = JSON.stringify(this.filterValues);
  }

  createFilter(): (product: Products, filter: string) => boolean {
    return (product: Products, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const matchesName = product.name?.toLowerCase().includes(searchTerms.name.toLowerCase());
      const matchesCategory = !searchTerms.category || this.getCategoryName(product?.categoryId) === searchTerms.category;

      const matchesSold =
        searchTerms.sold === 'all' ||
        (searchTerms.sold === 'true' && product.sold) ||
        (searchTerms.sold === 'false' && !product.sold);

      return (matchesName && matchesCategory && matchesSold) as boolean;
    };
  }


  markAsSold(product: Products): void {
    this.productService.marksold(product.id as number).subscribe(
    )

    window.location.reload();
  }

  deleteProduct(id: number): void {
    this.productService.deleteById(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (e) => console.log(e)
    });
  }

  retrieveProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.Products.data = data.filter(
          (product) => product.sallerId == Number(localStorage.getItem('userId'))
        );
      },
      error: (e) => console.error(e)
    });
  }

  retrieveOrders() {
    this.ordersService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (e) => console.log(e)
    });
  }




  getAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.log(e)
    });
  }

  getUsers() {
    this.usersService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => console.log(e)
    });
  }

  getCategoryName(id: number | undefined): String {
    const category = this.categories.find((c) => c.categoryID == id);
    return category ? category.name + '' : '';
  }

  getSellerName() {
    this.sellerId = Number(localStorage.getItem('userId'));
    const seller = this.users.find((u) => u.userId == this.sellerId);
    return seller ? seller.firstName + ' ' + seller.lastName : '';
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Product updated successfully:', result);
        this.retrieveProducts();
      }
    });
  }
}
