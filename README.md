# ActivoGo

Aplicación móvil híbrida para el inventario de activos fijos.

- `mobile/`: Ionic React + Capacitor
- `api/`: Node.js + Express + TypeScript + Prisma + PostgreSQL
- `docs/`: marco de gobierno móvil 00 a 05 (método SDD)

## Cómo clonar, instalar, ejecutar y probar

### 1. Clonar

```bash
git clone https://github.com/juan9734/activo-go.git
cd activo-go
```

### 2. Base de datos (PostgreSQL con Docker)

```bash
docker compose up -d
docker exec activogo-db psql -U activogo -c "CREATE DATABASE activogo_test;"
```

### 3. API

```bash
cd api
npm install
cp .env.example .env   # ajustar si el puerto 5432 está ocupado
npx prisma migrate dev
npm run seed            # crea admin@activogo.co / auditor@activogo.co / consulta@activogo.co, clave Activo2026!
npm run dev              # http://localhost:3000 — /health debe responder {"estado":"ok"}
```

### 4. App móvil

```bash
cd mobile
npm install
npm run build
npx cap sync android
```

Abrir `mobile/android/` en Android Studio, iniciar un emulador y ejecutar `npx cap run android`
(o compilar directo con `cd mobile/android && ./gradlew assembleDebug` si `cap run` falla por el
wrapper de Gradle, e instalar el APK resultante con `adb install`). Desde el emulador, el API de
desarrollo se alcanza en `http://10.0.2.2:3000` (ya configurado en `mobile/.env.development`).

Inicia sesión con `admin@activogo.co` / `Activo2026!` para ver el inventario y tomar una foto de
un activo con la cámara del dispositivo.

### 5. Build de producción y firma (release)

```bash
cd mobile
npm run build && npx cap sync android
cd android
./gradlew assembleRelease   # requiere mobile/android/keystore.properties (no versionado, ver docs/00-gobierno/convenciones-git.md)
```

### Documentación

El marco de gobierno completo del proyecto (gobierno, arquitectura, código y UI, API y datos,
calidad, release) vive en [`docs/`](docs/README.md).
