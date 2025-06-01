import { Component, OnInit, Signal } from '@angular/core';
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

  constructor(private fb: FormBuilder, 
              private tasksService: TasksService, 
              private projectsService: ProjectsService
            ){
                this.projectsList = this.projectsService.getProjects();
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
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
                    popup: 'colored-toast',
                  },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })

  onSubmit(){
    const {programadoPara, plazoEntrega} = this.taskForm.value;

      const newTask = {
        ...this.taskForm.value,
        programadoPara: this.formatDateOnly(programadoPara),
        plazoEntrega: this.formatDateOnly(plazoEntrega)
      }

      this.tasksService.createTask(newTask).subscribe(
        {
          next: (res) => this.sendOkMessage()
        }
      );
    
   
  }

  sendOkMessage(){
      this.Toast.fire({
        icon: 'success',
        title: 'Tarea creada exitosamente',
      })
  }

  formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }


}

