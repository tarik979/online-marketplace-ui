import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { Products } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  selectedImage: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Products },
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) {

    this.productForm = this.formBuilder.group({
      name: [this.data.product.name, Validators.required],
      shortDescription: [this.data.product.shortDescription, Validators.required],
      longDescription: [this.data.product.longDescription, Validators.required],
      price: [this.data.product.price, [Validators.required, Validators.min(0.01)]],
      category: [this.data.product.categoryId, Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }


  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }


  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }


    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify({
      id: this.data.product.id,
      name: this.productForm.value.name,
      shortDescription: this.productForm.value.shortDescription,
      longDescription: this.productForm.value.longDescription,
      price: this.productForm.value.price,
      categoryId: this.productForm.value.category,
      sellerId: this.data.product.sallerId
    })], { type: 'application/json' }));


    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }


    this.productService.update(formData).subscribe({
      next: (response) => {
        console.log('Product updated successfully', response);
        this.dialogRef.close(response);
      },
      error: (err) => {
        console.error('Error updating product', err);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
