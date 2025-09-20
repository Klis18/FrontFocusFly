import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'customer-filter-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './customer-filter-search.component.html',
  styles: ``
})
export class CustomerFilterSearchComponent {
  sendCustomerFilters = output<FormGroup>();
  customerFilterForm !: FormGroup;

  constructor(private fb:FormBuilder) {
    this.customerFilterForm = this.fb.group({
      nombreCliente : ['']
    })
  }

  sendFilters(){
    this.sendCustomerFilters.emit(this.customerFilterForm.value);
    this.cleanForm();
  }

  cleanForm(){
    this.customerFilterForm.get('nombreCliente')?.setValue('');
  }

}
