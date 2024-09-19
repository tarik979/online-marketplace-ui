import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products.model';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.mode';
import { ProductService } from 'src/app/services/product.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Products | null = null;
  category: Category | null = null;
  seller: User | null = null;
  productId: number = 0;
  reviews: Review[] = [];
  reviewForm: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService,
    private userService: UserService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public auth: AuthService
  ) {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductDetails();
    this.getReviews();
  }

  getProductDetails(): void {
    this.productService.getById(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.getCategoryDetails(product.categoryId);
        this.getSellerDetails(product.sallerId);
      },
      error: (e) => console.error('Error fetching product details:', e)
    });
  }


  getCategoryDetails(categoryId: number | undefined): void {
    if (categoryId) {
      this.categoryService.getById(categoryId).subscribe({
        next: (category) => (this.category = category),
        error: (e) => console.error('Error fetching category:', e)
      });
    }
  }


  getSellerDetails(sellerId: number | undefined): void {
    if (sellerId) {
      this.userService.getById(sellerId).subscribe({
        next: (seller) => (this.seller = seller),
        error: (e) => console.error('Error fetching seller:', e)
      });
    }
  }


  getReviews(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (data) => {this.reviews = data.filter(r => r.productId == this.productId)
        data.map(r=> console.log(r.productId))
      },
      error: (e) => console.error('Error fetching reviews:', e)
    });
  }


  submitReview(): void {
    if (this.auth.isBuyer()) {
      this.submitted = true;

      if (this.reviewForm.invalid) {
        return;
      }

      const newReview: Review = {
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        productId: this.productId,
        userId: Number(localStorage.getItem('userId'))
      };

      this.reviewService.addReview(newReview).subscribe({
        next: () => {
          this.getReviews();
          this.reviewForm.reset();
          this.submitted = false;
        },
        error: (e) => console.error('Error adding review:', e)
      });
    }
  }
}
