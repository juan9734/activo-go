# CI/CD

Cómo se convierte un commit de ActivoGo en un artefacto firmado.

- **CI:** GitHub Actions corre `npm run lint` y `npm run test:ci` en `mobile/` en cada PR
  contra `main` (mínimo 8). El flujo vive en `.github/workflows/ci.yml`.
- **Build de producción:** dentro de `mobile/`: `ionic build --configuration production` +
  `npx cap sync android`.
- **Disparador de release:** etiqueta `vX.Y.Z` sobre `main` (ver
  [convenciones git](../00-gobierno/convenciones-git.md)).
- **Pipeline:** lint y pruebas → build de producción → `cap sync android` →
  `gradlew assembleRelease` (o `bundleRelease` para AAB) firmado con la llave de release →
  verificación de firma (`apksigner`/`jarsigner`) → publicación del artefacto como adjunto
  de la release de GitHub (nunca en el historial de commits).
