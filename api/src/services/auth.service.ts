import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { usuarioRepository } from "../repositories/usuario.repository.js";
import { refreshTokenRepository } from "../repositories/refresh-token.repository.js";
import { ACCESS_SECRET } from "../middlewares/auth.middleware.js";

const ACCESS_TTL = "15m";
const REFRESH_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 días
const MAX_INTENTOS = 3;
const BLOQUEO_MS = 1000 * 60 * 5; // 5 minutos

function error(status: number, message: string) {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  return err;
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function emitirAccessToken(usuario: { id: string; rol: string }) {
  return jwt.sign({ id: usuario.id, rol: usuario.rol }, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

async function emitirRefreshToken(usuarioId: string) {
  const token = crypto.randomBytes(40).toString("hex");
  const expiraEn = new Date(Date.now() + REFRESH_TTL_MS);
  await refreshTokenRepository.crear(usuarioId, hashToken(token), expiraEn);
  return token;
}

export const authService = {
  login: async (email: string, password: string) => {
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) throw error(401, "Usuario o contraseña incorrectos");

    if (usuario.bloqueadoHasta && usuario.bloqueadoHasta.getTime() > Date.now()) {
      throw error(423, "Cuenta bloqueada temporalmente, intenta más tarde");
    }

    const valido = await bcrypt.compare(password, usuario.passwordHash);
    if (!valido) {
      const intentos = usuario.intentosFallidos + 1;
      const bloqueadoHasta = intentos >= MAX_INTENTOS ? new Date(Date.now() + BLOQUEO_MS) : null;
      await usuarioRepository.registrarIntentoFallido(usuario.id, intentos, bloqueadoHasta);
      if (bloqueadoHasta) throw error(423, "Cuenta bloqueada temporalmente, intenta más tarde");
      throw error(401, "Usuario o contraseña incorrectos");
    }

    await usuarioRepository.resetearIntentos(usuario.id);

    const accessToken = emitirAccessToken(usuario);
    const refreshToken = await emitirRefreshToken(usuario.id);

    return {
      accessToken,
      refreshToken,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    };
  },

  refrescar: async (refreshTokenRecibido: string) => {
    const tokenHash = hashToken(refreshTokenRecibido);
    const registro = await refreshTokenRepository.buscarPorHash(tokenHash);
    if (!registro) throw error(401, "Refresh token inválido");

    if (registro.usado) {
      await refreshTokenRepository.revocarTodosDeUsuario(registro.usuarioId);
      throw error(401, "Refresh token reutilizado: todas las sesiones fueron cerradas");
    }

    if (registro.expiraEn.getTime() < Date.now()) throw error(401, "Refresh token expirado");

    const usuario = await usuarioRepository.buscarPorId(registro.usuarioId);
    if (!usuario) throw error(401, "Usuario no encontrado");

    await refreshTokenRepository.marcarUsado(registro.id);

    const accessToken = emitirAccessToken(usuario);
    const refreshToken = await emitirRefreshToken(usuario.id);

    return { accessToken, refreshToken };
  },

  logout: async (usuarioId: string) => {
    await refreshTokenRepository.revocarTodosDeUsuario(usuarioId);
  },
};
