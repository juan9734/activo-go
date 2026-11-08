# Seguridad móvil

> Qué se revisa en seguridad antes de cada release.

- [ ] Sin tráfico HTTP en claro (sin `http://` en producción, sin `cleartext: true` en
      `capacitor.config.ts`).
- [ ] Tokens en almacenamiento seguro, nunca en `localStorage` ni en Preferences sin cifrar.
- [ ] Sin secretos en el repositorio (ver [reglas de seguridad](../00-gobierno/reglas-de-seguridad.md)).
- [ ] Permisos nativos pedidos *just-in-time* y con manejo de negativa.
- [ ] [Revisión adicional específica de la app]
