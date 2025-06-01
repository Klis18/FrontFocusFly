import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Project } from '../interfaces/project.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  constructor() { }

  getProjects(){
    const listaProyectos = this.http.get<Project[]>(`${this.apiUrl}/proyectos`);
    return toSignal(listaProyectos, {initialValue:[]});
  }

}
