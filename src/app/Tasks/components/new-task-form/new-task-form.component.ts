import { Component, Inject, inject, OnInit, Signal } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import Swal from 'sweetalert2'

import { TasksService } from '../../services/tasks.service';
import { Project } from '../../../projects/interfaces/project.interface';
import { ProjectsService } from '../../../projects/services/projects.service';

import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AlertsService } from '../../../shared/services/alerts.service';
import { Task } from '../../interfaces/task.interface';



@Component({
  selector: 'app-new-task-form',
  imports: [
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-task-form.component.html',
  styles: ``
})
export class NewTaskFormComponent implements OnInit{

  public taskForm !: FormGroup;
  public projectsList: Signal<Project[]>;
  public dateToday: Date = new Date(Date.now());

  public data = inject(MAT_DIALOG_DATA);

  public title!: string;
  public isShowDelete!: boolean;
  public task!: Task;

  constructor(private fb: FormBuilder, 
              private tasksServices: TasksService, 
              private projectsServices: ProjectsService,
              private dialogRef: MatDialogRef<NewTaskFormComponent>,
              private alertService: AlertsService
            ){
                this.projectsList = this.projectsServices.getProjects();
              }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      descripcion: [''],
      proyectoId: [1],
      estadoId: [1],
      tiempoEstimado: ['00:00:00'],
      programadoPara: [this.dateToday],
      plazoEntrega: [this.dateToday]
    });
    this.title = this.data.title;
    this.isShowDelete = (this.title == 'Configuración de Tarea')? true : false;

    this.tasksServices.getTask(this.data.idTask).subscribe(
      (res) =>{
        this.data = res
        console.log('datos recibidos',this.data);
        // this.taskForm.setValue(this.task);
      }
    );

  }

  onSubmit(){
    const {programadoPara, plazoEntrega} = this.taskForm.value;
    const newTask = {
      ...this.taskForm.value,
      programadoPara: this.formatDateOnly(programadoPara),
      plazoEntrega: this.formatDateOnly(plazoEntrega)
    }
    this.tasksServices.createTask(newTask).subscribe(
      {
        next: (res) => {
          this.alertService.sendOkMessage();
          this.closeModal();
        }
      }
    );
  }

  deleteTask(){
    const id = this.data.idTask;
    this.tasksServices.deleteTask(id).subscribe();
    this.closeModal();
  }

  closeModal(){
    this.dialogRef.close();
  }

  formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }


}

