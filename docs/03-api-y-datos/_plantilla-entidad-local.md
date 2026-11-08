# Entidad local — [Nombre de la entidad]

> **Instrucción:** copia este archivo a `docs/03-api-y-datos/entidades/<entidad>.md` para
> definir algo que la app guarda en el dispositivo (tabla, colección o clave). El almacén
> elegido se registra en un ADR. Los **tokens nunca** se guardan aquí: van en
> almacenamiento seguro. Borra los bloques «Instrucción» al terminar.

- **Almacén:** Capacitor Preferences (clave-valor) | SQLite | IndexedDB | [otro]
- **Tabla / colección / clave:** [`activos` (snake_case, plural) o `cache.activos.v1`]
- **Versión de esquema en que aparece:** [n]

> **Instrucción:** Preferences sirve para valores pequeños, como la caché de lectura de una
> lista corta, y **no cifra**: guarda en texto plano. Si necesitas consultas o volumen, usa
> SQLite.

---

## Campos

| Columna | Tipo | Nulo | Notas |
|---------|------|------|-------|
| `id` | string / int | No | Llave primaria |
| `creado_en` | timestamp | No | Se fija al insertar |
| `actualizado_en` | timestamp | No | Se fija al actualizar |
| [campo] | [tipo] | [Sí/No] | [notas] |

---

## Índices (solo SQLite)

| Índice | Columnas | Razón |
|--------|----------|-------|
| [nombre] | [columnas] | [consulta que acelera] |

---

## Relaciones

| Entidad relacionada | Llave | Cardinalidad |
|---------------------|-------|--------------|
| [entidad] | `<entidad>_id` | 1:N / N:1 |

---

## Sincronización

- **¿Se sincroniza con el backend?** Sí / No
- **Política de conflicto:** la última escritura gana | el servidor gana | combinación propia del dominio
- **¿Contiene datos personales?** Sí / No — [cuáles y por qué la app los necesita sin conexión]
- **¿Se borra al cerrar sesión?** Sí / No

---

## Notas de migración

> **Instrucción:** ¿qué migración crea o cambia esta entidad y qué pasa con los datos que ya
> existen en el dispositivo? Las migraciones solo avanzan: nunca se edita una ya publicada.
