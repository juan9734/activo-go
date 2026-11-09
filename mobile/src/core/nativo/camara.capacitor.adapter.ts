import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import type { CapturaFoto, ErrorPermiso } from './camara.port';

export class CamaraCapacitorAdapter implements CapturaFoto {
  async tomarFoto(): Promise<string> {
    try {
      const foto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 80,
      });
      return foto.dataUrl ?? '';
    } catch {
      const error = new Error('No se pudo acceder a la cámara') as ErrorPermiso;
      error.tipo = 'permiso-denegado';
      throw error;
    }
  }
}
