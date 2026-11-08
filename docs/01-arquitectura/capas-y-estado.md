# Capas y estado

> Qué capa puede depender de cuál y qué único patrón de estado se usa.

## Capas

`presentation → domain ← data`

- **presentation**: páginas y componentes de una feature. Habla con `domain`, nunca
  directamente con `data`.
- **domain**: entidades, casos de uso e interfaces de repositorio. No importa Angular,
  `HttpClient` ni Capacitor.
- **data**: implementaciones de repositorio, DTO, mappers y fuentes remota/local. Implementa
  las interfaces de `domain`.

## Patrón de estado

- **Patrón elegido:** [ver ADR-001 — Patrón de estado]
- **Dónde vive:** un *state holder* (ViewModel) por pantalla
- **Forma del estado:** inmutable, expuesto como [Signal / Observable]
- **Transiciones comunes:** cargando → cargado | vacío | error | sin conexión
