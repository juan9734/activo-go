import { prisma } from "../db/prisma.js";
import type { $Enums } from "@prisma/client";

type EstadoActivo = $Enums.EstadoActivo;

export const activoRepository = {
  listar: () => prisma.activo.findMany({ orderBy: { creadoEn: "desc" } }),
  buscarPorId: (id: string) => prisma.activo.findUnique({ where: { id } }),
  buscarPorCodigo: (codigo: string) => prisma.activo.findUnique({ where: { codigo } }),
  crear: (data: { codigo: string; nombre: string; categoria: string }) =>
    prisma.activo.create({ data }),
  actualizarFoto: (id: string, fotoUrl: string) =>
    prisma.activo.update({ where: { id }, data: { fotoUrl } }),
  cambiarEstado: (id: string, estado: EstadoActivo) =>
    prisma.activo.update({ where: { id }, data: { estado } }),
};
