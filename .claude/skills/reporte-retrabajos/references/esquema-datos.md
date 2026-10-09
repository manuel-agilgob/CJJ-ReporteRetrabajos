# Esquema de los datos publicados (modo A)

Resumen para leer los JSON sin acceso al repositorio. La definición completa es `agente/contrato-datos.md`.

## Raíz de `reportes/<inicio>.json`

| Clave | Contenido |
|---|---|
| `meta` | `periodoInicio`, `periodoFin` (sábado → viernes), `etiquetaPeriodo`, `generado`, `fuente`, `version` (de la plantilla). |
| `categorias` | Arreglo de textos, longitud `N` (hoy 12). Es el eje de todos los `counts` y filas de `matriz`. |
| `etapaPorDefecto` | Etapa con más retrabajos del periodo. |
| `etapas` | 8 objetos `{key, sub, counts[N]}` en orden `DOR, DEV, AI, LEAD-REV, QA, MERGE, SAND, PROD`. `counts[i]` = retrabajos de esa etapa con la categoría `categorias[i]`. `PROD` siempre en ceros. |
| `hotfixes` | `ambientes[]` (`SAND`/`PROD`: `total`, `delta`, `direccion`, `horasMedia`, `criticos`) y `detalle[]` (`clave`, `ambiente`, `titulo`, `causa`, `severidad`, `horas`, `fecha`). |
| `colaboradores` | `{nombre, rol, tarjetas, matriz}`; `matriz[etapa]` = arreglo de `N` enteros (sin `PROD`). Incluye a toda la lista fija; `Otros` y `Sin asignar` solo si tuvieron retrabajos. |
| `actividades` | Una por tarjeta con cambio de estado: `clave`, `responsable`, `creada`, `estado`, `tramos[]` (`etapa`, `inicio`, `fin`) y `retrabajos[]` (`fecha`, `desde`, `categoria`). Ausente en periodos anteriores a `v1.1`. `titulo` siempre es `"n/d"`. |

## Vocabulario

- **Etapas** (orden del flujo): `DOR` listo para tomar · `DEV` desarrollo · `AI` revisión asistida · `LEAD-REV` revisión de
  lead · `QA` pruebas · `MERGE` integración · `SAND` sandbox · `PROD` producción. En los tramos aparece además `RET`
  (mientras la tarjeta estuvo en `Retrabajo`).
- **La etapa de un retrabajo** es donde estaba la tarjeta *antes* de regresar a `Retrabajo` (donde se detectó el problema).
- **Severidad de hotfix:** `Crítica` (Highest), `Mayor` (High), `Menor` (Medium/Low/Lowest).
- **Deltas:** signo explícito y el negativo con `−` (U+2212): `+1`, `−2`, `0`. Normalizar antes de convertir a número.
- Un retrabajo cuenta cada transición a `Retrabajo`: una tarjeta con tres regresos aporta tres.

## Cálculos habituales

- Total de retrabajos del periodo = suma de todos los `counts` (= suma de todas las `matriz` = suma de `retrabajos` en
  `actividades`).
- Tasa de retrabajo por tarjeta = retrabajos / `len(actividades)` (solo desde `v1.1`).
- Días en una etapa = `fin − inicio` de cada tramo; los tramos están recortados al periodo, no son la vida completa de la
  tarjeta.
- Carga por persona: `colaboradores[].tarjetas` frente a su suma de `matriz`.
