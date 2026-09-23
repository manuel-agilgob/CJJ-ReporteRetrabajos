# Colaboradores

Lista fija de desarrolladores del proyecto. **Todos aparecen en cada reporte**, en la sección «Retrabajos por
colaborador», aunque en el periodo tengan todo en cero: así el reporte muestra también a quien no tuvo retrabajos.

## Lista

| Cuenta de Jira | Nombre publicado | Rol |
|---|---|---|

- **Cuenta de Jira:** el correo de la cuenta de Atlassian de la persona, o su `accountId` si el correo no es visible en
  Jira. El agente la traduce a su cuenta de Jira; si no la encuentra, se detiene.
- **Nombre publicado:** solo el nombre de pila (Samuel, Sebastián, Manuel…). Si dos coinciden, se agrega la inicial del
  primer apellido: «Manuel V.». Debe ser único en la lista.
- **Rol:** `Frontend`, `Backend`, `Full-stack`, `Integraciones`… Si se deja vacío, se publica `n/d`.

## Privacidad

Este archivo tiene correos, así que **no se publica**: el sitio de GitHub Pages solo publica `index.html`, `plantilla/` y
`reportes/` (ver `.github/workflows/pages.yml`). En los JSON del periodo va únicamente el nombre publicado, nunca correos,
apellidos ni usuarios de Jira.

## Retrabajos fuera de la lista

- Si el responsable de un retrabajo no está en la lista, el retrabajo se cuenta en la entrada `Otros` (rol `Fuera de la
  lista`). El resumen de la corrida dice quién era, para decidir si se agrega.
- Si la tarjeta no tenía responsable, se cuenta en `Sin asignar` (rol `Sin responsable`).

Estas dos entradas solo aparecen cuando tienen retrabajos en el periodo.

## Cambios en la lista

Se agregan o se quitan filas. Los reportes ya publicados no cambian, porque cada JSON guarda su propia lista de
colaboradores. El agente no edita este archivo.
