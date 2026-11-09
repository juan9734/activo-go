import { Router } from "express";
import { activoController } from "../controllers/activo.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

export const activoRouter = Router();

activoRouter.use(requireAuth);

activoRouter.get("/", activoController.listar);
activoRouter.get("/export.csv", requireRole("ADMIN"), activoController.exportarCsv);
activoRouter.get("/:id", activoController.obtener);
activoRouter.post("/", requireRole("ADMIN"), activoController.crear);
activoRouter.put("/:id", requireRole("ADMIN"), activoController.actualizar);
activoRouter.patch("/:id/estado", requireRole("ADMIN"), activoController.cambiarEstado);
activoRouter.patch("/:id/foto", requireRole("ADMIN"), activoController.actualizarFoto);
