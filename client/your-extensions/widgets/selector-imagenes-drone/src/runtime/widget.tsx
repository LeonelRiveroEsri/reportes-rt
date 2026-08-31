import { React, AllWidgetProps } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { IMConfig } from '../config'
import { matchesGroupTitle, normalizeText, parseFlightName, ParsedFlightName } from './drone-utils'
import './style.scss'

interface FlightItem extends ParsedFlightName {
  id: string
  title: string
  parentTitle: string
  layer: any
  visible: boolean
}

type SortMode = 'newest' | 'oldest' | 'name'

const collectLeafLayers = (group: any, parentTitle: string): FlightItem[] => {
  const result: FlightItem[] = []
  const visit = (layer: any, parent: string) => {
    if (layer?.type === 'group' && layer.layers) {
      layer.layers.forEach((child: any) => visit(child, layer.title || parent))
      return
    }
    if (!layer) return
    result.push({
      id: String(layer.id || layer.uid || `${parent}-${layer.title}`),
      title: String(layer.title || 'Vuelo sin nombre'),
      parentTitle: parent,
      layer,
      visible: Boolean(layer.visible),
      ...parseFlightName(String(layer.title || ''))
    })
  }
  group.layers?.forEach((layer: any) => visit(layer, group.title || parentTitle))
  return result
}

const findGroup = (map: any, title: string): any => {
  let match: any = null
  map?.allLayers?.forEach((layer: any) => {
    if (!match && layer?.type === 'group' && matchesGroupTitle(layer.title, title)) match = layer
  })
  return match
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [jimuMapView, setJimuMapView] = React.useState<JimuMapView>(null)
  const [flights, setFlights] = React.useState<FlightItem[]>([])
  const [groupFound, setGroupFound] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [query, setQuery] = React.useState('')
  const [year, setYear] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [sort, setSort] = React.useState<SortMode>('newest')
  const [analysisOpen, setAnalysisOpen] = React.useState(false)
  const [compareIds, setCompareIds] = React.useState<string[]>([])
  const [compareValue, setCompareValue] = React.useState(50)
  const handles = React.useRef<any[]>([])

  const clearHandles = () => {
    handles.current.forEach(handle => handle?.remove?.())
    handles.current = []
  }

  const scanMap = React.useCallback(async () => {
    if (!jimuMapView?.view?.map) return
    setLoading(true)
    setError('')
    clearHandles()
    try {
      await jimuMapView.view.when()
      const configuredTitle = props.config.groupTitle || 'Imagenes Drone'
      const group = findGroup(jimuMapView.view.map, configuredTitle)
      setGroupFound(Boolean(group))
      if (!group) {
        setFlights([])
        setError(`No se encontró el grupo “${configuredTitle}” en el mapa.`)
        return
      }
      const items = collectLeafLayers(group, configuredTitle)
      setFlights(items)
      items.forEach(item => {
        if (item.layer?.watch) {
          handles.current.push(item.layer.watch('visible', (visible: boolean) => {
            setFlights(current => current.map(flight => flight.id === item.id ? { ...flight, visible } : flight))
          }))
        }
      })
      if (group.layers?.on) handles.current.push(group.layers.on('change', scanMap))
      if (!items.length) setError('El grupo existe, pero no contiene capas de vuelo.')
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'No fue posible leer las capas del mapa.')
    } finally {
      setLoading(false)
    }
  }, [jimuMapView, props.config.groupTitle])

  React.useEffect(() => {
    scanMap()
    return clearHandles
  }, [scanMap])

  const years = React.useMemo(() => Array.from(new Set(flights.map(item => item.year))).sort().reverse(), [flights])
  const months = React.useMemo(() => Array.from(new Set(flights.filter(item => !year || item.year === year).map(item => item.month))), [flights, year])
  const filtered = React.useMemo(() => {
    const needle = normalizeText(query)
    return flights.filter(item =>
      (!needle || normalizeText(`${item.title} ${item.place} ${item.parentTitle} ${item.dateKey}`).includes(needle)) &&
      (!year || item.year === year) && (!month || item.month === month)
    ).sort((a, b) => {
      if (sort === 'name') return a.place.localeCompare(b.place)
      const left = a.date?.getTime() || 0
      const right = b.date?.getTime() || 0
      return sort === 'newest' ? right - left : left - right
    })
  }, [flights, query, year, month, sort])

  const visibleCount = flights.filter(item => item.visible).length

  const zoomTo = async (item: FlightItem) => {
    if (!jimuMapView?.view || !item.layer) return
    try {
      const target = item.layer.fullExtent || item.layer.extent
      if (target) await jimuMapView.view.goTo(target.expand ? target.expand(1.15) : target)
    } catch (_) {}
  }

  const toggleVisibility = async (item: FlightItem) => {
    const next = !item.layer.visible
    if (next && props.config.exclusiveVisibility !== false) {
      flights.forEach(candidate => { candidate.layer.visible = candidate.id === item.id })
    } else {
      item.layer.visible = next
    }
    setFlights(current => current.map(candidate => ({ ...candidate, visible: Boolean(candidate.layer.visible) })))
    if (next && props.config.zoomOnSelect !== false) await zoomTo(item)
  }

  const toggleCompare = (item: FlightItem) => {
    setCompareIds(current => {
      if (current.includes(item.id)) return current.filter(id => id !== item.id)
      if (current.length >= 2) return [current[1], item.id]
      return [...current, item.id]
    })
  }

  React.useEffect(() => {
    if (compareIds.length !== 2) return
    const first = flights.find(item => item.id === compareIds[0])
    const second = flights.find(item => item.id === compareIds[1])
    if (first?.layer) { first.layer.visible = true; first.layer.opacity = (100 - compareValue) / 100 }
    if (second?.layer) { second.layer.visible = true; second.layer.opacity = compareValue / 100 }
  }, [compareIds, compareValue, flights])

  const clearFilters = () => { setQuery(''); setYear(''); setMonth('') }
  const unconfigured = !props.useMapWidgetIds?.length

  return <div className="drone-selector">
    {props.useMapWidgetIds?.[0] && <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds[0]} onActiveViewChange={setJimuMapView} />}
    <header>
      <div><span>IMÁGENES AÉREAS</span><h2>Vuelos Drone PAO</h2><p>Exploración temporal y comparación visual</p></div>
      <button type="button" title="Actualizar capas" onClick={scanMap} disabled={loading}>↻</button>
    </header>

    {unconfigured && <div className="drone-selector__empty"><i>⌖</i><strong>Configure un mapa</strong><p>Abra los ajustes del widget y seleccione el Map Widget.</p></div>}
    {!unconfigured && error && <div className="drone-selector__alert"><strong>No se pudo cargar el catálogo</strong><span>{error}</span><button onClick={scanMap}>Reintentar</button></div>}

    {!unconfigured && groupFound && <>
      <section className="drone-selector__tools">
        <label className="drone-selector__search"><span>⌕</span><input aria-label="Buscar vuelos" value={query} placeholder="Buscar sector, vuelo o fecha…" onChange={event => setQuery(event.target.value)} />{query && <button onClick={() => setQuery('')}>×</button>}</label>
        <div className="drone-selector__filters">
          <select aria-label="Año" value={year} onChange={event => { setYear(event.target.value); setMonth('') }}><option value="">Todos los años</option>{years.map(value => <option key={value}>{value}</option>)}</select>
          <select aria-label="Mes" value={month} onChange={event => setMonth(event.target.value)}><option value="">Todos los meses</option>{months.map(value => <option key={value}>{value}</option>)}</select>
          <select aria-label="Orden" value={sort} onChange={event => setSort(event.target.value as SortMode)}><option value="newest">Más recientes</option><option value="oldest">Más antiguos</option><option value="name">Por sector</option></select>
        </div>
        <div className="drone-selector__summary"><span><strong>{filtered.length}</strong> de {flights.length} vuelos</span><span><b>{visibleCount}</b> visibles</span>{(query || year || month) && <button onClick={clearFilters}>Limpiar filtros</button>}</div>
      </section>

      <section className="drone-selector__analysis">
        <button className="drone-selector__analysis-toggle" onClick={() => setAnalysisOpen(value => !value)}><span>▥ Resumen y comparación</span><b>{analysisOpen ? '−' : '+'}</b></button>
        {analysisOpen && <div className="drone-selector__analysis-body">
          <div className="drone-selector__kpis"><div><strong>{years.filter(value => value !== 'Sin fecha').length}</strong><span>Años</span></div><div><strong>{new Set(flights.map(item => item.place)).size}</strong><span>Sectores</span></div><div><strong>{compareIds.length}/2</strong><span>Comparar</span></div></div>
          <p>Use el botón ⇄ de dos vuelos para compararlos por transparencia.</p>
          {compareIds.length === 2 && <div className="drone-selector__compare"><span>{flights.find(item => item.id === compareIds[0])?.place}</span><input type="range" min="0" max="100" value={compareValue} onChange={event => setCompareValue(Number(event.target.value))} /><span>{flights.find(item => item.id === compareIds[1])?.place}</span></div>}
        </div>}
      </section>

      <main className="drone-selector__list" aria-busy={loading}>
        {filtered.map(item => <article key={item.id} className={`${item.visible ? 'is-visible' : ''} ${compareIds.includes(item.id) ? 'is-comparing' : ''}`}>
          <button className="drone-selector__eye" title={item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo'} aria-label={item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo'} onClick={() => toggleVisibility(item)}>{item.visible ? '◉' : '○'}</button>
          <button className="drone-selector__flight" onClick={() => toggleVisibility(item)}>
            <span className="drone-selector__date">{item.date ? item.dateKey.split('-').reverse().join('/') : 'SIN FECHA'}</span>
            <strong>{item.place}</strong><small title={item.title}>{item.parentTitle}</small>
          </button>
          <div className="drone-selector__actions"><button title="Comparar" className={compareIds.includes(item.id) ? 'is-active' : ''} onClick={() => toggleCompare(item)}>⇄</button><button title="Acercar" onClick={() => zoomTo(item)}>⌖</button></div>
        </article>)}
        {!loading && !filtered.length && <div className="drone-selector__no-results"><strong>Sin coincidencias</strong><p>Pruebe otra fecha o término de búsqueda.</p><button onClick={clearFilters}>Restablecer filtros</button></div>}
      </main>
    </>}
    {loading && <div className="drone-selector__loading"><i></i><span>Actualizando vuelos…</span></div>}
    <footer><span className={groupFound ? 'is-ready' : ''}></span>{groupFound ? 'Catálogo conectado al mapa' : 'Esperando catálogo'}</footer>
  </div>
}

export default Widget
