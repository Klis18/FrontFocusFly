export interface Customer{
    id : number
    nombre  : string;
    email   : string;
    celular : string;
}

export interface CustomerFilters{
    nombreCliente   : string;
    page     : number;
    pageSize : number;
}

export interface CustomersResponse{
    total        : number;
    paginaActual : number;
    totalPaginas : number;
    clientes     : Customer[];
}