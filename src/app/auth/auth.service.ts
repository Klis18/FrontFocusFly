import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from './interfaces/loginResponse.interface';
import { AccessCredentials } from './interfaces/accessCredentials.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisterUser } from './interfaces/registerUser.interface';
import { AlertsService } from '../shared/services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = environment.apiUrl;
  private alertService = inject(AlertsService);


  constructor(private http: HttpClient) { }

  login(accessCredentials:AccessCredentials):Observable<boolean>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/usuarios/login`,
    accessCredentials
    ).pipe(
            map((res)=> this.saveToken(res.token)),
            catchError((err)=> this.handleError(err))
          );
  }


  logout(){
    localStorage.removeItem('token');
  }

  saveToken(token:string){
    localStorage.setItem('token',token);
    return true;
  }

  handleError(error:HttpErrorResponse){
    this.alertService.sendErrorMessage(error.error.title);
    return of(false);
  }

  registerUser(registerUser: RegisterUser):Observable<boolean>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/usuarios/registro`,
      registerUser
    ).pipe(
      map((res) => {
        this.alertService.sendOkMessage('Usuario registrado exitosamente');
        return true
      }),
      catchError((error) => this.handleError(error))
    )
  }
}
