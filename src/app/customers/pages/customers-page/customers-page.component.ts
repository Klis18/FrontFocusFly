import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomerItemComponent } from "../../components/customer-item/customer-item.component";
import { Customer, CustomerFilters, CustomersResponse } from '../../interfaces/customers.interface';
import { CustomersService } from '../../services/customers.service';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";

@Component({
  selector: 'app-customers-page',
  imports: [
    MatIconModule,
    CustomerItemComponent,
    PaginatorComponent
],
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.css'
})
export default class CustomersPageComponent implements OnInit{

  customerFilter: CustomerFilters = {
    nombre: '',
    page: 1,
    pageSize: 5
  }
  customersResponse : CustomersResponse = {
    total: 0,
    paginaActual: 0,
    totalPaginas: 0,
    clientes: []
  }

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.customersService.getCustomers(this.customerFilter).subscribe(
      {
        next: (response) =>{
          this.customersResponse.clientes     = response.clientes;
          this.customersResponse.total        = response.total;
          this.customersResponse.paginaActual = response.paginaActual;
          this.customersResponse.totalPaginas = response.totalPaginas;
        }
      }
    )
  }

}
