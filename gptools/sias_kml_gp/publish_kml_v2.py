# -*- coding: utf-8 -*-
"""Sobrescribe el servicio GP de prueba CL_CEN_ADM_SIAS_KmltolayerV2."""

import json
import os
from pathlib import Path
from xml.dom import minidom

import arcpy
from arcgis.gis import GIS


TOOLBOX = Path(__file__).resolve().parent / "CL_CEN_SIAS_Kml_a_Layer.pyt"
CREDENTIALS = Path(r"D:\Credenciales\AMSA.json")
PORTAL_URL = "https://sig.aminerals.cl/portal"
FEDERATED_SERVER = "https://sig.aminerals.cl/vector"
SERVER_FOLDER = "CL_CEN_ADM"
SERVICE_NAME = "CL_CEN_ADM_SIAS_KmltolayerV2"
EXPECTED_URL = (
    f"{FEDERATED_SERVER}/rest/services/{SERVER_FOLDER}/{SERVICE_NAME}/GPServer"
)
OUTPUT_DIR = Path(__file__).resolve().parent / ".publish-kml-v2"
PUBLICATION_KML = Path(__file__).resolve().parent / "publication_sample.kml"


def find_service_item(gis):
    matches = [
        item
        for item in gis.content.search(
            query=f'title:"{SERVICE_NAME}"',
            item_type="Geoprocessing Service",
            max_items=20,
        )
        if item.title == SERVICE_NAME
        and str(item.url or "").rstrip("/").lower() == EXPECTED_URL.lower()
    ]
    if len(matches) != 1:
        raise RuntimeError(
            f"Se esperaba un servicio en {EXPECTED_URL}; se encontraron {len(matches)}."
        )
    return matches[0]


def mark_as_overwrite(sddraft_path):
    document = minidom.parse(str(sddraft_path))
    for node in document.getElementsByTagName("Type"):
        if node.firstChild and node.firstChild.data == "esriServiceDefinitionType_New":
            node.firstChild.data = "esriServiceDefinitionType_Replacement"
    with sddraft_path.open("w", encoding="utf-8") as stream:
        document.writexml(stream)


def main():
    if not TOOLBOX.exists():
        raise FileNotFoundError(f"No se encontró la PYT: {TOOLBOX}")

    credentials = json.loads(CREDENTIALS.read_text(encoding="utf-8"))["CENTINELA"]
    gis = GIS(PORTAL_URL, credentials["user"], credentials["pass"])
    service_item = find_service_item(gis)
    previous_item_id = service_item.id
    previous_access = service_item.access

    arcpy.SignInToPortal(PORTAL_URL, credentials["user"], credentials["pass"])
    arcpy.ImportToolbox(str(TOOLBOX), "cargasiapublish")
    arcpy.env.overwriteOutput = True

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    sddraft_path = OUTPUT_DIR / f"{SERVICE_NAME}.sddraft"
    sd_path = OUTPUT_DIR / f"{SERVICE_NAME}.sd"

    os.environ["SIAS_PUBLICATION_MODE"] = "1"
    try:
        result = arcpy.CargaKmlSias_cargasiapublish(
            str(PUBLICATION_KML),
            "publicacion@aminerals.cl",
            "publicacion@aminerals.cl",
            "https://experiences.arcgis.com",
        )
    finally:
        os.environ.pop("SIAS_PUBLICATION_MODE", None)

    if result.status != 4:
        raise RuntimeError(
            "No fue posible generar el resultado de publicación: "
            + result.getMessages()
        )

    arcpy.CreateGPSDDraft(
        result,
        str(sddraft_path),
        SERVICE_NAME,
        server_type="ARCGIS_SERVER",
        copy_data_to_server=True,
        folder_name=SERVER_FOLDER,
        summary="Carga un archivo KML o KMZ para iniciar una solicitud SIA.",
        tags="SIA, Centinela, KML, KMZ, Experience Builder, Geoprocesamiento",
        executionType="Asynchronous",
        resultMapServer=False,
        showMessages="Info",
        maximumRecords=1000,
        minInstances=0,
        maxInstances=2,
        maxUsageTime=600,
        maxWaitTime=60,
        maxIdleTime=1800,
        capabilities="UPLOADS",
    )
    mark_as_overwrite(sddraft_path)

    arcpy.server.StageService(str(sddraft_path), str(sd_path))
    print(arcpy.GetMessages(1))
    upload = arcpy.server.UploadServiceDefinition(str(sd_path), FEDERATED_SERVER)
    print(upload.getMessages())

    refreshed_item = find_service_item(gis)
    if refreshed_item.id != previous_item_id:
        raise RuntimeError(
            "La sobrescritura cambió el item de Portal inesperadamente: "
            f"{previous_item_id} -> {refreshed_item.id}"
        )
    if previous_access == "public" and refreshed_item.access != "public":
        share_result = refreshed_item.share(everyone=True, org=False)
        if share_result.get("notSharedWith") != []:
            raise RuntimeError(
                f"No fue posible restablecer el acceso público: {share_result}"
            )
    print(f"Servicio sobrescrito: {EXPECTED_URL}")
    print(f"Portal item: {refreshed_item.id}; acceso: {refreshed_item.access}")


if __name__ == "__main__":
    main()
