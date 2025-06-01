export interface Task{
    id: number;
    descripcion: string,
    nombreProyecto: string,
    estado: string,
    tiempoEstimado: string,
    tiempoReal: string,
    programadoPara: Date,
    plazoEntrega: Date
}

export interface CreateTask{
    descripcion: string,
    proyectoId: number,
    estadoId: number,
    tiempoEstimado: string,
    programadoPara: Date,
    plazoEntrega: Date
}