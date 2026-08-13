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
    replace_target_with_cursor,
)
from source_reader import read_source_inputs


TARGET_FEATURE_CLASS = (
    r"\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB"
    r"\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Collar_Recomendado"
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
            "un FeatureSet de puntos WGS84. Opcionalmente reemplaza Collar_Recomendado."
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

        input_coordinates = arcpy.Parameter(
            displayName="Coordenadas SNDTGIS_ACQ (.csv)",
            name="archivo_coordenadas",
            datatype="DEFile",
            parameterType="Required",
            direction="Input",
        )
        input_coordinates.filter.list = ["csv"]

        publish_to_gdb = arcpy.Parameter(
            displayName="Publicar en Collar_Recomendado",
            name="publicar_en_gdb",
            datatype="GPBoolean",
            parameterType="Optional",
            direction="Input",
        )
        publish_to_gdb.value = False

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

        return [input_excel, input_coordinates, publish_to_gdb, output_features, record_count, status_message, result_json]

    def isLicensed(self):
        return True

    def updateParameters(self, parameters):
        return

    def updateMessages(self, parameters):
        value = parameters[0].valueAsText
        if value and not value.lower().endswith(".xlsx"):
            parameters[0].setErrorMessage("Seleccione un archivo con extensión .xlsx.")

        coordinate_value = parameters[1].valueAsText
        if coordinate_value and not coordinate_value.lower().endswith(".csv"):
            parameters[1].setErrorMessage("Seleccione un archivo SNDTGIS_ACQ con extensión .csv.")

    def execute(self, parameters, messages):
        input_path = parameters[0].valueAsText
        coordinate_path = parameters[1].valueAsText
        publish_requested = str(parameters[2].valueAsText or "false").lower() == "true"
        arcpy.SetProgressor("step", "Preparando procesamiento...", 0, 4, 1)

        try:
            arcpy.AddMessage("Procesando archivo Excel...")
            arcpy.SetProgressorLabel("Validando archivo de entrada...")
            arcpy.SetProgressorPosition()

            arcpy.AddMessage("Leyendo CONSOLIDADO_PROGRAMA, AVANCE MUESTRERA y SNDTGIS_ACQ...")
            arcpy.SetProgressorLabel("Normalizando el libro maestro...")
            data, metrics = read_source_inputs(input_path, coordinate_path)
            arcpy.SetProgressorPosition()

            result_message = (
                f"Libro procesado correctamente. Se generaron {len(data)} puntos "
                f"en WGS 84 / UTM 19S."
            )
            arcpy.AddMessage(
                "Proyectando geometrías PSAD56 en memoria e insertando la salida WGS84..."
            )
            output_workspace = arcpy.env.scratchGDB
            output_features = build_feature_class(
                data,
                output_workspace,
                template_features=TARGET_FEATURE_CLASS,
            )
            publication = {
                "solicitado": publish_requested,
                "publicado": False,
                "estado": "no_solicitado",
                "destino": TARGET_FEATURE_CLASS,
                "registros": 0,
            }
            if publish_requested:
                arcpy.SetProgressorLabel("Actualizando Collar_Recomendado...")
                try:
                    publication = replace_target_with_cursor(output_features, TARGET_FEATURE_CLASS)
                    if publication["publicado"]:
                        arcpy.AddMessage(
                            f"GDB actualizada: {publication['registros']} registros insertados."
                        )
                    else:
                        arcpy.AddWarning(
                            "No se encontró Collar_Recomendado desde la cuenta de ArcGIS Server. "
                            "Se conserva el resultado temporal y el job continúa."
                        )
                except Exception as publication_error:
                    publication.update({
                        "estado": "error_publicacion",
                        "error": str(publication_error),
                    })
                    arcpy.AddWarning(
                        f"No fue posible actualizar la GDB: {publication_error}. "
                        "El layer temporal se devolverá normalmente."
                    )
            arcpy.SetProgressorPosition()
            result = {
                "archivo": os.path.basename(input_path),
                "archivo_coordenadas": os.path.basename(coordinate_path),
                "registros": len(data),
                "metricas": metrics,
                "wkid_origen": SOURCE_WKID,
                "wkid_destino": TARGET_WKID,
                "transformacion": TRANSFORMATION,
                "transformacion_wkid": TRANSFORMATION_WKID,
                "publicacion_gdb": publication,
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
            parameters[3].value = layer_result.getOutput(0)
            parameters[4].value = len(data)
            parameters[5].value = result_message
            parameters[6].value = result_json
            arcpy.SetProgressorLabel("Procesamiento completado.")
            arcpy.SetProgressorPosition()
        except Exception as exc:
            arcpy.AddError(f"No fue posible procesar el archivo Excel: {exc}")
            raise
        finally:
            arcpy.ResetProgressor()
