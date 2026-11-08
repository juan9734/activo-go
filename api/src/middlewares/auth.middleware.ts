import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type Rol = "ADMIN" | "AUDITOR" | "CONSULTA";

export interface UsuarioAutenticado {
  id: string;
  rol: Rol;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioAutenticado;
    }
  }
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "dev-access-secret-cambiar-en-produccion";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autenticado" });
  }
  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, ACCESS_SECRET) as UsuarioAutenticado;
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export { ACCESS_SECRET };
