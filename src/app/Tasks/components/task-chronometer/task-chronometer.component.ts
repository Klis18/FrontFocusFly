import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { CreateTask, Task, UpdateTask } from '../../interfaces/task.interface';
import { AlertsService } from '../../../shared/services/alerts.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'tasks-task-chronometer',
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './task-chronometer.component.html',
  styles: `
   
  `
})
export class TaskChronometerComponent implements OnInit{

  public data = inject(MAT_DIALOG_DATA);
  
  chronometer: string = '00:00:00';
  horas      : number = 0;
  minutos    : number = 0;
  segundos   : number = 0;
  idTask     : number = this.data.idTask;
  isPausedTask: boolean = false;
  taskName   : string = '';
  task!      : CreateTask;
  avanceCronometro:number = 0;

  tiempoTranscurrido: number = 0;
  intervalo: any;
  corriendo: boolean = false;
 //TODO: EL CRONOMETRO DEBE SUMAR AL TIEMPO REAL ACTUAL EN CASO QUE LA TAREA HAYA SIDO INICIADA ANTERIORMENTE Y CUENTE CON UN TIEMPO
  constructor(
              private alertService: AlertsService,
              private tasksServices: TasksService, 
              private dialogRef: MatDialogRef<TaskChronometerComponent>,
            ){}

  ngOnInit(): void {
    this.getTask();
    this.iniciar();
  }

  getTask(){
    this.tasksServices.getTask(this.idTask).subscribe((res)=> {
      this.task = res;
      this.taskName = this.task.descripcion;
      this.chronometer = this.task.tiempoReal;
      const numbers = this.task.tiempoReal.split(':');
      this.horas = Number(numbers[0]),
      this.minutos = Number(numbers[1]),
      this.segundos = Number(numbers[2]),
      this.obtenerTiempoGuardado();
    });
  }

  closeModal(){
    this.pausar();
    this.dialogRef.close();

  }

  iniciar() {
    if (!this.corriendo) {
      this.corriendo = true;
      this.intervalo = setInterval(() => {
        this.tiempoTranscurrido++;
        this.obtenerTiempoFormateado();
      }, 1000);
    }
  }

  pausar() {
    const updatedTime = {
      ...this.task,
      estadoId : 2,
      tiempoReal: this.chronometer,
      tareaId: this.idTask
    }
    this.corriendo = false;
    this.tasksServices.updateTask(updatedTime).subscribe();
    clearInterval(this.intervalo);
  }

  continuar(){
    this.getTask();
    this.iniciar();
  }

  reiniciar() {
    this.chronometer = '00:00:00';
    this.manageChronometer()
  }

  manageChronometer(){
    if(this.isPausedTask == false){
      console.log('La tarea está pausada');
      this.pausar()
      this.isPausedTask = true;

    }else{
      console.log('La tarea continúa');
      this.continuar()
      this.isPausedTask = false;
    }
  }

  obtenerTiempoFormateado(): string { 
    const horas = Math.floor(this.tiempoTranscurrido / 3600);
    const minutos = Math.floor((this.tiempoTranscurrido % 3600) / 60);
    const segundos = this.tiempoTranscurrido % 60;
    const formato = (valor: number) => valor.toString().padStart(2, '0');
    this.avanceCronometro = (segundos * 100) / 60;
    this.chronometer = `${formato(horas)}:${formato(minutos)}:${formato(segundos)}`;
    return this.chronometer;
  }

  obtenerTiempoGuardado():number{
    const hoursToSeconds = Math.floor(this.horas * 3600);
    const minutesToSeconds = Math.floor(this.minutos * 60);
    this.tiempoTranscurrido = hoursToSeconds + minutesToSeconds + this.segundos;
    return this.tiempoTranscurrido;
  }

}
