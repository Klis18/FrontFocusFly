import { Component, input, output } from '@angular/core';
import { Customer } from '../../interfaces/customers.interface';
import { MatIconModule } from '@angular/material/icon';
import { CustomersService } from '../../services/customers.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'customer-item',
  imports: [MatIconModule],
  templateUrl: './customer-item.component.html',
  styles: ``
})
export class CustomerItemComponent {

  changeInItem  = output<string>();
  customerItem = input<Customer>();

  constructor(private alertServices:AlertsService,
              private customerService: CustomersService,
              private dialog : MatDialog){}

  sendMessageReloadPage(){
    this.changeInItem.emit('reloadPage');
  }

  deleteCustomer(id: number){
    this.customerService.deleteCustomer(id).subscribe({
      next: (response) => {
        this.sendMessageReloadPage();
        this.alertServices.sendOkMessage('Cliente eliminado con éxito')
      }
    });
  }

  openEditCustomerModal(){
    const dialogRef = this.dialog.open(CustomerFormComponent,{
      data:{
        action: 'edit',
        customer: this.customerItem()
      },
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(
      (res) => this.sendMessageReloadPage()
    );
  }

}
