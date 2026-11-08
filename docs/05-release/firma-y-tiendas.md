# Firma y tiendas

> Dónde vive la llave y cómo se firma el artefacto.

- **Keystore:** fuera del repositorio — ver [convenciones git](../00-gobierno/convenciones-git.md)
- **Dónde se guarda la llave y sus contraseñas:** [gestor de secretos / solo en la máquina del
  responsable de release]
- **Verificación de firma:** `apksigner verify --print-certs` (APK) / `jarsigner -verify` (AAB)
- **Tienda(s):** [Google Play interno/cerrado — real o simulado para el curso]
- **Versión mínima soportada:** [API level]
