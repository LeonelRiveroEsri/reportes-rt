"""Lógica reutilizable para inspeccionar archivos Excel."""

from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Dict, List, Union

import pandas as pd


@dataclass(frozen=True)
class ExcelSummary:
    file_name: str
    sheet_name: str
    row_count: int
    column_count: int
    columns: List[str]

    def to_dict(self) -> Dict[str, Union[str, int, List[str]]]:
        return asdict(self)


def inspect_excel(file_path: str) -> ExcelSummary:
    """Carga la primera hoja de un .xlsx y devuelve un resumen básico."""
    path = Path(file_path).expanduser().resolve()

    if not path.exists() or not path.is_file():
        raise FileNotFoundError(f"No se encontró el archivo: {path}")
    if path.suffix.lower() != ".xlsx":
        raise ValueError("El archivo de entrada debe tener extensión .xlsx.")

    with pd.ExcelFile(path, engine="openpyxl") as workbook:
        if not workbook.sheet_names:
            raise ValueError("El archivo Excel no contiene hojas disponibles.")
        sheet_name = workbook.sheet_names[0]
        dataframe = pd.read_excel(workbook, sheet_name=sheet_name)

    return ExcelSummary(
        file_name=path.name,
        sheet_name=sheet_name,
        row_count=len(dataframe.index),
        column_count=len(dataframe.columns),
        columns=[str(column) for column in dataframe.columns],
    )
