import requests
import time
import json

POWER_AUTOMATE_TIMEOUT = 60
POWER_AUTOMATE_TOTAL_TIMEOUT = 900
POWER_AUTOMATE_POLL_INTERVAL = 10

# ============================================================
# MENSAJES
# ============================================================

def msg(text):
    print(str(text))


def warn(text):
    print(f"WARNING: {text}")

def err(text):
    print(str(text))


def build_attachments_list(att_list, base_url, parent_globalid=None):
    attachments = []

    for att in att_list:
        att_id = att.get("id") or att.get("attachmentid")

        item = {
            "id": att_id,
            "url": f"{base_url}/attachments/{att_id}",
            "name": att.get("name") or att.get("att_name"),
            "size": att.get("size") or att.get("data_size"),
            "contentType": att.get("contentType") or att.get("content_type"),
            "keywords": att.get("keywords"),
            "globalId": att.get("globalId") or att.get("globalid")
        }

        if parent_globalid:
            item["parentGlobalId"] = parent_globalid

        attachments.append(item)

    return attachments


def validar_respuesta_power_automate(response):
    try:
        data = response.json()
    except ValueError:
        msg(
            "Power Automate respondio, pero la respuesta no es JSON valido. "
            f"Body={response.text}"
        )
        return False

    if data.get("ok") is True:
        msg("Power Automate confirmo ok=True.")
        return True

    msg(
        "Power Automate respondio, pero no confirmo ok=True. "
        f"Body={response.text}"
    )
    return False


def esperar_respuesta_power_automate(
    location,
    timeout_total=POWER_AUTOMATE_TOTAL_TIMEOUT,
    intervalo=POWER_AUTOMATE_POLL_INTERVAL
):
    inicio = time.time()

    while True:
        tiempo_transcurrido = time.time() - inicio

        if tiempo_transcurrido > timeout_total:
            msg(
                "Timeout total esperando finalizacion de Power Automate. "
                f"Tiempo maximo={timeout_total} segundos."
            )
            return False

        try:
            status_response = requests.get(
                location,
                timeout=POWER_AUTOMATE_TIMEOUT
            )
        except requests.exceptions.Timeout:
            msg(
                "Timeout consultando estado de Power Automate. "
                f"Se reintentara en {intervalo} segundos."
            )
            time.sleep(intervalo)
            continue
        except requests.exceptions.RequestException as ex:
            msg(f"Error consultando estado de Power Automate: {ex}")
            return False

        msg(f"Consulta estado Power Automate: {status_response.status_code}")

        if status_response.status_code == 202:
            retry_after = status_response.headers.get("Retry-After")

            try:
                espera = int(retry_after) if retry_after else intervalo
            except ValueError:
                espera = intervalo

            msg(
                "Power Automate sigue procesando. "
                f"Nueva consulta en {espera} segundos."
            )

            time.sleep(espera)
            continue

        if status_response.status_code == 200:
            msg("Power Automate finalizo y entrego respuesta final.")
            msg(f"Respuesta final Power Automate: {status_response.text}")
            return validar_respuesta_power_automate(status_response)

        if status_response.status_code >= 400:
            msg(
                "Power Automate termino con error HTTP. "
                f"Status={status_response.status_code}, "
                f"Body={status_response.text}"
            )
            return False

        msg(
            "Estado no esperado consultando Power Automate. "
            f"Status={status_response.status_code}, "
            f"Body={status_response.text}"
        )
        return False


def sendAutomated(url_automated, flujo, payload):
    try:
        if not url_automated:
            msg(f"No se configuro URL de Power Automate. Flujo={flujo}")
            return False

        if not isinstance(payload, dict):
            msg(f"Payload invalido para Power Automate. Flujo={flujo}, tipo={type(payload)}")
            return False

        msg(f"Enviando solicitud a Power Automate. Flujo={flujo}")
        # No escribir el archivo Base64 completo en logs de ArcGIS Server.
        payload_log = dict(payload)
        for key in ("file", "file_content_base64"):
            if key in payload_log:
                payload_log[key] = f"<base64 omitido: {len(str(payload_log[key]))} caracteres>"
        msg(f"Payload Power Automate: {json.dumps(payload_log, ensure_ascii=False)}")

        try:
            response = requests.post(
                url_automated,
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=POWER_AUTOMATE_TIMEOUT
            )
        except requests.exceptions.Timeout:
            msg(
                "Timeout inicial enviando a Power Automate. "
                "No fue posible confirmar ejecucion OK. "
                f"Flujo={flujo}, timeout={POWER_AUTOMATE_TIMEOUT} segundos."
            )
            return False
        except requests.exceptions.RequestException as ex:
            msg(
                "Error de conexion enviando a Power Automate. "
                f"Flujo={flujo}. Error={ex}"
            )
            return False

        msg(f"Power Automate status inicial: {response.status_code}")
        msg(f"Power Automate response inicial: {response.text}")

        if 200 <= response.status_code < 300 and response.status_code != 202:
            return validar_respuesta_power_automate(response)

        if response.status_code == 202:
            location = (
                response.headers.get("Location")
                or response.headers.get("location")
            )

            if not location:
                msg(
                    "Power Automate respondio 202, pero no devolvio header Location. "
                    "Se considera aceptado, pero no se puede consultar el estado final."
                )
                return True

            msg("Power Automate acepto la solicitud en modo asincronico.")
            msg(f"URL de seguimiento recibida: {location}")

            return esperar_respuesta_power_automate(location=location)

        if response.status_code == 504:
            msg(
                "Power Automate devolvio HTTP 504 Gateway Timeout. "
                "No se pudo confirmar ok=True."
            )
            return False

        if response.status_code >= 400:
            msg(
                "Error HTTP inicial enviando a Power Automate. "
                f"Status={response.status_code}, Body={response.text}"
            )
            return False

        msg(
            "Respuesta inicial no esperada desde Power Automate. "
            f"Status={response.status_code}, Body={response.text}"
        )
        return False

    except Exception as ex:
        msg(
            "Error inesperado enviando a Power Automate. "
            f"Flujo={flujo}. Error={ex}"
        )
        return False
