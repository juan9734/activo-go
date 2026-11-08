# Seguridad móvil

Qué se revisa en seguridad antes de cada release de ActivoGo.

- [x] Sin tráfico HTTP en claro en producción: `usesCleartextTraffic="false"` en
      `mobile/android/app/src/main/AndroidManifest.xml`; el texto plano (`http://10.0.2.2:3000`)
      solo existe en `mobile/android/app/src/debug/AndroidManifest.xml`. Verificado
      manualmente: el APK de release firmado rechaza la conexión a la API de desarrollo en
      HTTP con "Sin conexión", mientras el build debug sí se conecta.
- [x] `allowBackup="false"` en el manifiesto de producción.
- [ ] Tokens solo en `@aparajita/capacitor-secure-storage`; `git grep -rn "localStorage\|Preferences" mobile/src/features` no debe mostrar uso para tokens.
- [ ] Sin secretos en el repositorio (ver [reglas de seguridad](../00-gobierno/reglas-de-seguridad.md));
      `git log --all -- "*.jks" "*.keystore" "keystore.properties"` vacío.
- [ ] Permisos nativos (cámara, escáner QR) pedidos *just-in-time* y con manejo de negativa
      verificado en los casos de prueba [TC-002 y TC-003](casos/).
- [ ] CORS del API solo permite `https://localhost` y `capacitor://localhost`.
- [ ] Exportación CSV neutraliza inyección de fórmulas (`=`, `+`, `-`, `@`).
- [ ] `android.allowMixedContent` en `capacitor.config.ts` está en `false` (o eliminado):
      solo se activa en desarrollo porque la API local corre en `http://10.0.2.2:3000`;
      en producción la API es HTTPS y el flag debe quitarse.
