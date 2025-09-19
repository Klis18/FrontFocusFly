import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateProject, ProjectFilters, ProjectResponse, UpdateProject } from '../interfaces/project.interface';
import { Observable } from 'rxjs';
import { buildHttpParams } from '../../utils/http-param';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  constructor() { }

  getProjects(filters: ProjectFilters):Observable<ProjectResponse>{
     let params = buildHttpParams(filters);
    return this.http.get<ProjectResponse>(`${this.apiUrl}/proyectos`,{params});
  }

  getProjectById(id: number):Observable<CreateProject>{
    return this.http.get<CreateProject>(`${this.apiUrl}/proyectos/${id}`);
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
