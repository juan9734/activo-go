import { SesionHttpRepository } from '../../features/auth/data/sesion-http.repository';
import { ActivosHttpRepository } from '../../features/activos/data/activos-http.repository';
import { CamaraCapacitorAdapter } from '../nativo/camara.capacitor.adapter';

// Única raíz de composición: aquí, y solo aquí, se eligen las implementaciones concretas.
export const sesionRepository = new SesionHttpRepository();
export const activosRepository = new ActivosHttpRepository();
export const capturaFoto = new CamaraCapacitorAdapter();
