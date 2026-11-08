import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authRouter } from "./routes/auth.routes.js";
import { activoRouter } from "./routes/activo.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const ORIGENES_PERMITIDOS = ["https://localhost", "capacitor://localhost", "http://localhost"];

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ORIGENES_PERMITIDOS,
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ estado: "ok" });
});

app.use("/auth", authRouter);
app.use("/activos", activoRouter);

app.use(errorHandler);
