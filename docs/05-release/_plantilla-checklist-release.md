# Checklist de release — v[X.Y.Z] (versionCode [N])

> **Instrucción:** copia este archivo a `docs/05-release/releases/vX.Y.Z.md`. Uno por
> release: es el registro de la decisión de publicar o no publicar (*go / no-go*). En el
> proyecto se diligencia al menos para la `v1.0.0` del H3 y se actualiza en el H4. Borra los
> bloques «Instrucción» al terminar.

- **Versión:** vX.Y.Z (versionCode N)
- **Fecha:** AAAA-MM-DD
- **Responsable del release:** [nombre]

---

## Go / No-Go

### Código y pruebas
- [ ] Todas las historias del release cumplen la [definición de hecho](../../00-gobierno/definicion-de-hecho.md).
- [ ] Pruebas unitarias (casos de uso, state holders, mappers, interceptores) en verde: `npm test`.
- [ ] Ningún defecto crítico o bloqueante abierto.

### Puertas de calidad
- [ ] Arranque en frío dentro del presupuesto (medido y comparado con el release anterior).
- [ ] Presupuestos de `angular.json` (`budgets`) sin errores en el build de producción.
- [ ] Tamaño del AAB/APK dentro del presupuesto (todo aumento está justificado).
- [ ] Checklist de [seguridad móvil](../../04-calidad/seguridad-movil.md) aprobado.

### Build y firma
- [ ] Build de producción (dentro de `mobile/`): `ionic build --configuration production` y
      `npx cap sync android`.
- [ ] Construido desde `main` en la etiqueta `vX.Y.Z` (por CI, o con pasos documentados y reproducibles).
- [ ] Firmado con la llave de release; el keystore y sus contraseñas están **fuera** del repositorio.
- [ ] Firma verificada (`apksigner verify --print-certs` para APK, `jarsigner -verify` para AAB).
- [ ] `versionName` y `versionCode` actualizados en `mobile/android/app/build.gradle`.
- [ ] Sin tráfico HTTP en claro: ninguna URL `http://` en el entorno de producción y sin `cleartext: true` en `capacitor.config.ts`.

### Tienda (real o simulada)
- [ ] Ícono y pantalla de inicio generados (`@capacitor/assets`).
- [ ] Metadatos al día: descripción, capturas, política de privacidad y sección de seguridad de los datos.
- [ ] Pista de pruebas internas o despliegue escalonado definido (p. ej. 5 % → 20 % → 50 % → 100 %).
- [ ] Versión mínima soportada revisada (actualización forzada si hay cambios incompatibles en la API).
- [ ] iOS: IPA generado o proceso documentado / simulado.

### Observabilidad
- [ ] Reporte de fallos activo (p. ej. Firebase Crashlytics o Sentry).
- [ ] Banderas de funcionalidad nuevas apagadas por defecto y con responsable.
- [ ] Disparador de reversión (*rollback*) y responsable confirmados.

---

## Decisión

- **Go / No-Go:** [decisión]
- **Aprobado por:** [nombre]
- **Enlace al artefacto firmado:** [release del repositorio o carpeta compartida]
- **Notas:** [lo que debe saber quien haga el siguiente release]
