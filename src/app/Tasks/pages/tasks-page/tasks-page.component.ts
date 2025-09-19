import { Component, OnInit } from '@angular/core';
import { Task, TaskFilters } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from "../../components/task-item/task-item.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewTaskFormComponent } from '../../components/new-task-form/new-task-form.component';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { FiltersSearchComponent } from "../../../shared/components/filters-search/filters-search.component";
import { AlertsService } from '../../../shared/services/alerts.service';

@Component({
  selector: 'app-tasks-page',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    TaskItemComponent,
    PaginatorComponent,
    FiltersSearchComponent
],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export default class TasksPageComponent implements OnInit{

  public taskList           !: Task[];
  public isChronometerActive : boolean = false;
  public filters             : TaskFilters = {
    descripcion: '',
    nombreProyecto: '',
    estado: '',
    programadoPara: undefined,
    plazoEntrega: undefined,
    page: 1,
    pageSize: 5
  };

    totalTareas   : number = 0;
    paginaActual  : number = 0;
    totalPaginas  : number = 0;


  constructor(private tasksService: TasksService,
              private alertService: AlertsService, 
              private dialog:MatDialog){}

  ngOnInit() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tasksService.getTasks(this.filters).subscribe({
      next: (respuesta) => {
        this.taskList     = respuesta.tareas;
        this.totalTareas  = respuesta.total;
        this.paginaActual = respuesta.paginaActual;
        this.totalPaginas = respuesta.totalPaginas;
      },
      error: (error) => {
        this.alertService.sendErrorMessage(`Error al cargar tareas ${error}`);
      }
    });
  }

  applyFilters( form : any){
    const {descripcion, proyecto, estado, programadoPara, plazoEntrega} = form;
    this.filters.descripcion    = descripcion;
    this.filters.nombreProyecto = proyecto;
    this.filters.estado         = estado;
    this.filters.programadoPara = programadoPara;
    this.filters.plazoEntrega   = plazoEntrega;
    this.obtenerTareas();
  }

  changePage(paginaActual:number){
    this.filters.page = paginaActual;
    this.obtenerTareas();
  }

  reloadPage(reload : string){
    if(reload){
      this.obtenerTareas();
    }
  }

  openDialog(){
    const modal = this.dialog.open(NewTaskFormComponent,
      {
        data:{
          action: 'add'
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
