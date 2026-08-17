# GP Tool Curvas_S

Procesa el mismo libro maestro usado por el flujo de sondajes. Lee la hoja
`AVANCE PROGRAMA`, detecta dinamicamente sus categorias y periodos y conserva
las categorias exactamente como aparecen en los encabezados del Excel.

La salida contiene `TIPO`, `FECHA`, `AÑO`, `MES`, `PRESUPUESTO` y `REAL`.
Para el libro de prueba se generan 180 registros: seis categorias por 30
periodos, desde septiembre de 2025 hasta febrero de 2028.

La opcion `Publicar en Curvas_S` reemplaza de forma segura la tabla ubicada en:

`\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Curvas_S`

Antes de habilitar la publicacion, la tabla destino debe incorporar el campo
`FECHA` de tipo Date y conservar los demas campos con los tipos definidos por
la herramienta. La publicacion crea primero un respaldo temporal y restaura
los registros anteriores si la insercion o su validacion falla.
