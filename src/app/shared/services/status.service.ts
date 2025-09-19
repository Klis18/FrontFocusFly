import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { buildHttpParams } from '../../utils/http-param';
import { Observable } from 'rxjs';
import { Status } from '../interfaces/status.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getStatusBySection(section:string):Observable<Status[]>{
    return this.http.get<Status[]>(`${this.baseUrl}/estados?seccion=${section}`);
  }
}
