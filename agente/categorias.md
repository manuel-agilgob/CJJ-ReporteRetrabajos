# Categorías de retrabajo

Taxonomía única del reporte. La usan dos secciones:

- **Retrabajos** (Figura 0, desglose por etapa y Tabla 2 por colaborador): el motivo de cada transición a `Retrabajo`.
- **Hotfixes** (Tabla 1, columna *Causa*): la causa del defecto que corrigió el hotfix.

El agente copia la columna **Categoría**, en este orden, al arreglo `categorias` del JSON de cada periodo. El número de fila
es la posición en `counts` y en cada renglón de `matriz`: la fila 1 es `counts[0]`, la 11 es `counts[10]`.

| # | Categoría (texto exacto en el reporte) | Cuándo aplica |
|---|---|---|
| 1 | El funcionamiento es incorrecto | Lo entregado no hace lo que pide la tarjeta: resultado, regla o flujo equivocado. |
| 2 | No cubre todos los escenarios o escenarios borde | El caso principal funciona, pero falla o falta un caso alterno, un valor límite, un rol o una validación. |
| 3 | Regresión detectada en otra funcionalidad | El cambio rompió algo que antes funcionaba, fuera del alcance de la tarjeta. |
| 4 | No cumple lineamientos de UX/UI | Diferencias con el diseño o con los lineamientos de interfaz: maquetación, textos, estilos, usabilidad. |
| 5 | El codigo produce un error (crash) en runtime o compilacion | Excepción, pantalla de error, caída del servicio o build que no compila. |
| 6 | Conflicto con la rama principal | Conflictos de merge o rama desactualizada respecto de la principal. |
| 7 | Cambios solicitados por negocio después de entregar | Negocio cambió o amplió lo pedido después de la entrega; no es un defecto. |
| 8 | No cumple definición de terminado (DoD) | Falta algo que exige la DoD: pruebas, evidencia, documentación, criterios de aceptación. |
| 9 | No hay comentarios para categorizar | No hay texto del que se pueda sacar el motivo (ver criterios abajo). |
| 10 | Error de QA - testing | El retorno se debió a un error de QA: prueba mal planteada, ambiente equivocado, falso positivo. |
| 11 | OTRO, No se ajusta a ninguna categoria definida | Hay un motivo claro, pero no encaja en ninguna de las anteriores. |

> La columna «Cuándo aplica» es una primera versión, redactada para que la clasificación sea consistente entre periodos.
> Se puede afinar cuando el equipo precise el criterio. Los textos de la columna *Categoría* no se tocan (ver reglas).

## Equivalencias con el clasificador del pipeline

El clasificador de `ai-tools-documentation` (`src/tools/llm/jiraClassifier.tool.ts`, enum `reworkReasons`) devuelve los
mismos textos, salvo uno:

| Valor que devuelve el clasificador | Cuenta como |
|---|---|
| `OTRO, No se ajusta a ninguna categoria definida, explicar en razonamiento` | 11 |

Cualquier otro valor que no esté en la tabla de arriba (por ejemplo `No category classified`) detiene la generación: se
reporta la tarjeta y no se adivina la categoría.

## Criterios de clasificación

Cuando la categoría la asigna el agente (vía B de `INSTRUCCIONES.md`, y siempre para los hotfixes):

- **Retrabajo**: usar **solo** el comentario asociado a la transición a `Retrabajo`, no el nombre ni la descripción de la
  tarjeta. Sin comentario asociado → 9. Comentario sin un motivo claro → 11.
- **Hotfix**: usar la descripción y los comentarios de la tarjeta del hotfix. Sin texto que explique la causa → 9. Texto
  sin una causa clara → 11.
- Si caben varias, elegir la más específica. Una sola categoría por caso.

## Reglas

- **Los textos se copian letra por letra**, incluidas las faltas de acento (`codigo`, `compilacion`, `categoria`). Son los
  valores con los que se cuenta; cambiarlos rompe el conteo y la comparación entre periodos.
- **No se reordenan ni se renombran.** Una categoría nueva se agrega al final de la tabla.
- **Los periodos ya publicados no se tocan**: cada JSON lleva su propia copia de `categorias`, así que se siguen viendo como
  se publicaron.
- Si cambia el **número** de categorías, hay que cambiar la plantilla: sus textos dicen «once categorías» fijo (ver
  `plantilla/ORIGEN.md`, limitación 2).
- Si la extracción usa el pipeline (vía A), el enum `reworkReasons` debe cambiar igual y en el mismo orden.
- Todo cambio se anota en el historial.

## Historial

- **2026-09-23** — Versión inicial: las 11 categorías del diseño (enum `reworkReasons` del pipeline). Se documenta la
  equivalencia de la categoría 11 y se decide usar la misma taxonomía para las causas de hotfix.
