import { Component, inject, OnInit, Signal } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TasksService } from '../../services/tasks.service';
import { Project, ProjectFilters } from '../../../projects/interfaces/project.interface';
import { ProjectsService } from '../../../projects/services/projects.service';

import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { AlertsService } from '../../../shared/services/alerts.service';
import { CreateTask, Task} from '../../interfaces/task.interface';
import { formatDateOnly, formatDateUTC } from '../../../utils/format-date';
import { ProjectFormComponent } from '../../../projects/components/project-form/project-form.component';


@Component({
  selector: 'app-new-task-form',
  imports: [
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogContent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-task-form.component.html',
  styles: ``
})
export class NewTaskFormComponent implements OnInit{

  public taskForm       !: FormGroup;
  public projectsList   !: Project[];
  private projectsFilter : ProjectFilters ={
    nombreProyecto: '',
    estado: '',
    fechaInicioProyecto: undefined,
    fechaFinProyecto: undefined,
    page: 1,
    pageSize: 5
  };
  public dateToday       : Date = new Date(Date.now());
  public isShowRealTime !: boolean;
  public task           !: Task;
  public data = inject(MAT_DIALOG_DATA);
  public title           : string = (this.data.action == 'add') ? 'Agregar Tarea' : 'Editar Tarea';

  constructor(private fb              : FormBuilder, 
              private tasksServices   : TasksService, 
              private projectsServices: ProjectsService,
              private dialog          : MatDialog,
              private dialogRef       : MatDialogRef<NewTaskFormComponent>,
              private alertService    : AlertsService
            )
  {
    this.taskForm = this.fb.group({
      descripcion    : [''],
      proyectoId     : [1],
      estadoId       : [1],
      tiempoEstimado : ['00:00:00'],
      tiempoReal     : ['00:00:00'],
      programadoPara : [this.dateToday],
      plazoEntrega   : [this.dateToday]
    });
  }

  ngOnInit(): void {
    this.getProjectsList();
    this.isShowRealTime = (this.data.action == 'add') ? false : true;
    (this.data.action != 'add') ? this.getTask() : '';
  }

  getProjectsList(){
    this.projectsServices.getProjects(this.projectsFilter).subscribe(
    {
      next: (response) =>{
        this.projectsList = response.proyectos;
      }
    });
  }

  
  getTask(){
    this.tasksServices.getTask(this.data.idTask).subscribe(
      (res) =>{
        const {programadoPara, plazoEntrega} = res;
        const taskData = {
          ...res,
          programadoPara: formatDateUTC(programadoPara),
          plazoEntrega : formatDateUTC(plazoEntrega)
        }
        this.taskForm.setValue(taskData);
      }
    );
  }
  
  closeModal(){
    this.dialogRef.close();
  }

  addTask(newTask: CreateTask){
    this.tasksServices.createTask(newTask).subscribe(
      {
        next: (res) => {
          this.alertService.sendOkMessage('Tarea creada con éxito');
          this.closeModal();
        }
      }
    );
  }
  
  updateTask(updatedTask: CreateTask){
    const updatedData = {
      ...updatedTask,
      tareaId:this.data.idTask
    }
    this.tasksServices.updateTask(updatedData).subscribe(
      {
        next: (res) => {
          this.alertService.sendOkMessage('Tarea actualizada con éxito');
          this.closeModal();
        }
      }
    );
  }
  
  onSubmit(){
    const {programadoPara, plazoEntrega} = this.taskForm.value;
    const newTask = {
      ...this.taskForm.value,
      programadoPara : formatDateOnly(programadoPara),
      plazoEntrega   : formatDateOnly(plazoEntrega)
    };
    (this.data.action == 'add') ? this.addTask(newTask) : this.updateTask(newTask);
  }
  
  openProjectModal(){
    const projectDialogRef = this.dialog.open(ProjectFormComponent, {
      data:{
        action: 'add'
      }
    });

    projectDialogRef.afterClosed().subscribe(() => this.getProjectsList());
  }

}

