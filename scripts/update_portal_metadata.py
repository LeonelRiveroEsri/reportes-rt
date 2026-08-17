#!/usr/bin/env python3
"""Ordena y documenta los items de la solucion de carga de sondajes.

No guarda credenciales. Use PORTAL_TOKEN o PORTAL_USER/PORTAL_PASSWORD.
La ejecucion sin --apply solo muestra el cambio propuesto.
"""

import argparse
import getpass
import json
import os
import sys
from urllib.parse import quote
from urllib.request import Request, urlopen


PORTAL = "https://sig.aminerals.cl/portal"
OWNER = "test_user"

ITEMS = [
    {
        "search_title": "Carga Sondajes Widget-Caja",
        "id": "db3d9286b4a348e68c18d35e09889a32",
        "title": "01 - EXPERIENCES - Carga de sondajes (herramientas estandar)",
        "snippet": "Experiencia de validacion y carga mediante el widget estandar Caja de herramientas de analisis.",
        "tags": ["Sondajes", "Experience Builder", "Analisis", "GP Tools", "AMSA"],
        "description": """<h2>Carga de sondajes - herramientas estandar</h2>
<p>Aplicacion de validacion, procesamiento y revision de sondajes que consume las herramientas de geoprocesamiento desde el widget estandar <strong>Caja de herramientas de analisis</strong>.</p>
<ul><li>Procesamiento espacial de sondajes.</li><li>Procesamiento tabular de Curvas S.</li><li>Revision de resultados antes de la publicacion.</li></ul>""",
    },
    {
        "search_title": "Carga Sondajes Widget-Dev",
        "id": "d223bb3b3c8f4c7e9834f18401ebc9a3",
        "title": "02 - EXPERIENCES - Carga de sondajes (widget desarrollado)",
        "snippet": "Experiencia con widget desarrollado para validar, visualizar, exportar y publicar resultados.",
        "tags": ["Sondajes", "Experience Builder Developer", "Widget", "GP Tools", "AMSA"],
        "description": """<h2>Carga de sondajes - widget desarrollado</h2>
<p>Aplicacion con una interfaz especializada para cargar archivos, validar su estructura, visualizar resultados temporales, exportar datos y ejecutar la publicacion controlada en la geodatabase.</p>
<p>Incluye los flujos de <strong>Sondajes</strong> y <strong>Curvas S</strong>.</p>""",
    },
    {
        "search_title": "SONDAJES",
        "id": "9664e5456bc54e6dabf77ffec29654da",
        "title": "03 - MAPA - Resultados de sondajes",
        "snippet": "Mapa web utilizado para visualizar y revisar los resultados de los procesos de sondajes.",
        "tags": ["Sondajes", "Web Map", "Collar Recomendado", "Curvas S", "AMSA"],
        "description": """<h2>Mapa de resultados de sondajes</h2>
<p>Mapa base de las experiencias de carga. Permite revisar espacialmente los resultados procesados y las capas de referencia asociadas al flujo.</p>""",
    },
    {
        "search_title": "procesador_excel",
        "id": "4b5cc625f98e43b4999a39dae1c8ac35",
        "title": "04 - WIDGET - Procesador de archivos de sondajes",
        "snippet": "Widget de Experience Builder Developer para los flujos de Sondajes y Curvas S.",
        "tags": ["Experience Builder Widget", "Sondajes", "Excel", "Curvas S", "AMSA"],
        "description": """<h2>Widget Procesador de archivos de sondajes</h2>
<p>Widget desarrollado para administrar la carga del libro maestro y archivos complementarios, validar esquemas, ejecutar GP Tools, mostrar resultados temporales y publicar resultados validados.</p>""",
    },
    {
        "search_title": "CargaSondajes",
        "id": "23db8d7a7fdf48cebaf8c9729a0d4032",
        "title": "05 - GP TOOL - Procesar sondajes",
        "snippet": "Procesa el libro maestro y el archivo de coordenadas para generar Collar_Recomendado.",
        "tags": ["GP Tool", "Sondajes", "Excel", "Coordenadas", "Collar Recomendado", "AMSA"],
        "description": """<h2>Procesamiento de sondajes</h2>
<p>Herramienta asincrona que valida y normaliza el libro maestro y el archivo SNDTGIS_ACQ, transforma las coordenadas y devuelve un FeatureSet de sondajes para revision.</p>""",
    },
    {
        "search_title": "ProcesarCurvasS",
        "id": "b36c937695fe4722932211d362208c05",
        "title": "06 - GP TOOL - Procesar Curvas S",
        "snippet": "Procesa el Master Plan y devuelve la tabla acumulada Curvas S para revision.",
        "tags": ["GP Tool", "Curvas S", "Master Plan", "Excel", "AMSA"],
        "description": """<h2>Procesamiento de Curvas S</h2>
<p>Herramienta asincrona que valida el archivo Master Plan, normaliza sus datos y devuelve un RecordSet tabular de Curvas S para revision, grafico y exportacion.</p>""",
    },
    {
        "search_title": "CargaSondajesCurvaGDB",
        "id": "c47626edfefa48b8a375ed298ed31a63",
        "title": "07 - GP TOOL - Publicar resultados validados",
        "snippet": "Publica resultados previamente validados en Collar_Recomendado o Curvas_S.",
        "tags": ["GP Tool", "Publicacion", "Geodatabase", "Collar Recomendado", "Curvas S", "AMSA"],
        "description": """<h2>Publicacion de resultados validados</h2>
<p>Herramienta de carga controlada que recibe resultados ya procesados y actualiza el destino correspondiente en la geodatabase: <strong>Collar_Recomendado</strong> o <strong>Curvas_S</strong>.</p>""",
    },
    {
        "search_title": "Estado_Actualizacion_Cargas",
        "id": "a143e48aae57415eb73c0dbb80bf3e4e",
        "title": "08 - TABLA - Estado de actualizacion de cargas",
        "snippet": "Tabla alojada con el estado vigente de las publicaciones de Sondajes y Curvas S.",
        "tags": ["Tabla alojada", "Control de cargas", "Sondajes", "Curvas S", "AMSA"],
        "description": """<h2>Estado de actualizacion de cargas</h2>
<p>Tabla alojada utilizada para informar la ultima publicacion confirmada de los procesos de <strong>Sondajes</strong> y <strong>Curvas S</strong>.</p>
<p>Registra el usuario, nombre, correo, archivo de origen, fecha de actualizacion, cantidad de registros, estado y origen de la ejecucion. Mantiene un registro vigente por proceso y no conserva historial.</p>""",
    },
    {
        "search_title": "Estado_Actualizacion_Cargas",
        "id": "3d0c649390dc429ea24023adf05a9db2",
        "title": "09 - DEFINICION DE SERVICIO - Estado de actualizacion de cargas",
        "snippet": "Definicion utilizada para publicar la tabla alojada de control de cargas.",
        "tags": ["Service Definition", "Control de cargas", "Sondajes", "Curvas S", "AMSA"],
        "description": """<h2>Definicion del servicio de control de cargas</h2>
<p>Paquete de publicacion asociado a la tabla alojada <strong>Estado de actualizacion de cargas</strong>.</p>
<p>Se conserva como respaldo tecnico de la publicacion del servicio.</p>""",
    },
]


def post(path, params):
    body = "&".join(f"{quote(str(k))}={quote(str(v))}" for k, v in params.items()).encode("utf-8")
    request = Request(f"{PORTAL}/sharing/rest/{path.lstrip('/')}", data=body)
    with urlopen(request, timeout=60) as response:
        result = json.loads(response.read().decode("utf-8"))
    if result.get("error"):
        raise RuntimeError(result["error"].get("message", str(result["error"])))
    return result


def get_token():
    token = os.environ.get("PORTAL_TOKEN", "").strip()
    if token:
        return token
    user = os.environ.get("PORTAL_USER", OWNER).strip() or OWNER
    password = os.environ.get("PORTAL_PASSWORD") or getpass.getpass(f"Contrasena de {user}: ")
    response = post("generateToken", {
        "f": "json", "username": user, "password": password,
        "client": "referer", "referer": PORTAL, "expiration": 60,
    })
    return response["token"]


def search_exact(token, title):
    response = post("search", {"f": "json", "token": token, "q": f'title:"{title}"', "num": 100})
    return [item for item in response.get("results", []) if item.get("title") == title]


def main():
    parser = argparse.ArgumentParser(description="Actualiza metadata de items de la solucion Sondajes")
    parser.add_argument("--apply", action="store_true", help="aplica los cambios; sin esta opcion solo informa")
    args = parser.parse_args()
    token = get_token()

    print("Items localizados por titulo:")
    for spec in ITEMS:
        matches = search_exact(token, spec["search_title"])
        ids = [item["id"] for item in matches]
        if spec["id"] not in ids:
            # El titulo puede haber sido actualizado en una ejecucion anterior.
            current = post(f"content/items/{spec['id']}", {"f": "json", "token": token})
            if current.get("id") != spec["id"]:
                raise RuntimeError(f"No se encontro el item esperado: {spec['search_title']}")
        print(f"- {spec['search_title']} -> {spec['id']}")

    if not args.apply:
        print("\nVista previa. Ejecute nuevamente con --apply para actualizar.")
        return 0

    print("\nActualizando metadata:")
    for spec in ITEMS:
        result = post(f"content/users/{OWNER}/items/{spec['id']}/update", {
            "f": "json", "token": token,
            "title": spec["title"], "snippet": spec["snippet"],
            "description": spec["description"], "tags": ",".join(spec["tags"]),
        })
        if not result.get("success"):
            raise RuntimeError(f"No se pudo actualizar {spec['id']}: {result}")
        print(f"OK {spec['id']}  {spec['title']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
