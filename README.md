# reportes-rt

Widget de ArcGIS Experience Builder y GP Tool para consultar inspecciones
F-MA-018, generar el PDF de terreno y entregar enlaces al PDF y SharePoint.

## Estructura

- `client/your-extensions/widgets/reportes_rt`: fuente React/TypeScript.
- `client/dist/widgets/reportes_rt`: bundle compilado.
- `gptools`: Python Toolbox, generador ReportLab y recursos.
- `scripts/pack_netlify.py`: genera `public/exb/widgets/reportes_rt`.
- `scripts/publish_gp_tool.py`: publica la herramienta en ArcGIS Server.

## Netlify

Conecte este repositorio al sitio y configure la variable protegida
`EXB_FALLBACK_TOKEN`. `netlify.toml` ejecuta el empaquetador y publica `public`.

```text
https://<sitio>.netlify.app/exb/widgets/reportes_rt/manifest.json
```

El workflow `build-public.yml` mantiene una copia navegable sin secretos.
Netlify inyecta el token únicamente en el artefacto publicado.

## Compilar el widget

Compile dentro de Experience Builder Developer Edition 1.10:

```powershell
cd D:\AMS_EXP\client
$env:NODE_ENV='production'
$env:OUTPUT_FOLDER='./dist-prod'
& 'D:\node\node-v16\node.exe' .\node_modules\webpack\bin\webpack.js --mode production
```

Copie luego `client/dist-prod/widgets/reportes_rt` sobre
`client/dist/widgets/reportes_rt` en este repositorio.

## Publicar la GP Tool

Requiere ArcGIS Pro/Python, ArcGIS API for Python, un archivo `.ags` de
publicador y las variables `AMSA_PORTAL_URL`, `AMSA_PORTAL_USER`,
`AMSA_PORTAL_PASSWORD` y `POWER_AUTOMATE_RT_URL`.

```powershell
& 'D:\Env\arcgis-pro\python.exe' scripts\publish_gp_tool.py `
  --connection 'D:\secure\publisher.ags' `
  --object-id 2156 `
  --overwrite
```

La ejecución previa genera y envía un reporte real a SharePoint. Use un
ObjectID controlado. Para Actions, registre un runner Windows self-hosted con
etiquetas `windows` y `arcgis-pro`; configure los secretos anteriores y
`AGS_CONNECTION_FILE` en el environment `production`.

## Seguridad

No se versionan tokens, credenciales de Portal, URLs firmadas de Power
Automate ni conexiones `.ags`. Use secretos de Netlify/GitHub.
