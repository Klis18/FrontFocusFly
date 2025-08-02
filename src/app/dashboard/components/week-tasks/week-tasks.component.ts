import { Component, OnDestroy, OnInit, output, Signal, signal } from '@angular/core';
import { TasksService } from '../../../Tasks/services/tasks.service';
import { Task } from '../../../Tasks/interfaces/task.interface';
import { TaskItemComponent } from "../../../Tasks/components/task-item/task-item.component";
import { Subscription } from 'rxjs';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'dashboard-week-tasks',
  imports: [
    LowerCasePipe,
    TaskItemComponent
  ],
  templateUrl: './week-tasks.component.html',
  styles: ``
})
export class WeekTasksComponent implements OnInit, OnDestroy {

  sendTotalHours = output<number>();

  public weekTasksList: Task[] = [];
  public pendingTasksCount: number = 0;
  public inProgressTasksCount: number = 0;
  public finishedTasksCount: number = 0;
  public activeStatus : string = '';

  public realTime : string[] = [];
  public secondsWorks : number = 0;
  public minutesWorks : number = 0;
  public hourWorks : number = 0;
  public totalHoursWeekWorks : number = 0;

  private filterSubscription!: Subscription;
  private countSubscription!: Subscription;

  constructor(private tasksService: TasksService) {
  }


  ngOnInit(): void {
    this.filterList('Pendiente');
    this.getTasksCount('Pendiente');
    this.getTasksCount('En Proceso');
    this.getTasksCount('Finalizado');
    this.getFinishedHourWeekWorks();
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
    this.countSubscription.unsubscribe();
  }

  filterList(state: string) {
    this.filterSubscription = this.tasksService.getWeekTasks(state).subscribe(
      res => {
        this.weekTasksList = res,
        this.activeStatus = state
      }
    );
  }

  reloadPage(reload: string) {
    if (reload) {
      this.filterList('Pendiente');
      this.getTasksCount('Pendiente');
      this.getTasksCount('En Proceso');
      this.getTasksCount('Finalizado');
    }
  }

  getTasksCount(state: string) {
    this.countSubscription = this.tasksService.getWeekTasks(state).subscribe(
      res => {
        switch (state) {
          case 'Pendiente':
            this.pendingTasksCount = res.length;
            console.log('Pendientes', this.pendingTasksCount);
            break;
          case 'En Proceso':
            this.inProgressTasksCount = res.length;
            console.log('En proceso', this.inProgressTasksCount);
            break;
          case 'Finalizado':
            this.finishedTasksCount = res.length;
            console.log('Finalizados', this.finishedTasksCount);
            break;
          default:
            return;
        }
      }
    );
  }

  getFinishedHourWeekWorks(){
    let horas : number = 0;
    let minutos : number = 0;
    let segundos : number = 0;
    this.tasksService.getWeekTasks('Finalizado').subscribe(
      (res) => {
        res.forEach(res => {
          this.realTime = res.tiempoReal.split(':');
          horas = Number(this.realTime[0]);
          minutos = Number(this.realTime[1]);
          segundos = Number(this.realTime[2]);
          this.secondsWorks = this.secondsWorks + segundos;
          this.minutesWorks = this.minutesWorks + minutos;
          this.hourWorks = this.hourWorks + horas;
        });

        const totalMinutes = this.minutesWorks + (this.secondsWorks/60);
        this.totalHoursWeekWorks = Number((this.hourWorks + (totalMinutes/60)).toPrecision(3));
        this.sendTotalHours.emit(this.totalHoursWeekWorks);
      }
    );
  }

}
