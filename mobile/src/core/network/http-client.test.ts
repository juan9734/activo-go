import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { httpClient } from './http-client';

// Doble escrito a mano del almacenamiento seguro de tokens (sin vi.fn).
const almacen = vi.hoisted(() => ({
  access: 'access-viejo' as string | null,
  refresh: 'refresh-viejo' as string | null,
}));

vi.mock('../storage/token-store', () => ({
  tokenStore: {
    async guardar(access: string, refresh: string) {
      almacen.access = access;
      almacen.refresh = refresh;
    },
    async obtenerAccessToken() {
      return almacen.access;
    },
    async obtenerRefreshToken() {
      return almacen.refresh;
    },
    async limpiar() {
      almacen.access = null;
      almacen.refresh = null;
    },
  },
}));

function respuesta(config: InternalAxiosRequestConfig, status: number, data: unknown): AxiosResponse {
  return { data, status, statusText: '', headers: {}, config };
}

function error401(config: InternalAxiosRequestConfig): AxiosError {
  return new AxiosError('No autorizado', 'ERR_BAD_REQUEST', config, null, respuesta(config, 401, {}));
}

let llamadasApi = 0;
let llamadasRefresh = 0;
let refreshResponde = true;
let apiAceptaTokenNuevo = true;

// Doble de la API: acepta solo el token nuevo (o ninguno, según el caso).
const adaptadorApi: AxiosAdapter = async (config) => {
  llamadasApi += 1;
  const autorizacion = String(config.headers.get('Authorization') ?? '');
  if (apiAceptaTokenNuevo && autorizacion === 'Bearer access-nuevo') {
    return respuesta(config, 200, { ok: true });
  }
  throw error401(config);
};

// Doble de POST /auth/refresh: tarda un poco para que los dos 401 coincidan.
const adaptadorRefresh: AxiosAdapter = async (config) => {
  llamadasRefresh += 1;
  await new Promise((resolver) => setTimeout(resolver, 20));
  if (!refreshResponde) throw error401(config);
  return respuesta(config, 200, { accessToken: 'access-nuevo', refreshToken: 'refresh-nuevo' });
};

describe('httpClient: refresh serializado con un solo reintento', () => {
  beforeEach(() => {
    almacen.access = 'access-viejo';
    almacen.refresh = 'refresh-viejo';
    llamadasApi = 0;
    llamadasRefresh = 0;
    refreshResponde = true;
    apiAceptaTokenNuevo = true;
    httpClient.defaults.adapter = adaptadorApi;
    axios.defaults.adapter = adaptadorRefresh;
  });

  it('dosPeticionesConToken401_refrescaUnaSolaVezYAmbasSeCompletan', async () => {
    const [a, b] = await Promise.all([httpClient.get('/activos'), httpClient.get('/activos/1')]);

    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    expect(llamadasRefresh).toBe(1);
    expect(llamadasApi).toBe(4); // 2 intentos fallidos + 1 reintento por petición
    expect(almacen.access).toBe('access-nuevo');
    expect(almacen.refresh).toBe('refresh-nuevo');
  });

  it('refreshFallido_limpiaLosTokensYRechazaLaPeticion', async () => {
    refreshResponde = false;

    await expect(httpClient.get('/activos')).rejects.toMatchObject({ response: { status: 401 } });

    expect(llamadasRefresh).toBe(1);
    expect(almacen.access).toBeNull();
    expect(almacen.refresh).toBeNull();
  });

  it('apiRechazaTambienElTokenNuevo_soloReintentaUnaVez', async () => {
    apiAceptaTokenNuevo = false;

    await expect(httpClient.get('/activos')).rejects.toMatchObject({ response: { status: 401 } });

    expect(llamadasApi).toBe(2); // intento original + un único reintento
    expect(llamadasRefresh).toBe(1);
  });
});
