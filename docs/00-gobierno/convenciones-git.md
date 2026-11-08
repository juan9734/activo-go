# Convenciones git

## Ramas

- Desarrollo basado en tronco: ramas cortas que salen de `main` y vuelven a `main`.
- Nombres: `feat/<alcance>`, `fix/<alcance>`, `docs/<alcance>`, `test/<alcance>`,
  `chore/<alcance>`.
  - Ejemplos: `feat/activos-formulario`, `fix/auth-refresh-token`, `docs/adr-estado`.
- Una rama vive pocos días. Actualízala con `main` antes de abrir el PR.

## Commits

- [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):
  `tipo(alcance): resumen`.
- Tipos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `build`, `ci`.
- Resumen en imperativo, sin punto final, de 72 caracteres como máximo.
  - Ejemplo: `feat(auth): refrescar el token al recibir 401`.
- SDD en el historial: los commits `docs(...)` de una feature van **antes** que sus
  `feat(...)`.

## Pull requests

- Un PR = una historia o una corrección. Que se pueda revisar (menos de ~400 líneas).
- La descripción enlaza la historia (`HU-NN`) y dice qué probar en el dispositivo.
- El CI debe estar en verde (lint + pruebas unitarias) antes de pedir revisión.
- Lo aprueba el otro integrante. Se integra con *squash merge* a `main`.

## Versiones

- La versión sigue [SemVer](https://semver.org/lang/es/): `MAYOR.MENOR.PARCHE`. Se refleja
  en `mobile/package.json` y en `versionName` de `mobile/android/app/build.gradle`.
- El número de build (`versionCode`) es un entero que solo crece: sube en cada artefacto que
  se distribuye y nunca se reutiliza.
- Cada release se etiqueta `vX.Y.Z` sobre `main`; la etiqueta dispara el flujo de release
  si existe.

## Lo que nunca entra al repositorio

Ver el [`.gitignore`](../../.gitignore) de la raíz del repositorio: `node_modules/`,
artefactos de build (`dist/`, `build/`, `mobile/android/app/build/`, `mobile/www/`),
secretos (`.env`, `mobile/android/keystore.properties`) y lo relacionado con la firma
(`*.jks`, `*.keystore`, `*.aab`, `*.apk`).

> La carpeta `mobile/android/` **sí** se versiona: con Capacitor, el proyecto nativo es
> código fuente. Lo que no se versiona es la llave con la que se firma.
