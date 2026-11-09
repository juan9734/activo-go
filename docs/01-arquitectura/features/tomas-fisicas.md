# Feature — Tomas físicas

- **Responsable:** Juan Diego Ninco Collazos
- **Estado:** Planeada — con una excepción: la parte de HU-09 sobre pedir el permiso de cámara
  justo en el momento y escanear un código QR está implementada como una pantalla independiente
  en `mobile/src/features/activos/presentation/EscanearQrPage.tsx` (ruta `/activos/escanear`),
  usando el mismo plugin previsto aquí (`@capacitor-mlkit/barcode-scanning`). Un QR válido
  navega al detalle del activo en vez de registrarlo como lectura en una toma, porque el modelo
  `TomaFisica`/`LecturaToma` de esta ficha (crear toma, registrar lecturas, cerrar con cálculo de
  encontrados/faltantes/sobrantes) sigue sin implementar — brecha declarada. Ver
  [v1.0.0.md](../../05-release/releases/v1.0.0.md) y Anexo 1, fotos 15.
- **Historias relacionadas:** HU-09 (parcial, ver nota de Estado), HU-10

---

## Propósito

Permitir que un AUDITOR (o un ADMIN) realice una toma física del inventario: crear la toma,
escanear el código QR de cada activo encontrado y, al cerrarla, obtener automáticamente los
activos encontrados, faltantes y sobrantes frente al inventario esperado.

---

## Estructura de carpetas

~~~text
mobile/src/features/tomas-fisicas/
├── presentation/
│   ├── lista/lista-tomas.page.tsx
│   ├── escaneo/escaneo-toma.page.tsx
│   ├── escaneo/use-escaneo-toma-view-model.ts
│   └── resultado/resultado-toma.page.tsx
├── domain/
│   ├── toma-fisica.ts                    entidad TomaFisica (estado: abierta | cerrada)
│   ├── lectura-toma.ts                   entidad LecturaToma (activo escaneado + momento)
│   ├── resultado-item.ts                 entidad ResultadoItem (encontrado | faltante | sobrante)
│   ├── tomas.repository.ts               interfaz del repositorio
│   ├── crear-toma.use-case.ts
│   ├── registrar-lectura.use-case.ts
│   └── cerrar-toma.use-case.ts           calcula encontrados/faltantes/sobrantes
└── data/
    ├── toma.dto.ts
    ├── toma.mapper.ts
    └── tomas-http.repository.ts
~~~

---

## Pantallas

| Pantalla | Ruta | Propósito |
|----------|------|-----------|
| Lista de tomas físicas | `/tomas` | Ver tomas abiertas y cerradas |
| Escaneo y registro | `/tomas/:id` | Escanear el QR de cada activo encontrado |
| Resultado y cierre | `/tomas/:id/resultado` | Ver encontrados, faltantes y sobrantes al cerrar |

Ver [navegacion.md](../navegacion.md) para la tabla completa de rutas y guards.

---

## Estado

- **Patrón:** hook ViewModel por pantalla sobre TanStack Query.
- **Objeto(s) de estado:** `EscaneoTomaState { fase: "escaneando" | "registrando" | "error" | "offline"; lecturas: LecturaToma[] }`.
- **Transiciones clave:** escaneando → registrando (lectura válida) | error (QR inválido o
  activo ya escaneado) | offline (las lecturas se encolan y se sincronizan al recuperar red).

---

## Datos

- **Casos de uso:** `CrearToma`, `RegistrarLectura`, `CerrarToma`.
- **Repositorios:** interfaz `TomasRepository` en `domain/`; implementación `TomasHttpRepository` en `data/`.
- **Endpoints:** `POST /tomas`, `POST /tomas/:id/lecturas` (lote), `POST /tomas/:id/cerrar` —
  ver [03-api-y-datos/endpoints/](../../03-api-y-datos/endpoints/).
- **Persistencia local:** lecturas pendientes de sincronizar en SQLite cifrada mientras no
  hay red; se vacía la cola al confirmarse en el servidor.
- **Estrategia sin conexión:** offline-first para el registro de lecturas (se escanea sin
  red y se sincroniza después); el cierre y el cálculo del resultado requieren conexión.

---

## Capacidades nativas

| Puerto (interfaz) | Adaptador (plugin Capacitor) | Permiso | Cuándo se pide | Si el usuario lo niega |
|-------------------|------------------------------|---------|----------------|------------------------|
| `EscanearCodigo` (planeado, para `/tomas/:id`) | `@capacitor-mlkit/barcode-scanning` | Cámara | Al tocar "Escanear" en `/tomas/:id` | Mensaje con acceso a ajustes; puede registrar la lectura escribiendo el código manualmente |
| `EscanerQr` (hecho, alcance reducido) | `@capacitor-mlkit/barcode-scanning` | Cámara | Al tocar "Escanear código QR" en `/activos/escanear` — verificado en el emulador: la app no había pedido el permiso antes, lo solicita en ese momento y abre el escáner nativo con la cámara en vivo | Mensaje con acceso a ajustes (`EscanearQrPage`, fase `permiso-denegado`) |

---

## Casos borde y estados

- [x] Cargando
- [x] Vacío (toma recién creada, sin lecturas)
- [x] Error y reintento (QR inválido, activo no pertenece al inventario)
- [x] Sin conexión (lecturas encoladas localmente, se sincronizan al recuperar red)
- [x] Permiso denegado (cámara del escáner)
- [x] Sesión expirada durante la operación

---

## Decisiones

Depende de [ADR-001](../decisiones/registros/ADR-001-patron-de-estado.md) (patrón de estado)
y de un ADR de puertos de capacidades nativas (cámara y escáner QR), a registrar en 12.2.

---

## Pruebas

- **Unitarias:** `RegistrarLectura` (QR válido, repetido, de activo inexistente),
  `CerrarToma` (cálculo de encontrados/faltantes/sobrantes), `TomaMapper`.
- **De componente / UI:** `EscaneoTomaPage` en sus cuatro fases.
- **Integración / E2E:** crear toma → escanear 3 activos en modo avión → recuperar conexión →
  cerrar toma → ver resultado.
