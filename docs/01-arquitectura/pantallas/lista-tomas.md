# Pantalla — Lista de tomas físicas

- **Ruta:** `/tomas`
- **Feature:** tomas-fisicas
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-09 y HU-10.

---

## Propósito

El AUDITOR (o ADMIN) ve las tomas físicas abiertas y cerradas, y puede iniciar una nueva.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | Título "Tomas físicas" |
| Cuerpo | `IonList` con `IonItem` por toma | Fecha, estado (abierta/cerrada), resumen si está cerrada |
| Pie / acción principal | `IonFab` "+" | Navega a `/tomas/nueva` |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Primera carga de la lista | `IonSkeletonText` x3 |
| Cargado | Datos listos | Lista completa |
| Vacío | Sin tomas registradas | Mensaje "Aún no hay tomas físicas" + botón "Crear la primera" |
| Error | Falló la petición | Mensaje + botón "Reintentar" |
| Sin conexión | Sin red | Lista desde caché; "+" deshabilitado con aviso |

---

## Formulario

No aplica.

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Toca una toma abierta | Navega a `/tomas/:id` (continuar escaneo) | — |
| Toca una toma cerrada | Navega a `/tomas/:id/resultado` | — |
| Toca "+" | Crea una toma y navega a `/tomas/:id` | `CrearToma` |

---

## Permisos

No aplica.

---

## Accesibilidad

- [x] El estado de cada toma se anuncia por texto.
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA.
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
