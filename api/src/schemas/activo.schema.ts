import { z } from "zod";

export const crearActivoSchema = z.object({
  codigo: z.string().min(1),
  nombre: z.string().min(3),
  categoria: z.string().min(1),
  ubicacion: z.string().min(1).optional(),
});

export const actualizarActivoSchema = z.object({
  nombre: z.string().min(3),
  categoria: z.string().min(1),
  ubicacion: z.string().min(1).optional(),
});

export const actualizarFotoSchema = z.object({
  fotoUrl: z.string().min(1),
});

export const cambiarEstadoSchema = z.object({
  estado: z.enum(["ACTIVO", "MANTENIMIENTO", "BAJA"]),
});
