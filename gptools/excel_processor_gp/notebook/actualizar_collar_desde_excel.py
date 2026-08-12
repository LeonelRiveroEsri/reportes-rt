# -*- coding: utf-8 -*-
"""Actualiza Collar_Recomendado desde Excel + coordenadas SNDTGIS_ACQ."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any, Dict

import arcpy


PROJECT_ROOT = Path(__file__).resolve().parents[2]
GP_MODULE_DIR = PROJECT_ROOT / "excel_processor_gp"
if str(GP_MODULE_DIR) not in sys.path:
    sys.path.insert(0, str(GP_MODULE_DIR))

from excel_feature_builder import (  # noqa: E402
    OUTPUT_FIELDS,
    TARGET_WKID,
    TRANSFORMATION,
    build_feature_class,
    replace_target_with_cursor,
)
from source_reader import read_source_inputs  # noqa: E402


def _validate_target(target: str) -> None:
    if not arcpy.Exists(target):
        raise FileNotFoundError(f"No existe la feature class de destino: {target}")
    description = arcpy.Describe(target)
    if description.shapeType.lower() != "point":
        raise ValueError("El destino debe ser una feature class de puntos.")
    if description.spatialReference.factoryCode != TARGET_WKID:
        raise ValueError(
            f"El destino usa WKID {description.spatialReference.factoryCode}; "
            f"se esperaba {TARGET_WKID}."
        )
    target_fields = {field.name.lower() for field in arcpy.ListFields(target)}
    missing = [name for name in OUTPUT_FIELDS if name.lower() not in target_fields]
    if missing:
        raise ValueError(f"Faltan campos en el destino: {', '.join(missing)}")


def actualizar_desde_excel(
    excel: str,
    coordenadas_csv: str,
    target: str,
    ejecutar: bool = False,
) -> Dict[str, Any]:
    """Procesa las dos entradas y opcionalmente reemplaza completamente el destino."""
    excel_path = Path(excel).resolve()
    coordinate_path = Path(coordenadas_csv).resolve()
    target_path = str(Path(target).resolve())
    if not excel_path.is_file() or excel_path.suffix.lower() != ".xlsx":
        raise FileNotFoundError(f"Excel de entrada inválido: {excel_path}")
    if not coordinate_path.is_file() or coordinate_path.suffix.lower() != ".csv":
        raise FileNotFoundError(f"CSV SNDTGIS_ACQ inválido: {coordinate_path}")

    _validate_target(target_path)
    previous_count = int(arcpy.management.GetCount(target_path)[0])
    data, metrics = read_source_inputs(str(excel_path), str(coordinate_path))
    if data.empty:
        raise ValueError("Las entradas no produjeron registros válidos; no se truncará el destino.")

    temporary_features = build_feature_class(data, arcpy.env.scratchGDB)
    processed_count = int(arcpy.management.GetCount(temporary_features)[0])
    if processed_count != len(data):
        arcpy.management.Delete(temporary_features)
        raise RuntimeError(
            f"La capa temporal contiene {processed_count} puntos, pero se esperaban {len(data)}."
        )

    report: Dict[str, Any] = {
        "excel": str(excel_path),
        "coordenadas_csv": str(coordinate_path),
        "destino": target_path,
        "registros_anteriores": previous_count,
        "registros_procesados": processed_count,
        "registros_finales": previous_count,
        "wkid_destino": TARGET_WKID,
        "transformacion": TRANSFORMATION,
        "metricas": metrics,
        "ejecutado": False,
    }
    if not ejecutar:
        arcpy.management.Delete(temporary_features)
        return report

    try:
        publication = replace_target_with_cursor(temporary_features, target_path)
        report["registros_finales"] = publication["registros"]
        report["ejecutado"] = publication["publicado"]
    finally:
        if arcpy.Exists(temporary_features):
            arcpy.management.Delete(temporary_features)
    return report
