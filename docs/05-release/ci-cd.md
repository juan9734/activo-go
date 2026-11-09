# CI/CD

Cómo se convierte un commit de ActivoGo en un artefacto firmado.

## Integración continua (implementada)

El flujo vive en `.github/workflows/ci.yml` y corre en cada PR y en cada push a `main`
(servicio elegido en [ADR-005](../01-arquitectura/decisiones/registros/ADR-005-ci-y-despliegue.md)):

| Job | Pasos |
|-----|-------|
| `api` | `npm ci`, `npx prisma generate`, `npm run build`, `npm test` (Vitest) |
| `mobile` | `npm ci`, `npm run lint` (ESLint con la regla de capas, verificación de tipos de e2e y Prettier), `npm run test:ci` (Vitest), `npm run build`, `npm run presupuesto` (tamaños del bundle) |

## Build de release (manual, local)

Dentro de `mobile/`:

1. `npm ci`, `npm run lint` y `npm run test:ci`.
2. `npm run build` (usa `.env.production`, con `VITE_API_URL` apuntando a una URL **HTTPS**).
3. `npm run presupuesto`.
4. `ACTIVOGO_RELEASE=1 npx cap sync android` (desactiva `allowMixedContent`).
5. `cd android && ./gradlew bundleRelease assembleRelease` (firma con `keystore.properties`).
6. Verificación: `jarsigner -verify` para el AAB y `apksigner verify --print-certs` para el APK.

## Disparador de release y reversión

- **Disparador:** etiqueta `vX.Y.Z` sobre `main` (ver
  [convenciones git](../00-gobierno/convenciones-git.md)).
- **Reversión:** se revierte el commit en `main`, se compila de nuevo con un `versionCode`
  mayor y se redistribuye; nunca se reutiliza un `versionCode`.

## Brechas declaradas

- La firma y el artefacto se generan en la máquina del responsable; el flujo de CI no firma
  porque el keystore no se guarda en secretos de GitHub en esta versión.
- La API no está desplegada en un servicio de nube: en las pruebas de release se expone la API
  local por un túnel HTTPS (ver [firma y tiendas](firma-y-tiendas.md)).
