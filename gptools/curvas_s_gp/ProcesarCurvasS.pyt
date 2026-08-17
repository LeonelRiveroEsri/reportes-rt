# -*- coding: utf-8 -*-
"""Python Toolbox para generar y publicar la tabla Curvas_S."""

import json
import os
from pathlib import Path
import re
import sys
import unicodedata
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


def replace_target(source, target):
    result = {"solicitado": True, "publicado": False, "estado": "destino_no_disponible",
              "destino": target, "registros": 0}
    if not arcpy.Exists(target):
        return result
    source_fields, target_fields = _ordered_fields(source), _ordered_fields(target)
    backup = str(Path(arcpy.env.scratchGDB) / ("curvas_backup_" + uuid4().hex[:10]))
    arcpy.management.CopyRows(target, backup)
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
        result.update({"publicado": True, "estado": "publicado", "registros": final_count})
        return result
    except Exception:
        arcpy.management.TruncateTable(target)
        backup_fields = _ordered_fields(backup)
        with arcpy.da.SearchCursor(backup, backup_fields) as rows:
            with arcpy.da.InsertCursor(target, target_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
        raise
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
