import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-update-category-dialog',
  templateUrl: './update-category-dialog.component.html',
  styleUrls: ['./update-category-dialog.component.css']
})
export class UpdateCategoryDialogComponent {
  category: Category;

  constructor(
    private categoryService: CategoriesService,
    public dialogRef: MatDialogRef<UpdateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.category = { ...data };
  }

  updateCategory(): void {
    this.categoryService.update(this.category).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (e) => console.error(e)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
