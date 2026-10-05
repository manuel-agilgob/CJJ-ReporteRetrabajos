// Datos por defecto de la plantilla: EJEMPLO CON DATOS FICTICIOS.
// La plantilla los muestra cuando se abre sin ?data= y también cuando el JSON
// pedido en ?data= no se puede leer; por eso el ejemplo va marcado como ficticio
// en el título y en el periodo, para que nunca se confunda con un periodo real.
// Los periodos reales viven en reportes/<AAAA-MM-DD>.json y siguen el contrato
// de agente/contrato-datos.md. Este archivo no se edita por periodo.
window.REPORT_DATA = {
  "meta": {
    "titulo": "Ejemplo con datos ficticios",
    "subtitulo": "Muestra de la plantilla con datos inventados: no corresponde a ningún periodo real. Los reportes publicados se abren desde la portada.",
    "etiquetaPeriodo": "Periodo de ejemplo (datos ficticios)",
    "periodoInicio": "2026-08-29",
    "periodoFin": "2026-09-11",
    "generado": "2026-09-12",
    "responsable": "Ingeniería — Lead de entrega",
    "fuente": "Datos ficticios de ejemplo",
    "version": "v1.1"
  },
  "categorias": [
    "El funcionamiento es incorrecto",
    "No cubre todos los escenarios o escenarios borde",
    "Regresión detectada en otra funcionalidad",
    "No cumple lineamientos de UX/UI",
    "El codigo produce un error (crash) en runtime o compilacion",
    "Conflicto con la rama principal",
    "Cambios solicitados por negocio después de entregar",
    "No cumple definición de terminado (DoD)",
    "No hay comentarios para categorizar",
    "Error de QA - testing",
    "OTRO, No se ajusta a ninguna categoria definida"
  ],
  "etapaPorDefecto": "QA",
  "etapas": [
    { "key": "DOR", "sub": "Listo para tomar", "counts": [0, 3, 0, 0, 0, 0, 4, 5, 1, 0, 1] },
    { "key": "DEV", "sub": "Desarrollo", "counts": [7, 3, 1, 2, 4, 1, 0, 2, 0, 1, 1] },
    { "key": "AI", "sub": "Revisión asistida", "counts": [9, 4, 2, 3, 6, 2, 0, 3, 1, 1, 2] },
    { "key": "LEAD-REV", "sub": "Revisión de lead", "counts": [3, 4, 1, 5, 2, 1, 1, 6, 2, 0, 2] },
    { "key": "QA", "sub": "Pruebas", "counts": [8, 7, 4, 3, 2, 0, 1, 3, 3, 4, 2] },
    { "key": "MERGE", "sub": "Integración", "counts": [1, 0, 3, 0, 2, 5, 0, 1, 0, 0, 1] },
    {
      "key": "SAND",
      "sub": "Sandbox",
      "counts": [2, 2, 3, 1, 3, 1, 1, 1, 1, 1, 1],
      "nota": "Sandbox puede generar retrabajos cuando el despliegue revela un defecto antes de producción; es poco frecuente."
    },
    {
      "key": "PROD",
      "sub": "Producción",
      "counts": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "sinRetrabajo": true,
      "nota": "Producción no genera retrabajos: una corrección posterior al despliegue se registra como hotfix en la sección de hotfixes de despliegue, no como retorno de la actividad."
    }
  ],
  "hotfixes": {
    "nota": "Un hotfix es una corrección desplegada fuera del flujo normal para resolver un defecto ya liberado. No cuenta como retrabajo: la actividad no regresó a una etapa anterior, se abrió trabajo nuevo. Se identifica por el término «hotfix» en el nombre de la tarjeta o por la etiqueta «hotfix», y se cuenta en el periodo en que se creó.",
    "ambientes": [
      { "ambiente": "SAND", "nombre": "Sandbox", "total": 5, "delta": "−2", "direccion": "down", "horasMedia": "6.4", "criticos": 1 },
      { "ambiente": "PROD", "nombre": "Producción", "total": 3, "delta": "+1", "direccion": "up", "horasMedia": "3.1", "criticos": 2 }
    ],
    "detalle": [
      { "clave": "CJJ-2041", "ambiente": "PROD", "titulo": "Expediente no carga anexos firmados", "causa": "El funcionamiento es incorrecto", "severidad": "Crítica", "horas": "2.5", "fecha": "2026-08-31" },
      { "clave": "CJJ-2058", "ambiente": "PROD", "titulo": "Sesión expira antes del tiempo configurado", "causa": "El funcionamiento es incorrecto", "severidad": "Crítica", "horas": "1.8", "fecha": "2026-09-05" },
      { "clave": "CJJ-2073", "ambiente": "PROD", "titulo": "Notificación duplicada al asignar ponencia", "causa": "El funcionamiento es incorrecto", "severidad": "Mayor", "horas": "5.0", "fecha": "2026-09-09" },
      { "clave": "CJJ-2033", "ambiente": "SAND", "titulo": "Migración deja registros sin folio", "causa": "No cubre todos los escenarios o escenarios borde", "severidad": "Crítica", "horas": "9.0", "fecha": "2026-08-30" },
      { "clave": "CJJ-2049", "ambiente": "SAND", "titulo": "Build falla por dependencia sin fijar versión", "causa": "El codigo produce un error (crash) en runtime o compilacion", "severidad": "Mayor", "horas": "4.2", "fecha": "2026-09-02" },
      { "clave": "CJJ-2061", "ambiente": "SAND", "titulo": "Variables de entorno no propagadas al worker", "causa": "OTRO, No se ajusta a ninguna categoria definida", "severidad": "Mayor", "horas": "7.5", "fecha": "2026-09-06" },
      { "clave": "CJJ-2066", "ambiente": "SAND", "titulo": "Timeout en la sincronización nocturna", "causa": "OTRO, No se ajusta a ninguna categoria definida", "severidad": "Menor", "horas": "6.0", "fecha": "2026-09-08" },
      { "clave": "CJJ-2079", "ambiente": "SAND", "titulo": "Permisos de lectura faltantes en el bucket de anexos", "causa": "OTRO, No se ajusta a ninguna categoria definida", "severidad": "Mayor", "horas": "5.3", "fecha": "2026-09-11" }
    ]
  },
  "colaboradores": [
    {
      "nombre": "Ana",
      "rol": "Frontend",
      "tarjetas": 18,
      "matriz": {
        "DOR": [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
        "DEV": [2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
        "AI": [2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 2],
        "LEAD-REV": [0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0],
        "QA": [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        "MERGE": [0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0],
        "SAND": [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]
      }
    },
    {
      "nombre": "Rubén",
      "rol": "Backend",
      "tarjetas": 22,
      "matriz": {
        "DOR": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "DEV": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "AI": [4, 0, 2, 1, 2, 0, 0, 1, 0, 0, 0],
        "LEAD-REV": [0, 2, 0, 1, 1, 0, 0, 4, 0, 0, 0],
        "QA": [3, 1, 1, 2, 0, 0, 0, 0, 1, 1, 0],
        "MERGE": [1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0],
        "SAND": [1, 0, 2, 0, 1, 1, 0, 0, 0, 0, 0]
      }
    },
    {
      "nombre": "Lucía",
      "rol": "Full-stack",
      "tarjetas": 18,
      "matriz": {
        "DOR": [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        "DEV": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "AI": [0, 3, 0, 0, 2, 2, 0, 2, 0, 0, 0],
        "LEAD-REV": [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        "QA": [2, 3, 0, 1, 1, 0, 0, 1, 1, 1, 0],
        "MERGE": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        "SAND": [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1]
      }
    },
    {
      "nombre": "Héctor",
      "rol": "Backend",
      "tarjetas": 14,
      "matriz": {
        "DOR": [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        "DEV": [2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        "AI": [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        "LEAD-REV": [2, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1],
        "QA": [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        "MERGE": [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        "SAND": [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0]
      }
    },
    {
      "nombre": "Paola",
      "rol": "Frontend",
      "tarjetas": 14,
      "matriz": {
        "DOR": [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        "DEV": [1, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0],
        "AI": [2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        "LEAD-REV": [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1],
        "QA": [2, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
        "MERGE": [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        "SAND": [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]
      }
    },
    {
      "nombre": "Diego",
      "rol": "Integraciones",
      "tarjetas": 9,
      "matriz": {
        "DOR": [0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0],
        "DEV": [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        "AI": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "LEAD-REV": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "QA": [0, 1, 2, 0, 0, 0, 1, 1, 0, 1, 0],
        "MERGE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        "SAND": [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
      }
    },
    {
      "nombre": "Sofía",
      "rol": "Backend",
      "tarjetas": 6,
      "matriz": {
        "DOR": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "DEV": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "AI": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "LEAD-REV": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "QA": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "MERGE": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "SAND": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  ],
  "colaboradoresNota": "Se contabiliza al responsable de la tarjeta en el momento del retrabajo. Una tarjeta con varios retornos aporta un caso por cada transición a Retrabajo.",
  "actividades": [
    {
      "clave": "CJJ-2032",
      "titulo": "Calendario de audiencias compartido",
      "responsable": "Héctor",
      "creada": "2026-08-28T00:00",
      "estado": "QA",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-29T00:00",
          "fin": "2026-08-29T06:19"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-08-29T06:19",
          "fin": "2026-08-30T18:03"
        },
        {
          "etapa": "AI",
          "inicio": "2026-08-30T18:03",
          "fin": "2026-08-31T07:26"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-08-31T07:26",
          "fin": "2026-09-01T03:15"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-01T03:15",
          "fin": "2026-09-02T03:15"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-02T03:15",
          "fin": "2026-09-04T06:55"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-04T06:55",
          "fin": "2026-09-04T21:55"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-04T21:55",
          "fin": "2026-09-07T05:42"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-07T05:42",
          "fin": "2026-09-07T14:15"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-07T14:15",
          "fin": "2026-09-07T22:15"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-07T22:15",
          "fin": "2026-09-09T21:45"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-09T21:45",
          "fin": "2026-09-10T06:57"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-10T06:57",
          "fin": "2026-09-11T02:25"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-11T02:25",
          "fin": "2026-09-12T00:00"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-01T03:15",
          "desde": "LEAD-REV",
          "categoria": "No hay comentarios para categorizar"
        },
        {
          "fecha": "2026-09-04T06:55",
          "desde": "DEV",
          "categoria": "No cumple lineamientos de UX/UI"
        },
        {
          "fecha": "2026-09-07T14:15",
          "desde": "AI",
          "categoria": "El funcionamiento es incorrecto"
        }
      ]
    },
    {
      "clave": "CJJ-1976",
      "titulo": "Bandeja de notificaciones por ponencia",
      "responsable": "Lucía",
      "creada": "2026-08-28T05:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DEV",
          "inicio": "2026-08-29T00:00",
          "fin": "2026-08-31T15:25"
        },
        {
          "etapa": "AI",
          "inicio": "2026-08-31T15:25",
          "fin": "2026-09-01T05:17"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-01T05:17",
          "fin": "2026-09-01T16:54"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-01T16:54",
          "fin": "2026-09-02T11:17"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-02T11:17",
          "fin": "2026-09-03T13:17"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-03T13:17",
          "fin": "2026-09-04T22:56"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-04T22:56",
          "fin": "2026-09-05T07:27"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-05T07:27",
          "fin": "2026-09-06T05:16"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-06T05:16",
          "fin": "2026-09-07T03:45"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-07T03:45",
          "fin": "2026-09-07T12:44"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-07T12:44",
          "fin": "2026-09-08T13:07"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-08T13:07",
          "fin": "2026-09-08T20:22"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-02T11:17",
          "desde": "QA",
          "categoria": "No cubre todos los escenarios o escenarios borde"
        }
      ]
    },
    {
      "clave": "CJJ-1969",
      "titulo": "Firma electrónica en acuerdos",
      "responsable": "Rubén",
      "creada": "2026-08-28T11:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-29T00:00",
          "fin": "2026-08-29T03:35"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-08-29T03:35",
          "fin": "2026-08-31T12:38"
        },
        {
          "etapa": "AI",
          "inicio": "2026-08-31T12:38",
          "fin": "2026-09-01T02:45"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-01T02:45",
          "fin": "2026-09-01T18:25"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-01T18:25",
          "fin": "2026-09-03T03:02"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-03T03:02",
          "fin": "2026-09-03T07:38"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-03T07:38",
          "fin": "2026-09-04T12:03"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-04T12:03",
          "fin": "2026-09-04T18:17"
        }
      ],
      "retrabajos": []
    },
    {
      "clave": "CJJ-2025",
      "titulo": "Permisos por rol de secretario",
      "responsable": "Lucía",
      "creada": "2026-08-28T12:00",
      "estado": "MERGE",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-29T00:00",
          "fin": "2026-08-29T08:39"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-08-29T08:39",
          "fin": "2026-09-01T06:55"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-01T06:55",
          "fin": "2026-09-01T21:18"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-01T21:18",
          "fin": "2026-09-02T20:18"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-02T20:18",
          "fin": "2026-09-05T07:48"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-05T07:48",
          "fin": "2026-09-05T19:48"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-05T19:48",
          "fin": "2026-09-07T08:35"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-07T08:35",
          "fin": "2026-09-08T07:35"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-08T07:35",
          "fin": "2026-09-10T00:08"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-10T00:08",
          "fin": "2026-09-10T05:21"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-10T05:21",
          "fin": "2026-09-11T05:44"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-11T05:44",
          "fin": "2026-09-11T22:28"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-11T22:28",
          "fin": "2026-09-12T00:00"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-01T21:18",
          "desde": "AI",
          "categoria": "No cubre todos los escenarios o escenarios borde"
        },
        {
          "fecha": "2026-09-05T07:48",
          "desde": "DEV",
          "categoria": "No cubre todos los escenarios o escenarios borde"
        },
        {
          "fecha": "2026-09-07T08:35",
          "desde": "DEV",
          "categoria": "El codigo produce un error (crash) en runtime o compilacion"
        }
      ]
    },
    {
      "clave": "CJJ-2060",
      "titulo": "Alertas de plazos procesales",
      "responsable": "Ana",
      "creada": "2026-08-28T20:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-29T00:00",
          "fin": "2026-08-30T09:59"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-08-30T09:59",
          "fin": "2026-09-01T04:51"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-01T04:51",
          "fin": "2026-09-01T10:07"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-01T10:07",
          "fin": "2026-09-02T01:07"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-02T01:07",
          "fin": "2026-09-04T20:27"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-04T20:27",
          "fin": "2026-09-05T06:01"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-05T06:01",
          "fin": "2026-09-06T03:54"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-06T03:54",
          "fin": "2026-09-06T19:57"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-06T19:57",
          "fin": "2026-09-07T05:19"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-07T05:19",
          "fin": "2026-09-08T06:01"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-08T06:01",
          "fin": "2026-09-08T14:53"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-01T10:07",
          "desde": "AI",
          "categoria": "No hay comentarios para categorizar"
        }
      ]
    },
    {
      "clave": "CJJ-1983",
      "titulo": "Búsqueda de expedientes por parte",
      "responsable": "Héctor",
      "creada": "2026-08-29T16:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-29T16:00",
          "fin": "2026-08-31T06:15"
        },
        {
          "etapa": "RET",
          "inicio": "2026-08-31T06:15",
          "fin": "2026-09-01T00:15"
        },
        {
          "etapa": "DOR",
          "inicio": "2026-09-01T00:15",
          "fin": "2026-09-02T13:43"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-02T13:43",
          "fin": "2026-09-04T03:15"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-04T03:15",
          "fin": "2026-09-04T15:15"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-04T15:15",
          "fin": "2026-09-07T04:41"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-07T04:41",
          "fin": "2026-09-07T10:23"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-07T10:23",
          "fin": "2026-09-07T21:11"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-07T21:11",
          "fin": "2026-09-09T02:47"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-09T02:47",
          "fin": "2026-09-09T13:43"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-09T13:43",
          "fin": "2026-09-10T10:04"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-10T10:04",
          "fin": "2026-09-10T18:26"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-08-31T06:15",
          "desde": "DOR",
          "categoria": "No cumple definición de terminado (DoD)"
        },
        {
          "fecha": "2026-09-04T03:15",
          "desde": "DEV",
          "categoria": "Conflicto con la rama principal"
        }
      ]
    },
    {
      "clave": "CJJ-2011",
      "titulo": "Validación de CURP en registro de partes",
      "responsable": "Ana",
      "creada": "2026-08-30T05:00",
      "estado": "SAND",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-30T05:00",
          "fin": "2026-08-31T02:00"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-08-31T02:00",
          "fin": "2026-09-02T21:11"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-02T21:11",
          "fin": "2026-09-03T09:11"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-03T09:11",
          "fin": "2026-09-05T17:45"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-05T17:45",
          "fin": "2026-09-06T11:45"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-06T11:45",
          "fin": "2026-09-08T02:29"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-08T02:29",
          "fin": "2026-09-08T16:08"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-08T16:08",
          "fin": "2026-09-09T01:37"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-09T01:37",
          "fin": "2026-09-10T14:32"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-10T14:32",
          "fin": "2026-09-11T00:23"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-11T00:23",
          "fin": "2026-09-12T00:00"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-02T21:11",
          "desde": "DEV",
          "categoria": "El funcionamiento es incorrecto"
        },
        {
          "fecha": "2026-09-05T17:45",
          "desde": "DEV",
          "categoria": "Error de QA - testing"
        }
      ]
    },
    {
      "clave": "CJJ-1962",
      "titulo": "Carga masiva de anexos al expediente",
      "responsable": "Ana",
      "creada": "2026-08-31T04:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-31T04:00",
          "fin": "2026-09-01T06:41"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-01T06:41",
          "fin": "2026-09-02T15:45"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-02T15:45",
          "fin": "2026-09-03T04:51"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-03T04:51",
          "fin": "2026-09-04T00:28"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-04T00:28",
          "fin": "2026-09-04T14:26"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-04T14:26",
          "fin": "2026-09-04T22:39"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-04T22:39",
          "fin": "2026-09-05T09:44"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-05T09:44",
          "fin": "2026-09-05T17:10"
        }
      ],
      "retrabajos": []
    },
    {
      "clave": "CJJ-2039",
      "titulo": "Sincronización con oficialía de partes",
      "responsable": "Paola",
      "creada": "2026-08-31T15:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-31T15:00",
          "fin": "2026-09-01T12:06"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-01T12:06",
          "fin": "2026-09-03T08:36"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-03T08:36",
          "fin": "2026-09-03T16:57"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-03T16:57",
          "fin": "2026-09-04T07:27"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-04T07:27",
          "fin": "2026-09-05T15:24"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-05T15:24",
          "fin": "2026-09-06T00:17"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-06T00:17",
          "fin": "2026-09-06T10:47"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-06T10:47",
          "fin": "2026-09-06T19:09"
        }
      ],
      "retrabajos": []
    },
    {
      "clave": "CJJ-2018",
      "titulo": "Exportar expediente a PDF foliado",
      "responsable": "Rubén",
      "creada": "2026-08-31T23:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-08-31T23:00",
          "fin": "2026-09-02T01:06"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-02T01:06",
          "fin": "2026-09-04T08:09"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-04T08:09",
          "fin": "2026-09-05T06:09"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-05T06:09",
          "fin": "2026-09-06T22:16"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-06T22:16",
          "fin": "2026-09-07T08:54"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-07T08:54",
          "fin": "2026-09-07T18:00"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-07T18:00",
          "fin": "2026-09-08T06:36"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-08T06:36",
          "fin": "2026-09-08T12:10"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-08T12:10",
          "fin": "2026-09-09T01:33"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-09T01:33",
          "fin": "2026-09-09T09:34"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-04T08:09",
          "desde": "DEV",
          "categoria": "No cumple lineamientos de UX/UI"
        }
      ]
    },
    {
      "clave": "CJJ-2053",
      "titulo": "Recuperación de contraseña de funcionario",
      "responsable": "Sofía",
      "creada": "2026-09-01T16:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-09-01T16:00",
          "fin": "2026-09-03T05:05"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-03T05:05",
          "fin": "2026-09-04T21:13"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-04T21:13",
          "fin": "2026-09-05T19:13"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-05T19:13",
          "fin": "2026-09-07T10:52"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-07T10:52",
          "fin": "2026-09-08T01:22"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-08T01:22",
          "fin": "2026-09-08T20:31"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-08T20:31",
          "fin": "2026-09-10T02:06"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-10T02:06",
          "fin": "2026-09-10T07:07"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-10T07:07",
          "fin": "2026-09-10T17:58"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-10T17:58",
          "fin": "2026-09-11T02:39"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-04T21:13",
          "desde": "DEV",
          "categoria": "Error de QA - testing"
        }
      ]
    },
    {
      "clave": "CJJ-2067",
      "titulo": "Catálogo de tipos de promoción",
      "responsable": "Rubén",
      "creada": "2026-09-02T06:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-09-02T06:00",
          "fin": "2026-09-03T22:58"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-03T22:58",
          "fin": "2026-09-05T13:32"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-05T13:32",
          "fin": "2026-09-05T21:32"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-05T21:32",
          "fin": "2026-09-08T08:21"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-08T08:21",
          "fin": "2026-09-08T15:59"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-08T15:59",
          "fin": "2026-09-09T00:48"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-09T00:48",
          "fin": "2026-09-09T16:59"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-09T16:59",
          "fin": "2026-09-09T22:29"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-09T22:29",
          "fin": "2026-09-11T04:15"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-11T04:15",
          "fin": "2026-09-11T10:50"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-05T13:32",
          "desde": "DEV",
          "categoria": "No hay comentarios para categorizar"
        }
      ]
    },
    {
      "clave": "CJJ-2004",
      "titulo": "Bitácora de cambios del expediente",
      "responsable": "Sofía",
      "creada": "2026-09-02T14:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-09-02T14:00",
          "fin": "2026-09-03T08:52"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-03T08:52",
          "fin": "2026-09-05T18:47"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-05T18:47",
          "fin": "2026-09-06T08:04"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-06T08:04",
          "fin": "2026-09-07T05:26"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-07T05:26",
          "fin": "2026-09-08T15:22"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-08T15:22",
          "fin": "2026-09-08T22:36"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-08T22:36",
          "fin": "2026-09-09T12:41"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-09T12:41",
          "fin": "2026-09-09T18:50"
        }
      ],
      "retrabajos": []
    },
    {
      "clave": "CJJ-1990",
      "titulo": "Turnado automático de promociones",
      "responsable": "Paola",
      "creada": "2026-09-03T02:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-09-03T02:00",
          "fin": "2026-09-04T10:51"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-04T10:51",
          "fin": "2026-09-05T22:08"
        },
        {
          "etapa": "RET",
          "inicio": "2026-09-05T22:08",
          "fin": "2026-09-06T08:08"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-06T08:08",
          "fin": "2026-09-07T17:54"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-07T17:54",
          "fin": "2026-09-08T03:35"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-08T03:35",
          "fin": "2026-09-09T01:53"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-09T01:53",
          "fin": "2026-09-10T12:17"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-10T12:17",
          "fin": "2026-09-10T21:39"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-10T21:39",
          "fin": "2026-09-11T08:08"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-11T08:08",
          "fin": "2026-09-11T15:18"
        }
      ],
      "retrabajos": [
        {
          "fecha": "2026-09-05T22:08",
          "desde": "DEV",
          "categoria": "OTRO, No se ajusta a ninguna categoria definida"
        }
      ]
    },
    {
      "clave": "CJJ-1997",
      "titulo": "Reporte de audiencias del día",
      "responsable": "Diego",
      "creada": "2026-09-03T06:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-09-03T06:00",
          "fin": "2026-09-04T11:03"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-04T11:03",
          "fin": "2026-09-06T06:52"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-06T06:52",
          "fin": "2026-09-06T16:00"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-06T16:00",
          "fin": "2026-09-07T07:25"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-07T07:25",
          "fin": "2026-09-08T08:23"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-08T08:23",
          "fin": "2026-09-08T18:54"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-08T18:54",
          "fin": "2026-09-09T07:04"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-09T07:04",
          "fin": "2026-09-09T14:29"
        }
      ],
      "retrabajos": []
    },
    {
      "clave": "CJJ-2046",
      "titulo": "Vista previa de documentos en visor",
      "responsable": "Diego",
      "creada": "2026-09-03T14:00",
      "estado": "En producción",
      "tramos": [
        {
          "etapa": "DOR",
          "inicio": "2026-09-03T14:00",
          "fin": "2026-09-05T06:42"
        },
        {
          "etapa": "DEV",
          "inicio": "2026-09-05T06:42",
          "fin": "2026-09-06T20:40"
        },
        {
          "etapa": "AI",
          "inicio": "2026-09-06T20:40",
          "fin": "2026-09-07T08:30"
        },
        {
          "etapa": "LEAD-REV",
          "inicio": "2026-09-07T08:30",
          "fin": "2026-09-07T23:00"
        },
        {
          "etapa": "QA",
          "inicio": "2026-09-07T23:00",
          "fin": "2026-09-08T16:27"
        },
        {
          "etapa": "MERGE",
          "inicio": "2026-09-08T16:27",
          "fin": "2026-09-09T03:07"
        },
        {
          "etapa": "SAND",
          "inicio": "2026-09-09T03:07",
          "fin": "2026-09-09T23:12"
        },
        {
          "etapa": "PROD",
          "inicio": "2026-09-09T23:12",
          "fin": "2026-09-10T07:37"
        }
      ],
      "retrabajos": []
    }
  ]
};
