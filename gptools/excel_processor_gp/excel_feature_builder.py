"""Convierte el libro maestro de sondajes en una feature class temporal."""

from pathlib import Path
import re
import time
from typing import Dict, Tuple
from uuid import uuid4

import arcpy
import numpy as np
import pandas as pd


SOURCE_WKID = 24879
TARGET_WKID = 32719
TRANSFORMATION = "PSAD_1956_To_WGS_1984_16"
TRANSFORMATION_WKID = 6972
PACKAGED_TEMPLATE = str(
    Path(__file__).resolve().parent / "templates.gdb" / "Collar_Recomendado_template"
)
LOCAL_EAST_REGEX = re.compile(r"^\d{5}(?:\.\d+)?$")
LOCAL_NORTH_REGEX = re.compile(r"^\d{5}(?:\.\d+)?$")
ELEVATION_REGEX = re.compile(r"^\d{4}(?:\.\d+)?$")

FIELD_DEFINITIONS = [
    ("r_nomb_recom", "TEXT", 255, "Recomendación"),
    ("r_tiposondaje", "TEXT", 255, "Tipo de sondaje"),
    ("r_nro_son", "TEXT", 255, "Número de sondaje"),
    ("r_sector", "TEXT", 255, "Sector"),
    ("r_este", "DOUBLE", None, "Este WGS84"),
    ("r_norte", "DOUBLE", None, "Norte WGS84"),
    ("r_cota", "DOUBLE", None, "Cota"),
    ("r_azimut", "DOUBLE", None, "Azimut"),
    ("r_inclinacion", "DOUBLE", None, "Inclinación"),
    ("r_largo", "DOUBLE", None, "Largo programado"),
    ("r_por_perforar", "DOUBLE", None, "Por perforar"),
    ("r_avance_actual", "DOUBLE", None, "Avance actual"),
    ("r_mts_faltantes", "DOUBLE", None, "Metros faltantes"),
    ("r_avance", "DOUBLE", None, "Porcentaje de avance"),
    ("r_estatus_perf", "TEXT", 255, "Estado de perforación"),
    ("r_largo_final", "DOUBLE", None, "Largo final"),
    ("r_cert_collar", "TEXT", 255, "Certificado collar"),
    ("r_observacion", "TEXT", 255, "Observación"),
    ("q_des_campaña", "TEXT", 255, "Descripción de campaña"),
    ("q_año_sondaje", "DOUBLE", None, "Año de sondaje"),
    ("q_tipo_perf", "TEXT", 255, "Tipo de perforación"),
    ("q_estado_son", "TEXT", 255, "Estado del sondaje"),
    ("av_programa", "TEXT", 255, "Programa"),
    ("av_sonda", "TEXT", 255, "Sonda"),
    ("av_largo_program", "DOUBLE", None, "Avance largo programado"),
    ("av_fondo_final", "DOUBLE", None, "Fondo final"),
    ("av_faltante_perf", "DOUBLE", None, "Faltante perforación"),
    ("av_pct_perforado", "DOUBLE", None, "Porcentaje perforado"),
    ("av_tricono", "TEXT", 255, "Tricono"),
    ("av_mts_fotografia", "DOUBLE", None, "Metros fotografía"),
    ("av_mts_corte", "DOUBLE", None, "Metros corte"),
    ("av_mts_mapeo", "DOUBLE", None, "Metros mapeo"),
    ("av_mts_preparacion", "DOUBLE", None, "Metros preparación"),
    ("r_fch_inicio", "DATE", None, "Fecha inicio"),
    ("r_fch_termino", "DATE", None, "Fecha término"),
    ("av_fch_ini", "DATE", None, "Inicio avance"),
    ("av_fch_term", "DATE", None, "Término avance"),
]
OUTPUT_FIELDS = [definition[0] for definition in FIELD_DEFINITIONS]
NUMERIC_FIELDS = {name for name, kind, _, _ in FIELD_DEFINITIONS if kind == "DOUBLE"}
DATE_FIELDS = {name for name, kind, _, _ in FIELD_DEFINITIONS if kind == "DATE"}
TEXT_FIELDS = set(OUTPUT_FIELDS) - NUMERIC_FIELDS - DATE_FIELDS

CONSOLIDADO_MAP = {
    "ID": "r_nomb_recom", "Tipo de Sondaje": "r_tiposondaje",
    "NRO_SON": "r_nro_son", "Sector": "r_sector", "Este": "r_este",
    "Norte": "r_norte", "Cota": "r_cota", "Azimut": "r_azimut",
    "Inclinación": "r_inclinacion", "Largo (m)": "r_largo",
    "Fecha Inicio": "r_fch_inicio", "Fecha Termino": "r_fch_termino",
    "Por Perforar (m)": "r_por_perforar", "Avance Actual (m)": "r_avance_actual",
    "Mts. Faltantes": "r_mts_faltantes", "%Avance": "r_avance",
    "Estatus Perforación (m)": "r_estatus_perf", "Largo Final (m)": "r_largo_final",
    "Certificado Collar": "r_cert_collar", "Observación": "r_observacion",
}

AVANCE_MAP = {
    "Sondaje": "r_nro_son", "Programa": "av_programa", "Sonda": "av_sonda",
    "Inicio": "av_fch_ini", "Término": "av_fch_term",
    "Largo Programado": "av_largo_program", "Fondo Final": "av_fondo_final",
    "Faltante": "av_faltante_perf", "% Perforado": "av_pct_perforado",
    "Tricono": "av_tricono", "Fotografía": "av_mts_fotografia",
    "Corte": "av_mts_corte", "Hasta3": "av_mts_mapeo",
    "Hasta2": "av_mts_preparacion",
}


def _validate_columns(frame: pd.DataFrame, mapping: Dict[str, str], sheet: str) -> None:
    missing = sorted(set(mapping) - set(frame.columns))
    if missing:
        raise ValueError(f"La hoja '{sheet}' no contiene: {', '.join(missing)}")


def _normalize_key(series: pd.Series) -> pd.Series:
    return series.astype("string").str.strip().str.upper().replace("", pd.NA)


def _coordinate_text(value) -> str:
    """Representa números de Excel sin notación científica para validarlos por regex."""
    if pd.isna(value):
        return ""
    try:
        number = float(value)
        return f"{number:.10f}".rstrip("0").rstrip(".")
    except (TypeError, ValueError):
        return str(value).strip()


def read_master_workbook(path: str) -> Tuple[pd.DataFrame, Dict[str, int]]:
    workbook = Path(path).expanduser().resolve()
    if not workbook.is_file() or workbook.suffix.lower() != ".xlsx":
        raise ValueError("Seleccione un libro Excel válido con extensión .xlsx.")

    with pd.ExcelFile(workbook, engine="openpyxl") as excel:
        required_sheets = {"ConsolidadoSND_MLP", "AVANCE MUESTRERA"}
        missing_sheets = sorted(required_sheets - set(excel.sheet_names))
        if missing_sheets:
            raise ValueError(f"El libro no contiene las hojas: {', '.join(missing_sheets)}")
        consolidated_raw = pd.read_excel(excel, "ConsolidadoSND_MLP", header=0)
        advance_raw = pd.read_excel(excel, "AVANCE MUESTRERA", header=1)

    _validate_columns(consolidated_raw, CONSOLIDADO_MAP, "ConsolidadoSND_MLP")
    _validate_columns(advance_raw, AVANCE_MAP, "AVANCE MUESTRERA")
    consolidated = consolidated_raw[list(CONSOLIDADO_MAP)].rename(columns=CONSOLIDADO_MAP).copy()
    advance = advance_raw[list(AVANCE_MAP)].rename(columns=AVANCE_MAP).copy()
    consolidated["r_nro_son"] = _normalize_key(consolidated["r_nro_son"])
    advance["r_nro_son"] = _normalize_key(advance["r_nro_son"])
    advance = advance.dropna(subset=["r_nro_son"])

    if consolidated["r_nro_son"].isna().any() or consolidated["r_nro_son"].duplicated().any():
        raise ValueError("La hoja ConsolidadoSND_MLP contiene NRO_SON vacío o duplicado.")
    if advance["r_nro_son"].duplicated().any():
        raise ValueError("La hoja AVANCE MUESTRERA contiene NRO_SON duplicado.")

    merged = consolidated.merge(advance, on="r_nro_son", how="left", validate="one_to_one")
    # Valida el formato PSAD56 antes de convertir o completar falsos Este/Norte.
    coordinate_format_ok = (
        merged["r_este"].map(_coordinate_text).str.match(LOCAL_EAST_REGEX) &
        merged["r_norte"].map(_coordinate_text).str.match(LOCAL_NORTH_REGEX) &
        merged["r_cota"].map(_coordinate_text).str.match(ELEVATION_REGEX)
    )
    discarded_ids = merged.loc[~coordinate_format_ok, "r_nro_son"].astype(str).tolist()
    merged = merged.loc[coordinate_format_ok].copy()

    for field in OUTPUT_FIELDS:
        if field not in merged:
            merged[field] = pd.NA
    for field in NUMERIC_FIELDS:
        merged[field] = pd.to_numeric(merged[field], errors="coerce")
    for field in DATE_FIELDS:
        merged[field] = pd.to_datetime(merged[field], dayfirst=True, errors="coerce")
    for field in TEXT_FIELDS:
        merged[field] = merged[field].astype("string").str.strip().replace("", pd.NA).str.slice(0, 255)

    # El libro conserva coordenadas locales PSAD56; completa el falso Este/Norte.
    merged.loc[merged["r_este"] < 300000, "r_este"] += 300000
    merged.loc[merged["r_norte"] < 1000000, "r_norte"] += 6400000
    valid_xyz = merged[["r_este", "r_norte", "r_cota"]].notna().all(axis=1)
    rejected = int((~valid_xyz).sum())
    if rejected:
        bad = merged.loc[~valid_xyz, "r_nro_son"].astype(str).tolist()
        raise ValueError(f"Hay {rejected} sondajes sin coordenadas XYZ: {bad[:10]}")

    metrics = {
        "consolidado": len(consolidated),
        "avance": len(advance),
        "coincidencias_avance": int(merged["av_programa"].notna().sum()),
        "descartados_geometria": len(discarded_ids),
        "sondajes_descartados": discarded_ids,
    }
    return merged[OUTPUT_FIELDS].copy(), metrics


def _add_output_fields(feature_class: str) -> None:
    for name, kind, length, alias in FIELD_DEFINITIONS:
        # Conserva en la salida temporal los mismos alias físicos de
        # Collar_Recomendado para que Pro y Experience Builder se vean iguales.
        target_alias = name if name.startswith(("r_fch_", "av_fch_")) else name.upper()
        kwargs = {"field_alias": target_alias}
        if length:
            kwargs["field_length"] = length
        arcpy.management.AddField(feature_class, name, kind, **kwargs)


def _value(value):
    if pd.isna(value):
        return None
    if isinstance(value, pd.Timestamp):
        return value.to_pydatetime()
    if isinstance(value, np.generic):
        return value.item()
    return value


def prepare_projected_rows(data: pd.DataFrame):
    """Convierte coordenadas en bloque y deja las filas listas para InsertCursor.

    Se usa exactamente PSAD56 -> WGS84 (16). Si pyproj no esta disponible o no
    expone esa operacion, se conserva el calculo ArcPy projectAs como respaldo.
    La cota se mantiene sin cambios, igual que en la herramienta Project usada
    previamente.
    """
    started = time.perf_counter()
    field_positions = {name: index for index, name in enumerate(OUTPUT_FIELDS)}
    east_position = field_positions["r_este"]
    north_position = field_positions["r_norte"]
    elevation_position = field_positions["r_cota"]
    values_rows = [list(values) for values in data[OUTPUT_FIELDS].itertuples(index=False, name=None)]
    engine = "arcpy_projectAs"
    transformed = None
    fallback_reason = None
    try:
        from pyproj import CRS
        from pyproj.transformer import TransformerGroup

        group = TransformerGroup(
            CRS.from_epsg(SOURCE_WKID), CRS.from_epsg(TARGET_WKID), always_xy=True
        )
        matches = [
            transformer for transformer in group.transformers
            if "PSAD56 to WGS 84 (16)" in transformer.description
        ]
        if len(matches) != 1:
            raise RuntimeError("No se encontro de forma univoca PSAD56 to WGS 84 (16).")
        east = np.asarray([row[east_position] for row in values_rows], dtype="float64")
        north = np.asarray([row[north_position] for row in values_rows], dtype="float64")
        transformed = matches[0].transform(east, north)
        engine = "pyproj_vectorial"
    except Exception as error:
        # La publicacion debe seguir siendo ejecutable en ambientes Server sin
        # pyproj o con una base EPSG diferente; ArcPy conserva el mismo datum.
        transformed = None
        fallback_reason = f"{type(error).__name__}: {error}"

    source = arcpy.SpatialReference(SOURCE_WKID)
    target = arcpy.SpatialReference(TARGET_WKID)
    prepared = []
    for index, values in enumerate(values_rows):
        z_value = float(values[elevation_position])
        if transformed is not None:
            x_value = float(transformed[0][index])
            y_value = float(transformed[1][index])
            geometry = arcpy.PointGeometry(
                arcpy.Point(x_value, y_value, z_value), target, has_z=True
            )
        else:
            source_geometry = arcpy.PointGeometry(
                arcpy.Point(values[east_position], values[north_position], z_value),
                source,
                has_z=True,
            )
            geometry = source_geometry.projectAs(target, TRANSFORMATION)
            point = geometry.firstPoint
            x_value, y_value = point.X, point.Y
        attributes = [_value(value) for value in values]
        attributes[east_position] = x_value
        attributes[north_position] = y_value
        attributes[elevation_position] = z_value
        prepared.append([geometry] + attributes)
    return prepared, {
        "motor_proyeccion": engine,
        "transformacion": TRANSFORMATION,
        "transformacion_wkid": TRANSFORMATION_WKID,
        "segundos": round(time.perf_counter() - started, 3),
        "motivo_respaldo": fallback_reason,
    }


def build_feature_class(
    data: pd.DataFrame,
    output_workspace: str,
    template_features: str = None,
    prepared_rows=None,
) -> str:
    """Proyecta cada fila en memoria e inserta una sola feature class WGS84."""
    suffix = uuid4().hex[:10]
    output_name = f"sondajes_resultado_{suffix}"
    output_fc = str(Path(output_workspace) / output_name)
    target = arcpy.SpatialReference(TARGET_WKID)

    selected_template = None
    for candidate in (template_features, PACKAGED_TEMPLATE):
        if candidate and arcpy.Exists(candidate):
            selected_template = candidate
            break
    template_available = selected_template is not None
    arcpy.management.CreateFeatureclass(
        output_workspace,
        output_name,
        "POINT",
        template=selected_template,
        has_m="DISABLED",
        has_z="ENABLED",
        spatial_reference=target,
    )
    if not template_available:
        # Respaldo para el modo de visualización cuando el destino compartido
        # no está accesible desde la cuenta de ArcGIS Server.
        _add_output_fields(output_fc)

    if prepared_rows is None:
        prepared_rows, _ = prepare_projected_rows(data)
    with arcpy.da.InsertCursor(output_fc, ["SHAPE@"] + OUTPUT_FIELDS) as cursor:
        for row in prepared_rows:
            cursor.insertRow(row)
    return output_fc


def replace_target_with_rows(prepared_rows, target_features: str) -> Dict[str, object]:
    """Reemplaza el destino directamente y restaura el respaldo ante una falla."""
    result = {
        "solicitado": True, "publicado": False,
        "estado": "destino_no_disponible", "destino": target_features, "registros": 0,
    }
    if not arcpy.Exists(target_features):
        return result
    description = arcpy.Describe(target_features)
    if description.shapeType.lower() != "point":
        raise ValueError("La feature class de destino no es de tipo punto.")
    if description.spatialReference.factoryCode != TARGET_WKID:
        raise ValueError(f"La feature class de destino usa WKID {description.spatialReference.factoryCode}; se esperaba {TARGET_WKID}.")
    target_names = {field.name.lower() for field in arcpy.ListFields(target_features)}
    missing = [field for field in OUTPUT_FIELDS if field.lower() not in target_names]
    if missing:
        raise ValueError(f"La feature class de destino no contiene: {', '.join(missing)}")
    if hasattr(arcpy, "TestSchemaLock") and not arcpy.TestSchemaLock(target_features):
        raise RuntimeError("Collar_Recomendado esta bloqueada por otro proceso o usuario.")

    backup = str(Path(arcpy.env.scratchGDB) / f"collar_backup_{uuid4().hex[:10]}")
    cursor_fields = ["SHAPE@"] + OUTPUT_FIELDS
    arcpy.management.CopyFeatures(target_features, backup)
    try:
        arcpy.management.TruncateTable(target_features)
        with arcpy.da.InsertCursor(target_features, cursor_fields) as writer:
            for row in prepared_rows:
                writer.insertRow(row)
        final_count = int(arcpy.management.GetCount(target_features)[0])
        if final_count != len(prepared_rows):
            raise RuntimeError(f"Validacion de carga fallida: esperados={len(prepared_rows)}, destino={final_count}.")
        result.update({"publicado": True, "estado": "publicado", "registros": final_count})
        return result
    except Exception:
        arcpy.management.TruncateTable(target_features)
        with arcpy.da.SearchCursor(backup, cursor_fields) as rows:
            with arcpy.da.InsertCursor(target_features, cursor_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
        raise
    finally:
        if arcpy.Exists(backup):
            arcpy.management.Delete(backup)


def replace_target_with_cursor(source_features: str, target_features: str) -> Dict[str, object]:
    """Reemplaza el destino con cursores y restaura el respaldo ante una falla."""
    result = {
        "solicitado": True,
        "publicado": False,
        "estado": "destino_no_disponible",
        "destino": target_features,
        "registros": 0,
    }
    if not arcpy.Exists(target_features):
        return result

    description = arcpy.Describe(target_features)
    if description.shapeType.lower() != "point":
        raise ValueError("La feature class de destino no es de tipo punto.")
    if description.spatialReference.factoryCode != TARGET_WKID:
        raise ValueError(
            f"La feature class de destino usa WKID "
            f"{description.spatialReference.factoryCode}; se esperaba {TARGET_WKID}."
        )

    target_names = {field.name.lower() for field in arcpy.ListFields(target_features)}
    missing = [field for field in OUTPUT_FIELDS if field.lower() not in target_names]
    if missing:
        raise ValueError(f"La feature class de destino no contiene: {', '.join(missing)}")

    backup = str(Path(arcpy.env.scratchGDB) / f"collar_backup_{uuid4().hex[:10]}")
    cursor_fields = ["SHAPE@"] + OUTPUT_FIELDS
    arcpy.management.CopyFeatures(target_features, backup)
    inserted = 0
    try:
        arcpy.management.TruncateTable(target_features)
        with arcpy.da.SearchCursor(source_features, cursor_fields) as rows:
            with arcpy.da.InsertCursor(target_features, cursor_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
                    inserted += 1

        expected = int(arcpy.management.GetCount(source_features)[0])
        final_count = int(arcpy.management.GetCount(target_features)[0])
        if inserted != expected or final_count != expected:
            raise RuntimeError(
                f"Validación de carga fallida: origen={expected}, insertados={inserted}, "
                f"destino={final_count}."
            )
        result.update({"publicado": True, "estado": "publicado", "registros": final_count})
        return result
    except Exception:
        arcpy.management.TruncateTable(target_features)
        with arcpy.da.SearchCursor(backup, cursor_fields) as rows:
            with arcpy.da.InsertCursor(target_features, cursor_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
        raise
    finally:
        if arcpy.Exists(backup):
            arcpy.management.Delete(backup)
