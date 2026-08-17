# -*- coding: utf-8 -*-
"""Lectura autocontenida de Curvas S desde la hoja AVANCE PROGRAMA."""

from pathlib import Path
import re
import unicodedata

import pandas as pd


CATEGORY_LABELS = {
    "GEOLOGIA": "GEOLOGÍA",
    "LAS TIGRESAS": "LAS TIGRESAS",
    "EVU": "EVU",
    "GEOTECNICO": "GEOTÉCNICO",
    "HIDROGEOLOGICO DDH": "HIDROGEOLÓGICO DDH",
    "HIDROGEOLOGICO AR": "HIDROGEOLÓGICO AR",
}
METRICS = {"ACUMULADO PLAN": "PRESUPUESTO", "ACUMULADO REAL": "REAL"}
MONTHS = {1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun",
          7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"}
OUTPUT_FIELDS = ["TIPO", "FECHA", "AÑO", "MES", "PRESUPUESTO", "REAL"]


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


def _find_headers(raw):
    for category_row in range(min(50, len(raw) - 1)):
        metrics = {_key(value) for value in raw.iloc[category_row + 1].tolist()}
        if _key(raw.iat[category_row, 0]) == "PROGRAMA" and set(METRICS).issubset(metrics):
            return category_row, category_row + 1
    raise ValueError("No se reconocieron los encabezados de AVANCE PROGRAMA.")


def _parse_date(value):
    if pd.isna(value):
        return pd.NaT
    if isinstance(value, pd.Timestamp):
        return value.normalize()
    text = str(value).strip()
    if re.match(r"^\d{4}[-/]\d{1,2}[-/]\d{1,2}", text):
        return pd.to_datetime(text, errors="coerce", yearfirst=True)
    return pd.to_datetime(text, errors="coerce", dayfirst=True)


def read_curvas(path):
    workbook = Path(path).expanduser().resolve()
    if not workbook.is_file() or workbook.suffix.lower() != ".xlsx":
        raise ValueError("Seleccione un libro Excel valido con extension .xlsx.")

    raw, reader = _load_sheet(workbook)
    category_row, metric_row = _find_headers(raw)
    categories = pd.Series(raw.iloc[category_row].tolist()).ffill().map(_key)
    metrics = [_key(value) for value in raw.iloc[metric_row].tolist()]
    dates = raw.iloc[metric_row + 1:, 0].map(_parse_date)
    valid = dates.notna()
    dates = dates.loc[valid]

    records = []
    found = set()
    for column in range(1, raw.shape[1]):
        category = categories.iat[column]
        metric = metrics[column]
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
        index=["TIPO", "FECHA", "AÑO", "MES"], columns="METRICA",
        values="VALOR", aggfunc="first",
    ).reset_index()
    grid = pd.MultiIndex.from_product(
        [sorted(CATEGORY_LABELS[value] for value in found), sorted(dates.drop_duplicates())],
        names=["TIPO", "FECHA"],
    ).to_frame(index=False)
    result = grid.merge(result.drop(columns=["AÑO", "MES"]), on=["TIPO", "FECHA"], how="left")
    result["AÑO"] = result["FECHA"].dt.year.astype(int)
    result["MES"] = result["FECHA"].dt.month.map(MONTHS)
    result = result.reindex(columns=OUTPUT_FIELDS).sort_values(["FECHA", "TIPO"]).reset_index(drop=True)
    return result, {
        "lector_excel": reader, "hoja": "AVANCE PROGRAMA",
        "categorias": sorted(result["TIPO"].unique().tolist()),
        "anios": sorted(int(value) for value in result["AÑO"].unique()),
        "fecha_minima": dates.min().date().isoformat(),
        "fecha_maxima": dates.max().date().isoformat(),
        "registros": int(len(result)),
    }
