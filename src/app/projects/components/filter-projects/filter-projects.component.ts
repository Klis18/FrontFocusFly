import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { Status } from '../../../shared/interfaces/status.interface';
import { StatusService } from '../../../shared/services/status.service';

@Component({
  selector: 'filter-projects',
  imports: [
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filter-projects.component.html',
  styles: ``
})
export class FilterProjectsComponent {

  sendProjectFilters = output<FormGroup>();
  filterProjectForm !: FormGroup;
  statusList!: Status[];



  constructor(private fb : FormBuilder,
              private statusServices: StatusService
  ){
    this.filterProjectForm = this.fb.group({
      nombreProyecto      : [''],
      estado              : [''],
      fechaInicioProyecto : [''],
      fechaFinProyecto    : ['']
    });

    this.statusServices.getStatusBySection('proyectos').subscribe({
      next: (response) => {
        this.statusList = response;
      }
    })
  }


  sendFilters(){
    this.sendProjectFilters.emit(this.filterProjectForm.value);
    this.cleanForm();
  }

  cleanForm(){
    this.filterProjectForm.get('nombreProyecto')?.setValue('');
    this.filterProjectForm.get('estado')?.setValue('');
    this.filterProjectForm.get('fechaInicioProyecto')?.setValue('');
    this.filterProjectForm.get('fechaFinProyecto')?.setValue('');
  }
}
