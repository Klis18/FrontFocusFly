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
export class TaskChronometerComponent implements OnInit{

  public data = inject(MAT_DIALOG_DATA);
  
  chronometer: string = '00:00:00';
  idTask     : number = this.data.idTask;
  taskName   : string = '';
  task!      : CreateTask;

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
      this.chronometer = this.task.tiempoReal
    });
  }

  updateTime(){
    const updatedTime = {
      ...this.task,
      tiempoReal: this.chronometer,
      tareaId: this.data.id
    }
    this.tasksServices.updateTask(updatedTime).subscribe(
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
      tiempoReal: this.chronometer,
      tareaId: this.idTask
    }
    this.corriendo = false;
    this.tasksServices.updateTask(updatedTime).subscribe();
    clearInterval(this.intervalo);
  }

  reiniciar() {
    this.chronometer = '00:00:00';
    this.pausar();
  }

  obtenerTiempoFormateado(): string {
    const horas = Math.floor(this.tiempoTranscurrido / 3600);
    const minutos = Math.floor((this.tiempoTranscurrido % 3600) / 60);
    const segundos = this.tiempoTranscurrido % 60;

    const formato = (valor: number) => valor.toString().padStart(2, '0');
    this.chronometer = `${formato(horas)}:${formato(minutos)}:${formato(segundos)}`;
    return this.chronometer;
  }

}
