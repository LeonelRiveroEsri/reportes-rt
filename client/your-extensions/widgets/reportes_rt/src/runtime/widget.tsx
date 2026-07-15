import { React, AllWidgetProps, SessionManager } from 'jimu-core'
import { IMConfig } from '../config'
import './style.scss'

interface FeatureAttributes {
  folio?: string | number
  ano_insp?: string | number
  objectid?: number
  fecha?: number
  estado3?: string
  autor?: string
}

interface QueryResponse {
  features?: Array<{ attributes: FeatureAttributes }>
  error?: { code: number, message: string, details?: string[] }
}

interface GPResponse {
  jobId?: string
  jobStatus?: string
  messages?: Array<{ type?: string, description?: string }>
  value?: { url?: string } | string
  error?: { code: number, message: string, details?: string[] }
}

interface ReportState {
  status: 'submitting' | 'running' | 'ready' | 'error'
  message: string
  url?: string
  sharepointUrl?: string
}

const OUT_FIELDS = 'folio,ano_insp,objectid,fecha,estado3,autor'
const DEFAULT_REPORT_SUBMIT_URL = 'https://sig.aminerals.cl/vector/rest/services/CL_MLP_GMA_ReportesRT/GPServer/Generar%20reporte%20de%20terreno/submitJob'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [folio, setFolio] = React.useState('')
  const [year, setYear] = React.useState('')
  const [availableRecords, setAvailableRecords] = React.useState<FeatureAttributes[]>([])
  const [results, setResults] = React.useState<FeatureAttributes[]>([])
  const [loadingOptions, setLoadingOptions] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [searched, setSearched] = React.useState(false)
  const [reports, setReports] = React.useState<Record<string, ReportState>>({})
  const reportSubmitUrl = props.config.reportSubmitUrl || DEFAULT_REPORT_SUBMIT_URL

  const requestFeatures = React.useCallback(async (where: string, outFields: string, token?: string, limit = '100'): Promise<QueryResponse> => {
    const params = new URLSearchParams({
      f: 'json',
      where,
      outFields,
      returnGeometry: 'false',
      resultRecordCount: limit
    })
    if (outFields.includes('fecha')) params.set('orderByFields', 'fecha DESC')
    if (token) params.set('token', token)

    const response = await fetch(`${props.config.serviceUrl}/query?${params.toString()}`)
    if (!response.ok) throw new Error(`El servicio respondió HTTP ${response.status}.`)
    return await response.json() as QueryResponse
  }, [props.config.serviceUrl])

  const requestWithAuthentication = React.useCallback(async (where: string, outFields: string, limit?: string): Promise<QueryResponse> => {
    const manager = SessionManager.getInstance()
    const session = manager.getSessionByUrl(props.config.serviceUrl) || manager.getMainSession()
    const sessionToken = session?.token
    let data = await requestFeatures(where, outFields, sessionToken || props.config.fallbackToken, limit)

    if (data.error && sessionToken && props.config.fallbackToken && sessionToken !== props.config.fallbackToken) {
      data = await requestFeatures(where, outFields, props.config.fallbackToken, limit)
    }
    return data
  }, [props.config.fallbackToken, props.config.serviceUrl, requestFeatures])

  const requestGP = React.useCallback(async (url: string, parameters?: URLSearchParams, method: 'GET' | 'POST' = 'GET'): Promise<GPResponse> => {
    const manager = SessionManager.getInstance()
    const session = manager.getSessionByUrl(reportSubmitUrl) || manager.getMainSession()
    const sessionToken = session?.token

    const send = async (token?: string): Promise<GPResponse> => {
      const params = parameters ? new URLSearchParams(parameters) : new URLSearchParams()
      params.set('f', 'json')
      if (token) params.set('token', token)
      const response = method === 'POST'
        ? await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: params.toString()
        })
        : await fetch(`${url}?${params.toString()}`)
      if (!response.ok) throw new Error(`El geoproceso respondió HTTP ${response.status}.`)
      return await response.json() as GPResponse
    }

    if (!sessionToken) return await send(props.config.fallbackToken)

    try {
      const data = await send(sessionToken)
      if (!data.error || !props.config.fallbackToken || sessionToken === props.config.fallbackToken) return data
    } catch (sessionError) {
      if (!props.config.fallbackToken || sessionToken === props.config.fallbackToken) throw sessionError
    }
    return await send(props.config.fallbackToken)
  }, [props.config.fallbackToken, reportSubmitUrl])

  const wait = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds))

  const generateReport = async (objectId?: number) => {
    if (objectId === null || objectId === undefined) return
    const key = String(objectId)
    const updateReport = (state: ReportState) => setReports(current => ({ ...current, [key]: state }))

    updateReport({ status: 'submitting', message: 'Enviando solicitud…' })
    try {
      const taskUrl = reportSubmitUrl.replace(/\/submitJob\/?$/i, '')
      const submitParams = new URLSearchParams({
        object_id: key,
        returnZ: 'false',
        returnM: 'false',
        returnTrueCurves: 'false'
      })
      const submitted = await requestGP(reportSubmitUrl, submitParams, 'POST')
      if (submitted.error) throw new Error(submitted.error.message)
      if (!submitted.jobId) throw new Error('El geoproceso no devolvió un jobId.')

      updateReport({ status: 'running', message: 'Generando reporte…' })
      let job: GPResponse = submitted
      const deadline = Date.now() + 5 * 60 * 1000

      while (job.jobStatus !== 'esriJobSucceeded') {
        if (['esriJobFailed', 'esriJobCancelled', 'esriJobTimedOut'].includes(job.jobStatus || '')) {
          const detail = job.messages?.map(message => message.description).filter(Boolean).join(' ') || 'El trabajo no pudo completarse.'
          throw new Error(detail)
        }
        if (Date.now() >= deadline) throw new Error('El reporte superó el tiempo máximo de espera de 5 minutos.')
        await wait(2000)
        job = await requestGP(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}`)
        if (job.error) throw new Error(job.error.message)
      }

      const [output, sharepointOutput] = await Promise.all([
        requestGP(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/output_pdf`),
        requestGP(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/sharepoint_url`)
      ])
      console.log('[Generador de reportes] resultado PDF:', output)
      console.log('[Generador de reportes] resultado SharePoint:', sharepointOutput)
      if (output.error) throw new Error(output.error.message)
      if (sharepointOutput.error) throw new Error(sharepointOutput.error.message)

      const pdfUrl = typeof output.value === 'string' ? output.value : output.value?.url
      const sharepointUrl = typeof sharepointOutput.value === 'string' ? sharepointOutput.value : sharepointOutput.value?.url
      if (!pdfUrl) throw new Error('El proceso terminó, pero no devolvió la URL del PDF.')
      updateReport({ status: 'ready', message: 'Reporte disponible', url: pdfUrl, sharepointUrl })

      const download = document.createElement('a')
      download.href = pdfUrl
      download.target = '_blank'
      download.rel = 'noopener noreferrer'
      download.download = ''
      document.body.appendChild(download)
      download.click()
      document.body.removeChild(download)
    } catch (reportError) {
      updateReport({
        status: 'error',
        message: reportError instanceof Error ? reportError.message : 'No fue posible generar el reporte.'
      })
    }
  }

  React.useEffect(() => {
    let active = true

    const loadOptions = async () => {
      setLoadingOptions(true)
      setError('')
      try {
        const data = await requestWithAuthentication('1=1', 'ano_insp,folio', '2000')
        if (data.error) throw new Error(data.error.message)
        if (active) setAvailableRecords((data.features || []).map(feature => feature.attributes))
      } catch (requestError) {
        if (active) setError(requestError instanceof Error ? requestError.message : 'No fue posible cargar los filtros.')
      } finally {
        if (active) setLoadingOptions(false)
      }
    }

    loadOptions()
    return () => { active = false }
  }, [requestWithAuthentication])

  const years = Array.from(new Set(availableRecords
    .map(item => item.ano_insp)
    .filter(value => value !== null && value !== undefined)
    .map(String)))
    .sort((a, b) => Number(b) - Number(a))

  const folios = Array.from(new Set(availableRecords
    .filter(item => String(item.ano_insp) === year)
    .map(item => item.folio)
    .filter(value => value !== null && value !== undefined)
    .map(String)))
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))

  const runQuery = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!year) return
    setLoading(true)
    setError('')
    setSearched(true)

    try {
      let where = `ano_insp = ${Number(year)}`
      if (folio) {
        const cleanFolio = folio.replace(/'/g, "''")
        const folioValue = /^\d+(\.\d+)?$/.test(cleanFolio) ? cleanFolio : `'${cleanFolio}'`
        where += ` AND folio = ${folioValue}`
      }
      const data = await requestWithAuthentication(where, OUT_FIELDS, '2000')

      if (data.error) {
        const details = data.error.details?.filter(Boolean).join(' ') || ''
        throw new Error(`${data.error.message} ${details}`.trim())
      }

      const attributes = (data.features || []).map(feature => feature.attributes)
      setResults(attributes)
      attributes.forEach(item => console.log('[Filtro de inspecciones] objectid encontrado:', item.objectid))
    } catch (requestError) {
      setResults([])
      setError(requestError instanceof Error ? requestError.message : 'No fue posible consultar el servicio.')
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setFolio('')
    setYear('')
    setResults([])
    setError('')
    setSearched(false)
    setReports({})
  }

  const formatDate = (value?: number) => value
    ? new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium' }).format(new Date(value))
    : 'Sin fecha'

  return (
    <div className="inspection-filter jimu-widget">
      <header className="inspection-filter__header">
        <span className="inspection-filter__eyebrow">Consulta operacional</span>
        <h2>Buscar inspección</h2>
        <p>Seleccione un año completo o filtre por un folio específico.</p>
      </header>

      <form onSubmit={runQuery} className="inspection-filter__form">
        <label>
          <span>Año</span>
          <select value={year} onChange={e => { setYear(e.target.value); setFolio('') }} disabled={loadingOptions}>
            <option value="">{loadingOptions ? 'Cargando años…' : 'Seleccione un año'}</option>
            {years.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Número de folio</span>
          <select value={folio} onChange={e => setFolio(e.target.value)} disabled={!year || loadingOptions}>
            <option value="">{year ? 'Todos los folios del año' : 'Seleccione primero un año'}</option>
            {folios.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>

        <div className="inspection-filter__actions">
          <button className="inspection-filter__primary" type="submit" disabled={loading || !year}>
            {loading ? 'Consultando…' : folio ? 'Buscar registro' : 'Buscar año completo'}
          </button>
          <button type="button" onClick={clearFilters} disabled={loading}>Limpiar</button>
        </div>
      </form>

      <section className="inspection-filter__results" aria-live="polite">
        {error && <div className="inspection-filter__message inspection-filter__message--error">{error}</div>}
        {!error && searched && !loading && (
          <div className="inspection-filter__summary">
            {results.length === 1 ? '1 registro encontrado' : `${results.length} registros encontrados`}
          </div>
        )}
        {results.map((item, index) => (
          <article className="inspection-filter__card" key={item.objectid || index}>
            <div><small>Folio</small><strong>{item.folio ?? '—'}</strong></div>
            <div><small>Año</small><span>{item.ano_insp ?? '—'}</span></div>
            <div><small>Fecha</small><span>{formatDate(item.fecha)}</span></div>
            <div><small>ObjectID</small><code>{item.objectid ?? '—'}</code></div>
            <div><small>Estado</small><span>{item.estado3 || '—'}</span></div>
            <div><small>Encuestador</small><span>{item.autor || '—'}</span></div>
            <div className="inspection-filter__report">
              {reports[String(item.objectid)]?.status === 'ready'
                ? <>
                    <a className="inspection-filter__report-link" href={reports[String(item.objectid)].url} target="_blank" rel="noopener noreferrer">Abrir reporte</a>
                    {reports[String(item.objectid)].sharepointUrl &&
                      <a className="inspection-filter__report-link inspection-filter__report-link--sharepoint" href={reports[String(item.objectid)].sharepointUrl} target="_blank" rel="noopener noreferrer">Abrir en SharePoint</a>}
                  </>
                : <button
                    className="inspection-filter__report-button"
                    type="button"
                    onClick={() => generateReport(item.objectid)}
                    disabled={reports[String(item.objectid)]?.status === 'submitting' || reports[String(item.objectid)]?.status === 'running'}
                  >
                    {reports[String(item.objectid)]?.status === 'submitting' || reports[String(item.objectid)]?.status === 'running'
                      ? <><span className="inspection-filter__spinner" aria-hidden="true" />{reports[String(item.objectid)].message}</>
                      : reports[String(item.objectid)]?.status === 'error' ? 'Reintentar reporte' : 'Generar reporte'}
                  </button>}
              {reports[String(item.objectid)]?.status === 'error' &&
                <small className="inspection-filter__report-error" title={reports[String(item.objectid)].message}>{reports[String(item.objectid)].message}</small>}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Widget
