import type { Activo } from './activo';

export interface ActivosRepository {
  listar(): Promise<Activo[]>;
  actualizarFoto(id: string, fotoUrl: string): Promise<Activo>;
}
