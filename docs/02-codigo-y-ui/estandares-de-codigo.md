# Estándares de código

Cómo se nombra el código de `mobile/` y cómo se manejan los errores y la asincronía.

## Nombres

- Archivos: `kebab-case` (`lista-activos.page.tsx`, `use-login-view-model.ts`).
- Componentes de React: `PascalCase` (`LoginPage`, `ActivoCard`).
- Hooks: `camelCase` con prefijo `use` (`useLoginViewModel`).
- Variables y funciones: `camelCase`.
- Features: `kebab-case`, sustantivo (`tomas-fisicas/`, no `gestionar-tomas/`).

## Errores

- Los errores de dominio (regla de negocio violada, p. ej. transición de estado inválida) se
  modelan como resultados tipados que devuelve el caso de uso, no como excepciones que cruzan
  la capa `presentation/`.
- Los errores técnicos (red, timeout, 5xx) los normaliza el interceptor del cliente Axios en
  `core/network/` a un tipo único de error de red antes de llegar a `data/`.
- El hook ViewModel traduce cualquiera de los dos a la fase `"error"` con un mensaje
  accionable para el usuario.

## Asincronía

- Los datos remotos se manejan con TanStack Query dentro de los hooks ViewModel de
  `presentation/`; `domain/` expone casos de uso con `Promise`, sin depender de la librería.
- Las suscripciones y efectos usan `useEffect` solo para sincronizar con el mundo exterior
  (plugins nativos, listeners); nunca para orquestar lógica de negocio.

## Lint y tipos

- TypeScript estricto (`strict: true`) en `mobile/tsconfig.json`.
- `npm run lint` (ESLint) sin advertencias nuevas, incluida la regla `no-restricted-imports`
  que impide que `domain/` importe React, Axios o Capacitor (mínimo 2).
- `npm run test:ci` (Vitest) en verde antes de cualquier PR (ver
  [definición de hecho](../00-gobierno/definicion-de-hecho.md)).
