# Navegación

Tabla de rutas (espejo de `mobile/src/app/routes.tsx`) y guards. ActivoGo tiene tres roles:
**ADMIN** (escribe), **AUDITOR** (opera tomas físicas), **CONSULTA** (solo lee).

| Ruta | Pantalla | Feature | Guard | Parámetros |
|------|----------|---------|-------|------------|
| `/login` | Login | auth | — (pública) | — |
| `/activos` | Lista de activos | activos | `authGuard` | — |
| `/activos/nuevo` | Formulario de activo (crear) | activos | `authGuard` + `roleGuard(ADMIN)` | — |
| `/activos/:id` | Detalle de activo | activos | `authGuard` | `id` |
| `/activos/:id/editar` | Formulario de activo (editar) | activos | `authGuard` + `roleGuard(ADMIN)` | `id` |
| `/activos/:id/foto` | Captura de foto del activo | activos | `authGuard` + `roleGuard(ADMIN)` | `id` |
| `/tomas` | Lista de tomas físicas | tomas-fisicas | `authGuard` + `roleGuard(AUDITOR, ADMIN)` | — |
| `/tomas/nueva` | Crear toma física | tomas-fisicas | `authGuard` + `roleGuard(AUDITOR, ADMIN)` | — |
| `/tomas/:id` | Escaneo y registro de lecturas | tomas-fisicas | `authGuard` + `roleGuard(AUDITOR, ADMIN)` | `id` |
| `/tomas/:id/resultado` | Resultado y cierre de la toma | tomas-fisicas | `authGuard` + `roleGuard(AUDITOR, ADMIN)` | `id` |
| `/perfil` | Perfil y cerrar sesión | auth | `authGuard` | — |

## Guards

- **`authGuard`:** exige un token de acceso válido en almacenamiento seguro; si no hay
  sesión (o el refresh falló), redirige a `/login`.
- **`roleGuard(roles)`:** exige que el usuario autenticado tenga uno de los roles indicados;
  si no lo tiene, oculta la acción en la interfaz y, si intenta entrar directo a la ruta,
  redirige a `/activos` con un aviso. La regla se duplica en el API (403), nunca se confía
  solo en el cliente.
- **CONSULTA** puede entrar a `/activos` y `/activos/:id` (sin botones de escritura) y a
  `/perfil`; no tiene acceso a `/tomas*` ni a las rutas de creación/edición de activos.

Toda ruta protegida pasa por `authGuard`; las rutas de escritura además pasan por
`roleGuard`. La tabla de arriba debe coincidir exactamente con `mobile/src/app/routes.tsx`
(mínimo 4).
