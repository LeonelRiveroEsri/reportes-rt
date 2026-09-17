import { React, AllWidgetProps } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent, loadArcGISJSAPIModules } from 'jimu-arcgis'
import { IMConfig, SpatialRelationship } from '../config'
import {
  exportLayerCsv,
  exportSelectionExcel,
  exportSelectionPdf,
  LegendSymbolStyle,
  SelectionExportContext
} from './export-utils'
import './style.scss'

type DrawTool = 'polygon' | 'rectangle' | 'circle'
type AnalysisState = 'idle' | 'drawing' | 'querying' | 'ready' | 'empty' | 'error'
type ExportFormat = 'csv' | 'excel' | 'pdf'

interface CategoryItem {
  label: string
  count: number
  percent: number
}

interface LayerSummary {
  key: string
  jimuLayerViewId: string
  layer: any
  title: string
  geometryType: string
  count: number
  percent: number
  color: string
  legendSymbol?: LegendSymbolStyle
  categoryField: string
  categoryFieldAlias: string
  categories: CategoryItem[]
  features: any[]
}

interface DistributionSlice {
  key: string
  title: string
  count: number
  percent: number
  color: string
  targetLayerKey?: string
}

const COLORS = ['#0f766e', '#2563eb', '#f59e0b', '#8b5cf6', '#db2777', '#0891b2', '#65a30d', '#ea580c']

const symbolColor = (value: any, fallback: [number, number, number]): [number, number, number] => {
  if (!value) return fallback
  const rgba = typeof value.toRgba === 'function' ? value.toRgba() : value
  if (Array.isArray(rgba) && rgba.length >= 3) return [Number(rgba[0]) || 0, Number(rgba[1]) || 0, Number(rgba[2]) || 0]
  if (typeof rgba === 'object' && rgba !== null && 'r' in rgba) return [Number(rgba.r) || 0, Number(rgba.g) || 0, Number(rgba.b) || 0]
  return fallback
}

const legendSymbolOf = (layer: any, feature: any, fallbackColor: string, geometryType: string): LegendSymbolStyle => {
  let symbol = feature?.symbol
  if (!symbol) {
    try { symbol = layer?.renderer?.getSymbol?.(feature) } catch (_) {}
  }
  if (!symbol || typeof symbol.then === 'function') symbol = layer?.renderer?.symbol
  const fallback = (() => {
    const normalized = fallbackColor.replace('#', '')
    return /^[0-9a-f]{6}$/i.test(normalized)
      ? [parseInt(normalized.slice(0, 2), 16), parseInt(normalized.slice(2, 4), 16), parseInt(normalized.slice(4, 6), 16)] as [number, number, number]
      : [15, 118, 110] as [number, number, number]
  })()
  const shape: LegendSymbolStyle['shape'] = geometryType === 'point' || geometryType === 'multipoint'
    ? 'point'
    : geometryType === 'polyline' ? 'line' : 'polygon'
  const outline = symbol?.outline
  return {
    shape,
    color: symbolColor(symbol?.color, fallback),
    outlineColor: symbolColor(outline?.color || symbol?.color, fallback),
    outlineWidth: Math.max(0.5, Number(outline?.width || symbol?.width || 1)),
    size: Math.max(3, Number(symbol?.size || 7))
  }
}

const numberFormatter = new Intl.NumberFormat('es-CL')
const decimalFormatter = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 })

interface SelectionGroup {
  jimuLayerViewId: string
  features: any[]
}

const flattenSelection = (selection: any): SelectionGroup[] => {
  if (!selection) return []
  if (Array.isArray(selection)) {
    return selection
      .map((features, index) => ({ jimuLayerViewId: `legacy-${index}`, features: Array.isArray(features) ? features.filter(Boolean) : [] }))
      .filter(group => group.features.length > 0)
  }
  if (typeof selection !== 'object') return []
  return Object.keys(selection)
    .map(jimuLayerViewId => ({
      jimuLayerViewId,
      features: Array.isArray(selection[jimuLayerViewId]) ? selection[jimuLayerViewId].filter(Boolean) : []
    }))
    .filter(group => group.features.length > 0)
}

const layerOf = (feature: any): any => feature?.layer || feature?.sourceLayer || feature?.sourceLayer?.layer

const layerKey = (layer: any, fallback: string): string => String(
  layer?.uid || layer?.url || layer?.portalItem?.id || layer?.id || fallback
)

const resolveJimuLayerView = (mapView: JimuMapView, requestedId: string, feature: any): any => {
  const views = mapView?.jimuLayerViews || {}
  if (requestedId && views[requestedId]) return views[requestedId]
  const featureLayers = [feature?.layer, feature?.sourceLayer, feature?.sourceLayer?.layer].filter(Boolean)
  const matchesLayer = (candidate: any): boolean => featureLayers.some(layer => {
    if (candidate === layer) return true
    const candidateUrl = String(candidate?.url || '')
    const layerUrl = String(layer?.url || '')
    if (candidateUrl && layerUrl && candidateUrl === layerUrl) return true
    const candidateId = String(candidate?.id || candidate?.layerId || '')
    const featureId = String(layer?.id || layer?.layerId || '')
    return Boolean(candidateId && featureId && candidateId === featureId && String(candidate?.title || '') === String(layer?.title || ''))
  })
  return Object.keys(views)
    .map(id => views[id] as any)
    .find(jimuLayerView => matchesLayer(jimuLayerView?.layer) || matchesLayer(jimuLayerView?.view?.layer))
}

const humanizeGeometry = (geometryType: string): string => {
  const labels: Record<string, string> = {
    point: 'Puntos',
    multipoint: 'Multipuntos',
    polyline: 'Líneas',
    polygon: 'Polígonos',
    mesh: 'Mallas'
  }
  return labels[geometryType] || 'Entidades'
}

const getFieldValue = (feature: any, field: any): string => {
  const rawValue = feature?.attributes?.[field.name]
  if (rawValue === null || rawValue === undefined || rawValue === '') return 'Sin información'
  const codedValues = field?.domain?.codedValues
  if (Array.isArray(codedValues)) {
    const match = codedValues.find((item: any) => String(item.code) === String(rawValue))
    if (match) return String(match.name)
  }
  return String(rawValue)
}

const inferredFields = (features: any[]): any[] => {
  const attributes = features[0]?.attributes || {}
  return Object.keys(attributes).map(name => ({
    name,
    alias: name,
    type: typeof attributes[name] === 'string' ? 'string' : 'unknown'
  }))
}

const chooseCategoryBreakdown = (features: any[], maxCategories: number): {
  field: string
  alias: string
  categories: CategoryItem[]
} => {
  if (!features.length) return { field: '', alias: '', categories: [] }
  const layer = layerOf(features[0])
  const fields = Array.isArray(layer?.fields) ? layer.fields : inferredFields(features)
  const blocked = /(^|_)(objectid|fid|oid|globalid|shape|shape_length|shape_area)($|_)/i
  const candidates = fields.filter((field: any) => {
    const type = String(field?.type || '').toLowerCase()
    return !blocked.test(String(field?.name || '')) &&
      (type === 'string' || type === 'small-integer' || type === 'integer' || Array.isArray(field?.domain?.codedValues))
  })

  let best: { field: any, counts: Map<string, number>, score: number } = null
  candidates.forEach((field: any) => {
    const counts = new Map<string, number>()
    features.forEach(feature => {
      const value = getFieldValue(feature, field)
      counts.set(value, (counts.get(value) || 0) + 1)
    })
    const uniqueCount = counts.size
    if (uniqueCount < 2) return
    const hasDomain = Array.isArray(field?.domain?.codedValues)
    const practicalLimit = Math.max(12, Math.ceil(Math.sqrt(features.length) * 2))
    if (!hasDomain && uniqueCount > practicalLimit) return
    const score = (hasDomain ? -100 : 0) + uniqueCount
    if (!best || score < best.score) best = { field, counts, score }
  })

  if (!best) return { field: '', alias: '', categories: [] }
  const ordered = Array.from(best.counts.entries()).sort((left, right) => right[1] - left[1])
  const directLimit = ordered.length > maxCategories ? Math.max(1, maxCategories - 1) : maxCategories
  const visible = ordered.slice(0, directLimit)
  const remainder = ordered.slice(directLimit).reduce((sum, item) => sum + item[1], 0)
  if (remainder > 0) visible.push(['Otras categorías', remainder])
  return {
    field: best.field.name,
    alias: best.field.alias || best.field.name,
    categories: visible.map(([label, count]) => ({
      label,
      count,
      percent: features.length ? (count / features.length) * 100 : 0
    }))
  }
}

const buildSummaries = (selection: any, maxCategories: number, mapView?: JimuMapView): LayerSummary[] => {
  const groups = flattenSelection(selection)
  const byLayer = new Map<string, { jimuLayerViewId: string, layer: any, features: any[] }>()
  groups.forEach((group, index) => {
    const jimuLayerView = resolveJimuLayerView(mapView, group.jimuLayerViewId, group.features[0])
    const layer = jimuLayerView?.layer || layerOf(group.features[0])
    const resolvedJimuLayerViewId = jimuLayerView?.id || group.jimuLayerViewId
    const key = resolvedJimuLayerViewId || layerKey(layer, `layer-${index}`)
    const current = byLayer.get(key)
    if (current) current.features.push(...group.features)
    else byLayer.set(key, { jimuLayerViewId: resolvedJimuLayerViewId, layer, features: [...group.features] })
  })
  const total = Array.from(byLayer.values()).reduce((sum, item) => sum + item.features.length, 0)
  return Array.from(byLayer.entries())
    .map(([key, item]) => ({ key, ...item }))
    .sort((left, right) => right.features.length - left.features.length)
    .map((item, index) => {
      const category = chooseCategoryBreakdown(item.features, maxCategories)
      const geometryType = item.layer?.geometryType || item.features[0]?.geometry?.type || ''
      return {
        key: item.key,
        jimuLayerViewId: item.jimuLayerViewId,
        layer: item.layer,
        title: String(item.layer?.title || item.layer?.name || `Capa ${index + 1}`),
        geometryType,
        count: item.features.length,
        percent: total ? (item.features.length / total) * 100 : 0,
        color: COLORS[index % COLORS.length],
        legendSymbol: legendSymbolOf(item.layer, item.features[0], COLORS[index % COLORS.length], geometryType),
        categoryField: category.field,
        categoryFieldAlias: category.alias,
        categories: category.categories,
        features: item.features
      }
    })
}

const formatArea = (squareMeters: number): string => {
  if (!Number.isFinite(squareMeters) || squareMeters <= 0) return '—'
  if (squareMeters < 10000) return `${numberFormatter.format(Math.round(squareMeters))} m²`
  if (squareMeters < 1000000) return `${decimalFormatter.format(squareMeters / 10000)} ha`
  return `${decimalFormatter.format(squareMeters / 1000000)} km²`
}

const SvgIcon = ({ children, viewBox = '0 0 24 24' }: { children: React.ReactNode, viewBox?: string }) =>
  <svg viewBox={viewBox} aria-hidden="true" focusable="false">{children}</svg>

const ToolIcon = ({ tool }: { tool: DrawTool }) => {
  if (tool === 'rectangle') return <SvgIcon><rect x="4" y="5" width="16" height="14" rx="1" /></SvgIcon>
  if (tool === 'circle') return <SvgIcon><circle cx="12" cy="12" r="8" /></SvgIcon>
  return <SvgIcon><path d="m5 7 6-3 8 5-2 10-9 1-4-7 1-6Z" /></SvgIcon>
}

const DonutChart = ({ slices, total }: { slices: DistributionSlice[], total: number }) => {
  let offset = 0
  return <div className="selection-analysis__donut-wrap">
    <svg className="selection-analysis__donut" viewBox="0 0 120 120" role="img" aria-label={`Distribución de ${total} entidades por capa`}>
      <circle className="selection-analysis__donut-base" cx="60" cy="60" r="48" pathLength="100" />
      {slices.map(slice => {
        const currentOffset = offset
        offset += slice.percent
        return <circle
          key={slice.key}
          className="selection-analysis__donut-segment"
          cx="60"
          cy="60"
          r="48"
          pathLength="100"
          stroke={slice.color}
          strokeDasharray={`${slice.percent} ${100 - slice.percent}`}
          strokeDashoffset={-currentOffset}
        />
      })}
    </svg>
    <div className="selection-analysis__donut-value"><strong>{numberFormatter.format(total)}</strong><span>entidades</span></div>
  </div>
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [jimuMapView, setJimuMapView] = React.useState<JimuMapView>(null)
  const [analysisState, setAnalysisState] = React.useState<AnalysisState>('idle')
  const [activeTool, setActiveTool] = React.useState<DrawTool>(null)
  const [results, setResults] = React.useState<LayerSummary[]>([])
  const [disabledLayerKeys, setDisabledLayerKeys] = React.useState<string[]>([])
  const [relationship, setRelationship] = React.useState<SpatialRelationship>(props.config.spatialRelationship || 'intersects')
  const [focusedLayerKey, setFocusedLayerKey] = React.useState('')
  const [areaSquareMeters, setAreaSquareMeters] = React.useState<number>(null)
  const [error, setError] = React.useState('')
  const [layerCount, setLayerCount] = React.useState(0)
  const [initializingSketch, setInitializingSketch] = React.useState(false)
  const [exporting, setExporting] = React.useState<ExportFormat>(null)
  const [exportMessage, setExportMessage] = React.useState('')
  const [exportError, setExportError] = React.useState('')
  const sketchRef = React.useRef<any>(null)
  const sketchPromiseRef = React.useRef<Promise<any>>(null)
  const sketchHandleRef = React.useRef<any>(null)
  const graphicsLayerRef = React.useRef<any>(null)
  const jimuMapViewRef = React.useRef<JimuMapView>(null)
  const analysisTokenRef = React.useRef(0)
  const lastAnalysisGraphicRef = React.useRef<any>(null)
  const mountedRef = React.useRef(true)

  const activeResults = React.useMemo(() => {
    const enabled = results.filter(result => disabledLayerKeys.indexOf(result.key) < 0)
    const enabledTotal = enabled.reduce((sum, result) => sum + result.count, 0)
    return enabled.map(result => ({ ...result, percent: enabledTotal ? (result.count / enabledTotal) * 100 : 0 }))
  }, [disabledLayerKeys, results])
  const total = React.useMemo(() => activeResults.reduce((sum, result) => sum + result.count, 0), [activeResults])
  const distributionSlices = React.useMemo<DistributionSlice[]>(() => {
    const directResults = activeResults.length > 6 ? activeResults.slice(0, 5) : activeResults
    const slices: DistributionSlice[] = directResults.map(result => ({
      key: result.key,
      title: result.title,
      count: result.count,
      percent: result.percent,
      color: result.color,
      targetLayerKey: result.key
    }))
    if (activeResults.length > 6) {
      const remaining = activeResults.slice(5)
      const remainingCount = remaining.reduce((sum, result) => sum + result.count, 0)
      slices.push({
        key: '__other-layers__',
        title: `Otras ${remaining.length} capas`,
        count: remainingCount,
        percent: total ? (remainingCount / total) * 100 : 0,
        color: '#94a3b8'
      })
    }
    return slices
  }, [activeResults, total])
  const focusedResult = activeResults.find(result => result.key === focusedLayerKey) || activeResults[0]
  const maxCategories = Math.max(3, Math.min(8, props.config.maxCategories || 5))

  const countVisibleLayers = React.useCallback((mapView: JimuMapView): number => {
    if (!mapView?.jimuLayerViews) return 0
    return Object.keys(mapView.jimuLayerViews).filter(id => {
      const jimuLayerView = mapView.jimuLayerViews[id] as any
      const layer = jimuLayerView?.layer
      if (!layer || layer.visible === false || typeof jimuLayerView.selectRecordsByQuery !== 'function') return false
      const parents = mapView.getParentJimuLayerViews?.(id) || []
      return !parents.some((parent: any) => parent?.layer?.visible === false)
    }).length
  }, [])

  const releaseSketch = React.useCallback((mapView?: JimuMapView) => {
    analysisTokenRef.current += 1
    sketchPromiseRef.current = null
    sketchHandleRef.current?.remove?.()
    sketchHandleRef.current = null
    try { sketchRef.current?.cancel?.() } catch (_) {}
    sketchRef.current?.destroy?.()
    sketchRef.current = null
    const graphicsLayer = graphicsLayerRef.current
    graphicsLayerRef.current = null
    if (graphicsLayer && mapView?.view?.map) {
      try { mapView.view.map.remove(graphicsLayer) } catch (_) {}
    }
  }, [])

  const resetOutput = React.useCallback((removeDrawing: boolean) => {
    analysisTokenRef.current += 1
    try { jimuMapViewRef.current?.clearSelectedFeatures?.() } catch (_) {}
    if (removeDrawing) graphicsLayerRef.current?.removeAll?.()
    if (removeDrawing) lastAnalysisGraphicRef.current = null
    setResults([])
    setDisabledLayerKeys([])
    setFocusedLayerKey('')
    setAreaSquareMeters(null)
    setError('')
    setExportMessage('')
    setExportError('')
    setAnalysisState('idle')
  }, [])

  const calculateArea = React.useCallback(async (geometry: any): Promise<number> => {
    if (!geometry || geometry.type !== 'polygon') return null
    try {
      const [geometryEngine] = await loadArcGISJSAPIModules(['esri/geometry/geometryEngine'])
      let area: number
      if (geometry.spatialReference?.isGeographic || geometry.spatialReference?.isWebMercator) {
        area = geometryEngine.geodesicArea(geometry, 'square-meters')
      } else {
        area = geometryEngine.planarArea(geometry, 'square-meters')
      }
      return Math.abs(area)
    } catch (_) {
      return null
    }
  }, [])

  const analyzeGraphic = React.useCallback(async (graphic: any, relationshipOverride?: SpatialRelationship) => {
    const mapView = jimuMapViewRef.current
    if (!mapView || !graphic) return
    lastAnalysisGraphicRef.current = graphic
    const selectedRelationship = relationshipOverride || relationship
    const token = ++analysisTokenRef.current
    setAnalysisState('querying')
    setError('')
    setResults([])
    setDisabledLayerKeys([])
    setFocusedLayerKey('')
    setAreaSquareMeters(null)
    try {
      setLayerCount(countVisibleLayers(mapView))
      mapView.clearSelectedFeatures()
      const [selection, area] = await Promise.all([
        mapView.selectFeaturesByGraphic(graphic, selectedRelationship),
        calculateArea(graphic.geometry)
      ])
      if (!mountedRef.current || token !== analysisTokenRef.current) return
      const summaries = buildSummaries(selection, maxCategories, mapView)
      setAreaSquareMeters(area)
      setResults(summaries)
      setDisabledLayerKeys([])
      setFocusedLayerKey(summaries[0]?.key || '')
      setAnalysisState(summaries.length ? 'ready' : 'empty')
    } catch (exception) {
      if (!mountedRef.current || token !== analysisTokenRef.current) return
      const message = exception instanceof Error ? exception.message : 'No fue posible completar la consulta espacial.'
      setError(message)
      setAnalysisState('error')
    }
  }, [calculateArea, countVisibleLayers, maxCategories, relationship])

  const analyzeGraphicRef = React.useRef(analyzeGraphic)
  analyzeGraphicRef.current = analyzeGraphic

  const ensureSketch = React.useCallback(async (): Promise<any> => {
    const mapView = jimuMapViewRef.current
    if (!mapView?.view || mapView.view.type !== '2d') return null
    if (sketchRef.current && sketchRef.current.view === mapView.view) return sketchRef.current
    if (sketchPromiseRef.current) return sketchPromiseRef.current
    releaseSketch(mapView)
    const capturedView = mapView.view
    setInitializingSketch(true)
    const initialization = (async () => {
      const [SketchViewModel, GraphicsLayer] = await loadArcGISJSAPIModules([
        'esri/widgets/Sketch/SketchViewModel',
        'esri/layers/GraphicsLayer'
      ])
      if (!mountedRef.current || jimuMapViewRef.current?.view !== capturedView) return null
      const layerId = `selection-analysis-${props.id}`
      const previousLayer = capturedView.map.findLayerById?.(layerId)
      if (previousLayer) capturedView.map.remove(previousLayer)
      const graphicsLayer = new GraphicsLayer({
        id: layerId,
        title: 'Área de análisis',
        listMode: 'hide'
      })
      capturedView.map.add(graphicsLayer)
      graphicsLayerRef.current = graphicsLayer
      const sketch = new SketchViewModel({
        view: capturedView,
        layer: graphicsLayer,
        updateOnGraphicClick: false,
        polygonSymbol: {
          type: 'simple-fill',
          color: [15, 118, 110, 0.12],
          outline: { color: [15, 118, 110, 1], width: 2 }
        }
      })
      sketchHandleRef.current = sketch.on('create', (event: any) => {
        if (event.state === 'complete') {
          setActiveTool(null)
          void analyzeGraphicRef.current(event.graphic)
        } else if (event.state === 'cancel') {
          setActiveTool(null)
          setAnalysisState(current => current === 'drawing' ? 'idle' : current)
        }
      })
      sketchRef.current = sketch
      return sketch
    })()
    sketchPromiseRef.current = initialization
    try {
      return await initialization
    } finally {
      const isCurrentInitialization = sketchPromiseRef.current === initialization
      if (isCurrentInitialization) sketchPromiseRef.current = null
      if (mountedRef.current && (isCurrentInitialization || !sketchPromiseRef.current)) setInitializingSketch(false)
    }
  }, [props.id, releaseSketch])

  const startDrawing = async (tool: DrawTool) => {
    if (!jimuMapView?.view || analysisState === 'querying' || initializingSketch || exporting) return
    if (jimuMapView.view.type !== '2d') {
      setError('Este widget requiere un web map 2D.')
      setAnalysisState('error')
      return
    }
    try {
      const sketch = await ensureSketch()
      if (!sketch) throw new Error('No fue posible iniciar la herramienta de dibujo.')
      analysisTokenRef.current += 1
      jimuMapView.clearSelectedFeatures()
      sketch.cancel()
      graphicsLayerRef.current?.removeAll?.()
      setResults([])
      setDisabledLayerKeys([])
      setFocusedLayerKey('')
      setAreaSquareMeters(null)
      setError('')
      setActiveTool(tool)
      setAnalysisState('drawing')
      sketch.create(tool)
    } catch (exception) {
      setActiveTool(null)
      setError(exception instanceof Error ? exception.message : 'No fue posible iniciar el dibujo.')
      setAnalysisState('error')
    }
  }

  const analyzeVisibleExtent = async () => {
    const mapView = jimuMapViewRef.current
    if (!mapView?.view || mapView.view.type !== '2d' || analysisState === 'querying' || initializingSketch || exporting) return
    try {
      const sketch = await ensureSketch()
      if (!sketch || jimuMapViewRef.current !== mapView) throw new Error('No fue posible preparar el análisis del mapa.')
      const [Graphic, Polygon] = await loadArcGISJSAPIModules(['esri/Graphic', 'esri/geometry/Polygon'])
      if (!mountedRef.current || jimuMapViewRef.current !== mapView) return
      analysisTokenRef.current += 1
      mapView.clearSelectedFeatures()
      sketch.cancel()
      graphicsLayerRef.current?.removeAll?.()
      const geometry = Polygon.fromExtent(mapView.view.extent.clone())
      const graphic = new Graphic({
        geometry,
        symbol: {
          type: 'simple-fill',
          color: [15, 118, 110, 0.08],
          outline: { color: [15, 118, 110, 0.9], width: 2 }
        }
      })
      graphicsLayerRef.current?.add?.(graphic)
      setActiveTool(null)
      void analyzeGraphicRef.current(graphic)
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'No fue posible analizar la extensión visible.')
      setAnalysisState('error')
    }
  }

  const clearSelection = () => {
    try { sketchRef.current?.cancel?.() } catch (_) {}
    setActiveTool(null)
    resetOutput(true)
  }

  const changeRelationship = (value: SpatialRelationship) => {
    if (value === relationship || analysisState === 'querying' || exporting) return
    setRelationship(value)
    const graphic = lastAnalysisGraphicRef.current
    if (graphic && (analysisState === 'ready' || analysisState === 'empty')) {
      void analyzeGraphicRef.current(graphic, value)
    }
  }

  const toggleResultLayer = (result: LayerSummary) => {
    if (exporting) return
    const isDisabled = disabledLayerKeys.indexOf(result.key) >= 0
    const nextDisabledKeys = isDisabled
      ? disabledLayerKeys.filter(key => key !== result.key)
      : [...disabledLayerKeys, result.key]
    const mapView = jimuMapViewRef.current
    try { mapView?.clearSelectedFeatures?.() } catch (_) {}
    results.forEach(item => {
      const visible = nextDisabledKeys.indexOf(item.key) < 0
      const jimuLayerView = resolveJimuLayerView(mapView, item.jimuLayerViewId, item.features[0])
      const layers = [item.layer, jimuLayerView?.layer, jimuLayerView?.view?.layer, layerOf(item.features[0])]
      layers.forEach(layer => {
        if (layer && 'visible' in layer) layer.visible = visible
      })
      if (jimuLayerView?.view && 'visible' in jimuLayerView.view) jimuLayerView.view.visible = visible
      const dataSource = jimuLayerView?.getLayerDataSource?.()
      if (!visible) {
        dataSource?.clearSelection?.()
        return
      }
      const featureLayer = layerOf(item.features[0])
      const objectIdField = String(item.layer?.objectIdField || jimuLayerView?.layer?.objectIdField || featureLayer?.objectIdField || '')
      const ids = item.features
        .map(feature => feature?.getObjectId?.() ?? (objectIdField ? feature?.attributes?.[objectIdField] : null))
        .filter(value => value !== null && value !== undefined)
        .map(String)
      if (ids.length) jimuLayerView?.selectFeaturesByIds?.(ids)
    })
    setDisabledLayerKeys(nextDisabledKeys)
    setExportMessage('')
    setExportError('')
    if (!isDisabled && focusedLayerKey === result.key) {
      const next = results.find(item => item.key !== result.key && disabledLayerKeys.indexOf(item.key) < 0)
      setFocusedLayerKey(next?.key || '')
    } else if (isDisabled && !focusedLayerKey) {
      setFocusedLayerKey(result.key)
    }
  }

  const createExportContext = (generatedAt = new Date()): SelectionExportContext => {
    const mapView = jimuMapViewRef.current
    const map = mapView?.view?.map as any
    const scale = Number((mapView?.view as any)?.scale)
    return {
      reportTitle: 'Reporte de selección espacial',
      generatedAt,
      mapTitle: String(map?.portalItem?.title || map?.title || 'Web map de análisis'),
      basemapTitle: String(map?.basemap?.title || 'Mapa base del web map'),
      scaleLabel: Number.isFinite(scale) && scale > 0 ? `Escala 1:${numberFormatter.format(Math.round(scale))}` : 'Escala no disponible',
      relationshipLabel: relationship === 'contains' ? 'Entidades contenidas' : 'Entidades que intersectan',
      total,
      areaLabel: formatArea(areaSquareMeters),
      layers: activeResults
    }
  }

  const beginExport = async (format: ExportFormat, action: () => void | Promise<void>) => {
    if (exporting || analysisState !== 'ready') return
    setExporting(format)
    setExportMessage('')
    setExportError('')
    if (format === 'pdf') await new Promise<void>(resolve => window.setTimeout(resolve, 30))
    try {
      await action()
    } catch (exception) {
      setExportError(exception instanceof Error ? exception.message : 'No fue posible generar el archivo solicitado.')
    } finally {
      if (mountedRef.current) setExporting(null)
    }
  }

  const handleExportCsv = () => beginExport('csv', () => {
    if (!focusedResult) throw new Error('Seleccione una capa para exportar a CSV.')
    const count = exportLayerCsv(focusedResult)
    setExportMessage(`CSV generado para “${focusedResult.title}” con ${numberFormatter.format(count)} registros.`)
  })

  const handleExportExcel = () => beginExport('excel', () => {
    const count = exportSelectionExcel(createExportContext())
    setExportMessage(`Libro Excel generado con ${numberFormatter.format(count)} registros y ${activeResults.length} capas activas.`)
  })

  const handleExportPdf = () => beginExport('pdf', async () => {
    const mapView = jimuMapViewRef.current
    if (!mapView?.view) throw new Error('El mapa no está disponible para crear el reporte.')
    const generatedAt = new Date()
    let mapImageDataUrl = ''
    try {
      const view = mapView.view as any
      const waitStarted = Date.now()
      while (view.updating && Date.now() - waitStarted < 5000) {
        await new Promise<void>(resolve => window.setTimeout(resolve, 100))
      }
      await new Promise<void>(resolve => window.requestAnimationFrame(() => resolve()))
      const viewWidth = Math.max(1, Number(view.width) || 1200)
      const viewHeight = Math.max(1, Number(view.height) || 675)
      const screenshotScale = Math.min(2, 1600 / Math.max(viewWidth, viewHeight))
      const screenshot = await view.takeScreenshot({
        width: Math.max(1, Math.round(viewWidth * screenshotScale)),
        height: Math.max(1, Math.round(viewHeight * screenshotScale)),
        format: 'png',
        ignorePadding: true
      })
      mapImageDataUrl = screenshot?.dataUrl || ''
    } catch (_) {}
    const exported = exportSelectionPdf({ ...createExportContext(generatedAt), mapImageDataUrl })
    const mapNote = exported.mapIncluded ? 'incluye la captura del mapa' : 'se generó sin captura del mapa'
    const detailNote = exported.detailTruncated ? '; el anexo fue resumido: Excel contiene toda la selección y CSV la capa activa' : ''
    setExportMessage(`Reporte PDF generado: ${mapNote}${detailNote}.`)
  })

  React.useEffect(() => {
    jimuMapViewRef.current = jimuMapView
    setActiveTool(null)
    setResults([])
    setDisabledLayerKeys([])
    setFocusedLayerKey('')
    setAreaSquareMeters(null)
    setError('')
    setExportMessage('')
    setExportError('')
    setAnalysisState('idle')
    setRelationship(props.config.spatialRelationship || 'intersects')
    if (!jimuMapView) {
      setLayerCount(0)
      return
    }
    const currentMapView = jimuMapView
    void currentMapView.whenJimuMapViewLoaded().then(() => {
      if (!mountedRef.current || jimuMapViewRef.current !== currentMapView) return
      setLayerCount(countVisibleLayers(currentMapView))
    })
    return () => {
      try { currentMapView.clearSelectedFeatures() } catch (_) {}
      releaseSketch(currentMapView)
    }
  }, [countVisibleLayers, jimuMapView, props.config.spatialRelationship, releaseSketch])

  React.useEffect(() => () => {
    mountedRef.current = false
  }, [])

  const unconfigured = !props.useMapWidgetIds?.length
  const isMapReady = Boolean(jimuMapView?.view)
  const maxCount = activeResults[0]?.count || 1

  return <div className="selection-analysis">
    {props.useMapWidgetIds?.[0] && <JimuMapViewComponent
      useMapWidgetId={props.useMapWidgetIds[0]}
      onActiveViewChange={setJimuMapView}
    />}

    <header className="selection-analysis__header">
      <div className="selection-analysis__brand">
        <span className="selection-analysis__brand-icon"><SvgIcon><path d="m4 6 6-3 5 3 5-2v14l-6 3-5-3-5 2V6Z" /><path d="m10 3-1 15m6-12-1 15" /></SvgIcon></span>
        <div><span>ANÁLISIS ESPACIAL</span><h2>Resumen de selección</h2></div>
      </div>
      <span className={`selection-analysis__status ${isMapReady ? 'is-ready' : ''}`}><i></i>{isMapReady ? 'Mapa conectado' : 'Sin conexión'}</span>
    </header>

    {unconfigured && <div className="selection-analysis__empty selection-analysis__empty--setup">
      <span className="selection-analysis__empty-icon"><SvgIcon><path d="M4 18V6l5-3 6 3 5-2v12l-5 3-6-3-5 2Z" /><path d="m9 3v13m6-10v13" /></SvgIcon></span>
      <strong>Vincule un web map</strong>
      <p>Abra los ajustes del widget y seleccione el widget Mapa que desea analizar.</p>
    </div>}

    {!unconfigured && <>
      <section className="selection-analysis__draw-panel">
        <div className="selection-analysis__section-heading">
          <div><span>PASO 1</span><strong>Dibuje el área de interés</strong></div>
          {(results.length > 0 || activeTool) && <button type="button" className="selection-analysis__clear-link" disabled={Boolean(exporting)} onClick={clearSelection}>{activeTool ? 'Cancelar' : 'Limpiar'}</button>}
        </div>
        <div className="selection-analysis__relationship" role="group" aria-label="Criterio de selección espacial">
          <span>Criterio</span>
          <div>
            <button type="button" className={relationship === 'intersects' ? 'is-active' : ''} aria-pressed={relationship === 'intersects'} disabled={analysisState === 'querying' || Boolean(exporting)} onClick={() => changeRelationship('intersects')}>Interseca</button>
            <button type="button" className={relationship === 'contains' ? 'is-active' : ''} aria-pressed={relationship === 'contains'} disabled={analysisState === 'querying' || Boolean(exporting)} onClick={() => changeRelationship('contains')}>Contenida</button>
          </div>
        </div>
        <div className="selection-analysis__tools" role="toolbar" aria-label="Herramientas de selección">
          {([
            ['polygon', 'Polígono'],
            ['rectangle', 'Rectángulo'],
            ['circle', 'Círculo']
          ] as Array<[DrawTool, string]>).map(([tool, label]) => <button
            type="button"
            key={tool}
            className={activeTool === tool ? 'is-active' : ''}
            disabled={!isMapReady || analysisState === 'querying' || initializingSketch || Boolean(exporting)}
            aria-label={`Dibujar ${label.toLowerCase()}`}
            aria-pressed={activeTool === tool}
            onClick={() => { void startDrawing(tool) }}
          >
            <span><ToolIcon tool={tool} /></span>
            <strong>{label}</strong>
          </button>)}
        </div>
        <div className="selection-analysis__scope">
          <span><i></i>{layerCount ? `${layerCount} capas visibles disponibles` : 'Se consultarán las capas visibles'}</span>
          <small>{relationship === 'contains' ? 'Criterio: contenida' : 'Criterio: interseca'}</small>
        </div>
        <button
          type="button"
          className="selection-analysis__extent-button"
          disabled={!isMapReady || analysisState === 'querying' || initializingSketch || Boolean(exporting)}
          onClick={() => { void analyzeVisibleExtent() }}
        >
          <span><SvgIcon><path d="M5 9V5h4M15 5h4v4M19 15v4h-4M9 19H5v-4" /><path d="M8 12h8" /></SvgIcon></span>
          Analizar la extensión visible
        </button>
      </section>

      {analysisState === 'drawing' && <div className="selection-analysis__instruction" role="status">
        <span><SvgIcon><path d="M12 3v18M3 12h18" /></SvgIcon></span>
        <div><strong>Dibuje sobre el mapa</strong><p>Complete la geometría para ejecutar el análisis.</p></div>
      </div>}

      {analysisState === 'querying' && <div className="selection-analysis__loading" role="status" aria-live="polite">
        <div className="selection-analysis__loading-line"><i></i></div>
        <div><span className="selection-analysis__spinner"></span><strong>Analizando selección…</strong></div>
        <p>Consultando las capas visibles y preparando los indicadores.</p>
      </div>}

      {analysisState === 'error' && <div className="selection-analysis__alert" role="alert">
        <span>!</span><div><strong>No se pudo completar el análisis</strong><p>{error}</p></div>
        <button type="button" aria-label="Cerrar mensaje" onClick={() => { setError(''); setAnalysisState('idle') }}>×</button>
      </div>}

      {analysisState === 'empty' && <div className="selection-analysis__empty" role="status" aria-live="polite">
        <span className="selection-analysis__empty-icon"><SvgIcon><path d="M4 5h16v14H4z" /><path d="m7 15 3-4 3 2 4-5" /></SvgIcon></span>
        <strong>Sin entidades en el área</strong>
        <p>Pruebe con un dibujo más amplio o revise que las capas estén visibles y contengan datos.</p>
        <button type="button" onClick={() => { void startDrawing('rectangle') }}>Dibujar de nuevo</button>
      </div>}

      {analysisState === 'idle' && isMapReady && <div className="selection-analysis__welcome">
        <div className="selection-analysis__welcome-graphic">
          <span><SvgIcon><path d="M4 5h16v14H4z" /><path d="m7 15 3-4 3 2 4-5" /></SvgIcon></span>
          <i></i><i></i><i></i>
        </div>
        <strong>Convierta una selección en información</strong>
        <p>Elija una herramienta, dibuje en el mapa y obtenga un resumen comparativo de todas las capas alcanzadas.</p>
      </div>}

      {analysisState === 'ready' && <section className="selection-analysis__results" aria-label="Resultados de la selección">
        <div className="selection-analysis__sr-only" role="status" aria-live="polite" aria-atomic="true">Selección activa: {numberFormatter.format(total)} entidades en {activeResults.length} capas.</div>
        <section className="selection-analysis__kpis" aria-label="Indicadores principales">
          <article><span className="is-teal"><SvgIcon><path d="M4 7h16M7 4v16m10-16v16M4 12h16M4 17h16" /></SvgIcon></span><div><strong>{numberFormatter.format(total)}</strong><small>Entidades</small></div></article>
          <article><span className="is-blue"><SvgIcon><path d="m4 8 8-4 8 4-8 4-8-4Z" /><path d="m4 12 8 4 8-4m-16 4 8 4 8-4" /></SvgIcon></span><div><strong>{activeResults.length}</strong><small>Capas activas</small></div></article>
          <article><span className="is-amber"><SvgIcon><path d="M5 5h14v14H5z" /><path d="M9 9h6v6H9z" /></SvgIcon></span><div><strong>{formatArea(areaSquareMeters)}</strong><small>Superficie</small></div></article>
        </section>

        <section className="selection-analysis__export-card" aria-label="Exportar resultados" aria-busy={Boolean(exporting)}>
          <div className="selection-analysis__section-heading">
            <div><span>EXPORTAR</span><strong>Descargar resultados</strong></div>
            <small>Datos y reporte</small>
          </div>
          <div className="selection-analysis__export-actions">
            <button type="button" className="is-csv" disabled={Boolean(exporting) || !focusedResult} onClick={() => { void handleExportCsv() }}>
              <span className="selection-analysis__export-icon">{exporting === 'csv' ? <i className="selection-analysis__spinner"></i> : <SvgIcon><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h7M9 16h7" /></SvgIcon>}</span>
              <span><strong>CSV</strong><small>Capa activa</small></span>
            </button>
            <button type="button" className="is-excel" disabled={Boolean(exporting) || activeResults.length === 0} onClick={() => { void handleExportExcel() }}>
              <span className="selection-analysis__export-icon">{exporting === 'excel' ? <i className="selection-analysis__spinner"></i> : <SvgIcon><path d="M5 4h14v16H5zM5 9h14M10 9v11" /><path d="m7 12 2 5m0-5-2 5" /></SvgIcon>}</span>
              <span><strong>Excel</strong><small>Toda la selección</small></span>
            </button>
            <button type="button" className="is-pdf" disabled={Boolean(exporting) || activeResults.length === 0} onClick={() => { void handleExportPdf() }}>
              <span className="selection-analysis__export-icon">{exporting === 'pdf' ? <i className="selection-analysis__spinner"></i> : <SvgIcon><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 13h6M9 17h4" /></SvgIcon>}</span>
              <span><strong>PDF</strong><small>Reporte</small></span>
            </button>
          </div>
          <p className="selection-analysis__export-context">CSV exportará <strong>{focusedResult?.title}</strong>. Excel y PDF incluyen solo las capas activas.</p>
          {exportMessage && <div className="selection-analysis__export-feedback is-success" role="status"><span>✓</span>{exportMessage}</div>}
          {exportError && <div className="selection-analysis__export-feedback is-error" role="alert"><span>!</span>{exportError}</div>}
        </section>

        <section className="selection-analysis__chart-card">
          <div className="selection-analysis__section-heading">
            <div><span>DISTRIBUCIÓN</span><strong>Entidades por capa</strong></div>
            <small>{activeResults.length} activas</small>
          </div>
          <div className="selection-analysis__distribution">
            <DonutChart slices={distributionSlices} total={total} />
            <div className="selection-analysis__legend">
              {distributionSlices.map(slice => <button
                type="button"
                key={slice.key}
                disabled={!slice.targetLayerKey}
                aria-pressed={slice.targetLayerKey ? focusedResult?.key === slice.targetLayerKey : undefined}
                aria-controls={slice.targetLayerKey ? `${props.id}-layer-detail` : undefined}
                onClick={() => { if (slice.targetLayerKey) setFocusedLayerKey(slice.targetLayerKey) }}
              >
                <i style={{ backgroundColor: slice.color }}></i><span title={slice.title}>{slice.title}</span><strong>{decimalFormatter.format(slice.percent)}%</strong>
              </button>)}
            </div>
          </div>
        </section>

        <section className="selection-analysis__chart-card selection-analysis__ranking">
          <div className="selection-analysis__section-heading">
            <div><span>RANKING</span><strong>Volumen por capa</strong></div>
          </div>
          <div className="selection-analysis__bars">
            {activeResults.slice(0, 6).map(result => <button type="button" key={result.key} className={focusedResult?.key === result.key ? 'is-active' : ''} aria-pressed={focusedResult?.key === result.key} aria-controls={`${props.id}-layer-detail`} onClick={() => setFocusedLayerKey(result.key)}>
              <span title={result.title}>{result.title}</span><div><i style={{ width: `${Math.max(3, (result.count / maxCount) * 100)}%`, backgroundColor: result.color }}></i></div><strong>{numberFormatter.format(result.count)}</strong>
            </button>)}
          </div>
        </section>

        {focusedResult && <section id={`${props.id}-layer-detail`} className="selection-analysis__detail-card" aria-label={`Detalle de ${focusedResult.title}`}>
          <div className="selection-analysis__detail-title">
            <i style={{ backgroundColor: focusedResult.color }}></i>
            <div><span>CAPA DESTACADA</span><strong title={focusedResult.title}>{focusedResult.title}</strong></div>
            <b>{numberFormatter.format(focusedResult.count)}</b>
          </div>
          {focusedResult.categories.length > 0
            ? <>
              <div className="selection-analysis__detail-caption">Desglose por <strong>{focusedResult.categoryFieldAlias}</strong></div>
              <div className="selection-analysis__category-bars">
                {focusedResult.categories.map((category, index) => <div key={`${index}-${category.label}`}>
                  <div><span title={category.label}>{category.label}</span><strong>{numberFormatter.format(category.count)}</strong></div>
                  <span><i style={{ width: `${Math.max(2, category.percent)}%`, backgroundColor: focusedResult.color }}></i></span>
                </div>)}
              </div>
            </>
            : <p className="selection-analysis__no-category">Esta capa no tiene un campo categórico adecuado para generar un desglose automático.</p>}
        </section>}

        <section className="selection-analysis__layer-list">
          <div className="selection-analysis__section-heading">
            <div><span>DETALLE</span><strong>Capas seleccionadas</strong></div>
          </div>
          {results.map((result, index) => {
            const isDisabled = disabledLayerKeys.indexOf(result.key) >= 0
            const activeResult = activeResults.find(item => item.key === result.key)
            return <div key={result.key} className={`selection-analysis__layer-row ${focusedResult?.key === result.key ? 'is-active' : ''} ${isDisabled ? 'is-disabled' : ''}`}>
              <button type="button" className="selection-analysis__layer-main" disabled={isDisabled} aria-pressed={focusedResult?.key === result.key} aria-controls={`${props.id}-layer-detail`} onClick={() => setFocusedLayerKey(result.key)}>
                <span className="selection-analysis__layer-order" style={{ borderColor: result.color, color: result.color }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                <span className="selection-analysis__layer-name"><strong title={result.title}>{result.title}</strong><small>{isDisabled ? 'Apagada y excluida del análisis' : `${humanizeGeometry(result.geometryType)} · ${decimalFormatter.format(activeResult?.percent || 0)}% de la selección`}</small></span>
                <span className="selection-analysis__layer-count"><strong>{numberFormatter.format(result.count)}</strong><small>registros</small></span>
              </button>
              <button type="button" className="selection-analysis__layer-toggle" role="switch" aria-checked={!isDisabled} aria-label={`${isDisabled ? 'Encender' : 'Apagar'} capa ${result.title}`} title={`${isDisabled ? 'Encender' : 'Apagar'} en el mapa`} onClick={() => toggleResultLayer(result)}>
                <span><i></i></span>
              </button>
            </div>
          })}
        </section>

        <button type="button" className="selection-analysis__new-selection" disabled={Boolean(exporting)} onClick={() => { void startDrawing('rectangle') }}>
          <span><SvgIcon><rect x="4" y="5" width="16" height="14" rx="1" /><path d="M12 8v8M8 12h8" /></SvgIcon></span>
          Nueva selección
        </button>
      </section>}
    </>}
  </div>
}

export default Widget
