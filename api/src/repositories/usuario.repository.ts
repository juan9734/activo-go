import { prisma } from "../db/prisma.js";

export const usuarioRepository = {
  buscarPorEmail: (email: string) => prisma.usuario.findUnique({ where: { email } }),
  buscarPorId: (id: string) => prisma.usuario.findUnique({ where: { id } }),
  registrarIntentoFallido: (id: string, intentos: number, bloqueadoHasta: Date | null) =>
    prisma.usuario.update({ where: { id }, data: { intentosFallidos: intentos, bloqueadoHasta } }),
  resetearIntentos: (id: string) =>
    prisma.usuario.update({ where: { id }, data: { intentosFallidos: 0, bloqueadoHasta: null } }),
};
