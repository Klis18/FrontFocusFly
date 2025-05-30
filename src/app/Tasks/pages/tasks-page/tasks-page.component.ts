import { Component, OnInit, Signal } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from "../../components/task-item/task-item.component";
import { CommonModule } from '@angular/common';
import { TaskChronometerComponent } from "../../components/task-chronometer/task-chronometer.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-page',
  imports: [
    CommonModule,
    MatIconModule,
    TaskItemComponent,
    TaskChronometerComponent
],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export default class TasksPageComponent{

  public taskList: Signal<Task[]>

  constructor(private tasksService: TasksService){
    this.taskList = this.tasksService.getTasks();
  }

}
