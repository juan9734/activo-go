# Pantalla — Escaneo y registro de lecturas

- **Ruta:** `/tomas/:id`
- **Feature:** tomas-fisicas
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-09.

---

## Propósito

El AUDITOR escanea el código QR de cada activo que encuentra físicamente, registrando la
lectura incluso sin conexión.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | "Escaneo", contador de lecturas registradas |
| Cuerpo | Vista de cámara (escáner) o lista de lecturas registradas | Alterna entre modo escaneo y lista |
| Pie / acción principal | `IonButton` "Escanear" / "Cerrar toma" | "Cerrar toma" navega a `/tomas/:id/resultado` |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Validando el código escaneado | Breve `IonSpinner` sobre el recuadro de escaneo |
| Cargado | Lectura registrada | `IonToast` corto "Activo [código] registrado" + vuelve a escanear |
| Vacío | Toma recién creada | Mensaje "Escanea el primer activo" |
| Error | QR inválido o activo ya escaneado | `IonToast` de error, no bloquea seguir escaneando |
| Sin conexión | Sin red | Las lecturas se guardan localmente y se sincronizan al recuperar conexión |

---

## Formulario

No aplica (alternativa manual: `IonInput` para escribir el código si el QR no se puede leer).

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Apunta la cámara a un QR válido | Registra la lectura | `RegistrarLectura` |
| Escribe el código manualmente | Registra la lectura igual que el escaneo | `RegistrarLectura` |
| Toca "Cerrar toma" | Cierra la toma y calcula el resultado | `CerrarToma` |

---

## Permisos

- **Permiso:** Cámara (escáner QR).
- **Momento en que se pide:** al tocar "Escanear" por primera vez en esta toma.
- **Explicación previa al usuario:** "ActivoGo necesita la cámara para escanear el código QR
  de cada activo."
- **Si lo niega:** mensaje con acceso a ajustes; puede seguir registrando lecturas escribiendo
  el código manualmente.

---

## Accesibilidad

- [x] El modo de entrada manual es accesible sin depender de la cámara.
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA.
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
