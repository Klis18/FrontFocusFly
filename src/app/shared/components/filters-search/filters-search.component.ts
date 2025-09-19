import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Project, ProjectFilters } from '../../../projects/interfaces/project.interface';
import { ProjectsService } from '../../../projects/services/projects.service';
import { Status } from '../../interfaces/status.interface';
import { StatusService } from '../../services/status.service';
import { empty } from 'rxjs';

@Component({
  selector: 'shared-filters-search',
  imports: [
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filters-search.component.html',
  styleUrl: './filters-search.component.css'
})
export class FiltersSearchComponent {

  @Output()
  sendDataFilters = new EventEmitter<FormGroup>;

  filterForm            !: FormGroup;
  public statusList     !: Status[]; 
  public projectsList   !: Project[];
  private projectsFilter : ProjectFilters = {
    fechaInicioProyecto: undefined,
    fechaFinProyecto: undefined
  };


  constructor(private fb : FormBuilder, 
              private projectsServices: ProjectsService,
              private statusServices  : StatusService
  ){
    this.filterForm = this.fb.group({
      descripcion    : [''],
      proyecto       : [''],
      estado         : [''],
      programadoPara : [''],
      plazoEntrega   : ['']
    });

    this.projectsServices.getProjects(this.projectsFilter).subscribe(
      {
        next: (response) =>{
          this.projectsList = response.proyectos;
        }
      }
    );

    this.statusServices.getStatusBySection('tareas').subscribe(
      {
        next: (response) => {
          this.statusList = response
        }
      }
    )
  }

  sendFilters(){
    this.sendDataFilters.emit(this.filterForm.value);
    this.cleanForm();
  }

  cleanForm(){
    this.filterForm.get('descripcion')?.setValue('');
    this.filterForm.get('estado')?.setValue('');
    this.filterForm.get('programadoPara')?.setValue('');
    this.filterForm.get('plazoEntrega')?.setValue('');
  }
}
