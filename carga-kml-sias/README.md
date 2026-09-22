# Carga KML SIA

Widget para ArcGIS Experience Builder Developer Edition 1.10 que migra el formulario JavaScript de carga KML de Centinela.

## Flujo

1. Valida dos correos coincidentes y un archivo `.kml` de hasta 10 MB.
2. Sube el archivo al endpoint `GPServer/uploads/upload`.
3. Ejecuta de forma asíncrona la tarea configurada con los parámetros publicados `kml`, `mail` y `mail2`.
4. Consulta el estado hasta que el job finaliza y habilita la apertura del dashboard filtrado por correo.

La autenticación usa la sesión activa del portal de Experience Builder. No se almacenan usuarios, contraseñas ni tokens administrativos en el widget.
