# Pantalla — Formulario de activo

- **Ruta:** `/activos/nuevo` (crear) y `/activos/:id/editar` (editar)
- **Feature:** activos
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-05 y HU-07.

---

## Propósito

El ADMIN registra un activo nuevo o edita uno existente, incluido el cambio de estado
(ACTIVO, MANTENIMIENTO, BAJA) respetando las transiciones válidas.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | "Nuevo activo" o "Editar activo", botón atrás |
| Cuerpo | Formulario reactivo | Código, nombre, categoría, estado (`IonSelect`) |
| Pie / acción principal | `IonButton` "Guardar" | Deshabilitado mientras se envía |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Guardando el activo | Botón "Guardar" con `IonSpinner` |
| Cargado | Guardado exitoso | Navega a `/activos/:id` con un `IonToast` de confirmación |
| Vacío | No aplica | — |
| Error | Código duplicado o transición de estado inválida | `IonText color="danger"` con el mensaje específico del API |
| Sin conexión | Sin red | Botón "Guardar" deshabilitado con aviso "Necesitas conexión para guardar" |

---

## Formulario

| Campo | Tipo | Validaciones (`zod`) | Mensaje de error |
|-------|------|------------------------|---------------------|
| Código | texto | `required`, único (validado en el API) | "Ya existe un activo con ese código" |
| Nombre | texto | `required`, `minLength(3)` | "El nombre debe tener al menos 3 caracteres" |
| Categoría | texto | `required` | "Selecciona una categoría" |
| Estado | selección (ACTIVO, MANTENIMIENTO, BAJA) | solo transiciones válidas habilitadas | "Esa transición de estado no está permitida" |

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Toca "Guardar" con datos válidos (crear) | Crea el activo y navega a su detalle | `RegistrarActivo` |
| Toca "Guardar" con datos válidos (editar) | Actualiza el activo, incluido su estado | `CambiarEstadoActivo` |

---

## Permisos

No aplica.

---

## Accesibilidad

- [x] Cada campo tiene `aria-label` y mensaje de error asociado (`aria-describedby`).
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA.
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
