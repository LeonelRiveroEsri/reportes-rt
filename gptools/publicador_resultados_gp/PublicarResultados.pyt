# -*- coding: utf-8 -*-
"""Publica resultados ya procesados de Sondajes o Curvas S."""

import json
import os
import time
from pathlib import Path
from uuid import uuid4
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

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
STATUS_ITEM_ID = "a143e48aae57415eb73c0dbb80bf3e4e"
STATUS_PORTAL = "https://sig.aminerals.cl/portal"
STATUS_REFERER = "https://sig.aminerals.cl"
STATUS_ADMIN_USER = "__AMSA_ADMIN_USER__"
STATUS_ADMIN_PASSWORD = "__AMSA_ADMIN_PASSWORD__"


def _status_post(url, values):
    request = Request(url, data=urlencode(values).encode("utf-8"), headers={"Referer": STATUS_REFERER})
    with urlopen(request, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if payload.get("error"):
        raise RuntimeError(payload["error"].get("message", "Error REST de ArcGIS"))
    return payload


def _update_status(kind, filename, records, session_user, full_name, email, origin):
    try:
        token = _status_post(f"{STATUS_PORTAL}/sharing/rest/generateToken", {
            "f": "json", "username": STATUS_ADMIN_USER, "password": STATUS_ADMIN_PASSWORD,
            "client": "referer", "referer": STATUS_REFERER, "expiration": "60",
        })["token"]
        item = _status_post(f"{STATUS_PORTAL}/sharing/rest/content/items/{STATUS_ITEM_ID}", {"f": "json", "token": token})
        table_url = str(item["url"]).rstrip("/") + "/0"
        if session_user and (not full_name or not email):
            profile = _status_post(f"{STATUS_PORTAL}/sharing/rest/community/users/{quote(session_user)}", {"f": "json", "token": token})
            full_name = full_name or profile.get("fullName", "")
            email = email or profile.get("email", "")
        key = "SONDAJES" if kind == "Sondajes" else "CURVAS_S"
        query = _status_post(f"{table_url}/query", {
            "f": "json", "token": token, "where": f"CLAVE='{key}'",
            "outFields": "OBJECTID", "returnGeometry": "false",
        })
        attributes = {
            "CLAVE": key, "PROCESO": kind, "FRECUENCIA": "Bajo demanda",
            "ULTIMA_ACTUALIZACION": int(time.time() * 1000), "USUARIO": session_user or "sin_sesion",
            "NOMBRE_COMPLETO": full_name or session_user or "Sin datos", "CORREO": email or "Sin datos",
            "ARCHIVO": filename or "Resultado validado", "REGISTROS": int(records or 0),
            "ESTADO": "Completado", "ORIGEN": origin or "GP Tool / REST",
            "MENSAJE": f"{kind} publicado correctamente.",
        }
        features, operation = query.get("features") or [], "adds"
        if features:
            attributes["OBJECTID"], operation = features[0]["attributes"]["OBJECTID"], "updates"
        result = _status_post(f"{table_url}/applyEdits", {
            "f": "json", "token": token, operation: json.dumps([{"attributes": attributes}], ensure_ascii=False),
        })
        edit = (result.get("updateResults") or result.get("addResults") or [{}])[0]
        if not edit.get("success"):
            raise RuntimeError(str(edit.get("error") or "applyEdits no confirmado"))
        return {"actualizado": True, "operacion": operation, "objectid": edit.get("objectId")}
    except Exception as error:
        return {"actualizado": False, "error": f"{type(error).__name__}: {error}"}

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
CURVAS_FIELDS = ["TIPO", "FECHA", "AÑO", "MES", "PRESUPUESTO", "REAL"]
CURVAS_FIELD_DEFINITIONS = {
    "tipo": ("TIPO", "TEXT", 255), "fecha": ("FECHA", "DATE", None),
    "año": ("AÑO", "SHORT", None), "mes": ("MES", "TEXT", 255),
    "presupuesto": ("PRESUPUESTO", "DOUBLE", None), "real": ("REAL", "DOUBLE", None),
}


def _actual_fields(dataset):
    return {field.name.lower(): field.name for field in arcpy.ListFields(dataset)}


def _ordered_fields(dataset, expected):
    actual = _actual_fields(dataset)
    missing = [name for name in expected if name.lower() not in actual]
    if missing:
        raise ValueError("Faltan campos requeridos: " + ", ".join(missing))
    return [actual[name.lower()] for name in expected]


def _prepare_curvas_target(target):
    actual = _actual_fields(target)
    added, unavailable = [], []
    for expected in CURVAS_FIELDS:
        if expected.lower() in actual:
            continue
        name, kind, length = CURVAS_FIELD_DEFINITIONS[expected.lower()]
        try:
            kwargs = {"field_length": length} if length else {}
            arcpy.management.AddField(target, name, kind, **kwargs)
            added.append(name)
            arcpy.AddMessage("Campo agregado en Curvas_S: " + name)
        except Exception as error:
            unavailable.append(name)
            arcpy.AddMessage("No fue posible agregar {}. Se continuara sin ese campo: {}".format(name, error))
    actual = _actual_fields(target)
    common = [name for name in CURVAS_FIELDS if name.lower() in actual]
    return common, [actual[name.lower()] for name in common], added, unavailable


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
    fecha = fields[CURVAS_FIELDS.index("FECHA")]
    keys = []
    with arcpy.da.SearchCursor(source, [tipo, fecha]) as rows:
        for type_value, date_value in rows:
            key = (str(type_value or "").strip().upper(), date_value)
            if not all(key):
                raise ValueError("Curvas S contiene TIPO o FECHA vacío.")
            keys.append(key)
    if len(keys) != len(set(keys)):
        raise ValueError("Curvas S contiene combinaciones TIPO/FECHA duplicadas.")
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


_publish_atomic_strict = _publish_atomic


def _publish_atomic(source, target, kind):
    """Publica Curvas S con evolucion tolerante de esquema; Sondajes sigue estricto."""
    if kind == "Sondajes":
        return _publish_atomic_strict(source, target, kind)

    expected, source_fields, _ = _validate_source(source, kind)
    if not arcpy.Exists(target):
        return {"publicado": False, "estado": "destino_no_disponible", "registros": 0}

    common, target_fields, added, unavailable = _prepare_curvas_target(target)
    if not common:
        return {"publicado": False, "estado": "sin_campos_compatibles", "registros": 0,
                "campos_agregados": added, "campos_no_disponibles": unavailable}
    source_actual = _actual_fields(source)
    source_cursor_fields = [source_actual[name.lower()] for name in common]
    backup = str(Path(arcpy.env.scratchGDB) / ("publicacion_backup_" + uuid4().hex[:10]))
    try:
        arcpy.management.CopyRows(target, backup)
    except Exception as error:
        return {"publicado": False, "estado": "bloqueado", "registros": 0, "error": str(error),
                "campos_agregados": added, "campos_no_disponibles": unavailable}

    try:
        arcpy.management.TruncateTable(target)
        inserted = 0
        with arcpy.da.SearchCursor(source, source_cursor_fields) as rows:
            with arcpy.da.InsertCursor(target, target_fields) as writer:
                for row in rows:
                    writer.insertRow(row)
                    inserted += 1
        final_count = int(arcpy.management.GetCount(target)[0])
        if inserted != expected or final_count != expected:
            raise RuntimeError("Carga incompleta: origen={}, insertados={}, destino={}.".format(
                expected, inserted, final_count))
        return {"publicado": True, "estado": "publicado_parcial" if unavailable else "publicado",
                "registros": final_count, "campos_cargados": common, "campos_agregados": added,
                "campos_no_disponibles": unavailable}
    except Exception as error:
        state = "error_restaurado"
        try:
            arcpy.management.TruncateTable(target)
            backup_actual = _actual_fields(backup)
            restore_common = [name for name in common if name.lower() in backup_actual]
            restore_source = [backup_actual[name.lower()] for name in restore_common]
            restore_target = [target_fields[common.index(name)] for name in restore_common]
            with arcpy.da.SearchCursor(backup, restore_source) as rows:
                with arcpy.da.InsertCursor(target, restore_target) as writer:
                    for row in rows:
                        writer.insertRow(row)
        except Exception as restore_error:
            state = "error_sin_restaurar"
            error = RuntimeError("{}; restauracion: {}".format(error, restore_error))
        return {"publicado": False, "estado": state, "registros": 0, "error": str(error),
                "campos_cargados": common, "campos_agregados": added,
                "campos_no_disponibles": unavailable}
    finally:
        if arcpy.Exists(backup):
            try:
                arcpy.management.Delete(backup)
            except Exception:
                pass


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
        session_user = arcpy.Parameter(displayName="Usuario de la sesion", name="usuario_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        session_name = arcpy.Parameter(displayName="Nombre del usuario", name="nombre_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        session_email = arcpy.Parameter(displayName="Correo del usuario", name="correo_sesion", datatype="GPString", parameterType="Optional", direction="Input")
        execution_origin = arcpy.Parameter(displayName="Origen de la ejecucion", name="origen_ejecucion", datatype="GPString", parameterType="Optional", direction="Input")
        execution_origin.value = "GP Tool / REST"
        source_file = arcpy.Parameter(displayName="Archivo de origen", name="archivo_origen", datatype="GPString", parameterType="Optional", direction="Input")
        return [kind, sondajes, curvas, count, message, result_json, session_user, session_name, session_email, execution_origin, source_file]

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
        session_user = parameters[6].valueAsText or ""
        session_name = parameters[7].valueAsText or ""
        session_email = parameters[8].valueAsText or ""
        execution_origin = parameters[9].valueAsText or "GP Tool / REST"
        source_file = parameters[10].valueAsText or ""

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
            suffix = ""
            if publication.get("campos_no_disponibles"):
                suffix = " Campos omitidos: " + ", ".join(publication["campos_no_disponibles"]) + "."
            status = f"{inferred_kind} publicado correctamente: {publication['registros']} registros.{suffix}"
            status_update = _update_status(
                inferred_kind, source_file, publication["registros"], session_user,
                session_name, session_email, execution_origin,
            )
            publication["estado_actualizacion"] = status_update
            arcpy.AddMessage("Tabla de control actualizada." if status_update.get("actualizado") else f"Tabla de control no actualizada: {status_update.get('error')}")
        else:
            status = "No fue posible modificar {} (estado: {}). El proceso finalizo sin interrumpir la salida.".format(
                inferred_kind, publication.get("estado", "no_publicado"))
        arcpy.AddMessage(status)
        parameters[3].value = publication["registros"]
        parameters[4].value = status
        parameters[5].value = json.dumps(publication, ensure_ascii=False, separators=(",", ":"))
