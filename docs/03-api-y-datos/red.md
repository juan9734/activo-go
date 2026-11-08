# Red

Cómo `mobile/` hace y reintenta las peticiones al `api/` de ActivoGo.

- **Cliente HTTP:** uno solo, Axios, instanciado en `core/network/http-client.ts` — ningún
  `data/` de ninguna feature crea su propia instancia de Axios.
- **Interceptores (en orden):**
  1. **correlation-id:** agrega un `X-Correlation-Id` único a cada petición para trazar
     errores entre `mobile/` y `api/`.
  2. **auth:** agrega el `Authorization: Bearer <token>` desde almacenamiento seguro.
  3. **refresh:** si la respuesta es 401, refresca el token una sola vez con una promesa
     compartida (evita refrescos duplicados ante dos 401 simultáneos) y reintenta la
     petición original; si el refresh falla, cierra sesión y navega a `/login`.
  4. **errores:** normaliza la respuesta a un tipo único de error (`ErrorRed`) antes de que
     llegue a `data/`.
- **Timeout:** 10 segundos, aplicado por el cliente, no por cada llamada individual.
- **Reintentos:** espera exponencial (1 s, 2 s, 4 s), solo en operaciones idempotentes
  (`GET`, `PUT`, `DELETE`); `POST` y `PATCH` nunca se reintentan automáticamente.
- **Base URL:** `http://10.0.2.2:3000` en el emulador Android durante desarrollo (ver
  [CLAUDE.md](../../CLAUDE.md)); en producción, la URL HTTPS del API desplegado.
