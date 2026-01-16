import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
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
export class CustomerFormComponent implements OnInit{

  private data = inject(MAT_DIALOG_DATA);
  public titleForm    : string = (this.data.action == 'add')? 'Agregar Cliente' : 'Editar Cliente';
  public customerForm !: FormGroup;

  constructor(private customerService : CustomersService,
              private alertService    : AlertsService, 
              private fb              : FormBuilder,
              private dialogRef       : MatDialogRef<CustomerFormComponent>)
  {
    this.customerForm = this.fb.group({
      nombre : [''],
      email  : [''],
      celular: ['']
    });
  }
  ngOnInit(): void {
    if(this.data.action != 'add'){
      this.getCustomer();
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  getCustomer(){
    const {nombre, email, celular} = this.data.customer;
    const customerData = {nombre, email, celular};
    this.customerForm.setValue(customerData);
  }

  
  addCustomer(){
    if(!this.customerForm.valid) return;
    this.customerService.createCustomer(this.customerForm.value).subscribe(
      {
        next: (response) => {
          this.alertService.sendOkMessage('Cliente agregado con éxito');
          this.closeModal();
        }
      }
    );
  }
  
  updateCustomer(){
    const customerUpdate ={
      ...this.customerForm.value,
      clienteId: this.data.customer.id
    }
    this.customerService.updateCustomer(customerUpdate).subscribe({
      next: (res) => {
        this.alertService.sendOkMessage('Cliente actualizado con éxito');
        this.closeModal();
      }
    });
  };
  
  onSubmit(){
    (this.data.action == 'add')? this.addCustomer() : this.updateCustomer();
  }
}
