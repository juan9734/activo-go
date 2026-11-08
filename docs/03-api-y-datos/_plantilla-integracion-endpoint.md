# Integración de endpoint — [Nombre]

> **Instrucción:** copia este archivo a `docs/03-api-y-datos/endpoints/<endpoint>.md` para
> documentar cómo la app consume **un** endpoint del backend. Se diligencia antes de escribir
> el repositorio que lo llama. Borra los bloques «Instrucción» al terminar.

- **Feature:** [nombre de la feature]
- **Método + ruta:** `GET /v1/activos/{id}`
- **Requiere autenticación:** Sí / No
- **Idempotente:** Sí (GET, PUT, DELETE) / No (POST, PATCH)

---

## Petición

| Parámetro | En | Tipo | Requerido | Notas |
|-----------|----|------|-----------|-------|
| `id` | ruta | string | Sí | Identificador del activo |

**Cuerpo (si lo hay):**

~~~json
{ }
~~~

---

## Respuesta

**Éxito (2xx):**

~~~json
{ "id": "…", "estado": "…", "creado_en": "…" }
~~~

**Mapeo DTO → dominio:**

| Campo del DTO | Campo del dominio | Transformación |
|---------------|-------------------|----------------|
| `estado` | `EstadoActivo` | texto → enum |
| `creado_en` | `creadoEn` | texto ISO 8601 → `Date` |

---

## Errores

| Estado | Significado | Comportamiento de la app |
|--------|-------------|--------------------------|
| 401 | Sin autenticación | El interceptor refresca el token y reintenta **una** vez; si el refresh falla, cierra sesión y va a `/login` |
| 403 | Sin permiso | Mensaje claro; no se reintenta |
| 404 | No encontrado | Estado vacío / «no existe» |
| 400 / 422 | Error de validación | Error de dominio con mensaje accionable |
| 5xx / timeout | Falla transitoria | Reintento con espera exponencial solo si es idempotente; luego error con «Reintentar» |
| Sin red | Sin conexión | Según la estrategia de abajo (caché o aviso) |

---

## Implementación

- **Interfaz del repositorio (domain):** [`ActivosRepository.obtener(id)`]
- **DTO (data):** [`ActivoDto`]
- **Mapper (data):** [`ActivoMapper.aDominio()`] — con prueba unitaria
- **Implementación (data):** [`ActivosHttpRepository`] — usa el cliente HTTP único de `core/network/`
- **Timeout aplicado:** [ms — lo pone el interceptor, no la llamada]

---

## Caché y sin conexión

- **Estrategia:** Solo en línea | Caché de lectura | Offline-first
- **Entidad en caché:** [nombre — ver `03-api-y-datos/entidades/`]
- **Vigencia e invalidación:** [cuándo se refresca la caché y cuándo se descarta]
