import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tasks-task-chronometer',
  imports: [
    MatIconModule
  ],
  templateUrl: './task-chronometer.component.html',
  styles: `
   
  `
})
export class TaskChronometerComponent {

  chronometer: string = '00:00:00'
}
