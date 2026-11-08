# Feature — Autenticación (auth)

- **Responsable:** Juan Diego Ninco Collazos
- **Estado:** Planeada
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-13

---

## Propósito

Permitir que un usuario de ActivoGo inicie sesión con usuario y contraseña, mantenga su
sesión activa de forma segura mientras usa la app, y la cierre explícitamente, respetando su
rol (ADMIN, AUDITOR o CONSULTA) en el resto de la aplicación.

---

## Estructura de carpetas

~~~text
mobile/src/features/auth/
├── presentation/
│   ├── login/login.page.tsx            página de inicio de sesión
│   ├── login/use-login-view-model.ts   hook ViewModel de /login
│   └── perfil/perfil.page.tsx          página de perfil y cierre de sesión
├── domain/
│   ├── usuario.ts                      entidad Usuario (id, nombre, rol)
│   ├── sesion.repository.ts            interfaz: iniciarSesion, refrescar, cerrarSesion
│   └── iniciar-sesion.use-case.ts      caso de uso: valida credenciales y guarda sesión
└── data/
    ├── sesion.dto.ts                   forma del JSON del API (/auth/login, /auth/refresh)
    ├── sesion.mapper.ts                DTO ↔ dominio
    └── sesion-http.repository.ts       implementación sobre el cliente Axios único
~~~

---

## Pantallas

| Pantalla | Ruta | Propósito |
|----------|------|-----------|
| Login | `/login` | Capturar usuario y contraseña, mostrar bloqueo tras 3 intentos fallidos |
| Perfil | `/perfil` | Mostrar el usuario y rol activos, y cerrar sesión |

Ver [navegacion.md](../navegacion.md) para la tabla completa de rutas y guards.

---

## Estado

- **Patrón:** hook ViewModel por pantalla sobre TanStack Query (ver
  [ADR-001](../decisiones/registros/ADR-001-patron-de-estado.md)).
- **Objeto de estado:** `LoginState { fase: "inactivo" | "enviando" | "error" | "bloqueado"; mensajeError?: string }`.
- **Transiciones clave:** inactivo → enviando → (sesión iniciada, navega a `/activos`) |
  error (credenciales inválidas) | bloqueado (3 intentos fallidos, HTTP 423).

---

## Datos

- **Casos de uso:** `IniciarSesion`, `RefrescarSesion`, `CerrarSesion`.
- **Repositorios:** interfaz `SesionRepository` en `domain/`; implementación `SesionHttpRepository` en `data/`.
- **Endpoints:** `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` — documentados
  en [03-api-y-datos/endpoints/](../../03-api-y-datos/endpoints/).
- **Persistencia local:** tokens de acceso y refresh en almacenamiento seguro
  (`@aparajita/capacitor-secure-storage`); nunca en Preferences ni `localStorage`.
- **Estrategia sin conexión:** solo en línea — sin sesión activa no hay datos que mostrar.

---

## Capacidades nativas

No aplica: `auth` no usa plugins de Capacitor directamente (el almacenamiento seguro de
tokens es un puerto de `core/storage/`, no cuenta como uno de los dos plugins del mínimo 7).

---

## Casos borde y estados

- [x] Cargando (botón "Ingresar" deshabilitado mientras se envía)
- [ ] Vacío — no aplica
- [x] Error y reintento (credenciales inválidas, mensaje genérico sin revelar si el usuario existe)
- [x] Sin conexión (mensaje "sin conexión" en vez de intentar el login)
- [x] Permiso denegado — no aplica
- [x] Sesión expirada durante la operación (refresh automático o cierre de sesión si falla)

---

## Decisiones

Depende de [ADR-001](../decisiones/registros/ADR-001-patron-de-estado.md) (patrón de estado)
y de un ADR de almacenamiento seguro de tokens (pendiente de registrar en 12.2).

---

## Pruebas

- **Unitarias:** `IniciarSesion` (credenciales válidas/ inválidas/ bloqueo), `RefrescarSesion`
  (refresh válido, refresh reutilizado), `SesionMapper`.
- **De componente / UI:** `LoginPage` en sus cuatro fases.
- **Integración / E2E:** flujo login → refresh forzado (dos 401 simultáneos) → logout.
