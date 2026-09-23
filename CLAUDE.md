# CJJ-ReporteRetrabajos

Reporte de retrabajos cada dos semanas, publicado en GitHub Pages. Todo el repositorio está en español: documentación, JSON
y mensajes de commit.

- Para generar un periodo, seguir `agente/INSTRUCCIONES.md` de principio a fin. El contrato de cada clave del JSON está en
  `agente/contrato-datos.md`.
- `plantilla/` es copia fiel del diseño de Claude Design y no se edita. Un cambio de diseño se hace en Claude Design y se
  vuelve a copiar (`plantilla/ORIGEN.md`).
- `agente/categorias.md`, `agente/etapas.md` y `agente/colaboradores.md` los mantiene una persona: se leen, no se editan. Si
  falta algo en ellos, detenerse y reportarlo.
- GitHub Pages publica solo `index.html`, `plantilla/` y `reportes/` (`.github/workflows/pages.yml`). Lo que va en
  `reportes/` es público: de las personas solo el nombre de pila, nunca correos, apellidos ni extracciones crudas de Jira.
  `agente/colaboradores.md` tiene correos y nunca se copia al sitio.
