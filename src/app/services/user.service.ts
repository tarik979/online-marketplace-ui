import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from '../models/user.mode'


const baseUrl = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${baseUrl}/users/find/all`);
  }

  getById(id:number):Observable<User>{
    return this.http.get<User>(`${baseUrl}/users/find/${id}`);
  }

  deleteById(id:number):Observable<any>{
    return this.http.delete<any>(`${baseUrl}/users/delete/${id}`);
  }

  update(user:User):Observable<any>{
    return this.http.put<any>(`${baseUrl}/users/update`, user);
  }
}
