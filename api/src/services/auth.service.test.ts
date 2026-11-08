import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import { authService } from "./auth.service.js";
import { usuarioRepository } from "../repositories/usuario.repository.js";
import { refreshTokenRepository } from "../repositories/refresh-token.repository.js";

vi.mock("../repositories/usuario.repository.js", () => ({
  usuarioRepository: {
    buscarPorEmail: vi.fn(),
    buscarPorId: vi.fn(),
    registrarIntentoFallido: vi.fn(),
    resetearIntentos: vi.fn(),
  },
}));

vi.mock("../repositories/refresh-token.repository.js", () => ({
  refreshTokenRepository: {
    crear: vi.fn(),
    buscarPorHash: vi.fn(),
    marcarUsado: vi.fn(),
    revocarTodosDeUsuario: vi.fn(),
  },
}));

vi.mock("bcryptjs", () => ({
  default: { compare: vi.fn() },
}));

const usuarios = vi.mocked(usuarioRepository);
const refreshTokens = vi.mocked(refreshTokenRepository);
const bcryptMock = vi.mocked(bcrypt);

const usuarioBase = {
  id: "u1",
  nombre: "Admin",
  email: "admin@activogo.co",
  passwordHash: "hash",
  rol: "ADMIN" as const,
  intentosFallidos: 0,
  bloqueadoHasta: null as Date | null,
  creadoEn: new Date(),
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("authService.login — bloqueo por intentos fallidos", () => {
  it("responde 401 en la primera contraseña incorrecta y registra 1 intento", async () => {
    usuarios.buscarPorEmail.mockResolvedValue({ ...usuarioBase });
    bcryptMock.compare.mockResolvedValue(false as never);

    await expect(authService.login("admin@activogo.co", "mala")).rejects.toMatchObject({ status: 401 });
    expect(usuarios.registrarIntentoFallido).toHaveBeenCalledWith("u1", 1, null);
  });

  it("bloquea con 423 al tercer intento fallido consecutivo", async () => {
    usuarios.buscarPorEmail.mockResolvedValue({ ...usuarioBase, intentosFallidos: 2 });
    bcryptMock.compare.mockResolvedValue(false as never);

    await expect(authService.login("admin@activogo.co", "mala")).rejects.toMatchObject({ status: 423 });
    const llamada = usuarios.registrarIntentoFallido.mock.calls[0];
    expect(llamada[1]).toBe(3);
    expect(llamada[2]).toBeInstanceOf(Date);
  });

  it("rechaza con 423 si la cuenta ya está bloqueada, sin intentar la contraseña", async () => {
    usuarios.buscarPorEmail.mockResolvedValue({
      ...usuarioBase,
      bloqueadoHasta: new Date(Date.now() + 60_000),
    });

    await expect(authService.login("admin@activogo.co", "cualquiera")).rejects.toMatchObject({ status: 423 });
    expect(bcryptMock.compare).not.toHaveBeenCalled();
  });

  it("resetea los intentos fallidos tras un login correcto", async () => {
    usuarios.buscarPorEmail.mockResolvedValue({ ...usuarioBase, intentosFallidos: 2 });
    bcryptMock.compare.mockResolvedValue(true as never);

    const resultado = await authService.login("admin@activogo.co", "Activo2026!");

    expect(usuarios.resetearIntentos).toHaveBeenCalledWith("u1");
    expect(resultado.usuario.email).toBe("admin@activogo.co");
    expect(resultado.accessToken).toBeTypeOf("string");
    expect(resultado.refreshToken).toBeTypeOf("string");
  });
});

describe("authService.refrescar — rotación y reutilización", () => {
  it("rota el refresh token y marca el anterior como usado", async () => {
    refreshTokens.buscarPorHash.mockResolvedValue({
      id: "rt1",
      usuarioId: "u1",
      usado: false,
      expiraEn: new Date(Date.now() + 60_000),
    } as any);
    usuarios.buscarPorId.mockResolvedValue({ ...usuarioBase });

    const resultado = await authService.refrescar("token-valido");

    expect(refreshTokens.marcarUsado).toHaveBeenCalledWith("rt1");
    expect(resultado.accessToken).toBeTypeOf("string");
  });

  it("revoca todas las sesiones si el refresh token ya fue usado (robo de token)", async () => {
    refreshTokens.buscarPorHash.mockResolvedValue({
      id: "rt1",
      usuarioId: "u1",
      usado: true,
      expiraEn: new Date(Date.now() + 60_000),
    } as any);

    await expect(authService.refrescar("token-reutilizado")).rejects.toMatchObject({ status: 401 });
    expect(refreshTokens.revocarTodosDeUsuario).toHaveBeenCalledWith("u1");
  });

  it("rechaza un refresh token que no existe", async () => {
    refreshTokens.buscarPorHash.mockResolvedValue(null);

    await expect(authService.refrescar("token-inexistente")).rejects.toMatchObject({ status: 401 });
  });
});
