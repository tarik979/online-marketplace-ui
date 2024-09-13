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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  currentProduct: Products = {};
  isModalOpen = false;
  currentIndex = -1;
  Products = new MatTableDataSource<Products>;
  displayedColumns: string[] = ['NO.', 'name', 'category', "seller", 'delete'];
  categories : Category[] = [];
  users:User[] = [];
  submitted = false;
  orders:Order[] = [];



  constructor(private productService:ProductService,
              private categoryService:CategoriesService,
              private usersService: UserService,
              private ordersService: OrderService,
              private dialog:MatDialog){}

  ngOnInit(): void {
   this.retrieveProducts()
   this.getUsers()
   this.getAllCategories()
   this.retrieveOrders()
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Products.filter = filterValue.trim().toLowerCase();
  }

  openModal(): void {
    const model = document.getElementById("popUp");
    if(model != null)
    model.style.display ="block";
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  deleteProduct(id:number): void{
    this.productService.deleteById(id).subscribe({
      next:(res) =>{
        window.location.reload();
      },
      error: (e)=> console.log(e)
    })
  }

  retrieveProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.Products.data = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveOrders(){
    this.ordersService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (e) => console.log(e)
    })
  }

  getAllCategories(){
    this.categoryService.getAll().subscribe({
      next:(data) => {
        this.categories = data
      },error:(e) => console.log(e)
    })
  }

  getUsers(){
    this.usersService.getAll().subscribe({
      next:(data) => {
        this.users = data;
      },error:(e)=> console.log(e)
    })
  }

  getCategoryName(id: number) : String{
    const category = this.categories.find(c => c.categoryID == id);
    return category ? category.name + "" : "";
  }

  getSellerName(id: number){
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
}
