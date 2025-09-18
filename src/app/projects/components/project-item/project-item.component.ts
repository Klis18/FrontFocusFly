import { Component, input, OnInit, output } from '@angular/core';
import { Project, UpdateProject, CreateProject } from '../../interfaces/project.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'project-item',
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './project-item.component.html',
  styles: ``
})
export class ProjectItemComponent implements OnInit{

  changeInItem  = output<string>();
  projectItem   = input<Project>();
  projectData  !: CreateProject;
  dateToday     : Date = new Date(Date.now());


  constructor(private projectsService:ProjectsService) {}

  ngOnInit(): void {
    (this.projectItem()?.fechaFinProyecto == this.dateToday) ? this.updateProjectStatus() : '';
  }

  deleteProject(id:number){
    this.projectsService.deleteProject(id).subscribe();
  }

  getProjectById(){
    const id = this.projectItem()!.id;
    this.projectsService.getProjectById(id).subscribe(
      {
        next:(response) =>{
          this.projectData = response
        }
      }
    );
  }

  updateProjectStatus(){
    const updateProject: UpdateProject = {
      ...this.projectData,
      estadoId : 6,
      proyectoId: this.projectItem()!.id
    } 
    this.projectsService.updateProject(updateProject).subscribe();
  }
}
