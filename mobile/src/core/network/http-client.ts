import axios from 'axios';
import { tokenStore } from '../storage/token-store';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://10.0.2.2:3000';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Interceptor: correlation-id
httpClient.interceptors.request.use((config) => {
  config.headers['X-Correlation-Id'] =
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  return config;
});

// Interceptor: auth (agrega el access token)
httpClient.interceptors.request.use(async (config) => {
  const token = await tokenStore.obtenerAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh serializado: una sola promesa compartida para dos 401 simultáneos
let refrescoEnCurso: Promise<string | null> | null = null;

async function refrescarToken(): Promise<string | null> {
  const refreshToken = await tokenStore.obtenerRefreshToken();
  if (!refreshToken) return null;
  try {
    const respuesta = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
    const { accessToken, refreshToken: nuevoRefresh } = respuesta.data;
    await tokenStore.guardar(accessToken, nuevoRefresh);
    return accessToken;
  } catch {
    await tokenStore.limpiar();
    return null;
  }
}

// Interceptor: errores + refresh con un solo reintento
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response?.status === 401 && !config._reintentado) {
      config._reintentado = true;
      if (!refrescoEnCurso) {
        refrescoEnCurso = refrescarToken().finally(() => {
          refrescoEnCurso = null;
        });
      }
      const nuevoToken = await refrescoEnCurso;
      if (nuevoToken) {
        config.headers.Authorization = `Bearer ${nuevoToken}`;
        return httpClient(config);
      }
    }
    return Promise.reject(error);
  }
);
