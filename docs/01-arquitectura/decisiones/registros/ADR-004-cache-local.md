# ADR-004 — Caché local: SQLite cifrada frente a Preferences

- **ID:** ADR-004
- **Fecha:** 2026-11-08
- **Estado:** Aceptado (implementación pendiente — ver brecha declarada)
- **Autores:** Juan Diego Ninco Collazos

---

## Contexto

ActivoGo necesita consultar el inventario de activos sin conexión (mínimo 6), y se proyecta
que una organización real puede tener entre 1 000 y 5 000 activos. Este compromiso de usar
SQLite cifrada detrás de `cache-local.port.ts` ya se anunció públicamente en el foro del
curso, por lo que este ADR deja constancia formal de esa decisión y de su justificación
frente a la alternativa más simple.

**Restricciones conocidas:**
- Capacitor Preferences es clave-valor, no cifra su contenido y no está pensado para
  volúmenes grandes ni para consultas (solo para lectura/escritura de un valor completo a la
  vez).
- El dispositivo es compartido por distintos roles (ADMIN, AUDITOR, CONSULTA) a lo largo del
  tiempo, por lo que los datos cacheados deben poder borrarse de forma confiable al cerrar
  sesión.

---

## Decisión

**Decidimos:** usar SQLite cifrada como almacén de la caché de lectura de activos, detrás de
la interfaz `cache-local.port.ts`, en vez de Capacitor Preferences.

**Justificación:** con 1 000 a 5 000 registros, Preferences obligaría a leer y escribir el
arreglo completo en cada actualización (no permite upsert parcial ni consultas), lo que
degrada el rendimiento de forma proporcional al tamaño del inventario; SQLite permite
consultas indexadas por código o estado y upserts fila por fila. El cifrado es necesario
porque, a diferencia de los tokens (que van en almacenamiento seguro dedicado), los datos de
activos cacheados sí pueden incluir información operativa sensible de la organización
(ubicaciones, responsables) que no debe quedar legible si el dispositivo se pierde.

---

## Alternativas evaluadas

| Alternativa | A favor | En contra | Razón para descartarla |
|-------------|---------|-----------|-------------------------|
| SQLite cifrada — elegida | Consultas indexadas; upsert parcial; cifrado en reposo; escala a miles de registros | Más superficie de código (esquema, migraciones del lado del cliente) que un almacén clave-valor | — (elegida) |
| Capacitor Preferences | Ya disponible sin dependencia adicional; API simple | No cifra; degrada con el tamaño del inventario; sin consultas | No soporta el volumen proyectado (1 000 a 5 000 activos) ni el requisito de cifrado |
| IndexedDB (vía un *wrapper* web) | Estándar web, buen soporte de consultas | Pensado para el navegador, no para el WebView nativo de Capacitor; sin cifrado nativo propio | Añade una capa de abstracción extra sin resolver el cifrado, que sí resuelve un plugin de SQLite cifrado |

---

## Consecuencias

**Positivas:**
- El inventario cacheado queda protegido si el dispositivo se pierde o es robado.
- La consulta sin conexión escala al tamaño de inventario que el proyecto proyecta.

**Negativas / costos asumidos:**
- Requiere un plugin adicional de Capacitor (SQLite cifrado) y manejo de migraciones del
  lado del cliente, que no existían en la versión más simple con Preferences.

**Impacto en el sistema:**
- Documentos que se actualizan: `docs/03-api-y-datos/persistencia.md`,
  `docs/03-api-y-datos/offline.md`.
- Cómo se verifica en el código: `mobile/src/core/storage/cache-local.port.ts` (interfaz) y
  su adaptador SQLite.

**Brecha declarada:** a la fecha de esta entrega, `cache-local.port.ts` y su adaptador SQLite
**no están implementados todavía**; la caché de lectura demostrada en el emulador usa la
caché en memoria de TanStack Query (ver `docs/03-api-y-datos/offline.md`), que no persiste
entre reinicios de la app ni está cifrada. Este ADR documenta la decisión ya tomada y
comprometida públicamente; su implementación queda para la siguiente iteración.

---

## Referencias

- Capacitor. (s. f.). *Preferences plugin documentation*. https://capacitorjs.com/docs/apis/preferences
- SQLite. (s. f.). *SQLite documentation*. https://www.sqlite.org/docs.html
- Relacionado con: ADR-001 (patrón de estado).
