import { React, AllWidgetProps, SessionManager } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent, loadArcGISJSAPIModules } from 'jimu-arcgis'
import * as XLSX from 'xlsx'
import { IMConfig } from '../config'
import { GP_TASK_NAMES, toSubmitJobUrl } from '../service-url'
import './style.scss'

type ProcessStage = 'idle' | 'validating' | 'uploading' | 'submitting' | 'processing' | 'success' | 'error'

interface ArcGISError {
  code?: number
  message?: string
  details?: string[]
}

interface UploadResponse {
  success?: boolean
  item?: { itemID?: string, itemId?: string }
  error?: ArcGISError
}

interface JobResponse {
  jobId?: string
  jobStatus?: string
  messages?: Array<{ type?: string, description?: string }>
  results?: Record<string, unknown>
  error?: ArcGISError
}

interface ResultResponse {
  paramName?: string
  dataType?: string
  value?: unknown
  error?: ArcGISError
}

interface ProcessingResult {
  recordCount?: number
  message?: string
  summary?: Record<string, unknown>
  raw: Record<string, unknown>
  featureSet?: FeatureSetValue
  mapMessage?: string
  published?: boolean
}

interface FeatureSetValue {
  geometryType?: string
  spatialReference?: Record<string, unknown>
  fields?: Array<{ name: string, alias?: string, type?: string, length?: number }>
  features?: Array<{ geometry?: Record<string, unknown>, attributes?: Record<string, unknown> }>
}

interface CurvesFeatureSet {
  fields?: Array<{ name: string, alias?: string, type?: string }>
  features?: Array<{ attributes?: Record<string, unknown> }>
}

const ARCGIS_FIELD_TYPES: Record<string, string> = {
  esriFieldTypeOID: 'oid',
  esriFieldTypeString: 'string',
  esriFieldTypeDouble: 'double',
  esriFieldTypeSingle: 'single',
  esriFieldTypeInteger: 'integer',
  esriFieldTypeSmallInteger: 'small-integer',
  esriFieldTypeDate: 'date',
  esriFieldTypeDateOnly: 'date-only',
  esriFieldTypeTimeOnly: 'time-only',
  esriFieldTypeTimestampOffset: 'timestamp-offset',
  esriFieldTypeGlobalID: 'global-id',
  esriFieldTypeGUID: 'guid',
  esriFieldTypeBlob: 'blob',
  esriFieldTypeRaster: 'raster',
  esriFieldTypeXML: 'xml'
}

const COLLAR_FIELD_ORDER = [
  'r_nomb_recom', 'r_tiposondaje', 'r_nro_son', 'r_sector',
  'r_este', 'r_norte', 'r_cota', 'r_azimut', 'r_inclinacion',
  'r_largo', 'r_por_perforar', 'r_avance_actual', 'r_mts_faltantes',
  'r_avance', 'r_estatus_perf', 'r_largo_final', 'r_cert_collar',
  'r_observacion', 'q_des_campaña', 'q_año_sondaje', 'q_tipo_perf',
  'q_estado_son', 'av_programa', 'av_sonda', 'av_largo_program',
  'av_fondo_final', 'av_faltante_perf', 'av_pct_perforado', 'av_tricono',
  'av_mts_fotografia', 'av_mts_corte', 'av_mts_mapeo',
  'av_mts_preparacion', 'r_fch_inicio', 'r_fch_termino',
  'av_fch_ini', 'av_fch_term'
]

const COLLAR_MISSING_FIELDS: Record<string, { alias: string, type: string }> = {
  'q_des_campaña': { alias: 'Descripción de campaña', type: 'string' },
  'q_año_sondaje': { alias: 'Año de sondaje', type: 'double' },
  q_tipo_perf: { alias: 'Tipo de perforación', type: 'string' },
  q_estado_son: { alias: 'Estado del sondaje', type: 'string' }
}

const COLLAR_GDB_LABELS: Record<string, string> = Object.fromEntries(
  COLLAR_FIELD_ORDER.map(name => [name, name.startsWith('r_fch_') || name.startsWith('av_fch_') ? name : name.toUpperCase()])
)

const DEFAULT_SUBMIT_URL = 'https://sig.aminerals.cl/server/rest/services/CargaSondajes/GPServer'
const CURVES_SUBMIT_URL = 'https://sig.aminerals.cl/server/rest/services/ProcesarCurvasS/GPServer'
const DEFAULT_PUBLISH_SUBMIT_URL = 'https://sig.aminerals.cl/server/rest/services/CargaSondajesGDB/GPServer'
const MAX_FILE_SIZE = 25 * 1024 * 1024
const wait = async (milliseconds: number) => await new Promise(resolve => setTimeout(resolve, milliseconds))

const REQUIRED_WORKBOOK_SCHEMA = [
  {
    sheet: 'CONSOLIDADO_PROGRAMA',
    key: 'Sondaje',
    columns: [
      'ID', 'Tipo de Sondaje', 'Sondaje', 'Sector', 'Este', 'Norte', 'Cota',
      'Azimut', 'Inclinación', 'Largo (m)', 'Fecha Inicio', 'Fecha Termino',
      'Por Perforar (m)', 'Avance Actual (m)', 'Mts. Faltantes', '%Avance',
      'Estatus Perforación (m)', 'Largo Final (m)', 'Certificado Collar', 'Observación'
    ]
  },
  {
    sheet: 'AVANCE MUESTRERA',
    key: 'Sondaje',
    columns: [
      'Sondaje', 'Programa', 'Sonda', 'Inicio', 'Término', 'Largo Programado',
      'Fondo Final', 'Faltante', '% Perforado', 'Tricono', 'Fotografía',
      'Corte', 'Hasta3', 'Hasta2'
    ]
  }
]

const normalizeCell = (value: unknown) => String(value ?? '').trim()

const validateWorkbook = async (candidate: File): Promise<string> => {
  let workbook: XLSX.WorkBook
  try {
    workbook = XLSX.read(await candidate.arrayBuffer(), { type: 'array', cellDates: true })
  } catch (_) {
    throw new Error('El archivo no pudo abrirse como un libro XLSX válido. Verifique que no esté dañado o protegido con contraseña.')
  }

  const missingSheets = REQUIRED_WORKBOOK_SCHEMA
    .filter(definition => !workbook.SheetNames.includes(definition.sheet))
    .map(definition => definition.sheet)
  if (missingSheets.length) {
    throw new Error(`Faltan hojas obligatorias: ${missingSheets.join(', ')}.`)
  }

  const summaries: string[] = []
  for (const definition of REQUIRED_WORKBOOK_SCHEMA) {
    const rows = XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[definition.sheet], {
      header: 1,
      defval: null,
      raw: false
    })
    const headerRow = rows.slice(0, 50).findIndex(row => {
      const values = row.map(normalizeCell)
      return definition.columns.every(column => values.includes(column))
    })
    if (headerRow < 0) {
      throw new Error(`No se encontró el encabezado requerido en la hoja "${definition.sheet}" dentro de las primeras 50 filas.`)
    }
    const headers = (rows[headerRow] || []).map(normalizeCell)
    const missingColumns = definition.columns.filter(column => !headers.includes(column))
    if (missingColumns.length) {
      throw new Error(`La hoja "${definition.sheet}" no contiene las columnas requeridas: ${missingColumns.join(', ')}.`)
    }

    const duplicateHeaders = headers.filter((header, index) => header && headers.indexOf(header) !== index)
    if (duplicateHeaders.length) {
      throw new Error(`La hoja "${definition.sheet}" contiene encabezados duplicados: ${Array.from(new Set(duplicateHeaders)).join(', ')}.`)
    }

    const keyIndex = headers.indexOf(definition.key)
    const rawDataRows = rows.slice(headerRow + 1)
      .filter(row => row.some(value => normalizeCell(value) !== ''))
    const dataRows = rawDataRows.filter(row => normalizeCell(row[keyIndex]) !== '')
    if (!dataRows.length) throw new Error(`La hoja "${definition.sheet}" no contiene registros con ${definition.key}.`)

    const keys = dataRows.map(row => normalizeCell(row[keyIndex]).toUpperCase())
    const duplicateKeys = keys.filter((key, index) => keys.indexOf(key) !== index)
    if (duplicateKeys.length) {
      throw new Error(`La hoja "${definition.sheet}" contiene ${definition.key} duplicados: ${Array.from(new Set(duplicateKeys)).slice(0, 8).join(', ')}.`)
    }
    summaries.push(`${definition.sheet}: ${dataRows.length} registros`)
  }
  return summaries.join(' · ')
}

const REQUIRED_COORDINATE_COLUMNS = [
  'NRO_SON', 'DES_CAMPANA', 'ANNO_SONDAJE', 'DES_TIPO_PERF',
  'DES_ESTADO_SON', 'ESTE', 'NORTE', 'COTA'
]

const validateCoordinateCsv = async (candidate: File): Promise<string> => {
  let text: string
  try {
    const bytes = await candidate.arrayBuffer()
    text = new TextDecoder('windows-1252').decode(bytes)
  } catch (_) {
    throw new Error('No fue posible leer el archivo CSV de coordenadas.')
  }
  const separator = (text.split(/\r?\n/, 1)[0].match(/;/g)?.length || 0) >=
    (text.split(/\r?\n/, 1)[0].match(/,/g)?.length || 0) ? ';' : ','
  const workbook = XLSX.read(text, { type: 'string', FS: separator })
  const rows = XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[workbook.SheetNames[0]], {
    header: 1,
    defval: null,
    raw: false
  })
  const headers = (rows[0] || []).map(normalizeCell)
  const missing = REQUIRED_COORDINATE_COLUMNS.filter(column => !headers.includes(column))
  if (missing.length) throw new Error(`El CSV SNDTGIS_ACQ no contiene las columnas requeridas: ${missing.join(', ')}.`)
  const keyIndex = headers.indexOf('NRO_SON')
  const dataRows = rows.slice(1).filter(row => row.some(value => normalizeCell(value) !== ''))
  if (!dataRows.length) throw new Error('El CSV SNDTGIS_ACQ no contiene registros.')
  const keys = dataRows.map(row => normalizeCell(row[keyIndex]).toUpperCase()).filter(Boolean)
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index)
  if (duplicates.length) {
    throw new Error(`El CSV SNDTGIS_ACQ contiene NRO_SON duplicados: ${Array.from(new Set(duplicates)).slice(0, 8).join(', ')}.`)
  }
  return `SNDTGIS_ACQ: ${dataRows.length} registros`
}

const validateCurvesWorkbook = async (candidate: File): Promise<string> => {
  let workbook: XLSX.WorkBook
  try {
    workbook = XLSX.read(await candidate.arrayBuffer(), { type: 'array', cellDates: true })
  } catch (_) {
    throw new Error('El archivo no pudo abrirse como un libro XLSX válido.')
  }
  const sheet = workbook.Sheets.MLP_
  if (!sheet) throw new Error('El libro no contiene la hoja obligatoria MLP_.')
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: null, raw: false })
  const types: string[] = []
  for (let row = 0; row < rows.length - 2; row++) {
    for (let column = 0; column < (rows[row]?.length || 0); column++) {
      const title = normalizeCell(rows[row]?.[column])
      if (!title.startsWith('Detalle Mensual')) continue
      if (normalizeCell(rows[row + 1]?.[column]) !== 'Presupuesto' || normalizeCell(rows[row + 2]?.[column]) !== 'Real') continue
      const type = title.split(/\r?\n/, 2)[1]?.trim()
      if (type) types.push(type)
    }
  }
  const expected = ['Geológicos', 'Geometalúrgicos', 'EVU + Tigresas', 'Geotecnia & Estructural', 'Hidrogeológico']
  const missing = expected.filter(type => !types.includes(type))
  if (missing.length) throw new Error(`La hoja MLP_ no contiene los bloques requeridos: ${missing.join(', ')}.`)
  return `MLP_: ${expected.length} tipos · 12 meses · 60 registros acumulados`
}

interface CurvesTabProps {
  fallbackToken?: string
  curvesSubmitJobUrl?: string
  publishSubmitJobUrl?: string
}

const CurvesTab = ({ fallbackToken, curvesSubmitJobUrl: configuredCurvesUrl = CURVES_SUBMIT_URL, publishSubmitJobUrl: configuredPublishUrl = DEFAULT_PUBLISH_SUBMIT_URL }: CurvesTabProps) => {
  const curvesSubmitJobUrl = toSubmitJobUrl(configuredCurvesUrl, GP_TASK_NAMES.curvas)
  const publishSubmitJobUrl = toSubmitJobUrl(configuredPublishUrl, GP_TASK_NAMES.publicacion)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const [publish, setPublish] = React.useState(false)
  const [stage, setStage] = React.useState<ProcessStage>('idle')
  const [status, setStatus] = React.useState('Seleccione el Master Plan para comenzar.')
  const [validation, setValidation] = React.useState('')
  const [error, setError] = React.useState('')
  const [result, setResult] = React.useState<{ count?: number, message?: string, summary?: Record<string, unknown>, table?: CurvesFeatureSet, published?: boolean } | null>(null)
  const [selectedCurveType, setSelectedCurveType] = React.useState('')
  const taskUrl = curvesSubmitJobUrl.replace(/\/submitJob\/?$/i, '')
  const gpServerUrl = taskUrl.replace(/\/GPServer\/.*$/i, '/GPServer')
  const publishTaskUrl = publishSubmitJobUrl.replace(/\/submitJob\/?$/i, '')
  const busy = ['validating', 'uploading', 'submitting', 'processing'].includes(stage)
  const progress = stage === 'validating' ? 15 : stage === 'uploading' ? 30 : stage === 'submitting' ? 50 : stage === 'processing' ? 75 : stage === 'success' ? 100 : 0

  const tokens = React.useCallback(() => {
    const manager = SessionManager.getInstance()
    const session = manager.getSessionByUrl(curvesSubmitJobUrl) || manager.getSessionByUrl(publishSubmitJobUrl) || manager.getMainSession()
    const values: Array<string | undefined> = []
    if (session?.token) values.push(session.token)
    if (fallbackToken && fallbackToken !== session?.token) values.push(fallbackToken)
    values.push(undefined)
    return values
  }, [fallbackToken, curvesSubmitJobUrl, publishSubmitJobUrl])

  const request = React.useCallback(async <T,>(url: string, bodyFactory: (token?: string) => FormData | URLSearchParams): Promise<T> => {
    let last: Error = null
    for (const token of tokens()) {
      try {
        const body = bodyFactory(token)
        const response = await fetch(url, {
          method: 'POST',
          headers: body instanceof URLSearchParams ? { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } : undefined,
          body: body instanceof URLSearchParams ? body.toString() : body
        })
        if (!response.ok) throw new Error(`El servidor respondió HTTP ${response.status}.`)
        const data = await response.json() as T & { error?: ArcGISError }
        if (data.error) throw new Error([data.error.message, ...(data.error.details || [])].filter(Boolean).join(' '))
        return data
      } catch (requestError) {
        last = requestError instanceof Error ? requestError : new Error('No fue posible consultar el servicio.')
      }
    }
    throw last || new Error('No hay una sesión disponible para acceder al servicio.')
  }, [tokens])

  const requestJson = React.useCallback(async <T,>(url: string) => await request<T>(url, token => {
    const params = new URLSearchParams({ f: 'json' }); if (token) params.set('token', token); return params
  }), [request])

  const publishPreparedCurves = async () => {
    if (!result?.table?.features?.length || busy) return
    setError('')
    try {
      setStage('submitting'); setStatus('Enviando el resultado validado a Curvas_Sâ€¦')
      const submitted = await request<JobResponse>(publishSubmitJobUrl, token => {
        const params = new URLSearchParams({
          f: 'json',
          tipo_resultado: 'Curvas S',
          curvas_s_procesadas: JSON.stringify(result.table)
        })
        if (token) params.set('token', token)
        return params
      })
      if (!submitted.jobId) throw new Error('La publicaciÃ³n no devolviÃ³ un jobId.')
      setStage('processing'); setStatus('Publicando los 60 registros ya procesadosâ€¦')
      let job = submitted; const deadline = Date.now() + 2 * 60 * 1000
      while (job.jobStatus !== 'esriJobSucceeded') {
        if (['esriJobFailed', 'esriJobCancelled', 'esriJobTimedOut'].includes(job.jobStatus || '')) {
          throw new Error(job.messages?.map(message => message.description).filter(Boolean).join(' ') || 'No fue posible publicar Curvas S.')
        }
        if (Date.now() >= deadline) throw new Error('La publicaciÃ³n superÃ³ el tiempo mÃ¡ximo de espera.')
        await wait(1000); job = await requestJson<JobResponse>(`${publishTaskUrl}/jobs/${encodeURIComponent(submitted.jobId)}`)
      }
      const countOutput = await requestJson<ResultResponse>(`${publishTaskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/cantidad_publicada`)
      const messageOutput = await requestJson<ResultResponse>(`${publishTaskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/mensaje_resultado`)
      setResult({ ...result, count: Number(countOutput.value), message: String(messageOutput.value || ''), published: true })
      setStage('success'); setStatus('Resultado validado publicado en Curvas_S.')
    } catch (publishError) {
      setStage('error'); setStatus('No fue posible publicar el resultado validado.')
      setError(publishError instanceof Error ? publishError.message : 'OcurriÃ³ un error durante la publicaciÃ³n.')
    }
  }

  const selectFile = async (candidate?: File) => {
    setError(''); setValidation(''); setResult(null)
    if (!candidate) return
    if (!candidate.name.toLowerCase().endsWith('.xlsx')) { setFile(null); setError('Seleccione un archivo con extensión .xlsx.'); return }
    if (candidate.size > MAX_FILE_SIZE) { setFile(null); setError('El archivo supera el máximo permitido de 25 MB.'); return }
    setStage('validating'); setStatus('Validando hoja MLP_ y bloques del Master Plan…')
    try {
      const summary = await validateCurvesWorkbook(candidate)
      setFile(candidate); setValidation(summary); setStage('idle'); setStatus('Archivo validado y preparado para procesar.')
    } catch (validationError) {
      setFile(null); setStage('error'); setStatus('El archivo no cumple el formato requerido.')
      setError(validationError instanceof Error ? validationError.message : 'No fue posible validar el Master Plan.')
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const run = async () => {
    if (!file || busy) return
    if (publish && result?.table?.features?.length && !result.published) {
      await publishPreparedCurves()
      return
    }
    setError(''); setResult(null)
    try {
      setStage('uploading'); setStatus('Cargando Master Plan al servidor…')
      const upload = await request<UploadResponse>(`${gpServerUrl}/uploads/upload`, token => {
        const form = new FormData(); form.append('f', 'json'); form.append('file', file, file.name)
        form.append('description', `Master Plan cargado desde Experience Builder: ${file.name}`)
        if (token) form.append('token', token); return form
      })
      const itemId = upload.item?.itemID || upload.item?.itemId
      if (!itemId) throw new Error('El servidor no devolvió el itemID del archivo.')
      setStage('submitting'); setStatus('Iniciando cálculo de curvas acumuladas…')
      const submitted = await request<JobResponse>(curvesSubmitJobUrl, token => {
        const params = new URLSearchParams({ f: 'json', archivo_excel: JSON.stringify({ itemID: itemId }), publicar_en_curvas_s: publish ? 'true' : 'false' })
        if (token) params.set('token', token); return params
      })
      if (!submitted.jobId) throw new Error('El geoproceso no devolvió un jobId.')
      setStage('processing'); setStatus('Procesando cinco tipos y doce meses…')
      let job = submitted; const deadline = Date.now() + 5 * 60 * 1000
      while (job.jobStatus !== 'esriJobSucceeded') {
        if (['esriJobFailed', 'esriJobCancelled', 'esriJobTimedOut'].includes(job.jobStatus || '')) {
          throw new Error(job.messages?.map(message => message.description).filter(Boolean).join(' ') || 'El geoproceso no pudo completarse.')
        }
        if (Date.now() >= deadline) throw new Error('El procesamiento superó el tiempo máximo de espera.')
        await wait(1500); job = await requestJson<JobResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}`)
      }
      setStatus('Recuperando resumen de la carga…')
      const names = ['curvas_acumuladas', 'cantidad_registros', 'mensaje_resultado', 'resumen_json']
      const outputs = await Promise.all(names.map(async name => [name, (await requestJson<ResultResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/${name}`)).value] as [string, unknown]))
      const raw = Object.fromEntries(outputs); let summary: Record<string, unknown>
      if (typeof raw.resumen_json === 'string') { try { summary = JSON.parse(raw.resumen_json) } catch (_) { /* sin resumen estructurado */ } }
      const table = raw.curvas_acumuladas as CurvesFeatureSet
      setResult({ count: Number(raw.cantidad_registros), message: String(raw.mensaje_resultado || ''), summary, table, published: publish })
      const firstType = table?.features?.[0]?.attributes
      if (firstType) setSelectedCurveType(String(curveAttribute(firstType, 'TIPO') || ''))
      setStage('success'); setStatus('Curvas S procesadas correctamente.')
    } catch (processError) {
      console.error('[Curvas S] error:', processError); setStage('error'); setStatus('No fue posible procesar el Master Plan.')
      setError(processError instanceof Error ? processError.message : 'Ocurrió un error inesperado.')
    }
  }

  const reset = () => { setFile(null); setPublish(false); setStage('idle'); setStatus('Seleccione el Master Plan para comenzar.'); setValidation(''); setError(''); setResult(null); setSelectedCurveType(''); if (inputRef.current) inputRef.current.value = '' }
  const curveFields = ['TIPO', 'MES', 'PRESUPUESTO', 'REAL', 'AÑO']
  const curveRows = result?.table?.features || []
  const curveAttribute = (attributes: Record<string, unknown>, name: string): unknown => {
    const actual = Object.keys(attributes || {}).find(key => key.toUpperCase() === name.toUpperCase())
    return actual ? attributes[actual] : ''
  }
  const formatCurveValue = (name: string, value: unknown): string => {
    if (value === null || value === undefined) return ''
    if (name === 'PRESUPUESTO' || name === 'REAL') {
      const number = Number(value)
      return Number.isFinite(number) ? number.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : String(value)
    }
    return String(value)
  }
  const exportCurvesCsv = () => {
    if (!curveRows.length) return
    const escape = (value: unknown) => {
      const text = String(value ?? '').replace(/"/g, '""')
      return /[;"\r\n]/.test(text) ? `"${text}"` : text
    }
    const rows = curveRows.map(feature => curveFields.map(name => escape(curveAttribute(feature.attributes || {}, name))).join(';'))
    const csv = `\uFEFF${curveFields.join(';')}\r\n${rows.join('\r\n')}`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url
    link.download = `${(file?.name || 'curvas_s').replace(/\.xlsx$/i, '')}_Curvas_S.csv`
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url)
  }
  const monthOrder = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const curveTypes = Array.from(new Set(curveRows.map(feature => String(curveAttribute(feature.attributes || {}, 'TIPO'))))).filter(Boolean)
  const activeCurveType = selectedCurveType || curveTypes[0] || ''
  const chartRows = curveRows
    .filter(feature => String(curveAttribute(feature.attributes || {}, 'TIPO')) === activeCurveType)
    .sort((a, b) => monthOrder.indexOf(String(curveAttribute(a.attributes || {}, 'MES')).trim()) - monthOrder.indexOf(String(curveAttribute(b.attributes || {}, 'MES')).trim()))
  const chartValues = chartRows.flatMap(feature => [Number(curveAttribute(feature.attributes || {}, 'PRESUPUESTO')), Number(curveAttribute(feature.attributes || {}, 'REAL'))]).filter(Number.isFinite)
  const chartMax = Math.max(...chartValues, 1)
  const chartWidth = 620; const chartHeight = 230; const chartPadding = { left: 54, right: 18, top: 18, bottom: 35 }
  const chartX = (index: number) => chartPadding.left + index * ((chartWidth - chartPadding.left - chartPadding.right) / 11)
  const chartY = (value: number) => chartPadding.top + (chartHeight - chartPadding.top - chartPadding.bottom) * (1 - value / chartMax)
  const chartPath = (field: string) => chartRows.map((feature, index) => `${index === 0 ? 'M' : 'L'} ${chartX(index)} ${chartY(Number(curveAttribute(feature.attributes || {}, field)) || 0)}`).join(' ')
  const lastChartRow = chartRows[chartRows.length - 1]?.attributes || {}
  const lastBudget = Number(curveAttribute(lastChartRow, 'PRESUPUESTO')) || 0
  const lastReal = Number(curveAttribute(lastChartRow, 'REAL')) || 0
  const compliance = lastBudget ? lastReal / lastBudget * 100 : 0
  const size = file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''
  return <main className="excel-uploader__content excel-uploader__curves">
    <div className="excel-uploader__steps"><span className={file ? 'is-active' : ''}><i>1</i>Archivo</span><span className={validation ? 'is-active' : ''}><i>2</i>Validación</span><span className={busy || stage === 'success' ? 'is-active' : ''}><i>3</i>Procesamiento</span></div>
    <div className="excel-uploader__section-head"><h3>1. Master Plan MLP</h3><small>Hoja MLP_</small></div>
    <div className={`excel-uploader__dropzone excel-uploader__dropzone--curves${file ? ' has-file' : ''}`} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); if (!busy) selectFile(event.dataTransfer.files?.[0]) }} onClick={() => !busy && inputRef.current?.click()} role="button" tabIndex={0}>
      <input ref={inputRef} type="file" accept=".xlsx" onChange={event => selectFile(event.target.files?.[0])} disabled={busy} />
      <b className="excel-uploader__file-role">Master Plan</b><div className="excel-uploader__file-icon">X</div>
      {file ? <><strong>{file.name}</strong><span>{size} · Archivo XLSX</span><small>Haga clic para reemplazar</small></> : <><strong>Seleccione Master Plan MLP 2026.xlsx</strong><span>o arrastre el archivo aquí</span><small>Se procesará directamente la hoja MLP_</small></>}
    </div>
    {(busy || stage === 'success') && <div className="excel-uploader__progress"><div><span>{status}</span><strong>{progress}%</strong></div><div className="excel-uploader__track"><i style={{ width: `${progress}%` }} /></div></div>}
    {error && <div className="excel-uploader__alert excel-uploader__alert--error"><strong>No fue posible validar o procesar</strong><span>{error}</span></div>}
    {validation && !error && <div className="excel-uploader__alert excel-uploader__alert--success"><strong>Master Plan válido</strong><span>{validation}</span></div>}
    {result && <section className="excel-uploader__result"><div className="excel-uploader__success-icon">✓</div><div className="excel-uploader__result-copy"><span>Proceso completado</span><h3>{result.count?.toLocaleString('es-CL')} registros</h3><p>{result.message}</p><p className="excel-uploader__map-message">{result.published ? 'La tabla Curvas_S fue actualizada en la geodatabase.' : 'Resultado generado sin modificar Curvas_S.'}</p>{curveRows.length > 0 && <button type="button" className="excel-uploader__export" onClick={exportCurvesCsv}>Exportar CSV</button>}</div></section>}
    {chartRows.length > 0 && <section className="excel-uploader__chart">
      <div className="excel-uploader__chart-head"><div><strong>Avance acumulado</strong><small>Presupuesto versus real por mes</small></div><select value={activeCurveType} onChange={event => setSelectedCurveType(event.target.value)} aria-label="Seleccionar tipo de curva">{curveTypes.map(type => <option key={type} value={type}>{type}</option>)}</select></div>
      <div className="excel-uploader__chart-kpis"><div><span>Presupuesto</span><strong>{lastBudget.toLocaleString('es-CL', { maximumFractionDigits: 2 })}</strong></div><div><span>Real</span><strong>{lastReal.toLocaleString('es-CL', { maximumFractionDigits: 2 })}</strong></div><div><span>Cumplimiento</span><strong>{compliance.toLocaleString('es-CL', { maximumFractionDigits: 1 })}%</strong></div></div>
      <div className="excel-uploader__chart-scroll"><svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`Curva acumulada para ${activeCurveType}`}>
        {[0, .25, .5, .75, 1].map(ratio => <g key={ratio}><line x1={chartPadding.left} y1={chartY(chartMax * ratio)} x2={chartWidth - chartPadding.right} y2={chartY(chartMax * ratio)} className="grid" /><text x={chartPadding.left - 8} y={chartY(chartMax * ratio) + 3} textAnchor="end">{Math.round(chartMax * ratio).toLocaleString('es-CL')}</text></g>)}
        {chartRows.map((feature, index) => <text key={index} x={chartX(index)} y={chartHeight - 12} textAnchor="middle">{String(curveAttribute(feature.attributes || {}, 'MES')).trim()}</text>)}
        <path d={chartPath('PRESUPUESTO')} className="budget-line" />
        <path d={chartPath('REAL')} className="real-line" />
        {chartRows.map((feature, index) => <g key={`points-${index}`}><circle cx={chartX(index)} cy={chartY(Number(curveAttribute(feature.attributes || {}, 'PRESUPUESTO')) || 0)} r="3" className="budget-point"><title>{`Presupuesto ${String(curveAttribute(feature.attributes || {}, 'MES')).trim()}: ${formatCurveValue('PRESUPUESTO', curveAttribute(feature.attributes || {}, 'PRESUPUESTO'))}`}</title></circle><circle cx={chartX(index)} cy={chartY(Number(curveAttribute(feature.attributes || {}, 'REAL')) || 0)} r="3" className="real-point"><title>{`Real ${String(curveAttribute(feature.attributes || {}, 'MES')).trim()}: ${formatCurveValue('REAL', curveAttribute(feature.attributes || {}, 'REAL'))}`}</title></circle></g>)}
      </svg></div>
      <div className="excel-uploader__chart-legend"><span className="budget">Presupuesto acumulado</span><span className="real">Real acumulado</span></div>
    </section>}
    {curveRows.length > 0 && <section className="excel-uploader__table-result" aria-label="Resultado Curvas S">
      <div className="excel-uploader__table-head"><div><strong>Vista previa de Curvas_S</strong><small>{curveRows.length} registros · Desplace para revisar</small></div><button type="button" onClick={exportCurvesCsv}>Descargar CSV</button></div>
      <div className="excel-uploader__table-scroll"><table><thead><tr>{curveFields.map(name => <th key={name}>{name}</th>)}</tr></thead><tbody>{curveRows.map((feature, index) => <tr key={index}>{curveFields.map(name => <td key={name}>{formatCurveValue(name, curveAttribute(feature.attributes || {}, name))}</td>)}</tr>)}</tbody></table></div>
    </section>}
    <div className="excel-uploader__section-head excel-uploader__section-head--mode"><h3>2. Modo de ejecución</h3><small>Publicación opcional</small></div>
    <label className={`excel-uploader__publish-option${publish ? ' is-selected' : ''}`}><input type="checkbox" checked={publish} onChange={event => setPublish(event.target.checked)} disabled={busy} /><span><strong>Publicar en Curvas_S</strong><small>Reemplaza los 60 registros de la tabla. Sin marcar, solo valida y genera el resultado temporal.</small></span></label>
    <div className="excel-uploader__actions"><button type="button" className="excel-uploader__primary" onClick={run} disabled={!file || busy || Boolean(publish && result?.published)}>{busy ? <><i className="excel-uploader__spinner" />Procesando…</> : publish && result?.published ? 'Publicado en Curvas_S' : publish && result?.table?.features?.length ? 'Publicar resultado validado' : publish ? 'Procesar y publicar' : 'Procesar sin publicar'}</button><button type="button" onClick={reset} disabled={busy || !file}>Limpiar</button></div>
  </main>
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [activeTab, setActiveTab] = React.useState<'sondajes' | 'curvas'>('sondajes')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const coordinateInputRef = React.useRef<HTMLInputElement>(null)
  const resultLayerRef = React.useRef<any>(null)
  const [jimuMapView, setJimuMapView] = React.useState<JimuMapView>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const [coordinateFile, setCoordinateFile] = React.useState<File | null>(null)
  const [publishToGdb, setPublishToGdb] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [stage, setStage] = React.useState<ProcessStage>('idle')
  const [status, setStatus] = React.useState('Seleccione un archivo para comenzar.')
  const [error, setError] = React.useState('')
  const [validationMessage, setValidationMessage] = React.useState('')
  const [result, setResult] = React.useState<ProcessingResult | null>(null)
  const submitJobUrl = toSubmitJobUrl(props.config.submitJobUrl || DEFAULT_SUBMIT_URL, GP_TASK_NAMES.sondajes)
  const publishSubmitJobUrl = toSubmitJobUrl(props.config.publishSubmitJobUrl || DEFAULT_PUBLISH_SUBMIT_URL, GP_TASK_NAMES.publicacion)
  const taskUrl = submitJobUrl.replace(/\/submitJob\/?$/i, '')
  const publishTaskUrl = publishSubmitJobUrl.replace(/\/submitJob\/?$/i, '')
  const gpServerUrl = taskUrl.replace(/\/GPServer\/.*$/i, '/GPServer')

  const getTokens = React.useCallback((): Array<string | undefined> => {
    const manager = SessionManager.getInstance()
    const session = manager.getSessionByUrl(submitJobUrl) || manager.getSessionByUrl(publishSubmitJobUrl) || manager.getMainSession()
    const sessionToken = session?.token
    const fallbackToken = props.config.fallbackToken
    const candidates: Array<string | undefined> = []
    if (sessionToken) candidates.push(sessionToken)
    if (fallbackToken && fallbackToken !== sessionToken) candidates.push(fallbackToken)
    // Permite probar servicios públicos aunque un token local haya vencido.
    candidates.push(undefined)
    return candidates
  }, [props.config.fallbackToken, submitJobUrl, publishSubmitJobUrl])

  const errorText = (error?: ArcGISError) => {
    const details = error?.details?.filter(Boolean).join(' ')
    return [error?.message, details].filter(Boolean).join(' ') || 'El servicio devolvió un error no especificado.'
  }

  const requestForm = React.useCallback(async <T,>(url: string, buildBody: (token?: string) => FormData | URLSearchParams): Promise<T> => {
    let lastError: Error | null = null
    for (const token of getTokens()) {
      try {
        const body = buildBody(token)
        const response = await fetch(url, {
          method: 'POST',
          headers: body instanceof URLSearchParams ? { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } : undefined,
          body: body instanceof URLSearchParams ? body.toString() : body
        })
        if (!response.ok) throw new Error(`El servidor respondió HTTP ${response.status}.`)
        const data = await response.json() as T & { error?: ArcGISError }
        if (data.error) throw new Error(errorText(data.error))
        return data
      } catch (requestError) {
        lastError = requestError instanceof Error ? requestError : new Error('No fue posible consultar el servicio.')
      }
    }
    throw lastError || new Error('No hay una sesión o token disponible para acceder al servicio.')
  }, [getTokens])

  const requestJson = React.useCallback(async <T,>(url: string): Promise<T> => {
    return await requestForm<T>(url, token => {
      const params = new URLSearchParams({ f: 'json' })
      if (token) params.set('token', token)
      return params
    })
  }, [requestForm])

  const showFeatureSetOnMap = React.useCallback(async (featureSet: FeatureSetValue): Promise<string> => {
    if (!jimuMapView?.view?.map) return 'Resultado listo. Configure un Map Widget para visualizar los puntos.'
    const [FeatureLayer, Graphic, Point] = await loadArcGISJSAPIModules([
      'esri/layers/FeatureLayer',
      'esri/Graphic',
      'esri/geometry/Point'
    ])
    if (resultLayerRef.current) jimuMapView.view.map.remove(resultLayerRef.current)
    const graphics = (featureSet.features || []).flatMap(feature => {
      const geometry = feature.geometry as { x?: unknown, y?: unknown, z?: unknown, spatialReference?: unknown } | undefined
      if (!geometry || geometry.x == null || geometry.y == null || geometry.x === '' || geometry.y === '') return []
      const x = Number(geometry?.x)
      const y = Number(geometry?.y)
      if (!Number.isFinite(x) || !Number.isFinite(y)) return []
      const z = Number(geometry.z)
      const point = new Point({
        x,
        y,
        ...(Number.isFinite(z) ? { z } : {}),
        spatialReference: geometry.spatialReference || featureSet.spatialReference
      })
      return [new Graphic({
        geometry: point,
        attributes: feature.attributes || {}
      })]
    })
    if (graphics.length === 0) {
      throw new Error('El servicio terminó correctamente, pero no devolvió geometrías de punto válidas.')
    }
    const fields = (featureSet.fields || []).map(field => ({
      ...field,
      type: ARCGIS_FIELD_TYPES[field.type || ''] || field.type
    }))
    const availableFieldNames = new Set(fields.map(field => field.name.toLowerCase()))
    Object.entries(COLLAR_MISSING_FIELDS).forEach(([name, definition]) => {
      if (!availableFieldNames.has(name.toLowerCase())) {
        fields.push({
          name,
          alias: definition.alias,
          type: definition.type
        })
      }
    })
    const objectIdField = fields.find(field => /oid/i.test(field.type || ''))?.name || 'OBJECTID'
    const popupTemplate = {
      title: 'Sondaje {r_nro_son}',
      content: [{
        type: 'fields',
        fieldInfos: COLLAR_FIELD_ORDER
          .filter(name => fields.some(field => field.name.toLowerCase() === name.toLowerCase()))
          .map(name => {
            const field = fields.find(candidate => candidate.name.toLowerCase() === name.toLowerCase())
            const numeric = ['double', 'single', 'integer', 'small-integer'].includes(field?.type || '')
            const date = field?.type === 'date' || field?.type === 'date-only'
            return {
              fieldName: field?.name || name,
              label: COLLAR_GDB_LABELS[name] || field?.name || name,
              visible: true,
              ...(numeric ? { format: { digitSeparator: true, places: 2 } } : {}),
              ...(date ? { format: { dateFormat: 'short-date' } } : {})
            }
          })
      }]
    }
    const layer = new FeatureLayer({
      title: 'Sondajes procesados',
      source: graphics,
      fields,
      objectIdField,
      geometryType: 'point',
      spatialReference: featureSet.spatialReference,
      popupTemplate,
      renderer: {
        type: 'simple',
        symbol: { type: 'simple-marker', style: 'circle', color: '#007f86', size: 9, outline: { color: '#fff', width: 1.2 } }
      }
    })
    jimuMapView.view.map.add(layer)
    resultLayerRef.current = layer
    await layer.load()
    const extent = layer.fullExtent
    if (extent && Number.isFinite(extent.xmin) && Number.isFinite(extent.ymin) &&
      Number.isFinite(extent.xmax) && Number.isFinite(extent.ymax)) {
      await jimuMapView.view.goTo(extent.expand(1.15))
    }
    const discarded = (featureSet.features?.length || 0) - graphics.length
    return discarded > 0
      ? `${graphics.length} puntos agregados al mapa; ${discarded} geometrías inválidas fueron descartadas.`
      : `${graphics.length} puntos agregados al mapa.`
  }, [jimuMapView])

  const validateAndSelect = async (candidate?: File) => {
    setError('')
    setValidationMessage('')
    setResult(null)
    setStage('idle')
    if (!candidate) return
    if (!candidate.name.toLowerCase().endsWith('.xlsx')) {
      setFile(null)
      setError('Formato no permitido. Seleccione un archivo Excel con extensión .xlsx.')
      return
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setFile(null)
      setError('El archivo supera el máximo permitido de 25 MB.')
      return
    }
    setFile(null)
    setStage('validating')
    setStatus('Validando hojas, encabezados y registros del archivo…')
    try {
      const summary = await validateWorkbook(candidate)
      setFile(candidate)
      setValidationMessage(`Estructura validada correctamente. ${summary}.`)
      setStatus(coordinateFile ? 'Ambas entradas están validadas y preparadas para procesar.' : 'Excel validado. Seleccione ahora el CSV SNDTGIS_ACQ.')
      setStage('idle')
    } catch (validationError) {
      setStage('error')
      setStatus('El archivo no cumple el formato requerido.')
      setError(validationError instanceof Error ? validationError.message : 'No fue posible validar la estructura del Excel.')
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const validateAndSelectCoordinates = async (candidate?: File) => {
    setError('')
    setValidationMessage('')
    setResult(null)
    setStage('idle')
    if (!candidate) return
    if (!candidate.name.toLowerCase().endsWith('.csv')) {
      setCoordinateFile(null)
      setError('Formato no permitido para las coordenadas. Seleccione un archivo SNDTGIS_ACQ con extensión .csv.')
      return
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setCoordinateFile(null)
      setError('El CSV de coordenadas supera el máximo permitido de 25 MB.')
      return
    }
    setCoordinateFile(null)
    setStage('validating')
    setStatus('Validando esquema y registros de SNDTGIS_ACQ…')
    try {
      const summary = await validateCoordinateCsv(candidate)
      setCoordinateFile(candidate)
      setValidationMessage(`Archivo de coordenadas válido. ${summary}.`)
      setStatus(file ? 'Ambas entradas están validadas y preparadas para procesar.' : 'CSV validado. Seleccione ahora el libro Excel.')
      setStage('idle')
    } catch (validationError) {
      setStage('error')
      setStatus('El CSV no cumple el formato requerido.')
      setError(validationError instanceof Error ? validationError.message : 'No fue posible validar SNDTGIS_ACQ.')
      if (coordinateInputRef.current) coordinateInputRef.current.value = ''
    }
  }

  const publishPreparedSondajes = async () => {
    if (!result?.featureSet?.features?.length) return
    setError('')
    try {
      setStage('submitting')
      setStatus('Enviando el resultado validado a Collar_Recomendadoâ€¦')
      const submitted = await requestForm<JobResponse>(publishSubmitJobUrl, token => {
        const params = new URLSearchParams({
          f: 'json',
          tipo_resultado: 'Sondajes',
          sondajes_procesados: JSON.stringify(result.featureSet)
        })
        if (token) params.set('token', token)
        return params
      })
      if (!submitted.jobId) throw new Error('La publicaciÃ³n no devolviÃ³ un jobId.')
      setStage('processing')
      setStatus('Publicando los sondajes ya procesadosâ€¦')
      let job = submitted
      const deadline = Date.now() + 2 * 60 * 1000
      while (job.jobStatus !== 'esriJobSucceeded') {
        if (['esriJobFailed', 'esriJobCancelled', 'esriJobTimedOut'].includes(job.jobStatus || '')) {
          const detail = job.messages?.map(item => item.description).filter(Boolean).join(' ')
          throw new Error(detail || 'No fue posible publicar Collar_Recomendado.')
        }
        if (Date.now() >= deadline) throw new Error('La publicaciÃ³n superÃ³ el tiempo mÃ¡ximo de espera.')
        await wait(1000)
        job = await requestJson<JobResponse>(`${publishTaskUrl}/jobs/${encodeURIComponent(submitted.jobId)}`)
      }
      const countOutput = await requestJson<ResultResponse>(`${publishTaskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/cantidad_publicada`)
      const messageOutput = await requestJson<ResultResponse>(`${publishTaskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/mensaje_resultado`)
      if (resultLayerRef.current && jimuMapView?.view?.map) {
        jimuMapView.view.map.remove(resultLayerRef.current)
        resultLayerRef.current = null
      }
      setResult({
        ...result,
        recordCount: Number(countOutput.value),
        message: String(messageOutput.value || ''),
        mapMessage: 'El resultado validado fue publicado en Collar_Recomendado.',
        published: true
      })
      setStage('success')
      setStatus('Resultado validado publicado correctamente.')
    } catch (publishError) {
      setStage('error')
      setStatus('No fue posible publicar el resultado validado.')
      setError(publishError instanceof Error ? publishError.message : 'OcurriÃ³ un error durante la publicaciÃ³n.')
    }
  }

  const runProcess = async () => {
    if (!file || !coordinateFile || stage === 'uploading' || stage === 'submitting' || stage === 'processing') return
    if (publishToGdb && result?.featureSet?.features?.length && !result.published) {
      await publishPreparedSondajes()
      return
    }
    setError('')
    setResult(null)

    if (publishToGdb && resultLayerRef.current && jimuMapView?.view?.map) {
      jimuMapView.view.map.remove(resultLayerRef.current)
      resultLayerRef.current = null
    }

    try {
      setStage('uploading')
      setStatus('Cargando archivo al servidor seguro…')
      const uploaded = await requestForm<UploadResponse>(`${gpServerUrl}/uploads/upload`, token => {
        const form = new FormData()
        form.append('f', 'json')
        form.append('file', file, file.name)
        form.append('description', `Archivo cargado desde Experience Builder: ${file.name}`)
        if (token) form.append('token', token)
        return form
      })
      const itemId = uploaded.item?.itemID || uploaded.item?.itemId
      if (!itemId) throw new Error('La carga terminó, pero el servidor no devolvió el itemID del archivo.')

      setStatus('Excel cargado. Cargando coordenadas SNDTGIS_ACQ…')
      const uploadedCoordinates = await requestForm<UploadResponse>(`${gpServerUrl}/uploads/upload`, token => {
        const form = new FormData()
        form.append('f', 'json')
        form.append('file', coordinateFile, coordinateFile.name)
        form.append('description', `Coordenadas cargadas desde Experience Builder: ${coordinateFile.name}`)
        if (token) form.append('token', token)
        return form
      })
      const coordinateItemId = uploadedCoordinates.item?.itemID || uploadedCoordinates.item?.itemId
      if (!coordinateItemId) throw new Error('El servidor no devolvió el itemID del CSV de coordenadas.')

      setStage('submitting')
      setStatus('Archivo cargado. Iniciando el geoproceso…')
      const submitted = await requestForm<JobResponse>(submitJobUrl, token => {
        const params = new URLSearchParams({
          f: 'json',
          archivo_excel: JSON.stringify({ itemID: itemId }),
          archivo_coordenadas: JSON.stringify({ itemID: coordinateItemId }),
          publicar_en_gdb: publishToGdb ? 'true' : 'false',
          returnZ: 'false',
          returnM: 'false'
        })
        if (token) params.set('token', token)
        return params
      })
      if (!submitted.jobId) throw new Error('El geoproceso no devolvió un jobId.')

      setStage('processing')
      setStatus('Procesando el contenido del Excel…')
      let job = submitted
      const deadline = Date.now() + 5 * 60 * 1000
      while (job.jobStatus !== 'esriJobSucceeded') {
        if (['esriJobFailed', 'esriJobCancelled', 'esriJobTimedOut'].includes(job.jobStatus || '')) {
          const detail = job.messages?.map(item => item.description).filter(Boolean).join(' ')
          throw new Error(detail || 'El geoproceso no pudo completar el archivo.')
        }
        if (Date.now() >= deadline) throw new Error('El procesamiento superó el tiempo máximo de espera de 5 minutos.')
        await wait(1500)
        job = await requestJson<JobResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}`)
      }

      setStatus('Recuperando resultados del procesamiento…')
      // El FeatureSet se recupera siempre para permitir la exportación CSV.
      // En modo GDB se conserva en memoria, pero no se dibuja en el mapa.
      const outputNames = ['sondajes_procesados', 'cantidad_registros', 'mensaje_resultado', 'resumen_json']
      const outputs = await Promise.all(outputNames.map(async name => {
        const output = await requestJson<ResultResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/${name}`)
        return [name, output.value] as [string, unknown]
      }))
      const raw = Object.fromEntries(outputs)
      const featureSet = raw.sondajes_procesados as FeatureSetValue
      let summary: Record<string, unknown> | undefined
      if (typeof raw.resumen_json === 'string') {
        try { summary = JSON.parse(raw.resumen_json) as Record<string, unknown> } catch (_) { /* Se conserva el valor original. */ }
      }
      const recordCount = typeof raw.cantidad_registros === 'number'
        ? raw.cantidad_registros
        : Number(raw.cantidad_registros)
      const finalResult: ProcessingResult = {
        recordCount: Number.isFinite(recordCount) ? recordCount : undefined,
        message: typeof raw.mensaje_resultado === 'string' ? raw.mensaje_resultado : undefined,
        summary,
        raw,
        featureSet,
        published: publishToGdb
      }
      finalResult.mapMessage = publishToGdb
        ? 'Los registros fueron enviados a Collar_Recomendado. No se agregó una capa temporal al mapa.'
        : featureSet?.features
          ? await showFeatureSetOnMap(featureSet)
          : 'El proceso terminó, pero no devolvió entidades para el mapa.'
      console.log('[Procesador de Excel] resultado:', finalResult)
      setResult(finalResult)
      setStage('success')
      setStatus('Procesamiento completado correctamente.')
    } catch (processError) {
      console.error('[Procesador de Excel] error:', processError)
      const detail = processError && typeof processError === 'object' && 'message' in processError
        ? String((processError as { message?: unknown }).message || '')
        : ''
      setStage('error')
      setStatus('El archivo no pudo ser procesado.')
      setError(processError instanceof Error
        ? processError.message
        : detail || 'Ocurrió un error inesperado al crear la capa de resultados.')
    }
  }

  const exportResultToCsv = () => {
    const featureSet = result?.featureSet
    const features = featureSet?.features || []
    if (!features.length) return

    const available = new Map((featureSet?.fields || []).map(field => [field.name.toLowerCase(), field]))
    const fieldNames = COLLAR_FIELD_ORDER
      .map(name => available.get(name.toLowerCase())?.name)
      .filter((name): name is string => Boolean(name))
    const escapeCsv = (value: unknown): string => {
      if (value === null || value === undefined) return ''
      const text = String(value).replace(/"/g, '""')
      return /[;"\r\n]/.test(text) ? `"${text}"` : text
    }
    const formatValue = (fieldName: string, value: unknown): unknown => {
      const field = available.get(fieldName.toLowerCase())
      const isDate = field?.type === 'esriFieldTypeDate' || field?.type === 'date' || field?.type === 'date-only'
      if (!isDate || value === null || value === undefined || value === '') return value
      const date = new Date(typeof value === 'number' ? value : String(value))
      return Number.isNaN(date.getTime())
        ? value
        : new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
    }
    const headers = fieldNames.map(name => COLLAR_GDB_LABELS[name.toLowerCase()] || name.toUpperCase())
    const rows = features.map(feature => fieldNames.map(name => escapeCsv(formatValue(name, feature.attributes?.[name]))).join(';'))
    const csv = `\uFEFF${headers.map(escapeCsv).join(';')}\r\n${rows.join('\r\n')}`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    const baseName = (file?.name || 'sondajes_procesados').replace(/\.xlsx$/i, '')
    link.href = url
    link.download = `${baseName}_procesado.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    if (resultLayerRef.current && jimuMapView?.view?.map) {
      jimuMapView.view.map.remove(resultLayerRef.current)
      resultLayerRef.current = null
    }
    setFile(null)
    setCoordinateFile(null)
    setPublishToGdb(false)
    setStage('idle')
    setStatus('Seleccione un archivo para comenzar.')
    setError('')
    setValidationMessage('')
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
    if (coordinateInputRef.current) coordinateInputRef.current.value = ''
  }

  const isBusy = ['validating', 'uploading', 'submitting', 'processing'].includes(stage)
  const progress = stage === 'validating' ? 10 : stage === 'uploading' ? 25 : stage === 'submitting' ? 50 : stage === 'processing' ? 75 : stage === 'success' ? 100 : 0
  const sizeLabel = file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''
  const coordinateSizeLabel = coordinateFile ? `${(coordinateFile.size / 1024 / 1024).toFixed(2)} MB` : ''

  return (
    <div className="excel-uploader jimu-widget">
      <header className="excel-uploader__header">
        <img src="https://www.aminerals.cl/images/default-source/logos-amsa/logo-amsa.svg" alt="Antofagasta Minerals" />
        <div>
          <span>Procesamiento de información</span>
          <h2>Procesamiento de sondajes</h2>
          <p>Cargue el libro maestro y el CSV SNDTGIS_ACQ para validar, normalizar coordenadas y generar los puntos.</p>
        </div>

      </header>

      <nav className="excel-uploader__tabs" aria-label="Tipos de procesamiento">
        <button type="button" className={activeTab === 'sondajes' ? 'is-active' : ''} onClick={() => setActiveTab('sondajes')}>
          <span>Sondajes</span><small>Collar_Recomendado</small>
        </button>
        <button type="button" className={activeTab === 'curvas' ? 'is-active' : ''} onClick={() => setActiveTab('curvas')}>
          <span>Curvas S</span><small>Master Plan acumulado</small>
        </button>
      </nav>

      {activeTab === 'sondajes' && <main className="excel-uploader__content">
        <div className="excel-uploader__steps" aria-label="Etapas del procesamiento">
          <span className={file || coordinateFile ? 'is-active' : ''}><i>1</i>Archivos</span>
          <span className={validationMessage && !error ? 'is-active' : ''}><i>2</i>Validación</span>
          <span className={isBusy || stage === 'success' ? 'is-active' : ''}><i>3</i>Procesamiento</span>
        </div>
        <div className="excel-uploader__section-head">
          <h3>1. Archivos requeridos</h3>
          <small>{Number(Boolean(file)) + Number(Boolean(coordinateFile))} de 2 seleccionados</small>
        </div>
        <div className="excel-uploader__uploads">
        <div
          className={`excel-uploader__dropzone${dragging ? ' is-dragging' : ''}${file ? ' has-file' : ''}`}
          onDragEnter={event => { event.preventDefault(); if (!isBusy) setDragging(true) }}
          onDragOver={event => { event.preventDefault(); if (!isBusy) setDragging(true) }}
          onDragLeave={event => { event.preventDefault(); setDragging(false) }}
          onDrop={event => {
            event.preventDefault()
            setDragging(false)
            if (!isBusy) validateAndSelect(event.dataTransfer.files?.[0])
          }}
          onClick={() => !isBusy && inputRef.current?.click()}
          onKeyDown={event => { if (!isBusy && (event.key === 'Enter' || event.key === ' ')) inputRef.current?.click() }}
          role="button"
          tabIndex={0}
          aria-label="Seleccionar o arrastrar archivo Excel"
        >
          <input ref={inputRef} type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={event => validateAndSelect(event.target.files?.[0])} disabled={isBusy} />
          <b className="excel-uploader__file-role">Libro maestro</b>
          <div className="excel-uploader__file-icon" aria-hidden="true">X</div>
          {file
            ? <><strong>{file.name}</strong><span>{sizeLabel} · Archivo XLSX</span><small>Haga clic para reemplazar el archivo</small></>
            : <><strong>Seleccione el libro maestro</strong><span>o arrastre el archivo aquí</span><small>Formato XLSX · Máximo 25 MB</small></>}
        </div>

        <div
          className={`excel-uploader__dropzone excel-uploader__dropzone--coordinates${coordinateFile ? ' has-file' : ''}`}
          onDragOver={event => event.preventDefault()}
          onDrop={event => { event.preventDefault(); if (!isBusy) validateAndSelectCoordinates(event.dataTransfer.files?.[0]) }}
          onClick={() => !isBusy && coordinateInputRef.current?.click()}
          onKeyDown={event => { if (!isBusy && (event.key === 'Enter' || event.key === ' ')) coordinateInputRef.current?.click() }}
          role="button" tabIndex={0} aria-label="Seleccionar o arrastrar CSV SNDTGIS_ACQ"
        >
          <input ref={coordinateInputRef} type="file" accept=".csv,text/csv" onChange={event => validateAndSelectCoordinates(event.target.files?.[0])} disabled={isBusy} />
          <b className="excel-uploader__file-role">Coordenadas</b>
          <div className="excel-uploader__file-icon excel-uploader__file-icon--csv" aria-hidden="true">CSV</div>
          {coordinateFile
            ? <><strong>{coordinateFile.name}</strong><span>{coordinateSizeLabel} · Coordenadas ACQ</span><small>Haga clic para reemplazar el archivo</small></>
            : <><strong>Seleccione SNDTGIS_ACQ</strong><span>o arrastre el archivo aquí</span><small>Formato CSV · Máximo 25 MB</small></>}
        </div>
        </div>

        {(isBusy || stage === 'success') && <div className="excel-uploader__progress" aria-live="polite">
          <div><span>{status}</span><strong>{progress}%</strong></div>
          <div className="excel-uploader__track"><i style={{ width: `${progress}%` }} /></div>
        </div>}

        {error && <div className="excel-uploader__alert excel-uploader__alert--error" role="alert"><strong>No fue posible validar o procesar</strong><span>{error}</span></div>}
        {validationMessage && !error && <div className="excel-uploader__alert excel-uploader__alert--success" role="status"><strong>Archivo válido</strong><span>{validationMessage}</span></div>}

        {result && <section className="excel-uploader__result" aria-live="polite">
          <div className="excel-uploader__success-icon" aria-hidden="true">✓</div>
          <div className="excel-uploader__result-copy">
            <span>Proceso completado</span>
            <h3>{result.recordCount !== undefined ? result.recordCount.toLocaleString('es-CL') : '—'} registros</h3>
            <p>{result.message || 'El archivo fue cargado y procesado correctamente.'}</p>
            {result.mapMessage && <p className="excel-uploader__map-message">{result.mapMessage}</p>}
            {result.featureSet?.features?.length > 0 && <button type="button" className="excel-uploader__export" onClick={exportResultToCsv}>
              Exportar CSV
            </button>}
          </div>
          {result.summary && <dl>
            <div><dt>Libro maestro</dt><dd>{String(result.summary.archivo || file?.name || '—')}</dd></div>
            <div><dt>Coordenadas ACQ</dt><dd>{String(result.summary.archivo_coordenadas || coordinateFile?.name || '—')}</dd></div>
            <div><dt>Coordenadas reemplazadas</dt><dd>{String((result.summary.metricas as Record<string, unknown>)?.coincidencias_coordenadas ?? '—')}</dd></div>
          </dl>}
        </section>}

        <div className="excel-uploader__section-head excel-uploader__section-head--mode">
          <h3>2. Modo de ejecución</h3><small>Seleccione una opción</small>
        </div>
        <label className={`excel-uploader__publish-option${publishToGdb ? ' is-selected' : ''}`}>
          <input
            type="checkbox"
            checked={publishToGdb}
            onChange={event => setPublishToGdb(event.target.checked)}
            disabled={isBusy}
          />
          <span>
            <strong>Cargar directamente en Collar_Recomendado</strong>
            <small>Reemplaza los registros de la geodatabase y no muestra una capa temporal en el mapa.</small>
          </span>
        </label>

        <div className="excel-uploader__actions">
          <button type="button" className="excel-uploader__primary" onClick={runProcess} disabled={!file || !coordinateFile || isBusy || Boolean(publishToGdb && result?.published)}>
            {isBusy ? <><i className="excel-uploader__spinner" />{stage === 'validating' ? 'Validando…' : 'Procesando…'}</> : publishToGdb && result?.published ? 'Publicado en Collar_Recomendado' : publishToGdb && result?.featureSet?.features?.length ? 'Publicar resultado validado' : stage === 'error' && file ? 'Reintentar procesamiento' : publishToGdb ? 'Procesar y publicar' : 'Procesar y mostrar en mapa'}
          </button>
          <button type="button" onClick={reset} disabled={isBusy || (!file && !coordinateFile && !result && !error)}>Limpiar</button>
        </div>
      </main>}

      <div className={activeTab === 'curvas' ? 'excel-uploader__tab-panel is-active' : 'excel-uploader__tab-panel'} aria-hidden={activeTab !== 'curvas'}>
        <CurvesTab fallbackToken={props.config.fallbackToken} curvesSubmitJobUrl={props.config.curvesSubmitJobUrl || CURVES_SUBMIT_URL} publishSubmitJobUrl={publishSubmitJobUrl} />
      </div>

      <footer>La información se transmite de forma segura al servicio de geoprocesamiento AMSA.</footer>
      {props.useMapWidgetIds?.[0] && <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds[0]}
        onActiveViewChange={setJimuMapView}
      />}
    </div>
  )
}

export default Widget
