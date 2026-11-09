# Navegación

Tabla de rutas (espejo exacto de `mobile/src/app/routes.tsx`) y guard. ActivoGo tiene tres
roles: **ADMIN** (escribe), **AUDITOR** (opera tomas físicas) y **CONSULTA** (solo lee).

## Rutas implementadas (v1.0.0)

| Ruta | Pantalla | Feature | Guard | Parámetros |
|------|----------|---------|-------|------------|
| `/login` | Login | auth | — (pública) | — |
| `/activos` | Lista de activos | activos | `AuthGuard` | — |
| `/activos/nuevo` | Formulario de activo (crear) | activos | `AuthGuard` | — |
| `/activos/escanear` | Escanear código QR | activos | `AuthGuard` | — |
| `/activos/:id/editar` | Formulario de activo (editar) | activos | `AuthGuard` | `id` |
| `/activos/:id/foto` | Captura de foto del activo | activos | `AuthGuard` | `id` |
| `/activos/:id` | Detalle de activo | activos | `AuthGuard` | `id` |
| `/` | Redirección a `/activos` | — | — | — |

## Guard

- **`AuthGuard`** (definido en `routes.tsx`): si la sesión aún se está resolviendo no pinta
  nada; si no hay usuario autenticado, redirige a `/login` (`replace`). Toda ruta salvo
  `/login` pasa por él (mínimo 4).
- **Roles:** no hay un guard de rol en el cliente. La interfaz oculta las acciones de
  escritura según `usuario.rol` (por ejemplo, solo ADMIN ve crear, editar, cambiar estado,
  foto y exportar CSV; ADMIN y AUDITOR ven el escáner) y **la API responde 403** a quien no
  tenga permiso. La regla se aplica siempre en el servidor; el cliente solo evita mostrar
  botones que fallarían.
- **Brecha declarada:** una ruta de escritura abierta de forma directa por un usuario
  CONSULTA se renderiza, pero cualquier intento de guardar es rechazado por la API.

## Rutas planeadas, no implementadas en v1.0.0

| Ruta | Pantalla | Estado |
|------|----------|--------|
| `/tomas`, `/tomas/nueva`, `/tomas/:id`, `/tomas/:id/resultado` | Tomas físicas (HU-10) | Planeadas; ver [tomas-fisicas.md](features/tomas-fisicas.md) |
| `/perfil` | Perfil y cierre de sesión | Planeada; el cierre de sesión hoy está en la barra de `/activos` |

La tabla de rutas implementadas debe coincidir exactamente con `routes.tsx`; cualquier
cambio de rutas actualiza este documento en el mismo PR.
