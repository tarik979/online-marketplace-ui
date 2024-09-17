  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { Category } from '../models/category.model'

  const baseUrl = "http://localhost:8080";

  @Injectable({
    providedIn: 'root'
  })
  export class CategoriesService {

    constructor(private http:HttpClient) {}

    getAll():Observable<Category[]>{
      return this.http.get<Category[]>(`${baseUrl}/category/all`);
    }

    getById(id :number): Observable<Category>{
      return this.http.get<Category>(`${baseUrl}/category/find/${id}`);
    }

    create(data:any):Observable<any>{
      return this.http.post<any>(`${baseUrl}/category/add`, data);
    }

    update(data:any):Observable<any>{
      return this.http.put<any>(`${baseUrl}/category/update`, data);
    }

    deleteById(id: number):Observable<any> {
      return this.http.delete<any>(`${baseUrl}/category/delete/${id}`);
    }

    getByName(name: String): Observable<any>{
      return this.http.get<any>(`${baseUrl}/find?name=${name}`);
    }
  }
