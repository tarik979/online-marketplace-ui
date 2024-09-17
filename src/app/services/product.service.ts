import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import	{Products} from '../models/products.model'


const baseUrl = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Products[]>{
    return this.http.get<Products[]>(baseUrl + "/products/find/all");
  }

  getById(id: number):Observable<Products> {
    return this.http.get<Products> (`${baseUrl}/products/find/${id}`);
  }

  create(product: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('image', image);

    return this.http.post<any>(`${baseUrl}/products/add`, formData);
  }

  update(data:any):Observable<any> {
    return this.http.put<any>(`${baseUrl}/products/update`, data);
  }

  deleteById(id: number):Observable<any> {
    return this.http.delete<any>(`${baseUrl}/products/delete/${id}`);
  }
}
