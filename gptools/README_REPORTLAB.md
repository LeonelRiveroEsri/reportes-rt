# Migración F-MA-018 a ReportLab

`reportlab_rt.py` genera el PDF sin usar Survey123 Feature Report ni una
plantilla Word. Conserva la jerarquía cabecera → instalaciones → acciones y
ubica los adjuntos en su sección correspondiente.

Prueba local:

```powershell
D:\Env\arcgis-pro\python.exe reportlab_rt.py --json sample_report.json
```

Registro real desde ArcGIS Enterprise:

```powershell
D:\Env\arcgis-pro\python.exe reportlab_rt.py --objectid 2171
```

Se puede indicar `--output ruta\archivo.pdf` o `--item-id`.

## Esquema de entrada normalizado

Los campos de cabecera conservan sus nombres del feature service. Las claves
adicionales son `instalaciones`, `acciones`, `cierre`, `adjuntos` y
`adjuntos_cierre`. Cada adjunto acepta una ruta local o un diccionario con
`path`, `bytes` o `url`; de esta forma se puede probar el render sin conexión.

Los mapas se exportan desde Esri World Imagery usando las coordenadas UTM de
cada instalación y de la ubicación general. No se mezclan con los adjuntos
fotográficos de las tablas relacionadas.

## ArcGIS Pro Python Toolbox

Agregue `ReportesTerreno.pyt` al panel **Catálogo > Cajas de herramientas** de
ArcGIS Pro. Abra **Generar reporte de terreno**, ingrese el `ObjectID` y ejecute.
El PDF se escribe en `arcpy.env.scratchFolder` y se publica como salida derivada
de la herramienta. La herramienta también resuelve `arcpy.env.scratchGDB`, pero
no intenta guardar el PDF dentro de la geodatabase: ambos pertenecen al
workspace temporal del job de ArcGIS Server.

Después de generar la salida, la GP Tool codifica el PDF en Base64 y lo envía a
Power Automate para cargarlo en SharePoint. Los estados `CERRADO` y
`CERRADO FUERA PLAZO` se guardan en la carpeta principal; los demás se envían a
`En Tratamiento`. La URL del flujo se puede reemplazar mediante la variable de
entorno `POWER_AUTOMATE_RT_URL`. Si la carga falla, el PDF sigue disponible como
salida del job y la herramienta registra una advertencia. La salida derivada
`URL del archivo en SharePoint` siempre informa el destino solicitado al flujo,
incluso cuando SharePoint no confirma la sobrescritura.

`ObjectID` es opcional. Si se informa, la herramienta funciona en modo manual
para widgets y descarga. Si se omite, funciona en modo automático: consulta el
registro con mayor `last_edited_date` y solo lo acepta si fue editado dentro de
los últimos 15 minutos. La comparación usa epoch milliseconds UTC y no depende
de la zona horaria del servidor, Portal o navegador. La ventana se puede
configurar con `RT_AUTO_LOOKBACK_MINUTES`. Si no existe una edición reciente,
el job termina correctamente, informa que no hay reporte pendiente y deja las
salidas vacías.

La ejecución no depende de archivos locales de credenciales. Para reemplazar
la configuración sin volver a publicar, use `AMSA_PORTAL_URL`,
`AMSA_PORTAL_USER` y `AMSA_PORTAL_PASSWORD` en ArcGIS Server.

En ejecución GP, los recursos gráficos se obtienen desde la plantilla Word del
portal (`677ae2fd7beb48c7a9ab2ac65913f8e6`). La herramienta descarga el DOCX al
`scratchFolder` del job y extrae `word/media/image1.png` y
`word/media/image2.jpg`. La carpeta local `assets` permanece como respaldo para
pruebas sin servicio GP.
