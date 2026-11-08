import type { Activo } from './activo';

export interface DatosNuevoActivo {
  codigo: string;
  nombre: string;
  categoria: string;
}

export interface ActivosRepository {
  listar(): Promise<Activo[]>;
  crear(datos: DatosNuevoActivo): Promise<Activo>;
  actualizarFoto(id: string, fotoUrl: string): Promise<Activo>;
}
