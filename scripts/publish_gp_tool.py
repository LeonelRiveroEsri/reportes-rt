#!/usr/bin/env python3
"""Ejecuta, empaqueta y publica ReportesTerreno como servicio GP asincrono."""
import argparse
import os
import tempfile
from pathlib import Path
from xml.dom import minidom

import arcpy


def require_environment(names):
    missing = [name for name in names if not os.environ.get(name)]
    if missing:
        raise RuntimeError("Faltan variables protegidas: " + ", ".join(missing))


def mark_as_overwrite(sddraft):
    document = minidom.parse(str(sddraft))
    for node in document.getElementsByTagName("Type"):
        if node.firstChild and node.firstChild.data == "esriServiceDefinitionType_New":
            node.firstChild.data = "esriServiceDefinitionType_Replacement"
    with open(sddraft, "w", encoding="utf-8") as stream:
        document.writexml(stream)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--connection", required=True, help="archivo .ags de publicador")
    parser.add_argument("--object-id", required=True)
    parser.add_argument("--service-name", default="CL_MLP_GMA_ReportesRT")
    parser.add_argument("--folder", default="", help="carpeta opcional en ArcGIS Server")
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()
    require_environment(
        ["AMSA_PORTAL_USER", "AMSA_PORTAL_PASSWORD", "POWER_AUTOMATE_RT_URL"]
    )
    root = Path(__file__).resolve().parents[1]
    toolbox = root / "gptools" / "ReportesTerreno.pyt"
    connection = Path(args.connection).resolve()
    if not toolbox.exists() or not connection.exists():
        raise FileNotFoundError("No se encontro el toolbox o el archivo .ags")
    arcpy.ImportToolbox(str(toolbox), "reportes_terreno")
    execute_tool = getattr(arcpy, "GenerarReporteTerreno_reportes_terreno")
    print("Ejecutando herramienta para crear el resultado de publicacion...")
    result = execute_tool(args.object_id)
    if result.status != 4:
        raise RuntimeError(result.getMessages())
    with tempfile.TemporaryDirectory(prefix="reportes_rt_publish_") as temp:
        sddraft = Path(temp) / "reportes_rt.sddraft"
        sd = Path(temp) / "reportes_rt.sd"
        arcpy.CreateGPSDDraft(
            result, str(sddraft), args.service_name, "FROM_CONNECTION_FILE",
            str(connection), True, args.folder or None,
            "Generacion de reportes de terreno F-MA-018",
            "reportes,terreno,F-MA-018", "Asynchronous"
        )
        if args.overwrite:
            mark_as_overwrite(sddraft)
        arcpy.server.StageService(str(sddraft), str(sd))
        arcpy.server.UploadServiceDefinition(str(sd), str(connection))
    print("Publicacion GP completada.")


if __name__ == "__main__":
    main()
