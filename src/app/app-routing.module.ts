import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CategoriesListComponent } from './components/category/categories-list/categories-list.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddProductComponent } from './components/seller/products/add-product/add-product.component';
import { CartComponent } from './components/buyer/cart/cart.component';
import { SellerProductsComponent } from './components/seller/products/seller-products/seller-products.component';
import { AdminGuard, AuthGuard, BuyerGuard, LoggedInGuard, SellerGuard } from './guard/auth.guard';
import { OrderSellerComponent } from './components/seller/orders/order-seller/order-seller.component';
import { ProductDetailComponent } from './components/product/product-details/product-details.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  {path :'product/:id', component:ProductDetailComponent},
  { path: 'login', component: LoginComponent, canActivate:[LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[LoggedInGuard] },
  {
    path:'buyer',  canActivate:[AuthGuard, BuyerGuard],
    children:[
      {path:'cart', component	: CartComponent}
    ]
  },
  {
    path: 'admin', canActivate:[AuthGuard, AdminGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'categories', component: CategoriesListComponent },
      { path: 'users', component: ListUserComponent },
      { path: 'list-orders/:sellerId', component: ListOrdersComponent },
      { path: 'list-orders', component: ListOrdersComponent }
    ]
  },
  {
    path:"seller", canActivate:[AuthGuard, SellerGuard],
    children:[
      { path: 'add-product', component: AddProductComponent },
      { path: 'products', component: SellerProductsComponent },
      { path:'orders', component:OrderSellerComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
