import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateEvent, EditEvent, EventFilters, EventResponse } from '../interfaces/event.interface';
import { buildHttpParams } from '../../utils/http-param';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getEvents(filters: EventFilters):Observable<EventResponse>{
    let params = buildHttpParams(filters);
    return this.http.get<EventResponse>(`${this.baseUrl}/eventos`,{params});
  }

  createEvents(event: CreateEvent):Observable<CreateEvent>{
    return this.http.post<CreateEvent>(`${this.baseUrl}/eventos`, event);
  }

  updateEvent(event: EditEvent): Observable<EditEvent>{
    return this.http.put<EditEvent>(`${this.baseUrl}/eventos`,event);
  }

  deleteEvent(id: number){
    return this.http.delete(`${this.baseUrl}/eventos/${id}`);
  }
}
