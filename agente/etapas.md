# Etapas del flujo y mapa de estados de Jira

Las ocho etapas de la Figura 0, en el orden en que se muestran. `key` y `sub` se copian tal cual al JSON.

| Orden | `key` | `sub` | Estados de Jira que la alimentan (`fromString`) |
|---|---|---|---|
| 1 | `DOR` | Listo para tomar | `Tareas por hacer`, `pendiente`, `Análisis y documentación` |
| 2 | `DEV` | Desarrollo | `En curso`, `In Progress` (heredado del flujo anterior) |
| 3 | `AI` | Revisión asistida | `Finished` |
| 4 | `LEAD-REV` | Revisión de lead | `Test`, `Finalizada` |
| 5 | `QA` | Pruebas | `To Do QA Test`, `doing qa test`, `Finished qa test` |
| 6 | `MERGE` | Integración | `Aprobado` |
| 7 | `SAND` | Sandbox | `liberadas sandbox`, `validación sandbox` |
| 8 | `PROD` | Producción | `validación productivo`, `liberadas productivo` — no cuentan como retrabajo (ver abajo) |

**Descartados del conteo:** `liberadas linode` y `validadas linode`. El ambiente linode ya no existe; esos retrabajos no
pertenecen a ninguna etapa y no se reportan.

`Finalizada` la produce la validación de AI y de ahí la toma el tech-lead: un retrabajo con ese origen lo generó la
revisión de lead, no la revisión asistida.

## Reglas

- **La etapa de un retrabajo es el estado desde el que se movió la tarjeta a `Retrabajo`**: el `fromString` de esa
  transición en el changelog, que es donde se detectó el problema. No es el estado destino ni el estado actual de la
  tarjeta.
- Los nombres se comparan exactos, con mayúsculas, minúsculas y acentos como aparecen en Jira.
- **Un estado que no está en la tabla no se adivina.** El agente se detiene, lista el estado y las tarjetas afectadas, y no
  publica. Una persona lo agrega aquí y se vuelve a generar.
- **PROD no genera retrabajos.** Una corrección posterior al despliegue es un hotfix, no un retorno de la actividad. Si
  aparece una transición a `Retrabajo` desde un estado de PROD, no se cuenta en ninguna etapa y se anota como anomalía en el
  resumen de la corrida. En el JSON, `PROD` lleva siempre `counts` en ceros y `"sinRetrabajo": true`.

## Notas fijas del JSON

Se copian tal cual en la etapa correspondiente:

- `SAND.nota`: `Sandbox puede generar retrabajos cuando el despliegue revela un defecto antes de producción; es poco frecuente.`
- `PROD.nota`: `Producción no genera retrabajos: una corrección posterior al despliegue se registra como hotfix en la sección de hotfixes de despliegue, no como retorno de la actividad.`

## Relación con el pipeline

`ai-tools-documentation/src/tools/jira/reworkStage.ts` tiene este mismo mapa **salvo MERGE**: no tiene esa etapa y manda
`Aprobado` a `SAND`. Mientras no se actualice, el agente **no usa** la columna `Stage` del pipeline y deriva la etapa del
estado de origen con esta tabla. El pipeline sigue sirviendo de alarma: se detiene ante un estado que no conoce.

Si se cambia esta tabla y se usa el pipeline, hay que cambiar también `reworkStage.ts`.

## Historial

- **2026-09-04** — Mapa inicial (en `ai-tools-documentation`). Los proyectos CJJ, CJJ25 y CEN comparten los mismos 18
  estados. Se quitó MERGE y `Aprobado` quedó en SAND.
- **2026-09-23** — Se conservan las ocho etapas del diseño: `Aprobado` (revisado, listo para integrar) pasa a MERGE.
