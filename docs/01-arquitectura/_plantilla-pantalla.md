# Pantalla — [Nombre de la pantalla]

> **Instrucción:** copia este archivo a `docs/01-arquitectura/pantallas/<pantalla>.md` para
> especificar una sola pantalla. Corto y visual: enlaza el prototipo. Borra los bloques
> «Instrucción» al terminar.

- **Ruta:** `/ruta`
- **Feature:** [nombre de la feature]
- **Referencia de diseño:** [enlace a la pantalla del prototipo en Figma u otra herramienta]

---

## Propósito

> **Instrucción:** ¿qué puede hacer el usuario en esta pantalla?

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `ion-header` + `ion-toolbar` | [título, botón atrás, acciones] |
| Cuerpo | `ion-content` + [`ion-list` / `ion-card` / formulario reactivo] | [lista, detalle o formulario] |
| Pie / acción principal | [`ion-footer` / `ion-fab` / `ion-button`] | [acción principal] |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Datos en camino | [`ion-skeleton-text` o `ion-spinner`] |
| Cargado | Datos listos | [contenido] |
| Vacío | No hay datos | [mensaje + acción para crear el primero] |
| Error | Falló la petición | [mensaje entendible + botón «Reintentar»] |
| Sin conexión | No hay red | [aviso + datos en caché con su fecha] |

---

## Formulario (si aplica)

| Campo | Tipo | Validaciones (`Validators`) | Mensaje de error |
|-------|------|-----------------------------|------------------|
| [campo] | [texto / número / fecha] | [`required`, `minLength(3)`…] | [qué ve el usuario] |

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|--------------------|-----------|----------------------|
| [toca el botón principal] | [qué pasa] | [RegistrarActivo] |

---

## Permisos (si aplica)

- **Permiso:** [cámara / ubicación / notificaciones]
- **Momento en que se pide:** [al tocar la acción que lo necesita, nunca al abrir la app]
- **Explicación previa al usuario:** [texto breve de para qué]
- **Si lo niega:** [qué ve y cómo sigue]

---

## Accesibilidad

- [ ] Todo elemento interactivo tiene etiqueta accesible (`aria-label` en botones de solo ícono).
- [ ] Áreas táctiles de al menos 44 × 44 pt (iOS) / 48 × 48 dp (Android).
- [ ] El texto escala con el tamaño de fuente del sistema (unidades `rem`, sin tamaños fijos en el cuerpo).
- [ ] El contraste cumple WCAG AA (4,5:1 en texto normal).
- [ ] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
