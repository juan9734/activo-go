import { describe, it, expect, vi, beforeEach } from "vitest";
import { activoService } from "./activo.service.js";
import { activoRepository } from "../repositories/activo.repository.js";

vi.mock("../repositories/activo.repository.js", () => ({
  activoRepository: {
    listar: vi.fn(),
    buscarPorId: vi.fn(),
    buscarPorCodigo: vi.fn(),
    crear: vi.fn(),
    actualizarFoto: vi.fn(),
    cambiarEstado: vi.fn(),
  },
}));

const repo = vi.mocked(activoRepository);

beforeEach(() => {
  vi.resetAllMocks();
});

describe("activoService.crear", () => {
  it("crea el activo cuando el código no existe todavía", async () => {
    repo.buscarPorCodigo.mockResolvedValue(null);
    repo.crear.mockResolvedValue({ id: "1", codigo: "ACT-999" } as any);

    const resultado = await activoService.crear({ codigo: "ACT-999", nombre: "Mouse", categoria: "Cómputo" });

    expect(repo.crear).toHaveBeenCalledWith({ codigo: "ACT-999", nombre: "Mouse", categoria: "Cómputo" });
    expect(resultado).toEqual({ id: "1", codigo: "ACT-999" });
  });

  it("rechaza con 409 cuando el código ya existe (código de activo único)", async () => {
    repo.buscarPorCodigo.mockResolvedValue({ id: "1", codigo: "ACT-001" } as any);

    await expect(
      activoService.crear({ codigo: "ACT-001", nombre: "Duplicado", categoria: "Cómputo" })
    ).rejects.toMatchObject({ status: 409 });
    expect(repo.crear).not.toHaveBeenCalled();
  });
});

describe("activoService.cambiarEstado — reglas de transición", () => {
  it("permite ACTIVO -> MANTENIMIENTO", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "ACTIVO" } as any);
    repo.cambiarEstado.mockResolvedValue({ id: "1", estado: "MANTENIMIENTO" } as any);

    await activoService.cambiarEstado("1", "MANTENIMIENTO");

    expect(repo.cambiarEstado).toHaveBeenCalledWith("1", "MANTENIMIENTO");
  });

  it("permite MANTENIMIENTO -> ACTIVO", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "MANTENIMIENTO" } as any);
    repo.cambiarEstado.mockResolvedValue({ id: "1", estado: "ACTIVO" } as any);

    await activoService.cambiarEstado("1", "ACTIVO");

    expect(repo.cambiarEstado).toHaveBeenCalledWith("1", "ACTIVO");
  });

  it("permite ACTIVO -> BAJA", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "ACTIVO" } as any);
    repo.cambiarEstado.mockResolvedValue({ id: "1", estado: "BAJA" } as any);

    await activoService.cambiarEstado("1", "BAJA");

    expect(repo.cambiarEstado).toHaveBeenCalledWith("1", "BAJA");
  });

  it("rechaza BAJA -> ACTIVO: la baja es definitiva", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "BAJA" } as any);

    await expect(activoService.cambiarEstado("1", "ACTIVO")).rejects.toMatchObject({ status: 422 });
    expect(repo.cambiarEstado).not.toHaveBeenCalled();
  });

  it("rechaza BAJA -> MANTENIMIENTO: la baja es definitiva", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "BAJA" } as any);

    await expect(activoService.cambiarEstado("1", "MANTENIMIENTO")).rejects.toMatchObject({ status: 422 });
  });

  it("responde 404 si el activo no existe", async () => {
    repo.buscarPorId.mockResolvedValue(null);

    await expect(activoService.cambiarEstado("no-existe", "BAJA")).rejects.toMatchObject({ status: 404 });
  });
});
