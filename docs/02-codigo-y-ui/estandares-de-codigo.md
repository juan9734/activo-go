# Estándares de código

> Cómo se nombra el código y cómo se manejan los errores y la asincronía.

## Nombres

- Archivos: `kebab-case` (`registro-activos.page.ts`)
- Clases e interfaces: `PascalCase`
- Variables y funciones: `camelCase`
- Features: `kebab-case`, sustantivo (`registro-activos/`, no `gestionar-activos/`)

## Errores

- [Cómo se propagan y se muestran los errores de dominio vs. errores técnicos]

## Asincronía

- [Observables/Signals, cuándo usar cada uno, manejo de cancelación y errores]

## Lint y tipos

- TypeScript estricto (`strict: true`)
- `ng lint` sin advertencias nuevas (ver [definición de hecho](../00-gobierno/definicion-de-hecho.md))
