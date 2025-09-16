import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateTask, Task, TaskFilters, TaskResponse, UpdateTask } from '../interfaces/task.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  http   = inject(HttpClient);
  apiUrl = environment.apiUrl;


  constructor() { }


  getTasks(filtros: TaskFilters): Observable<TaskResponse> {
    let params = new HttpParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (value instanceof Date) {
          const formattedDate = value.toISOString().split('T')[0];
          params = params.set(key, formattedDate);
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    return this.http.get<TaskResponse>(`${this.apiUrl}/tareas`, { params });
  }

  getTask(id:number):Observable<CreateTask>{
    return this.http.get<CreateTask>(`${this.apiUrl}/tareas/${id}`);
  }

  getWeekTasks(state: string){
    return this.http.get<Task[]>(`${this.apiUrl}/tareas/tareasSemana?estado=${state}`);
  }

  createTask(task: CreateTask):Observable<CreateTask>{
    console.log('Datos recibidos', task)
    return this.http.post<CreateTask>(`${this.apiUrl}/tareas`,task);
  }

  updateTask(task: UpdateTask):Observable<UpdateTask>{
      return this.http.put<UpdateTask>(`${this.apiUrl}/tareas`,task);
  }

  deleteTask(id:number):Observable<Task>{
    return this.http.delete<Task>(`${this.apiUrl}/tareas/${id}`);
  }
  
}
