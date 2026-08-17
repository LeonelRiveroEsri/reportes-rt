# -*- coding: utf-8 -*-
"""Crea la tabla de estado actual para publicar como Hosted Table."""

from pathlib import Path
import argparse

import arcpy


TABLE_NAME = "Estado_Actualizacion_Cargas"
FIELDS = [
    ("CLAVE", "TEXT", 40, "Clave del flujo"),
    ("PROCESO", "TEXT", 80, "Proceso actualizado"),
    ("FRECUENCIA", "TEXT", 40, "Frecuencia de actualizacion"),
    ("ULTIMA_ACTUALIZACION", "DATE", None, "Ultima actualizacion"),
    ("USUARIO", "TEXT", 150, "Usuario"),
    ("NOMBRE_COMPLETO", "TEXT", 255, "Nombre completo"),
    ("CORREO", "TEXT", 255, "Correo electronico"),
    ("ARCHIVO", "TEXT", 255, "Archivo procesado"),
    ("REGISTROS", "LONG", None, "Registros procesados"),
    ("ESTADO", "TEXT", 40, "Estado de la ejecucion"),
    ("ORIGEN", "TEXT", 80, "Origen de la ejecucion"),
    ("MENSAJE", "TEXT", 1000, "Mensaje de resultado"),
]


def ensure_table(gdb_path):
    gdb = Path(gdb_path).expanduser().resolve()
    if gdb.suffix.lower() != ".gdb":
        raise ValueError("La salida debe ser una file geodatabase con extension .gdb.")
    if not arcpy.Exists(str(gdb)):
        gdb.parent.mkdir(parents=True, exist_ok=True)
        arcpy.management.CreateFileGDB(str(gdb.parent), gdb.name)

    table = str(gdb / TABLE_NAME)
    if not arcpy.Exists(table):
        arcpy.management.CreateTable(str(gdb), TABLE_NAME)

    existing = {field.name.upper() for field in arcpy.ListFields(table)}
    added = []
    for name, kind, length, alias in FIELDS:
        if name.upper() in existing:
            continue
        kwargs = {"field_alias": alias}
        if length:
            kwargs["field_length"] = length
        arcpy.management.AddField(table, name, kind, **kwargs)
        added.append(name)
    return table, added


def main():
    parser = argparse.ArgumentParser(description="Crea la tabla de estado de cargas para ArcGIS Enterprise.")
    parser.add_argument(
        "--gdb",
        default=str(Path(__file__).resolve().parent / "EstadoCargas.gdb"),
        help="File geodatabase de salida.",
    )
    args = parser.parse_args()
    table, added = ensure_table(args.gdb)
    print("Tabla preparada: " + table)
    print("Campos agregados: " + (", ".join(added) if added else "ninguno"))
    print("Registros iniciales: " + str(arcpy.management.GetCount(table)[0]))


if __name__ == "__main__":
    main()
