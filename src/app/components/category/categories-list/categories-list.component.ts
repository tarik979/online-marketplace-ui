import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddCategoryPopUpComponent } from '../add-category-pop-up/add-category-pop-up.component';
import { UpdateCategoryDialogComponent } from '../update-category-dialog/update-category-dialog.component';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories = new MatTableDataSource<Category>
  currentCategory: Category = {};
  currentIndex = -1;
  name = "";
  displayedColumns: string[] = ['NO.', 'name', 'numberOfProducts', 'update'];
  isModalOpen: boolean = false;
  AllProduct: Products [] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  @Inject(MAT_DIALOG_DATA) public data: Category | undefined



  constructor(private categoryService: CategoriesService,
              private productService: ProductService,
              private alertService: AlertServiceService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.retrieveCategories();
    this.retrieveAllProducts();
  }

  ngAfterViewInit() {
    this.categories.sort = this.sort;
  }

  retrieveCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.data = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveAllProducts(){
    this.productService.getAll().subscribe({
      next:(data) => {
        this.AllProduct = data;
      },error: (e) => console.log(e)

    })
  }

  refreshList(): void {
    this.retrieveCategories();
    this.currentCategory = {};
    this.currentIndex = -1;
  }

  setActiveCategory(category: Category, index: number): void {
    this.currentCategory = category;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentCategory = {};
    this.currentIndex = -1;
    this.categoryService.getByName(this.name).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e)
    });
  }


  deleteCategory(id:number): void{
    if (this.getNumberOfProducts(id) > 0) {
      this.alertService.openSnackBar("this category has products")
    }else{
      this.categoryService.deleteById(id).subscribe({
        next:(res) =>{
          window.location.reload();
        },
        error: (e)=> console.log(e)
      })
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();
  }

  getNumberOfProducts(categoryId: number): number {
    return this.AllProduct ? this.AllProduct.filter(product => product.categoryId === categoryId).length : 0;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryPopUpComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveCategories();
    });
  }


  openUpdateDialog(category: Category): void {
    const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, {
      width: '250px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveCategories();
      }
    });
  }

}
