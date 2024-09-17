import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit{

  @Output() toggleSidenav = new EventEmitter<void>();
  isLoggedIn = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  isBuyer(): boolean {
    return this.authService.isBuyer()
    }

    isLoginIn(): boolean{
      return this.authService.isAuthenticated();
    }

    isSellerOrAdmin():boolean{
      return this.authService.isSeller() || this.authService.isAdmin()
    }
}
