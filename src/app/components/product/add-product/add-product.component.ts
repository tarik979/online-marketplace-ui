import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  product: Products = {
    name : '',
    shortDescription : '', 
    longDescription : '',
    price : -1 ,
    quntity : -1,
    categoryId : -1,
    sallerId : -1,
    imagename : '',
    imageurl :'',
    imageSize :  -1,
    imagetype : ''
  }

  constructor(private productService: ProductService, private categoryService: CategoriesService){}

  ngOnInit(): void {
  }

  saveProduct() :void{
    const data = {
      name : this.product.name,
      shortDescription : this.product.shortDescription, 
      longDescription : this.product.longDescription,
      price : this.product.price,
      quntity : this.product.quntity,
      categoryId : this.product.categoryId,
      sallerId : this.product.sallerId,
      imagename : this.product.imagename,
      imageurl : this.product.imageurl,
      imageSize :  this.product.imageSize,
      imagetype : ''
    }
  }

}
