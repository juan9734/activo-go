# CI/CD

> Cómo se convierte un commit en un artefacto firmado.

- **CI:** [herramienta — p. ej. GitHub Actions] corre lint + pruebas unitarias en cada PR
- **Build de producción:** dentro de `mobile/`: `ionic build --configuration production` +
  `npx cap sync android`
- **Disparador de release:** etiqueta `vX.Y.Z` sobre `main` (ver
  [convenciones git](../00-gobierno/convenciones-git.md))
- **Pipeline:** [pasos, desde el build hasta el artefacto firmado]
