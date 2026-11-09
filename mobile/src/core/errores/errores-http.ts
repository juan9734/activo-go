import axios from 'axios';

/** Código HTTP de la respuesta del servidor, o undefined si no hubo respuesta. */
export function estadoHttp(err: unknown): number | undefined {
  return axios.isAxiosError(err) ? err.response?.status : undefined;
}

/** true si la petición falló sin respuesta del servidor (sin red o tiempo agotado). */
export function esErrorSinConexion(err: unknown): boolean {
  return axios.isAxiosError(err) && !err.response;
}
