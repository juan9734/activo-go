# ADR-005 — CI y despliegue

- **ID:** ADR-005
- **Fecha:** 2026-11-08
- **Estado:** Aceptado (implementación pendiente — ver brecha declarada)
- **Autores:** Juan Diego Ninco Collazos

---

## Contexto

El mínimo 8 del curso pide pruebas en verde, un artefacto firmado y un checklist de release;
el curso también espera, como buena práctica, que un commit se convierta en un artefacto de
forma reproducible. Hay que decidir qué servicio de integración continua usar y qué tan real
o simulado es el despliegue, antes de prometer un pipeline que el repositorio no respalde.

**Restricciones conocidas:**
- El repositorio ya vive en GitHub.
- No hay cuenta de desarrollador de Google Play ni de Apple activa para este curso.
- Un solo integrante activo, sin tiempo disponible en esta entrega para configurar y
  depurar un pipeline completo (build de Android requiere Java 21, Android SDK y un
  keystore que no debe tocar el repositorio).

---

## Decisión

**Decidimos:** usar GitHub Actions como motor de integración continua (lint + pruebas en
cada PR) y declarar como **simulada** la publicación en tienda (Google Play e iOS), con el
artefacto firmado adjunto manualmente a la entrega en vez de distribuido por una pista real.

**Justificación:** GitHub Actions no agrega un proveedor nuevo (el repositorio ya está en
GitHub) y tiene un nivel gratuito suficiente para un proyecto de este tamaño. Declarar la
tienda como simulada, en vez de afirmar una publicación que no existe, sigue la regla de oro
de la rúbrica: una brecha declarada se evalúa mejor que una afirmación que el repositorio no
respalda.

---

## Alternativas evaluadas

| Alternativa | A favor | En contra | Razón para descartarla |
|-------------|---------|-----------|-------------------------|
| GitHub Actions — elegida | Sin proveedor nuevo; integrado con el repositorio; nivel gratuito suficiente | Los runners no traen preinstalado un entorno Android completo (hay que configurar JDK y SDK en el workflow) | — (elegida) |
| GitLab CI / CircleCI / Jenkins | Más control en algunos casos (Jenkins autoalojado) | Obligaría a mover el repositorio o a mantener infraestructura adicional sin necesidad | No aporta nada que GitHub Actions no resuelva ya, para un repositorio que vive en GitHub |
| Publicación real en Google Play (pista interna) | Evidencia "real" de distribución | Requiere una cuenta de desarrollador de pago que no existe para este curso | Fuera del alcance posible en el plazo y presupuesto del curso; se declara como simulada en su lugar |

---

## Consecuencias

**Positivas:**
- El flujo de CI, una vez implementado, deja evidencia automática y repetible de que lint y
  pruebas pasan antes de fusionar un PR a `main`.

**Negativas / costos asumidos:**
- Configurar un entorno Android reproducible dentro de un runner de GitHub Actions (JDK 21,
  Android SDK, caché de Gradle) es trabajo adicional que no se alcanzó a hacer en esta
  entrega.

**Impacto en el sistema:**
- Documentos que se actualizan: `docs/05-release/ci-cd.md`, `docs/05-release/firma-y-tiendas.md`.
- Cómo se verifica en el código: un archivo `.github/workflows/ci.yml` (pendiente de crear).

**Brecha declarada:** a la fecha de esta entrega **no existe ningún workflow de GitHub
Actions** en el repositorio; toda la verificación de calidad (build, lint manual, pruebas
manuales) se hizo localmente. Este ADR documenta la decisión de herramienta y de alcance
simulado de la tienda; la implementación del pipeline queda para la siguiente iteración.

---

## Referencias

- GitHub. (s. f.). *GitHub Actions documentation*. https://docs.github.com/actions
- Google. (s. f.). *Play Console help: Testing tracks*. https://support.google.com/googleplay/android-developer
- Relacionado con: ADR-003 (stack).
