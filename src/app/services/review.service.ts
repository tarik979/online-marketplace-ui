import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
const baseUrl = 'http://localhost:8080/reviews';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}


  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${baseUrl}/add`, review);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${baseUrl}/find/all`);
  }


  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${baseUrl}/find/${id}`);
  }

 
  updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(`${baseUrl}/update`, review);
  }


  deleteReviewById(id: number | undefined): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
}
