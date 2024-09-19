import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../models/order.model'
const baseUrl = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Order[]>{
    return this.http.get<Order[]>(`${baseUrl}/order/find/all`);
  }

  getById(id:number):Observable<Order>{
    return this.http.get<Order>(`${baseUrl}/order/find/${id}`);
  }

  create(order:Order):Observable<Order>{
    return this.http.post<Order>(`${baseUrl}/order/add`, order);
  }

  deleteById(id:number):Observable<any>{
    return this.http.delete<any>(`${baseUrl}/order/delete/${id}`);
  }


}
