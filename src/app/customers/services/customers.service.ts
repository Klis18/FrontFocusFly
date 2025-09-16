import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Customer, CustomerFilters, CustomersResponse } from '../interfaces/customers.interface';
import { buildHttpParams } from '../../utils/http-param';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  constructor() { }

  getCustomers(filters: CustomerFilters){
    let params = buildHttpParams(filters);
    return this.http.get<CustomersResponse>(`${this.baseUrl}/clientes`,{params});
  }

  createCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.baseUrl}/clientes`, customer);
  }
}
