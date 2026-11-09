export interface ExportadorCsv {
  /** Guarda el contenido en un archivo privado de la app y abre la hoja de compartir del sistema. */
  compartir(nombreArchivo: string, contenido: string): Promise<void>;
}
