import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomerItemComponent } from "../../components/customer-item/customer-item.component";
import { CustomerFilters, CustomersResponse } from '../../interfaces/customers.interface';
import { CustomersService } from '../../services/customers.service';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { CustomerFilterSearchComponent } from "../../components/customer-filter-search/customer-filter-search.component";

@Component({
  selector: 'app-customers-page',
  imports: [
    MatIconModule,
    CustomerItemComponent,
    PaginatorComponent,
    CustomerFilterSearchComponent
],
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.css'
})
export default class CustomersPageComponent implements OnInit{

  customerFilter: CustomerFilters = {
    nombreCliente: '',
    page: 1,
    pageSize: 5
  }
  customersResponse : CustomersResponse = {
    total: 0,
    paginaActual: 0,
    totalPaginas: 0,
    clientes: []
  }

  constructor(private customersService: CustomersService, private dialog:MatDialog) {}

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

  filteredCustomers(filters: any){
    const {nombreCliente} = filters
    this.customerFilter.nombreCliente = nombreCliente;
    this.obtenerClientes();
  }

  reloadPage(reload : string){
    if(reload){
      this.obtenerClientes();
    }
  }


  openAddTaskModal(){
    const dialogRef = this.dialog.open(CustomerFormComponent,{
      data:{
        action: 'add'
      },
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(
      res => this.obtenerClientes()
    );
  }

}
