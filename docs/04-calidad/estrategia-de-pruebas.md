# Estrategia de pruebas

> Qué se prueba, en qué nivel y cuánto.

| Nivel | Qué cubre | Herramienta |
|-------|-----------|-------------|
| Unitarias | Casos de uso, state holders (ViewModel), mappers, interceptores | [Jasmine/Karma o Jest] |
| Componente / UI | Pantallas clave | [Testing Library / Angular Testing] |
| Integración / E2E | Flujos críticos | [Cypress/Playwright, si aplica] |
| Manual / exploratoria | Dispositivo real, permisos, sin conexión | ver [casos/](casos/) |

- **Mínimo exigido:** ver [definición de hecho](../00-gobierno/definicion-de-hecho.md)
