export type EstadoActivo = 'ACTIVO' | 'MANTENIMIENTO' | 'BAJA';

export interface Activo {
  id: string;
  codigo: string;
  nombre: string;
  categoria: string;
  estado: EstadoActivo;
  responsable: string | null;
  fotoUrl: string | null;
  creadoEn: string;
  actualizadoEn: string;
}
