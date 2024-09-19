import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.mode';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component'; // Import your update dialog

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users = new MatTableDataSource<User>();
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'createAt', 'role', 'actions'];
  originalData: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Add paginator

  constructor(private userService: UserService, public dialog: MatDialog) {}  // Inject MatDialog

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.originalData = data.filter(user => user.role?.name !== "ROLE_ADMIN");
        this.users.data = this.originalData;
        this.users.paginator = this.paginator; // Initialize paginator
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


  deleteUser(userId: number): void {
    this.userService.deleteById(userId).subscribe({
      next: () => {
        this.users.data = this.users.data.filter(user => user.userId !== userId);
      },
      error: (e) => console.error('Error deleting user', e)
    });
  }


  openUpdateDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.update(result).subscribe({
          next: () => {
            this.retrieveUsers();
          },
          error: (e) => console.error('Error updating user', e)
        });
      }
    });
  }

  retrieveUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.originalData = data.filter(user => user.role?.name !== "ROLE_ADMIN");
        this.users.data = this.originalData;
      },
      error: (e) => console.error(e)
    });
  }
}
