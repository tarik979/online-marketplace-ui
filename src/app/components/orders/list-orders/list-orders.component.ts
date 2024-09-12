import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { Products } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.mode';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
})
export class ListOrdersComponent implements OnInit {
  orders = new MatTableDataSource<Order>();
  sellerId: string | null = null;
  showAll: boolean = false;
  users: User[] = [];
  product: Products[] = [];

  displayedColumns: string[] = [
    'index',
    'buyer_name',
    'createAt',
    'product_name',
  ];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
    private alert: AlertServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sellerId = params.get('sellerId');
      if (this.sellerId !== null && !isNaN(Number(this.sellerId))) {
        const sellerIdNumber = Number(this.sellerId);
        this.showAll = false;
        this.geAllProduct();
        this.getAllUsers().subscribe(()=>{
          const user = this.findUser(sellerIdNumber)
          if (user !=  null) {
            if (this.checkIsSeller(user)) {
              this.fetchOrdersBySellerId(this.sellerId);
            } else {
              this.alert.openSnackBar('User is not a seller');
              window.location.replace("/admin/list-orders")
            }
          } else {
            this.alert.openSnackBar('Seller not found');
            window.location.replace("/admin/list-orders")
          }
        })

      } else {
        this.showAll = true;
        this.displayedColumns.push('seller_name');
        this.fetchAllOrders();
      }
      this.geAllProduct();
      this.getAllUsers().subscribe();
    });
  }

  fetchAllOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders.data = data.filter((order) => {
          return order.status == 'Valid';
        });
      },
      error: (e) => console.log(e),
    });
  }
  fetchOrdersBySellerId(sellerId: String | null) {
    this.fetchAllOrders();
    this.orders.data = this.orders.data.filter((order) => {
      return order.seller_id?.toString() == sellerId;
    });
  }

  getAllUsers(): Observable<void> {
    return new Observable((observer) => {
      this.userService.getAll().subscribe({
        next: (data) => {
          this.users = data;
          observer.next();
          observer.complete();
        },
        error: (e) => {
          console.log(e);
          observer.error(e);
        },
      });
    });
  }

  geAllProduct() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (e) => console.log(e),
    });
  }

  getNameUser(id: number): String {
    const user = this.users.find((us) => us.userId == id);
    return user ? user.firstName + ' ' + user?.lastName : '';
  }

  getNameProduct(id: number): String {
    const product = this.product.find((p) => p.id == id);
    return product ? product.name + '' : '';
  }

  checkIsSeller(user: User): boolean {
    return user.role?.name == 'ROLE_SELLER';
  }

  findUser(id: number) {
      const user = this.users.find((user) => user.userId == id);
      return user ? user : null
  }

  getSellerName(): string {
    if (this.sellerId) {
      const seller = this.users.find(user => user.userId === Number(this.sellerId));
      return seller ? `${seller.firstName} ${seller.lastName}` : 'Unknown Seller';
    }
    return 'Unknown Seller';
  }
}
