import { AlertServiceService } from './../../../../services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
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
      sellerId: ['', Validators.required],  // Add sellerId
      image: ['', Validators.required]  // Image field for validation
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

    if (this.productForm.invalid || !this.selectedImage) {
      return;
    }

    // Prepare product data as a JSON object
    const productData = {
      name: this.productForm.value.productName,
      shortDescription: this.productForm.value.shortDescription,
      longDescription: this.productForm.value.longDescription,
      price: this.productForm.value.price,
      categoryId: this.productForm.value.category,
      sellerId: this.productForm.value.sellerId
    };

    // Call the product service to create the product with the image
    this.productService.create(productData, this.selectedImage).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.router.navigate(['/products']);  // Redirect after success
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  // Handle form reset
  onReset(): void {
    this.submitted = false;
    this.productForm.reset();
    this.selectedImage = null;  // Reset the image selection
  }
}
