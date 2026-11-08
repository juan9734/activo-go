import type { Usuario } from './usuario';

export interface ResultadoLogin {
  usuario: Usuario;
  accessToken: string;
  refreshToken: string;
}

export interface SesionRepository {
  iniciarSesion(email: string, password: string): Promise<ResultadoLogin>;
  cerrarSesion(): Promise<void>;
}
