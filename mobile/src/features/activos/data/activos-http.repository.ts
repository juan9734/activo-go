import { httpClient } from '../../../core/network/http-client';
import type { Activo } from '../domain/activo';
import type { ActivosRepository } from '../domain/activos.repository';

export class ActivosHttpRepository implements ActivosRepository {
  async listar(): Promise<Activo[]> {
    const { data } = await httpClient.get('/activos');
    return data as Activo[];
  }

  async actualizarFoto(id: string, fotoUrl: string): Promise<Activo> {
    const { data } = await httpClient.patch(`/activos/${id}/foto`, { fotoUrl });
    return data as Activo;
  }
}
