# Firma y tiendas

Dónde vive la llave de ActivoGo y cómo se firma el artefacto.

- **Keystore:** `activogo-release.jks`, generado localmente con `keytool`, fuera del
  repositorio (ver [convenciones git](../00-gobierno/convenciones-git.md) y el
  `.gitignore` de la raíz).
- **Dónde se guarda la llave y sus contraseñas:** solo en la máquina de quien firma el
  release; la contraseña no se imprime en consola ni se pega en el chat con Claude Code.
- **Verificación de firma:** `apksigner verify --print-certs` (APK) o `jarsigner -verify`
  (AAB), evidencia guardada como salida de comando en el Anexo 2.
- **Tienda:** Google Play — para este curso se **declara como simulado** (no hay cuenta de
  desarrollador activa); el artefacto firmado y verificado localmente es la evidencia del
  mínimo 8, no la publicación real en la tienda.
- **Versión mínima soportada:** API level 24 (Android 7.0), la mínima que soporta Capacitor 8.
- **iOS:** documentado como simulado (sin cuenta de desarrollador Apple disponible para el
  curso); no se declara como hecho.
