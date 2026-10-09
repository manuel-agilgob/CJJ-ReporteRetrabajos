---
name: reporte-retrabajos
description: Consulta y consolida los datos del reporte quincenal de retrabajos de CJJ (retrabajos por etapa, categoría y colaborador, hotfixes y recorrido de actividades por tarjeta). Úsala para armar un dashboard o un análisis con esos datos, comparar periodos, o para consultar Jira con las mismas reglas con que se genera el reporte (periodo, etapa, categoría, responsable, hotfix). Disparadores - retrabajos, reporte de retrabajos, hotfixes CJJ, dashboard de retrabajos, tarjetas que regresaron a Retrabajo.
---

# Reporte de retrabajos CJJ

El reporte se publica cada dos semanas como un JSON por periodo, en un sitio público. Esta skill sirve para dos cosas;
elegir la que corresponda y leer solo su referencia.

| Quiero… | Modo | Leer |
|---|---|---|
| Un dashboard, gráficas o comparar periodos con lo ya publicado | **A. Consumir datos** | `references/esquema-datos.md` |
| Consultar Jira (o regenerar un periodo) con las mismas reglas del reporte | **B. Consultar Jira** | `references/consulta-jira.md` |

## Modo A — Consumir datos publicados

No hace falta Jira ni credenciales. Los datos están en:

- Índice: `https://manuel-agilgob.github.io/CJJ-ReporteRetrabajos/reportes/indice.json`
- Un periodo: `.../reportes/<inicio>.json` (el nombre es la fecha de inicio, un sábado).
- Vista del reporte: `https://manuel-agilgob.github.io/CJJ-ReporteRetrabajos/plantilla/reporte.dc.html?data=../reportes/<inicio>.json`

Para llevar todo a tablas planas (listas para graficar o para cruzar con otros reportes):

```bash
python3 -I scripts/consolidar.py --tabla periodos          # una fila por periodo
python3 -I scripts/consolidar.py --tabla retrabajos        # periodo × etapa × categoría
python3 -I scripts/consolidar.py --tabla colaboradores --formato csv
# también: hotfixes, actividades · --origen <carpeta local con indice.json> para leer sin red
```

Reglas para no equivocar la lectura:

1. **Siempre empezar por `indice.json`**: es la lista de periodos publicados. No asumir fechas.
2. Cada JSON trae su propia copia de `categorias`; el orden y el número pueden cambiar entre periodos (hoy 12). Comparar
   periodos **por el texto** de la categoría, nunca por la posición.
3. Los periodos antiguos pueden no traer claves nuevas (por ejemplo `actividades` no existe en los anteriores a `v1.1`).
   Tratar la ausencia como «sin dato», no como cero.
4. **Los periodos no siempre duran lo mismo** (el primero es de 14 días; 2026-09-27 → 2026-10-03 y 2026-10-04 →
   2026-10-10 son de 7). Calcular la duración con `periodoInicio`/`periodoFin`, y normalizar por días o avisar al comparar.
5. `"n/d"` significa sin dato; no es 0 ni se promedia.
6. Un **hotfix no es un retrabajo** y `PROD` nunca tiene retrabajos; no sumarlos.
7. Es un repositorio público: **no escribir correos, apellidos ni títulos de tarjeta** en lo que se genere. Las personas
   van por nombre de pila, como en el JSON.

Para un dashboard, usar la skill `dataviz` y mostrar siempre el periodo cubierto y la fecha `meta.generado` de cada uno.

## Modo B — Consultar Jira con las reglas del reporte

Las reglas (qué es un retrabajo, cómo se asigna etapa, categoría y responsable, qué es un hotfix, cuándo detenerse) están
en `references/consulta-jira.md`. Requiere acceso a Jira (conector de Atlassian o API REST).

- **Dentro del repositorio** la fuente de verdad es `agente/` (`INSTRUCCIONES.md`, `contrato-datos.md`, `categorias.md`,
  `etapas.md`, `colaboradores.md`). Si algo difiere de la referencia de esta skill, manda `agente/`.
- **Para generar y publicar un periodo completo** no usar esta skill: seguir `agente/INSTRUCCIONES.md` de principio a fin.
  La skill sirve para consultas puntuales («¿qué retrabajos tuvo CJJ-123?», «¿cuántos hotfixes hubo esta semana?») con la
  misma precisión que el reporte.
- Esta skill **no edita** `agente/`, `plantilla/` ni los JSON publicados.
