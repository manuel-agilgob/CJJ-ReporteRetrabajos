# CJJ-ReporteRetrabajos

Reporte de retrabajos del ciclo de entrega de los proyectos CJJ, cada dos semanas, publicado como sitio estático en GitHub
Pages. El diseño es fijo y viene de Claude Design; cada periodo solo aporta un JSON con los datos, así que todos los reportes
tienen las mismas secciones y el mismo formato.

## Estructura

| Ruta | Qué es | ¿Se publica? |
|---|---|---|
| `index.html` | Portada: lista los periodos publicados y enlaza a cada reporte. Es la entrada del sitio. | Sí |
| `plantilla/` | Esqueleto del diseño, copia fiel del proyecto de Claude Design. No se edita por periodo. Ver `plantilla/ORIGEN.md`. | Sí |
| `reportes/` | Un JSON por periodo (`<AAAA-MM-DD>.json`, con la fecha de inicio) e `indice.json`, la lista de periodos publicados. | Sí |
| `agente/` | Todo lo que consulta el agente que genera los reportes: instrucciones, contrato de datos, categorías, etapas, la lista de colaboradores y el esqueleto del JSON. | No |
| `.github/workflows/pages.yml` | Publica en Pages solo lo marcado arriba. | — |
| `CLAUDE.md` | Punto de entrada para Claude; remite a `agente/INSTRUCCIONES.md`. | No |

## Cómo se ve un reporte

- Portada: `index.html`.
- Un periodo: `plantilla/reporte.dc.html?data=../reportes/<AAAA-MM-DD>.json`.
- La plantilla con datos ficticios: `plantilla/reporte.dc.html`, sin `?data=`.

Para verlo en local hay que servirlo por HTTP; con `file://` el navegador bloquea la lectura de los JSON:

```bash
python3 -m http.server 8000   # y abrir http://localhost:8000
```

La plantilla carga React 18 desde unpkg.com, así que necesita conexión a internet.

## Programación

Cada periodo dura dos semanas, de sábado 00:00 a viernes 23:59 (hora de la Ciudad de México). El primero es
2026-09-12 → 2026-09-25 y los siguientes se encadenan cada 14 días: el reporte se genera un viernes sí y uno no, al cerrar
el día. Lo genera una rutina programada de Claude Code en la web sobre este repositorio, **pendiente de configurar**. El
detalle, y lo que falta definir, está en `agente/INSTRUCCIONES.md`.

## Publicación en GitHub Pages

Settings → Pages → Source: **GitHub Actions**. En cada push a `main` que toque el sitio, el workflow publica únicamente
`index.html`, `plantilla/` y `reportes/`, en <https://manuel-agilgob.github.io/CJJ-ReporteRetrabajos/>.

- **No usar «Deploy from a branch»**: publicaría el repositorio completo, incluida la lista de colaboradores con sus
  correos.
- El sitio es **público** aunque el repositorio sea privado (Pages en repositorios privados requiere GitHub Pro o superior).
  Por eso en `reportes/` de las personas solo va el nombre de pila, y ninguna extracción cruda de Jira se versiona
  (`.gitignore` excluye `.tmp/` y las hojas de cálculo).

## Relación con otros repositorios

- **`ai-tools-documentation`**: el pipeline `generate-rework-report`, la vía A de extracción. Su mapa de etapas
  (`src/tools/jira/reworkStage.ts`) todavía no tiene MERGE; ver `agente/etapas.md`.
- **Claude Design**: el proyecto «Plantilla reporte retrabajo», fuente de la plantilla. Ver `plantilla/ORIGEN.md`.
