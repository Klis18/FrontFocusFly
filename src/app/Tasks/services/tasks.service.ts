import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  constructor() { }

  getTasks(){
    const listaTareas = this.http.get<Task[]>(`${this.apiUrl}/tareas`);
    return toSignal(listaTareas, {initialValue:[]})
  }
}
