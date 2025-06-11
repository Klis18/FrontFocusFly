import { Component, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { TasksService } from '../../../Tasks/services/tasks.service';
import { Task } from '../../../Tasks/interfaces/task.interface';
import { TaskItemComponent } from "../../../Tasks/components/task-item/task-item.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-week-tasks',
  imports: [TaskItemComponent],
  templateUrl: './week-tasks.component.html',
  styles: ``
})
export class WeekTasksComponent implements OnInit, OnDestroy{

  public weekTasksList: Task[] = [];
  public pendingTasksCount: number = 0;
  public inProgressTasksCount: number = 0;
  public finishedTasksCount: number = 0;
  public count: number = 0;

  private filterSubscription!: Subscription;
  private countSubscription!: Subscription;

  constructor(private tasksService: TasksService) { 
  }
  
  
  ngOnInit(): void {
    this.filterList('Pendiente');
    this.getTasksCount('Pendiente');
    this.getTasksCount('En Proceso');
    this.getTasksCount('Finalizado');
  }
  
  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
    this.countSubscription.unsubscribe();
  }

  filterList(state: string){
    this.filterSubscription = this.tasksService.getWeekTasks(state).subscribe(
      res => {
        this.weekTasksList = res,
        this.count = this.weekTasksList.length,
        console.log('Cantidad', this.count);
      }
    );
  }

  getTasksCount(state: string){
    this.countSubscription = this.tasksService.getWeekTasks(state).subscribe(
      res => {
        switch(state){
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

}
