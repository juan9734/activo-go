# ADR-001 — Patrón de estado

- **ID:** ADR-001
- **Fecha:** 2026-11-08
- **Estado:** Aceptado
- **Autores:** Juan Diego Ninco Collazos

---

## Contexto

ActivoGo es una app Ionic React con pantallas que dependen de datos remotos (activos, tomas
físicas) y que deben funcionar sin conexión (mínimo 6). El curso exige un único patrón de
estado documentado en ADR, consistente en toda la app, y una regla de capas donde
`domain/` no puede depender de React ni de bibliotecas de red. Se necesita decidir ahora,
antes de escribir la primera pantalla (`/login`), porque todas las features siguientes
replican el mismo patrón.

**Restricciones conocidas:**
- Un solo integrante activo en el proyecto; el patrón debe ser simple de aplicar de forma
  consistente sin coordinación de equipo.
- Plazo de entrega muy ajustado: se prioriza un patrón con poca fricción de código repetido.
- Debe funcionar bien con caché de lectura offline (mínimo 6) y con Capacitor.

---

## Decisión

**Decidimos:** usar un hook ViewModel por pantalla (`use<Pantalla>ViewModel`) que envuelve
TanStack Query para los datos remotos y expone un objeto de estado inmutable con cuatro fases
(`cargando`, `cargado`, `vacío`, `error`/`offline`) a la capa `presentation/`.

**Justificación:** TanStack Query ya resuelve caché en memoria, reintentos y revalidación en
segundo plano sin escribir ese código a mano, y aislar su uso dentro de un hook por pantalla
(en vez de llamarlo directo desde los componentes) mantiene la regla de capas: `domain/`
sigue sin saber que React o TanStack Query existen, porque el hook solo invoca casos de uso
de `domain/`. El criterio que desempató fue el tiempo disponible: es el patrón con menos
código de infraestructura por escribir a mano en el plazo del curso.

---

## Alternativas evaluadas

| Alternativa | A favor | En contra | Razón para descartarla |
|-------------|---------|-----------|-------------------------|
| Hook ViewModel sobre TanStack Query — elegida | Caché, reintentos y revalidación ya resueltos; poco código propio | Una dependencia externa más | — (elegida) |
| Context + `useReducer` a mano, sin librería | Cero dependencias externas | Hay que reescribir caché, reintentos y revalidación a mano; mayor riesgo de bugs con el tiempo disponible | Demasiado código de infraestructura para el plazo del curso |
| Zustand (store global) | Buena ergonomía, poco boilerplate | Estado global no encaja bien con pantallas que piden datos por `id` (p. ej. detalle de activo); mezclaría estado de UI con estado de servidor | No resuelve mejor el caso de datos remotos por pantalla que TanStack Query |

---

## Consecuencias

**Positivas:**
- Toda pantalla sigue la misma forma de estado (cuatro fases), lo que simplifica las
  pruebas de componente y la revisión de PR.
- La regla de capas se puede verificar automáticamente con ESLint `no-restricted-imports`
  porque TanStack Query y Axios solo se tocan desde `presentation/` y `data/`, nunca desde
  `domain/`.

**Negativas / costos asumidos:**
- Se agrega TanStack Query como dependencia de `presentation/`; cualquier cambio en su API
  obliga a revisar todos los hooks ViewModel.
- Los dobles de prueba de `src/testing/` deben simular el cliente de TanStack Query a mano
  (sin `vi.fn`), lo que agrega algo de código de prueba repetido.

**Impacto en el sistema:**
- Features y pantallas afectadas: todas (auth, activos, tomas-fisicas).
- Documentos que se actualizan: [capas-y-estado.md](../../capas-y-estado.md) y cada ficha de
  feature en [features/](../../features/).
- Cómo se verifica en el código: todo hook `use*ViewModel` en `presentation/` expone las
  cuatro fases; la regla de capas se verifica con la configuración de ESLint
  `no-restricted-imports` en `mobile/eslint.config.js`.

---

## Referencias

- TanStack Query. (2026). *Documentación oficial*. https://tanstack.com/query
- Traducción oficial del curso Angular → React, registrada en `CLAUDE.md`.
- Relacionado con: ADR-002 (persistencia local, pendiente) y ADR-004 (caché SQLite cifrada,
  pendiente).
