import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateProject, ProjectFilters, ProjectResponse, UpdateProject } from '../interfaces/project.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  constructor() { }

  getProjects(filtros: ProjectFilters):Observable<ProjectResponse>{
    let params = new HttpParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if(value !== undefined && value !== null && value !== ''){
        if (value instanceof Date){
          const formattedDate = value.toISOString().split('T')[0];
          params = params.set(key, formattedDate);
        }else{
          params = params.set(key, value.toString());
        }
      }
    });
    return this.http.get<ProjectResponse>(`${this.apiUrl}/proyectos`,{params});
  }

  createProject(project: CreateProject):Observable<CreateProject>{
    return this.http.post<CreateProject>(`${this.apiUrl}/proyectos`, project);
  }

  updateProject(project: UpdateProject):Observable<UpdateProject>{
    return this.http.put<UpdateProject>(`${this.apiUrl}/proyectos`, project);
  }

  deleteProject(id: number){
    return this.http.delete(`${this.apiUrl}/proyectos/${id}`);
  }

}
