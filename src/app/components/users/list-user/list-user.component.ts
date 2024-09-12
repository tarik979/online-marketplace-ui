import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.mode';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users = new MatTableDataSource<User>();
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'createAt', 'role', 'actions'];
  originalData: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.originalData = data.filter(user => user.role?.name !== "ROLE_ADMIN");
        this.users.data = this.originalData;
      },
      error: (e) => console.error(e)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  showAllUsers(): void {
    this.users.data = this.originalData;
  }

  showBuyers(): void {
    this.users.data = this.originalData.filter(user => user.role?.name === "ROLE_BUYER");
  }

  showSellers(): void {
    this.users.data = this.originalData.filter(user => user.role?.name === "ROLE_SELLER");
  }
}
