# -*- coding: utf-8 -*-
"""Lee las dos entradas reales del flujo de sondajes validado con el cliente."""

from pathlib import Path
import re
import time
from typing import Dict, Tuple

import pandas as pd

from excel_feature_builder import DATE_FIELDS, NUMERIC_FIELDS, OUTPUT_FIELDS, TEXT_FIELDS


LOCAL_EAST_REGEX = re.compile(r"^\d{5}(?:\.\d+)?$")
LOCAL_NORTH_REGEX = re.compile(r"^\d{5}(?:\.\d+)?$")
ELEVATION_REGEX = re.compile(r"^\d{4}(?:\.\d+)?$")

CONSOLIDADO_MAP = {
    "ID": "r_nomb_recom", "Tipo de Sondaje": "r_tiposondaje",
    "Sondaje": "r_nro_son", "Sector": "r_sector", "Este": "r_este",
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

COORDINATE_MAP = {
    "NRO_SON": "r_nro_son", "DES_CAMPANA": "q_des_campaña",
    "ANNO_SONDAJE": "q_año_sondaje", "DES_TIPO_PERF": "q_tipo_perf",
    "DES_ESTADO_SON": "q_estado_son", "ESTE": "q_este",
    "NORTE": "q_norte", "COTA": "q_cota",
}


def _validate_columns(frame: pd.DataFrame, mapping: Dict[str, str], source: str) -> None:
    missing = sorted(set(mapping) - set(frame.columns))
    if missing:
        raise ValueError(f"'{source}' no contiene: {', '.join(missing)}")


def _normalize_key(series: pd.Series) -> pd.Series:
    return series.astype("string").str.strip().str.upper().replace("", pd.NA)


def _coordinate_text(value) -> str:
    if pd.isna(value):
        return ""
    try:
        return f"{float(value):.10f}".rstrip("0").rstrip(".")
    except (TypeError, ValueError):
        return str(value).strip()


def _normalize_tricono(value):
    """Evita diferencias '60'/'60.0' entre motores para el campo texto."""
    if pd.isna(value) or str(value).strip() == "":
        return pd.NA
    try:
        return str(float(value))
    except (TypeError, ValueError):
        return str(value).strip()


def _read_coordinate_csv(path: str) -> pd.DataFrame:
    csv_path = Path(path).expanduser().resolve()
    if not csv_path.is_file() or csv_path.suffix.lower() != ".csv":
        raise ValueError("Seleccione un archivo SNDTGIS_ACQ válido con extensión .csv.")
    last_error = None
    for encoding in ("utf-8-sig", "latin1"):
        try:
            frame = pd.read_csv(csv_path, sep=None, engine="python", encoding=encoding)
            if len(frame.columns) > 1:
                return frame
        except Exception as error:
            last_error = error
    raise ValueError(f"No fue posible leer el CSV SNDTGIS_ACQ: {last_error}")


def _frame_from_header_row(raw: pd.DataFrame, required_columns, source: str) -> pd.DataFrame:
    """Ubica el encabezado real sin depender de una fila fija del libro."""
    required = set(required_columns)
    for row_number in range(min(50, len(raw))):
        values = [str(value).strip() if not pd.isna(value) else "" for value in raw.iloc[row_number]]
        if required.issubset(set(values)):
            frame = raw.iloc[row_number + 1:].copy()
            frame.columns = [value or f"__empty_{index}" for index, value in enumerate(values)]
            return frame.reset_index(drop=True)
    raise ValueError(f"No se encontró el encabezado requerido en {source}.")


def _read_workbook_sheets(workbook: Path):
    """Usa fastexcel cuando está disponible y conserva openpyxl como respaldo."""
    fast_error = None
    try:
        import fastexcel

        reader = fastexcel.read_excel(workbook)

        def fast_frame(sheet_name):
            sheet = reader.load_sheet(sheet_name, header_row=None)
            try:
                # Evita PyArrow: sus DLL pueden entrar en conflicto con las
                # bibliotecas ya cargadas por ArcGIS Pro o ArcGIS Server.
                import polars  # noqa: F401
                frame = sheet.to_polars()
                return pd.DataFrame(frame.to_dict(as_series=False))
            except ImportError:
                return sheet.to_pandas()
        missing_sheets = sorted(
            {"CONSOLIDADO_PROGRAMA", "AVANCE MUESTRERA"} - set(reader.sheet_names)
        )
        if missing_sheets:
            raise ValueError(f"El libro no contiene las hojas: {', '.join(missing_sheets)}")
        consolidated_raw = _frame_from_header_row(
            fast_frame("CONSOLIDADO_PROGRAMA"),
            CONSOLIDADO_MAP,
            "CONSOLIDADO_PROGRAMA",
        )
        advance_raw = _frame_from_header_row(
            fast_frame("AVANCE MUESTRERA"),
            AVANCE_MAP,
            "AVANCE MUESTRERA",
        )
        return consolidated_raw, advance_raw, "fastexcel", None
    except Exception as error:
        # Un libro con estructuras no soportadas por fastexcel no debe impedir
        # la ejecución del servicio. openpyxl conserva la compatibilidad total.
        fast_error = f"{type(error).__name__}: {error}"

    with pd.ExcelFile(workbook, engine="openpyxl") as excel:
        required = {"CONSOLIDADO_PROGRAMA", "AVANCE MUESTRERA"}
        missing_sheets = sorted(required - set(excel.sheet_names))
        if missing_sheets:
            raise ValueError(f"El libro no contiene las hojas: {', '.join(missing_sheets)}")
        consolidated_raw = _frame_from_header_row(
            pd.read_excel(excel, "CONSOLIDADO_PROGRAMA", header=None),
            CONSOLIDADO_MAP,
            "CONSOLIDADO_PROGRAMA",
        )
        advance_raw = _frame_from_header_row(
            pd.read_excel(excel, "AVANCE MUESTRERA", header=None),
            AVANCE_MAP,
            "AVANCE MUESTRERA",
        )
    return consolidated_raw, advance_raw, "openpyxl", fast_error


def read_source_inputs(workbook_path: str, coordinate_csv_path: str) -> Tuple[pd.DataFrame, Dict[str, object]]:
    """Replica las dos uniones y el reemplazo de coordenadas del notebook original."""
    workbook = Path(workbook_path).expanduser().resolve()
    if not workbook.is_file() or workbook.suffix.lower() != ".xlsx":
        raise ValueError("Seleccione un libro Excel válido con extensión .xlsx.")

    started = time.perf_counter()
    read_excel_started = time.perf_counter()
    consolidated_raw, advance_raw, excel_reader, excel_fallback_reason = _read_workbook_sheets(workbook)
    excel_seconds = time.perf_counter() - read_excel_started
    read_csv_started = time.perf_counter()
    coordinates_raw = _read_coordinate_csv(coordinate_csv_path)
    csv_seconds = time.perf_counter() - read_csv_started
    normalization_started = time.perf_counter()

    _validate_columns(consolidated_raw, CONSOLIDADO_MAP, "CONSOLIDADO_PROGRAMA")
    _validate_columns(advance_raw, AVANCE_MAP, "AVANCE MUESTRERA")
    _validate_columns(coordinates_raw, COORDINATE_MAP, "CSV SNDTGIS_ACQ")

    consolidated = consolidated_raw[list(CONSOLIDADO_MAP)].rename(columns=CONSOLIDADO_MAP).copy()
    advance = advance_raw[list(AVANCE_MAP)].rename(columns=AVANCE_MAP).copy()
    coordinates = coordinates_raw[list(COORDINATE_MAP)].rename(columns=COORDINATE_MAP).copy()
    for frame in (consolidated, advance, coordinates):
        frame["r_nro_son"] = _normalize_key(frame["r_nro_son"])
        frame.dropna(subset=["r_nro_son"], inplace=True)

    for frame, label in (
        (consolidated, "CONSOLIDADO_PROGRAMA"),
        (advance, "AVANCE MUESTRERA"),
        (coordinates, "CSV SNDTGIS_ACQ"),
    ):
        duplicates = frame.loc[frame["r_nro_son"].duplicated(), "r_nro_son"].tolist()
        if duplicates:
            raise ValueError(f"{label} contiene sondajes duplicados: {duplicates[:10]}")

    for field in ("q_este", "q_norte", "q_cota"):
        coordinates[field] = pd.to_numeric(coordinates[field], errors="coerce")

    merged = consolidated.merge(coordinates, on="r_nro_son", how="left", validate="one_to_one")
    replacements = merged[["q_este", "q_norte", "q_cota"]].notna().all(axis=1)
    merged.loc[replacements, "r_este"] = merged.loc[replacements, "q_este"]
    merged.loc[replacements, "r_norte"] = merged.loc[replacements, "q_norte"]
    merged.loc[replacements, "r_cota"] = merged.loc[replacements, "q_cota"]
    merged.drop(columns=["q_este", "q_norte", "q_cota"], inplace=True)
    merged = merged.merge(advance, on="r_nro_son", how="left", validate="one_to_one")

    format_ok = (
        merged["r_este"].map(_coordinate_text).str.match(LOCAL_EAST_REGEX) &
        merged["r_norte"].map(_coordinate_text).str.match(LOCAL_NORTH_REGEX) &
        merged["r_cota"].map(_coordinate_text).str.match(ELEVATION_REGEX)
    )
    discarded_ids = merged.loc[~format_ok, "r_nro_son"].astype(str).tolist()
    merged = merged.loc[format_ok].copy()

    for field in OUTPUT_FIELDS:
        if field not in merged:
            merged[field] = pd.NA
    for field in NUMERIC_FIELDS:
        merged[field] = pd.to_numeric(merged[field], errors="coerce")
    for field in DATE_FIELDS:
        merged[field] = pd.to_datetime(
            merged[field], format="mixed", dayfirst=True, errors="coerce"
        )
    for field in TEXT_FIELDS:
        merged[field] = merged[field].astype("string").str.strip().replace("", pd.NA).str.slice(0, 255)
    merged["av_tricono"] = merged["av_tricono"].map(_normalize_tricono).astype("string")

    # Regla de negocio: el tipo de perforación nunca se entrega nulo.
    # Aplica también a cadenas vacías o con solo espacios, normalizadas arriba.
    merged["q_tipo_perf"] = merged["q_tipo_perf"].fillna("Sin datos")

    merged.loc[merged["r_este"] < 300000, "r_este"] += 300000
    merged.loc[merged["r_norte"] < 1000000, "r_norte"] += 6400000
    valid_xyz = merged[["r_este", "r_norte", "r_cota"]].notna().all(axis=1)
    if not valid_xyz.all():
        bad = merged.loc[~valid_xyz, "r_nro_son"].astype(str).tolist()
        raise ValueError(f"Hay sondajes sin coordenadas XYZ: {bad[:10]}")

    metrics = {
        "consolidado": len(consolidated),
        "coordenadas_acq": len(coordinates),
        "coincidencias_coordenadas": int(replacements.sum()),
        "avance": len(advance),
        "coincidencias_avance": int(merged["av_programa"].notna().sum()),
        "descartados_geometria": len(discarded_ids),
        "sondajes_descartados": discarded_ids,
        "lector_excel": excel_reader,
        "motivo_respaldo_excel": excel_fallback_reason,
        "tiempos_segundos": {
            "lectura_excel": round(excel_seconds, 3),
            "lectura_csv": round(csv_seconds, 3),
            "normalizacion": round(time.perf_counter() - normalization_started, 3),
            "total_lectura_normalizacion": round(time.perf_counter() - started, 3),
        },
    }
    return merged[OUTPUT_FIELDS].copy(), metrics
