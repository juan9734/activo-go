# Observabilidad

Cómo se observa la salud de ActivoGo en producción.

- **Reporte de fallos:** declarado como pendiente de integrar (p. ej. Sentry) — se deja como
  brecha explícita si no alcanza a implementarse antes de la entrega; no se afirma como
  hecho sin evidencia en el código.
- **Analítica:** eventos clave planeados: inicio de sesión, activo creado, toma física
  cerrada — a definir su implementación concreta en 12.9/12.10.
- **Banderas de funcionalidad:** no aplica en esta versión (v1.0.0); toda funcionalidad
  entregada está activa por defecto.
- **Disparador y responsable de rollback:** responsable Juan Diego Ninco Collazos; se activa
  si el checklist de release de una versión nueva falla después de publicada (revertir la
  etiqueta `vX.Y.Z` y redistribuir el artefacto anterior firmado).
