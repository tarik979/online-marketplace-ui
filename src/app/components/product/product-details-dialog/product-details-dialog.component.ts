import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.mode';


@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any; categories: Category[]; users: User[]; orders: Order[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getCategoryName(id: number): string {
    const category = this.data.categories.find(c => c.categoryID === id);
    return category ? category.name + "" : '';
  }

  getSellerName(id: number): string {
    const seller = this.data.users.find(u => u.userId === id);
    return seller ? seller.firstName + ' ' + seller.lastName : '';
  }

  getNumberOfOrders(productId :number){
    return this.data.orders.filter(order => order.product_id === productId && order.status == "Valid").length
  }
}
