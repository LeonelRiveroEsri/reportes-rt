# GP Tool Curvas_S

Procesa directamente `Master Plan MLP 2026.xlsx`, lee los cinco bloques de la
hoja `MLP_`, calcula presupuesto y real acumulados y genera 60 registros para
la tabla `Curvas_S`.

La opcion `Publicar en Curvas_S` reemplaza de forma segura la tabla ubicada en:

`\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Curvas_S`

La publicacion crea primero un respaldo temporal. Si la insercion o su
validacion falla, restaura los registros anteriores.
