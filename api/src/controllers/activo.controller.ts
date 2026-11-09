import type { Request, Response, NextFunction } from "express";
import { activoService } from "../services/activo.service.js";
import {
  crearActivoSchema,
  actualizarActivoSchema,
  actualizarFotoSchema,
  cambiarEstadoSchema,
} from "../schemas/activo.schema.js";

export const activoController = {
  listar: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const activos = await activoService.listar();
      res.json(activos);
    } catch (err) {
      next(err);
    }
  },

  obtener: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activo = await activoService.obtener(req.params.id as string);
      res.json(activo);
    } catch (err) {
      next(err);
    }
  },

  crear: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = crearActivoSchema.parse(req.body);
      const activo = await activoService.crear(data);
      res.status(201).json(activo);
    } catch (err) {
      next(err);
    }
  },

  actualizar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = actualizarActivoSchema.parse(req.body);
      const activo = await activoService.actualizar(req.params.id as string, data);
      res.json(activo);
    } catch (err) {
      next(err);
    }
  },

  cambiarEstado: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { estado } = cambiarEstadoSchema.parse(req.body);
      const usuarioQueCambia = req.usuario!.id;
      const activo = await activoService.cambiarEstado(req.params.id as string, estado, usuarioQueCambia);
      res.json(activo);
    } catch (err) {
      next(err);
    }
  },

  actualizarFoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fotoUrl } = actualizarFotoSchema.parse(req.body);
      const activo = await activoService.actualizarFoto(req.params.id as string, fotoUrl);
      res.json(activo);
    } catch (err) {
      next(err);
    }
  },
};
