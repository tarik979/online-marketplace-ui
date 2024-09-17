import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  categories: Category[] = [];
  selectedImage: File | null = null;  // Hold the selected image file

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Fetch the categories from the CategoriesService
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

  // Handle image selection
  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;

    // Check if the form is invalid or image is not selected
    if (this.productForm.invalid || !this.selectedImage) {
      return;
    }

    // Create a FormData object to send the product details and the image
    const formData = new FormData();

    // Append the product details as JSON
    formData.append('product', new Blob([JSON.stringify({
      name: this.productForm.value.productName,
      shortDescription: this.productForm.value.shortDescription,
      longDescription: this.productForm.value.longDescription,
      price: this.productForm.value.price,
      categoryId: this.productForm.value.category,
      sellerId: Number(localStorage.getItem("userId"))
    })], { type: 'application/json' }));


    formData.append('image', this.selectedImage);

    this.productService.create(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.router.navigate(['/admin/products/products']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.productForm.reset();
    this.selectedImage = null;
  }
}
