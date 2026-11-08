export type Rol = 'ADMIN' | 'AUDITOR' | 'CONSULTA';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
}
