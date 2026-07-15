# -*- coding: utf-8 -*-
"""Python Toolbox publicable para generar F-MA-018 con ReportLab."""

import os
import sys
import base64
from urllib.parse import quote

import arcpy
from arcpy import env


TOOLBOX_DIR = os.path.dirname(__file__)
ASSETS_DIR = os.path.join(TOOLBOX_DIR, "assets")
POWER_AUTOMATE_URL = os.environ.get("POWER_AUTOMATE_RT_URL", "")
SHAREPOINT_SITE = "https://aminerals.sharepoint.com/sites/SIG_AMSA/MLP/GMA"
FOLDER_CERRADOS = (
    "/Documentos compartidos/General/02 Procesos Transversales/08 RT Terreno"
)
FOLDER_EN_TRATAMIENTO = FOLDER_CERRADOS + "/En Tratamiento"
AUTO_LOOKBACK_MINUTES = float(os.environ.get("RT_AUTO_LOOKBACK_MINUTES", "15"))
if TOOLBOX_DIR not in sys.path:
    sys.path.insert(0, TOOLBOX_DIR)


class Toolbox(object):
    def __init__(self):
        self.label = "Reportes de Terreno F-MA-018"
        self.alias = "reportes_terreno"
        self.tools = [GenerarReporteTerreno]


class GenerarReporteTerreno(object):
    def __init__(self):
        self.label = "Generar reporte de terreno"
        self.description = (
            "Genera F-MA-018 para un ObjectID incluyendo relaciones, mapas "
            "y fotografías."
        )
        self.canRunInBackground = False

    def getParameterInfo(self):
        object_id = arcpy.Parameter(
            displayName="ObjectID",
            name="object_id",
            datatype="GPString",
            parameterType="Optional",
            direction="Input",
        )
        output_pdf = arcpy.Parameter(
            displayName="PDF generado",
            name="output_pdf",
            datatype="DEFile",
            parameterType="Derived",
            direction="Output",
        )
        sharepoint_url = arcpy.Parameter(
            displayName="URL del archivo en SharePoint",
            name="sharepoint_url",
            datatype="GPString",
            parameterType="Derived",
            direction="Output",
        )
        return [object_id, output_pdf, sharepoint_url]

    def isLicensed(self):
        return True

    def updateParameters(self, parameters):
        return

    def updateMessages(self, parameters):
        return

    def execute(self, parameters, messages):
        try:
            # Imports diferidos: la tarea puede cargarse y validarse en AGS
            # antes de importar dependencias pesadas o recursos del reporte.
            import importlib
            import reportlab_rt
            from core.modules import sendAutomated
            reportlab_rt = importlib.reload(reportlab_rt)

            gis = reportlab_rt.connect_gis()
            object_id_text = parameters[0].valueAsText
            if object_id_text:
                object_id = reportlab_rt.resolve_object_id(
                    gis, reportlab_rt.FEATURE_ITEM_ID, object_id_text
                )
                arcpy.AddMessage(
                    "Modo manual: usando ObjectID {0}.".format(object_id)
                )
            else:
                arcpy.AddMessage(
                    "Modo automático: buscando la edición más reciente "
                    "dentro de los últimos {0:g} minutos...".format(
                        AUTO_LOOKBACK_MINUTES
                    )
                )
                object_id = reportlab_rt.resolve_object_id(
                    gis,
                    reportlab_rt.FEATURE_ITEM_ID,
                    lookback_minutes=AUTO_LOOKBACK_MINUTES,
                )
                if object_id is None:
                    arcpy.AddMessage(
                        "No hay registros editados dentro de los últimos "
                        "{0:g} minutos. No se generó ni envió ningún reporte.".format(
                            AUTO_LOOKBACK_MINUTES
                        )
                    )
                    parameters[1].value = None
                    parameters[2].value = ""
                    arcpy.SetParameterAsText(1, "")
                    arcpy.SetParameterAsText(2, "")
                    return
                arcpy.AddMessage(
                    "Registro reciente seleccionado: ObjectID {0}.".format(object_id)
                )

            arcpy.AddMessage("Consultando ObjectID {0}...".format(object_id))
            data = reportlab_rt.load_arcgis_record(
                gis,
                "aa0a9bb3504b4916a61a12ca6a920739",
                object_id,
            )

            # DEFile debe escribirse en scratchFolder; scratchGDB se usa solo
            # como respaldo para resolver el directorio temporal del job.
            scratch_folder = env.scratchFolder
            if not scratch_folder:
                scratch_folder = os.path.dirname(env.scratchGDB)
            if not os.path.isdir(scratch_folder):
                os.makedirs(scratch_folder)

            arcpy.AddMessage("Descargando recursos gráficos desde el portal...")
            reportlab_rt.configure_logo_assets(gis, scratch_folder)

            base_name = os.path.splitext(
                reportlab_rt.report_name(data, object_id)
            )[0]
            output_path = os.path.join(scratch_folder, base_name + ".pdf")
            arcpy.AddMessage("Directorio de salida: {0}".format(scratch_folder))
            arcpy.AddMessage("Generando tablas, mapas y fotografías...")
            reportlab_rt.generate_report(data, output_path)

            if not os.path.isfile(output_path) or os.path.getsize(output_path) == 0:
                raise RuntimeError("El PDF no fue creado correctamente.")

            parameters[1].value = output_path
            arcpy.SetParameterAsText(1, output_path)
            arcpy.AddMessage("Reporte generado: {0}".format(output_path))

            estado = str(data.get("estado3") or data.get("estado") or "").strip().upper()
            folder_sharepoint = (
                FOLDER_CERRADOS
                if estado in {"CERRADO", "CERRADO FUERA PLAZO"}
                else FOLDER_EN_TRATAMIENTO
            )
            with open(output_path, "rb") as pdf_file:
                pdf_base64 = base64.b64encode(pdf_file.read()).decode("ascii")
            file_name = os.path.basename(output_path)
            payload = {
                "name": file_name,
                "sharepoint": SHAREPOINT_SITE,
                "folder_sharepoint": folder_sharepoint,
                "folder_onedrive": "",
                "file_name": file_name,
                "content_type": "application/pdf",
                "file": pdf_base64,
            }
            if not POWER_AUTOMATE_URL:
                raise RuntimeError(
                    "Configure POWER_AUTOMATE_RT_URL antes de publicar o ejecutar."
                )
            target_relative_path = folder_sharepoint.rstrip("/") + "/" + file_name
            target_sharepoint_url = SHAREPOINT_SITE.rstrip("/") + quote(
                target_relative_path, safe="/"
            )
            # La URL representa el destino solicitado al flujo. Se entrega
            # incluso si SharePoint no logra sobrescribir el archivo.
            parameters[2].value = target_sharepoint_url
            arcpy.SetParameterAsText(2, target_sharepoint_url)
            flujo = "RT Terreno ReportLab Folio {0}-{1} OID {2}".format(
                data.get("folio", ""), data.get("ano_insp", ""), object_id
            )
            arcpy.AddMessage(
                "Enviando reporte a SharePoint: {0}{1}".format(
                    SHAREPOINT_SITE, folder_sharepoint
                )
            )
            uploaded = sendAutomated(POWER_AUTOMATE_URL, flujo, payload)
            if uploaded:
                arcpy.AddMessage("Power Automate confirmó la carga en SharePoint.")
                arcpy.AddMessage(
                    "URL del archivo en SharePoint: {0}".format(target_sharepoint_url)
                )
            else:
                # El PDF sigue disponible como salida GP aunque falle la copia.
                arcpy.AddWarning(
                    "El PDF fue generado, pero Power Automate no confirmó la carga en SharePoint."
                )
                arcpy.AddWarning(
                    "Se retorna igualmente la URL de destino: {0}".format(
                        target_sharepoint_url
                    )
                )

        except Exception as exc:
            arcpy.AddError("Error generando el reporte F-MA-018.")
            arcpy.AddError(str(exc))
            raise
