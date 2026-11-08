# Estrategia de pruebas

Qué se prueba, en qué nivel y cuánto, en ActivoGo.

| Nivel | Qué cubre | Herramienta |
|-------|-----------|-------------|
| Unitarias | Casos de uso de `domain/` (transiciones de estado, cálculo de encontrados/faltantes/sobrantes, bloqueo por intentos fallidos), hooks ViewModel (las cuatro fases), mappers DTO↔dominio | Vitest (`npm run test:ci`) |
| Componente / UI | Pantallas clave: Login, Lista de activos, Escaneo de toma | Vitest + Testing Library |
| Integración / E2E | Flujo login → listar activos → tomar foto; flujo crear toma → escanear en modo avión → cerrar | Playwright (`mobile/playwright.config.ts`, ya generado por el starter) |
| Manual / exploratoria | Dispositivo o emulador: permisos, modo avión, firma del release | Ver [casos/](casos/) |

- **Dobles de prueba:** escritos a mano en `mobile/src/testing/` (repositorios y adaptadores
  falsos); no se usan `vi.fn` ni mocks automáticos, para que cada doble exprese el
  comportamiento real que simula.
- **Cobertura mínima:** 80 % en `domain/` y en los hooks ViewModel, reportada por carpeta.
- **Mínimo exigido antes de un PR:** ver [definición de hecho](../00-gobierno/definicion-de-hecho.md).
