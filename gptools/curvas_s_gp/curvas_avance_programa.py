# -*- coding: utf-8 -*-
"""Prototipo de Curvas S desde AVANCE PROGRAMA del libro de sondajes."""

from pathlib import Path
import re
import unicodedata

import pandas as pd


CATEGORY_MAP = {
    "GEOLOGIA": "GEOLOGÍA",
    "LAS TIGRESAS": "LAS TIGRESAS",
    "EVU": "EVU",
    "GEOTECNICO": "GEOTÉCNICO",
    "HIDROGEOLOGICO DDH": "HIDROGEOLÓGICO DDH",
    "HIDROGEOLOGICO AR": "HIDROGEOLÓGICO AR",
}

METRIC_MAP = {
    "PLAN": "PLAN",
    "REAL MENSUAL": "REAL_MENSUAL",
    "ACUMULADO PLAN": "PRESUPUESTO",
    "ACUMULADO REAL": "REAL",
}

MONTH_NAMES = {
    1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun",
    7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic",
}


def _key(value):
    if pd.isna(value):
        return ""
    text = unicodedata.normalize("NFKD", str(value))
    text = "".join(char for char in text if not unicodedata.combining(char))
    return re.sub(r"\s+", " ", text.strip()).upper()


def _load_sheet(path, sheet="AVANCE PROGRAMA"):
    try:
        import fastexcel
        reader = fastexcel.read_excel(path)
        if sheet not in reader.sheet_names:
            raise ValueError(f"El libro no contiene la hoja {sheet}.")
        return reader.load_sheet(sheet).to_pandas(), "fastexcel"
    except ValueError:
        raise
    except Exception:
        with pd.ExcelFile(path, engine="openpyxl") as book:
            if sheet not in book.sheet_names:
                raise ValueError(f"El libro no contiene la hoja {sheet}.")
            return pd.read_excel(book, sheet_name=sheet, header=None), "openpyxl"


def _find_headers(raw):
    for category_row in range(min(50, len(raw) - 1)):
        first = _key(raw.iat[category_row, 0]) if raw.shape[1] else ""
        metrics = {_key(value) for value in raw.iloc[category_row + 1].tolist()}
        if first == "PROGRAMA" and set(METRIC_MAP).issubset(metrics):
            return category_row, category_row + 1
    raise ValueError("No se reconocieron los encabezados de AVANCE PROGRAMA.")


def _parse_date(value):
    if pd.isna(value):
        return pd.NaT
    if isinstance(value, (pd.Timestamp,)):
        return value.normalize()
    text = str(value).strip()
    if re.match(r"^\d{4}[-/]\d{1,2}[-/]\d{1,2}", text):
        return pd.to_datetime(text, errors="coerce", yearfirst=True)
    return pd.to_datetime(text, errors="coerce", dayfirst=True)


def read_avance_programa(path):
    workbook = Path(path).expanduser().resolve()
    if not workbook.is_file() or workbook.suffix.lower() != ".xlsx":
        raise ValueError("Seleccione un libro Excel valido con extension .xlsx.")

    raw, engine = _load_sheet(workbook)
    category_row, metric_row = _find_headers(raw)
    categories = pd.Series(raw.iloc[category_row].tolist()).ffill().map(_key)
    metrics = [_key(value) for value in raw.iloc[metric_row].tolist()]
    dates = raw.iloc[metric_row + 1:, 0].map(_parse_date)
    valid_rows = dates.notna()
    dates = dates.loc[valid_rows]

    records = []
    found_original = set()
    for column in range(1, raw.shape[1]):
        category = categories.iat[column]
        metric = metrics[column]
        if category not in CATEGORY_MAP or metric not in METRIC_MAP:
            continue
        found_original.add(category)
        values = pd.to_numeric(raw.iloc[metric_row + 1:, column], errors="coerce").loc[valid_rows]
        for date, value in zip(dates, values):
            records.append({
                "TIPO_ORIGEN": category,
                "TIPO": CATEGORY_MAP[category],
                "FECHA": pd.Timestamp(date).normalize(),
                "AÑO": int(date.year),
                "MES": MONTH_NAMES[int(date.month)],
                "METRICA": METRIC_MAP[metric],
                "VALOR": value,
            })

    missing = sorted(set(CATEGORY_MAP) - found_original)
    if missing:
        raise ValueError("Faltan categorias requeridas: " + ", ".join(missing))

    long = pd.DataFrame(records)
    raw_categories = (
        long.pivot_table(
            index=["TIPO_ORIGEN", "TIPO", "FECHA"],
            columns="METRICA", values="VALOR", aggfunc="first",
        ).reset_index()
    )
    raw_categories["AÑO"] = raw_categories["FECHA"].dt.year.astype(int)
    raw_categories["MES"] = raw_categories["FECHA"].dt.month.map(MONTH_NAMES)

    def sum_nullable(series):
        return series.sum(min_count=1)

    normalized = (
        raw_categories.groupby(["TIPO", "FECHA", "AÑO", "MES"], as_index=False, sort=True)
        .agg({name: sum_nullable for name in METRIC_MAP.values()})
    )
    all_dates = sorted(dates.drop_duplicates())
    all_types = sorted(set(CATEGORY_MAP.values()))
    grid = pd.MultiIndex.from_product([all_types, all_dates], names=["TIPO", "FECHA"]).to_frame(index=False)
    normalized = grid.merge(
        normalized.drop(columns=["AÑO", "MES"]), on=["TIPO", "FECHA"], how="left"
    )
    normalized["AÑO"] = normalized["FECHA"].dt.year.astype(int)
    normalized["MES"] = normalized["FECHA"].dt.month.map(MONTH_NAMES)
    normalized = normalized[["TIPO", "FECHA", "AÑO", "MES"] + list(METRIC_MAP.values())]
    normalized = normalized.sort_values(["FECHA", "TIPO"]).reset_index(drop=True)
    return normalized, raw_categories, {
        "lector_excel": engine,
        "hoja": "AVANCE PROGRAMA",
        "fila_categorias": category_row + 1,
        "fila_metricas": metric_row + 1,
        "fecha_minima": dates.min().date().isoformat(),
        "fecha_maxima": dates.max().date().isoformat(),
        "meses": int(dates.nunique()),
        "categorias_origen": sorted(found_original),
        "categorias_detectadas": sorted(normalized["TIPO"].unique()),
        "registros_generados": len(normalized),
    }


if __name__ == "__main__":
    import argparse
    import json

    parser = argparse.ArgumentParser()
    parser.add_argument("excel")
    parser.add_argument("--csv")
    args = parser.parse_args()
    result, source, metrics = read_avance_programa(args.excel)
    print(json.dumps(metrics, ensure_ascii=False, indent=2))
    print(result.head(12).to_string(index=False))
    if args.csv:
        result.to_csv(args.csv, index=False, encoding="utf-8-sig")
