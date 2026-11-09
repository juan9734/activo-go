import { SecureStorage } from '@aparajita/capacitor-secure-storage';

const CLAVE_ACCESS = 'activogo.accessToken';
const CLAVE_REFRESH = 'activogo.refreshToken';

export const tokenStore = {
  async guardar(accessToken: string, refreshToken: string): Promise<void> {
    await SecureStorage.set(CLAVE_ACCESS, accessToken);
    await SecureStorage.set(CLAVE_REFRESH, refreshToken);
  },
  async obtenerAccessToken(): Promise<string | null> {
    try {
      return (await SecureStorage.get(CLAVE_ACCESS)) as string | null;
    } catch {
      return null;
    }
  },
  async obtenerRefreshToken(): Promise<string | null> {
    try {
      return (await SecureStorage.get(CLAVE_REFRESH)) as string | null;
    } catch {
      return null;
    }
  },
  async limpiar(): Promise<void> {
    await SecureStorage.remove(CLAVE_ACCESS).catch(() => undefined);
    await SecureStorage.remove(CLAVE_REFRESH).catch(() => undefined);
  },
};
