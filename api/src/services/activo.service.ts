import { activoRepository } from "../repositories/activo.repository.js";
import type { $Enums } from "@prisma/client";

type EstadoActivo = $Enums.EstadoActivo;

const TRANSICIONES_VALIDAS: Record<EstadoActivo, EstadoActivo[]> = {
  ACTIVO: ["MANTENIMIENTO", "BAJA"],
  MANTENIMIENTO: ["ACTIVO", "BAJA"],
  BAJA: [],
};

function error(status: number, message: string) {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  return err;
}

export const activoService = {
  listar: () => activoRepository.listar(),

  crear: async (data: { codigo: string; nombre: string; categoria: string }) => {
    const existente = await activoRepository.buscarPorCodigo(data.codigo);
    if (existente) throw error(409, "Ya existe un activo con ese código");
    return activoRepository.crear(data);
  },

  cambiarEstado: async (id: string, estadoNuevo: EstadoActivo) => {
    const activo = await activoRepository.buscarPorId(id);
    if (!activo) throw error(404, "Activo no encontrado");

    const permitidas = TRANSICIONES_VALIDAS[activo.estado];
    if (!permitidas.includes(estadoNuevo)) {
      throw error(422, `No se puede pasar de ${activo.estado} a ${estadoNuevo}`);
    }
    return activoRepository.cambiarEstado(id, estadoNuevo);
  },

  actualizarFoto: async (id: string, fotoUrl: string) => {
    const activo = await activoRepository.buscarPorId(id);
    if (!activo) throw error(404, "Activo no encontrado");
    return activoRepository.actualizarFoto(id, fotoUrl);
  },
};
