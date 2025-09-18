import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CustomersService } from '../../services/customers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertsService } from '../../../shared/services/alerts.service';

@Component({
  selector: 'app-customer-form',
  imports: [
    MatDialogContent,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './customer-form.component.html',
  styles: ``
})
export class CustomerFormComponent {

  private data = inject(MAT_DIALOG_DATA);
  public titleForm    : string = (this.data.action == 'add')? 'Agregar Cliente' : 'Editar Cliente';
  public customerForm !: FormGroup;

  constructor(private customerService : CustomersService,
              private alertService    : AlertsService, 
              private fb              : FormBuilder,
              private dialogRef       : MatDialogRef<CustomerFormComponent>){
    this.customerForm = this.fb.group({
      nombre : [''],
      email  : [''],
      celular: ['']
    });
  }

  closeModal(){
    this.dialogRef.close();
  }

  onSubmit(){
    (this.data.action == 'add')? this.addCustomer() : this.updateCustomer();
  }

  addCustomer(){
    if(!this.customerForm.valid) return;
    this.customerService.createCustomer(this.customerForm.value).subscribe(
      {
        next: (response) => {
          this.alertService.sendOkMessage('Cliente agregado exitosamente');
          this.closeModal();
        }
      }
    );
  }

  updateCustomer(){};

}
