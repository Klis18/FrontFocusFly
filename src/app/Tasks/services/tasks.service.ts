import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateTask, Task } from '../interfaces/task.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

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

  getTask(id:number):Observable<CreateTask>{
    return this.http.get<CreateTask>(`${this.apiUrl}/tareas/${id}`);
  }

  getWeekTasks(){
    const listaTareasSemana = this.http.get<Task[]>(`${this.apiUrl}/tareas/tareasSemana`);
    return toSignal(listaTareasSemana, {initialValue:[]})
  }

  createTask(task: CreateTask):Observable<CreateTask>{
    console.log('Datos recibidos', task)
    return this.http.post<CreateTask>(`${this.apiUrl}/tareas`,task);
  }

  deleteTask(id:number):Observable<Task>{
    return this.http.delete<Task>(`${this.apiUrl}/tareas/${id}`);
  }
  
}
