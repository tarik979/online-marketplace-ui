import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-marketplace-ui';

  sidenavOpened: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isUserSeller(): boolean {
    return this.authService.isSeller();
  }

  isUserBuyer(): boolean {
    return this.authService.isBuyer();
  }

  isAdmin():boolean{
    return this.authService.isAdmin();
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
