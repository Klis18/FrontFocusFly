export interface Project{
    id                  : number;
    nombreProyecto      : string;
    nombreCliente       : string;
    estado              : string;
    fechaInicioProyecto : Date;
    fechaFinProyecto    : Date
}

export interface CreateProject{
    nombreProyecto      : string;
    clienteId           : number;
    estadoId            : number;
    fechaInicioProyecto : Date;
    fechaFinProyecto    : Date
}

export interface UpdateProject extends CreateProject{
    proyectoId : number;
}

export interface ProjectFilters{
    nombreProyecto      ?: string;
    estado              ?: string;
    fechaInicioProyecto ?: Date;
    fechaFinProyecto    ?: Date
    page                ?: number;
    pageSize            ?: number;
}

export interface ProjectResponse{
    total        : number;
    paginaActual : number;
    totalPaginas : number;
    proyectos    : Project[]
}