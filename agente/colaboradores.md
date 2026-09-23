# Colaboradores

Lista fija de desarrolladores del proyecto. **Todos aparecen en cada reporte**, en la sección «Retrabajos por
colaborador», aunque en el periodo tengan todo en cero: así el reporte muestra también a quien no tuvo retrabajos.

## Lista

| accountId de Jira | Nombre publicado | Rol |
|---|---|---|

- **accountId de Jira:** el identificador de la cuenta de Atlassian de la persona (con la forma
  `5b10ac8d82e05b22cc7d4ef5` o `557058:` seguido de un UUID). Aparece al final de la URL de su perfil en Jira
  (`https://<sitio>.atlassian.net/jira/people/<accountId>`). Si no se encuentra en Jira, el agente se detiene.
- **Nombre publicado:** solo el nombre de pila (Samuel, Sebastián, Manuel…). Si dos coinciden, se agrega la inicial del
  primer apellido: «Manuel V.». Debe ser único en la lista.
- **Rol:** `Frontend`, `Backend`, `Full-stack`, `Integraciones`… Si se deja vacío, se publica `n/d`.

## Privacidad

**El repositorio es público**: todo lo que se escriba aquí se puede ver en GitHub. Por eso la lista usa el `accountId`,
que es un identificador opaco, y **nunca correos**, apellidos ni usuarios de Jira. Para dar de alta a alguien a partir de su
correo, se busca su `accountId` en Jira (en el perfil, o pidiéndoselo a Claude en una sesión) y solo el `accountId` se
escribe en este archivo.

En los JSON del periodo va únicamente el nombre publicado.

## Retrabajos fuera de la lista

- Si el responsable de un retrabajo no está en la lista, el retrabajo se cuenta en la entrada `Otros` (rol `Fuera de la
  lista`). El resumen de la corrida dice quién era, para decidir si se agrega.
- Si la tarjeta no tenía responsable, se cuenta en `Sin asignar` (rol `Sin responsable`).

Estas dos entradas solo aparecen cuando tienen retrabajos en el periodo.

## Cambios en la lista

Se agregan o se quitan filas. Los reportes ya publicados no cambian, porque cada JSON guarda su propia lista de
colaboradores. El agente no edita este archivo.
