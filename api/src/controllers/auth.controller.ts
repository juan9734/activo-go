import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import { loginSchema, refreshSchema } from "../schemas/auth.schema.js";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const resultado = await authService.login(email, password);
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = refreshSchema.parse(req.body);
      const resultado = await authService.refrescar(refreshToken);
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.usuario) await authService.logout(req.usuario.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
