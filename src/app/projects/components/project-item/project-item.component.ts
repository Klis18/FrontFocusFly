import { Component, input, OnInit, output } from '@angular/core';
import { Project, UpdateProject, CreateProject } from '../../interfaces/project.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';

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


  constructor(private projectsService : ProjectsService, 
              private alertServices   : AlertsService,
              private dialog          : MatDialog) {}

  ngOnInit(): void {

  }

  sendMessageReloadPage(){
    this.changeInItem.emit('reloadPage');
  }

  deleteProject(id:number){
    this.projectsService.deleteProject(id).subscribe(
      {
        next: (response) =>{
          this.sendMessageReloadPage();
          this.alertServices.sendOkMessage('Proyecto eliminado con éxito');
        }
      }
    );
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

  openUpdateProjectModal(id : number){
    const dialogRef = this.dialog.open(ProjectFormComponent,{
      data:{
        action: 'edit',
        projectId : id
      },
      width:'50%'
    });

    dialogRef.afterClosed().subscribe((res)=> this.sendMessageReloadPage());
  }
}
