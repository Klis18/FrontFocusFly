import { Component, Signal } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from "../../components/task-item/task-item.component";
import { CommonModule } from '@angular/common';
import { TaskChronometerComponent } from "../../components/task-chronometer/task-chronometer.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewTaskFormComponent } from '../../components/new-task-form/new-task-form.component';

@Component({
  selector: 'app-tasks-page',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,

    TaskItemComponent,
    TaskChronometerComponent
],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export default class TasksPageComponent{

  public taskList: Signal<Task[]>

  constructor(private tasksService: TasksService, private dialog:MatDialog){
    this.taskList = this.tasksService.getTasks();
  }

  openDialog(){
    const dialogRef = this.dialog.open(NewTaskFormComponent,
      {
        width: '90%',    
        maxWidth: '700px', 
        maxHeight: '800px'
      }
    );

    dialogRef.afterClosed().subscribe(res =>{
      console.log('Modal cerrado', res);
    })
  }

}
