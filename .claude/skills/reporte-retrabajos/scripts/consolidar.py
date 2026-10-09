#!/usr/bin/env python3
"""Consolida los reportes de retrabajos publicados en tablas planas (JSON o CSV).

Lee reportes/indice.json y cada periodo, ya sea del sitio publicado o de una carpeta local,
y emite una fila por hecho para alimentar un dashboard. Solo usa la biblioteca estándar.

Uso:
  consolidar.py [--origen URL_O_CARPETA] [--tabla TABLA] [--formato json|csv]

Tablas: periodos, retrabajos, hotfixes, colaboradores, actividades
"""
import argparse
import csv
import json
import sys
import urllib.request
from pathlib import Path

SITIO = "https://manuel-agilgob.github.io/CJJ-ReporteRetrabajos/reportes"
ETAPAS_MATRIZ = ["DOR", "DEV", "AI", "LEAD-REV", "QA", "MERGE", "SAND"]


def leer(origen, nombre):
    if origen.startswith("http"):
        with urllib.request.urlopen(f"{origen.rstrip('/')}/{nombre}", timeout=30) as r:
            return json.load(r)
    return json.loads((Path(origen) / nombre).read_text(encoding="utf-8"))


def periodos(origen):
    for p in leer(origen, "indice.json")["periodos"]:
        yield p, leer(origen, p["archivo"])


def t_periodos(origen):
    for p, d in periodos(origen):
        total = sum(sum(e["counts"]) for e in d["etapas"])
        hot = {a["ambiente"]: a["total"] for a in d["hotfixes"]["ambientes"]}
        yield {"inicio": p["inicio"], "fin": p["fin"], "retrabajos": total,
               "etapaPorDefecto": d["etapaPorDefecto"], "hotfixesSAND": hot.get("SAND", 0),
               "hotfixesPROD": hot.get("PROD", 0), "tarjetasConMovimiento": len(d["actividades"]) if "actividades" in d else None}


def t_retrabajos(origen):
    for p, d in periodos(origen):
        for e in d["etapas"]:
            for cat, n in zip(d["categorias"], e["counts"]):
                if n:
                    yield {"inicio": p["inicio"], "etapa": e["key"], "categoria": cat, "retrabajos": n}


def t_hotfixes(origen):
    for p, d in periodos(origen):
        for h in d["hotfixes"]["detalle"]:
            yield {"inicio": p["inicio"], **h}


def t_colaboradores(origen):
    for p, d in periodos(origen):
        for c in d["colaboradores"]:
            for etapa in ETAPAS_MATRIZ:
                for cat, n in zip(d["categorias"], c["matriz"][etapa]):
                    if n:
                        yield {"inicio": p["inicio"], "nombre": c["nombre"], "rol": c["rol"],
                               "tarjetasPeriodo": c["tarjetas"], "etapa": etapa,
                               "categoria": cat, "retrabajos": n}


def t_actividades(origen):
    for p, d in periodos(origen):
        for a in d.get("actividades", []):  # los periodos anteriores a v1.1 no la traen
            yield {"inicio": p["inicio"], "clave": a["clave"], "responsable": a["responsable"],
                   "creada": a["creada"], "estado": a["estado"], "retrabajos": len(a["retrabajos"]),
                   "tramos": json.dumps(a["tramos"], ensure_ascii=False)}


TABLAS = {"periodos": t_periodos, "retrabajos": t_retrabajos, "hotfixes": t_hotfixes,
          "colaboradores": t_colaboradores, "actividades": t_actividades}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--origen", default=SITIO, help="URL del sitio o carpeta local con indice.json")
    ap.add_argument("--tabla", default="periodos", choices=TABLAS)
    ap.add_argument("--formato", default="json", choices=["json", "csv"])
    a = ap.parse_args()
    filas = list(TABLAS[a.tabla](a.origen))
    if a.formato == "json":
        json.dump(filas, sys.stdout, ensure_ascii=False, indent=2)
        print()
    elif filas:
        w = csv.DictWriter(sys.stdout, fieldnames=list(filas[0]))
        w.writeheader()
        w.writerows(filas)


if __name__ == "__main__":
    main()
