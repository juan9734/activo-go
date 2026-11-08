# Autenticación

> Dónde viven los tokens y cómo se refrescan.

- **Flujo:** [p. ej. usuario/contraseña → access token + refresh token]
- **Almacenamiento del token:** almacenamiento seguro — ver [persistencia.md](persistencia.md)
- **Refresh:** el interceptor de `core/network/` refresca en un 401 y reintenta la petición
  **una** vez
- **Si el refresh falla:** cierra sesión y redirige a `/login`
- **Rutas protegidas:** guard en [navegacion.md](../01-arquitectura/navegacion.md)
