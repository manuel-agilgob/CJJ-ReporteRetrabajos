# Instrucciones del agente — reporte de retrabajos

Proceso para generar el reporte de un periodo. El agente **solo escribe datos**: un JSON por periodo y su entrada en el
índice. La plantilla (`plantilla/`) y la configuración (`categorias.md`, `etapas.md`, `colaboradores.md`) las mantiene una
persona; el agente las lee y no las edita.

## Qué consulta

| Archivo | Para qué |
|---|---|
| `agente/INSTRUCCIONES.md` | Este proceso. |
| `agente/contrato-datos.md` | Cómo se llena cada clave del JSON y qué se verifica antes de publicar. |
| `agente/categorias.md` | Taxonomía de retrabajos y de causas de hotfix, con sus criterios. |
| `agente/etapas.md` | Mapa de estado de Jira → etapa del flujo. |
| `agente/colaboradores.md` | Lista fija de desarrolladores: cuenta de Jira, nombre publicado y rol. |
| `agente/plantilla-vacia.json` | Esqueleto del JSON de un periodo. |

## Programación

- **Periodo:** dos semanas, de sábado 00:00 a viernes 23:59:59, hora de la Ciudad de México (`America/Mexico_City`).
- **Ciclo:** el primer periodo va del sábado 2026-09-12 al viernes 2026-09-25. Los siguientes se encadenan cada 14 días:
  2026-09-26 → 2026-10-09, 2026-10-10 → 2026-10-23, 2026-10-24 → 2026-11-06… Es decir, un viernes sí y uno no.
- **Cuándo corre:** en cuanto cierra el viernes de fin de periodo. Una rutina no se puede programar «cada dos semanas», así
  que se programa **cada sábado a las 00:15** de la Ciudad de México (cron `15 0 * * 6`; en UTC, `15 6 * * 6`), y en cada
  corrida el agente decide si le toca (paso 0). Si se programara el viernes, lo que ocurra entre la hora de la corrida y
  las 23:59 quedaría fuera del periodo.
- **Desde dónde:** una rutina programada de Claude Code en la web (claude.ai/code) sobre este repositorio. **Pendiente de
  configurar.** Requisitos:
  - acceso directo a Jira (API REST v3 o conector de Atlassian), necesario en cualquier vía (pasos 3 y 4);
  - que la cuenta de Jira con la que consulta tenga la zona horaria `America/Mexico_City` en su perfil: Jira interpreta las
    fechas del JQL en esa zona, y así coinciden con las del periodo;
  - definir cómo publica: commit directo a `main` o PR para revisión.
- **A mano:** también se puede pedir en una sesión, por ejemplo «genera el reporte del periodo 2026-09-12 → 2026-09-25».

## Paso 0 — Determinar el periodo

- Un viernes **cierra periodo** si la diferencia con el 2026-09-25 es un múltiplo exacto de 14 días.
- Si corre la rutina: el periodo es el que cerró el viernes anterior a la corrida (inicio = ese viernes menos 13 días). Si
  ese viernes no cerró periodo, la corrida termina sin cambios e informa «semana sin reporte».
- Si se pide a mano: el periodo pedido debe ser uno del ciclo y ya cerrado.
- Si `reportes/<inicio>.json` ya existe, no se sobrescribe, salvo que se pida explícitamente regenerarlo.

En los pasos siguientes, `<inicio>` es el sábado en que empieza el periodo, `<fin>` el viernes en que termina y `<cierre>` el
sábado siguiente a `<fin>`.

## Paso 1 — Extraer los retrabajos

Un **retrabajo** es cada transición de una tarjeta al estado `Retrabajo` con fecha desde `<inicio> 00:00` y hasta antes de
`<cierre> 00:00`, hora de la Ciudad de México. Proyectos: `CJJ` y `CJJ-ExpedienteElectronico-2025`.

```text
project IN (CJJ, "CJJ-ExpedienteElectronico-2025") AND status CHANGED TO "Retrabajo" DURING ("<inicio> 00:00", "<cierre> 00:00")
```

Ese JQL encuentra las **tarjetas**, pero cada tarjeta trae **todas** sus transiciones a `Retrabajo`, también las de periodos
anteriores. Hay que filtrar cada transición por su fecha; si no, se cuentan de nuevo retrabajos ya reportados.

Se extrae por una de dos vías; `meta.fuente` declara cuál se usó. Las dos necesitan además el acceso directo a Jira para
los colaboradores y los hotfixes.

### Vía A — pipeline `generate-rework-report` (vigente)

En una copia de `ai-tools-documentation`, en una rama que incluya `src/tools/jira/reworkStage.ts` (hoy
`feat/reporte-retrabajo-html`) y con su `.env` (`JIRA_*` y la llave del LLM clasificador):

```bash
npm run dev -- generate-rework-report \
  --jql '<JQL de arriba>' \
  --max-results 1000 \
  --output .tmp/rework_<inicio>.xlsx
```

- **Sin `--resume`**: la caché de `.tmp/` no distingue el JQL y mezclaría datos de otra consulta.
- Si el número de issues analizados es igual a `--max-results`, el resultado está truncado: subir el límite y repetir.
- **Leer `.tmp/classified_issue.json`, no el `.xlsx`**: la hoja `Rework` no trae la fecha de la transición. Cada elemento es
  una transición, con `history[0].date` (epoch en milisegundos), `history[0].from` (estado de origen), `history[0].author`
  y `reworkCategory`.
- **No usar la etapa que calcula el pipeline** (columna `Stage`): su mapa no tiene MERGE. La etapa se deriva en el paso 2.
- Si el comando se detiene por estados desconocidos, la generación se detiene también y se reporta.

### Vía B — consulta directa a Jira (alternativa)

Cuando el entorno no tiene el pipeline:

1. Buscar con el mismo JQL, pidiendo `expand=changelog` y los campos `summary`, `assignee` y `comment`. Paginar todo: la
   búsqueda y, si viene truncado, el changelog de cada tarjeta (`/rest/api/3/issue/<clave>/changelog`).
2. Cada entrada del changelog con un ítem `field = status` y `toString = Retrabajo` es una transición: fecha = `created` de
   la entrada, origen = `fromString`, autor = `author`.
3. El comentario asociado es el del mismo autor más cercano en el tiempo, dentro de ±10 minutos de la transición (el mismo
   criterio que usa el pipeline).
4. La categoría se asigna con `categorias.md`, con base **solo** en ese comentario.

## Paso 2 — Etapa y categoría de cada retrabajo

1. Quitar las transiciones que caen fuera del periodo.
2. Etapa = la que `etapas.md` asigna al estado de origen.
   - Estado descartado (linode): no se cuenta.
   - Estado de PROD: no se cuenta; se anota como anomalía.
   - Estado que no está en el mapa: **detener**.
3. Categoría = el texto de `categorias.md`, aplicando la equivalencia del clasificador. Un valor que no esté: **detener**.

## Paso 3 — Colaboradores

1. Tomar la lista de `colaboradores.md` y resolver cada cuenta (correo o `accountId`) a su `accountId` de Jira. Una cuenta
   que no se encuentra: **detener** y reportarla.
2. **Todos los de la lista van en el JSON**, en el orden de la lista, aunque en el periodo tengan todo en cero.
3. El responsable de un retrabajo es el asignado (`assignee`) de la tarjeta **en el momento de la transición**. En el
   changelog es el valor del último cambio de `assignee` anterior a esa fecha. Si no hubo cambios antes, es el valor previo
   (`fromString`) del primer cambio posterior. Si nunca cambió, es el asignado actual.
   - Responsable que no está en la lista → entrada `Otros`.
   - Tarjeta sin responsable → entrada `Sin asignar`.
   - Estas dos entradas solo se agregan si tienen retrabajos. El resumen de la corrida nombra a quienes cayeron en `Otros`,
     para decidir si se agregan a la lista.
4. `matriz[etapa][i]` = retrabajos de esa persona en esa etapa con la categoría `i`.
5. `tarjetas`:
   - Personas de la lista: tarjetas distintas de las que fue asignada en algún momento del periodo y que cambiaron de estado
     en el periodo.

     ```text
     project IN (CJJ, "CJJ-ExpedienteElectronico-2025") AND assignee WAS <accountId> DURING ("<inicio> 00:00", "<cierre> 00:00") AND status CHANGED DURING ("<inicio> 00:00", "<cierre> 00:00")
     ```

   - `Otros` y `Sin asignar`: tarjetas distintas entre sus retrabajos.
6. Si no hay forma de consultar el changelog, se usa el asignado actual (en la vía A, `fields.assignee` de
   `.tmp/issues_with_history.json`) y se declara con el texto alterno de `colaboradoresNota`.

## Paso 4 — Hotfixes

- **Qué es un hotfix:** una tarjeta de los mismos proyectos cuyo nombre (`summary`) contiene «hotfix», sin distinguir
  mayúsculas, y que se **creó** dentro del periodo.

  ```text
  project IN (CJJ, "CJJ-ExpedienteElectronico-2025") AND summary ~ "hotfix" AND created >= "<inicio> 00:00" AND created < "<cierre> 00:00"
  ```

  La búsqueda de texto de Jira es aproximada: confirmar que el nombre contenga literalmente «hotfix».
- **Ambiente:** donde se detectó el problema. Se toma, en este orden:
  1. el campo `Entorno` de la tarjeta (`environment`), si está lleno;
  2. lo que digan el nombre o la descripción sobre dónde se detectó: `sandbox` o `sand` → `SAND`; `producción`,
     `productivo` o `prod` → `PROD`.

  Si nada lo dice, o se contradice, el hotfix no se cuenta y se lista en el resumen de la corrida para que se complete la
  tarjeta.
- **Severidad:** la prioridad de Jira. `Highest` → `Crítica`; `High` → `Mayor`; `Medium`, `Low` y `Lowest` → `Menor`.
- **Horas:** el tiempo dedicado a resolver la tarjeta, del campo `Σ Tiempo empleado` (`aggregatetimespent`: el `Tiempo
  Trabajado` de la tarjeta más el de sus subtareas), en horas con un decimal. Sin horas registradas, `"n/d"`. Se toma el
  valor al momento de generar.
- **Causa:** se clasifica con `categorias.md` a partir de la descripción y los comentarios de la tarjeta.
- **Delta por ambiente:** contra el JSON del periodo anterior en `reportes/` (el que terminó 14 días antes). Si no existe,
  `"n/d"` y `flat`.

## Paso 5 — Armar el JSON

Copiar `agente/plantilla-vacia.json` a `reportes/<inicio>.json` y llenarlo según `contrato-datos.md`.

## Paso 6 — Verificar

Comprobar todas las invariantes de `contrato-datos.md`. Si una falla, se corrige; si no se puede corregir, se detiene la
generación.

## Paso 7 — Publicar

1. Agregar el periodo a `reportes/indice.json` como `{ "inicio": "<inicio>", "fin": "<fin>", "archivo": "<inicio>.json" }`,
   en orden ascendente por `inicio`. Las cifras de la portada (retrabajos, etapa dominante) las calcula `index.html` a partir
   del JSON: no se escriben a mano.
2. Commit en español: `reporte: periodo <inicio> → <fin>`. Si va directo a `main` o por PR queda por definir al configurar
   la rutina. Al llegar a `main`, el workflow `.github/workflows/pages.yml` publica el sitio.
3. **Lo que está en `reportes/` es público.** Pages publica solo `index.html`, `plantilla/` y `reportes/`: ahí nunca van
   correos, apellidos, usuarios de Jira ni extracciones crudas. El trabajo intermedio se hace en `.tmp/`, que está ignorado.

## Cuándo detenerse sin publicar

- Un estado de origen que no está en `etapas.md`.
- Una categoría que no está en `categorias.md`.
- Una cuenta de `colaboradores.md` que no existe en Jira.
- Un resultado de Jira truncado o incompleto: límite alcanzado, paginación fallida o credenciales rechazadas.
- Una invariante del contrato que no se cumple.
- Un periodo que no es del ciclo, que no ha cerrado, o que ya está publicado y no se pidió regenerar.

En esos casos no se escribe nada en `reportes/`, y se informa qué falta y qué tarjetas lo causan.

## Resumen de la corrida

Al terminar, o al detenerse, el agente informa en su respuesta (y en la descripción del PR, si abre uno):

- el periodo, la vía de extracción usada, los retrabajos contados y los descartados (con el motivo) y los hotfixes;
- las anomalías: transiciones desde PROD, hotfixes sin ambiente y responsables que cayeron en `Otros`;
- las aproximaciones usadas, como el asignado actual en lugar del histórico.

## Pendientes de definir

- Configurar la rutina: acceso a Jira (con la zona horaria de la cuenta), vía de extracción y destino del commit.
- Llenar la lista de `colaboradores.md`: cuentas, nombres publicados y roles.
- Activar Pages con la fuente «GitHub Actions» (ver `README.md`).
- Actualizar `reworkStage.ts` en `ai-tools-documentation` para que `Aprobado` vaya a MERGE (ver `etapas.md`).
