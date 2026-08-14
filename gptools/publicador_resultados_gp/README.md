# Publicador de resultados validados

Python Toolbox adicional para publicar resultados ya procesados sin volver a
leer Excel, normalizar datos ni proyectar coordenadas.

Entradas opcionales:

- `tipo_resultado`: `Sondajes` o `Curvas S`.
- `sondajes_procesados`: `GPFeatureRecordSetLayer`.
- `curvas_s_procesadas`: `GPRecordSet`.

La ejecución sin entradas es válida y no consulta ni modifica los destinos. Se
usa para generar un resultado exitoso desde ArcGIS Pro antes de publicar la Web
Tool.

La publicación valida el esquema, crea un respaldo en `scratchGDB`, trunca el
destino, inserta los registros y restaura el respaldo si falla la carga o el
conteo final.
