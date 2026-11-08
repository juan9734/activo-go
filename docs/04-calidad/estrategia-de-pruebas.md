# Estrategia de pruebas

Qué se prueba, en qué nivel y cuánto, en ActivoGo.

| Nivel | Qué cubre | Herramienta | Estado |
|-------|-----------|-------------|--------|
| Unitarias (API) | `activoService.crear` (código único), `activoService.cambiarEstado` (las cuatro transiciones válidas e inválidas), `authService.login` (bloqueo tras 3 intentos fallidos), `authService.refrescar` (rotación y detección de reutilización) | Vitest, con `vi.mock` sobre los repositorios (`api/src/services/*.test.ts`) | **Hecho: 15 pruebas en verde** (`npm test` dentro de `api/`) |
| Unitarias (mobile) | Casos de uso de `domain/`, hooks ViewModel (las cuatro fases), mappers DTO↔dominio | Vitest | Brecha declarada: solo existe la prueba por defecto del starter (`App.test.tsx`, "renders without crashing") |
| Componente / UI | Pantallas clave: Login, Lista de activos, Escaneo de toma | Vitest + Testing Library | Brecha declarada |
| Integración / E2E | Flujo login → listar activos → tomar foto; flujo crear toma → escanear en modo avión → cerrar | Playwright (`mobile/playwright.config.ts`, ya generado por el starter) | Brecha declarada |
| Manual / exploratoria | Dispositivo o emulador: login, lista de activos, cámara, modo avión, release firmado | Verificación manual con capturas (Anexo 1) | **Hecho** |

- **Dobles de prueba en la API:** `vi.mock` sobre los módulos de repositorio (`usuario.repository`,
  `refresh-token.repository`, `activo.repository`), siguiendo el patrón estándar de Vitest.
- **Dobles de prueba en mobile:** se planea escribirlos a mano en `mobile/src/testing/` (sin
  `vi.fn` ni mocks automáticos), una vez existan pruebas de hooks ViewModel — brecha declarada.
- **Cobertura mínima:** 80 % en `domain/` y en los hooks ViewModel, reportada por carpeta — no
  medida todavía (brecha declarada; sí hay cobertura funcional completa de las reglas de
  transición de estado y de bloqueo de cuenta en la API).
- **Mínimo exigido antes de un PR:** ver [definición de hecho](../00-gobierno/definicion-de-hecho.md).
