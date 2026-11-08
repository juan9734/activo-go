import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "./db/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("Activo2026!", 10);

  await prisma.usuario.upsert({
    where: { email: "admin@activogo.co" },
    update: {},
    create: {
      nombre: "Administrador ActivoGo",
      email: "admin@activogo.co",
      passwordHash,
      rol: "ADMIN",
    },
  });

  await prisma.usuario.upsert({
    where: { email: "auditor@activogo.co" },
    update: {},
    create: {
      nombre: "Auditor ActivoGo",
      email: "auditor@activogo.co",
      passwordHash,
      rol: "AUDITOR",
    },
  });

  await prisma.usuario.upsert({
    where: { email: "consulta@activogo.co" },
    update: {},
    create: {
      nombre: "Consulta ActivoGo",
      email: "consulta@activogo.co",
      passwordHash,
      rol: "CONSULTA",
    },
  });

  const activos = [
    { codigo: "ACT-001", nombre: "Portátil Dell Latitude", categoria: "Cómputo" },
    { codigo: "ACT-002", nombre: "Monitor LG 24''", categoria: "Cómputo" },
    { codigo: "ACT-003", nombre: "Impresora HP LaserJet", categoria: "Oficina" },
    { codigo: "ACT-004", nombre: "Silla ergonómica", categoria: "Mobiliario" },
    { codigo: "ACT-005", nombre: "Proyector Epson", categoria: "Audiovisual" },
    { codigo: "ACT-006", nombre: "Escritorio en L", categoria: "Mobiliario" },
    { codigo: "ACT-007", nombre: "Router Cisco", categoria: "Redes" },
    { codigo: "ACT-008", nombre: "Cámara de seguridad", categoria: "Seguridad" },
    { codigo: "ACT-009", nombre: "Aire acondicionado split", categoria: "Infraestructura" },
    { codigo: "ACT-010", nombre: "Tablet Samsung Galaxy Tab", categoria: "Cómputo" },
  ];

  for (const activo of activos) {
    await prisma.activo.upsert({
      where: { codigo: activo.codigo },
      update: {},
      create: activo,
    });
  }

  console.log("Seed completado: 3 usuarios y 10 activos.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
