# ActivoGo

App híbrida de inventario de activos fijos.
Monorepo: `mobile/` (Ionic React + Capacitor) y `api/` (Node + Express 5 + TypeScript + Prisma 7 + PostgreSQL).
Proyecto de aula del curso Ingeniería para el Desarrollo Móvil (CORHUILA, 2026-B).

## Método (SDD)
- Primero el documento en `docs/` (commit `docs(...)`), después el código (commit `feat(...)`).
- Las plantillas están en `docs/**/_plantilla-*.md` o en el paquete del curso: se copian y renombran, nunca se editan.
- Ningún documento queda con corchetes sin llenar ni bloques "Instrucción". Todo con datos reales de ActivoGo.
- Si cambia el código, actualice la ficha, `navegacion.md` y los ADR afectados en el mismo PR.

## Arquitectura móvil (`mobile/src/`)
- `features/<feature>/{domain,data,presentation}`; ninguna feature importa de otra.
- `domain/` es TypeScript puro: sin React, Ionic, Axios ni Capacitor.
- `presentation/` usa solo casos de uso mediante hooks ViewModel; nunca HTTP, `data/` ni plugins.
- Solo `src/core/di/` conoce implementaciones concretas.
- Solo los adaptadores de `src/core/nativo/` importan plugins de Capacitor (cámara y escáner QR), detrás de puertos.
- Un único cliente Axios con interceptores: correlation-id, errores, auth, timeout.
- Refresh serializado con una promesa compartida y un único reintento.
- Tokens solo en almacenamiento seguro (`@aparajita/capacitor-secure-storage`); nunca en Preferences ni localStorage.
- Caché de lectura detrás de `cache-local.port.ts` (SQLite cifrada, ADR-004); se borra al cerrar sesión o cambiar de cuenta.
- Estado: hook ViewModel por pantalla con fases cargando/cargado/vacío/error/offline sobre TanStack Query.
- Rutas en una sola tabla `src/app/routes.tsx` con guard; `docs/01-arquitectura/navegacion.md` debe coincidir.
- La regla de capas se verifica con ESLint `no-restricted-imports`.
- Pruebas con dobles escritos a mano en `src/testing/` (sin vi.fn ni mocks automáticos).

## Reglas de negocio (API)
- Código de activo único.
- Transiciones: ACTIVO <-> MANTENIMIENTO; ACTIVO/MANTENIMIENTO -> BAJA (definitiva).
- Asignaciones con historial; la baja libera al responsable.
- Toma física: calcula encontrados, faltantes y sobrantes al cerrar.
- Tres logins fallidos bloquean la cuenta temporalmente.
- Refresh token rotativo con detección de reutilización.
- Roles: ADMIN escribe, AUDITOR opera tomas, CONSULTA solo lee.

## Calidad y release
- `npm run lint` y `npm run test:ci` en verde antes de cualquier PR.
- Cobertura mínima 80 % en `domain/` y en ViewModels, reportada por carpeta.
- Presupuestos: bundle inicial aviso 1,5 MB y error 2 MB; pantallas perezosas < 50 kB; arranque en frío <= 2 s (mediana de 5).
- Versión SemVer en `package.json` y `versionName`; `versionCode` solo crece.
- El keystore y `keystore.properties` NUNCA entran a Git; la contraseña no se imprime ni se pega en chats.
- Release: `usesCleartextTraffic="false"`, `allowBackup="false"`, API por HTTPS. El texto plano solo en `src/debug/AndroidManifest.xml`.

## Convenciones
- Conventional Commits (`feat`, `fix`, `docs`, `chore`, `test`, `refactor`, `perf`, `build`), resumen en imperativo de 72 caracteres o menos.
- Una rama por tarea (`feat/...`, `docs/...`), un PR por historia, squash merge a `main`.
- Textos de UI, comentarios y documentación en español.

## Entorno
- Desde el emulador Android el API de desarrollo está en `http://10.0.2.2:3000`.
- CORS permitido: `https://localhost` (Android) y `capacitor://localhost` (iOS).
- Las pruebas de integración de la API usan `DATABASE_URL_TEST`.
