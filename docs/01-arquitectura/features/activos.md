# Feature — Activos

- **Responsable:** Juan Diego Ninco Collazos
- **Estado:** MVP implementado y verificado en el emulador — ver [v1.0.0.md](../../05-release/releases/v1.0.0.md). HU-08 a HU-10, HU-12 y HU-13 quedan como brecha declarada.
- **Historias relacionadas:** HU-04, HU-05, HU-06, HU-07, HU-08, HU-11, HU-12, HU-13, HU-15, HU-16

---

## Propósito

Permitir administrar el inventario de activos fijos: consultarlo (incluso sin conexión),
registrar activos nuevos, cambiar su estado, documentarlos con una foto, asignarlos a un
responsable con historial, y exportarlos a CSV para auditoría.

---

## Estructura de carpetas

~~~text
mobile/src/features/activos/
├── presentation/
│   ├── lista/lista-activos.page.tsx
│   ├── lista/use-lista-activos-view-model.ts
│   ├── detalle/detalle-activo.page.tsx
│   ├── detalle/use-detalle-activo-view-model.ts
│   ├── formulario/formulario-activo.page.tsx
│   ├── formulario/use-formulario-activo-view-model.ts
│   └── foto/captura-foto.page.tsx
├── domain/
│   ├── activo.ts                         entidad Activo (código, nombre, estado, responsable)
│   ├── asignacion.ts                     entidad Asignación (historial)
│   ├── activos.repository.ts             interfaz del repositorio
│   ├── listar-activos.use-case.ts
│   ├── registrar-activo.use-case.ts
│   ├── cambiar-estado-activo.use-case.ts
│   ├── asignar-activo.use-case.ts
│   └── exportar-activos-csv.use-case.ts
└── data/
    ├── activo.dto.ts
    ├── activo.mapper.ts
    └── activos-http.repository.ts
~~~

---

## Pantallas

| Pantalla | Ruta | Propósito |
|----------|------|-----------|
| Lista de activos | `/activos` | Ver el inventario, con caché de lectura sin conexión |
| Formulario de activo (crear) | `/activos/nuevo` | Registrar un activo nuevo |
| Detalle de activo | `/activos/:id` | Ver datos, estado y asignaciones de un activo |
| Formulario de activo (editar) | `/activos/:id/editar` | Editar datos o cambiar estado |
| Captura de foto | `/activos/:id/foto` | Tomar y asociar una foto de evidencia |

Ver [navegacion.md](../navegacion.md) para la tabla completa de rutas y guards.

---

## Estado

- **Patrón:** hook ViewModel por pantalla sobre TanStack Query.
- **Objeto(s) de estado:** `ListaActivosState { fase: "cargando" | "cargado" | "vacio" | "error" | "offline"; items: Activo[]; actualizadoEn?: Date }`.
- **Transiciones clave:** cargando → cargado | vacío | error | offline (datos de caché con
  fecha cuando no hay red).

---

## Datos

- **Casos de uso:** `ListarActivos`, `RegistrarActivo`, `CambiarEstadoActivo`,
  `AsignarActivo`, `ExportarActivosCsv`.
- **Repositorios:** interfaz `ActivosRepository` en `domain/`; implementación `ActivosHttpRepository` en `data/`.
- **Endpoints:** `GET/POST /activos`, `GET/PUT /activos/:id`, `PATCH /activos/:id/estado`,
  `POST /activos/:id/foto`, `POST /activos/:id/asignaciones`,
  `GET /activos/export.csv` — ver [03-api-y-datos/endpoints/](../../03-api-y-datos/endpoints/).
- **Persistencia local:** entidad `activos` en caché (SQLite cifrada) — ver
  [03-api-y-datos/entidades/](../../03-api-y-datos/entidades/).
- **Estrategia sin conexión:** caché de lectura — la lista se muestra desde SQLite cuando no
  hay red; las escrituras (crear, editar, cambiar estado) requieren conexión.

---

## Capacidades nativas

| Puerto (interfaz) | Adaptador (plugin Capacitor) | Permiso | Cuándo se pide | Si el usuario lo niega |
|-------------------|------------------------------|---------|----------------|------------------------|
| `CapturaFoto` | `@capacitor/camera` | Cámara | Al tocar "Tomar foto" en `/activos/:id/foto` | Mensaje con acceso a ajustes; el activo se guarda sin foto |

---

## Casos borde y estados

- [x] Cargando
- [x] Vacío (inventario sin activos aún)
- [x] Error y reintento (falla de red al guardar o listar)
- [x] Sin conexión (lista desde caché, escritura deshabilitada con aviso)
- [x] Permiso denegado (cámara)
- [x] Sesión expirada durante la operación (refresh transparente o cierre de sesión)

---

## Decisiones

Depende de [ADR-001](../decisiones/registros/ADR-001-patron-de-estado.md) (patrón de estado)
y de los ADR de persistencia local (ADR-004, caché SQLite cifrada) y de puertos de
capacidades nativas, a registrar en 12.2.

---

## Pruebas

- **Unitarias:** `ListarActivos` (con y sin red), `CambiarEstadoActivo` (transiciones válidas
  e inválidas), `AsignarActivo` (libera al dar de baja), `ExportarActivosCsv` (neutralización
  de inyección de fórmulas), `ActivoMapper`.
- **De componente / UI:** `ListaActivosPage` en sus cinco fases; `FormularioActivoPage`
  validando el código único.
- **Integración / E2E:** registrar activo → cambiar a MANTENIMIENTO → asignar → dar de BAJA
  (libera al responsable).
