import { React, AllWidgetProps, SessionManager } from 'jimu-core'
import { IMConfig } from '../config'
import './style.scss'

type ProcessStage = 'idle' | 'uploading' | 'submitting' | 'processing' | 'success' | 'error'

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
}

const DEFAULT_SUBMIT_URL = 'https://sig.aminerals.cl/vector/rest/services/ProcesarExcel/GPServer/Procesar%20archivo%20Excel/submitJob'
const MAX_FILE_SIZE = 25 * 1024 * 1024
const wait = async (milliseconds: number) => await new Promise(resolve => setTimeout(resolve, milliseconds))

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const [dragging, setDragging] = React.useState(false)
  const [stage, setStage] = React.useState<ProcessStage>('idle')
  const [status, setStatus] = React.useState('Seleccione un archivo para comenzar.')
  const [error, setError] = React.useState('')
  const [result, setResult] = React.useState<ProcessingResult | null>(null)
  const submitJobUrl = props.config.submitJobUrl || DEFAULT_SUBMIT_URL
  const taskUrl = submitJobUrl.replace(/\/submitJob\/?$/i, '')
  const gpServerUrl = taskUrl.replace(/\/GPServer\/.*$/i, '/GPServer')

  const getTokens = React.useCallback((): Array<string | undefined> => {
    const manager = SessionManager.getInstance()
    const session = manager.getSessionByUrl(submitJobUrl) || manager.getMainSession()
    const sessionToken = session?.token
    const fallbackToken = props.config.fallbackToken
    const candidates: Array<string | undefined> = []
    if (sessionToken) candidates.push(sessionToken)
    if (fallbackToken && fallbackToken !== sessionToken) candidates.push(fallbackToken)
    // Permite probar servicios públicos aunque un token local haya vencido.
    candidates.push(undefined)
    return candidates
  }, [props.config.fallbackToken, submitJobUrl])

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

  const validateAndSelect = (candidate?: File) => {
    setError('')
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
    setFile(candidate)
    setStatus('Archivo preparado para cargar y procesar.')
  }

  const runProcess = async () => {
    if (!file || stage === 'uploading' || stage === 'submitting' || stage === 'processing') return
    setError('')
    setResult(null)

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

      setStage('submitting')
      setStatus('Archivo cargado. Iniciando el geoproceso…')
      const submitted = await requestForm<JobResponse>(submitJobUrl, token => {
        const params = new URLSearchParams({
          f: 'json',
          archivo_excel: JSON.stringify({ itemID: itemId }),
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
      const outputNames = ['cantidad_registros', 'mensaje_resultado', 'resumen_json']
      const outputs = await Promise.all(outputNames.map(async name => {
        const output = await requestJson<ResultResponse>(`${taskUrl}/jobs/${encodeURIComponent(submitted.jobId)}/results/${name}`)
        return [name, output.value] as [string, unknown]
      }))
      const raw = Object.fromEntries(outputs)
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
        raw
      }
      console.log('[Procesador de Excel] resultado:', finalResult)
      setResult(finalResult)
      setStage('success')
      setStatus('Procesamiento completado correctamente.')
    } catch (processError) {
      setStage('error')
      setStatus('El archivo no pudo ser procesado.')
      setError(processError instanceof Error ? processError.message : 'Ocurrió un error inesperado.')
    }
  }

  const reset = () => {
    setFile(null)
    setStage('idle')
    setStatus('Seleccione un archivo para comenzar.')
    setError('')
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const isBusy = ['uploading', 'submitting', 'processing'].includes(stage)
  const progress = stage === 'uploading' ? 25 : stage === 'submitting' ? 50 : stage === 'processing' ? 75 : stage === 'success' ? 100 : 0
  const sizeLabel = file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''

  return (
    <div className="excel-uploader jimu-widget">
      <header className="excel-uploader__header">
        <img src="https://www.aminerals.cl/images/default-source/logos-amsa/logo-amsa.svg" alt="Antofagasta Minerals" />
        <div>
          <span>Procesamiento de información</span>
          <h2>Carga de archivos Excel</h2>
          <p>Cargue una planilla para validar su contenido y conocer la cantidad de registros disponibles.</p>
        </div>
      </header>

      <main className="excel-uploader__content">
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
          <div className="excel-uploader__file-icon" aria-hidden="true">X</div>
          {file
            ? <><strong>{file.name}</strong><span>{sizeLabel} · Archivo XLSX</span><small>Haga clic para reemplazar el archivo</small></>
            : <><strong>Arrastre su archivo Excel aquí</strong><span>o haga clic para seleccionarlo</span><small>Formato XLSX · Máximo 25 MB</small></>}
        </div>

        {(isBusy || stage === 'success') && <div className="excel-uploader__progress" aria-live="polite">
          <div><span>{status}</span><strong>{progress}%</strong></div>
          <div className="excel-uploader__track"><i style={{ width: `${progress}%` }} /></div>
        </div>}

        {error && <div className="excel-uploader__alert excel-uploader__alert--error" role="alert"><strong>No fue posible procesar</strong><span>{error}</span></div>}

        {result && <section className="excel-uploader__result" aria-live="polite">
          <div className="excel-uploader__success-icon" aria-hidden="true">✓</div>
          <div className="excel-uploader__result-copy">
            <span>Proceso completado</span>
            <h3>{result.recordCount !== undefined ? result.recordCount.toLocaleString('es-CL') : '—'} registros</h3>
            <p>{result.message || 'El archivo fue cargado y procesado correctamente.'}</p>
          </div>
          {result.summary && <dl>
            <div><dt>Hoja</dt><dd>{String(result.summary.sheet_name || '—')}</dd></div>
            <div><dt>Columnas</dt><dd>{String(result.summary.column_count ?? '—')}</dd></div>
            <div><dt>Archivo</dt><dd>{String(result.summary.file_name || file?.name || '—')}</dd></div>
          </dl>}
        </section>}

        <div className="excel-uploader__actions">
          <button type="button" className="excel-uploader__primary" onClick={runProcess} disabled={!file || isBusy}>
            {isBusy ? <><i className="excel-uploader__spinner" />Procesando…</> : stage === 'error' ? 'Reintentar procesamiento' : 'Cargar y procesar'}
          </button>
          <button type="button" onClick={reset} disabled={isBusy || (!file && !result && !error)}>Limpiar</button>
        </div>
      </main>

      <footer>La información se transmite de forma segura al servicio de geoprocesamiento AMSA.</footer>
    </div>
  )
}

export default Widget
