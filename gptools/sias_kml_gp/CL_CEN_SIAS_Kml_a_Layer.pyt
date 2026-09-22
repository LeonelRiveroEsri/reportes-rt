# -*- coding: utf-8 -*-
import datetime
import json
import math
import os
import re
import traceback
import xml.etree.ElementTree as ET
import zipfile
from urllib import parse, request

import arcpy
import pandas as pd
from arcgis.features import FeatureLayer
from arcgis.geometry import Polygon
from arcgis.gis import GIS


PORTAL_URL = "https://sig.aminerals.cl/portal"
PORTAL_USER = os.environ.get("SIAS_PORTAL_USERNAME", "")
PORTAL_PASSWORD = os.environ.get("SIAS_PORTAL_PASSWORD", "")
TARGET_ITEM_ID = "62ce0fc77423403eaf9850efe436506f"
RESPONSIBILITY_TABLE_ID = "176cdfdda5d4409b89fb6b74fbd14349"
WEB_APP_ID = "23b110b0b71b45b681db6fb61bbf6204"
DEFAULT_MANAGEMENTS = [
    "Gerencia A&F",
    "Gerencia Mantenimiento",
    "Gerencia Medio Ambiente",
    "Gerencia Mina",
    "Gerencia P&D/Desarrollo",
    "Gerencia Planta Concentradora",
    "Gerencia Planta Hidrometarlurgica",
    "Gerencia RR.HH.",
    "Gerencia Relaves y Ripios",
    "SIAM-STC",
]
SUPPORTED_KML_EXTENSIONS = {".kml", ".kmz"}
MAX_KML_DOCUMENTS_IN_KMZ = 100
MAX_KML_XML_BYTES_IN_KMZ = 50 * 1024 * 1024
KNOWN_XML_PREFIXES = {
    "atom": "http://www.w3.org/2005/Atom",
    "gx": "http://www.google.com/kml/ext/2.2",
    "kml": "http://www.opengis.net/kml/2.2",
    "xsi": "http://www.w3.org/2001/XMLSchema-instance",
}
ROOT_KML_TAG_RE = re.compile(rb"<(?:[A-Za-z_][\w.-]*:)?kml(?=[\s>])[^>]*>", re.IGNORECASE)
DECLARED_PREFIX_RE = re.compile(rb"xmlns:([A-Za-z_][\w.-]*)\s*=", re.IGNORECASE)
TAG_PREFIX_RE = re.compile(rb"</?\s*([A-Za-z_][\w.-]*):[A-Za-z_]", re.IGNORECASE)
ATTRIBUTE_PREFIX_RE = re.compile(rb"\s([A-Za-z_][\w.-]*):[A-Za-z_][\w.-]*\s*=", re.IGNORECASE)


def _message(value):
    arcpy.AddMessage(str(value))


def _field_name(layer, expected):
    for field in layer.properties.fields:
        name = field.get("name") if isinstance(field, dict) else getattr(field, "name", "")
        if str(name).lower() == expected.lower():
            return name
    return expected


def _local_name(tag):
    """Retorna el nombre local de una etiqueta XML, con o sin namespace."""
    return str(tag).rsplit("}", 1)[-1].split(":", 1)[-1]


def _repair_missing_prefix_declarations(xml_content):
    """Declara prefijos usados pero ausentes; algunos exportadores omiten xsi."""
    root_match = ROOT_KML_TAG_RE.search(xml_content[:65536])
    if not root_match:
        return xml_content

    root_tag = root_match.group(0)
    declared = {value.decode("ascii").lower() for value in DECLARED_PREFIX_RE.findall(root_tag)}
    used = {
        value.decode("ascii").lower()
        for expression in (TAG_PREFIX_RE, ATTRIBUTE_PREFIX_RE)
        for value in expression.findall(xml_content)
    }
    missing = sorted(used - declared - {"xml", "xmlns"})
    if not missing:
        return xml_content

    declarations = b"".join(
        b' xmlns:' + prefix.encode("ascii") + b'="'
        + KNOWN_XML_PREFIXES.get(prefix, "urn:kml-recovered-prefix:{}".format(prefix)).encode("ascii")
        + b'"'
        for prefix in missing
    )
    insertion = root_match.end() - 1
    return xml_content[:insertion] + declarations + xml_content[insertion:]


def _read_kml_documents(source_path):
    """Lee un KML o todos los documentos KML incluidos en un KMZ."""
    if not source_path or not os.path.isfile(source_path):
        raise ValueError("No se encontró el archivo KML/KMZ de entrada.")
    if os.path.getsize(source_path) <= 0:
        raise ValueError("El archivo KML/KMZ está vacío.")

    extension = os.path.splitext(source_path)[1].lower()
    if extension not in SUPPORTED_KML_EXTENSIONS:
        raise ValueError("La extensión debe ser .kml o .kmz.")

    if extension == ".kml":
        with open(source_path, "rb") as stream:
            return [(os.path.basename(source_path), stream.read())]

    if not zipfile.is_zipfile(source_path):
        raise ValueError("El archivo .kmz no es un ZIP válido.")

    with zipfile.ZipFile(source_path, "r") as archive:
        entries = [
            info for info in archive.infolist()
            if not info.is_dir() and info.filename.lower().endswith(".kml")
        ]
        if not entries:
            raise ValueError("El KMZ no contiene ningún documento .kml.")
        if len(entries) > MAX_KML_DOCUMENTS_IN_KMZ:
            raise ValueError(
                "El KMZ contiene demasiados documentos KML (máximo {})."
                .format(MAX_KML_DOCUMENTS_IN_KMZ)
            )
        total_xml_size = sum(info.file_size for info in entries)
        if total_xml_size > MAX_KML_XML_BYTES_IN_KMZ:
            raise ValueError("Los documentos KML internos superan 50 MB descomprimidos.")

        # doc.kml es el documento principal por convención. También se recorren
        # los demás KML para aceptar geometrías guardadas en subcarpetas del KMZ.
        entries.sort(key=lambda info: (
            0 if info.filename.replace("\\", "/").lower() == "doc.kml" else 1,
            info.filename.lower(),
        ))
        return [(info.filename, archive.read(info)) for info in entries]


def _parse_coordinate_text(coordinate_text, source_name):
    """Convierte lon,lat[,z] de KML en un anillo cerrado de ArcGIS."""
    points = []
    for coordinate in str(coordinate_text or "").split():
        values = [value.strip() for value in coordinate.split(",")]
        if len(values) < 2 or not values[0] or not values[1]:
            continue
        try:
            longitude = float(values[0])
            latitude = float(values[1])
        except ValueError:
            continue
        if not math.isfinite(longitude) or not math.isfinite(latitude):
            continue
        if not (-180 <= longitude <= 180 and -90 <= latitude <= 90):
            raise ValueError(
                "{} contiene coordenadas fuera de WGS84: {},{}."
                .format(source_name, longitude, latitude)
            )
        point = [longitude, latitude]
        if not points or point != points[-1]:
            points.append(point)

    if len(points) > 1 and points[0] == points[-1]:
        points.pop()
    if len({(point[0], point[1]) for point in points}) < 3:
        return None
    points.append(list(points[0]))
    return points


def _signed_area(ring):
    return sum(
        ring[index][0] * ring[index + 1][1]
        - ring[index + 1][0] * ring[index][1]
        for index in range(len(ring) - 1)
    ) / 2.0


def _orient_ring(ring, clockwise):
    """Normaliza la orientación que espera ArcGIS: exterior CW, hueco CCW."""
    is_clockwise = _signed_area(ring) < 0
    if is_clockwise != clockwise:
        return list(reversed(ring))
    return ring


def _coordinate_nodes(element):
    return [child for child in element.iter() if _local_name(child.tag).lower() == "coordinates"]


def _rings_from_polygon(polygon_element, source_name):
    rings = []
    explicit_boundaries = [
        child for child in polygon_element.iter()
        if _local_name(child.tag).lower() in ("outerboundaryis", "innerboundaryis")
    ]

    if explicit_boundaries:
        for boundary in explicit_boundaries:
            is_hole = _local_name(boundary.tag).lower() == "innerboundaryis"
            for coordinates in _coordinate_nodes(boundary):
                ring = _parse_coordinate_text(coordinates.text, source_name)
                if ring:
                    rings.append(_orient_ring(ring, clockwise=not is_hole))
        return rings

    # Compatibilidad con KML no estándar que guarda <coordinates> directamente
    # bajo Polygon o LinearRing, sin outerBoundaryIs/innerBoundaryIs.
    for coordinates in _coordinate_nodes(polygon_element):
        ring = _parse_coordinate_text(coordinates.text, source_name)
        if ring:
            rings.append(_orient_ring(ring, clockwise=True))
    return rings


def parse_kml(kml_file):
    """Obtiene todos los anillos Polygon de KML/KMZ, sin depender de su namespace."""
    rings = []
    parse_errors = []
    for source_name, xml_content in _read_kml_documents(kml_file):
        try:
            root = ET.fromstring(_repair_missing_prefix_declarations(xml_content))
        except (ET.ParseError, ValueError) as exception:
            parse_errors.append("{}: {}".format(source_name, exception))
            continue

        if _local_name(root.tag).lower() != "kml":
            parse_errors.append("{}: el elemento raíz no es <kml>".format(source_name))
            continue

        for element in root.iter():
            if _local_name(element.tag).lower() == "polygon":
                rings.extend(_rings_from_polygon(element, source_name))

    if not rings:
        detail = " Detalle: {}".format("; ".join(parse_errors)) if parse_errors else ""
        raise ValueError(
            "El archivo KML/KMZ no contiene polígonos válidos con coordenadas WGS84.{}"
            .format(detail)
        )

    geometry = Polygon({"rings": rings, "spatialReference": {"wkid": 4326}})
    if geometry.is_empty:
        raise ValueError("Las coordenadas encontradas no forman una geometría de polígono.")
    _message(
        "Geometría extraída desde {}: {} anillo(s)."
        .format(os.path.basename(kml_file), len(rings))
    )
    return geometry


def generate_token(portal_url, username, password, referer, expiration=90):
    params = {
        "username": username,
        "password": password,
        "client": "referer",
        "referer": referer,
        "expiration": expiration,
        "f": "json",
    }
    endpoint = "{}/sharing/rest/generateToken".format(portal_url.rstrip("/"))
    data = parse.urlencode(params).encode("ascii")
    req = request.Request(endpoint, data=data)
    with request.urlopen(req, timeout=60) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if payload.get("error"):
        raise RuntimeError(payload["error"].get("message", "No fue posible generar el token."))
    token = payload.get("token")
    if not token:
        raise RuntimeError("El portal no devolvió un token.")
    return token


def resolve_managements(gis, source_geometry):
    table = gis.content.get(RESPONSIBILITY_TABLE_ID).tables[0]
    urls = {
        value for value in table.query(where="1=1", out_fields="url", return_geometry=False).df["url"].dropna()
        if str(value).strip()
    }
    frames = []
    for url in urls:
        try:
            frame = FeatureLayer(str(url)).query(
                where="1=1", out_fields="Nombre", out_sr=4326, return_geometry=True
            ).sdf
            if not frame.empty:
                frames.append(frame)
        except Exception as exception:
            arcpy.AddWarning("No se pudo consultar {}: {}".format(url, exception))

    if not frames:
        return ",".join(DEFAULT_MANAGEMENTS)

    areas = pd.concat(frames, ignore_index=True)
    intersections = areas[areas["SHAPE"].apply(
        lambda geometry: geometry is not None and not geometry.disjoint(source_geometry)
    )]
    if intersections.empty:
        names = sorted({str(value) for value in areas["Nombre"].dropna() if str(value).strip()})
    else:
        names = sorted({str(value) for value in intersections["Nombre"].dropna() if str(value).strip()})
    return ",".join(names or DEFAULT_MANAGEMENTS)


def execute_load(kml_path, mail, app_referer):
    if not PORTAL_USER or not PORTAL_PASSWORD:
        raise RuntimeError(
            "Configure SIAS_PORTAL_USERNAME y SIAS_PORTAL_PASSWORD en el entorno del ArcGIS Server."
        )

    arcpy.env.overwriteOutput = True
    _message("Conectando con Portal y preparando la carga...")
    gis = GIS(PORTAL_URL, PORTAL_USER, PORTAL_PASSWORD)
    item = gis.content.get(TARGET_ITEM_ID)
    if not item or not item.layers:
        raise RuntimeError("No se encontró la capa temporal configurada.")
    layer = item.layers[0]
    object_id_field = _field_name(layer, str(layer.properties.objectIdField))
    global_id_field = _field_name(layer, str(getattr(layer.properties, "globalIdField", "globalid") or "globalid"))
    email_field = _field_name(layer, "email")

    _message(
        "Creando una carga temporal independiente. "
        "No se eliminarán otras cargas asociadas al mismo correo."
    )
    shape = parse_kml(kml_path)
    add_response = layer.edit_features(adds=[{
        "geometry": shape,
        "attributes": {"url_sharepoint": "SELECCIONE PARA INICIAR FORMULARIO DE SIA"},
    }])
    add_results = add_response.get("addResults") or []
    if not add_results or not add_results[0].get("success"):
        raise RuntimeError("No se pudo agregar el KML: {}".format(add_response))

    object_id = add_results[0].get("objectId")
    returned_globalid = add_results[0].get("globalId") or add_results[0].get("globalid")
    if object_id is None:
        raise RuntimeError("La capa no devolvió el objectId de la carga.")

    query = layer.query(
        where="{} = {}".format(object_id_field, int(object_id)),
        out_fields="*",
        return_geometry=True,
    )
    if not query.features:
        raise RuntimeError("No se pudo consultar la entidad recién agregada.")
    feature = query.features[0]
    attributes = feature.attributes or {}
    globalid = returned_globalid or attributes.get(global_id_field)
    if not globalid:
        for key, value in attributes.items():
            if str(key).lower() == "globalid":
                globalid = value
                break
    if not globalid:
        raise RuntimeError("La entidad fue agregada, pero no se pudo recuperar su GlobalID.")

    source_geometry = Polygon(feature.geometry)
    managements = resolve_managements(gis, source_geometry)
    extent = source_geometry.buffer(distance=0.001).extent
    extent_text = ",".join(map(str, extent))
    token = generate_token(
        PORTAL_URL, PORTAL_USER, PORTAL_PASSWORD,
        referer="https://survey123.arcgis.com"
    )
    map_token = generate_token(
        PORTAL_URL, PORTAL_USER, PORTAL_PASSWORD,
        referer=app_referer
    )
    web_app_url = (
        "{}/apps/webappviewer/index.html?id={}&mobileBreakPoint=300&extent={}&token={}"
        .format(PORTAL_URL, WEB_APP_ID, extent_text, token)
    )

    update_attributes = {
        object_id_field: object_id,
        "extent": extent_text,
        "fecha": datetime.datetime.now(),
        "estado": 1,
        "token_admin": token,
        "url_wab": web_app_url,
        email_field: mail,
        "nombre_gerencia_responsable": managements,
        "nombre_ger_resp_mult": managements.replace(" ", "_"),
    }
    update_response = layer.edit_features(updates=[{"attributes": update_attributes}])
    update_results = update_response.get("updateResults") or []
    if not update_results or not update_results[0].get("success"):
        raise RuntimeError("La entidad se agregó, pero no pudo actualizarse: {}".format(update_response))

    _message("Carga finalizada. ObjectID: {}".format(object_id))
    _message("GlobalID: {}".format(globalid))
    return str(globalid), token, map_token


class Toolbox(object):
    def __init__(self):
        self.label = "Carga SIA"
        self.alias = "CargaSIAS"
        self.tools = [CargaKmlSias]


class CargaKmlSias(object):
    def __init__(self):
        self.label = "Carga KML SIA"
        self.description = "Carga un KML o KMZ y retorna GlobalID, token de Survey123 y token temporal del mapa."
        self.canRunInBackground = False

    def getParameterInfo(self):
        kml = arcpy.Parameter(
            displayName="Archivo KML o KMZ",
            name="kml",
            datatype="DEFile",
            parameterType="Required",
            direction="Input",
        )
        kml.filter.list = ["kml", "kmz"]

        mail = arcpy.Parameter(
            displayName="Correo electrónico",
            name="mail",
            datatype="GPString",
            parameterType="Required",
            direction="Input",
        )
        mail2 = arcpy.Parameter(
            displayName="Confirmación de correo electrónico",
            name="mail2",
            datatype="GPString",
            parameterType="Required",
            direction="Input",
        )
        app_referer = arcpy.Parameter(
            displayName="Origen de Experience Builder",
            name="app_referer",
            datatype="GPString",
            parameterType="Required",
            direction="Input",
        )
        globalid = arcpy.Parameter(
            displayName="GlobalID de la carga",
            name="globalid",
            datatype="GPString",
            parameterType="Derived",
            direction="Output",
        )
        token = arcpy.Parameter(
            displayName="Token calculado",
            name="token",
            datatype="GPString",
            parameterType="Derived",
            direction="Output",
        )
        map_token = arcpy.Parameter(
            displayName="Token temporal para el mapa",
            name="map_token",
            datatype="GPString",
            parameterType="Derived",
            direction="Output",
        )
        return [kml, mail, mail2, app_referer, globalid, token, map_token]

    def isLicensed(self):
        return True

    def updateParameters(self, parameters):
        return

    def updateMessages(self, parameters):
        kml_path = parameters[0].valueAsText
        mail = (parameters[1].valueAsText or "").strip()
        mail2 = (parameters[2].valueAsText or "").strip()
        app_referer = (parameters[3].valueAsText or "").strip()
        if kml_path and os.path.splitext(kml_path)[1].lower() not in SUPPORTED_KML_EXTENSIONS:
            parameters[0].setErrorMessage("El archivo debe tener extensión .kml o .kmz.")
        if mail and ("@" not in mail or "." not in mail.split("@")[-1]):
            parameters[1].setErrorMessage("Ingrese un correo electrónico válido.")
        if mail and mail2 and mail.lower() != mail2.lower():
            parameters[2].setErrorMessage("Los correos electrónicos no coinciden.")
        if app_referer and not app_referer.lower().startswith(("https://", "http://")):
            parameters[3].setErrorMessage("El origen de Experience Builder debe comenzar con https:// o http://.")

    def execute(self, parameters, messages):
        kml_path = parameters[0].valueAsText
        mail = (parameters[1].valueAsText or "").strip()
        mail2 = (parameters[2].valueAsText or "").strip()
        app_referer = (parameters[3].valueAsText or "").strip().rstrip("/")
        if mail.lower() != mail2.lower():
            raise arcpy.ExecuteError("Los correos electrónicos no coinciden.")
        if not app_referer.lower().startswith(("https://", "http://")):
            raise arcpy.ExecuteError("El origen de Experience Builder no es válido.")
        if os.path.splitext(kml_path)[1].lower() not in SUPPORTED_KML_EXTENSIONS:
            raise arcpy.ExecuteError("El archivo debe tener extensión .kml o .kmz.")
        if os.environ.get("SIAS_PUBLICATION_MODE") == "1":
            publication_globalid = "{00000000-0000-0000-0000-000000000000}"
            parameters[4].value = publication_globalid
            parameters[5].value = "PUBLICATION_TOKEN"
            parameters[6].value = "PUBLICATION_MAP_TOKEN"
            arcpy.SetParameterAsText(4, publication_globalid)
            arcpy.SetParameterAsText(5, "PUBLICATION_TOKEN")
            arcpy.SetParameterAsText(6, "PUBLICATION_MAP_TOKEN")
            _message("Resultado controlado generado para publicar la herramienta.")
            return
        try:
            globalid, token, map_token = execute_load(kml_path, mail, app_referer)
            parameters[4].value = globalid
            parameters[5].value = token
            parameters[6].value = map_token
            arcpy.SetParameterAsText(4, globalid)
            arcpy.SetParameterAsText(5, token)
            arcpy.SetParameterAsText(6, map_token)
            _message("Herramienta finalizada correctamente.")
        except Exception as exception:
            arcpy.AddError(str(exception))
            arcpy.AddError(traceback.format_exc())
            raise
