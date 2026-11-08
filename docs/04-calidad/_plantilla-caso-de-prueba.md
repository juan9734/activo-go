# Caso de prueba — TC-[NNN]

> **Instrucción:** copia este archivo a `docs/04-calidad/casos/TC-NNN.md` para un caso de
> prueba **manual o exploratorio** en dispositivo o emulador. Las pruebas automatizadas viven
> en el código (`*.spec.ts`) y se nombran `<unidad>_<condición>_<resultadoEsperado>`, por
> ejemplo `listarActivos_sinConexion_devuelveCache`. Borra los bloques «Instrucción» al
> terminar.

- **ID:** TC-NNN
- **Historia relacionada:** [HU-NN]
- **Feature / pantalla:** [nombre]
- **Plataforma(s):** Android | iOS | ambas
- **Tipo:** Funcional | Regresión | Exploratoria | Permisos | Sin conexión | Sesión

---

## Precondiciones

- [Estado en que debe estar la app antes de empezar: sesión iniciada, modo avión, permiso
  nunca concedido, lista vacía…]

---

## Pasos

| # | Acción | Resultado esperado |
|---|--------|--------------------|
| 1 | [acción] | [resultado esperado] |
| 2 | [acción] | [resultado esperado] |
| 3 | [acción] | [resultado esperado] |

---

## Resultado

- **Estado:** Pasa | Falla | Bloqueado
- **Build:** [versión + `versionCode`]
- **Dispositivo / SO:** [p. ej. Pixel 8 / Android 15, o emulador API 35]
- **Evidencia:** [captura o minuto del video]
- **Notas / defectos:** [enlace al issue si falló]

---

> **Instrucción — casos que no pueden faltar en el proyecto:**
>
> - Permiso negado la primera vez y concedido después desde los ajustes del sistema.
> - Modo avión: la feature con caché de lectura muestra los últimos datos y avisa que no hay red.
> - Token de acceso vencido: la petición se completa tras un refresh transparente.
> - Refresh fallido: la app cierra sesión limpiamente y lleva a `/login`.
> - Ruta protegida abierta sin sesión: el guard redirige a `/login`.
