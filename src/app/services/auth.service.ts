import { Router } from '@angular/router';
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
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http: HttpClient, private route: Router) { }

  gettoken(): Observable<string | null>{
    return this.tokenSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(): void {
    this.loggedIn.next(true);
  }

  registerUser(value: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, value);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, credentials).pipe(
      map(response => {
        if (response && response.jwt) {
          localStorage.setItem('jwtToken', response.jwt);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('userRoles', JSON.stringify(response.roles));
          this.tokenSubject.next(response.jwt);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRoles');
    this.tokenSubject.next(null);
    this.loggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('userRoles');
    return roles ? JSON.parse(roles) : [];
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }


  isSeller(): boolean {
    return this.hasRole('ROLE_SELLER');
  }

  isBuyer(): boolean {
    return this.hasRole('ROLE_BUYER');
  }

  isAdmin():boolean{
    return this.hasRole('ROLE_ADMIN');
  }
}
