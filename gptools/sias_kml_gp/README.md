# GP de carga KML/KMZ SIA

Fuente de `CL_CEN_ADM_SIAS_KmltolayerV2`, publicada en:

`https://sig.aminerals.cl/vector/rest/services/CL_CEN_ADM/CL_CEN_ADM_SIAS_KmltolayerV2/GPServer`

La herramienta acepta `.kml` y `.kmz`, extrae todos los elementos `Polygon` sin depender del namespace o de la carpeta XML y retorna `globalid`, `token` y `map_token`.

- `mail`, `mail2` y `app_referer` son opcionales; únicamente el archivo espacial es obligatorio.
- Si `app_referer` no se informa, retorna un token compatible con el formulario JavaScript original.
- El mismo archivo usado para construir la geometría se adjunta a la entidad temporal como `KMZ.zip`. Un KML se comprime y un KMZ se conserva byte a byte.
- La GP de ingreso transferirá ese adjunto a SharePoint como `AAAA-MM-DD-ID_SIA-KMZ.zip`.

Antes de ejecutar o publicar, configure en el entorno seguro de ArcGIS Server:

- `SIAS_PORTAL_USERNAME`
- `SIAS_PORTAL_PASSWORD`

Las credenciales no se versionan en este repositorio.
