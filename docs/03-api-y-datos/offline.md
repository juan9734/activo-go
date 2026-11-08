# Estrategia sin conexión

Qué pasa sin conexión en cada feature de ActivoGo (mínimo 6).

| Feature | Estrategia | Qué se cachea | Qué ve el usuario sin red |
|---------|-----------|------------------|-------------------------------|
| auth | Solo en línea | Nada (sin sesión no hay nada que mostrar) | Aviso "Sin conexión, intenta de nuevo" en `/login`; el logout local funciona igual sin red |
| activos | Caché de lectura | Lista completa de activos (SQLite cifrada) | `/activos` muestra los últimos datos con la fecha de la última sincronización; crear/editar/cambiar estado queda deshabilitado con aviso |
| tomas-fisicas | Offline-first para el registro de lecturas | Lecturas pendientes de sincronizar (SQLite cifrada) | `/tomas/:id` permite seguir escaneando; cada lectura se encola y se sincroniza automáticamente al recuperar conexión; cerrar la toma y ver el resultado sí requiere conexión |

**Demo del mínimo 6:** desde `/activos` con datos ya cargados, se activa el modo avión del
emulador y se reabre la pantalla — debe mostrar la lista cacheada con el aviso de "sin
conexión" y la fecha de última sincronización, sin que la app se bloquee ni muestre una
pantalla en blanco.
