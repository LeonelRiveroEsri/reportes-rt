import { React, AllWidgetProps, SessionManager } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent, loadArcGISJSAPIModules } from 'jimu-arcgis'
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

interface VectorItem {
  id: string
  title: string
  type: string
  layer: any
  visible: boolean
}

interface DownloadRecord {
  Name: string
  Nombre_de_Vuelo: string
  Sector: string
  ProductNam: string | number
  URL: string
}

type SortMode = 'newest' | 'oldest' | 'name'

const collectLeafLayers = (group: any, parentTitle: string): FlightItem[] => {
  const result: FlightItem[] = []
  const visit = (layer: any, parent: string) => {
    const children = layer?.layers || layer?.sublayers
    const title = String(layer?.title || layer?.name || '')
    if (children?.length) {
      children.forEach((child: any) => visit(child, title || parent))
      return
    }
    if (!layer) return
    result.push({
      id: String(layer.id || layer.uid || `${parent}-${layer.title}`),
      title: title || 'Vuelo sin nombre',
      parentTitle: parent,
      layer,
      visible: Boolean(layer.visible),
      ...parseFlightName(title)
    })
  }
  const children = group?.layers || group?.sublayers
  children?.forEach((layer: any) => visit(layer, group.title || group.name || parentTitle))
  return result
}

const childrenOf = (item: any): any => item?.layers || item?.sublayers
const itemTitle = (item: any): string => String(item?.title || item?.name || '')
const FOOTPRINT_QUERY = 'https://sig.aminerals.cl/imgdyn/rest/services/CL_MLP_PAO/CL_MLP_PAO_27_Imagenes_Aereas_PAO_Image_Server/MapServer/124/query'
const DOWNLOAD_GEOSUPPORT = 'https://sig.aminerals.cl/imgdyn/rest/services/CL_MLP_PAO/CL_MLP_PAO_IF_Ortho_Geosupport/ImageServer/file'
const DOWNLOAD_TRANSVERSAL = 'https://sig.aminerals.cl/imgdyn/rest/services/CL_MLP_PAO/CL_MLP_PAO_IF_Ortho_Transversal/ImageServer/file'

const canonicalFlightName = (value: any): string => normalizeText(String(value || '')
  .replace(/^CL_MLP_PAO_IF_Ortho_/i, '')
  .replace(/^\d+_(?=\d{2}_\d{2}_\d{2}_)/, '')
  .replace(/\.tiff?$/i, ''))

const destinationForSector = (sector: string, name: string): string => {
  if (/Transversal/i.test(`${sector} ${name}`)) return 'Transversal_Aereo'
  if (sector === 'EDT') return 'Puerto_Punta_Chungo_Drone'
  if (['EM1', 'Estacion_Cabecera', 'NSTC_km_4p4_a_7p0', 'SRA-2-km-56p1-a-57p7-Area-2', 'SRA_2_km_54p6_a_56p1_Area-1'].includes(sector)) return 'Chacay_Drone'
  if (['EV2', 'Orejas17_Ruta-D-865'].includes(sector)) return 'El_Mauro_Puerto_Punta_Chungo_Drone'
  if (['Camino_Alternativo_Salamanca', 'EBD', 'Helipuerto', 'Subestacion-El-Mauro', 'Subestacion-El-Mauro_A_E35'].includes(sector)) return 'El_Mauro_Drone'
  if (['Chacay_El_Mauro_Drone', 'DME7_PA7_IF6', 'DME9-PA12-IIFF8', 'DME_13', 'ED1', 'ED2', 'EM2_S2', 'EM3', 'Estacion_Intermedia', 'EV1', 'MonteAranda-NSTC-Km-84p2-a-82p3', 'Patio-19B-y-Armado', 'TORRE_E85_A_E_125', 'TORRES_E31_A_E48_PV4', 'TORRES_E48_A_E84_PV4', 'EC-TK100-SRA2'].includes(sector)) return 'Chacay_El_Mauro_Drone'
  return ''
}

const buildDownloadUrl = (record: DownloadRecord, token: string): string => {
  const rasterId = String(record.ProductNam || '')
  if (!rasterId || !token) return ''
  let rawUrl = String(record.URL || '')
  if (!/^https?:/i.test(rawUrl)) {
    const name = String(record.Name || '')
    const flightName = String(record.Nombre_de_Vuelo || '')
    let sector = String(record.Sector || '')
    let dateFolder = ''
    let rasterFile = ''
    if (/^CL_MLP_PAO_IF_Ortho_/i.test(name)) {
      const tail = name.replace(/^CL_MLP_PAO_IF_Ortho_/i, '')
      const parts = tail.split('_')
      if (parts.length < 4) return ''
      dateFolder = `${parts[0]}_${parts[1]}`
      rasterFile = `${name}.tif`
      if (!sector) sector = parts.slice(3).join('_')
    } else {
      const parts = flightName.split('_')
      if (parts.length < 5) return ''
      dateFolder = `${parts[1]}_${parts[2]}`
      if (!sector) sector = parts.slice(4).join('_')
      rasterFile = `CL_MLP_PAO_IF_Ortho_${parts[1]}_${parts[2]}_${parts[3]}_${sector}.tif`
    }
    sector = sector.replace(/-(?:1|2)$/, '')
    const folder = destinationForSector(sector, name)
    if (!folder) return ''
    const service = folder === 'Transversal_Aereo' ? DOWNLOAD_TRANSVERSAL : DOWNLOAD_GEOSUPPORT
    rawUrl = `${service}?id=.\\${folder}\\${dateFolder}\\${rasterFile}&rasterId=`
  }
  const url = new URL(rawUrl.replace(/\\/g, '%5C'))
  url.searchParams.set('rasterId', rasterId)
  url.searchParams.set('token', token)
  return url.toString()
}

const findRecursive = (collection: any, title: string): any => {
  let found: any = null
  collection?.forEach((item: any) => {
    if (found) return
    if (matchesGroupTitle(itemTitle(item), title)) found = item
    else found = findRecursive(childrenOf(item), title)
  })
  return found
}

const findCatalog = async (map: any, title: string): Promise<any> => {
  const path = String(title || 'Vuelos Drone PAO/Imagenes Drone')
    .split(/[/>]/).map(part => part.trim()).filter(Boolean)
  const roots = map?.layers
  const loadPromises: Promise<any>[] = []
  roots?.forEach((root: any) => {
    const loader = root?.loadAll || root?.load
    if (loader) loadPromises.push(Promise.resolve(loader.call(root)).catch(() => null))
  })
  await Promise.all(loadPromises)

  let current = findRecursive(roots, path[0])
  for (const segment of path.slice(1)) {
    current = findRecursive(childrenOf(current), segment)
    if (!current) break
  }
  if (current) return current

  const leafTitle = path[path.length - 1] || title
  return findRecursive(roots, leafTitle)
}

const resolveMapImageLayer = (sublayer: any, map: any): any => {
  let current = sublayer
  const visited = new Set<any>()
  while (current && !visited.has(current)) {
    visited.add(current)
    if (current.type === 'map-image' && current.clone) return current
    if (current.layer?.type === 'map-image' && current.layer?.clone) return current.layer
    current = current.parent || current.parentSublayer
  }

  let owner: any = null
  map?.layers?.forEach((layer: any) => {
    if (owner || layer?.type !== 'map-image' || !layer?.clone) return
    const all = layer.allSublayers
    if (all?.find?.((candidate: any) => candidate === sublayer)) owner = layer
    else if (all?.some?.((candidate: any) => candidate === sublayer)) owner = layer
  })
  return owner
}

const mapServiceUrl = (sublayer: any, map: any): string => {
  const owner = resolveMapImageLayer(sublayer, map)
  const candidates = [owner?.url, sublayer?.url]
  let current = sublayer?.parent || sublayer?.parentSublayer
  while (current) {
    candidates.push(current.url)
    current = current.parent || current.parentSublayer
  }
  const found = candidates.find(value => typeof value === 'string' && /\/MapServer(?:\/\d+)?\/?$/i.test(value))
  return found ? String(found).replace(/\/\d+\/?$/, '') : ''
}

const overlapPercent = (first: any, second: any): number => {
  const a = first?.fullExtent || first?.extent
  const b = second?.fullExtent || second?.extent
  if (!a || !b) return 0
  const aWkid = a.spatialReference?.latestWkid || a.spatialReference?.wkid
  const bWkid = b.spatialReference?.latestWkid || b.spatialReference?.wkid
  if (aWkid && bWkid && aWkid !== bWkid) return 0
  const width = Math.max(0, Math.min(a.xmax, b.xmax) - Math.max(a.xmin, b.xmin))
  const height = Math.max(0, Math.min(a.ymax, b.ymax) - Math.max(a.ymin, b.ymin))
  const baseArea = Math.max(0, (a.xmax - a.xmin) * (a.ymax - a.ymin))
  return baseArea > 0 ? Math.round((width * height / baseArea) * 100) : 0
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
  const [swipeActive, setSwipeActive] = React.useState(false)
  const [swipeError, setSwipeError] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<'imagery' | 'vectors'>('imagery')
  const [vectors, setVectors] = React.useState<VectorItem[]>([])
  const [opacityEditorId, setOpacityEditorId] = React.useState('')
  const [downloads, setDownloads] = React.useState<Record<string, DownloadRecord>>({})
  const [downloadError, setDownloadError] = React.useState('')
  const [collapsed, setCollapsed] = React.useState(false)
  const [pinned, setPinned] = React.useState(true)
  const handles = React.useRef<any[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)
  const resizedHostRef = React.useRef<{ element: HTMLElement, style: string | null }>(null)
  const initializedCatalog = React.useRef('')
  const swipeClonesRef = React.useRef<any[]>([])
  const swipeClipsRef = React.useRef<Array<{ layerView: any, clip: any }>>([])
  const swipeOverlayRef = React.useRef<HTMLDivElement>(null)
  const swipePointerCleanupRef = React.useRef<() => void>(null)

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
      const configuredTitle = props.config.groupTitle || 'Vuelos Drone PAO/Imagenes Drone'
      const group = await findCatalog(jimuMapView.view.map, configuredTitle)
      setGroupFound(Boolean(group))
      if (!group) {
        setFlights([])
        setError(`No se encontró el grupo “${configuredTitle}” en el mapa.`)
        return
      }
      const items = collectLeafLayers(group, configuredTitle)
      if (initializedCatalog.current !== configuredTitle) {
        items.forEach(item => { item.layer.visible = false })
        initializedCatalog.current = configuredTitle
      }
      setFlights(items)
      try {
        const manager = SessionManager.getInstance()
        const session = manager.getSessionByUrl(FOOTPRINT_QUERY) || manager.getMainSession()
        const params = new URLSearchParams({
          f: 'json', where: '1=1', outFields: 'Name,Nombre_de_Vuelo,Sector,ProductNam,URL',
          returnGeometry: 'false', resultRecordCount: '2000'
        })
        if (session?.token) params.set('token', session.token)
        const response = await fetch(`${FOOTPRINT_QUERY}?${params.toString()}`)
        const payload = await response.json()
        if (payload.error) throw new Error(payload.error.message)
        const byName: Record<string, DownloadRecord> = {}
        payload.features?.forEach((feature: any) => {
          const record = feature.attributes as DownloadRecord
          const key = canonicalFlightName(record.Name || record.Nombre_de_Vuelo)
          if (key && !byName[key]) byName[key] = record
        })
        setDownloads(byName)
      } catch (_) {
        setDownloads({})
      }
      const catalogRoot = group.layer || group
      const vectorItems: VectorItem[] = []
      jimuMapView.view.map.layers?.forEach((layer: any) => {
        if (layer === catalogRoot || layer.type === 'imagery') return
        vectorItems.push({
          id: String(layer.id || layer.uid || layer.title),
          title: itemTitle(layer) || 'Capa sin nombre',
          type: String(layer.type || 'layer'),
          layer,
          visible: Boolean(layer.visible)
        })
      })
      setVectors(vectorItems)
      items.forEach(item => {
        if (item.layer?.watch) {
          handles.current.push(item.layer.watch('visible', (visible: boolean) => {
            setFlights(current => current.map(flight => flight.id === item.id ? { ...flight, visible } : flight))
          }))
        }
      })
      vectorItems.forEach(item => {
        if (item.layer?.watch) {
          handles.current.push(item.layer.watch('visible', (visible: boolean) => {
            setVectors(current => current.map(layer => layer.id === item.id ? { ...layer, visible } : layer))
          }))
        }
      })
      const groupChildren = childrenOf(group)
      if (groupChildren?.on) handles.current.push(groupChildren.on('change', scanMap))
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

  React.useLayoutEffect(() => {
    const widget = containerRef.current
    if (!widget) return
    const host = (widget.closest('.layout-item') || widget.closest('.widget-renderer') || widget.parentElement) as HTMLElement
    if (!host) return
    if (collapsed) {
      if (!resizedHostRef.current) resizedHostRef.current = { element: host, style: host.getAttribute('style') }
      host.classList.add('drone-selector-layout-collapsed')
      host.style.setProperty('width', '52px', 'important')
      host.style.setProperty('min-width', '52px', 'important')
      host.style.setProperty('max-width', '52px', 'important')
      host.style.setProperty('flex', '0 0 52px', 'important')
      host.style.setProperty('overflow', 'visible', 'important')
    } else if (resizedHostRef.current) {
      const saved = resizedHostRef.current
      saved.element.classList.remove('drone-selector-layout-collapsed')
      if (saved.style === null) saved.element.removeAttribute('style')
      else saved.element.setAttribute('style', saved.style)
      resizedHostRef.current = null
    }
    window.dispatchEvent(new Event('resize'))
  }, [collapsed])

  React.useEffect(() => () => {
    const saved = resizedHostRef.current
    if (!saved) return
    saved.element.classList.remove('drone-selector-layout-collapsed')
    if (saved.style === null) saved.element.removeAttribute('style')
    else saved.element.setAttribute('style', saved.style)
    window.dispatchEvent(new Event('resize'))
  }, [])

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
      let target = item.layer.fullExtent || item.layer.extent
      if (!target && item.layer.queryExtent) {
        const result = await item.layer.queryExtent()
        target = result?.extent
      }
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
    closeSwipe()
    setSwipeError('')
    setCompareIds(current => current[0] === item.id ? [] : [item.id])
  }

  const closeSwipe = React.useCallback(() => {
    swipeClipsRef.current.forEach(({ layerView, clip }) => layerView.clips?.remove(clip))
    swipeClipsRef.current = []
    swipePointerCleanupRef.current?.()
    swipePointerCleanupRef.current = null
    swipeOverlayRef.current?.remove()
    swipeOverlayRef.current = null
    swipeClonesRef.current.forEach(layer => jimuMapView?.view?.map?.remove(layer))
    swipeClonesRef.current = []
    setSwipeActive(false)
  }, [jimuMapView])

  const showOnlySublayer = (collection: any, targetId: string): boolean => {
    let collectionHasTarget = false
    collection?.forEach((item: any) => {
      const children = childrenOf(item)
      const hasTarget = children?.length
        ? showOnlySublayer(children, targetId)
        : String(item.id) === targetId
      item.visible = hasTarget
      collectionHasTarget = collectionHasTarget || hasTarget
    })
    return collectionHasTarget
  }

  const startSwipe = async (selectedIds: string[] = compareIds) => {
    if (selectedIds.length !== 2 || !jimuMapView?.view) return
    closeSwipe()
    setSwipeError('')
    try {
      const first = flights.find(item => item.id === selectedIds[0])
      const second = flights.find(item => item.id === selectedIds[1])
      if (!first || !second) return
      const firstSource = resolveMapImageLayer(first.layer, jimuMapView.view.map)
      const secondSource = resolveMapImageLayer(second.layer, jimuMapView.view.map)
      const firstUrl = mapServiceUrl(first.layer, jimuMapView.view.map)
      const secondUrl = mapServiceUrl(second.layer, jimuMapView.view.map)
      const [MapImageLayer, ClipRect] = await loadArcGISJSAPIModules([
        'esri/layers/MapImageLayer',
        'esri/views/layers/support/ClipRect'
      ])
      if ((!firstSource?.clone && !firstUrl) || (!secondSource?.clone && !secondUrl)) {
        throw new Error('No fue posible obtener la URL del servicio MapServer de las imágenes seleccionadas.')
      }
      const firstClone = firstSource?.clone ? firstSource.clone() : new MapImageLayer({ url: firstUrl })
      const secondClone = secondSource?.clone ? secondSource.clone() : new MapImageLayer({ url: secondUrl })
      firstClone.title = `Comparación A · ${first.place}`
      secondClone.title = `Comparación B · ${second.place}`
      await Promise.all([firstClone.load(), secondClone.load()])
      showOnlySublayer(firstClone.sublayers, first.id)
      showOnlySublayer(secondClone.sublayers, second.id)
      firstClone.listMode = 'hide'
      secondClone.listMode = 'hide'
      jimuMapView.view.map.addMany([firstClone, secondClone])
      swipeClonesRef.current = [firstClone, secondClone]
      const [firstLayerView, secondLayerView] = await Promise.all([
        jimuMapView.view.whenLayerView(firstClone),
        jimuMapView.view.whenLayerView(secondClone)
      ])
      const firstView = firstLayerView as any
      const secondView = secondLayerView as any
      if (!firstView.clips || !secondView.clips) throw new Error('El navegador no admite recorte de estas vistas de capa.')
      const leadingClip = new ClipRect({ left: 0, top: 0, right: '50%', bottom: 0 })
      const trailingClip = new ClipRect({ left: '50%', top: 0, right: 0, bottom: 0 })
      firstView.clips.add(leadingClip)
      secondView.clips.add(trailingClip)
      swipeClipsRef.current = [
        { layerView: firstView, clip: leadingClip },
        { layerView: secondView, clip: trailingClip }
      ]

      const overlay = document.createElement('div')
      overlay.setAttribute('aria-label', 'Control de comparación Swipe')
      Object.assign(overlay.style, { position: 'absolute', inset: '0', zIndex: '20', pointerEvents: 'none', overflow: 'hidden' })
      const divider = document.createElement('div')
      Object.assign(divider.style, { position: 'absolute', left: '50%', top: '0', bottom: '0', width: '4px', marginLeft: '-2px', background: '#fff', borderLeft: '1px solid #18394b', borderRight: '1px solid #18394b', cursor: 'col-resize', pointerEvents: 'auto', touchAction: 'none', boxShadow: '0 0 5px rgba(0,0,0,.35)' })
      const handle = document.createElement('div')
      handle.textContent = '↔'
      Object.assign(handle.style, { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '38px', height: '42px', display: 'grid', placeItems: 'center', color: '#087f86', fontSize: '19px', background: '#fff', border: '1px solid #496b77', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,.25)' })
      divider.appendChild(handle)
      overlay.appendChild(divider)
      ;(jimuMapView.view.container as HTMLDivElement).appendChild(overlay)
      swipeOverlayRef.current = overlay

      const updatePosition = (clientX: number) => {
        const bounds = (jimuMapView.view.container as HTMLDivElement).getBoundingClientRect()
        const percent = Math.max(2, Math.min(98, ((clientX - bounds.left) / bounds.width) * 100))
        divider.style.left = `${percent}%`
        leadingClip.right = `${100 - percent}%`
        trailingClip.left = `${percent}%`
      }
      let dragging = false
      const onDown = (event: PointerEvent) => { event.preventDefault(); event.stopPropagation(); dragging = true; divider.setPointerCapture(event.pointerId); updatePosition(event.clientX) }
      const onMove = (event: PointerEvent) => { if (!dragging) return; event.preventDefault(); event.stopPropagation(); updatePosition(event.clientX) }
      const onUp = (event: PointerEvent) => { event.preventDefault(); event.stopPropagation(); dragging = false; if (divider.hasPointerCapture(event.pointerId)) divider.releasePointerCapture(event.pointerId) }
      divider.addEventListener('pointerdown', onDown)
      divider.addEventListener('pointermove', onMove)
      divider.addEventListener('pointerup', onUp)
      divider.addEventListener('pointercancel', onUp)
      swipePointerCleanupRef.current = () => {
        divider.removeEventListener('pointerdown', onDown)
        divider.removeEventListener('pointermove', onMove)
        divider.removeEventListener('pointerup', onUp)
        divider.removeEventListener('pointercancel', onUp)
      }
      setSwipeActive(true)
      first.layer.visible = false
      second.layer.visible = false
    } catch (exception) {
      closeSwipe()
      setSwipeError(exception instanceof Error ? exception.message : 'No fue posible iniciar la comparación Swipe.')
    }
  }

  React.useEffect(() => () => {
    swipeClipsRef.current.forEach(({ layerView, clip }) => layerView.clips?.remove(clip))
    swipePointerCleanupRef.current?.()
    swipeOverlayRef.current?.remove()
    swipeClonesRef.current.forEach(layer => jimuMapView?.view?.map?.remove(layer))
  }, [jimuMapView])

  const setLayerOpacity = (item: { layer: any }, value: number) => {
    item.layer.opacity = value / 100
    setFlights(current => [...current])
    setVectors(current => [...current])
  }

  const toggleVector = (item: VectorItem) => {
    item.layer.visible = !item.layer.visible
    setVectors(current => current.map(layer => layer.id === item.id ? { ...layer, visible: item.layer.visible } : layer))
  }

  const downloadFlight = (item: FlightItem) => {
    setDownloadError('')
    const record = downloads[canonicalFlightName(item.title)]
    if (!record) {
      setDownloadError(`No se encontrÃ³ un footprint de descarga para ${item.place}.`)
      return
    }
    const manager = SessionManager.getInstance()
    const session = manager.getSessionByUrl(record.URL || DOWNLOAD_GEOSUPPORT) || manager.getMainSession()
    const url = buildDownloadUrl(record, session?.token)
    if (!url) {
      setDownloadError('No fue posible construir una URL de descarga autenticada para esta imagen.')
      return
    }
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.target = '_blank'
    anchor.rel = 'noopener'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  const overlapGroups = React.useMemo(() => {
    const base = flights.find(item => item.id === compareIds[0])
    if (!base) return [] as Array<{ year: string, items: Array<{ flight: FlightItem, percent: number }> }>
    const candidates = flights
      .filter(item => item.id !== base.id)
      .map(flight => ({ flight, percent: overlapPercent(base.layer, flight.layer) }))
      .filter(candidate => candidate.percent > 0)
      .sort((left, right) => right.flight.date?.getTime() - left.flight.date?.getTime() || right.percent - left.percent)
    const grouped = new Map<string, Array<{ flight: FlightItem, percent: number }>>()
    candidates.forEach(candidate => {
      const key = candidate.flight.year
      grouped.set(key, [...(grouped.get(key) || []), candidate])
    })
    return Array.from(grouped.entries()).map(([groupYear, items]) => ({ year: groupYear, items }))
  }, [flights, compareIds])

  const compareWith = (base: FlightItem, candidate: FlightItem) => {
    const selected = [base.id, candidate.id]
    setCompareIds(selected)
    void startSwipe(selected)
  }

  const clearFilters = () => { setQuery(''); setYear(''); setMonth('') }
  const unconfigured = !props.useMapWidgetIds?.length
  const comparisonBase = flights.find(item => item.id === compareIds[0])
  const overlapCount = overlapGroups.reduce((total, group) => total + group.items.length, 0)

  return <div ref={containerRef} className={`drone-selector ${collapsed ? 'is-collapsed' : ''} ${pinned ? 'is-pinned' : 'is-unpinned'}`} onMouseEnter={() => { if (!pinned && collapsed) setCollapsed(false) }} onMouseLeave={() => { if (!pinned && !collapsed) setCollapsed(true) }}>
    {props.useMapWidgetIds?.[0] && <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds[0]} onActiveViewChange={setJimuMapView} />}
    <header>
      <div className="drone-selector__identity"><span>IMÁGENES AÉREAS</span><h2>Vuelos Drone PAO</h2><p>Exploración temporal y comparación visual</p></div>
      <div className="drone-selector__panel-actions">
        {!collapsed && <button type="button" title={pinned ? 'Desfijar panel' : 'Fijar panel'} aria-pressed={pinned} className={pinned ? 'is-active' : ''} onClick={() => setPinned(value => !value)}>{pinned ? '●' : '○'}</button>}
        {!collapsed && <button type="button" title="Actualizar capas" onClick={scanMap} disabled={loading}>↻</button>}
        <button type="button" title={collapsed ? 'Expandir panel' : 'Colapsar panel'} aria-expanded={!collapsed} className="drone-selector__collapse-button" onClick={() => setCollapsed(value => !value)}>{collapsed ? '›' : '‹'}</button>
      </div>
    </header>

    {unconfigured && <div className="drone-selector__empty"><i>⌖</i><strong>Configure un mapa</strong><p>Abra los ajustes del widget y seleccione el Map Widget.</p></div>}
    {!unconfigured && error && <div className="drone-selector__alert"><strong>No se pudo cargar el catálogo</strong><span>{error}</span><button onClick={scanMap}>Reintentar</button></div>}

    {!unconfigured && groupFound && <>
      <nav className="drone-selector__tabs">
        <button className={activeTab === 'imagery' ? 'is-active' : ''} onClick={() => setActiveTab('imagery')}>Imágenes <b>{flights.length}</b></button>
        <button className={activeTab === 'vectors' ? 'is-active' : ''} onClick={() => setActiveTab('vectors')}>Capas vectoriales <b>{vectors.length}</b></button>
      </nav>

      {activeTab === 'imagery' && <><section className="drone-selector__tools">
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
          <div className="drone-selector__kpis"><div><strong>{years.filter(value => value !== 'Sin fecha').length}</strong><span>Años</span></div><div><strong>{new Set(flights.map(item => item.place)).size}</strong><span>Sectores</span></div><div><strong>{comparisonBase ? overlapCount : '—'}</strong><span>Solapadas</span></div></div>
          <p>Presione ⇄ en una imagen base. Se abrirá un árbol con los vuelos que se superponen espacialmente.</p>
          {swipeActive && <div className="drone-selector__swipe-controls"><span>{comparisonBase?.place}</span><span>Comparación activa</span><button onClick={closeSwipe}>Cerrar Swipe</button></div>}
          {swipeError && <div className="drone-selector__inline-error">{swipeError}</div>}
        </div>}
      </section>

      <main className="drone-selector__list" aria-busy={loading}>
        {downloadError && <div className="drone-selector__download-error">{downloadError}<button onClick={() => setDownloadError('')}>×</button></div>}
        {filtered.map(item => <article key={item.id} className={`${item.visible ? 'is-visible' : ''} ${compareIds.includes(item.id) ? 'is-comparing' : ''}`}>
          <button className="drone-selector__eye" title={item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo'} aria-label={item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo'} onClick={() => toggleVisibility(item)}>{item.visible ? '◉' : '○'}</button>
          <button className="drone-selector__flight" onClick={() => toggleVisibility(item)}>
            <span className="drone-selector__date">{item.date ? item.dateKey.split('-').reverse().join('/') : 'SIN FECHA'}</span>
            <strong>{item.place}</strong><small title={item.title}>{item.parentTitle}</small>
          </button>
          <div className="drone-selector__actions"><button title="Descargar GeoTIFF" disabled={!downloads[canonicalFlightName(item.title)]} onClick={() => downloadFlight(item)}>⇩</button><button title="Comparar" className={compareIds.includes(item.id) ? 'is-active' : ''} onClick={() => toggleCompare(item)}>⇄</button><button title="Transparencia" className={opacityEditorId === item.id ? 'is-active' : ''} onClick={() => setOpacityEditorId(current => current === item.id ? '' : item.id)}>◐</button><button title="Acercar" onClick={() => zoomTo(item)}>⌖</button></div>
          {opacityEditorId === item.id && <div className="drone-selector__opacity"><span>Transparencia</span><input type="range" min="0" max="100" value={Math.round((1 - (item.layer.opacity ?? 1)) * 100)} onChange={event => setLayerOpacity(item, 100 - Number(event.target.value))} /><b>{Math.round((1 - (item.layer.opacity ?? 1)) * 100)}%</b></div>}
          {compareIds[0] === item.id && <div className="drone-selector__overlap-tree">
            <div className="drone-selector__overlap-head"><strong>Imágenes que se superponen</strong><span>{overlapCount} encontradas</span></div>
            {swipeError && <div className="drone-selector__inline-error">{swipeError}</div>}
            {!overlapCount && <p>No se encontraron otras imágenes cuya extensión intersecte este vuelo.</p>}
            {overlapGroups.map(group => <details key={group.year} open>
              <summary><span>{group.year}</span><b>{group.items.length}</b></summary>
              {group.items.map(candidate => <button key={candidate.flight.id} onClick={() => compareWith(item, candidate.flight)}>
                <span><strong>{candidate.flight.dateKey.split('-').reverse().join('/')} · {candidate.flight.place}</strong><small>{candidate.flight.title}</small></span>
                <b>{candidate.percent}%</b>
              </button>)}
            </details>)}
          </div>}
        </article>)}
        {!loading && !filtered.length && <div className="drone-selector__no-results"><strong>Sin coincidencias</strong><p>Pruebe otra fecha o término de búsqueda.</p><button onClick={clearFilters}>Restablecer filtros</button></div>}
      </main></>}

      {activeTab === 'vectors' && <main className="drone-selector__list drone-selector__vector-list">
        <div className="drone-selector__vector-help">Encienda, apague y ajuste la transparencia de las capas operacionales del web map.</div>
        {vectors.map(item => <article key={item.id} className={item.visible ? 'is-visible' : ''}>
          <button className="drone-selector__eye" onClick={() => toggleVector(item)}>{item.visible ? '◉' : '○'}</button>
          <button className="drone-selector__flight" onClick={() => toggleVector(item)}><strong>{item.title}</strong><small>{item.type}</small></button>
          <div className="drone-selector__actions"><button title="Transparencia" className={opacityEditorId === `v-${item.id}` ? 'is-active' : ''} onClick={() => setOpacityEditorId(current => current === `v-${item.id}` ? '' : `v-${item.id}`)}>◐</button></div>
          {opacityEditorId === `v-${item.id}` && <div className="drone-selector__opacity"><span>Transparencia</span><input type="range" min="0" max="100" value={Math.round((1 - (item.layer.opacity ?? 1)) * 100)} onChange={event => setLayerOpacity(item, 100 - Number(event.target.value))} /><b>{Math.round((1 - (item.layer.opacity ?? 1)) * 100)}%</b></div>}
        </article>)}
      </main>}
    </>}
    {loading && <div className="drone-selector__loading"><i></i><span>Actualizando vuelos…</span></div>}
    <footer><span className={groupFound ? 'is-ready' : ''}></span>{groupFound ? 'Catálogo conectado al mapa' : 'Esperando catálogo'}</footer>
  </div>
}

export default Widget
