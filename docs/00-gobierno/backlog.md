# Backlog

Historias de usuario priorizadas con MoSCoW. Formato y definición de listo en
[definicion-de-listo.md](definicion-de-listo.md).

| ID | Historia | Criterios de aceptación | MoSCoW | Puntos | Feature |
|----|----------|--------------------------|--------|--------|---------|
| HU-01 | Como usuario, quiero iniciar sesión con usuario y contraseña, para acceder al inventario según mi rol (ADMIN, AUDITOR o CONSULTA). | Dado credenciales válidas, cuando inicio sesión, entonces entro a `/activos`. Dado 3 intentos fallidos consecutivos, cuando intento de nuevo, entonces la cuenta queda bloqueada temporalmente (HTTP 423). | Must | 5 | auth |
| HU-02 | Como usuario autenticado, quiero que mi sesión se renueve automáticamente, para no perder mi trabajo cuando el token expira. | Dado un token de acceso vencido, cuando hago una petición, entonces el interceptor refresca una vez y reintenta. Dado un refresh token reutilizado, cuando se detecta, entonces se cierran todas mis sesiones y voy a `/login`. | Must | 8 | auth |
| HU-03 | Como usuario, quiero cerrar sesión, para proteger la información si presto el dispositivo. | Dado que toco "Cerrar sesión", cuando confirmo, entonces se borran mis tokens y la caché local, y voy a `/login`. | Must | 2 | auth |
| HU-04 | Como usuario con sesión activa, quiero ver la lista de activos fijos, para conocer el inventario disponible. | Dado que tengo conexión, cuando entro a `/activos`, entonces veo la lista paginada. Dado que no tengo conexión, cuando entro a `/activos`, entonces veo la última lista en caché con su fecha. | Must | 5 | activos |
| HU-05 | Como ADMIN, quiero registrar un activo nuevo con un código único, para incorporarlo al inventario. | Dado un código de activo repetido, cuando guardo, entonces veo un error de validación. Dado datos válidos, cuando guardo, entonces el activo aparece en la lista. | Must | 5 | activos |
| HU-06 | Como ADMIN, quiero tomar una foto del activo con la cámara del dispositivo, para dejar evidencia visual de su estado. | Dado que toco "Tomar foto" por primera vez, cuando no se ha concedido el permiso de cámara, entonces la app lo solicita en ese momento. Dado que lo niego, cuando sigo, entonces puedo continuar sin foto. | Must | 5 | activos |
| HU-07 | Como ADMIN, quiero cambiar el estado de un activo entre ACTIVO, MANTENIMIENTO y BAJA, para reflejar su situación real. | Dado un activo en BAJA, cuando intento reactivarlo, entonces la app rechaza la transición. Dado un activo ACTIVO, cuando lo paso a MANTENIMIENTO y de vuelta a ACTIVO, entonces la app lo permite. | Must | 5 | activos |
| HU-08 | Como ADMIN, quiero asignar un activo a un responsable y ver su historial de asignaciones, para saber quién lo tiene. | Dado un activo sin asignar, cuando lo asigno, entonces queda en el historial con fecha. Dado un activo asignado que doy de baja, entonces se libera automáticamente al responsable. | Must | 5 | activos |
| HU-09 | Como AUDITOR, quiero escanear el código QR de un activo durante una toma física, para registrar su lectura sin digitarla. | Dado que toco "Escanear" por primera vez, cuando no se ha concedido el permiso de cámara, entonces la app lo solicita en ese momento. Dado un código QR válido, cuando se escanea, entonces el activo queda como encontrado en la toma. | Must | 8 | tomas-fisicas |
| HU-10 | Como AUDITOR, quiero cerrar una toma física y ver su resultado, para saber qué activos faltan o sobran. | Dado una toma con lecturas registradas, cuando la cierro, entonces la app calcula encontrados, faltantes y sobrantes. Dado una toma cerrada, cuando intento agregar otra lectura, entonces la app lo impide. | Must | 8 | tomas-fisicas |
| HU-11 | Como usuario, quiero consultar el inventario sin conexión a internet, para seguir trabajando en zonas sin señal. | Dado que activo el modo avión, cuando entro a `/activos`, entonces veo los datos en caché con el aviso "sin conexión". Dado que recupero la conexión, cuando refresco, entonces la caché se actualiza. | Must | 5 | activos |
| HU-12 | Como ADMIN, quiero exportar el inventario a CSV, para compartirlo con auditoría externa. | Dado un campo que empieza con `=`, `+`, `-` o `@`, cuando se exporta, entonces el CSV lo neutraliza con un apóstrofe inicial. | Should | 3 | activos |
| HU-13 | Como usuario con rol CONSULTA, quiero acceder en modo solo lectura, para consultar el inventario sin riesgo de modificarlo. | Dado un usuario CONSULTA, cuando intenta editar, crear o dar de baja un activo, entonces la acción está bloqueada en la interfaz y el API responde 403. | Should | 3 | auth |
| HU-14 | Como equipo del proyecto, quiero un pipeline de CI que corra lint y pruebas en cada PR, para detectar errores antes de fusionar a `main`. | Dado un PR abierto, cuando se ejecuta el workflow, entonces `npm run lint` y `npm run test:ci` deben pasar en verde antes de aprobar. | Could | 3 | gobierno |
| HU-15 | Como usuario con sesión activa, quiero ver el detalle de un activo (categoría, ubicación, responsable y último cambio de estado), para conocer su situación completa antes de actuar sobre él. | Dado un activo existente, cuando toco su fila en la lista, entonces veo `/activos/:id` con sus datos completos. Dado un `id` que no existe, cuando entro a la ruta, entonces veo un mensaje de error en vez de datos vacíos. | Must | 3 | activos |
| HU-16 | Como ADMIN, quiero editar el nombre, la categoría y la ubicación de un activo existente, para corregir o actualizar su información. | Dado un activo existente, cuando guardo cambios válidos en `/activos/:id/editar`, entonces el detalle refleja los nuevos datos. Dado un rol distinto de ADMIN, cuando entra al detalle, entonces no ve el botón "Editar". | Must | 5 | activos |

> MoSCoW = *Must* (sin esto no hay producto), *Should* (importante, no vital), *Could*
> (deseable), *Won't* (fuera de alcance en esta versión).

## Cobertura de los ocho mínimos

Las historias *Must* ejercitan los mínimos funcionales directamente: HU-01/HU-02/HU-13
(mínimo 5, cliente HTTP y tokens), HU-04/HU-11 (mínimo 6, offline y caché), HU-06/HU-09
(mínimo 7, plugins nativos cámara y QR), HU-01 a HU-11 en conjunto (mínimo 1, app funcional
en el emulador). Los mínimos 2 (capas), 3 (ADR), 4 (rutas) y 8 (pruebas, firma, CI) son
prácticas de ingeniería que se verifican en la arquitectura, el registro de decisiones y el
pipeline — no corresponden a una historia de usuario individual, y se evidencian en
`01-arquitectura/`, `04-calidad/` y `05-release/`.
