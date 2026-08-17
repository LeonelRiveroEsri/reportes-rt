# -*- coding: utf-8 -*-
"""Python Toolbox para generar y publicar la tabla Curvas_S."""

import json
import os
from pathlib import Path
import re
import sys
import unicodedata
import time
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen
from uuid import uuid4

try:
    import fastexcel  # noqa: F401
    import pyarrow  # noqa: F401
except ImportError:
    pass

import arcpy
import pandas as pd


TOOLBOX_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
if TOOLBOX_DIRECTORY not in sys.path:
    sys.path.insert(0, TOOLBOX_DIRECTORY)

TARGET_TABLE = (
    r"\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB"
    r"\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Curvas_S"
)

STATUS_ITEM_ID = "a143e48aae57415eb73c0dbb80bf3e4e"
STATUS_PORTAL = "https://sig.aminerals.cl/portal"
STATUS_REFERER = "https://sig.aminerals.cl"
STATUS_ADMIN_USER = "__AMSA_ADMIN_USER__"
STATUS_ADMIN_PASSWORD = "__AMSA_ADMIN_PASSWORD__"


def _status_post(url, values):
    request = Request(url, data=urlencode(values).encode("utf-8"), headers={"Referer": STATUS_REFERER})
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

CATEGORY_LABELS = {
    "GEOLOGIA": "GEOLOGÍA", "LAS TIGRESAS": "LAS TIGRESAS", "EVU": "EVU",
    "GEOTECNICO": "GEOTÉCNICO", "HIDROGEOLOGICO DDH": "HIDROGEOLÓGICO DDH",
    "HIDROGEOLOGICO AR": "HIDROGEOLÓGICO AR",
}
METRICS = {"ACUMULADO PLAN": "PRESUPUESTO", "ACUMULADO REAL": "REAL"}
MONTHS = {1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun",
          7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"}
FIELDS = ["TIPO", "FECHA", "AÑO", "MES", "PRESUPUESTO", "REAL"]
FIELD_DEFINITIONS = [("TIPO", "TEXT", 255), ("FECHA", "DATE", None),
                     ("AÑO", "SHORT", None), ("MES", "TEXT", 255),
                     ("PRESUPUESTO", "DOUBLE", None), ("REAL", "DOUBLE", None)]


def _key(value):
    if pd.isna(value):
        return ""
    text = unicodedata.normalize("NFKD", str(value))
    text = "".join(char for char in text if not unicodedata.combining(char))
    return re.sub(r"\s+", " ", text.strip()).upper()


def _load_sheet(path):
    try:
        import fastexcel
        reader = fastexcel.read_excel(path)
        if "AVANCE PROGRAMA" not in reader.sheet_names:
            raise ValueError("El libro no contiene la hoja AVANCE PROGRAMA.")
        return reader.load_sheet("AVANCE PROGRAMA").to_pandas(), "fastexcel"
    except ValueError:
        raise
    except Exception:
        with pd.ExcelFile(path, engine="openpyxl") as book:
            if "AVANCE PROGRAMA" not in book.sheet_names:
                raise ValueError("El libro no contiene la hoja AVANCE PROGRAMA.")
            return pd.read_excel(book, "AVANCE PROGRAMA", header=None), "openpyxl"


def _parse_date(value):
    if pd.isna(value):
        return pd.NaT
    if isinstance(value, pd.Timestamp):
        return value.normalize()
    text = str(value).strip()
    return pd.to_datetime(text, errors="coerce", yearfirst=bool(re.match(r"^\d{4}[-/]", text)),
                          dayfirst=not bool(re.match(r"^\d{4}[-/]", text)))


def read_curvas(path):
    workbook = Path(path).expanduser().resolve()
    if not workbook.is_file() or workbook.suffix.lower() != ".xlsx":
        raise ValueError("Seleccione un libro Excel valido con extension .xlsx.")
    raw, reader = _load_sheet(workbook)
    header = None
    for row in range(min(50, len(raw) - 1)):
        row_metrics = {_key(value) for value in raw.iloc[row + 1].tolist()}
        if _key(raw.iat[row, 0]) == "PROGRAMA" and set(METRICS).issubset(row_metrics):
            header = (row, row + 1)
            break
    if header is None:
        raise ValueError("No se reconocieron los encabezados de AVANCE PROGRAMA.")
    category_row, metric_row = header
    categories = pd.Series(raw.iloc[category_row].tolist()).ffill().map(_key)
    metrics = [_key(value) for value in raw.iloc[metric_row].tolist()]
    dates = raw.iloc[metric_row + 1:, 0].map(_parse_date)
    valid = dates.notna()
    dates = dates.loc[valid]
    records, found = [], set()
    for column in range(1, raw.shape[1]):
        category, metric = categories.iat[column], metrics[column]
        if category not in CATEGORY_LABELS or metric not in METRICS:
            continue
        found.add(category)
        values = pd.to_numeric(raw.iloc[metric_row + 1:, column], errors="coerce").loc[valid]
        for date, value in zip(dates, values):
            records.append({"TIPO": CATEGORY_LABELS[category], "FECHA": pd.Timestamp(date).normalize(),
                            "AÑO": int(date.year), "MES": MONTHS[int(date.month)],
                            "METRICA": METRICS[metric], "VALOR": value})
    if not records:
        raise ValueError("AVANCE PROGRAMA no contiene categorias o periodos procesables.")
    result = pd.DataFrame(records).pivot_table(
        index=["TIPO", "FECHA", "AÑO", "MES"], columns="METRICA", values="VALOR", aggfunc="first"
    ).reset_index()
    grid = pd.MultiIndex.from_product(
        [sorted(CATEGORY_LABELS[value] for value in found), sorted(dates.drop_duplicates())],
        names=["TIPO", "FECHA"],
    ).to_frame(index=False)
    result = grid.merge(result.drop(columns=["AÑO", "MES"]), on=["TIPO", "FECHA"], how="left")
    result["AÑO"] = result["FECHA"].dt.year.astype(int)
    result["MES"] = result["FECHA"].dt.month.map(MONTHS)
    result = result.reindex(columns=FIELDS).sort_values(["FECHA", "TIPO"]).reset_index(drop=True)
    return result, {"lector_excel": reader, "hoja": "AVANCE PROGRAMA",
                    "categorias": sorted(result["TIPO"].unique().tolist()),
                    "anios": sorted(int(value) for value in result["AÑO"].unique()),
                    "registros": int(len(result))}


def create_output_table(data, workspace):
    name = "curvas_s_" + uuid4().hex[:10]
    table = str(Path(workspace) / name)
    arcpy.management.CreateTable(workspace, name)
    for field, field_type, length in FIELD_DEFINITIONS:
        kwargs = {"field_length": length} if length else {}
        arcpy.management.AddField(table, field, field_type, **kwargs)
    with arcpy.da.InsertCursor(table, FIELDS) as cursor:
        for row in data[FIELDS].itertuples(index=False, name=None):
            cursor.insertRow(row)
    return table


def _ordered_fields(dataset):
    actual = {field.name.lower(): field.name for field in arcpy.ListFields(dataset)}
    missing = [field for field in FIELDS if field.lower() not in actual]
    if missing:
        raise ValueError("Curvas_S no contiene los campos: " + ", ".join(missing))
    return [actual[field.lower()] for field in FIELDS]


def _prepare_target_fields(target):
    """Intenta completar el esquema y devuelve solo los campos utilizables."""
    actual = {field.name.lower(): field.name for field in arcpy.ListFields(target)}
    added, unavailable = [], []
    definitions = {name.lower(): (name, kind, length) for name, kind, length in FIELD_DEFINITIONS}
    for expected in FIELDS:
        if expected.lower() in actual:
            continue
        name, kind, length = definitions[expected.lower()]
        try:
            kwargs = {"field_length": length} if length else {}
            arcpy.management.AddField(target, name, kind, **kwargs)
            added.append(name)
            arcpy.AddMessage("Campo agregado en Curvas_S: " + name)
        except Exception as error:
            unavailable.append(name)
            arcpy.AddMessage("No fue posible agregar {}. Se continuara sin ese campo: {}".format(name, error))
    actual = {field.name.lower(): field.name for field in arcpy.ListFields(target)}
    common = [name for name in FIELDS if name.lower() in actual]
    return common, [actual[name.lower()] for name in common], added, unavailable


def replace_target(source, target):
    result = {"solicitado": True, "publicado": False, "estado": "destino_no_disponible",
              "destino": target, "registros": 0}
    if not arcpy.Exists(target):
        return result
    common, target_fields, added, unavailable = _prepare_target_fields(target)
    if not common:
        result.update({"estado": "sin_campos_compatibles", "campos_no_disponibles": unavailable})
        return result
    source_actual = {field.name.lower(): field.name for field in arcpy.ListFields(source)}
    source_fields = [source_actual[name.lower()] for name in common]
    backup = str(Path(arcpy.env.scratchGDB) / ("curvas_backup_" + uuid4().hex[:10]))
    try:
        arcpy.management.CopyRows(target, backup)
    except Exception as error:
        result.update({"estado": "bloqueado", "error": str(error), "campos_agregados": added,
                       "campos_no_disponibles": unavailable})
        return result
    expected = int(arcpy.management.GetCount(source)[0])
    try:
        arcpy.management.TruncateTable(target)
        with arcpy.da.SearchCursor(source, source_fields) as rows:
            with arcpy.da.InsertCursor(target, target_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
        final_count = int(arcpy.management.GetCount(target)[0])
        if final_count != expected:
            raise RuntimeError("Carga incompleta: se esperaban {} y se insertaron {}.".format(expected, final_count))
        state = "publicado_parcial" if unavailable else "publicado"
        result.update({"publicado": True, "estado": state, "registros": final_count,
                       "campos_cargados": common, "campos_agregados": added,
                       "campos_no_disponibles": unavailable})
        return result
    except Exception as error:
        try:
            arcpy.management.TruncateTable(target)
            backup_actual = {field.name.lower(): field.name for field in arcpy.ListFields(backup)}
            restore_common = [name for name in common if name.lower() in backup_actual]
            with arcpy.da.SearchCursor(backup, [backup_actual[name.lower()] for name in restore_common]) as rows:
                with arcpy.da.InsertCursor(target, [target_fields[common.index(name)] for name in restore_common]) as writer:
                    for row in rows:
                        writer.insertRow(row)
            state = "error_restaurado"
        except Exception as restore_error:
            state = "error_sin_restaurar"
            error = RuntimeError("{}; restauracion: {}".format(error, restore_error))
        result.update({"estado": state, "error": str(error), "campos_cargados": common,
                       "campos_agregados": added, "campos_no_disponibles": unavailable})
        return result
    finally:
        if arcpy.Exists(backup):
            arcpy.management.Delete(backup)


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
        session_user = arcpy.Parameter(displayName="Usuario de la sesion", name="usuario_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        session_name = arcpy.Parameter(displayName="Nombre del usuario", name="nombre_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        session_email = arcpy.Parameter(displayName="Correo del usuario", name="correo_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        execution_origin = arcpy.Parameter(displayName="Origen de la ejecucion", name="origen_ejecucion", datatype="GPString", parameterType="Optional", direction="Input")
        execution_origin.value = "GP Tool / REST"
        return [input_excel, publish, output_table, count, message, result_json, session_user, session_name, session_email, execution_origin]

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
        session_user = parameters[6].valueAsText or ""
        session_name = parameters[7].valueAsText or ""
        session_email = parameters[8].valueAsText or ""
        execution_origin = parameters[9].valueAsText or "GP Tool / REST"
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
            status_update = {"actualizado": False, "estado": "no_publicado"}
            if publication.get("publicado"):
                status_update = update_status(
                    "CURVAS_S", "Curvas S", os.path.basename(input_path), len(data),
                    session_user, session_name, session_email, execution_origin, status,
                )
            result["estado_actualizacion"] = status_update
            if publication.get("publicado"):
                arcpy.AddMessage("Tabla de control actualizada." if status_update.get("actualizado") else f"Tabla de control no actualizada: {status_update.get('error')}")
            else:
                arcpy.AddMessage("Ejecucion de validacion: no se modifica la tabla de control.")
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
