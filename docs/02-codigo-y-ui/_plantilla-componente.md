# Componente — [Nombre del componente]

> **Instrucción:** copia este archivo a `docs/02-codigo-y-ui/componentes/<componente>.md`
> para documentar un componente compartido de `mobile/src/app/shared/`. Uno por componente
> reutilizable. Un componente compartido se encarga de presentación y disposición: **sin
> lógica de negocio y sin pedir datos**. Borra los bloques «Instrucción» al terminar.

- **Ubicación:** `mobile/src/app/shared/[componente]/`
- **Selector:** `app-[componente]`
- **Estado:** Borrador | Estable | Obsoleto

---

## Propósito

> **Instrucción:** ¿para qué sirve y cuándo se debe (y no se debe) usar?

---

## API pública

| Nombre | Tipo | `input()` / `output()` | Requerido | Por defecto | Descripción |
|--------|------|------------------------|-----------|-------------|-------------|
| [titulo] | `string` | `input()` | Sí | — | [qué controla] |
| [seleccionado] | `string` | `output()` | — | — | [cuándo se emite] |

---

## Estados visuales

| Estado | Apariencia |
|--------|------------|
| Normal | [descripción] |
| Presionado / con foco | [descripción] |
| Deshabilitado | [descripción] |
| Cargando | [descripción] |
| Error | [descripción] |

---

## Tokens que usa

- **Color:** [p. ej. `--ion-color-primary`, `--ion-color-danger`]
- **Espaciado:** [p. ej. `--app-space-sm`, `--app-space-md`]
- **Tipografía:** [p. ej. `--app-text-title`, `--app-text-body`]

> **Instrucción:** ningún color, tamaño ni espaciado va escrito a mano en el componente:
> todo sale de los tokens de `sistema-de-diseno.md`. Tema claro y oscuro cambian valores,
> no componentes.

---

## Accesibilidad

- **Rol y etiqueta:** [cómo lo anuncia el lector de pantalla]
- **Área táctil:** [tamaño mínimo]
- **Foco y teclado:** [orden de foco, si aplica]

---

## Ejemplo de uso

~~~html
<app-[componente]
  [titulo]="'Activos pendientes'"
  ([seleccionado])="abrir($event)">
</app-[componente]>
~~~

> **Instrucción:** declara el componente `standalone` con
> `changeDetection: ChangeDetectionStrategy.OnPush`; recibe datos por `input()` y avisa por
> `output()`. Si necesita un servicio de datos, no es un componente compartido: es parte de
> una feature.
