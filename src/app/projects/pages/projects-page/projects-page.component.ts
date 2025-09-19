import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectItemComponent } from "../../components/project-item/project-item.component";
import { ProjectsService } from '../../services/projects.service';
import { ProjectFilters, ProjectResponse } from '../../interfaces/project.interface';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { FilterProjectsComponent } from "../../components/filter-projects/filter-projects.component";
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';

@Component({
  selector: 'app-projects-page',
  imports: [
    MatIconModule,
    ProjectItemComponent,
    PaginatorComponent,
    FilterProjectsComponent
],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export default class ProjectsPageComponent implements OnInit{

  projectsFilters : ProjectFilters = {
    nombreProyecto: '',
    estado: '',
    fechaInicioProyecto: undefined,
    fechaFinProyecto: undefined,
    page: 1,
    pageSize: 5
  };

  projectResponse : ProjectResponse = {
    total: 0,
    paginaActual: 0,
    totalPaginas: 0,
    proyectos: []
  };
 
  constructor(private projectsService: ProjectsService, private dialog: MatDialog) {}

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

  applyProjectsFilters(filters: any){
    const {nombreProyecto, estado, fechaInicioProyecto, fechaFinProyecto } = filters
    this.projectsFilters.nombreProyecto = nombreProyecto;
    this.projectsFilters.estado = estado;
    this.projectsFilters.fechaInicioProyecto = fechaInicioProyecto;
    this.projectsFilters.fechaFinProyecto = fechaFinProyecto;
    this.obtenerProyectos();
  }

  changePage(paginaActual:number){
    this.projectsFilters.page = paginaActual;
    this.obtenerProyectos();
  }

  reloadPage(reload : string){
    if(reload){
      this.obtenerProyectos();
    }
  }

  openNewProjectModal(){
    const dialogRef = this.dialog.open(ProjectFormComponent,{
      data:{
        action:'add'
      },
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(
      (res) => this.obtenerProyectos()
    );
  }

}
