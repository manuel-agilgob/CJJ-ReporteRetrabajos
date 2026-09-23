# Origen de la plantilla

Copia fiel del proyecto de Claude Design «Plantilla reporte retrabajo»:
<https://claude.ai/design/p/c1920c29-3492-4d8c-90af-2d65b08be535?file=Plantilla+de+Reporte+Periodico.dc.html>

Copiada el **2026-09-23**. Versión de plantilla: **v1.0** (el valor de `meta.version` en los JSON).

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
solo con nombres de pila, las causas de hotfix dentro de las 11 categorías, `etapaPorDefecto` según la regla del contrato, y
sin las claves heredadas con contenido.

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
4. La lógica recorre `indicadores`, `serie`, `composicion` y `riesgos` aunque no los muestra: el JSON debe traerlos como
   arreglos vacíos.
5. Si el colaborador en vista no tiene retrabajos, el texto de la sección dice «acumula 0 retrabajos… concentrados en DOR
   (0) y con «el funcionamiento es incorrecto» como motivo dominante (0)». Pasa al dar clic en su tarjeta, o al abrir un
   periodo en que nadie tuvo retrabajos. Como todos los de la lista aparecen siempre, conviene que el diseño diga en ese
   caso «no tuvo retrabajos en el periodo».

## Cómo volver a copiar después de un cambio en el diseño

1. Leer los archivos de la tabla desde el proyecto: con la herramienta DesignSync de Claude Code (después de
   `/design-login`) o descargando el proyecto.
2. Reemplazarlos aquí con el mismo mapeo, sin editarlos a mano.
3. Si el cambio altera secciones o claves, actualizar `agente/contrato-datos.md` y `agente/plantilla-vacia.json`, subir la
   versión (`v1.1`…) en el esqueleto y en esta nota.
4. Abrir un periodo publicado y el ejemplo para confirmar que se ven bien.
