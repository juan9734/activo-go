# Pantalla — Captura de foto del activo

- **Ruta:** `/activos/:id/foto`
- **Feature:** activos
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-06.

---

## Propósito

El ADMIN toma una foto con la cámara del dispositivo y la asocia al activo como evidencia
visual de su estado.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | "Foto del activo", botón atrás |
| Cuerpo | Vista previa de la foto tomada o `IonButton` "Tomar foto" | — |
| Pie / acción principal | `IonButton` "Guardar" / "Repetir" | "Guardar" deshabilitado hasta tener una foto |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Guardando la foto en el API | `IonSpinner` sobre el botón "Guardar" |
| Cargado | Foto guardada | Navega a `/activos/:id` con la foto visible |
| Vacío | Aún no se ha tomado foto | Botón grande "Tomar foto" |
| Error | Falla al subir la foto | Mensaje + botón "Reintentar" |
| Sin conexión | Sin red | Aviso "Necesitas conexión para guardar la foto"; se puede seguir sin foto |

---

## Formulario

No aplica.

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Toca "Tomar foto" | Abre la cámara nativa | Adaptador `CapturaFoto` (`@capacitor/camera`) |
| Toca "Guardar" | Sube la foto y la asocia al activo | `RegistrarActivo` (actualización de foto) |
| Toca "Continuar sin foto" | Vuelve al detalle sin guardar foto | — |

---

## Permisos

- **Permiso:** Cámara.
- **Momento en que se pide:** al tocar "Tomar foto", nunca al abrir la pantalla.
- **Explicación previa al usuario:** "ActivoGo necesita la cámara para fotografiar el activo
  como evidencia."
- **Si lo niega:** mensaje con acceso directo a los ajustes del sistema; puede continuar sin
  foto tocando "Continuar sin foto".

---

## Accesibilidad

- [x] El botón "Tomar foto" tiene `aria-label` ("Tomar foto del activo con la cámara").
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA.
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
