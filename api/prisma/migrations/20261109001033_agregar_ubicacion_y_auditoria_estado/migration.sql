-- AlterTable
ALTER TABLE "activos" ADD COLUMN     "estadoActualizadoEn" TIMESTAMP(3),
ADD COLUMN     "estadoActualizadoPor" TEXT,
ADD COLUMN     "ubicacion" TEXT;
