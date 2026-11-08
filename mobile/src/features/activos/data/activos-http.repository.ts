import { httpClient } from '../../../core/network/http-client';
import type { Activo } from '../domain/activo';
import type { ActivosRepository, DatosNuevoActivo } from '../domain/activos.repository';

export class ActivosHttpRepository implements ActivosRepository {
  async listar(): Promise<Activo[]> {
    const { data } = await httpClient.get('/activos');
    return data as Activo[];
  }

  async crear(datos: DatosNuevoActivo): Promise<Activo> {
    const { data } = await httpClient.post('/activos', datos);
    return data as Activo;
  }

  async actualizarFoto(id: string, fotoUrl: string): Promise<Activo> {
    const { data } = await httpClient.patch(`/activos/${id}/foto`, { fotoUrl });
    return data as Activo;
  }
}
