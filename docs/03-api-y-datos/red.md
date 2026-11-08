# Red

> Cómo se hacen y reintentan las peticiones.

- **Cliente HTTP:** uno solo, en `core/network/` — ningún `HttpClient` se usa directo desde
  `data/` sin pasar por él.
- **Interceptores:** [token/refresh, timeout, manejo de errores]
- **Timeout:** [ms]
- **Reintentos:** espera exponencial, solo en operaciones idempotentes (GET, PUT, DELETE)
