import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  private tokenSubject = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) { }

  gettoken(): Observable<string | null>{
    return this.tokenSubject.asObservable();
  }

  registerUser(value: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, value);
  }
}
