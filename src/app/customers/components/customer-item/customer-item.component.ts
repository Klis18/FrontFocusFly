import { Component, input } from '@angular/core';
import { Customer } from '../../interfaces/customers.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'customer-item',
  imports: [MatIconModule],
  templateUrl: './customer-item.component.html',
  styles: ``
})
export class CustomerItemComponent {

  customerItem = input<Customer>();

}
