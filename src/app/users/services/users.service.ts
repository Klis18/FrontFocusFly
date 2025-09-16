import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserData():Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/usuarios/obtenerDataUsuario`);
  }

}
