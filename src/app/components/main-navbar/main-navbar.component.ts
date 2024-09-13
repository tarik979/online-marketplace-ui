import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
}
