# Capas y estado

Qué capa puede depender de cuál y qué único patrón de estado se usa en ActivoGo.

## Capas

`presentation → domain ← data`

- **presentation**: páginas y componentes de una feature (`mobile/src/features/<feature>/presentation/`).
  Habla con `domain` mediante hooks ViewModel; nunca importa `data/` ni Axios directamente.
- **domain**: entidades, casos de uso e interfaces de repositorio. TypeScript puro: no importa
  React, Ionic, Axios ni Capacitor. Es la única capa que las pruebas unitarias cubren al
  100 % de las reglas de negocio (transiciones de estado de un activo, cálculo de
  encontrados/faltantes/sobrantes).
- **data**: implementa las interfaces de `domain/` (repositorios HTTP y locales), DTO y
  mappers DTO ↔ dominio. Es la única capa que conoce la forma del JSON del API.

La regla se verifica con ESLint `no-restricted-imports`: un `import axios from "axios"` dentro
de un archivo de `domain/` hace fallar `npm run lint` (evidencia del mínimo 2).

## Patrón de estado

- **Patrón elegido:** hook ViewModel por pantalla sobre TanStack Query (ver
  [ADR-001](decisiones/registros/ADR-001-patron-de-estado.md)).
- **Dónde vive:** un hook por pantalla en `presentation/`, por ejemplo `useLoginViewModel`,
  `useListaActivosViewModel`, `useTomaFisicaViewModel`.
- **Forma del estado:** inmutable; el hook expone un objeto de fase más los datos, nunca
  mutaciones directas del estado del componente.
- **Fases comunes:** `cargando → cargado | vacío | error | offline`, iguales en toda la app.
- **Datos remotos:** TanStack Query maneja caché en memoria, reintentos y revalidación; el
  hook ViewModel traduce ese estado a las cuatro fases de arriba y llama a los casos de uso
  de `domain/`, nunca a Axios directamente.
- **Caché de lectura persistente:** cuando una pantalla necesita datos sin conexión (activos),
  el caso de uso lee primero `cache-local.port.ts` (SQLite cifrada) y TanStack Query
  revalida en segundo plano cuando hay red — ver [offline.md](../03-api-y-datos/offline.md).
