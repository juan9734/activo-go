export type EstadoActivo = 'ACTIVO' | 'MANTENIMIENTO' | 'BAJA';

export interface Activo {
  id: string;
  codigo: string;
  nombre: string;
  categoria: string;
  ubicacion: string | null;
  estado: EstadoActivo;
  responsable: string | null;
  fotoUrl: string | null;
  estadoActualizadoPor: string | null;
  estadoActualizadoEn: string | null;
  creadoEn: string;
  actualizadoEn: string;
}
