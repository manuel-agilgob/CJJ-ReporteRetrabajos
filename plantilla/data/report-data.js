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
    "version": "v1.0"
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
    "nota": "Un hotfix es una corrección desplegada fuera del flujo normal para resolver un defecto ya liberado. No cuenta como retrabajo: la actividad no regresó a una etapa anterior, se abrió trabajo nuevo. Se identifica por el término «hotfix» en el nombre de la tarjeta y se cuenta en el periodo en que se creó.",
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
  "indicadores": [],
  "serie": [],
  "composicion": [],
  "riesgos": []
};
