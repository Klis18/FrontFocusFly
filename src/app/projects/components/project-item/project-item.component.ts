import { Component, input } from '@angular/core';
import { Project } from '../../interfaces/project.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-item',
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './project-item.component.html',
  styles: ``
})
export class ProjectItemComponent {

  projectItem = input<Project>();
}
