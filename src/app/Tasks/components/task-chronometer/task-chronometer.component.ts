import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { CreateTask, Task } from '../../interfaces/task.interface';
import { AlertsService } from '../../../shared/services/alerts.service';


@Component({
  selector: 'tasks-task-chronometer',
  imports: [
    MatIconModule
  ],
  templateUrl: './task-chronometer.component.html',
  styles: `
   
  `
})
export class TaskChronometerComponent implements OnInit, OnDestroy{

  public data = inject(MAT_DIALOG_DATA);
  
  chronometer: string = '00:00:00';
  idTask     : number = this.data.idTask;
  taskName   : string = '';
  task!      : CreateTask;

  tiempo: number = 0;
  intervalo: any;
  corriendo: boolean = false;

  constructor(
              private alertService: AlertsService,
              private tasksServices: TasksService, 
              private dialogRef: MatDialogRef<TaskChronometerComponent>,
            ){}

  ngOnInit(): void {
    this.getTask();
  }

  getTask(){
    this.tasksServices.getTask(this.idTask).subscribe((res)=> {
      this.task = res;
      this.taskName = this.task.descripcion;
      this.chronometer = this.task.tiempoReal
    });
  }

  updateTime(){
    const updatedTime = {
      ...this.task,
      tiempoReal: this.chronometer
    }
    this.tasksServices.updateTask(this.idTask,updatedTime).subscribe(
      {
        next: (res) => {
          this.alertService.sendOkMessage('Tiempo Real ha sido guardado exitosamente');
          this.closeModal();
        }
      }
    );
  }

  closeModal(){
    this.dialogRef.close();
  }


  iniciarCronometro() {
    if (!this.corriendo) {
      this.corriendo = true;
      this.intervalo = setInterval(() => {
        this.tiempo++;
      }, 1000);
    }
  }

  detenerCronometro() {
    if (this.corriendo) {
      clearInterval(this.intervalo);
      this.corriendo = false;
    }
  }

  reiniciarCronometro() {
    this.detenerCronometro();
    this.tiempo = 0;
  }

  //TODO: CULMINAR CRONÓMETRO
  formatoTiempo(): string {
    const horas = Math.floor(this.tiempo / 3600);
    const minutos = Math.floor((this.tiempo % 3600) / 60);
    const segundos = this.tiempo % 60;
    this.chronometer = `${this.formatear(horas)}:${this.formatear(minutos)}:${this.formatear(segundos)}`;
    return this.chronometer;
  }

  private formatear(valor: number): string {
    return valor < 10 ? '0' + valor : valor.toString();
  }

  ngOnDestroy(): void {
    this.detenerCronometro();
  }

}
