# Pantalla — Lista de activos

- **Ruta:** `/activos`
- **Feature:** activos
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-04 y HU-11.

---

## Propósito

El usuario ve el inventario de activos fijos, con sus datos principales (código, nombre,
estado), incluso sin conexión a internet.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | Título "Activos", buscador, botón "Cerrar sesión" |
| Cuerpo | `IonList` con `IonItem` por activo | Código, nombre y chip de estado (ACTIVO/MANTENIMIENTO/BAJA) |
| Pie / acción principal | `IonFab` "+" (solo ADMIN) | Navega a `/activos/nuevo` |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Primera carga de la lista | `IonSkeletonText` x5 |
| Cargado | Datos del API listos | Lista completa |
| Vacío | Inventario sin activos | Mensaje "Aún no hay activos" + botón "Registrar el primero" (ADMIN) |
| Error | Falló la petición | Mensaje + botón "Reintentar" |
| Sin conexión | Sin red | Lista desde caché + aviso "Sin conexión, datos de [fecha de última sincronización]" |

---

## Formulario

No aplica.

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Toca un activo | Navega a `/activos/:id` | — |
| Toca "+" (ADMIN) | Navega a `/activos/nuevo` | — |
| Desliza para refrescar | Vuelve a pedir la lista al API | `ListarActivos` |

---

## Permisos

No aplica.

---

## Accesibilidad

- [x] Cada ítem de la lista es anunciable (código + nombre + estado) por el lector de pantalla.
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA, incluidos los chips de estado.
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
