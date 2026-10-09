# Consultar Jira con las reglas del reporte (modo B)

Condensado de `agente/INSTRUCCIONES.md`. **Si difiere de `agente/`, manda `agente/`.** Proyectos: `CJJ` y
`CJJ-ExpedienteElectronico-2025`. Todas las fechas en `America/Mexico_City`; la cuenta de Jira que consulta debe tener esa
zona en su perfil, porque Jira interpreta así las fechas del JQL.

## Periodo

Según `agente/INSTRUCCIONES.md`, dos semanas, de sábado 00:00 a viernes 23:59:59. El ciclo parte del sábado 2026-09-12; un viernes cierra periodo si la
diferencia con el 2026-09-25 es múltiplo de 14 días. Los últimos periodos publicados son de una semana (sábado → viernes): confirmar el vigente en `reportes/indice.json`. En JQL se usa `>= "<inicio> 00:00"` y `< "<cierre> 00:00"`, donde
`<cierre>` es el sábado siguiente al viernes de fin.

## Retrabajos

Un retrabajo es **cada transición** al estado `Retrabajo` dentro del periodo.

```text
project IN (CJJ, "CJJ-ExpedienteElectronico-2025") AND status CHANGED TO "Retrabajo" DURING ("<inicio> 00:00", "<cierre> 00:00")
```

- El JQL devuelve tarjetas, y cada una trae **todas** sus transiciones: filtrar cada una por su fecha, o se recuentan
  retrabajos de periodos anteriores.
- Pedir `expand=changelog`; si viene truncado, paginar `/rest/api/3/issue/<clave>/changelog`. Un resultado truncado o
  incompleto invalida la consulta: no reportar cifras parciales como totales.
- Transición = entrada del changelog con `field = status` y `toString = Retrabajo`. Fecha = `created`; origen =
  `fromString`.
- **Los estados se resuelven por id** (`from`/`to`) contra `/rest/api/3/status`: algunos se renombraron (`To Do` → `Tareas
  por hacer`, `Approved` → `Aprobado`, `Done` → `Finalizada`).

## Etapa (por estado de origen)

| Etapa | Estados |
|---|---|
| `DOR` | `Tareas por hacer`, `pendiente`, `Análisis y documentación` |
| `DEV` | `En curso`, `In Progress` |
| `AI` | `Finished` |
| `LEAD-REV` | `Test`, `Finalizada` |
| `QA` | `To Do QA Test`, `doing qa test`, `Finished qa test` |
| `MERGE` | `Aprobado` |
| `SAND` | `liberadas sandbox`, `validación sandbox` |
| `PROD` | `validación productivo`, `liberadas productivo` — **no cuenta como retrabajo**; es anomalía |

Descartados (ambiente linode, ya no existe): `liberadas linode`, `validadas linode`. **Un estado que no esté en la tabla no
se adivina:** detenerse y reportarlo.

## Categoría

Se asigna con `agente/categorias.md` (12 categorías), con base **solo en el comentario** asociado a la transición: el del
mismo autor más cercano dentro de ±10 minutos. Sin comentario → «No hay comentarios para categorizar»; comentario sin motivo
claro → «OTRO, No se ajusta a ninguna categoria definida». Si el código falla es 1 o 5 aunque haya malas prácticas; «Malas
prácticas de programación» solo cuando el retorno es por calidad y no por comportamiento. Los textos se copian letra por
letra, con sus faltas de acento.

## Responsable

El asignado **en el momento de la transición**: valor del último cambio de `assignee` anterior a esa fecha; si no hubo,
el `fromString` del primer cambio posterior; si nunca cambió, el actual. Fuera de la lista fija (`agente/colaboradores.md`)
→ `Otros`; sin asignado → `Sin asignar`. En lo que se publique solo va el nombre de pila.

## Hotfix

Tarjeta de los mismos proyectos **creada** en el periodo cuyo nombre contenga «hotfix» (sin distinguir mayúsculas) **o** que
tenga la etiqueta `hotfix` (una sola vez si cumple ambas). La búsqueda de texto de Jira es aproximada: confirmar la
coincidencia literal.

- **Ambiente:** campo `Entorno`; si está vacío, `sandbox`/`sand` → `SAND`, `producción`/`productivo`/`prod` → `PROD`. Si no
  se puede decidir o hay contradicción, no se cuenta y se lista aparte.
- **Severidad:** `Highest` → Crítica, `High` → Mayor, el resto → Menor.
- **Horas:** `aggregatetimespent` (incluye subtareas), en horas con un decimal; sin registro, `n/d`.
- **Causa:** se clasifica con las mismas categorías, con la descripción y los comentarios de la tarjeta.

## Cuándo detenerse

Estado de origen fuera del mapa, categoría fuera de la taxonomía, `accountId` de la lista que no existe en Jira, resultado
truncado o credenciales rechazadas, o periodo que no es del ciclo o no ha cerrado. Informar qué falta y qué tarjetas lo
causan; no completar con suposiciones.

## Privacidad

El repositorio y el sitio son públicos. Nunca escribir en un archivo correos, apellidos, usuarios de Jira ni extracciones
crudas; el trabajo intermedio va en `.tmp/` (ignorado). Las personas se identifican por `accountId` o nombre de pila.
