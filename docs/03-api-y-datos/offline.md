# Estrategia sin conexión

Qué pasa sin conexión en cada feature de ActivoGo (mínimo 6).

| Feature | Estrategia | Qué se cachea | Qué ve el usuario sin red |
|---------|-----------|------------------|-------------------------------|
| auth | Solo en línea | Nada (sin sesión no hay nada que mostrar) | Aviso "Sin conexión, intenta de nuevo" en `/login`; el logout local funciona igual sin red |
| activos | Caché de lectura | Lista completa de activos (planeada en SQLite cifrada, ADR-004; implementada por ahora en la caché en memoria de TanStack Query) | `/activos` muestra los últimos datos cargados sin bloquearse ni mostrar pantalla en blanco |
| tomas-fisicas | Offline-first para el registro de lecturas | Lecturas pendientes de sincronizar (SQLite cifrada) | `/tomas/:id` permite seguir escaneando; cada lectura se encola y se sincroniza automáticamente al recuperar conexión; cerrar la toma y ver el resultado sí requiere conexión |

**Estado real (verificado en el emulador, build debug, 2026-11-08):** con la lista de activos
ya cargada, se desactivó la red del emulador (`adb shell svc wifi disable` + `svc data
disable`) y se volvió a `/activos` — la lista se siguió mostrando completa desde la caché en
memoria de TanStack Query, sin errores ni pantalla en blanco (evidencia:
`evidencia-06-sin-conexion-lista-cacheada.png`).

**Brecha declarada:** esta caché es en memoria (vive mientras el proceso de la app sigue
vivo) y no muestra todavía el aviso explícito de "sin conexión" con fecha de última
sincronización descrito en el mínimo 6. La caché persistente en SQLite cifrada
(`cache-local.port.ts`, ADR-004, ya comprometida en el foro del curso) y el aviso explícito
quedan pendientes para la siguiente iteración; `tomas-fisicas` tampoco está implementada
todavía.
