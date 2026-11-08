import type { NextFunction, Request, Response } from "express";

interface ErrorConEstado extends Error {
  status?: number;
}

export function errorHandler(err: ErrorConEstado, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status ?? 500;
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({ error: err.message ?? "Error interno del servidor" });
}
