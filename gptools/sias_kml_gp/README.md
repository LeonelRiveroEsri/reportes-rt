# GP de carga KML/KMZ SIA

Fuente de `CL_CEN_ADM_SIAS_KmltolayerV2`, publicada en:

`https://sig.aminerals.cl/vector/rest/services/CL_CEN_ADM/CL_CEN_ADM_SIAS_KmltolayerV2/GPServer`

La herramienta acepta `.kml` y `.kmz`, extrae todos los elementos `Polygon` sin depender del namespace o de la carpeta XML y retorna `globalid`, `token` y `map_token`.

Antes de ejecutar o publicar, configure en el entorno seguro de ArcGIS Server:

- `SIAS_PORTAL_USERNAME`
- `SIAS_PORTAL_PASSWORD`

Las credenciales no se versionan en este repositorio.
