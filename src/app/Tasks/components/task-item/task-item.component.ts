import { Component, input, OnInit, output } from '@angular/core';
import { Task, CreateTask } from '../../interfaces/task.interface';
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
export class TaskItemComponent implements OnInit{

  taskItem      = input<Task>();
  changeInItem  = output<string>();
  taskToUpdate !: CreateTask;

  constructor(private dialog:MatDialog, private tasksServices: TasksService){}
  
  ngOnInit(): void {
    this.getTask();
  }

   getTask(){
    this.tasksServices.getTask(this.taskItem()!.id).subscribe((res)=> {
      this.taskToUpdate = res;
    });
  }

  updateStatusTask(){
    let estadoIdUpdate : number;
    estadoIdUpdate = (this.taskItem()?.estado == 'Finalizado') ? ((this.taskItem()?.tiempoReal != '00:00:00')? 2 : 1 ): 4;
    const updateData = {
      ...this.taskToUpdate,
      tareaId : this.taskItem()!.id,
      estadoId : estadoIdUpdate
    }
    this.tasksServices.updateTask(updateData).subscribe((res)=>{
      this.sendMessageReloadPage();
    });
  }


  openModalChronometer(id:number){
    const modal = this.dialog.open(TaskChronometerComponent,
      {
        data:{
          idTask: id
        },
        width: '90%',
        maxWidth: '700px', 
        maxHeight: '95%'
      }
    )
    modal.afterClosed().subscribe((res)=>{
      if(res?.message == 'endTask'){
        const updateData = {
          ...this.taskToUpdate,
          estadoId: 4,
          tiempoReal: res.data,
          tareaId : this.taskItem()!.id,
        }
        this.tasksServices.updateTask(updateData).subscribe((res)=>{
          this.sendMessageReloadPage();
        });
      }
      this.sendMessageReloadPage();
      this.getTask();
    })
  }

  openTaskEditModal(id:number){
    this.dialog.open(NewTaskFormComponent,
      {
        data:{
          idTask: id,
          action: 'edit'
        },
        width: '90%',
        maxWidth: '700px', 
        maxHeight: '95%'
      }
    );
  }

  sendMessageReloadPage(){
    this.changeInItem.emit('reloadPage');
  }


  deleteTask(id: number){
    this.tasksServices.deleteTask(id).subscribe();
  }

}
