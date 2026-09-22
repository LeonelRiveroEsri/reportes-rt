import { AllWidgetProps, React, SessionManager } from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { IMConfig } from '../config'
import './style.scss'

type Stage = 'idle' | 'uploading' | 'submitting' | 'processing' | 'success' | 'error'
type FinalStage = 'idle' | 'submitting' | 'processing' | 'success' | 'error'

interface ArcGISError {
  message?: string
  details?: string[]
}

interface UploadResponse {
  item?: { itemID?: string, itemId?: string }
  error?: ArcGISError
}

interface JobMessage {
  description?: string
}

interface JobResponse {
  jobId?: string
  jobStatus?: string
  messages?: JobMessage[]
  error?: ArcGISError
}

interface ResultResponse {
  value?: string
  error?: ArcGISError
}

const DEFAULT_GP_URL = 'https://sig.aminerals.cl/vector/rest/services/CL_CEN_ADM/CL_CEN_ADM_SIAS_KmltolayerV2/GPServer/Carga%20KML%20SIA'
const DEFAULT_SURVEY_URL = 'https://survey123.arcgis.com/share/a921894bf7b84c968a991d0691db0e54'
const FINAL_GP_URL = 'https://sig.aminerals.cl/vector/rest/services/CL_CEN_ADM/CL_CEN_ADM_SIAS_INGRESO_CEN_V2/GPServer/Ingreso_SIA'
const SURVEY123_API_URL = 'https://survey123.arcgis.com/api/jsapi/'
const TARGET_LAYER_URL = 'https://sig.aminerals.cl/server/rest/services/Hosted/Solicitud_intervencion_de_areas_USER/FeatureServer/0'
const PORTAL_URL = 'https://sig.aminerals.cl/portal'
const OPERATIONAL_LAYERS = [
  { type: 'map-image', title: 'Imagen Pleiades (Marzo 2026)', url: 'https://sig.aminerals.cl/portal/sharing/servers/f7ffe3f48a274fca85f76c94f5210a07/rest/services/CL_VPD_SAT/CL_VPD_SAT_DMC_Pleiades_2026_Mar_MS/MapServer', visible: true },
  { type: 'map-image', title: 'Permisos', url: 'https://sig.aminerals.cl/portal/sharing/servers/05014814aee94992b02ecf966ddac8ae/rest/services/CL_CEN_PLP/CL_CEN_GMA_Permisos/MapServer', visible: false },
  { type: 'map-image', title: 'Medio Ambiente', url: 'https://sig.aminerals.cl/portal/sharing/servers/1cc488a0498d4acd955d68b527bc303f/rest/services/CL_CEN_PLP/CL_CEN_GMA_Medio_Ambiente/MapServer', visible: false },
  { type: 'map-image', title: 'Visor Territorial', url: 'https://sig.aminerals.cl/portal/sharing/servers/cc19be87bfc24c8696472dc4739119a2/rest/services/CL_CEN_PLP/CL_CEN_PLP_Visor_Territorial/MapServer', visible: true },
  { type: 'feature', title: 'Solicitud Intervención de Áreas (Aprobación)', url: 'https://sig.aminerals.cl/portal/sharing/servers/9481926e49e343e1832476ee4749d66b/rest/services/Hosted/Solicitud_intervencion_de_areas/FeatureServer/0', visible: true },
  { type: 'feature', title: 'Solicitud Intervención de Áreas (Ingreso)', url: TARGET_LAYER_URL, visible: true, target: true }
]
const FINAL_JOB_STATES = ['esriJobSucceeded', 'esriJobFailed', 'esriJobCancelled', 'esriJobTimedOut']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const wait = async (milliseconds: number) => await new Promise(resolve => setTimeout(resolve, milliseconds))

let survey123ApiPromise: Promise<any> = null

const loadSurvey123Api = async (): Promise<any> => {
  const current = (window as any).Survey123WebForm
  if (current) return current
  if (survey123ApiPromise) return await survey123ApiPromise

  survey123ApiPromise = new Promise((resolve, reject) => {
    const finish = () => {
      const constructor = (window as any).Survey123WebForm
      if (constructor) resolve(constructor)
      else reject(new Error('La API de Survey123 se cargó, pero el formulario no quedó disponible.'))
    }
    const existing = document.querySelector(`script[src="${SURVEY123_API_URL}"]`) as HTMLScriptElement
    if (existing) {
      existing.addEventListener('load', finish, { once: true })
      existing.addEventListener('error', () => reject(new Error('No fue posible cargar la API de Survey123.')), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = SURVEY123_API_URL
    script.async = true
    script.onload = finish
    script.onerror = () => reject(new Error('No fue posible cargar la API de Survey123.'))
    document.head.appendChild(script)
  })
  return await survey123ApiPromise
}

const getSurveyItemId = (surveyUrl: string): string => {
  try {
    const url = new URL(surveyUrl, window.location.origin)
    const configuredItem = url.searchParams.get('itemId')
    if (configuredItem) return configuredItem
    const parts = url.pathname.split('/').filter(Boolean)
    const shareIndex = parts.findIndex(part => part.toLowerCase() === 'share')
    return shareIndex >= 0 ? (parts[shareIndex + 1] || '') : (parts[parts.length - 1] || '')
  } catch {
    return ''
  }
}

const cleanTaskUrl = (value?: string): string => {
  const configured = (value || DEFAULT_GP_URL).trim()
  const migrated = /CL_CEN_ADM_SIAS_Kmltolayer\/GPServer/i.test(configured) ? DEFAULT_GP_URL : configured
  return migrated.replace(/\/+$/, '').replace(/\/submitJob$/i, '')
}

const getGpServerUrl = (taskUrl: string): string => {
  const marker = '/GPServer/'
  const index = taskUrl.toLowerCase().indexOf(marker.toLowerCase())
  return index >= 0 ? taskUrl.slice(0, index + '/GPServer'.length) : taskUrl
}

const errorText = (error?: ArcGISError): string => {
  if (!error) return ''
  return [error.message, ...(error.details || [])].filter(Boolean).join(' ')
}

const StepTitle = ({ step, title }: { step: number, title: string }) => <header className="kml-sias__step-title">
  <span>{step}</span>
  <strong>{title}</strong>
</header>

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [email, setEmail] = React.useState('')
  const [confirmation, setConfirmation] = React.useState('')
  const [file, setFile] = React.useState<File>(null)
  const [dragging, setDragging] = React.useState(false)
  const [stage, setStage] = React.useState<Stage>('idle')
  const [status, setStatus] = React.useState('Complete los datos y seleccione un archivo KML.')
  const [error, setError] = React.useState('')
  const [jobId, setJobId] = React.useState('')
  const [sliderValue, setSliderValue] = React.useState(0)
  const [company, setCompany] = React.useState('')
  const [surveyGlobalId, setSurveyGlobalId] = React.useState('')
  const [surveyToken, setSurveyToken] = React.useState('')
  const [surveyVisible, setSurveyVisible] = React.useState(false)
  const [mapVisible, setMapVisible] = React.useState(false)
  const [completedAt, setCompletedAt] = React.useState('')
  const [finalStage, setFinalStage] = React.useState<FinalStage>('idle')
  const [finalStatus, setFinalStatus] = React.useState('')
  const [finalError, setFinalError] = React.useState('')
  const [finalJobId, setFinalJobId] = React.useState('')
  const [finalProgress, setFinalProgress] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const surveyContainerRef = React.useRef<HTMLDivElement>(null)
  const surveyWebFormRef = React.useRef<any>(null)
  const finalStartedRef = React.useRef(false)
  const mapViewRef = React.useRef<any>(null)
  const highlightRef = React.useRef<any>(null)
  const previewLayerRef = React.useRef<any>(null)

  React.useEffect(() => {
    let cancelled = false
    let view: any
    const initializeMap = async () => {
      const [Map, MapView] = await loadArcGISJSAPIModules([
        'esri/Map',
        'esri/views/MapView'
      ])
      if (cancelled || !mapContainerRef.current) return
      const map = new Map({ basemap: 'satellite' })
      view = new MapView({
        container: mapContainerRef.current,
        map,
        constraints: { snapToZoom: false },
        popup: { dockEnabled: true, dockOptions: { position: 'bottom-left', breakpoint: false } }
      })
      mapViewRef.current = view
      await view.when()
    }
    void initializeMap().catch(mapError => console.error('[Carga KML SIA] No fue posible cargar el Web Map:', mapError))
    return () => {
      cancelled = true
      highlightRef.current?.remove?.()
      previewLayerRef.current = null
      highlightRef.current = null
      mapViewRef.current = null
      if (view) view.destroy()
    }
  }, [])

  const focusLoadedPolygon = React.useCallback(async (globalId: string, mapToken: string) => {
    const view = mapViewRef.current
    if (!view) throw new Error('El mapa aún no está disponible para localizar el polígono.')
    await Promise.race([
      view.when(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('El Web Map no respondió dentro de 15 segundos.')), 15000))
    ])
    const [MapImageLayer, FeatureLayer, IdentityManager, LayerList, Legend, Expand, GraphicsLayer, Graphic] = await loadArcGISJSAPIModules([
      'esri/layers/MapImageLayer',
      'esri/layers/FeatureLayer',
      'esri/identity/IdentityManager',
      'esri/widgets/LayerList',
      'esri/widgets/Legend',
      'esri/widgets/Expand',
      'esri/layers/GraphicsLayer',
      'esri/Graphic'
    ])
    const expires = Date.now() + (85 * 60 * 1000)
    IdentityManager.registerToken({ server: PORTAL_URL, token: mapToken, expires, ssl: true })
    IdentityManager.registerToken({ server: `${PORTAL_URL}/sharing/rest`, token: mapToken, expires, ssl: true })
    IdentityManager.registerToken({ server: 'https://sig.aminerals.cl/server/rest/services', token: mapToken, expires, ssl: true })
    IdentityManager.registerToken({ server: 'https://sig.aminerals.cl/vector/rest/services', token: mapToken, expires, ssl: true })
    highlightRef.current?.remove?.()
    highlightRef.current = null
    if (previewLayerRef.current) view.map.remove(previewLayerRef.current)
    previewLayerRef.current = null
    const safeGlobalId = globalId.replace(/[{}]/g, '').replace(/'/g, "''")
    const ownTemporaryFeature = `globalid = '{${safeGlobalId}}'`
    const layers = OPERATIONAL_LAYERS.map(definition => definition.type === 'map-image'
      ? new MapImageLayer({ url: definition.url, title: definition.title, visible: definition.visible })
      : new FeatureLayer({
        url: definition.url,
        title: definition.title,
        visible: definition.visible,
        outFields: ['*'],
        definitionExpression: definition.target ? ownTemporaryFeature : undefined
      }))
    view.map.removeAll()
    view.map.addMany(layers)
    await Promise.all(layers.map(async (operationalLayer: any) => {
      try {
        await operationalLayer.load()
      } catch (layerError) {
        console.warn(`[Carga KML SIA] No se pudo cargar la capa "${operationalLayer.title}":`, layerError)
      }
    }))
    view.ui.remove('attribution')
    const layerList = new LayerList({ view })
    const legend = new Legend({ view })
    view.ui.add(new Expand({ view, content: layerList, group: 'top-left', expanded: false }), 'top-left')
    view.ui.add(new Expand({ view, content: legend, group: 'top-left', expanded: false }), 'top-left')
    const layer = layers[OPERATIONAL_LAYERS.findIndex(definition => definition.target)]
    await layer.load()
    layer.visible = true
    const result = await layer.queryFeatures({
      where: `globalid = '{${safeGlobalId}}'`,
      outFields: ['objectid', 'globalid'],
      returnGeometry: true
    })
    const feature = result.features?.[0]
    if (!feature?.geometry) throw new Error(`No se encontró en el Web Map el polígono con GlobalID ${globalId}.`)
    const selectionLayer = new GraphicsLayer({ title: 'SIA seleccionada', listMode: 'hide' })
    selectionLayer.add(new Graphic({
      geometry: feature.geometry,
      attributes: feature.attributes,
      symbol: {
        type: 'simple-fill',
        color: [255, 255, 255, 0.42],
        outline: { color: [0, 220, 180, 1], width: 3 }
      }
    }))
    view.map.add(selectionLayer)
    previewLayerRef.current = selectionLayer
    await view.goTo({ target: feature.geometry, padding: { top: 70, right: 80, bottom: 70, left: 80 } }, { duration: 1200 })
    setMapVisible(true)
    const layerView = await view.whenLayerView(layer)
    highlightRef.current?.remove?.()
    highlightRef.current = layerView.highlight(feature)
  }, [])

  const centerLoadedPolygon = React.useCallback(async () => {
    const view = mapViewRef.current
    const layer = previewLayerRef.current
    const graphic = layer?.graphics?.getItemAt?.(0) || layer?.graphics?.items?.[0]
    if (!view || !graphic?.geometry) {
      console.warn('[Carga KML SIA] El polígono cargado todavía no está disponible para centrar el mapa.')
      return
    }
    view.popup?.close?.()
    await view.goTo(
      { target: graphic.geometry, padding: { top: 70, right: 80, bottom: 70, left: 80 } },
      { duration: 900 }
    )
  }, [])

  const taskUrl = cleanTaskUrl(props.config.gpTaskUrl)
  const gpServerUrl = getGpServerUrl(taskUrl)
  const maxFileSizeMb = Number(props.config.maxFileSizeMb) > 0 ? Number(props.config.maxFileSizeMb) : 10
  const maxFileSize = maxFileSizeMb * 1024 * 1024
  const surveyFormUrl = (props.config.surveyFormUrl || DEFAULT_SURVEY_URL).trim()
  const surveyItemId = getSurveyItemId(surveyFormUrl)
  const validEmail = EMAIL_PATTERN.test(email.trim())
  const emailsMatch = validEmail && email.trim().toLowerCase() === confirmation.trim().toLowerCase()
  const busy = stage === 'uploading' || stage === 'submitting' || stage === 'processing'
  const humanVerified = sliderValue >= 100 && !company.trim()
  const canSubmit = Boolean(file && emailsMatch && humanVerified && !busy)

  const tokenCandidates = React.useCallback((): Array<string | undefined> => {
    const manager = SessionManager.getInstance()
    const session = manager.getSessionByUrl(taskUrl) || manager.getSessionByUrl(gpServerUrl) || manager.getMainSession()
    return session?.token ? [session.token, undefined] : [undefined]
  }, [gpServerUrl, taskUrl])

  const post = React.useCallback(async <T,>(url: string, bodyFactory: (token?: string) => FormData | URLSearchParams, preferredTokens: string[] = []): Promise<T> => {
    let lastError: Error = null
    const candidates: Array<string | undefined> = []
    ;[...preferredTokens, ...tokenCandidates()].forEach(token => {
      if (!candidates.includes(token)) candidates.push(token)
    })
    for (const token of candidates) {
      try {
        const body = bodyFactory(token)
        const response = await fetch(url, {
          method: 'POST',
          headers: body instanceof URLSearchParams ? { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } : undefined,
          body: body instanceof URLSearchParams ? body.toString() : body
        })
        if (!response.ok) throw new Error(`El servidor respondió HTTP ${response.status}.`)
        const data = await response.json() as T & { error?: ArcGISError }
        if (data.error) throw new Error(errorText(data.error) || 'El servicio ArcGIS devolvió un error.')
        return data
      } catch (requestError) {
        lastError = requestError instanceof Error ? requestError : new Error('No fue posible consultar el servicio.')
      }
    }
    throw lastError || new Error('No fue posible acceder al servicio de geoprocesamiento.')
  }, [tokenCandidates])

  const queryJson = React.useCallback(async <T,>(url: string): Promise<T> => await post<T>(url, token => {
    const params = new URLSearchParams({ f: 'json' })
    if (token) params.set('token', token)
    return params
  }), [post])

  const runFinalProcessing = React.useCallback(async (globalId: string) => {
    if (!globalId || finalStartedRef.current) return
    finalStartedRef.current = true
    setFinalStage('submitting')
    setFinalStatus('Encuesta guardada correctamente. Iniciando el procesamiento final…')
    setFinalError('')
    setFinalJobId('')
    setFinalProgress(5)

    try {
      const submitted = await post<JobResponse>(`${FINAL_GP_URL}/submitJob`, token => {
        const params = new URLSearchParams({ f: 'json', registro_id: globalId })
        if (token) params.set('token', token)
        return params
      }, surveyToken ? [surveyToken] : [])
      if (!submitted.jobId) throw new Error('El proceso final no devolvió un jobId.')

      setFinalJobId(submitted.jobId)
      setFinalStage('processing')
      setFinalStatus('Procesando la solicitud SIA…')
      setFinalProgress(10)

      let job = submitted
      const deadline = Date.now() + 30 * 60 * 1000
      while (!FINAL_JOB_STATES.includes(job.jobStatus || '')) {
        if (Date.now() >= deadline) throw new Error('El procesamiento final superó el tiempo máximo de espera de 30 minutos.')
        await wait(2000)
        job = await post<JobResponse>(`${FINAL_GP_URL}/jobs/${encodeURIComponent(submitted.jobId)}`, token => {
          const params = new URLSearchParams({ f: 'json' })
          if (token) params.set('token', token)
          return params
        }, surveyToken ? [surveyToken] : [])
        const latestMessage = job.messages?.map(message => message.description).filter(Boolean).pop()
        if (latestMessage) {
          setFinalStatus(latestMessage)
          const step = latestMessage.match(/Etapa\s+(\d)\/7/i)
          if (step) setFinalProgress(Math.min(95, 10 + Math.round((Number(step[1]) / 7) * 85)))
        }
      }

      if (job.jobStatus !== 'esriJobSucceeded') {
        const detail = job.messages?.map(message => message.description).filter(Boolean).join(' ')
        throw new Error(detail || `El procesamiento final terminó con estado ${job.jobStatus}.`)
      }

      setFinalStage('success')
      setFinalStatus('Solicitud SIA ingresada y procesada correctamente.')
      setFinalProgress(100)
    } catch (processError) {
      console.error('[Carga KML SIA] Error en procesamiento posterior a Survey123:', processError)
      setFinalStage('error')
      setFinalStatus('La encuesta fue guardada, pero el procesamiento final no pudo completarse.')
      setFinalError(processError instanceof Error ? processError.message : 'Ocurrió un error inesperado en el procesamiento final.')
    }
  }, [post, surveyToken])

  React.useEffect(() => {
    if (!surveyVisible || !surveyGlobalId || !surveyToken || !surveyItemId || !surveyContainerRef.current) return
    let cancelled = false
    const container = surveyContainerRef.current

    const mountSurvey = async () => {
      const Survey123WebForm = await loadSurvey123Api()
      if (cancelled || !surveyContainerRef.current) return
      container.innerHTML = ''
      surveyWebFormRef.current = new Survey123WebForm({
        container,
        itemId: surveyItemId,
        portalUrl: PORTAL_URL,
        token: surveyToken,
        mode: 'edit',
        globalId: surveyGlobalId,
        version: 'latest',
        onFormSubmitted: () => {
          if (cancelled || finalStartedRef.current) return
          console.info('[Carga KML SIA] Survey123 confirmó el guardado del formulario. GlobalID:', surveyGlobalId)
          void runFinalProcessing(surveyGlobalId)
        }
      })
    }

    void mountSurvey().catch(surveyError => {
      console.error('[Carga KML SIA] No fue posible iniciar Survey123:', surveyError)
      setFinalStage('error')
      setFinalStatus('No fue posible abrir el formulario de Survey123.')
      setFinalError(surveyError instanceof Error ? surveyError.message : 'Error desconocido al cargar Survey123.')
    })

    return () => {
      cancelled = true
      if (surveyWebFormRef.current?.destroy) surveyWebFormRef.current.destroy()
      surveyWebFormRef.current = null
      container.innerHTML = ''
    }
  }, [runFinalProcessing, surveyGlobalId, surveyItemId, surveyToken, surveyVisible])

  const previewKmlOnMap = React.useCallback(async (candidate: File) => {
    const view = mapViewRef.current
    if (!view) return
    const xml = new DOMParser().parseFromString(await candidate.text(), 'application/xml')
    if (xml.getElementsByTagName('parsererror').length) throw new Error('El archivo KML no contiene XML válido.')
    const rings: number[][][] = []
    const polygons = Array.from(xml.getElementsByTagNameNS('*', 'Polygon'))
    polygons.forEach(polygon => {
      Array.from(polygon.getElementsByTagNameNS('*', 'coordinates')).forEach(node => {
        const ring = String(node.textContent || '').trim().split(/\s+/).map(value => {
          const parts = value.split(',')
          return [Number(parts[0]), Number(parts[1])]
        }).filter(point => point.length === 2 && point.every(Number.isFinite))
        if (ring.length >= 3) {
          if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) ring.push([...ring[0]])
          rings.push(ring)
        }
      })
    })
    if (!rings.length) throw new Error('El KML no contiene polígonos válidos para mostrar.')
    const [GraphicsLayer, Graphic, Polygon] = await loadArcGISJSAPIModules([
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      'esri/geometry/Polygon'
    ])
    if (previewLayerRef.current) view.map.remove(previewLayerRef.current)
    const previewLayer = new GraphicsLayer({ title: 'Vista previa KML', listMode: 'hide' })
    const geometry = new Polygon({ rings, spatialReference: { wkid: 4326 } })
    previewLayer.add(new Graphic({
      geometry,
      symbol: {
        type: 'simple-fill',
        color: [213, 109, 45, 0.25],
        outline: { color: [213, 109, 45, 1], width: 3 }
      }
    }))
    previewLayerRef.current = previewLayer
    view.map.add(previewLayer)
    await view.goTo({ target: geometry, padding: { top: 60, right: 60, bottom: 60, left: 60 } }, { duration: 900 })
  }, [])

  const selectFile = (candidate?: File) => {
    setError('')
    setJobId('')
    if (!candidate) return
    if (!candidate.name.toLowerCase().endsWith('.kml')) {
      setFile(null)
      setStage('error')
      setStatus('Archivo no válido.')
      setError('Seleccione un archivo con extensión .kml.')
      return
    }
    if (candidate.size > maxFileSize) {
      setFile(null)
      setStage('error')
      setStatus('El archivo supera el tamaño permitido.')
      setError(`El KML pesa ${(candidate.size / 1024 / 1024).toFixed(2)} MB y el máximo configurado es ${maxFileSizeMb} MB.`)
      return
    }
    setFile(candidate)
    setStage('idle')
    setStatus('Archivo preparado. Revise los datos y ejecute la carga.')
    void previewKmlOnMap(candidate).catch(previewError => {
      console.error('[Carga KML SIA] No fue posible mostrar la vista previa:', previewError)
      setError(previewError instanceof Error ? previewError.message : 'No fue posible dibujar el KML en el mapa.')
    })
  }

  const run = async () => {
    if (!file || !emailsMatch || !humanVerified || busy) return
    setError('')
    setJobId('')
    try {
      setStage('uploading')
      setStatus('Cargando el archivo KML al servidor…')
      const upload = await post<UploadResponse>(`${gpServerUrl}/uploads/upload`, token => {
        const form = new FormData()
        form.append('f', 'json')
        form.append('file', file, file.name)
        form.append('description', `KML SIA cargado desde Experience Builder: ${file.name}`)
        if (token) form.append('token', token)
        return form
      })
      const itemId = upload.item?.itemID || upload.item?.itemId
      if (!itemId) throw new Error('El servidor no devolvió el itemID del archivo cargado.')

      setStage('submitting')
      setStatus('Iniciando el geoproceso SIA…')
      const submitted = await post<JobResponse>(`${taskUrl}/submitJob`, token => {
        const params = new URLSearchParams({
          f: 'json',
          kml: JSON.stringify({ itemID: itemId }),
          mail: email.trim(),
          mail2: confirmation.trim(),
          app_referer: window.location.origin
        })
        if (token) params.set('token', token)
        return params
      })
      if (!submitted.jobId) throw new Error('El geoproceso no devolvió un jobId.')
      setJobId(submitted.jobId)
      setStage('processing')
      setStatus('Procesando el KML y preparando la capa temporal…')

      let job = submitted
      const deadline = Date.now() + 10 * 60 * 1000
      while (!FINAL_JOB_STATES.includes(job.jobStatus || '')) {
        if (Date.now() >= deadline) throw new Error('El proceso superó el tiempo máximo de espera de 10 minutos.')
        await wait(1500)
        job = await queryJson<JobResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}`)
        const latestMessage = job.messages?.map(message => message.description).filter(Boolean).pop()
        if (latestMessage) setStatus(latestMessage)
      }
      if (job.jobStatus !== 'esriJobSucceeded') {
        const detail = job.messages?.map(message => message.description).filter(Boolean).join(' ')
        throw new Error(detail || `El geoproceso terminó con estado ${job.jobStatus}.`)
      }
      setStatus('Recuperando la información de la carga…')
      const [globalIdResult, tokenResult, mapTokenResult] = await Promise.all([
        queryJson<ResultResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/globalid`),
        queryJson<ResultResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/token`),
        queryJson<ResultResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/map_token`)
      ])
      const globalId = String(globalIdResult.value || '').trim()
      const outputToken = String(tokenResult.value || '').trim()
      const mapToken = String(mapTokenResult.value || '').trim()
      if (!globalId) throw new Error('El geoproceso finalizó, pero no devolvió el GlobalID de la carga.')
      if (!outputToken) throw new Error('El geoproceso finalizó, pero no devolvió el token para editar la encuesta.')
      if (!mapToken) throw new Error('El geoproceso finalizó, pero no devolvió el token temporal para mostrar el mapa.')
      const surveyUrl = new URL(surveyFormUrl)
      surveyUrl.searchParams.set('portalUrl', PORTAL_URL)
      surveyUrl.searchParams.set('mode', 'edit')
      surveyUrl.searchParams.set('globalId', globalId)
      surveyUrl.searchParams.set('token', outputToken)
      const finalSurveyUrl = surveyUrl.toString()
      console.info('[Carga KML SIA] GlobalID recibido:', globalId)
      console.info('[Carga KML SIA] Token recibido:', `${outputToken.slice(0, 8)}…${outputToken.slice(-6)}`)
      console.info('[Carga KML SIA] Token de mapa recibido:', `${mapToken.slice(0, 8)}…${mapToken.slice(-6)}`)
      const diagnosticUrl = new URL(finalSurveyUrl)
      diagnosticUrl.searchParams.set('token', '[TOKEN_OCULTO]')
      console.info('[Carga KML SIA] URL Survey123:', diagnosticUrl.toString())
      setSurveyGlobalId(globalId)
      setSurveyToken(outputToken)
      setSurveyVisible(true)
      try {
        setStatus('Localizando y resaltando el polígono en el mapa…')
        await focusLoadedPolygon(globalId, mapToken)
      } catch (mapError) {
        console.warn('[Carga KML SIA] La carga terminó, pero no fue posible enfocar el polígono:', mapError)
      }
      setStage('success')
      setCompletedAt(new Intl.DateTimeFormat('es-CL', { dateStyle: 'short', timeStyle: 'short' }).format(new Date()))
      setStatus('KML cargado correctamente al sistema de Ingreso SIA.')
    } catch (processError) {
      console.error('[Carga KML SIA]', processError)
      setStage('error')
      setStatus('No fue posible completar la carga.')
      setError(processError instanceof Error ? processError.message : 'Ocurrió un error inesperado durante el proceso.')
    }
  }

  const reset = () => {
    setFile(null)
    setStage('idle')
    setStatus('Complete los datos y seleccione un archivo KML.')
    setError('')
    setJobId('')
    setSliderValue(0)
    setCompany('')
    setSurveyGlobalId('')
    setSurveyToken('')
    setSurveyVisible(false)
    setMapVisible(false)
    setCompletedAt('')
    setFinalStage('idle')
    setFinalStatus('')
    setFinalError('')
    setFinalJobId('')
    setFinalProgress(0)
    finalStartedRef.current = false
    if (inputRef.current) inputRef.current.value = ''
  }

  const progress = stage === 'uploading' ? 25 : stage === 'submitting' ? 50 : stage === 'processing' ? 75 : stage === 'success' ? 100 : 0

  return <div className="kml-sias jimu-widget kml-sias--dashboard">
    <div className="kml-sias__dashboard">
      <section className="kml-sias__manual kml-sias__section">
        <StepTitle step={1} title="Consideraciones Generales de Ingreso SIA" />
        <div className="kml-sias__manual-content">
          <p><strong>Advertencia de uso:</strong> Al ejecutar la herramienta de carga KML, el usuario solicitante dispondrá de <strong>1 hora</strong> para completar el formulario de ingreso de su Solicitud de Intervención de Áreas (SIA). Transcurrido ese plazo, será necesario volver a ejecutar la herramienta. La solicitud debe restringirse a áreas ubicadas dentro de <strong>una sola Área de Responsabilidad o Gerencia</strong>.</p>
          <p>Antes de realizar el ingreso de una SIA, es responsabilidad del usuario contar con la siguiente información y documentación:</p>
          <ol>
            <li>Archivo KML que contenga únicamente el área solicitada.</li>
            <li>Número y nombre del contrato en el que se enmarca la SIA.</li>
            <li>Fechas asociadas al contrato y a la ejecución:
              <ul><li>Inicio y término del contrato.</li><li>Inicio y término de ejecución de la SIA.</li><li>Término de la etapa de desmovilización.</li><li>Temporalidad de la infraestructura, si aplica.</li></ul>
            </li>
            <li>Nombre del área solicitada.</li>
            <li>Tipo de SIA: nueva solicitud o modificación de un área aprobada.</li>
            <li>Documentación requerida:
              <ul><li>KML del área solicitada.</li><li>Layout de instalaciones en PNG o JPG, integrado en PDF o PPTX si contiene varias imágenes.</li><li>Fotografías del área, agrupadas en un PDF o PPTX cuando corresponda.</li></ul>
            </li>
            <li>Documentación opcional:
              <ul><li>Plan de mantención de vehículos o equipos.</li><li>Plan ambiental y manejo de residuos.</li><li>Plan de permisos o resoluciones asociadas.</li></ul>
            </li>
            <li>Antecedentes sobre fauna, flora, patrimonio y estaciones o pozos de monitoreo.</li>
            <li>Descripción detallada del proyecto y observaciones relevantes.</li>
          </ol>
          <h3>Datos que solicitará el formulario</h3>
          <ul><li>Nombre, RUT, teléfono y correo del solicitante.</li><li>Tipo de solicitante y empresa.</li><li>Administrador de contrato, gerencia responsable y dueño del área.</li></ul>
          <h3>Consideraciones generales</h3>
          <ol><li>La autorización aplica sólo para los efectos y tiempos declarados.</li><li>Cambios de diseño o área deben ser evaluados con la Gerencia de Medio Ambiente.</li><li>Todo incidente ambiental debe reportarse inmediatamente.</li><li>Debe respetarse el orden de firmas establecido.</li><li>La firma del dueño del área corresponde al responsable formal del proceso.</li></ol>
          <a className="kml-sias__manual-link" href="https://intranetcentinela/Documentos/DocumentosCentinela/Gerencia%20de%20Planificaci%C3%B3n%20y%20Desarrollo/Superintendencia%20Planificaci%C3%B3n%20Largo%20Plazo/CEN-PO-GPD-SPL-001_v6%20SOLICITUD%20DE%20INTERVENCIO%CC%81N%20DE%20A%CC%81REAS%20ONLINE%20(SIG%20WEB)%20DESMOVILIZACIO%CC%81N%20Y%20CIERRE%20DE%20A%CC%81REAS.pdf" target="_blank" rel="noopener noreferrer">Consultar Manual de Procedimiento</a>
        </div>
      </section>

      <section className="kml-sias__workspace kml-sias__section">
        <StepTitle step={2} title="Carga KML de SIA" />
        <div className="kml-sias__credit"><strong>Solución desarrollada por:</strong><span>Gerencia de Planificación y Desarrollo Minera Centinela · Gerencia Medio Ambiente · Unidad GIS Vicepresidencia</span></div>
        <div className="kml-sias__workspace-body">
          <div ref={mapContainerRef} className={`kml-sias__map${mapVisible ? ' is-visible' : ''}`} aria-label="Mapa de ingreso SIA" />
          {!mapVisible && <main className="kml-sias__card kml-sias__card--dashboard">
            <div className="kml-sias__card-heading"><span>CARGA SEGURA</span><h2>Carga de archivos KML</h2><p>Complete los datos para iniciar su solicitud.</p></div>
            <section className="kml-sias__form" aria-label="Datos de contacto">
              <label>Ingrese su correo electrónico*:<input type="email" value={email} disabled={busy || stage === 'success'} onChange={event => setEmail(event.target.value)} autoComplete="email" />{email && !validEmail && <small>Ingrese un correo electrónico válido.</small>}</label>
              <label>Confirme su correo electrónico*:<input type="email" value={confirmation} disabled={busy || stage === 'success'} onChange={event => setConfirmation(event.target.value)} autoComplete="email" />{confirmation && !emailsMatch && <small>Los correos deben coincidir.</small>}</label>
            </section>
            <section className={`kml-sias__dropzone${dragging ? ' is-dragging' : ''}${file ? ' has-file' : ''}`}
              onDragEnter={event => { event.preventDefault(); if (!busy) setDragging(true) }} onDragOver={event => { event.preventDefault(); if (!busy) setDragging(true) }} onDragLeave={event => { event.preventDefault(); setDragging(false) }} onDrop={event => { event.preventDefault(); setDragging(false); if (!busy) selectFile(event.dataTransfer.files?.[0]) }} onClick={() => !busy && stage !== 'success' && inputRef.current?.click()} onKeyDown={event => { if (!busy && stage !== 'success' && (event.key === 'Enter' || event.key === ' ')) inputRef.current?.click() }} role="button" tabIndex={0} aria-label="Seleccionar o arrastrar archivo KML">
              <input ref={inputRef} type="file" accept=".kml,application/vnd.google-earth.kml+xml" disabled={busy || stage === 'success'} onChange={event => selectFile(event.target.files?.[0])} />
              <i aria-hidden="true">KML</i><strong>{file ? 'Archivo KML preparado' : 'Arrastre y suelte su archivo KML'}</strong><button type="button">{file ? 'Cambiar archivo' : 'Seleccionar archivo'}</button>{file && <span>{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</span>}
            </section>
            <section className="kml-sias__captcha"><label htmlFor={`${props.id}-human-slider`}>Verificación de seguridad <span>Deslice hasta el final</span></label><div><input id={`${props.id}-human-slider`} type="range" min="0" max="100" value={sliderValue} disabled={busy || stage === 'success'} onChange={event => setSliderValue(Number(event.target.value))} /><strong>{humanVerified ? 'OK' : `${sliderValue}%`}</strong></div>{sliderValue > 0 && !humanVerified && <small>Deslice hasta el final para continuar.</small>}</section>
            <input className="kml-sias__honeypot" type="text" value={company} onChange={event => setCompany(event.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" />
            {(busy || stage === 'success') && <div className="kml-sias__progress" aria-live="polite"><div><span>{status}</span><strong>{progress}%</strong></div><div className="kml-sias__track"><i style={{ width: `${progress}%` }} /></div></div>}
            {error && <div className="kml-sias__alert" role="alert"><strong>No fue posible completar el proceso</strong><span>{error}</span></div>}
            <div className="kml-sias__actions"><button type="button" className="is-primary" onClick={run} disabled={!canSubmit}>{busy ? 'Procesando…' : 'Ejecutar carga KML'}</button></div>
          </main>}
        </div>
        <div className="kml-sias__warning">▲ IMPORTANTE: El archivo KML sólo debe contener el área solicitada ▲</div>
      </section>

      <aside className="kml-sias__right-column">
        <section className="kml-sias__selection kml-sias__section"><StepTitle step={3} title="Ubicar su SIA" />
          {stage === 'success' ? <div className="kml-sias__selection-ready"><button type="button" onClick={() => { void centerLoadedPolygon() }}><i aria-hidden="true" /><span><strong>CENTRAR MAPA EN EL POLÍGONO CARGADO</strong><small>{file?.name} · {completedAt}</small></span><b>Ver en mapa ›</b></button><button type="button" className="kml-sias__restart" onClick={reset}>Nueva carga</button></div> : <div className="kml-sias__selection-empty"><i aria-hidden="true" /><span><strong>Solicitud pendiente</strong><small>Complete el paso 2 para cargar el polígono y abrir el formulario.</small></span></div>}
        </section>
        <section className="kml-sias__survey-panel kml-sias__section"><StepTitle step={4} title="Formulario de Ingreso SIA" />
          {surveyVisible
            ? <div className="kml-sias__survey-host">
              <div ref={surveyContainerRef} className="kml-sias__survey" aria-label="Formulario de ingreso SIA" />
              {finalStage !== 'idle' && <div className={`kml-sias__final-process is-${finalStage}`} role={finalStage === 'error' ? 'alert' : 'status'} aria-live="polite">
                <div className="kml-sias__final-process-card">
                  <i aria-hidden="true">{finalStage === 'success' ? '✓' : finalStage === 'error' ? '!' : ''}</i>
                  <strong>{finalStage === 'success' ? 'Solicitud procesada' : finalStage === 'error' ? 'Procesamiento pendiente' : 'Procesando solicitud SIA'}</strong>
                  <span>{finalStatus}</span>
                  {finalStage !== 'error' && <div className="kml-sias__final-track"><b style={{ width: `${finalProgress}%` }} /></div>}
                  {finalStage !== 'error' && <small>{finalProgress}%{finalJobId ? ` · Job ${finalJobId}` : ''}</small>}
                  {finalError && <p>{finalError}<br />El registro temporal se conserva para revisión segura.</p>}
                </div>
              </div>}
            </div>
            : <div className="kml-sias__survey-placeholder"><i aria-hidden="true">4</i><strong>Formulario pendiente</strong><p>Al completar la carga del KML, el formulario se abrirá automáticamente.</p></div>}
        </section>
      </aside>
    </div>
  </div>
}

export default Widget
