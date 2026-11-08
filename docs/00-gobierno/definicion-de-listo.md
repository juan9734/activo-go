# Definición de listo (DoR)

Una historia de usuario puede entrar a un sprint **solo si se cumple todo lo siguiente**:

- [ ] El valor para el usuario está escrito (Como / Quiero / Para).
- [ ] Los criterios de aceptación están escritos y son verificables (Dado / Cuando / Entonces).
- [ ] Hay una referencia de UI enlazada (pantalla del prototipo), si la historia toca la interfaz.
- [ ] El contrato de la API existe o está simulado (método, ruta, cuerpo y respuesta), si la
      historia llama al backend.
- [ ] Están descritos los estados de carga, vacío, error y sin conexión.
- [ ] Si usa una capacidad nativa, está identificado el permiso que pide y el momento exacto
      en que lo pide (*just-in-time*).
- [ ] Las dependencias con otras historias están identificadas.
- [ ] La pareja la estimó en puntos de historia (1, 2, 3, 5, 8, 13).
- [ ] Cabe en un sprint: una historia de más de 8 puntos se divide antes de entrar.

> Si alguna casilla queda sin marcar, la historia sigue en refinamiento: **no entra al sprint**.

## Formato de historia para `backlog.md`

| ID | Historia | Criterios de aceptación | MoSCoW | Puntos | Feature |
|----|----------|-------------------------|--------|--------|---------|
| HU-01 | Como [rol], quiero [acción], para [beneficio] | Dado [contexto], cuando [acción], entonces [resultado verificable] | Must | 3 | [feature] |
| HU-02 | … | … | Should | 5 | … |

> MoSCoW = *Must* (sin esto no hay producto), *Should* (importante, no vital), *Could*
> (deseable), *Won't* (fuera de alcance en esta versión, dicho en voz alta). Las historias
> *Must* deben cubrir los mínimos del proyecto.
