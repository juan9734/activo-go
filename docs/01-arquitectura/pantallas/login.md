# Pantalla — Login

- **Ruta:** `/login`
- **Feature:** auth
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-01 y las reglas de negocio de `CLAUDE.md`.

---

## Propósito

El usuario ingresa su usuario y contraseña para acceder al inventario según su rol (ADMIN,
AUDITOR o CONSULTA).

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | Logo de ActivoGo, sin botón atrás |
| Cuerpo | Formulario reactivo (`IonInput` x2) | Campos usuario y contraseña |
| Pie / acción principal | `IonButton` "Ingresar" | Deshabilitado mientras se envía o si hay bloqueo activo |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Envío de credenciales en curso | Botón "Ingresar" con `IonSpinner`, deshabilitado |
| Cargado | Sesión iniciada | Navega a `/activos` |
| Error | Credenciales inválidas (401) | `IonText color="danger"` con "Usuario o contraseña incorrectos" |
| Bloqueado | 3 intentos fallidos (423) | Mensaje "Cuenta bloqueada temporalmente, intenta más tarde" |
| Sin conexión | Sin red al enviar | Aviso "Sin conexión, intenta de nuevo" sin llamar al API |

---

## Formulario

| Campo | Tipo | Validaciones | Mensaje de error |
|-------|------|---------------|-------------------|
| Usuario | texto | `required` | "Ingresa tu usuario" |
| Contraseña | contraseña | `required`, `minLength(8)` | "La contraseña debe tener al menos 8 caracteres" |

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|---------------------|-----------|------------------------|
| Toca "Ingresar" con datos válidos | Guarda tokens en almacenamiento seguro y navega a `/activos` | `IniciarSesion` |

---

## Permisos

No aplica: esta pantalla no usa capacidades nativas.

---

## Accesibilidad

- [x] Los campos de usuario y contraseña tienen `aria-label`.
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema (`rem`).
- [x] El contraste cumple WCAG AA (4,5:1).
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
