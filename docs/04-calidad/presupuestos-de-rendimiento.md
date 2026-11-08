# Presupuestos de rendimiento

> Qué presupuestos tiene la app y cómo se detecta una regresión.

| Métrica | Presupuesto | Cómo se mide |
|---------|-------------|---------------|
| Arranque en frío | [ms] | [dispositivo/emulador de referencia] |
| Tamaño del AAB/APK | [MB] | `angular.json` `budgets` + tamaño del artefacto |
| [otra métrica] | [valor] | [método] |

> Se revisan en cada [checklist de release](../05-release/_plantilla-checklist-release.md),
> comparando contra el release anterior.
