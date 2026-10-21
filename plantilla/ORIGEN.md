# Origen de la plantilla

Copia fiel del proyecto de Claude Design «Plantilla reporte retrabajo»:
<https://claude.ai/design/p/c1920c29-3492-4d8c-90af-2d65b08be535?file=Plantilla+de+Reporte+Periodico.dc.html>

Copiada el **2026-09-23**, de nuevo el **2026-10-05** (sección «Recorrido de actividades»), el **2026-10-07**
(detalle desplegable por tarjeta en esa sección; luego, columna «Estado» y fondo del detalle desplegado) y el
**2026-10-21** (sección «Movimiento del tablero»). Versión de plantilla: **v1.2** (el valor de `meta.version` en los
JSON).

En la copia del 2026-10-21 solo cambió `reporte.dc.html`; `support.js`, `doc-page.js`, `styles.css` y `_ds_bundle.js`
son idénticos a los de la copia anterior. El cambio:

- **Se quitó** el recuadro de cuatro datos bajo el título (Periodo, Generado, Responsable, Fuente de datos). El periodo
  y la fecha de generación pasaron a una línea bajo el subtítulo; **`meta.responsable` y `meta.fuente` ya no se ven en
  ninguna parte de la página**, aunque se siguen llenando.
- **Se agregó** la sección «Movimiento del tablero», con dos figuras: barras apiladas de transiciones por día (una
  serie por etapa, más `RET`, con una línea encima para las tarjetas fusionadas a `develop`) y la «Fotografía del
  tablero» al momento de generar. La alimenta la clave nueva `movimiento` (ver `agente/contrato-datos.md`).
- **`meta.generado` ahora lleva hora** (`AAAA-MM-DDTHH:MM`): la plantilla la muestra como «Actualizado». Con una fecha
  sin hora se sigue viendo bien, solo sin la hora.

| En el diseño | En este repositorio |
|---|---|
| `Plantilla de Reporte Periodico.dc.html` | `plantilla/reporte.dc.html` (renombrada para que la URL no lleve espacios) |
| `support.js` | `plantilla/support.js` |
| `doc-page.js` | `plantilla/doc-page.js` |
| `_ds/industry-ef1cee18-0177-46ea-a7d2-c026ebb35136/styles.css` | misma ruta bajo `plantilla/` |
| `_ds/industry-ef1cee18-0177-46ea-a7d2-c026ebb35136/_ds_bundle.js` | misma ruta bajo `plantilla/` |
| `data/report-data.js` | `plantilla/data/report-data.js`, adaptado (ver abajo) |

Los archivos son idénticos a los del diseño, salvo el nombre de la plantilla y `report-data.js`.

`report-data.js` es el ejemplo del diseño ajustado al contrato vigente: marcado como ficticio en el título y en el periodo,
solo con nombres de pila, las causas de hotfix dentro de las 11 categorías, `etapaPorDefecto` según la regla del contrato,
con un `actividades` ficticio generado para el periodo de ejemplo (nombres de pila, tramos recortados al periodo), con un
`movimiento` ficticio cuya serie `RET` cuadra con la suma de los `counts`, y sin las claves heredadas de la versión
anterior (`indicadores`, `serie`, `composicion`, `riesgos`), que la plantilla ya no lee.

El ejemplo del diseño trae sus propias claves de ejemplo, distintas de las nuestras; de él se toma solo la **forma** de
`movimiento`, no sus series ni sus estados.

## Qué no se copió

- `design_handoff_reportes/` y `reports/`: una versión anterior de la plantilla, de nueve secciones (resumen ejecutivo,
  indicadores, serie, composición, áreas, hallazgos, riesgos y acciones), y su documentación. La plantilla vigente ya no
  muestra esas secciones; las reglas se reescribieron en `agente/` sobre la plantilla real.
- `README.md` y `github.md` del diseño: los sustituyen `README.md` y `agente/`.
- `data/2026-08-16.json`: el mismo ejemplo que `report-data.js`.
- `_ds/…/readme.md`, `_ds/…/_ds_manifest.json`, `_ds/…/_adherence.oxlintrc.json` y `.thumbnail`: metadatos del editor que
  la página no usa.

## Cómo funciona fuera de Claude Design

- `support.js` es el runtime de los archivos `.dc.html`: carga React 18.3.1 desde unpkg.com (con verificación de integridad
  SRI), interpreta el bloque `<x-dc>` y ejecuta la clase `Component`. Necesita un servidor HTTP y conexión a internet.
- Los datos llegan por `?data=<ruta al JSON>`, relativa a la plantilla. Sin `?data=` se usa `window.REPORT_DATA` de
  `data/report-data.js`.
- Los ajustes del panel de Claude Design (`hotfixAmbiente`, `sincronizarConFlujo`, `mostrarTablaHotfix`) toman su valor por
  defecto: `Automático`, sí y sí.
- `doc-page.js` arma la hoja A4 y la impresión. Al imprimir desde el navegador se conservan la etapa y el colaborador que
  estén en vista.

## Limitaciones conocidas

Vienen del diseño; se corrigen allá y se vuelve a copiar.

1. Si el JSON de `?data=` no se puede leer, la plantilla muestra el ejemplo sin avisar. Por eso el ejemplo va marcado como
   ficticio en el título y en el periodo.
2. Los textos dicen «once categorías» y «ocho etapas», fijos, y la Figura 0 tiene ocho columnas fijas. Cambiar el número de
   categorías o de etapas exige cambiar la plantilla.
3. En el primer periodo, sin uno anterior contra el cual comparar, las tarjetas de hotfix dicen «— sin cambio».
4. La Figura 4 lee `tramos[0]` de cada actividad: una actividad sin tramos rompe la página. El contrato exige al menos uno.
5. Si el colaborador en vista no tiene retrabajos, el texto de la sección dice «acumula 0 retrabajos… concentrados en DOR
   (0) y con «el funcionamiento es incorrecto» como motivo dominante (0)». Pasa al dar clic en su tarjeta, o al abrir un
   periodo en que nadie tuvo retrabajos. Como todos los de la lista aparecen siempre, conviene que el diseño diga en ese
   caso «no tuvo retrabajos en el periodo».
6. Un periodo anterior a `v1.2` no trae `movimiento`, así que «Movimiento del tablero» sale vacía y dice «Sin
   transiciones registradas en el periodo», que es falso: en esos periodos sí las hubo, solo que no se midieron. Los
   cinco periodos publicados hasta el 2026-10-21 se dejan así a propósito, porque un periodo ya publicado no se
   reescribe y la fotografía del tablero de una fecha pasada no se puede reconstruir.
7. `movimiento.nota` no se muestra en ninguna parte: el párrafo de entrada de la sección lo arma la plantilla con los
   datos. Se conserva en el JSON como procedencia del dato.
8. La plantilla dibuja como línea **la primera** serie con `fuente: "github"` y descarta las demás: una segunda no se
   vería ni como línea ni como barra. Por eso el contrato fija una sola.
9. El párrafo de «Movimiento del tablero» dice «el estado del tablero **al cierre**», pero la fotografía se toma al
   generar: Jira no guarda el tablero de una fecha pasada. Coinciden cuando la rutina corre a su hora (el sábado 00:15,
   horas después del cierre); en un periodo que se regenere tiempo después, no.

## Cómo volver a copiar después de un cambio en el diseño

1. Leer los archivos de la tabla desde el proyecto: con la herramienta DesignSync de Claude Code (después de
   `/design-login`) o descargando el proyecto.
2. Reemplazarlos aquí con el mismo mapeo, sin editarlos a mano.
3. Si el cambio altera secciones o claves, actualizar `agente/contrato-datos.md` y `agente/plantilla-vacia.json`, subir la
   versión (`v1.1`…) en el esqueleto y en esta nota.
4. Abrir un periodo publicado y el ejemplo para confirmar que se ven bien.
