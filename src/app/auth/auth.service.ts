import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './interfaces/loginResponse.interface';
import { AccessCredentials } from './interfaces/accessCredentials.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  login(accessCredentials:AccessCredentials):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/usuarios/login`,accessCredentials);
  }


  logout(){
    localStorage.removeItem('token');
  }
}
