import sys
import tempfile
import unittest
from pathlib import Path

import pandas as pd


PROJECT_DIRECTORY = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_DIRECTORY))

from source_reader import read_source_inputs


class SourceReaderTests(unittest.TestCase):
    def test_replaces_coordinates_from_acq(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            root = Path(temporary_directory)
            excel = root / "entrada.xlsx"
            csv = root / "SNDTGIS_ACQ.csv"
            consolidated = pd.DataFrame({
                "ID": ["REC-1"], "Tipo de Sondaje": ["DDH"], "Sondaje": ["DDH4161"],
                "Sector": ["Sector"], "Este": [58564], "Norte": [8986], "Cota": [3125],
                "Azimut": [0], "Inclinación": [-90], "Largo (m)": [100],
                "Fecha Inicio": ["01-01-2026"], "Fecha Termino": ["02-01-2026"],
                "Por Perforar (m)": [100], "Avance Actual (m)": [50],
                "Mts. Faltantes": [50], "%Avance": [50],
                "Estatus Perforación (m)": ["En avance"], "Largo Final (m)": [50],
                "Certificado Collar": [""], "Observación": [""],
            })
            advance = pd.DataFrame({
                "Sondaje": ["DDH4161"], "Programa": ["CAT"], "Sonda": ["S1"],
                "Inicio": ["01-01-2026"], "Término": ["02-01-2026"],
                "Largo Programado": [100], "Fondo Final": [50], "Faltante": [50],
                "% Perforado": [50], "Tricono": [0], "Fotografía": [10],
                "Corte": [10], "Hasta3": [10], "Hasta2": [10],
            })
            with pd.ExcelWriter(excel, engine="openpyxl") as writer:
                consolidated.to_excel(writer, sheet_name="CONSOLIDADO_PROGRAMA", startrow=3, index=False)
                advance.to_excel(writer, sheet_name="AVANCE MUESTRERA", startrow=1, index=False)
            pd.DataFrame({
                "NRO_SON": ["DDH4161"], "DES_CAMPANA": ["2025-2030"],
                "ANNO_SONDAJE": [2026], "DES_TIPO_PERF": ["DD"],
                "DES_ESTADO_SON": ["FIN"], "ESTE": [58559.39],
                "NORTE": [89865.22], "COTA": [3124.97],
            }).to_csv(csv, sep=";", index=False, encoding="latin1")

            result, metrics = read_source_inputs(str(excel), str(csv))

            self.assertEqual(len(result), 1)
            self.assertAlmostEqual(result.iloc[0]["r_este"], 358559.39)
            self.assertAlmostEqual(result.iloc[0]["r_norte"], 6489865.22)
            self.assertEqual(metrics["coincidencias_coordenadas"], 1)
            self.assertEqual(metrics["descartados_geometria"], 0)


if __name__ == "__main__":
    unittest.main()
