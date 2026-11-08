# Feature — [Nombre de la feature]

> **Instrucción:** copia este archivo a `docs/01-arquitectura/features/<feature>.md` y
> diligéncialo **antes** de escribir el código de la feature (SDD). Un documento por feature;
> se mantiene al día mientras la feature cambia. Borra los bloques «Instrucción» al terminar.

- **Responsable:** [nombre]
- **Estado:** Planeada | En curso | Entregada
- **Historias relacionadas:** [HU-01, HU-04, …]

---

## Propósito

> **Instrucción:** en una o dos frases, ¿qué problema del usuario resuelve esta feature?

---

## Estructura de carpetas

~~~text
mobile/src/app/features/<feature>/
├── presentation/
│   ├── <pantalla>/<pantalla>.page.ts      página standalone
│   └── <pantalla>/<pantalla>.view-model.ts  state holder de la pantalla
├── domain/
│   ├── <entidad>.ts                        entidad (sin Angular ni Capacitor)
│   ├── <feature>.repository.ts             interfaz del repositorio
│   └── <accion>.use-case.ts                un caso de uso por acción de negocio
└── data/
    ├── <entidad>.dto.ts                    forma del JSON de la API
    ├── <entidad>.mapper.ts                 DTO ↔ dominio
    └── <feature>-http.repository.ts        implementación del repositorio
~~~

---

## Pantallas

| Pantalla | Ruta | Propósito |
|----------|------|-----------|
| [Pantalla] | `/ruta` | [qué hace] |

> **Instrucción:** cada pantalla se especifica con `_plantilla-pantalla.md` y su ruta se
> registra en `navegacion.md` y en `app.routes.ts`.

---

## Estado

- **Patrón:** [el del ADR-001, p. ej. ViewModel por pantalla con estado inmutable en RxJS o Signals]
- **Objeto(s) de estado:** [p. ej. `interface ActivosListaState { readonly estado: …; readonly items: … }`]
- **Transiciones clave:** [cargando → cargado | vacío | error | sin conexión]

---

## Datos

- **Casos de uso:** [ListarActivos, RegistrarActivo, …]
- **Repositorios:** [interfaz `ActivosRepository` en `domain/`; implementación en `data/`]
- **Endpoints:** [método + ruta — cada uno documentado en `03-api-y-datos/endpoints/`]
- **Persistencia local:** [entidades en caché — ver `03-api-y-datos/entidades/`]
- **Estrategia sin conexión:** Solo en línea | Caché de lectura | Offline-first — [por qué]

---

## Capacidades nativas (si aplica)

| Puerto (interfaz) | Adaptador (plugin Capacitor) | Permiso | Cuándo se pide | Si el usuario lo niega |
|-------------------|------------------------------|---------|----------------|------------------------|
| [p. ej. `CapturaFoto`] | [`@capacitor/camera`] | [cámara] | [al tocar «Tomar foto», tras explicar para qué] | [mensaje + acceso a ajustes; la feature sigue sin foto] |

---

## Casos borde y estados

- [ ] Cargando
- [ ] Vacío
- [ ] Error y reintento
- [ ] Sin conexión
- [ ] Permiso denegado (si aplica)
- [ ] Sesión expirada durante la operación

---

## Decisiones

> **Instrucción:** enlaza los ADR de los que depende esta feature
> (`decisiones/registros/ADR-NNN-*.md`).

---

## Pruebas

- **Unitarias:** [casos de uso, ViewModel (transiciones de estado), mappers]
- **De componente / UI:** [pantallas clave]
- **Integración / E2E:** [flujo crítico, si lo hay]
