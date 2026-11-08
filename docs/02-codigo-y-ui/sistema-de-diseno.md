# Sistema de diseño

De dónde salen colores, espaciados y tipografía en ActivoGo, y cómo se ve en modo `md` e
`ios`.

## Tokens

- **Color:** variables CSS de Ionic (`--ion-color-primary`, `--ion-color-danger` para estado
  BAJA, `--ion-color-warning` para MANTENIMIENTO, `--ion-color-success` para ACTIVO).
- **Espaciado:** `--app-space-xs` (4px), `--app-space-sm` (8px), `--app-space-md` (16px),
  `--app-space-lg` (24px).
- **Tipografía:** `--app-text-title`, `--app-text-body`, `--app-text-caption`, definidas en
  `rem` para escalar con el tamaño de fuente del sistema.

## Temas

- Claro y oscuro: los mismos componentes de `shared/`, solo cambian los valores de los
  tokens en `mobile/src/theme/variables.css`.
- Modo `md` (Android) e `ios`: se usan los componentes nativos de Ionic (`IonicModule`) sin
  forzar un modo; cada plataforma respeta su convención visual por defecto.

## Dónde viven los tokens

- `mobile/src/theme/variables.css`
