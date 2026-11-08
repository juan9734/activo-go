# Estructura del proyecto

> Monorepo: `api/` (backend) y `mobile/` (app Ionic + Angular + Capacitor). Árbol real de
> `mobile/src/app` y sus reglas. Dónde va el código de una feature nueva.

~~~text
activo-go/
├── api/                         backend (ver docs/03-api-y-datos/ para sus endpoints)
└── mobile/
    ├── android/                 proyecto nativo Android (sí se versiona; la llave de firma no)
    └── src/app/
        ├── core/                       transversal a todas las features
        │   ├── di/                     providers y tokens de inyección (raíz de composición)
        │   ├── network/                cliente HTTP único e interceptores (token y refresh, timeout, errores)
        │   ├── storage/                puertos y adaptadores: almacenamiento seguro y caché local
        │   ├── nativo/                 puertos de capacidades nativas y sus adaptadores Capacitor
        │   └── theme/                  tokens de diseño (o mobile/src/theme/variables.scss)
        ├── features/
        │   └── <feature>/              kebab-case: registro-activos/
        │       ├── presentation/       páginas, componentes propios y ViewModel (state holder)
        │       ├── domain/             entidades, casos de uso e interfaces de repositorio
        │       └── data/                repositorios, DTO, mappers y fuentes remota y local
        ├── shared/                     componentes de UI reutilizables, sin lógica de negocio
        ├── app.routes.ts               tabla de rutas central y guards
        └── app.config.ts               providers raíz: router, HttpClient con interceptores
~~~

## Reglas que el árbol debe cumplir

- Una feature = una carpeta en `features/`. Ninguna feature importa de otra: lo común va a
  `core/` o a `shared/`.
- `domain/` no importa nada de Angular, de `HttpClient` ni de Capacitor.
- `presentation/` habla con `domain/` (casos de uso o interfaces), nunca con `data/`.
- Los plugins de Capacitor solo se importan dentro de un adaptador.
