# Presupuestos de rendimiento

Qué presupuestos tiene ActivoGo y cómo se detecta una regresión.

| Métrica | Presupuesto | Cómo se mide |
|---------|-------------|---------------|
| Bundle inicial | Aviso en 1,5 MB, error en 2 MB | Script que revisa el tamaño de `mobile/dist/` tras `npm run build` (equivalente a los presupuestos de `angular.json` del curso) |
| Pantallas con carga perezosa | < 50 kB cada una | Mismo script, por chunk generado con `React.lazy` + `Suspense` |
| Arranque en frío | ≤ 2 s (mediana de 5 repeticiones) | Medición manual con cronómetro desde que se toca el ícono hasta que `/login` es interactiva, en el mismo emulador/dispositivo que el release anterior |
| Tamaño del AAB/APK | Todo aumento frente al release anterior se justifica en el checklist de release | Comparación directa del archivo firmado |

Se revisan en cada [checklist de release](../05-release/_plantilla-checklist-release.md),
comparando contra el release anterior.
