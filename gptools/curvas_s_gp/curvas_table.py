# -*- coding: utf-8 -*-
"""Creacion de salida temporal y reemplazo seguro de Curvas_S."""

from pathlib import Path
from uuid import uuid4

import arcpy


FIELDS = ["TIPO", "FECHA", "AÑO", "MES", "PRESUPUESTO", "REAL"]
FIELD_DEFINITIONS = [
    ("TIPO", "TEXT", 255),
    ("FECHA", "DATE", None),
    ("AÑO", "SHORT", None),
    ("MES", "TEXT", 255),
    ("PRESUPUESTO", "DOUBLE", None),
    ("REAL", "DOUBLE", None),
]


def create_output_table(data, workspace):
    name = f"curvas_s_{uuid4().hex[:10]}"
    table = str(Path(workspace) / name)
    arcpy.management.CreateTable(workspace, name)
    for field, field_type, length in FIELD_DEFINITIONS:
        kwargs = {"field_length": length} if length else {}
        arcpy.management.AddField(table, field, field_type, **kwargs)
    with arcpy.da.InsertCursor(table, FIELDS) as cursor:
        for row in data[FIELDS].itertuples(index=False, name=None):
            cursor.insertRow(row)
    count = int(arcpy.management.GetCount(table)[0])
    if count != len(data):
        raise RuntimeError(f"La salida temporal contiene {count} registros; se esperaban {len(data)}.")
    return table


def _validate_target(target):
    if not arcpy.Exists(target):
        return False
    if arcpy.Describe(target).dataType not in ("Table", "TableView"):
        raise ValueError("El destino Curvas_S no es una tabla.")
    target_fields = {field.name.upper(): field for field in arcpy.ListFields(target)}
    missing = [field for field in FIELDS if field.upper() not in target_fields]
    if missing:
        raise ValueError("Curvas_S no contiene los campos: " + ", ".join(missing))
    return True


def replace_target(source, target):
    result = {"solicitado": True, "publicado": False, "estado": "destino_no_disponible", "destino": target, "registros": 0}
    if not _validate_target(target):
        return result
    backup = str(Path(arcpy.env.scratchGDB) / f"curvas_backup_{uuid4().hex[:10]}")
    arcpy.management.CopyRows(target, backup)
    expected = int(arcpy.management.GetCount(source)[0])
    inserted = 0
    try:
        arcpy.management.TruncateTable(target)
        with arcpy.da.SearchCursor(source, FIELDS) as rows:
            with arcpy.da.InsertCursor(target, FIELDS) as writer:
                for row in rows:
                    writer.insertRow(row)
                    inserted += 1
        final_count = int(arcpy.management.GetCount(target)[0])
        if inserted != expected or final_count != expected:
            raise RuntimeError(f"Carga incompleta: origen={expected}, insertados={inserted}, destino={final_count}.")
        result.update({"publicado": True, "estado": "publicado", "registros": final_count})
        return result
    except Exception:
        arcpy.management.TruncateTable(target)
        with arcpy.da.SearchCursor(backup, FIELDS) as rows:
            with arcpy.da.InsertCursor(target, FIELDS) as writer:
                for row in rows:
                    writer.insertRow(row)
        raise
    finally:
        if arcpy.Exists(backup):
            arcpy.management.Delete(backup)
