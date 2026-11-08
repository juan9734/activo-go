# Reglas de seguridad

> Reglas no negociables de la app en secretos, transporte, datos y permisos. Se acuerdan en el
> H1 y se verifican en cada [checklist de release](../05-release/_plantilla-checklist-release.md).

## Secretos

- [ ] Ninguna llave, token o contraseña se versiona en el repositorio (`.env`,
      `keystore.properties`, `*.jks` fuera de git — ver [convenciones-git.md](convenciones-git.md)).
- [ ] [Regla adicional]

## Transporte

- [ ] Toda comunicación con el backend usa HTTPS; sin `cleartext: true` en `capacitor.config.ts`.
- [ ] [Regla adicional]

## Datos

- [ ] Los tokens de sesión se guardan en almacenamiento seguro, no en `localStorage` ni en
      Preferences sin cifrar — ver [persistencia.md](../03-api-y-datos/persistencia.md).
- [ ] Los datos personales que se cachean localmente se definen por entidad — ver
      [entidades](../03-api-y-datos/entidades/).
- [ ] [Regla adicional]

## Permisos

- [ ] Todo permiso nativo se pide *just-in-time* (al usar la función, nunca al abrir la app) y
      la app maneja la negativa sin romperse.
- [ ] [Regla adicional]
