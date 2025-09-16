import { Component, input, output } from '@angular/core';
import { Project } from '../../interfaces/project.interface';
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
export class ProjectItemComponent {

  changeInItem  = output<string>();
  projectItem = input<Project>();


  constructor(private projectsService:ProjectsService) {}

  deleteProject(id:number){
    this.projectsService.deleteProject(id).subscribe();
  }
}
