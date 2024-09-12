import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { AlertServiceService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-add-category-pop-up',
  templateUrl: './add-category-pop-up.component.html',
  styleUrls: ['./add-category-pop-up.component.css']
})
export class AddCategoryPopUpComponent {

  submitted : boolean = false;

  category: Category = {
    name: ""
  };
  constructor(
    public dialogRef: MatDialogRef<AddCategoryPopUpComponent>,
    private categoryService: CategoriesService,
    private alertService:AlertServiceService
  ) {}

  newCategory(): void {
    this.category = {
      categoryID: null,
      name: ""
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCategory(): void {
    const data = {
      name: this.category.name
    };

    this.categoryService.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
        if (this.submitted) {
          this.alertService.openSnackBar("Category was submitted successfully!")
          this.newCategory()
          this.onNoClick()
        }
      },
      error: (e) => console.error(e)
    });
  }
}
