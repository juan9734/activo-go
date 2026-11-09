import type { Activo, EstadoActivo } from './activo';

export interface DatosNuevoActivo {
  codigo: string;
  nombre: string;
  categoria: string;
  ubicacion?: string;
}

export interface DatosEdicionActivo {
  nombre: string;
  categoria: string;
  ubicacion?: string;
}

export interface ActivosRepository {
  listar(): Promise<Activo[]>;
  obtener(id: string): Promise<Activo>;
  crear(datos: DatosNuevoActivo): Promise<Activo>;
  actualizar(id: string, datos: DatosEdicionActivo): Promise<Activo>;
  actualizarFoto(id: string, fotoUrl: string): Promise<Activo>;
  cambiarEstado(id: string, estado: EstadoActivo): Promise<Activo>;
}
