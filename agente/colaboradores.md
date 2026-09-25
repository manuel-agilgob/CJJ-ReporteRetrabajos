# Colaboradores

Lista fija de desarrolladores del proyecto. **Todos aparecen en cada reporte**, en la sección «Retrabajos por
colaborador», aunque en el periodo tengan todo en cero: así el reporte muestra también a quien no tuvo retrabajos.

## Lista

| accountId de Jira | Nombre publicado | Rol |
|---|---|---|
| 5b1f1cac81140316a45da1c7 | Manny | Revisor |
| 557058:9bd63618-9e95-4f2a-b5fa-08ecd9ea4247 | Marck | Revisor |
| 6050e40137065a006977651d | Rafael | Tech lead |
| 712020:55761dc1-ad2a-4591-9a7f-3bb0b7e0c416 | Samuel | Desarrollador |
| 712020:35d3a7a1-ef6b-4410-923d-c79037fabb8a | Sebastián | Desarrollador |
| 712020:3e184b0e-c149-4249-bfa9-eeddf8366ae8 | Manuel | QA |
| 5cae561dbb1ed00ac5e624b7 | Adrián | Desarrollador |
| 557058:b4c59868-e549-42fd-80bc-34062c0e9776 | Alfonso | Scrum Master |
| 5cd43176c33a5d0dcf0b01b1 | Karla | Scrum Master |
| 70121:2cc4c94e-e00d-4d8a-b677-3ee4dc016ffd | Christian | Revisora |
| 557058:534963c7-1f43-4ab4-a7ae-0c5103e232ce | Juan José | Tech lead |
| 712020:37ffefe0-da67-44aa-9ce7-404bfa14a9f8 | Luis Fernando | Desarrollador |

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
