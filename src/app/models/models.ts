export interface userI {
    nombre: string;
    apellido: string;
    celular: number;
    correo: string;
    password: string;
    perfil: 'visitante' | 'admin';
    uid: string;
}
export interface HabitacionesI {
    nombre: string;
    detalles: string;
    detalles2: string;
    detalles3: string;
    capacidad: string;
    password: string;
    precio: string;
    id: string;
}



export class CcHabitacionesI {
    nombre: string;
    detalles: string;
    detalles2: string;
    capacidad: string;
    password: string;
    precio: string;
    id: string;
}
export interface ReservasI {
    nombreHabitacion: string;
    fechaInicio: any;
    fechaTermino: any;
    idCliente: any;
    idReserva: any;
  
}

