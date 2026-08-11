# -*- coding: utf-8 -*-
"""Python Toolbox para validar y contar registros de un archivo Excel."""

import json
import os
import sys

import arcpy


TOOLBOX_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
if TOOLBOX_DIRECTORY not in sys.path:
    sys.path.insert(0, TOOLBOX_DIRECTORY)

from excel_feature_builder import (
    SOURCE_WKID,
    TARGET_WKID,
    TRANSFORMATION,
    TRANSFORMATION_WKID,
    build_feature_class,
    read_master_workbook,
)


class Toolbox:
    def __init__(self):
        self.label = "Procesamiento de Excel"
        self.alias = "procesamiento_excel"
        self.tools = [ProcesarExcel]


class ProcesarExcel:
    def __init__(self):
        self.label = "Procesar archivo Excel"
        self.description = (
            "Lee el libro maestro de sondajes, normaliza sus hojas y devuelve "
            "un FeatureSet de puntos WGS84 sin modificar una geodatabase de negocio."
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

        output_features = arcpy.Parameter(
            displayName="Sondajes procesados",
            name="sondajes_procesados",
            datatype="GPFeatureLayer",
            parameterType="Derived",
            direction="Output",
        )
        output_features.schema.geometryType = "Point"

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

        return [input_excel, output_features, record_count, status_message, result_json]

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

            arcpy.AddMessage("Leyendo hojas ConsolidadoSND_MLP y AVANCE MUESTRERA...")
            arcpy.SetProgressorLabel("Normalizando el libro maestro...")
            data, metrics = read_master_workbook(input_path)
            arcpy.SetProgressorPosition()

            result_message = (
                f"Libro procesado correctamente. Se generaron {len(data)} puntos "
                f"en WGS 84 / UTM 19S."
            )
            arcpy.AddMessage("Creando puntos PSAD56 y ejecutando Project...")
            output_workspace = arcpy.env.scratchGDB
            output_features = build_feature_class(data, output_workspace)
            result = {
                "archivo": os.path.basename(input_path),
                "registros": len(data),
                "metricas": metrics,
                "wkid_origen": SOURCE_WKID,
                "wkid_destino": TARGET_WKID,
                "transformacion": TRANSFORMATION,
                "transformacion_wkid": TRANSFORMATION_WKID,
            }
            result_json = json.dumps(result, ensure_ascii=False, separators=(",", ":"))

            arcpy.AddMessage(f"Archivo: {os.path.basename(input_path)}")
            arcpy.AddMessage(f"Cantidad de sondajes: {len(data)}")
            arcpy.AddMessage(f"Transformación: {TRANSFORMATION} (WKID {TRANSFORMATION_WKID})")
            arcpy.AddMessage("Procesamiento finalizado correctamente.")

            # GPFeatureLayer requiere una capa real para que ArcGIS Pro la agregue
            # al mapa. Al publicar, ArcGIS Server serializa esta salida espacial.
            layer_result = arcpy.management.MakeFeatureLayer(
                output_features, "Sondajes procesados"
            )
            parameters[1].value = layer_result.getOutput(0)
            parameters[2].value = len(data)
            parameters[3].value = result_message
            parameters[4].value = result_json
            arcpy.SetProgressorLabel("Procesamiento completado.")
            arcpy.SetProgressorPosition()
        except Exception as exc:
            arcpy.AddError(f"No fue posible procesar el archivo Excel: {exc}")
            raise
        finally:
            arcpy.ResetProgressor()
