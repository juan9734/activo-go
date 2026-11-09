import { ActivosHttpRepository } from '../../features/activos/data/activos-http.repository';
import { SesionHttpRepository } from '../../features/auth/data/sesion-http.repository';
import { CamaraCapacitorAdapter } from '../nativo/camara.capacitor.adapter';
import { EscanerQrMlKitAdapter } from '../nativo/escaner.mlkit.adapter';
import { ExportadorCsvCapacitorAdapter } from '../nativo/exportador-csv.capacitor.adapter';

// Única raíz de composición: aquí, y solo aquí, se eligen las implementaciones concretas.
export const sesionRepository = new SesionHttpRepository();
export const activosRepository = new ActivosHttpRepository();
export const capturaFoto = new CamaraCapacitorAdapter();
export const escanerQr = new EscanerQrMlKitAdapter();
export const exportadorCsv = new ExportadorCsvCapacitorAdapter();
