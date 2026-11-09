import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

import type { EscanerQr, ErrorPermiso } from './escaner.port';

export class EscanerQrMlKitAdapter implements EscanerQr {
  async escanear(): Promise<string | null> {
    const permiso = await BarcodeScanner.checkPermissions();
    if (permiso.camera !== 'granted') {
      const solicitado = await BarcodeScanner.requestPermissions();
      if (solicitado.camera !== 'granted') {
        const error = new Error('No se concedió permiso de cámara') as ErrorPermiso;
        error.tipo = 'permiso-denegado';
        throw error;
      }
    }

    const { barcodes } = await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode] });
    return barcodes[0]?.rawValue ?? null;
  }
}
