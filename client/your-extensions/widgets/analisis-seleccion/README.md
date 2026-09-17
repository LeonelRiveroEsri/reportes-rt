# Análisis de Selección

Widget para ArcGIS Experience Builder Developer Edition 1.10. Permite dibujar un polígono, rectángulo o círculo sobre un web map y genera un resumen de las entidades seleccionadas en sus capas visibles.

Versión 1.2.1: compatibilidad con el resultado de selección agrupado por `JimuLayerView` de Experience Builder 1.20.

Versión 1.3.0: permite apagar y encender capas seleccionadas; el mapa, los indicadores, gráficos y reportes consideran únicamente las capas activas.

Versión 1.3.1: vincula cada resultado con su `JimuLayerView` para controlar la visibilidad y el resaltado de selección de la capa real del mapa.

Versión 1.3.2: resuelve `JimuLayerView` en respuestas antiguas por matrices y reconstruye el resaltado global usando únicamente las capas activas.

Versión 1.4.0: el PDF usa muestras de la simbología del renderer del mapa e incorpora el gráfico donut de distribución.

## Funcionalidad

- Selección espacial integrada con los Data Sources de Experience Builder.
- Herramientas de polígono, rectángulo y círculo.
- Indicadores de entidades, capas con resultados y superficie dibujada.
- Gráfico de distribución y ranking por capa.
- Desglose automático por un atributo categórico representativo.
- Tarjetas navegables por capa y resaltado nativo en el mapa.
- CSV de la capa activa con protección contra fórmulas maliciosas.
- Libro Excel completo con resumen, categorías y una hoja por capa.
- Reporte PDF profesional con captura del mapa, leyenda de capas seleccionadas, indicadores, ranking y tablas paginadas.
- Estados de carga, sin resultados y error; diseño adaptable a paneles estrechos.

## Configuración

1. Agregue **Análisis de Selección** a la experiencia.
2. En sus ajustes, vincule un widget **Mapa**.
3. Elija el criterio espacial `Interseca` o `Contenida`.
4. Mantenga visibles en el web map las capas que desea consultar.

El widget analiza FeatureLayers y subcapas compatibles que Experience Builder expone mediante el mapa. La visibilidad y filtros activos de las capas se respetan durante la consulta.

El PDF incluye hasta 40 registros por capa y 300 en total para conservar legibilidad. Cuando la selección es mayor, el propio reporte lo indica: Excel contiene todas las capas y CSV contiene el detalle de la capa activa. Para proteger el navegador, Excel avisa y solicita reducir el área si la selección supera 250.000 registros o aproximadamente 2.000.000 de celdas.
