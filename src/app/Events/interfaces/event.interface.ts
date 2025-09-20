export interface Event{
  id: number;
  titulo: string;
  descripcion: string;
  fecha : Date;
  hora: string;
}

export interface CreateEvent{
  titulo: string;
  descripcion: string;
  fecha : Date;
  hora: string;
}

export interface EditEvent{
  titulo: string;
  descripcion: string;
  fecha : Date;
  hora: string;
  eventoId: number; 
}


export interface EventFilters{
    titulo ?: string;
    fecha ?: Date;
    page : number;
    pageSize: number;
}

export interface EventResponse{
    total: number;
    paginaActual: number;
    totalPaginas: number;
    eventos: Event[];
}