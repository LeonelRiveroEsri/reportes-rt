# Carga KML/KMZ SIA

Widget para ArcGIS Experience Builder Developer Edition 1.10 que gestiona la carga KML/KMZ de Centinela, la visualización del polígono y el formulario Survey123.

## Flujo

1. Valida dos correos coincidentes y un archivo `.kml` o `.kmz` de hasta 10 MB.
2. Sube el archivo al endpoint `GPServer/uploads/upload`.
3. Ejecuta de forma asíncrona la tarea configurada con `kml`, `mail`, `mail2` y `app_referer`.
4. Recupera `globalid`, `token` y `map_token`, muestra el polígono sobre las capas operacionales y abre Survey123 en modo edición.
5. Tras el envío del formulario, ejecuta la GP final para mover exclusivamente ese GlobalID a la capa productiva.

La autenticación usa la sesión activa del portal de Experience Builder. El widget no almacena credenciales administrativas.
