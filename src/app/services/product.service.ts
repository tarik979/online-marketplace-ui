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

  create(productData: FormData): Observable<any> {
    return this.http.post( baseUrl + '/products/add', productData, {
      headers: {

      }
    });
  }

  update(productData: FormData | Products):Observable<any> {
    return this.http.put<any>(`${baseUrl}/products/update`, productData);
  }

  deleteById(id: number):Observable<any> {
    return this.http.delete<any>(`${baseUrl}/products/delete/${id}`);
  }

  marksold(id: number):Observable<any>{
    return this.http.get<any>(`${baseUrl}/products/sold/${id}`);
  }

  unmarksold(id: number):Observable<any>{
    return this.http.get<any>(`${baseUrl}/products/unsold/${id}`);
  }
  Setdeleted(id: number):Observable<any>{
    return this.http.get<any>(`${baseUrl}/products/deleted/${id}`);
  }
}
