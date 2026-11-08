# Pantalla — Detalle de activo

- **Ruta:** `/activos/:id`
- **Feature:** activos
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-07 y HU-08.

---

## Propósito

El usuario consulta los datos completos de un activo: estado, responsable actual, historial
de asignaciones y su foto de evidencia si existe.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | Botón atrás, nombre del activo |
| Cuerpo | `IonCard` (datos) + `IonList` (historial de asignaciones) + foto si existe | — |
| Pie / acción principal | `IonButton` "Editar" / "Cambiar estado" (solo ADMIN) | Navega a `/activos/:id/editar` |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Carga del detalle | `IonSkeletonText` |
| Cargado | Datos listos | Tarjeta con datos, estado e historial |
| Vacío | No aplica (el activo siempre tiene al menos un estado) | — |
| Error | Activo no encontrado o falla de red | Mensaje + botón "Reintentar" o "Volver" |
| Sin conexión | Sin red | Datos desde caché con aviso "sin conexión"; botones de escritura deshabilitados |

---

## Formulario

No aplica (ver [formulario-activo.md](formulario-activo.md)).

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Toca "Editar" (ADMIN) | Navega a `/activos/:id/editar` | — |
| Toca "Tomar foto" (ADMIN) | Navega a `/activos/:id/foto` | — |
| Toca "Asignar" (ADMIN) | Abre el selector de responsable | `AsignarActivo` |

---

## Permisos

No aplica directamente; la captura de foto se pide en
[captura-foto.md](captura-foto.md).

---

## Accesibilidad

- [x] El estado del activo se anuncia por texto, no solo por color.
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA.
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
