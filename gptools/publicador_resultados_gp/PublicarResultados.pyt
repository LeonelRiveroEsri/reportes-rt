# -*- coding: utf-8 -*-
"""Publica resultados ya procesados de Sondajes o Curvas S."""

import json
import os
import time
from pathlib import Path
from uuid import uuid4

import arcpy


SONDAJES_TARGET = (
    r"\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB"
    r"\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Collar_Recomendado"
)
CURVAS_TARGET = (
    r"\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB"
    r"\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Curvas_S"
)
TARGET_WKID = 32719

SONDAJES_FIELDS = [
    "r_nomb_recom", "r_tiposondaje", "r_nro_son", "r_sector",
    "r_este", "r_norte", "r_cota", "r_azimut", "r_inclinacion",
    "r_largo", "r_por_perforar", "r_avance_actual", "r_mts_faltantes",
    "r_avance", "r_estatus_perf", "r_largo_final", "r_cert_collar",
    "r_observacion", "q_des_campaña", "q_año_sondaje", "q_tipo_perf",
    "q_estado_son", "av_programa", "av_sonda", "av_largo_program",
    "av_fondo_final", "av_faltante_perf", "av_pct_perforado",
    "av_tricono", "av_mts_fotografia", "av_mts_corte", "av_mts_mapeo",
    "av_mts_preparacion", "r_fch_inicio", "r_fch_termino",
    "av_fch_ini", "av_fch_term",
]
CURVAS_FIELDS = ["TIPO", "MES", "PRESUPUESTO", "REAL", "AÑO"]


def _actual_fields(dataset):
    return {field.name.lower(): field.name for field in arcpy.ListFields(dataset)}


def _ordered_fields(dataset, expected):
    actual = _actual_fields(dataset)
    missing = [name for name in expected if name.lower() not in actual]
    if missing:
        raise ValueError("Faltan campos requeridos: " + ", ".join(missing))
    return [actual[name.lower()] for name in expected]


def _validate_source(source, kind):
    count = int(arcpy.management.GetCount(source)[0])
    if count <= 0:
        raise ValueError("El resultado recibido no contiene registros.")

    if kind == "Sondajes":
        description = arcpy.Describe(source)
        if getattr(description, "shapeType", "").lower() != "point":
            raise ValueError("El resultado de Sondajes debe contener geometrías de punto.")
        wkid = getattr(description.spatialReference, "factoryCode", None)
        if wkid != TARGET_WKID:
            raise ValueError(f"Los Sondajes usan WKID {wkid}; se esperaba {TARGET_WKID}.")
        fields = _ordered_fields(source, SONDAJES_FIELDS)
        key_field = fields[SONDAJES_FIELDS.index("r_nro_son")]
        identifiers = []
        with arcpy.da.SearchCursor(source, ["SHAPE@", key_field]) as rows:
            for geometry, identifier in rows:
                if geometry is None:
                    raise ValueError("El resultado contiene geometrías nulas.")
                value = str(identifier or "").strip().upper()
                if not value:
                    raise ValueError("El resultado contiene un número de sondaje vacío.")
                identifiers.append(value)
        if len(identifiers) != len(set(identifiers)):
            raise ValueError("El resultado contiene números de sondaje duplicados.")
        return count, fields, ["SHAPE@"] + fields

    fields = _ordered_fields(source, CURVAS_FIELDS)
    tipo = fields[CURVAS_FIELDS.index("TIPO")]
    mes = fields[CURVAS_FIELDS.index("MES")]
    keys = []
    with arcpy.da.SearchCursor(source, [tipo, mes]) as rows:
        for type_value, month_value in rows:
            key = (str(type_value or "").strip().upper(), str(month_value or "").strip().upper())
            if not all(key):
                raise ValueError("Curvas S contiene TIPO o MES vacío.")
            keys.append(key)
    if len(keys) != len(set(keys)):
        raise ValueError("Curvas S contiene combinaciones TIPO/MES duplicadas.")
    if count != 60:
        raise ValueError(f"Curvas S contiene {count} registros; se esperaban 60.")
    return count, fields, fields


def _publish_atomic(source, target, kind):
    expected, source_fields, cursor_fields = _validate_source(source, kind)
    if not arcpy.Exists(target):
        return {"publicado": False, "estado": "destino_no_disponible", "registros": 0}
    target_fields = _ordered_fields(target, SONDAJES_FIELDS if kind == "Sondajes" else CURVAS_FIELDS)
    if kind == "Sondajes":
        description = arcpy.Describe(target)
        if description.shapeType.lower() != "point" or description.spatialReference.factoryCode != TARGET_WKID:
            raise ValueError("Collar_Recomendado no es una feature class de puntos WKID 32719.")
        target_cursor_fields = ["SHAPE@"] + target_fields
        copy_tool = arcpy.management.CopyFeatures
    else:
        target_cursor_fields = target_fields
        copy_tool = arcpy.management.CopyRows

    if hasattr(arcpy, "TestSchemaLock") and not arcpy.TestSchemaLock(target):
        raise RuntimeError("El destino está bloqueado por otro proceso o usuario.")

    backup_name = f"publicacion_backup_{uuid4().hex[:10]}"
    backup = str(Path(arcpy.env.scratchGDB) / backup_name)
    copy_tool(target, backup)
    inserted = 0
    try:
        arcpy.management.TruncateTable(target)
        with arcpy.da.SearchCursor(source, cursor_fields) as rows:
            with arcpy.da.InsertCursor(target, target_cursor_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
                    inserted += 1
        final_count = int(arcpy.management.GetCount(target)[0])
        if inserted != expected or final_count != expected:
            raise RuntimeError(
                f"Carga incompleta: origen={expected}, insertados={inserted}, destino={final_count}."
            )
        return {"publicado": True, "estado": "publicado", "registros": final_count}
    except Exception:
        arcpy.management.TruncateTable(target)
        with arcpy.da.SearchCursor(backup, target_cursor_fields) as rows:
            with arcpy.da.InsertCursor(target, target_cursor_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
        raise
    finally:
        if arcpy.Exists(backup):
            arcpy.management.Delete(backup)


class Toolbox:
    def __init__(self):
        self.label = "Publicación de resultados validados"
        self.alias = "publicacion_resultados"
        self.tools = [PublicarResultadoValidado]


class PublicarResultadoValidado:
    def __init__(self):
        self.label = "Publicar resultado validado"
        self.description = "Publica un resultado procesado en Collar_Recomendado o Curvas_S."
        self.canRunInBackground = False

    def getParameterInfo(self):
        kind = arcpy.Parameter(
            displayName="Tipo de resultado", name="tipo_resultado", datatype="GPString",
            parameterType="Optional", direction="Input"
        )
        kind.filter.type = "ValueList"
        kind.filter.list = ["Sondajes", "Curvas S"]

        sondajes = arcpy.Parameter(
            displayName="Sondajes procesados", name="sondajes_procesados",
            datatype="GPFeatureRecordSetLayer", parameterType="Optional", direction="Input"
        )

        curvas = arcpy.Parameter(
            displayName="Curvas S procesadas", name="curvas_s_procesadas",
            datatype="GPRecordSet", parameterType="Optional", direction="Input"
        )

        count = arcpy.Parameter(
            displayName="Cantidad publicada", name="cantidad_publicada",
            datatype="GPLong", parameterType="Derived", direction="Output"
        )
        message = arcpy.Parameter(
            displayName="Mensaje de resultado", name="mensaje_resultado",
            datatype="GPString", parameterType="Derived", direction="Output"
        )
        result_json = arcpy.Parameter(
            displayName="Resumen JSON", name="resumen_json",
            datatype="GPString", parameterType="Derived", direction="Output"
        )
        return [kind, sondajes, curvas, count, message, result_json]

    def isLicensed(self):
        return True

    def updateParameters(self, parameters):
        kind = parameters[0].valueAsText
        parameters[1].enabled = kind != "Curvas S"
        parameters[2].enabled = kind != "Sondajes"

    def updateMessages(self, parameters):
        if parameters[1].valueAsText and parameters[2].valueAsText:
            parameters[1].setErrorMessage("Seleccione solamente una entrada para publicar.")
            parameters[2].setErrorMessage("Seleccione solamente una entrada para publicar.")

    def execute(self, parameters, messages):
        started = time.perf_counter()
        requested_kind = parameters[0].valueAsText
        sondajes = parameters[1].valueAsText
        curvas = parameters[2].valueAsText

        if not sondajes and not curvas:
            status = "Ejecución de publicación completada sin datos. No se modificó ningún destino."
            result = {"estado": "sin_datos", "publicado": False, "tipo": requested_kind, "registros": 0}
            arcpy.AddMessage(status)
            parameters[3].value = 0
            parameters[4].value = status
            parameters[5].value = json.dumps(result, ensure_ascii=False, separators=(",", ":"))
            return
        if sondajes and curvas:
            raise ValueError("Recibió Sondajes y Curvas S simultáneamente; envíe solo un resultado.")

        inferred_kind = "Sondajes" if sondajes else "Curvas S"
        if requested_kind and requested_kind != inferred_kind:
            raise ValueError(f"El tipo seleccionado ({requested_kind}) no coincide con la entrada ({inferred_kind}).")
        source = sondajes or curvas
        target = SONDAJES_TARGET if inferred_kind == "Sondajes" else CURVAS_TARGET
        arcpy.AddMessage(f"Validando resultado procesado de {inferred_kind}...")
        publication = _publish_atomic(source, target, inferred_kind)
        publication.update({
            "tipo": inferred_kind,
            "destino": target,
            "segundos": round(time.perf_counter() - started, 3),
        })
        if publication["publicado"]:
            status = f"{inferred_kind} publicado correctamente: {publication['registros']} registros."
        else:
            status = f"No se encontró el destino de {inferred_kind}; no se modificaron datos."
        arcpy.AddMessage(status)
        parameters[3].value = publication["registros"]
        parameters[4].value = status
        parameters[5].value = json.dumps(publication, ensure_ascii=False, separators=(",", ":"))
