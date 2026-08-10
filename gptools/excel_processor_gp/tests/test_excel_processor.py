import sys
import tempfile
import unittest
from pathlib import Path

import pandas as pd


PROJECT_DIRECTORY = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_DIRECTORY))

from excel_processor import inspect_excel


class InspectExcelTests(unittest.TestCase):
    def test_counts_data_rows_from_first_sheet(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            excel_path = Path(temporary_directory) / "entrada.xlsx"
            expected = pd.DataFrame(
                {
                    "folio": [101, 102, 103],
                    "estado": ["Nuevo", "Procesado", "Nuevo"],
                }
            )
            expected.to_excel(excel_path, index=False, sheet_name="Datos")

            result = inspect_excel(str(excel_path))

            self.assertEqual(result.row_count, 3)
            self.assertEqual(result.column_count, 2)
            self.assertEqual(result.sheet_name, "Datos")
            self.assertEqual(result.columns, ["folio", "estado"])

    def test_rejects_non_xlsx_file(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            csv_path = Path(temporary_directory) / "entrada.csv"
            csv_path.write_text("folio\n1\n", encoding="utf-8")

            with self.assertRaisesRegex(ValueError, "extensión .xlsx"):
                inspect_excel(str(csv_path))


if __name__ == "__main__":
    unittest.main()
