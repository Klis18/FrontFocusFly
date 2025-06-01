import { Component, input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'tasks-task-item',
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule
  ],
  templateUrl: './task-item.component.html',
  styles: ``
})
export class TaskItemComponent {

  taskItem = input<Task>();
  state:string =  '';

  constructor(private tasksServices: TasksService){}

  deleteTask(id:number){
    this.tasksServices.deleteTask(id).subscribe();
  }

}
