import { prisma } from "../db/prisma.js";

export const refreshTokenRepository = {
  crear: (usuarioId: string, tokenHash: string, expiraEn: Date) =>
    prisma.refreshToken.create({ data: { usuarioId, tokenHash, expiraEn } }),
  buscarPorHash: (tokenHash: string) => prisma.refreshToken.findUnique({ where: { tokenHash } }),
  marcarUsado: (id: string) =>
    prisma.refreshToken.update({ where: { id }, data: { usado: true } }),
  revocarTodosDeUsuario: (usuarioId: string) =>
    prisma.refreshToken.updateMany({ where: { usuarioId, usado: false }, data: { usado: true } }),
};
