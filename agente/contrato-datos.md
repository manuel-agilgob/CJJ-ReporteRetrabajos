# Contrato del JSON de un periodo

Un archivo por periodo: `reportes/<AAAA-MM-DD>.json`, con la fecha de **inicio** del periodo (el sábado). La plantilla lo pinta con
`plantilla/reporte.dc.html?data=../reportes/<AAAA-MM-DD>.json`. Se parte siempre de `agente/plantilla-vacia.json`.

## Reglas generales

- UTF-8, indentación de 2 espacios, sin comentarios.
- **No se borra ninguna clave del esqueleto.** Un texto sin dato se escribe `"n/d"`; un conteo sin casos es `0`. Ningún
  texto queda como `""`.
- Fechas en ISO 8601 (`AAAA-MM-DD`), en hora de la Ciudad de México (`America/Mexico_City`). Donde se pide fecha y hora
  (solo en `actividades`), `AAAA-MM-DDTHH:MM`, también en hora de la Ciudad de México y sin zona.
- Deltas con signo, y el negativo con el signo menos tipográfico `−` (U+2212), como en el diseño: `+1`, `−2`, `0`.
- De las personas, solo el nombre de pila (ver `colaboradores.md`).

## Dónde se ve cada clave

| Clave | En la plantilla |
|---|---|
| `meta` | §1 Encabezado y encabezado de cada página |
| `categorias` | Renglones del desglose por etapa y de la Tabla 2 |
| `etapas`, `etapaPorDefecto` | Figura 0 y desglose por etapa |
| `hotfixes` | «Hotfixes en ambientes de despliegue» y Tabla 1 |
| `colaboradores`, `colaboradoresNota` | «Retrabajos por colaborador» y Tabla 2 |
| `actividades` | «Recorrido de actividades» y Figura 4 |

## `meta`

| Clave | Valor |
|---|---|
| `titulo` | Fijo: `Retrabajos del ciclo de entrega`. |
| `subtitulo` | Fijo: `Transiciones a Retrabajo clasificadas por motivo según la taxonomía vigente, agrupadas por la etapa del flujo donde se detectaron.` |
| `etiquetaPeriodo` | `<inicio> → <fin>`, por ejemplo `2026-09-12 → 2026-09-25`. Se repite en el encabezado de cada página. |
| `periodoInicio`, `periodoFin` | El sábado en que empieza y el viernes en que termina el periodo. |
| `generado` | Fecha en que se generó el JSON. |
| `responsable` | Fijo: `Ingeniería — Lead de entrega`. |
| `fuente` | Según la vía de extracción (`INSTRUCCIONES.md`, paso 1). Vía A: `Jira (proyectos CJJ y CJJ-ExpedienteElectronico-2025) — pipeline generate-rework-report`. Vía B: `Jira (proyectos CJJ y CJJ-ExpedienteElectronico-2025) — consulta directa, clasificación por el agente`. |
| `version` | Versión de la plantilla con que se generó, hoy `v1.1` (ver `plantilla/ORIGEN.md`). No es la versión del reporte. |

## `categorias`

Copia de la columna *Categoría* de `categorias.md`, en el mismo orden y con el mismo texto. Su longitud, `N` (hoy 11), es
la de todos los `counts` y de cada renglón de `matriz`.

## `etapas`

Las ocho etapas de `etapas.md`, en orden (`DOR`, `DEV`, `AI`, `LEAD-REV`, `QA`, `MERGE`, `SAND`, `PROD`):

| Clave | Valor |
|---|---|
| `key`, `sub` | Tal cual `etapas.md`. |
| `counts` | `N` enteros. `counts[i]` = retrabajos contados del periodo cuya etapa es esta y cuya categoría es `categorias[i]`. |
| `nota` | Solo `SAND` y `PROD`, con el texto fijo de `etapas.md`. |
| `sinRetrabajo` | Solo `PROD`: `true`. Sus `counts` son siempre ceros. |

La plantilla suma cada `counts` para la cajita RET de su etapa.

## `etapaPorDefecto`

La `key` de la etapa con más retrabajos en el periodo; si hay empate, la primera en el orden del flujo. Si el periodo no
tiene retrabajos, `DOR`. Es la etapa que se ve al abrir el reporte.

## `hotfixes`

| Clave | Valor |
|---|---|
| `nota` | Fija: `Un hotfix es una corrección desplegada fuera del flujo normal para resolver un defecto ya liberado. No cuenta como retrabajo: la actividad no regresó a una etapa anterior, se abrió trabajo nuevo. Se identifica por el término «hotfix» en el nombre de la tarjeta o por la etiqueta «hotfix», y se cuenta en el periodo en que se creó.` |
| `ambientes` | Exactamente dos objetos, en este orden: `SAND` y `PROD` (tabla siguiente). |
| `detalle` | Un objeto por hotfix (tabla siguiente); primero los de `PROD` y luego los de `SAND`, y dentro de cada ambiente por `fecha` ascendente. `[]` si no hubo. |

Cada objeto de `ambientes`:

| Clave | Valor |
|---|---|
| `ambiente` | `SAND` o `PROD`. |
| `nombre` | `Sandbox` o `Producción`. |
| `total` | Entero: hotfixes de `detalle` con ese ambiente. |
| `delta` | `total` menos el `total` del mismo ambiente en el periodo anterior (el que terminó 14 días antes), con signo (`+1`, `−2`, `0`). `"n/d"` si no hay periodo anterior publicado. |
| `direccion` | `up` si el delta es positivo, `down` si es negativo, `flat` si es cero o no hay periodo anterior. |
| `horasMedia` | Promedio de `horas` de sus hotfixes que tengan número, con un decimal, como texto (`"6.4"`). `"n/d"` si no hay. |
| `criticos` | Entero: sus hotfixes con severidad `Crítica`. |

Cada objeto de `detalle`:

| Clave | Valor |
|---|---|
| `clave` | Clave de la tarjeta en Jira (`CJJ-2041`). |
| `ambiente` | `SAND` o `PROD`. |
| `titulo` | Nombre de la tarjeta sin el término «hotfix» ni los separadores que queden sobrando al inicio o al final: `HOTFIX - Sesión expira antes de tiempo` → `Sesión expira antes de tiempo`. Si el hotfix entró solo por la etiqueta y el nombre no trae el término, el nombre va tal cual. |
| `causa` | Una de las `categorias` (misma taxonomía que los retrabajos). |
| `severidad` | `Crítica`, `Mayor` o `Menor`. |
| `horas` | Tiempo dedicado a resolver la tarjeta (`Σ Tiempo empleado` de Jira), en horas con un decimal, como texto (`"2.5"`); `"n/d"` si no tiene horas registradas. |
| `fecha` | Fecha de creación de la tarjeta. |

Cómo se obtiene cada dato: `INSTRUCCIONES.md`, paso 4.

## `colaboradores`

Primero **todas** las personas de `colaboradores.md`, en el orden de la lista, aunque en el periodo tengan todo en cero.
Después, solo si tienen retrabajos, las entradas `Otros` (responsables fuera de la lista) y `Sin asignar`. La plantilla
las ordena por total al mostrarlas.

| Clave | Valor |
|---|---|
| `nombre` | El nombre publicado de la lista, `Otros` o `Sin asignar`. Único dentro del periodo. |
| `rol` | El de la lista (`"n/d"` si está vacío); `Fuera de la lista` para `Otros`; `Sin responsable` para `Sin asignar`. |
| `tarjetas` | Entero. Personas de la lista: tarjetas con movimiento en el periodo de las que fue asignada (`INSTRUCCIONES.md`, paso 3). `Otros` y `Sin asignar`: tarjetas distintas entre sus retrabajos. |
| `matriz` | Objeto con las siete etapas que admiten retrabajo (`DOR`, `DEV`, `AI`, `LEAD-REV`, `QA`, `MERGE`, `SAND`; sin `PROD`). Cada una es un arreglo de `N` enteros: sus retrabajos en esa etapa, por categoría. Quien no tuvo retrabajos lleva todo en ceros. |

`colaboradoresNota` es fija:

- Normal: `Se contabiliza al responsable de la tarjeta en el momento del retrabajo. Una tarjeta con varios retornos aporta un caso por cada transición a Retrabajo.`
- Si se usó el asignado actual porque no hubo historial de asignación (`INSTRUCCIONES.md`, paso 3): `Se contabiliza al responsable actual de la tarjeta: el historial de asignación no estuvo disponible al generar este periodo. Una tarjeta con varios retornos aporta un caso por cada transición a Retrabajo.`

## `actividades`

Una entrada por tarjeta que cambió de estado en el periodo, con retrabajo o sin él; ordenadas por `creada` ascendente (la
plantilla las vuelve a ordenar igual). `[]` si ninguna se movió. Cómo se obtiene cada dato: `INSTRUCCIONES.md`, paso 5.

| Clave | Valor |
|---|---|
| `clave` | Clave de la tarjeta en Jira (`CJJ-2041`). Única dentro del periodo. |
| `titulo` | Nombre de la tarjeta (`summary`), tal cual. La plantilla no lo muestra hoy. |
| `responsable` | Nombre de pila del asignado al cierre del periodo, como en `colaboradores.md`; `Otros` si no está en la lista; `Sin asignar` si no tiene. |
| `creada` | Fecha y hora de creación de la tarjeta (`AAAA-MM-DDTHH:MM`). Puede ser anterior al periodo. |
| `estado` | La `key` de la etapa del último tramo, o `En producción` si es `PROD`. La plantilla no lo muestra hoy. |
| `tramos` | Al menos un tramo (la plantilla falla con un arreglo vacío), en orden cronológico (tabla siguiente). |
| `retrabajos` | Uno por retrabajo contado de la tarjeta en el periodo, en orden cronológico (tabla siguiente). `[]` si no tuvo. |

Cada tramo:

| Clave | Valor |
|---|---|
| `etapa` | Una de las ocho `key` de `etapas`, o `RET` mientras estuvo en `Retrabajo`. |
| `inicio`, `fin` | Fecha y hora (`AAAA-MM-DDTHH:MM`), recortadas al periodo: `inicio` no es anterior a `<inicio>T00:00` y `fin` no es posterior a `<cierre>T00:00`. `fin` es posterior a `inicio`. |

Cada retrabajo:

| Clave | Valor |
|---|---|
| `fecha` | Fecha y hora de la transición a `Retrabajo` (`AAAA-MM-DDTHH:MM`). |
| `desde` | La etapa de origen, la misma con que se contó en `etapas`. |
| `categoria` | Una de las `categorias`, la misma con que se contó. |

## Invariantes

Se verifican todas antes de publicar. Si una falla, se corrige o se detiene la generación; nunca se publica un JSON que no
las cumpla.

1. `categorias` es idéntica a la tabla de `categorias.md`: mismo texto y mismo orden.
2. Hay ocho `etapas`, en orden, con `key`, `sub` y notas exactas; cada `counts` tiene `N` enteros no negativos; `PROD` va en
   ceros con `sinRetrabajo: true`.
3. La suma de todos los `counts` es igual al número de transiciones contadas en el periodo, después de quitar las que caen
   fuera de fecha, las descartadas y las de PROD.
4. `etapaPorDefecto` es la etapa con más retrabajos (regla de desempate incluida).
5. En cada ambiente: `total` es igual a sus entradas en `detalle`; `criticos` es igual a sus entradas `Crítica`;
   `horasMedia` es el promedio de sus `horas`.
6. En cada entrada de `detalle`: `causa` está en `categorias`; `severidad` es uno de los tres valores; `fecha` cae dentro del
   periodo; `clave` no se repite.
7. Cada persona de `colaboradores.md` aparece exactamente una vez; la suma de todas las `matriz` es igual a la suma de
   todos los `counts`; cada `matriz` tiene las siete etapas con `N` enteros; los `nombre` no se repiten y ninguno trae
   correo ni apellido.
8. En `actividades`: `clave` no se repite; cada entrada tiene al menos un tramo; los tramos están en orden, no se
   enciman y caen dentro del periodo; cada `etapa` es una `key` de `etapas` o `RET`; `responsable` es un nombre de
   `colaboradores`, `Otros` o `Sin asignar`. La suma de todos los `retrabajos` es igual a la suma de todos los `counts`, y
   por cada etapa y categoría coincide con `counts`. Cada tarjeta con un retrabajo contado aparece aquí.
9. Ningún texto quedó como `""`, y ninguna clave del esqueleto falta.
10. Si se puede probar, la plantilla abre el JSON sin errores: `plantilla/reporte.dc.html?data=../reportes/<archivo>`.
