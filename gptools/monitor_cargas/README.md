# Estado de actualizacion de cargas

`crear_tabla_estado_cargas.py` genera una tabla vacia preparada para publicarse
como Hosted Table en ArcGIS Enterprise. No mantiene historial: cada flujo usa
una clave estable y actualiza su fila actual.

Claves previstas:

- `SONDAJES`
- `CURVAS_S`

La tabla queda vacia inicialmente. La primera ejecucion de cada flujo agrega su
fila y las ejecuciones posteriores la actualizan.

No se deben incorporar credenciales administrativas en la Python Toolbox. El
widget debe utilizar la sesion activa y enviar `USUARIO`, `NOMBRE_COMPLETO` y
`CORREO`. Para invocaciones externas estos valores pueden exponerse como
parametros opcionales de la GP Tool.
