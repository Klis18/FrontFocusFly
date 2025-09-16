export interface Task{
    id             : number;
    descripcion    : string;
    nombreProyecto : string;
    estado         : string;
    tiempoEstimado : string;
    tiempoReal     : string;
    programadoPara : Date;
    plazoEntrega   : Date
}

export interface CreateTask{
    descripcion    : string;
    proyectoId     : number;
    estadoId       : number;
    tiempoEstimado : string;
    tiempoReal     : string;
    programadoPara : Date;
    plazoEntrega   : Date
}

export interface UpdateTask extends CreateTask{
    tareaId: number;
}

export interface TaskFilters{
    descripcion     ?: string;
    nombreProyecto  ?: string;
    estado          ?: string;
    programadoPara  ?: Date;
    plazoEntrega    ?: Date;  
    page            ?: number;
    pageSize        ?: number;
}

export interface TaskResponse{
    total        : number;
    paginaActual : number;
    totalPaginas : number;
    tareas       : Task[];
}