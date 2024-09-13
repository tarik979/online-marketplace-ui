import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
// import { ProductsDetailsComponent } from './components/product/products-details/products-details.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component'
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesListComponent } from './components/category/categories-list/categories-list.component';
import { NgxSearchFilterModule } from 'ngx-search-filter';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './components/navbar/navbar.component'
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCategoryPopUpComponent } from './components/category/add-category-pop-up/add-category-pop-up.component';
import { UpdateCategoryDialogComponent } from './components/category/update-category-dialog/update-category-dialog.component';
import { ProductDetailsDialogComponent } from './components/product/product-details-dialog/product-details-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductDetailsComponent,
    ProductListComponent,
    CategoriesListComponent,
    NavbarComponent,
    ListUserComponent,
    ListOrdersComponent,
    AddCategoryPopUpComponent,
    UpdateCategoryDialogComponent,
    ProductDetailsDialogComponent,
    HomeComponent,
    MainNavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSearchFilterModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
