import json
import os
import time
from pathlib import Path
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

PORTAL_URL = "https://sig.aminerals.cl/portal"
TABLE_URL = "https://sig.aminerals.cl/server/rest/services/Hosted/Estado_Actualizacion_Cargas/FeatureServer/0"
LOCAL_CREDENTIALS = Path(r"D:\Credenciales\AMSA.json")

def _post(url, values):
    request = Request(url, data=urlencode(values).encode("utf-8"), headers={"Referer": "https://sig.aminerals.cl"})
    with urlopen(request, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if payload.get("error"):
        raise RuntimeError(payload["error"].get("message", "Error REST de ArcGIS"))
    return payload

def _credentials():
    portal = os.getenv("AMSA_PORTAL_URL", PORTAL_URL).rstrip("/")
    username, password = os.getenv("AMSA_ADMIN_USER"), os.getenv("AMSA_ADMIN_PASSWORD")
    if username and password:
        return portal, username, password
    path = Path(os.getenv("AMSA_CREDENTIALS_FILE", str(LOCAL_CREDENTIALS)))
    if not path.exists():
        raise RuntimeError("No se configuro AMSA_CREDENTIALS_FILE ni las variables de cuenta administrativa")
    document = json.loads(path.read_text(encoding="utf-8-sig"))
    account = document.get("ADMIN") or document.get("ADMIN1") or {}
    username = account.get("user") or account.get("username")
    password = account.get("pass") or account.get("password")
    portal = str(document.get("url") or portal).rstrip("/")
    if not username or not password:
        raise RuntimeError("La seccion ADMIN del archivo de credenciales esta incompleta")
    return portal, username, password

def update_status(key, process, filename, records, session_user="", full_name="", email="", origin="GP Tool / REST", message=""):
    try:
        portal, username, password = _credentials()
        token = _post(f"{portal}/sharing/rest/generateToken", {
            "f": "json", "username": username, "password": password,
            "client": "referer", "referer": "https://sig.aminerals.cl", "expiration": "60",
        })["token"]
        if session_user and (not full_name or not email):
            profile = _post(f"{portal}/sharing/rest/community/users/{quote(session_user)}", {"f": "json", "token": token})
            full_name = full_name or profile.get("fullName", "")
            email = email or profile.get("email", "")
        query = _post(f"{TABLE_URL}/query", {
            "f": "json", "token": token, "where": "CLAVE='{}'".format(key.replace("'", "''")),
            "outFields": "OBJECTID", "returnGeometry": "false",
        })
        attributes = {
            "CLAVE": key, "PROCESO": process, "FRECUENCIA": "Bajo demanda",
            "ULTIMA_ACTUALIZACION": int(time.time() * 1000), "USUARIO": session_user or "sin_sesion",
            "NOMBRE_COMPLETO": full_name or session_user or "Sin datos", "CORREO": email or "Sin datos",
            "ARCHIVO": filename, "REGISTROS": int(records or 0), "ESTADO": "Completado",
            "ORIGEN": origin or "GP Tool / REST", "MENSAJE": message or "Proceso completado correctamente.",
        }
        features, operation = query.get("features") or [], "adds"
        if features:
            attributes["OBJECTID"], operation = features[0]["attributes"]["OBJECTID"], "updates"
        result = _post(f"{TABLE_URL}/applyEdits", {
            "f": "json", "token": token, operation: json.dumps([{"attributes": attributes}], ensure_ascii=False),
        })
        edit = (result.get("updateResults") or result.get("addResults") or [{}])[0]
        if not edit.get("success"):
            raise RuntimeError(str(edit.get("error") or "applyEdits no confirmado"))
        return {"actualizado": True, "operacion": operation, "objectid": edit.get("objectId")}
    except Exception as error:
        return {"actualizado": False, "error": f"{type(error).__name__}: {error}"}
