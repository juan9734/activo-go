# Pantalla — Resultado y cierre de la toma

- **Ruta:** `/tomas/:id/resultado`
- **Feature:** tomas-fisicas
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-10.

---

## Propósito

El AUDITOR ve el resultado de la toma física ya cerrada: activos encontrados, faltantes y
sobrantes frente al inventario esperado.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | "Resultado de la toma", fecha de cierre |
| Cuerpo | Tres `IonList` agrupadas: Encontrados, Faltantes, Sobrantes | Con el total de cada grupo |
| Pie / acción principal | `IonButton` "Exportar resultado" (CSV) | Reutiliza la neutralización de fórmulas de `activos` |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Calculando el resultado al cerrar | `IonSpinner` de pantalla completa (breve) |
| Cargado | Resultado calculado | Las tres listas con sus totales |
| Vacío | No aplica (toda toma cerrada tiene al menos faltantes o encontrados) | — |
| Error | Falla al calcular o cargar el resultado | Mensaje + botón "Reintentar" |
| Sin conexión | Sin red | Resultado desde caché si ya se calculó antes; si no, aviso de que se necesita conexión |

---

## Formulario

No aplica.

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Toca un activo faltante | Navega a su detalle (`/activos/:id`) | — |
| Toca "Exportar resultado" | Descarga un CSV con las tres listas | `ExportarActivosCsv` (variante por toma) |

---

## Permisos

No aplica.

---

## Accesibilidad

- [x] Cada grupo (encontrados/faltantes/sobrantes) se anuncia con su total.
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA (los tres grupos no dependen solo del color).
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
