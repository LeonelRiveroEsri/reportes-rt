# -*- coding: utf-8 -*-
"""Python Toolbox para validar y contar registros de un archivo Excel."""

import json
import os
import sys

import arcpy


TOOLBOX_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
if TOOLBOX_DIRECTORY not in sys.path:
    sys.path.insert(0, TOOLBOX_DIRECTORY)

from excel_processor import inspect_excel


class Toolbox:
    def __init__(self):
        self.label = "Procesamiento de Excel"
        self.alias = "procesamiento_excel"
        self.tools = [ProcesarExcel]


class ProcesarExcel:
    def __init__(self):
        self.label = "Procesar archivo Excel"
        self.description = (
            "Carga la primera hoja de un archivo XLSX con pandas y devuelve "
            "la cantidad de registros junto con un resumen JSON."
        )
        self.canRunInBackground = False

    def getParameterInfo(self):
        input_excel = arcpy.Parameter(
            displayName="Archivo Excel (.xlsx)",
            name="archivo_excel",
            datatype="DEFile",
            parameterType="Required",
            direction="Input",
        )
        input_excel.filter.list = ["xlsx"]

        record_count = arcpy.Parameter(
            displayName="Cantidad de registros",
            name="cantidad_registros",
            datatype="GPLong",
            parameterType="Derived",
            direction="Output",
        )

        status_message = arcpy.Parameter(
            displayName="Mensaje de resultado",
            name="mensaje_resultado",
            datatype="GPString",
            parameterType="Derived",
            direction="Output",
        )

        result_json = arcpy.Parameter(
            displayName="Resumen JSON",
            name="resumen_json",
            datatype="GPString",
            parameterType="Derived",
            direction="Output",
        )

        return [input_excel, record_count, status_message, result_json]

    def isLicensed(self):
        return True

    def updateParameters(self, parameters):
        return

    def updateMessages(self, parameters):
        value = parameters[0].valueAsText
        if value and not value.lower().endswith(".xlsx"):
            parameters[0].setErrorMessage("Seleccione un archivo con extensión .xlsx.")

    def execute(self, parameters, messages):
        input_path = parameters[0].valueAsText
        arcpy.SetProgressor("step", "Preparando procesamiento...", 0, 3, 1)

        try:
            arcpy.AddMessage("Procesando archivo Excel...")
            arcpy.SetProgressorLabel("Validando archivo de entrada...")
            arcpy.SetProgressorPosition()

            arcpy.AddMessage("Cargando archivo con pandas...")
            arcpy.SetProgressorLabel("Cargando primera hoja del archivo...")
            summary = inspect_excel(input_path)
            arcpy.SetProgressorPosition()

            result_message = (
                f"Archivo cargado correctamente. Se encontraron "
                f"{summary.row_count} registros en la hoja '{summary.sheet_name}'."
            )
            result_json = json.dumps(
                summary.to_dict(), ensure_ascii=False, separators=(",", ":")
            )

            arcpy.AddMessage(f"Archivo: {summary.file_name}")
            arcpy.AddMessage(f"Hoja procesada: {summary.sheet_name}")
            arcpy.AddMessage(f"Cantidad de columnas: {summary.column_count}")
            arcpy.AddMessage(f"Cantidad de registros: {summary.row_count}")
            arcpy.AddMessage("Procesamiento finalizado correctamente.")

            arcpy.SetParameterAsText(1, str(summary.row_count))
            arcpy.SetParameterAsText(2, result_message)
            arcpy.SetParameterAsText(3, result_json)
            arcpy.SetProgressorLabel("Procesamiento completado.")
            arcpy.SetProgressorPosition()
        except Exception as exc:
            arcpy.AddError(f"No fue posible procesar el archivo Excel: {exc}")
            raise
        finally:
            arcpy.ResetProgressor()
