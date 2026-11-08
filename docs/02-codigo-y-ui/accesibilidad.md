# Accesibilidad

Cómo se garantiza que ActivoGo sea accesible, verificado pantalla por pantalla en
[01-arquitectura/pantallas/](../01-arquitectura/pantallas/).

- [x] Todo elemento interactivo tiene etiqueta accesible (`aria-label` en botones de solo
      ícono, como "Tomar foto" y "Escanear").
- [x] Áreas táctiles de al menos 44 × 44 pt (iOS) / 48 × 48 dp (Android) en toda la app.
- [x] El texto escala con el tamaño de fuente del sistema (unidades `rem`, sin tamaños fijos
      en el cuerpo de los componentes de `shared/`).
- [x] El contraste cumple WCAG AA (4,5:1 en texto normal), incluidos los chips de estado de
      un activo (ACTIVO/MANTENIMIENTO/BAJA), que nunca se comunican solo por color.
- [x] Orden de foco y navegación por teclado verificados en los formularios (login,
      formulario de activo).

Checklist detallado por pantalla en cada ficha de
[01-arquitectura/pantallas/](../01-arquitectura/pantallas/).
