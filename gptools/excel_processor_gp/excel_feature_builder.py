"""Convierte el libro maestro de sondajes en una feature class temporal."""

from pathlib import Path
import re
from typing import Dict, Tuple
from uuid import uuid4

import arcpy
import numpy as np
import pandas as pd


SOURCE_WKID = 24879
TARGET_WKID = 32719
TRANSFORMATION = "PSAD_1956_To_WGS_1984_16"
TRANSFORMATION_WKID = 6972
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
        kwargs = {"field_alias": alias}
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


def build_feature_class(data: pd.DataFrame, output_workspace: str) -> str:
    """Crea puntos PSAD56, usa Project y devuelve la feature class WGS84 temporal."""
    suffix = uuid4().hex[:10]
    psad_name = f"sondajes_psad_{suffix}"
    output_name = f"sondajes_resultado_{suffix}"
    psad_fc = str(Path(output_workspace) / psad_name)
    output_fc = str(Path(output_workspace) / output_name)
    source = arcpy.SpatialReference(SOURCE_WKID)
    target = arcpy.SpatialReference(TARGET_WKID)

    arcpy.management.CreateFeatureclass(
        output_workspace, psad_name, "POINT", has_m="DISABLED", has_z="ENABLED",
        spatial_reference=source,
    )
    _add_output_fields(psad_fc)
    with arcpy.da.InsertCursor(psad_fc, ["SHAPE@XYZ"] + OUTPUT_FIELDS) as cursor:
        for _, record in data.iterrows():
            xyz = (record["r_este"], record["r_norte"], record["r_cota"])
            cursor.insertRow([xyz] + [_value(record[field]) for field in OUTPUT_FIELDS])

    arcpy.management.Project(psad_fc, output_fc, target, TRANSFORMATION)
    # Sincroniza atributos X/Y con la geometría reproyectada para las ventanas emergentes.
    with arcpy.da.UpdateCursor(output_fc, ["r_este", "r_norte", "r_cota", "SHAPE@XYZ"]) as cursor:
        for _, _, _, xyz in cursor:
            cursor.updateRow([xyz[0], xyz[1], xyz[2], xyz])
    arcpy.management.Delete(psad_fc)
    return output_fc
