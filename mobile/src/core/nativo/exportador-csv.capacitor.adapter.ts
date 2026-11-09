import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

import type { ExportadorCsv } from './exportador-csv.port';

export class ExportadorCsvCapacitorAdapter implements ExportadorCsv {
  async compartir(nombreArchivo: string, contenido: string): Promise<void> {
    const { uri } = await Filesystem.writeFile({
      path: nombreArchivo,
      data: contenido,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    });
    await Share.share({ title: nombreArchivo, url: uri, dialogTitle: 'Compartir inventario CSV' });
  }
}
