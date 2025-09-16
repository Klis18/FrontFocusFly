import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectItemComponent } from "../../components/project-item/project-item.component";
import { ProjectsService } from '../../services/projects.service';
import { Project, ProjectFilters, ProjectResponse } from '../../interfaces/project.interface';

@Component({
  selector: 'app-projects-page',
  imports: [
    MatIconModule,
    ProjectItemComponent
],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export default class ProjectsPageComponent implements OnInit{

  projectsFilters : ProjectFilters = {};
  projectResponse : ProjectResponse = {
    total: 0,
    paginaActual: 0,
    totalPaginas: 0,
    proyectos: []
  };
 
  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  obtenerProyectos(){
    this.projectsService.getProjects(this.projectsFilters).subscribe({
      next:(response)=>{
        this.projectResponse.proyectos = response.proyectos;
        this.projectResponse.total = response.total;
        this.projectResponse.paginaActual = response.paginaActual;
        this.projectResponse.totalPaginas = response.totalPaginas;
      }
    })
  }
}
