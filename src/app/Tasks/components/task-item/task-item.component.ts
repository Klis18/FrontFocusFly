import { Component, input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../services/tasks.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewTaskFormComponent } from '../new-task-form/new-task-form.component';
import { TaskChronometerComponent } from '../task-chronometer/task-chronometer.component';

@Component({
  selector: 'tasks-task-item',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,

    MatIconModule
  ],
  templateUrl: './task-item.component.html',
  styles: ``
})
export class TaskItemComponent {

  taskItem = input<Task>();
  state:string =  '';

  constructor(private dialog:MatDialog, private tasksServices: TasksService){}

  openModalChronometer(id:number){
    this.dialog.open(TaskChronometerComponent,
      {
        data:{
          idTask: id
        },
        width: '90%',
        maxWidth: '700px', 
        maxHeight: '95%'
      }
    )
  }

  openModalConfiguration(id:number){
    this.dialog.open(NewTaskFormComponent,
      {
        data:{
          idTask: id,
          title: 'Configuración de Tarea'
        },
        width: '90%',
        maxWidth: '700px', 
        maxHeight: '95%'
      }
    );
  }


  deleteTask(id: number){
    this.tasksServices.deleteTask(id).subscribe();
  }

}
