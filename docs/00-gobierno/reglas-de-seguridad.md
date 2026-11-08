# Reglas de seguridad

Reglas no negociables de ActivoGo en secretos, transporte, datos y permisos. Se verifican en
cada [checklist de release](../05-release/_plantilla-checklist-release.md).

## Secretos

- Ninguna llave, token o contraseña se versiona en el repositorio: `.env`, `keystore.properties`,
  `*.jks` y `*.keystore` están fuera de git (ver [convenciones-git.md](convenciones-git.md)).
- La cadena de conexión a PostgreSQL vive solo en `api/.env` (`DATABASE_URL`,
  `DATABASE_URL_TEST`), nunca en el código ni en commits.
- La contraseña del keystore de firma no se imprime en consola ni se pega en el chat con
  Claude Code; vive solo en la máquina de quien firma el release.

## Transporte

- Toda comunicación entre `mobile/` y `api/` usa HTTPS en producción; en release,
  `usesCleartextTraffic="false"` y `allowBackup="false"` en el manifiesto de Android.
  El texto plano (`http://10.0.2.2:3000`, para el emulador) solo existe en
  `mobile/android/app/src/debug/AndroidManifest.xml`.
- CORS del API solo permite los orígenes `https://localhost` (Android) y
  `capacitor://localhost` (iOS); ningún otro origen queda habilitado en producción.

## Datos

- Los tokens de sesión (access y refresh) se guardan solo en almacenamiento seguro
  (`@aparajita/capacitor-secure-storage`); nunca en Capacitor Preferences ni en `localStorage`
  — ver [persistencia.md](../03-api-y-datos/persistencia.md).
- El refresh token es rotativo: cada uso emite uno nuevo y detecta reutilización del anterior;
  si se detecta reutilización, se cierran todas las sesiones de ese usuario.
- La caché de lectura de activos vive en SQLite cifrada detrás de `cache-local.port.ts`
  (ADR-004) y se borra al cerrar sesión o al cambiar de cuenta en el mismo dispositivo.
- La exportación de activos a CSV neutraliza inyección de fórmulas: todo campo que empiece
  con `=`, `+`, `-` o `@` se antepone con un apóstrofe antes de escribirse.
- Tres inicios de sesión fallidos consecutivos bloquean la cuenta temporalmente (HTTP 423);
  el bloqueo se registra con marca de tiempo y no revela si el usuario existe.

## Permisos

- Los dos plugins nativos (cámara para evidencia fotográfica y escáner QR para tomas físicas)
  piden su permiso *just-in-time*, al tocar la acción que los necesita, nunca al abrir la app.
- Si el usuario niega un permiso, la app sigue funcionando sin esa capacidad (sin foto, sin
  escaneo) y ofrece un mensaje con acceso a los ajustes del sistema.
- Solo los adaptadores de `mobile/src/core/nativo/` importan plugins de Capacitor; el resto
  de la app depende de los puertos (interfaces), nunca del plugin directamente.

## Roles

- **ADMIN:** acceso de escritura completo (activos, asignaciones, usuarios).
- **AUDITOR:** opera tomas físicas (crear, escanear, cerrar); no edita activos ni asignaciones.
- **CONSULTA:** solo lectura; cualquier acción de escritura queda bloqueada tanto en la
  interfaz (`mobile/`) como en el API (`api/`), nunca solo en el cliente.
