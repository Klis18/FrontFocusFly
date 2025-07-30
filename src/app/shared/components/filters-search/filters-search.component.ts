import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskFilters } from '../../../Tasks/interfaces/task.interface';

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

  filterForm !: FormGroup;

  constructor(private fb : FormBuilder){
    this.filterForm = this.fb.group({
      descripcion : [''],
      estado : [''],
      programadoPara : [''],
      plazoEntrega : ['']
    });
  }

  sendFilters(){
    console.log('FILTROS ACTIVADOS', this.filterForm.value);
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
