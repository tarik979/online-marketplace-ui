import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { CategoriesListComponent } from './components/category/categories-list/categories-list.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/products', pathMatch: 'full' }, // Redirect to admin products by default
  { 
    path: 'admin', 
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'categories', component: CategoriesListComponent },
      { path: 'users', component: ListUserComponent },
      { path: 'list-orders/:sellerId', component: ListOrdersComponent },
      { path: 'list-orders', component: ListOrdersComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
