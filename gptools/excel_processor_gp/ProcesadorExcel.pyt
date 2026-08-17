# -*- coding: utf-8 -*-
"""Python Toolbox para validar y contar registros de un archivo Excel."""

import json
import os
import sys
import time
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

# fastexcel convierte mediante Arrow. Cargar estas DLL antes de ArcPy evita
# conflictos de resolución de DLL observados en el ambiente de ArcGIS Pro.
try:
    import fastexcel  # noqa: F401
    import pyarrow  # noqa: F401
except ImportError:
    pass

# Precargar PROJ antes de ArcPy evita que el proceso de geoprocesamiento de Pro
# resuelva pyproj con un sys.path/DLL path ya modificado por ArcGIS.
try:
    import pyproj  # noqa: F401
    from pyproj import CRS  # noqa: F401
    from pyproj.transformer import TransformerGroup  # noqa: F401
    PYPROJ_PRELOAD = f"disponible ({pyproj.__version__}) en {pyproj.__file__}"
except ImportError as error:
    PYPROJ_PRELOAD = f"no disponible: {type(error).__name__}: {error}"

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
    prepare_projected_rows,
    replace_target_with_rows,
)
from source_reader import read_source_inputs


TARGET_FEATURE_CLASS = (
    r"\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB"
    r"\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Collar_Recomendado"
)

STATUS_ITEM_ID = "a143e48aae57415eb73c0dbb80bf3e4e"
STATUS_PORTAL = "https://sig.aminerals.cl/portal"
STATUS_REFERER = "https://sig.aminerals.cl"
STATUS_ADMIN_USER = "__AMSA_ADMIN_USER__"
STATUS_ADMIN_PASSWORD = "__AMSA_ADMIN_PASSWORD__"


def _status_post(url, values):
    request = Request(
        url, data=urlencode(values).encode("utf-8"),
        headers={"Referer": STATUS_REFERER},
    )
    with urlopen(request, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if payload.get("error"):
        raise RuntimeError(payload["error"].get("message", "Error REST de ArcGIS"))
    return payload


def update_status(key, process, filename, records, session_user="", full_name="", email="", origin="GP Tool / REST", message=""):
    try:
        token = _status_post(f"{STATUS_PORTAL}/sharing/rest/generateToken", {
            "f": "json", "username": STATUS_ADMIN_USER, "password": STATUS_ADMIN_PASSWORD,
            "client": "referer", "referer": STATUS_REFERER, "expiration": "60",
        })["token"]
        item = _status_post(f"{STATUS_PORTAL}/sharing/rest/content/items/{STATUS_ITEM_ID}", {"f": "json", "token": token})
        table_url = str(item["url"]).rstrip("/") + "/0"
        if session_user and (not full_name or not email):
            profile = _status_post(f"{STATUS_PORTAL}/sharing/rest/community/users/{quote(session_user)}", {"f": "json", "token": token})
            full_name = full_name or profile.get("fullName", "")
            email = email or profile.get("email", "")
        query = _status_post(f"{table_url}/query", {
            "f": "json", "token": token, "where": "CLAVE='{}'".format(key.replace("'", "''")),
            "outFields": "OBJECTID", "returnGeometry": "false",
        })
        attributes = {
            "CLAVE": key, "PROCESO": process, "FRECUENCIA": "Bajo demanda",
            "ULTIMA_ACTUALIZACION": int(time.time() * 1000), "USUARIO": session_user or "sin_sesion",
            "NOMBRE_COMPLETO": full_name or session_user or "Sin datos", "CORREO": email or "Sin datos",
            "ARCHIVO": filename, "REGISTROS": int(records or 0), "ESTADO": "Completado",
            "ORIGEN": origin or "GP Tool / REST", "MENSAJE": message,
        }
        features, operation = query.get("features") or [], "adds"
        if features:
            attributes["OBJECTID"], operation = features[0]["attributes"]["OBJECTID"], "updates"
        result = _status_post(f"{table_url}/applyEdits", {
            "f": "json", "token": token, operation: json.dumps([{"attributes": attributes}], ensure_ascii=False),
        })
        edit = (result.get("updateResults") or result.get("addResults") or [{}])[0]
        if not edit.get("success"):
            raise RuntimeError(str(edit.get("error") or "applyEdits no confirmado"))
        return {"actualizado": True, "operacion": operation, "objectid": edit.get("objectId")}
    except Exception as error:
        return {"actualizado": False, "error": f"{type(error).__name__}: {error}"}


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

        session_user = arcpy.Parameter(displayName="Usuario de la sesion", name="usuario_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        session_name = arcpy.Parameter(displayName="Nombre del usuario", name="nombre_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        session_email = arcpy.Parameter(displayName="Correo del usuario", name="correo_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        execution_origin = arcpy.Parameter(displayName="Origen de la ejecucion", name="origen_ejecucion", datatype="GPString", parameterType="Optional", direction="Input")
        execution_origin.value = "GP Tool / REST"

        return [input_excel, input_coordinates, publish_to_gdb, output_features, record_count, status_message, result_json, session_user, session_name, session_email, execution_origin]

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
        total_started = time.perf_counter()
        input_path = parameters[0].valueAsText
        coordinate_path = parameters[1].valueAsText
        publish_requested = str(parameters[2].valueAsText or "false").lower() == "true"
        session_user = parameters[7].valueAsText or ""
        session_name = parameters[8].valueAsText or ""
        session_email = parameters[9].valueAsText or ""
        execution_origin = parameters[10].valueAsText or "GP Tool / REST"
        arcpy.SetProgressor("step", "Preparando procesamiento...", 0, 4, 1)

        try:
            arcpy.AddMessage("Procesando archivo Excel...")
            arcpy.AddMessage(f"Python del proceso: {sys.executable}")
            arcpy.AddMessage(f"Ambiente Python: {sys.prefix}")
            arcpy.AddMessage(f"Diagnostico pyproj: {PYPROJ_PRELOAD}")
            arcpy.SetProgressorLabel("Validando archivo de entrada...")
            arcpy.SetProgressorPosition()

            arcpy.AddMessage("Leyendo CONSOLIDADO_PROGRAMA, AVANCE MUESTRERA y SNDTGIS_ACQ...")
            arcpy.SetProgressorLabel("Normalizando el libro maestro...")
            stage_started = time.perf_counter()
            data, metrics = read_source_inputs(input_path, coordinate_path)
            read_seconds = time.perf_counter() - stage_started
            arcpy.AddMessage(
                f"Motor de lectura Excel: {metrics.get('lector_excel', 'desconocido')}."
            )
            if metrics.get("lector_excel") == "fastexcel":
                arcpy.AddMessage("fastexcel disponible y utilizado correctamente.")
            else:
                arcpy.AddMessage(
                    "fastexcel no esta disponible o no pudo leer el libro; "
                    "se utilizo openpyxl como respaldo."
                )
                arcpy.AddMessage(
                    f"Detalle fastexcel: {metrics.get('motivo_respaldo_excel', 'sin detalle')}"
                )
            arcpy.SetProgressorPosition()

            result_message = (
                f"Libro procesado correctamente. Se generaron {len(data)} puntos "
                f"en WGS 84 / UTM 19S."
            )
            arcpy.AddMessage(
                "Proyectando geometrías PSAD56 en memoria e insertando la salida WGS84..."
            )
            output_workspace = arcpy.env.scratchGDB
            prepared_rows, projection_metrics = prepare_projected_rows(data)
            arcpy.AddMessage(
                f"Motor de proyeccion: {projection_metrics['motor_proyeccion']} "
                f"({projection_metrics['segundos']} s)."
            )
            if projection_metrics.get("motivo_respaldo"):
                arcpy.AddMessage(
                    f"pyproj no pudo utilizarse; detalle: "
                    f"{projection_metrics['motivo_respaldo']}"
                )
            stage_started = time.perf_counter()
            output_features = build_feature_class(
                data,
                output_workspace,
                template_features=TARGET_FEATURE_CLASS,
                prepared_rows=prepared_rows,
            )
            output_seconds = time.perf_counter() - stage_started
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
                    stage_started = time.perf_counter()
                    publication = replace_target_with_rows(prepared_rows, TARGET_FEATURE_CLASS)
                    publication["segundos"] = round(time.perf_counter() - stage_started, 3)
                    if publication["publicado"]:
                        arcpy.AddMessage(
                            f"GDB actualizada: {publication['registros']} registros insertados."
                        )
                    else:
                        arcpy.AddMessage(
                            "No se encontró Collar_Recomendado desde la cuenta de ArcGIS Server. "
                            "Se conserva el resultado temporal y el job continúa."
                        )
                except Exception as publication_error:
                    publication.update({
                        "estado": "error_publicacion",
                        "error": str(publication_error),
                    })
                    arcpy.AddMessage(
                        f"No fue posible actualizar la GDB: {publication_error}. "
                        "El layer temporal se devolverá normalmente."
                    )
            arcpy.SetProgressorPosition()
            performance = {
                "lectura_normalizacion": round(read_seconds, 3),
                "proyeccion": projection_metrics,
                "creacion_salida": round(output_seconds, 3),
                "publicacion": publication.get("segundos", 0),
                "total": round(time.perf_counter() - total_started, 3),
            }
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
                "rendimiento": performance,
            }
            status_update = {"actualizado": False, "estado": "no_publicado"}
            if publication.get("publicado"):
                status_update = update_status(
                    "SONDAJES", "Sondajes", os.path.basename(input_path), len(data),
                    session_user, session_name, session_email, execution_origin, result_message,
                )
            result["estado_actualizacion"] = status_update
            if publication.get("publicado"):
                arcpy.AddMessage("Tabla de control actualizada." if status_update.get("actualizado") else f"Tabla de control no actualizada: {status_update.get('error')}")
            else:
                arcpy.AddMessage("Ejecucion de validacion: no se modifica la tabla de control.")
            result_json = json.dumps(result, ensure_ascii=False, separators=(",", ":"))

            arcpy.AddMessage(f"Archivo: {os.path.basename(input_path)}")
            arcpy.AddMessage(f"Cantidad de sondajes: {len(data)}")
            arcpy.AddMessage(f"Transformación: {TRANSFORMATION} (WKID {TRANSFORMATION_WKID})")
            arcpy.AddMessage("Procesamiento finalizado correctamente.")
            arcpy.AddMessage(f"Tiempo total: {performance['total']} segundos.")

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
