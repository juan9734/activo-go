import type { ErrorPermiso } from './camara.port';

export type { ErrorPermiso };

export interface EscanerQr {
  /** Pide permiso de cámara justo en el momento y abre el escáner nativo. Devuelve el texto del QR leído, o null si el usuario canceló. */
  escanear(): Promise<string | null>;
}
