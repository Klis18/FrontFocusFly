import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

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



  constructor(private fb : FormBuilder
  ){
    this.filterProjectForm = this.fb.group({
      nombreProyecto      : [''],
      estado              : [''],
      fechaInicioProyecto : [''],
      fechaFinProyecto    : ['']
    });
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
