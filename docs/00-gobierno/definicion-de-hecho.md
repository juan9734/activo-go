# Definición de hecho (DoD)

Una historia de usuario está **hecha solo cuando todo esto es cierto**:

- [ ] Los criterios de aceptación se cumplen y se verificaron en un dispositivo o emulador.
- [ ] El código llegó a `main` mediante un PR revisado y aprobado por el otro integrante.
- [ ] Hay pruebas unitarias del caso de uso y del *state holder* (ViewModel o servicio de
      estado) y pasan (`npm test`).
- [ ] Funciona en Android sin regresiones; en iOS si la pareja tiene cómo probarlo.
- [ ] No introduce advertencias nuevas de lint (`ng lint`), de tipos (TypeScript estricto) ni
      de accesibilidad.
- [ ] Respeta la regla de dependencias: `presentation → domain ← data`.
- [ ] La pantalla resuelve los estados de carga, vacío, error y sin conexión.
- [ ] Si usa una capacidad nativa, pide el permiso en el momento de uso y maneja la negativa.
- [ ] Los textos visibles no están quemados en las plantillas HTML: salen de un archivo de
      textos por clave.
- [ ] Hay eventos de analítica o de reporte de errores donde aplica.
- [ ] La documentación está al día: ficha de la feature, tabla de rutas y un ADR si se tomó
      una decisión de arquitectura.

> Una historia que no cumple **toda** la DoD no está hecha: sigue abierta. El trabajo parcial
> no se cierra «para terminarlo después».
