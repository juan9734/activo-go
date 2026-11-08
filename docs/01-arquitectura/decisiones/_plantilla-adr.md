# ADR-NNN — [Título de la decisión]

> **Instrucción:** copia este archivo a
> `docs/01-arquitectura/decisiones/registros/ADR-NNN-titulo-corto.md` y reemplaza NNN por el
> consecutivo (001, 002, 003…). Diligéncialo completo, en especial las alternativas
> evaluadas. Un ADR aceptado no se borra: si cambia la decisión, se marca «Reemplazado por
> ADR-NNN» y se escribe uno nuevo. Borra los bloques «Instrucción» al terminar.

- **ID:** ADR-NNN
- **Fecha:** AAAA-MM-DD
- **Estado:** Propuesto | Aceptado | Rechazado | Reemplazado por ADR-NNN
- **Autores:** [nombres]

---

## Contexto

> **Instrucción:** describe el problema que obliga a decidir. ¿Por qué decidir ahora? ¿Qué
> pasa si no se decide? Usa hechos del proyecto, no generalidades.

[Descripción del contexto…]

**Restricciones conocidas:**
- [Técnica, de tiempo, de plataforma, de conocimiento de la pareja, etc.]

---

## Decisión

> **Instrucción:** una sola frase que diga con claridad qué se decide.

**Decidimos:** [descripción]

**Justificación:**
[Por qué esta opción es la correcta en este contexto. Cuál fue el criterio que desempató.]

---

## Alternativas evaluadas

| Alternativa | A favor | En contra | Razón para descartarla |
|-------------|---------|-----------|------------------------|
| [Opción A — elegida] | [ventajas] | [desventajas] | — (elegida) |
| [Opción B] | [ventajas] | [desventajas] | [por qué no] |
| [Opción C] | [ventajas] | [desventajas] | [por qué no] |

---

## Consecuencias

**Positivas:**
- [Beneficio]

**Negativas / costos asumidos:**
- [Costo o limitación — todo ADR tiene al menos una]

**Impacto en el sistema:**
- Features y pantallas afectadas: [lista]
- Documentos que se actualizan: [lista, p. ej. `capas-y-estado.md`, `navegacion.md`]
- Cómo se verifica en el código: [regla de lint, prueba o ruta del archivo que lo materializa]

---

## Referencias

- [Documentación oficial, artículos — en APA 7]
- Relacionado con: [otros ADR]

---

> **Instrucción — registro:** agrega una fila en `decisiones/README.md` por cada ADR:
>
> | # | Título | Estado | Fecha |
> |---|--------|--------|-------|
> | ADR-001 | Patrón de estado | Aceptado | AAAA-MM-DD |
>
> **ADR mínimos del proyecto:** patrón de estado (obligatorio) y al menos dos más; por
> ejemplo navegación (tabla central y guard), stack y librerías complementarias,
> persistencia local, almacenamiento seguro de tokens o puertos de capacidades nativas.
>
> **Antes de aceptarlo, revisa:** ¿la decisión cabe en una frase? ¿hay al menos dos
> alternativas reales descartadas con razón? ¿hay al menos una consecuencia negativa? Si
> no se te ocurre ninguna alternativa, probablemente no era una decisión.
