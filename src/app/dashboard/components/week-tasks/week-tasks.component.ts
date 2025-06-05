import { Component, Signal } from '@angular/core';
import { TasksService } from '../../../Tasks/services/tasks.service';
import { Task } from '../../../Tasks/interfaces/task.interface';
import { TaskItemComponent } from "../../../Tasks/components/task-item/task-item.component";

@Component({
  selector: 'dashboard-week-tasks',
  imports: [TaskItemComponent],
  templateUrl: './week-tasks.component.html',
  styles: ``
})
export class WeekTasksComponent {

  public weekTasksList: Signal<Task[]>;

  constructor(private tasksService: TasksService) { 
    this.weekTasksList = this.tasksService.getWeekTasks();
  }

}
