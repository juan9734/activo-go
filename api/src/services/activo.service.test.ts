import { describe, it, expect, vi, beforeEach } from "vitest";
import { activoService } from "./activo.service.js";
import { activoRepository } from "../repositories/activo.repository.js";

vi.mock("../repositories/activo.repository.js", () => ({
  activoRepository: {
    listar: vi.fn(),
    buscarPorId: vi.fn(),
    buscarPorCodigo: vi.fn(),
    crear: vi.fn(),
    actualizar: vi.fn(),
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
  it("permite ACTIVO -> MANTENIMIENTO y registra quién lo cambió", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "ACTIVO" } as any);
    repo.cambiarEstado.mockResolvedValue({ id: "1", estado: "MANTENIMIENTO" } as any);

    await activoService.cambiarEstado("1", "MANTENIMIENTO", "u1");

    expect(repo.cambiarEstado).toHaveBeenCalledWith("1", "MANTENIMIENTO", "u1");
  });

  it("permite MANTENIMIENTO -> ACTIVO", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "MANTENIMIENTO" } as any);
    repo.cambiarEstado.mockResolvedValue({ id: "1", estado: "ACTIVO" } as any);

    await activoService.cambiarEstado("1", "ACTIVO", "u1");

    expect(repo.cambiarEstado).toHaveBeenCalledWith("1", "ACTIVO", "u1");
  });

  it("permite ACTIVO -> BAJA", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "ACTIVO" } as any);
    repo.cambiarEstado.mockResolvedValue({ id: "1", estado: "BAJA" } as any);

    await activoService.cambiarEstado("1", "BAJA", "u1");

    expect(repo.cambiarEstado).toHaveBeenCalledWith("1", "BAJA", "u1");
  });

  it("rechaza BAJA -> ACTIVO: la baja es definitiva", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "BAJA" } as any);

    await expect(activoService.cambiarEstado("1", "ACTIVO", "u1")).rejects.toMatchObject({ status: 422 });
    expect(repo.cambiarEstado).not.toHaveBeenCalled();
  });

  it("rechaza BAJA -> MANTENIMIENTO: la baja es definitiva", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", estado: "BAJA" } as any);

    await expect(activoService.cambiarEstado("1", "MANTENIMIENTO", "u1")).rejects.toMatchObject({ status: 422 });
  });

  it("responde 404 si el activo no existe", async () => {
    repo.buscarPorId.mockResolvedValue(null);

    await expect(activoService.cambiarEstado("no-existe", "BAJA", "u1")).rejects.toMatchObject({ status: 404 });
  });
});

describe("activoService.exportarCsv", () => {
  it("arma el CSV con encabezados y los campos de cada activo", async () => {
    repo.listar.mockResolvedValue([
      {
        codigo: "ACT-001",
        nombre: "Portátil Dell",
        categoria: "Cómputo",
        ubicacion: "Piso 2",
        estado: "ACTIVO",
        responsable: "Juan",
      },
    ] as any);

    const csv = await activoService.exportarCsv();

    expect(csv).toBe(
      "codigo,nombre,categoria,ubicacion,estado,responsable\r\n" +
        "ACT-001,Portátil Dell,Cómputo,Piso 2,ACTIVO,Juan\r\n"
    );
  });

  it("neutraliza campos que empiezan con =, +, - o @ para evitar inyección de fórmulas", async () => {
    repo.listar.mockResolvedValue([
      {
        codigo: "ACT-002",
        nombre: "=HYPERLINK(\"http://evil\")",
        categoria: "+SUMA(A1:A9)",
        ubicacion: "-1+1",
        estado: "ACTIVO",
        responsable: "@usuario",
      },
    ] as any);

    const csv = await activoService.exportarCsv();
    const fila = csv.split("\r\n")[1];

    expect(fila).toBe('ACT-002,"\'=HYPERLINK(""http://evil"")",\'+SUMA(A1:A9),\'-1+1,ACTIVO,\'@usuario');
  });

  it("deja ubicación y responsable vacíos cuando son null", async () => {
    repo.listar.mockResolvedValue([
      { codigo: "ACT-003", nombre: "Router", categoria: "Redes", ubicacion: null, estado: "ACTIVO", responsable: null },
    ] as any);

    const csv = await activoService.exportarCsv();

    expect(csv).toBe("codigo,nombre,categoria,ubicacion,estado,responsable\r\nACT-003,Router,Redes,,ACTIVO,\r\n");
  });
});

describe("activoService.actualizar", () => {
  it("actualiza nombre, categoría y ubicación cuando el activo existe", async () => {
    repo.buscarPorId.mockResolvedValue({ id: "1", codigo: "ACT-001" } as any);
    repo.actualizar.mockResolvedValue({ id: "1", nombre: "Nuevo nombre" } as any);

    const datos = { nombre: "Nuevo nombre", categoria: "Cómputo", ubicacion: "Piso 2" };
    await activoService.actualizar("1", datos);

    expect(repo.actualizar).toHaveBeenCalledWith("1", datos);
  });

  it("responde 404 si el activo a editar no existe", async () => {
    repo.buscarPorId.mockResolvedValue(null);

    await expect(
      activoService.actualizar("no-existe", { nombre: "X", categoria: "Y" })
    ).rejects.toMatchObject({ status: 404 });
    expect(repo.actualizar).not.toHaveBeenCalled();
  });
});
