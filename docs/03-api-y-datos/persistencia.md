# Persistencia

Qué guarda `mobile/` localmente y cómo migran sus datos.

- **Almacén para datos de solo caché (activos, lecturas pendientes):** SQLite cifrada,
  detrás del puerto `cache-local.port.ts` (ver [ADR-004](../01-arquitectura/decisiones/registros/)
  — registro pendiente en 12.2, ya comprometido públicamente en el foro del curso).
- **Almacenamiento seguro (tokens):** `@aparajita/capacitor-secure-storage` — nunca
  Preferences ni `localStorage`, porque ninguno de los dos cifra su contenido.
- **Entidades locales:** ver [entidades/](entidades/) — por ahora, `activos` (caché de
  lectura) y `lecturas_pendientes` (cola offline-first de tomas físicas).
- **Migraciones:** solo avanzan, nunca se edita una migración ya publicada; cada migración de
  SQLite se numera y se documenta en la ficha de la entidad que crea o modifica.
- **Borrado:** toda la caché SQLite y los tokens se eliminan al cerrar sesión o al cambiar de
  cuenta en el mismo dispositivo (ver [reglas-de-seguridad.md](../00-gobierno/reglas-de-seguridad.md)).
