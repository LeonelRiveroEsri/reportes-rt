# %% [markdown]
# # Validación y normalización de sondajes MLP
#
# **Objetivo.** Reproducir, de forma transparente y auditable, las etapas del
# notebook original del cliente utilizando únicamente dos entradas:
#
# 1. El libro Excel original, hojas `CONSOLIDADO_PROGRAMA` y `AVANCE MUESTRERA`.
# 2. El CSV corporativo de coordenadas `SNDTGIS_ACQ`.
#
# Este notebook **no trunca ni carga la geodatabase**, tampoco genera CSV
# intermedios. Las tablas de control permiten revisar reemplazos, descartes y
# normalizaciones antes de solicitar un ajuste en la GP Tool productiva.

# %% [markdown]
# ## 0. Parámetros de entrada
#
# Modifique solamente estas dos rutas. `EXPORTAR_INFORME_XLSX` es opcional y
# genera un libro Excel de auditoría; nunca altera los archivos originales.

# %%
from pathlib import Path

ARCHIVO_EXCEL = Path(r"D:\AMS_EXP\notebook\DB Avance Campaña de Perforación 2025-2030_0708.xlsx")
ARCHIVO_COORDENADAS = Path(r"D:\AMS_EXP\notebook\SONDAJE_MLP\SNDTGIS_ACQ_02-06-26.csv")
EXPORTAR_INFORME_XLSX = False
INFORME_XLSX = Path.cwd() / "Informe_validacion_sondajes.xlsx"

# %% [markdown]
# ## 1. Librerías, reglas y correspondencia de campos
#
# Se conservan los nombres del destino `Collar_Recomendado`. Las coordenadas
# locales PSAD56 deben tener cinco dígitos para Este/Norte y cuatro para Cota.

# %%
import re
import numpy as np
import pandas as pd
from IPython.display import display, Markdown

pd.set_option("display.max_columns", 100)
pd.set_option("display.max_rows", 100)

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
COORDENADAS_MAP = {
    "NRO_SON": "r_nro_son", "DES_CAMPANA": "q_des_campaña",
    "ANNO_SONDAJE": "q_año_sondaje", "DES_TIPO_PERF": "q_tipo_perf",
    "DES_ESTADO_SON": "q_estado_son", "ESTE": "q_este",
    "NORTE": "q_norte", "COTA": "q_cota",
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
FECHAS = ["r_fch_inicio", "r_fch_termino", "av_fch_ini", "av_fch_term"]
NUMERICOS = [
    "r_este", "r_norte", "r_cota", "r_azimut", "r_inclinacion", "r_largo",
    "r_por_perforar", "r_avance_actual", "r_mts_faltantes", "r_avance",
    "r_largo_final", "q_año_sondaje", "av_largo_program", "av_fondo_final",
    "av_faltante_perf", "av_pct_perforado", "av_mts_fotografia",
    "av_mts_corte", "av_mts_mapeo", "av_mts_preparacion",
]

def normalizar_clave(serie):
    return serie.astype("string").str.strip().str.upper().replace("", pd.NA)

def validar_columnas(df, mapping, origen):
    faltantes = sorted(set(mapping) - set(df.columns))
    if faltantes:
        raise ValueError(f"{origen}: faltan columnas: {', '.join(faltantes)}")

def leer_csv_coordenadas(ruta):
    ultimo_error = None
    for encoding in ("utf-8-sig", "latin1"):
        try:
            df = pd.read_csv(ruta, sep=None, engine="python", encoding=encoding)
            if len(df.columns) > 1:
                return df
        except Exception as error:
            ultimo_error = error
    raise ValueError(f"No fue posible leer SNDTGIS_ACQ: {ultimo_error}")

def texto_numero(valor):
    if pd.isna(valor):
        return ""
    try:
        return f"{float(valor):.10f}".rstrip("0").rstrip(".")
    except (TypeError, ValueError):
        return str(valor).strip()

# %% [markdown]
# ## 2. Lectura de las fuentes originales
#
# Corresponde a los tres DataFrames del notebook original, pero sin exportarlos
# a CSV: consolidado y avance provienen directamente del mismo libro Excel; las
# coordenadas provienen de `SNDTGIS_ACQ`.

# %%
if not ARCHIVO_EXCEL.is_file():
    raise FileNotFoundError(f"No existe el Excel: {ARCHIVO_EXCEL}")
if not ARCHIVO_COORDENADAS.is_file():
    raise FileNotFoundError(f"No existe el CSV de coordenadas: {ARCHIVO_COORDENADAS}")

with pd.ExcelFile(ARCHIVO_EXCEL, engine="openpyxl") as libro:
    hojas_requeridas = {"CONSOLIDADO_PROGRAMA", "AVANCE MUESTRERA"}
    faltantes = hojas_requeridas - set(libro.sheet_names)
    if faltantes:
        raise ValueError(f"Faltan hojas: {', '.join(sorted(faltantes))}")
    consolidado_raw = pd.read_excel(libro, "CONSOLIDADO_PROGRAMA", header=3)
    avance_raw = pd.read_excel(libro, "AVANCE MUESTRERA", header=1)
coordenadas_raw = leer_csv_coordenadas(ARCHIVO_COORDENADAS)

display(pd.DataFrame({
    "Fuente": ["CONSOLIDADO_PROGRAMA", "SNDTGIS_ACQ", "AVANCE MUESTRERA"],
    "Registros leídos": [len(consolidado_raw), len(coordenadas_raw), len(avance_raw)],
    "Columnas": [len(consolidado_raw.columns), len(coordenadas_raw.columns), len(avance_raw.columns)],
}))

# %% [markdown]
# ## 3. Validación de esquemas y claves
#
# Se eliminan únicamente filas auxiliares sin número de sondaje. Las claves se
# comparan sin espacios laterales y en mayúsculas. Los duplicados detienen la
# ejecución para evitar uniones ambiguas.

# %%
validar_columnas(consolidado_raw, CONSOLIDADO_MAP, "CONSOLIDADO_PROGRAMA")
validar_columnas(coordenadas_raw, COORDENADAS_MAP, "SNDTGIS_ACQ")
validar_columnas(avance_raw, AVANCE_MAP, "AVANCE MUESTRERA")

consolidado = consolidado_raw[list(CONSOLIDADO_MAP)].rename(columns=CONSOLIDADO_MAP).copy()
coordenadas = coordenadas_raw[list(COORDENADAS_MAP)].rename(columns=COORDENADAS_MAP).copy()
avance = avance_raw[list(AVANCE_MAP)].rename(columns=AVANCE_MAP).copy()

for df in (consolidado, coordenadas, avance):
    df["r_nro_son"] = normalizar_clave(df["r_nro_son"])
    df.dropna(subset=["r_nro_son"], inplace=True)

for nombre, df in (("Consolidado", consolidado), ("Coordenadas", coordenadas), ("Avance", avance)):
    duplicados = df.loc[df["r_nro_son"].duplicated(False), "r_nro_son"]
    if not duplicados.empty:
        raise ValueError(f"{nombre}: claves duplicadas: {duplicados.unique()[:20].tolist()}")

display(Markdown("✅ **Esquemas y claves validados sin duplicados.**"))

# %% [markdown]
# ## 4. Normalización de coordenadas
#
# Se conserva el valor original del consolidado para auditoría. Este, Norte y
# Cota se reemplazan **solo cuando los tres valores de SNDTGIS_ACQ están
# presentes** para el mismo sondaje.

# %%
for campo in ("q_este", "q_norte", "q_cota"):
    coordenadas[campo] = pd.to_numeric(coordenadas[campo], errors="coerce")

unido = consolidado.merge(coordenadas, on="r_nro_son", how="left", validate="one_to_one")
for campo in ("r_este", "r_norte", "r_cota"):
    unido[f"{campo}_original"] = unido[campo]

reemplazar = unido[["q_este", "q_norte", "q_cota"]].notna().all(axis=1)
unido.loc[reemplazar, ["r_este", "r_norte", "r_cota"]] = unido.loc[
    reemplazar, ["q_este", "q_norte", "q_cota"]
].to_numpy()
unido["auditoria_coordenada"] = np.where(reemplazar, "Reemplazada desde SNDTGIS_ACQ", "Conservada desde Excel")

auditoria_coordenadas = unido[[
    "r_nro_son", "r_este_original", "r_norte_original", "r_cota_original",
    "q_este", "q_norte", "q_cota", "r_este", "r_norte", "r_cota",
    "auditoria_coordenada",
]].copy()
display(unido["auditoria_coordenada"].value_counts().rename_axis("Resultado").to_frame("Registros"))
display(auditoria_coordenadas.head(10))

# %% [markdown]
# ## 5. Incorporación del avance de muestrera
#
# La unión es por sondaje y conserva todos los registros del consolidado. Se
# reportan expresamente los sondajes sin coincidencia de avance.

# %%
unido.drop(columns=["q_este", "q_norte", "q_cota"], inplace=True)
resultado = unido.merge(avance, on="r_nro_son", how="left", validate="one_to_one")
sin_avance = resultado.loc[resultado["av_programa"].isna(), ["r_nro_son", "r_sector"]].copy()

display(pd.DataFrame({
    "Indicador": ["Registros consolidados", "Con coincidencia de avance", "Sin coincidencia de avance"],
    "Cantidad": [len(resultado), int(resultado["av_programa"].notna().sum()), len(sin_avance)],
}))
if not sin_avance.empty:
    display(sin_avance)

# %% [markdown]
# ## 6. Control de geometría PSAD56
#
# Antes de completar los falsos Este/Norte se aplica la misma regla de formato
# de la GP Tool. Los casos inválidos se separan para revisión; no desaparecen
# silenciosamente del informe.

# %%
este_ok = resultado["r_este"].map(texto_numero).str.match(r"^\d{5}(?:\.\d+)?$")
norte_ok = resultado["r_norte"].map(texto_numero).str.match(r"^\d{5}(?:\.\d+)?$")
cota_ok = resultado["r_cota"].map(texto_numero).str.match(r"^\d{4}(?:\.\d+)?$")
resultado["geometria_valida"] = este_ok & norte_ok & cota_ok
resultado["motivo_geometria"] = ""
resultado.loc[~este_ok, "motivo_geometria"] += "Este inválido; "
resultado.loc[~norte_ok, "motivo_geometria"] += "Norte inválido; "
resultado.loc[~cota_ok, "motivo_geometria"] += "Cota inválida; "

descartados_geometria = resultado.loc[~resultado["geometria_valida"], [
    "r_nro_son", "r_este", "r_norte", "r_cota", "auditoria_coordenada", "motivo_geometria"
]].copy()
resultado_final = resultado.loc[resultado["geometria_valida"]].copy()
resultado_final["r_este"] = pd.to_numeric(resultado_final["r_este"], errors="coerce")
resultado_final["r_norte"] = pd.to_numeric(resultado_final["r_norte"], errors="coerce")
resultado_final.loc[resultado_final["r_este"] < 300000, "r_este"] += 300000
resultado_final.loc[resultado_final["r_norte"] < 1000000, "r_norte"] += 6400000

display(pd.DataFrame({"Geometrías válidas": [len(resultado_final)], "Casos para revisar": [len(descartados_geometria)]}))
if not descartados_geometria.empty:
    display(descartados_geometria)

# %% [markdown]
# ## 7. Tipificación y reglas de normalización
#
# - Fechas se convierten sin modificar el archivo original.
# - Valores numéricos no interpretables quedan nulos y se informan.
# - `q_tipo_perf` nulo, vacío o compuesto por espacios se normaliza como
#   **Sin datos**, conforme a la regla vigente de la GP Tool.

# %%
errores_numericos_lista = []
errores_fechas_lista = []
for campo in NUMERICOS:
    if campo in resultado_final:
        original = resultado_final[campo].copy()
        convertido = pd.to_numeric(original, errors="coerce")
        informado = original.notna() & original.astype("string").str.strip().ne("")
        fallido = informado & convertido.isna()
        if fallido.any():
            casos = resultado_final.loc[fallido, ["r_nro_son"]].copy()
            casos["campo"] = campo
            casos["valor_original"] = original.loc[fallido]
            errores_numericos_lista.append(casos)
        resultado_final[campo] = convertido
for campo in FECHAS:
    original = resultado_final[campo].copy()
    convertido = pd.to_datetime(original, dayfirst=True, errors="coerce")
    informado = original.notna() & original.astype("string").str.strip().ne("")
    fallido = informado & convertido.isna()
    if fallido.any():
        casos = resultado_final.loc[fallido, ["r_nro_son"]].copy()
        casos["campo"] = campo
        casos["valor_original"] = original.loc[fallido]
        errores_fechas_lista.append(casos)
    resultado_final[campo] = convertido

errores_numericos = pd.concat(errores_numericos_lista, ignore_index=True) if errores_numericos_lista else pd.DataFrame(columns=["r_nro_son", "campo", "valor_original"])
errores_fechas = pd.concat(errores_fechas_lista, ignore_index=True) if errores_fechas_lista else pd.DataFrame(columns=["r_nro_son", "campo", "valor_original"])

q_tipo_original = resultado_final["q_tipo_perf"].copy()
resultado_final["q_tipo_perf"] = (
    resultado_final["q_tipo_perf"].astype("string").str.strip().replace("", pd.NA).fillna("Sin datos")
)
normalizados_tipo = resultado_final.loc[q_tipo_original.isna() | q_tipo_original.astype("string").str.strip().eq(""), [
    "r_nro_son", "q_tipo_perf"
]].copy()

display(pd.DataFrame({
    "Regla": ["q_tipo_perf a Sin datos", "Fechas no interpretables", "Numéricos no interpretables"],
    "Casos": [len(normalizados_tipo), len(errores_fechas), len(errores_numericos)],
}))
if not normalizados_tipo.empty:
    display(normalizados_tipo)
if not errores_fechas.empty:
    display(Markdown("### Fechas informadas que no pudieron interpretarse"))
    display(errores_fechas)
if not errores_numericos.empty:
    display(Markdown("### Valores informados que no pudieron convertirse a número"))
    display(errores_numericos)

# %% [markdown]
# ## 8. Resultado final y control para devolución
#
# Revise especialmente las tablas `auditoria_coordenadas`,
# `descartados_geometria`, `sin_avance` y `normalizados_tipo`. Si una regla debe
# cambiar, documente el sondaje, valor recibido, valor esperado y justificación.

# %%
columnas_tecnicas = [c for c in resultado_final.columns if not c.endswith("_original") and c not in {
    "auditoria_coordenada", "geometria_valida", "motivo_geometria"
}]
resultado_entrega = resultado_final[columnas_tecnicas].copy()

resumen = pd.DataFrame({
    "Indicador": [
        "Registros del consolidado", "Coordenadas reemplazadas", "Coincidencias de avance",
        "Descartados por geometría", "Resultado final", "q_tipo_perf normalizados",
    ],
    "Cantidad": [
        len(consolidado), int(reemplazar.sum()), int(resultado["av_programa"].notna().sum()),
        len(descartados_geometria), len(resultado_entrega), len(normalizados_tipo),
    ],
})
display(resumen)
display(resultado_entrega.head(20))

# %% [markdown]
# ## 9. Informe opcional de auditoría en Excel
#
# Active `EXPORTAR_INFORME_XLSX` en la sección de parámetros para obtener un
# único libro con el resultado y todos los controles. No se generan CSV ni se
# escribe en la geodatabase.

# %%
if EXPORTAR_INFORME_XLSX:
    with pd.ExcelWriter(INFORME_XLSX, engine="openpyxl") as writer:
        resumen.to_excel(writer, sheet_name="Resumen", index=False)
        resultado_entrega.to_excel(writer, sheet_name="Resultado", index=False)
        auditoria_coordenadas.to_excel(writer, sheet_name="Auditoria_coordenadas", index=False)
        descartados_geometria.to_excel(writer, sheet_name="Geometrias_revisar", index=False)
        sin_avance.to_excel(writer, sheet_name="Sin_avance", index=False)
        normalizados_tipo.to_excel(writer, sheet_name="Tipo_perf_normalizado", index=False)
        errores_fechas.to_excel(writer, sheet_name="Errores_fechas", index=False)
        errores_numericos.to_excel(writer, sheet_name="Errores_numericos", index=False)
    display(Markdown(f"✅ Informe creado: `{INFORME_XLSX}`"))
else:
    display(Markdown("ℹ️ Exportación desactivada. La revisión permanece únicamente en memoria."))

# %% [markdown]
# ## Formato sugerido para solicitar un ajuste
#
# | Sondaje | Etapa | Valor recibido | Valor esperado | Justificación |
# |---|---|---|---|---|
# | Ejemplo | Coordenadas / avance / tipificación | ... | ... | ... |
#
# Con esta información se puede modificar y probar la GP Tool sin alterar las
# fuentes originales ni introducir transformaciones manuales no documentadas.
