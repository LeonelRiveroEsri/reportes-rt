# -*- coding: utf-8 -*-
"""Python Toolbox para generar y publicar la tabla Curvas_S."""

import json
import os
import sys

try:
    import fastexcel  # noqa: F401
    import pyarrow  # noqa: F401
except ImportError:
    pass

import arcpy


TOOLBOX_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
if TOOLBOX_DIRECTORY not in sys.path:
    sys.path.insert(0, TOOLBOX_DIRECTORY)

from curvas_reader import read_curvas
from curvas_table import create_output_table, replace_target


TARGET_TABLE = (
    r"\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB"
    r"\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Curvas_S"
)


class Toolbox:
    def __init__(self):
        self.label = "Procesamiento de Curvas S"
        self.alias = "procesamiento_curvas_s"
        self.tools = [ProcesarCurvasS]


class ProcesarCurvasS:
    def __init__(self):
        self.label = "Procesar Master Plan - Curvas S"
        self.description = (
            "Lee la hoja AVANCE PROGRAMA del libro maestro, conserva sus categorias "
            "y opcionalmente reemplaza la tabla Curvas_S."
        )
        self.canRunInBackground = False

    def getParameterInfo(self):
        input_excel = arcpy.Parameter(
            displayName="Libro maestro de sondajes (.xlsx)", name="archivo_excel",
            datatype="DEFile", parameterType="Required", direction="Input"
        )
        input_excel.filter.list = ["xlsx"]
        publish = arcpy.Parameter(
            displayName="Publicar en Curvas_S", name="publicar_en_curvas_s",
            datatype="GPBoolean", parameterType="Optional", direction="Input"
        )
        publish.value = False
        output_table = arcpy.Parameter(
            displayName="Curvas acumuladas", name="curvas_acumuladas",
            datatype="GPTableView", parameterType="Derived", direction="Output"
        )
        count = arcpy.Parameter(
            displayName="Cantidad de registros", name="cantidad_registros",
            datatype="GPLong", parameterType="Derived", direction="Output"
        )
        message = arcpy.Parameter(
            displayName="Mensaje de resultado", name="mensaje_resultado",
            datatype="GPString", parameterType="Derived", direction="Output"
        )
        result_json = arcpy.Parameter(
            displayName="Resumen JSON", name="resumen_json",
            datatype="GPString", parameterType="Derived", direction="Output"
        )
        return [input_excel, publish, output_table, count, message, result_json]

    def isLicensed(self):
        return True

    def updateParameters(self, parameters):
        return

    def updateMessages(self, parameters):
        value = parameters[0].valueAsText
        if value and not value.lower().endswith(".xlsx"):
            parameters[0].setErrorMessage("Seleccione un archivo con extension .xlsx.")

    def execute(self, parameters, messages):
        input_path = parameters[0].valueAsText
        publish_requested = str(parameters[1].valueAsText or "false").lower() == "true"
        arcpy.SetProgressor("step", "Preparando Curvas_S...", 0, 4, 1)
        try:
            arcpy.AddMessage("Leyendo categorias y periodos de la hoja AVANCE PROGRAMA...")
            data, metrics = read_curvas(input_path)
            arcpy.SetProgressorPosition()
            arcpy.AddMessage("Preparando presupuesto y real para las categorias del Excel...")
            output = create_output_table(data, arcpy.env.scratchGDB)
            arcpy.SetProgressorPosition()
            publication = {
                "solicitado": publish_requested, "publicado": False,
                "estado": "no_solicitado", "destino": TARGET_TABLE, "registros": 0,
            }
            if publish_requested:
                arcpy.SetProgressorLabel("Actualizando Curvas_S...")
                try:
                    publication = replace_target(output, TARGET_TABLE)
                    if publication["publicado"]:
                        arcpy.AddMessage(f"Curvas_S actualizada con {publication['registros']} registros.")
                    else:
                        arcpy.AddWarning("Curvas_S no esta disponible desde la cuenta del servicio; se conserva la salida temporal.")
                except Exception as error:
                    publication.update({"estado": "error_publicacion", "error": str(error)})
                    arcpy.AddWarning(f"No fue posible reemplazar Curvas_S: {error}. Se conserva la salida temporal.")
            arcpy.SetProgressorPosition()
            result = {
                "archivo": os.path.basename(input_path), "registros": len(data),
                "metricas": metrics, "publicacion_gdb": publication,
            }
            status = f"AVANCE PROGRAMA procesado correctamente. Se generaron {len(data)} registros."
            table_view = arcpy.management.MakeTableView(output, "Curvas S procesadas")
            parameters[2].value = table_view.getOutput(0)
            parameters[3].value = len(data)
            parameters[4].value = status
            parameters[5].value = json.dumps(result, ensure_ascii=False, separators=(",", ":"))
            arcpy.AddMessage(status)
            arcpy.SetProgressorPosition()
        except Exception as error:
            arcpy.AddError(f"No fue posible procesar Curvas_S: {error}")
            raise
        finally:
            arcpy.ResetProgressor()
