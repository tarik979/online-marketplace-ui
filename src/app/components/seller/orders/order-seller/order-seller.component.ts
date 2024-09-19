import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Order } from 'src/app/models/order.model';
import { Products } from 'src/app/models/products.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.mode';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewDialogComponent } from '../review/review-dialog/review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-seller',
  templateUrl: './order-seller.component.html',
  styleUrls: ['./order-seller.component.css']
})
export class OrderSellerComponent implements OnInit {
  reviews: Review[] = [];
  filteredReviews: MatTableDataSource<Review> = new MatTableDataSource<Review>();
  products: Products[] = [];
  users: User[] = [];
  sellerId: number = 0;
  selectedProductId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reviewService: ReviewService,
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sellerId = Number(localStorage.getItem('userId'));
    this.loadSellerProducts();
    this.loadAllUsers();
  }


  loadSellerProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products.filter(p => p.sallerId === this.sellerId);
        this.loadAllReviews();
      },
      error: (e) => console.error('Error fetching products:', e)
    });
  }


  loadAllReviews(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews.filter(r =>
          this.products.some(p => p.id === r.productId)
        );
        this.filteredReviews = new MatTableDataSource(this.reviews);
        this.filteredReviews.paginator = this.paginator;
      },
      error: (e) => console.error('Error fetching reviews:', e)
    });
  }


  loadAllUsers(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (e) => console.error('Error fetching users:', e)
    });
  }

  // Get the user's name by userId
  getUserName(userId: number | undefined): string {
    const user = this.users.find(u => u.userId === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  }

  // Filter reviews by selected product
  filterReviewsByProduct(): void {
    if (this.selectedProductId) {
      const filtered = this.reviews.filter(r => r.productId === this.selectedProductId);
      this.filteredReviews = new MatTableDataSource(filtered);
      this.filteredReviews.paginator = this.paginator;
    } else {
      this.filteredReviews = new MatTableDataSource(this.reviews);
      this.filteredReviews.paginator = this.paginator;
    }
  }


  getProductName(productId: number | undefined): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name + "" : 'Unknown Product';
  }


  openReviewDialog(review: Review): void {
    this.dialog.open(ReviewDialogComponent, {
      width: '400px',
      data: { review }
    });
  }


  deleteReview(reviewId: number | undefined): void {
    this.reviewService.deleteReviewById(reviewId).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r.reviewId !== reviewId);
        this.filteredReviews = new MatTableDataSource(this.reviews);
        this.filteredReviews.paginator = this.paginator;
      },
      error: (e) => console.error('Error deleting review:', e)
    });
  }
}
