import { httpClient } from '../../../core/network/http-client';
import type { ResultadoLogin, SesionRepository } from '../domain/sesion.repository';

export class SesionHttpRepository implements SesionRepository {
  async iniciarSesion(email: string, password: string): Promise<ResultadoLogin> {
    const { data } = await httpClient.post('/auth/login', { email, password });
    return data as ResultadoLogin;
  }

  async cerrarSesion(): Promise<void> {
    await httpClient.post('/auth/logout').catch(() => undefined);
  }
}
