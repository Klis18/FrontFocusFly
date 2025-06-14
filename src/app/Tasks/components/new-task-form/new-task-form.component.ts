import { Component, inject, OnInit, Signal } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TasksService } from '../../services/tasks.service';
import { Project } from '../../../projects/interfaces/project.interface';
import { ProjectsService } from '../../../projects/services/projects.service';

import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
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
    ReactiveFormsModule,
    MatDialogContent
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
  public isShowRealTime!: boolean;
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
      tiempoReal: ['00:00:00'],
      programadoPara: [this.dateToday],
      plazoEntrega: [this.dateToday]
    });
    this.title = this.data.title;

    this.isShowRealTime = (this.title == 'Configuración de Tarea') ? true : false;

    if(this.title == 'Configuración de Tarea'){
      this.getTask();
    }
    

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

  getTask(){
    this.tasksServices.getTask(this.data.idTask).subscribe(
      (res) =>{
        const {descripcion, proyectoId, estadoId, tiempoEstimado, tiempoReal, programadoPara, plazoEntrega} = res
        this.taskForm.get('descripcion')?.setValue(descripcion);
        this.taskForm.get('proyectoId')?.setValue(proyectoId);
        this.taskForm.get('estadoId')?.setValue(estadoId);
        this.taskForm.get('tiempoEstimado')?.setValue(tiempoEstimado);
        this.taskForm.get('tiempoReal')?.setValue(tiempoReal);
        this.taskForm.get('programadoPara')?.setValue(this.formatDateUTC(programadoPara));
        this.taskForm.get('plazoEntrega')?.setValue(this.formatDateUTC(plazoEntrega));
      }
    );
  }

  closeModal(){
    this.dialogRef.close();
  }

  formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatDateUTC(date: Date): Date{
    const fechaStr = date.toString();
        const [year, month, day] = fechaStr.split("-").map(Number);
        const fechaUTC = new Date(Date.UTC(year, month - 1 , day + 1));
        return fechaUTC;
  }

}

