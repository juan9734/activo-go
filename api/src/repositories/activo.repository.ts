import { prisma } from "../db/prisma.js";
import type { $Enums } from "@prisma/client";

type EstadoActivo = $Enums.EstadoActivo;

export const activoRepository = {
  listar: () => prisma.activo.findMany({ orderBy: { creadoEn: "desc" } }),
  buscarPorId: (id: string) => prisma.activo.findUnique({ where: { id } }),
  buscarPorCodigo: (codigo: string) => prisma.activo.findUnique({ where: { codigo } }),
  crear: (data: { codigo: string; nombre: string; categoria: string; ubicacion?: string }) =>
    prisma.activo.create({ data }),
  actualizar: (id: string, data: { nombre: string; categoria: string; ubicacion?: string | null }) =>
    prisma.activo.update({ where: { id }, data }),
  actualizarFoto: (id: string, fotoUrl: string) =>
    prisma.activo.update({ where: { id }, data: { fotoUrl } }),
  cambiarEstado: (id: string, estado: EstadoActivo, estadoActualizadoPor: string) =>
    prisma.activo.update({
      where: { id },
      data: { estado, estadoActualizadoPor, estadoActualizadoEn: new Date() },
    }),
};
