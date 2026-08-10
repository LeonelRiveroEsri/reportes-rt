# Procesador de archivos Excel

Base de una herramienta de geoprocesamiento para ArcGIS Pro y ArcGIS Enterprise.
La herramienta recibe un archivo `.xlsx`, carga su primera hoja con `pandas` y
devuelve la cantidad de filas de datos. La fila de encabezados no se cuenta como
registro.

## Archivos principales

- `ProcesadorExcel.pyt`: Python Toolbox que se agrega y ejecuta desde ArcGIS Pro.
- `excel_processor.py`: lógica de lectura y conteo reutilizable.
- `tests/test_excel_processor.py`: pruebas automáticas con un Excel temporal.

## Parámetros

Entrada:

- **Archivo Excel (.xlsx)**: archivo que se cargará y procesará.

Salidas derivadas:

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
