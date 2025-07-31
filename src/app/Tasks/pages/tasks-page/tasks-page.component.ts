import { Component, OnInit, Signal } from '@angular/core';
import { Task, TaskFilters } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from "../../components/task-item/task-item.component";
import { CommonModule } from '@angular/common';
import { TaskChronometerComponent } from "../../components/task-chronometer/task-chronometer.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewTaskFormComponent } from '../../components/new-task-form/new-task-form.component';
import { filter } from 'rxjs';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { FiltersSearchComponent } from "../../../shared/components/filters-search/filters-search.component";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks-page',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    TaskItemComponent,
    TaskChronometerComponent,
    PaginatorComponent,
    FiltersSearchComponent
],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export default class TasksPageComponent implements OnInit{

  public taskList!: Task[];
  public isChronometerActive: boolean = false;
  public filters: TaskFilters = {
    descripcion: '',
    nombreProyecto: '',
    estado: '',
    programadoPara: undefined,
    plazoEntrega: undefined,
    page: 1,
    pageSize: 5
  };

    totalTareas: number = 0;
    paginaActual: number = 0;
    totalPaginas: number = 0;


  constructor(private tasksService: TasksService, private dialog:MatDialog){}

  ngOnInit() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tasksService.obtenerTareasFiltradas(this.filters).subscribe({
      next: (respuesta) => {
        this.taskList = respuesta.tareas;
        this.totalTareas = respuesta.total;
        this.paginaActual = respuesta.paginaActual;
        this.totalPaginas = respuesta.totalPaginas;
        console.log('Tareas:', this.taskList);
      },
      error: (error) => {
        console.error('Error al obtener tareas:', error);
      }
    });
  }

  applyFilters( form : any){
    const {descripcion, estado, programadoPara, plazoEntrega} = form;
    console.log('DATOS OBTENIDOS', {...form});
    this.filters.descripcion = descripcion;
    // this.filters.nombreProyecto = descripcion;
    this.filters.estado = estado;
    this.filters.programadoPara = programadoPara;
    this.filters.plazoEntrega = plazoEntrega;
    this.obtenerTareas();
  }

  changePage(paginaActual:number){
    this.filters.page = paginaActual;
    this.obtenerTareas();
  }

  openDialog(){
    const modal = this.dialog.open(NewTaskFormComponent,
      {
        data:{
          title: 'Nueva Tarea',
        },
        width: '90%',    
        maxWidth: '700px', 
        maxHeight: '800px'
      }
    );
    modal.afterClosed().subscribe(
      (res) =>{
        this.obtenerTareas();
      }
    );
  }

}
