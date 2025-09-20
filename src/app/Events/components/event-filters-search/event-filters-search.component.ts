import { Component, output } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'event-filters-search',
  imports: [
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './event-filters-search.component.html',
  styles: ``
})
export class EventFiltersSearchComponent {

  public eventsFilterForm!: FormGroup;
  sendDataFilters = output<FormGroup>();

  constructor(private fb: FormBuilder){
    this.eventsFilterForm = this.fb.group({
      titulo: [''],
      fecha : ['']
    });
  }

  sendFilters(){
    this.sendDataFilters.emit(this.eventsFilterForm.value);
    this.clearForm();
  }

  clearForm(){
    this.eventsFilterForm.get('titulo')?.setValue('');
    this.eventsFilterForm.get('fecha')?.setValue('');
  }
}
