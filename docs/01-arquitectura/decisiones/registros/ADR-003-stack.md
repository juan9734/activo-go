# ADR-003 — Stack: Ionic React frente a Angular

- **ID:** ADR-003
- **Fecha:** 2026-11-08
- **Estado:** Aceptado
- **Autores:** Juan Diego Ninco Collazos

---

## Contexto

El mínimo 1 del curso pide explícitamente Ionic 8+ con **Angular** y Capacitor. ActivoGo se
construyó con Ionic **React**. Esta decisión ya estaba tomada (y el proyecto ya avanzado con
ella) antes de formalizar este registro, por lo que este ADR documenta y deja constancia de
una decisión de hecho, no de una elección hecha desde cero entre las dos opciones en
igualdad de condiciones.

**Restricciones conocidas:**
- El curso evalúa explícitamente contra Angular; usar un framework distinto pone en riesgo
  ese mínimo si no hay una excepción explícita.
- Un solo integrante activo en el proyecto (trabajo individual, no la pareja que asume el
  curso), con más experiencia previa en el ecosistema de React que en Angular.
- Plazo de entrega muy ajustado: la curva de aprendizaje del framework afecta directamente
  cuánto producto se alcanza a construir.

---

## Decisión

**Decidimos:** usar Ionic React (`@ionic/react`) en vez de Ionic Angular, con una excepción
explícita solicitada y confirmada por escrito con el tutor del curso para el mínimo 1.

**Justificación:** el criterio que desempató fue la velocidad de desarrollo bajo el plazo
real disponible: la familiaridad previa con componentes funcionales y hooks de React permite
avanzar más rápido que aprender Angular (TypeScript con decoradores, *Reactive Forms*,
inyección de dependencias del framework) desde cero en el tiempo del curso, sin sacrificar
ninguna de las capacidades que exige el mínimo 1 (Capacitor, compilación a Android).

---

## Alternativas evaluadas

| Alternativa | A favor | En contra | Razón para descartarla |
|-------------|---------|-----------|-------------------------|
| Ionic React — elegida | Mayor velocidad de desarrollo por familiaridad previa; TanStack Query reduce el código de estado del servidor; mismo TypeScript que la API | Requiere una excepción escrita frente al mínimo 1 del curso, que pide Angular | — (elegida; excepción ya confirmada con el tutor) |
| Ionic Angular (lo que pide el mínimo 1 sin excepción) | Cumple el mínimo 1 sin necesidad de excepción; Router y formularios reactivos incluidos en el framework | Curva de aprendizaje alta para quien no lo ha usado antes; mayor riesgo de no alcanzar a construir el producto en el plazo | El costo de aprendizaje bajo este plazo superaba el beneficio de evitar la excepción |
| Ionic Vue | Curva de aprendizaje baja a media; sintaxis declarativa sencilla | Sin experiencia previa del autor; ecosistema de librerías complementarias más pequeño que el de React | Tampoco cumple el mínimo 1 sin excepción, y no aporta la ventaja de familiaridad que sí tiene React |

---

## Consecuencias

**Positivas:**
- Se pudo avanzar con el producto (autenticación real, lista de activos, cámara) dentro del
  plazo disponible, apoyado en librerías ya conocidas (TanStack Query, Axios).

**Negativas / costos asumidos:**
- El mínimo 1 del curso queda condicionado a que la excepción escrita sea aceptada
  formalmente en la calificación; sin ella, ese mínimo está en riesgo.
- Toda la documentación y las plantillas del curso, pensadas en términos de Angular,
  tuvieron que traducirse a sus equivalentes en React (ver la tabla de traducción en
  `CLAUDE.md`), lo que agregó trabajo de documentación adicional.

**Impacto en el sistema:**
- Afecta la totalidad del código de `mobile/`: componentes, enrutamiento, formularios y
  gestión de estado siguen convenciones de React, no de Angular.
- Documentos que se actualizan: `CLAUDE.md` (tabla de traducción Angular → React),
  `docs/01-arquitectura/estructura-del-proyecto.md`, `docs/02-codigo-y-ui/estandares-de-codigo.md`.
- Cómo se verifica en el código: `mobile/package.json` declara `@ionic/react` y
  `@ionic/react-router`, no `@ionic/angular`.

---

## Referencias

- Ionic. (s. f.-c). *Ionic Framework documentation*. https://ionicframework.com/docs
- Ionic. (s. f.-d). *Ionic React documentation*. https://ionicframework.com/docs/react
- Meta Platforms. (s. f.). *React*. https://react.dev
- Relacionado con: ADR-001 (patrón de estado).
