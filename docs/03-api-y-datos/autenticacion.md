# Autenticación

Dónde viven los tokens de ActivoGo y cómo se refrescan.

- **Flujo:** `POST /auth/login` con usuario y contraseña devuelve un access token de vida
  corta y un refresh token rotativo.
- **Almacenamiento del token:** `@aparajita/capacitor-secure-storage`, nunca Preferences ni
  `localStorage` — ver [persistencia.md](persistencia.md).
- **Refresh:** `POST /auth/refresh`; el interceptor de `core/network/` lo dispara en un 401,
  serializado con una promesa compartida para que dos peticiones con 401 simultáneo generen
  un solo refresh, y reintenta la petición original una única vez.
- **Rotación y detección de reuso:** cada refresh invalida el refresh token anterior y emite
  uno nuevo; si se presenta un refresh token ya usado, el API revoca todas las sesiones
  activas del usuario (señal de robo de token).
- **Si el refresh falla:** se borran los tokens y la caché local, y se navega a `/login`.
- **Bloqueo por intentos fallidos:** `POST /auth/login` responde `423` tras 3 intentos
  fallidos consecutivos; el mensaje no revela si el usuario existe.
- **Rutas protegidas:** `authGuard` y `roleGuard` en
  [navegacion.md](../01-arquitectura/navegacion.md).
