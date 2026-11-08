# Estructura del proyecto

Monorepo: `api/` (backend) y `mobile/` (app Ionic React + Capacitor). Árbol real de
`mobile/src` y sus reglas. Dónde va el código de una feature nueva.

~~~text
activo-go/
├── api/                          Node + Express 5 + TypeScript + Prisma 7 + PostgreSQL
│   ├── prisma/                   schema.prisma y migraciones
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── middlewares/
│       └── schemas/              validación con Zod
└── mobile/
    ├── android/                  proyecto nativo Android (sí se versiona; la llave de firma no)
    └── src/
        ├── core/                        transversal a todas las features
        │   ├── di/                      raíz de composición: contexto de React con las implementaciones concretas
        │   ├── network/                 cliente Axios único e interceptores (correlation-id, auth, refresh, timeout, errores)
        │   ├── storage/                 puertos y adaptadores: almacenamiento seguro y caché local (SQLite cifrada)
        │   ├── nativo/                  puertos de capacidades nativas (cámara, escáner QR) y sus adaptadores Capacitor
        │   └── theme/                   tokens de diseño (variables.css)
        ├── features/
        │   ├── auth/                    login, refresh, logout, bloqueo por intentos fallidos
        │   ├── activos/                 alta, edición, estado, foto, asignaciones, exportación CSV
        │   └── tomas-fisicas/           crear toma, escanear lecturas, cerrar y calcular resultado
        │       └── <feature>/
        │           ├── presentation/    páginas, componentes propios y hook ViewModel por pantalla
        │           ├── domain/          entidades, casos de uso e interfaces de repositorio (TypeScript puro)
        │           └── data/            repositorios, DTO, mappers y fuentes remota y local
        ├── shared/                      componentes de UI reutilizables, sin lógica de negocio
        ├── testing/                     dobles de prueba escritos a mano (sin vi.fn ni mocks automáticos)
        └── app/
            ├── routes.tsx                tabla de rutas central y guards
            └── App.tsx                   providers raíz (contexto de DI, React Router)
~~~

## Reglas que el árbol debe cumplir

- Una feature = una carpeta en `features/`. Ninguna feature importa de otra: lo común va a
  `core/` o a `shared/`.
- `domain/` es TypeScript puro: no importa React, Ionic, Axios ni Capacitor.
- `presentation/` usa solo casos de uso de `domain/` mediante hooks ViewModel; nunca llama a
  `data/` ni a `HttpClient`/Axios directamente.
- Solo `core/di/` conoce las implementaciones concretas (qué repositorio HTTP, qué adaptador
  de storage) y las inyecta vía contexto de React.
- Los plugins de Capacitor (cámara, escáner QR) solo se importan dentro de los adaptadores de
  `core/nativo/`, detrás de un puerto (interfaz).
- La regla de capas se verifica con ESLint (`no-restricted-imports`): un `import axios` dentro
  de `domain/` debe hacer fallar `npm run lint`.
