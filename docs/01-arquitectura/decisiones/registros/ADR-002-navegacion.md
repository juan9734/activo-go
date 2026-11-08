# ADR-002 — Navegación

- **ID:** ADR-002
- **Fecha:** 2026-11-08
- **Estado:** Aceptado
- **Autores:** Juan Diego Ninco Collazos

---

## Contexto

ActivoGo tiene tres roles (ADMIN, AUDITOR, CONSULTA) con acceso distinto a las pantallas, y
rutas que requieren sesión activa. El curso exige una tabla de rutas central con guard
(mínimo 4), y la app usa React Router dentro de Ionic React (`@ionic/react-router`). Hay que
decidir, antes de escribir la segunda pantalla, dónde vive esa tabla y cómo se protege cada
ruta, para no terminar con comprobaciones de sesión repetidas dentro de cada página.

**Restricciones conocidas:**
- React Router no impone una estructura de rutas como el Router de Angular; se define por
  convención del equipo (en este caso, un solo integrante).
- El estado de sesión vive en memoria (`SesionContext`) mientras no se restaure al reabrir
  la app (brecha declarada en otra parte del proyecto), así que el guard debe tratar
  "todavía no se sabe si hay sesión" como un estado distinto de "no hay sesión".

---

## Decisión

**Decidimos:** una única tabla de rutas en `mobile/src/app/routes.tsx`, con un componente
`AuthGuard` que envuelve las rutas protegidas y lee el estado de `SesionContext`
(`usuario`, `cargandoInicial`).

**Justificación:** centralizar las rutas en un solo archivo permite que `navegacion.md` se
compare directamente contra el código (lo que pide el mínimo 4), y un guard por componente
(en vez de lógica de redirección dispersa en cada página) evita que una pantalla nueva
olvide comprobar la sesión.

---

## Alternativas evaluadas

| Alternativa | A favor | En contra | Razón para descartarla |
|-------------|---------|-----------|-------------------------|
| Tabla central + `AuthGuard` por componente — elegida | Un solo lugar que comparar con `navegacion.md`; la regla de protección no se puede olvidar por pantalla | El guard debe conocer `SesionContext` | — (elegida) |
| Comprobar la sesión dentro de cada página (`useEffect` + `navigate`) | Simple de escribir en una sola pantalla | Se repite en cada pantalla nueva; fácil de olvidar; no hay un solo lugar que comparar con `navegacion.md` | Viola la relación 1 a 1 que pide el mínimo 4 entre la tabla documentada y el código |
| Librería de enrutamiento con guards declarativos (p. ej. `react-router` *loaders* con redirect) | Patrón más "oficial" de React Router moderno | Más código de configuración para un proyecto de este tamaño; `@ionic/react-router` no expone esa API de forma directa | No aporta beneficio proporcional al esfuerzo en el plazo disponible |

---

## Consecuencias

**Positivas:**
- `navegacion.md` se puede verificar ruta por ruta contra `routes.tsx` sin ambigüedad.
- Agregar una pantalla protegida nueva es declarar una `<Route>` dentro de `<AuthGuard>`,
  no escribir lógica de redirección nueva.

**Negativas / costos asumidos:**
- Mientras la sesión no se restaure al reabrir la app (brecha declarada), `AuthGuard`
  manda a `/login` incluso con un token todavía válido en almacenamiento seguro — el usuario
  debe autenticarse de nuevo tras perder el proceso.

**Impacto en el sistema:**
- Features y pantallas afectadas: todas las que requieren sesión (`/activos`,
  `/activos/:id/foto`).
- Documentos que se actualizan: `docs/01-arquitectura/navegacion.md`.
- Cómo se verifica en el código: `mobile/src/app/routes.tsx` (componente `AuthGuard`) y
  `mobile/src/core/sesion/SesionContext.tsx`.

---

## Referencias

- React Router. (s. f.). *React Router documentation*. https://reactrouter.com
- Ionic. (s. f.-d). *Ionic React documentation*. https://ionicframework.com/docs/react
- Relacionado con: ADR-001 (patrón de estado).
