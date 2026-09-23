# CJJ-ReporteRetrabajos

Reporte de retrabajos cada dos semanas, publicado en GitHub Pages. Todo el repositorio está en español: documentación, JSON
y mensajes de commit.

- Para generar un periodo, seguir `agente/INSTRUCCIONES.md` de principio a fin. El contrato de cada clave del JSON está en
  `agente/contrato-datos.md`.
- `plantilla/` es copia fiel del diseño de Claude Design y no se edita. Un cambio de diseño se hace en Claude Design y se
  vuelve a copiar (`plantilla/ORIGEN.md`).
- `agente/categorias.md`, `agente/etapas.md` y `agente/colaboradores.md` los mantiene una persona: se leen, no se editan. Si
  falta algo en ellos, detenerse y reportarlo.
- El repositorio es público y GitHub Pages publica `index.html`, `plantilla/` y `reportes/` (`.github/workflows/pages.yml`).
  En ningún archivo van correos, apellidos ni extracciones crudas de Jira: a las personas se las identifica por su
  `accountId` y en los reportes solo va el nombre de pila.
