# Procesador de archivos Excel

Base de una herramienta de geoprocesamiento para ArcGIS Pro y ArcGIS Enterprise.
La herramienta recibe el libro maestro `.xlsx`, lee las hojas
`ConsolidadoSND_MLP` y `AVANCE MUESTRERA`, crea puntos 3D, los reproyecta desde
PSAD56 a WGS84 y devuelve un FeatureSet. Opcionalmente puede reemplazar la
feature class de negocio cuando se activa el parámetro de publicación.

Antes de crear geometrías, valida las coordenadas PSAD56 por expresión regular:
Este y Norte local deben tener cinco dígitos y Cota cuatro dígitos (con decimales
opcionales). Las filas que no cumplan se descartan y se informan en el resumen
JSON.

## Archivos principales

- `ProcesadorExcel.pyt`: Python Toolbox que se agrega y ejecuta desde ArcGIS Pro.
- `excel_processor.py`: lógica de lectura y conteo reutilizable.
- `tests/test_excel_processor.py`: pruebas automáticas con un Excel temporal.

## Parámetros

Entrada:

- **Archivo Excel (.xlsx)**: archivo que se cargará y procesará.
- **Publicar en Collar_Recomendado** (`GPBoolean`): `False` por defecto. Con
  `True`, respalda y trunca el destino y carga geometrías y atributos mediante
  `arcpy.da.InsertCursor` en
  `\\amssclgis09.ams.gmams.cl\CL_VPD_DEMO\CL_MLP_GEO\02_FGDB\CL_VPD_GER_Plano_Sondajes_MLP.gdb\Collar_Recomendado`.
  La ruta se comprueba solamente durante la ejecución. Si ArcGIS Server no
  puede verla, se registra una advertencia y el job sigue devolviendo el layer
  temporal.

Salidas derivadas:

- **Sondajes procesados** (`GPFeatureLayer`), capa derivada que ArcGIS Pro agrega
  al mapa y ArcGIS Server entrega como resultado espacial al cliente web.
- **Cantidad de registros** (`GPLong`).
- **Mensaje de resultado** (`GPString`).
- **Resumen JSON** (`GPString`), con nombre del archivo, hoja, filas, columnas y
  nombres de las columnas. Esta salida facilita su consumo posterior desde un
  widget.

## Probar en ArcGIS Pro

1. En el panel **Catálogo**, haga clic derecho en **Toolboxes** y seleccione
   **Add Toolbox**.
2. Seleccione `ProcesadorExcel.pyt`.
3. Abra **Procesar archivo Excel**, seleccione un `.xlsx` y ejecútelo.
4. Revise los mensajes y las tres salidas derivadas en el historial de
   geoprocesamiento.

## Publicación

Después de una ejecución correcta, abra el historial de geoprocesamiento, haga
clic derecho en el resultado y seleccione **Share As Web Tool**. Al publicarse,
el parámetro `DEFile` podrá recibir el Excel cargado por un cliente web y las
salidas serán serializables por el servicio de geoprocesamiento.

## Ejecutar pruebas

Con el ambiente Python de ArcGIS Pro:

```powershell
& 'D:\Env\arcgis-pro\python.exe' -m unittest discover -s 'D:\AMS_EXP\excel_processor_gp\tests' -v
```
