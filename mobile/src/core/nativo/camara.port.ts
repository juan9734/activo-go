export interface ErrorPermiso extends Error {
  tipo: 'permiso-denegado';
}

export interface CapturaFoto {
  tomarFoto(): Promise<string>; // devuelve un data URL base64
}
