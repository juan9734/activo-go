# Pantalla — Perfil

- **Ruta:** `/perfil`
- **Feature:** auth
- **Referencia de diseño:** sin prototipo en Figma; definida directamente en esta ficha a
  partir de HU-03.

---

## Propósito

El usuario ve su nombre y rol activos, y puede cerrar sesión.

---

## Regiones de la interfaz

| Región | Componente | Notas |
|--------|------------|-------|
| Encabezado | `IonHeader` + `IonToolbar` | "Perfil" |
| Cuerpo | `IonCard` con nombre y rol (ADMIN, AUDITOR o CONSULTA) | — |
| Pie / acción principal | `IonButton` color="danger" "Cerrar sesión" | Pide confirmación antes de ejecutar |

---

## Estados

| Estado | Disparador | Interfaz |
|--------|------------|----------|
| Cargando | Cerrando sesión | Botón con `IonSpinner` |
| Cargado | Datos del usuario listos | Tarjeta con nombre y rol |
| Vacío | No aplica | — |
| Error | Falla al cerrar sesión en el servidor | Se cierra la sesión localmente igual, con aviso |
| Sin conexión | Sin red al cerrar sesión | Se borran los tokens locales igual; el servidor los invalida en el próximo intento de uso |

---

## Formulario

No aplica.

---

## Acciones

| Acción del usuario | Resultado | Caso de uso / evento |
|----------------------|-----------|-------------------------|
| Toca "Cerrar sesión" y confirma | Borra tokens y caché local, navega a `/login` | `CerrarSesion` |

---

## Permisos

No aplica.

---

## Accesibilidad

- [x] El rol se anuncia como texto, no solo como ícono.
- [x] Áreas táctiles de al menos 48 × 48 dp.
- [x] El texto escala con el tamaño de fuente del sistema.
- [x] El contraste cumple WCAG AA.
- [x] Se ve bien en modo `md` y en modo `ios`, en tema claro y oscuro.
