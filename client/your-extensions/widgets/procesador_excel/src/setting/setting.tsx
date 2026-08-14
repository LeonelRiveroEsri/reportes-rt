import { React } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { IMConfig } from '../config'
import { GP_TASK_NAMES, isSupportedGpUrl, toSubmitJobUrl } from '../service-url'
import './style.scss'

const DEFAULT_SONDAJES_URL = 'https://sig.aminerals.cl/server/rest/services/CargaSondajes/GPServer'
const DEFAULT_CURVAS_URL = 'https://sig.aminerals.cl/server/rest/services/ProcesarCurvasS/GPServer'
const DEFAULT_PUBLISH_URL = 'https://sig.aminerals.cl/server/rest/services/CargaSondajesGDB/GPServer'

interface ServiceFieldProps {
  id: string
  order: number
  title: string
  description: string
  value: string
  defaultValue: string
  taskName: string
  onChange: (value: string) => void
}

const ServiceField = ({ id, order, title, description, value, defaultValue, taskName, onChange }: ServiceFieldProps) => {
  const normalized = value.trim()
  const valid = isSupportedGpUrl(normalized)
  const effectiveUrl = valid ? toSubmitJobUrl(normalized, taskName) : ''
  return <div className="excel-uploader-setting__service">
    <div className="excel-uploader-setting__service-head">
      <i>{order}</i>
      <div><strong>{title}</strong><small>{description}</small></div>
      <span className={valid ? 'is-valid' : 'is-invalid'}>{valid ? 'Configurado' : 'Revisar'}</span>
    </div>
    <label htmlFor={id}>URL del servicio o de la tarea</label>
    <textarea id={id} value={value} rows={3} spellCheck={false} placeholder={defaultValue}
      onChange={event => onChange(event.target.value)}
      onBlur={() => normalized && onChange(normalized.replace(/\/+$/, ''))} />
    {!valid && normalized && <div className="excel-uploader-setting__error">
      Ingrese una URL HTTPS de ArcGIS que contenga <strong>/GPServer</strong>.
    </div>}
    {valid && <details className="excel-uploader-setting__resolved">
      <summary>Ver URL técnica resuelta</summary><span>{effectiveUrl}</span>
    </details>}
    <button type="button" className="excel-uploader-setting__restore" onClick={() => onChange(defaultValue)}>Restaurar URL predeterminada</button>
  </div>
}

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const updateConfig = (key: 'submitJobUrl' | 'curvesSubmitJobUrl' | 'publishSubmitJobUrl', value: string) => {
    props.onSettingChange({ id: props.id, config: props.config.set(key, value) })
  }
  return <div className="excel-uploader-setting jimu-widget-setting">
    <section>
      <span className="excel-uploader-setting__eyebrow">Visualización</span>
      <h3>Mapa de resultados</h3>
      <p>Seleccione el Map Widget donde se mostrarán temporalmente los resultados procesados.</p>
      <MapWidgetSelector onSelect={useMapWidgetIds => props.onSettingChange({ id: props.id, useMapWidgetIds })} useMapWidgetIds={props.useMapWidgetIds} />
    </section>
    <section>
      <span className="excel-uploader-setting__eyebrow">Servicios de geoprocesamiento</span>
      <h3>Conexiones de la solución</h3>
      <p>Puede pegar la URL del servicio copiada desde el Portal, la URL de la tarea o la dirección completa de submitJob. El widget completa automáticamente la ruta técnica.</p>
      <ServiceField id={`${props.id}-sondajes-url`} order={1} title="Procesamiento de Sondajes" description="Valida, normaliza y genera Collar_Recomendado." value={props.config.submitJobUrl || DEFAULT_SONDAJES_URL} defaultValue={DEFAULT_SONDAJES_URL} taskName={GP_TASK_NAMES.sondajes} onChange={value => updateConfig('submitJobUrl', value)} />
      <ServiceField id={`${props.id}-curvas-url`} order={2} title="Procesamiento de Curvas S" description="Calcula los registros acumulados del Master Plan." value={props.config.curvesSubmitJobUrl || DEFAULT_CURVAS_URL} defaultValue={DEFAULT_CURVAS_URL} taskName={GP_TASK_NAMES.curvas} onChange={value => updateConfig('curvesSubmitJobUrl', value)} />
      <ServiceField id={`${props.id}-publisher-url`} order={3} title="Publicación de resultados validados" description="Carga resultados revisados sin volver a procesarlos." value={props.config.publishSubmitJobUrl || DEFAULT_PUBLISH_URL} defaultValue={DEFAULT_PUBLISH_URL} taskName={GP_TASK_NAMES.publicacion} onChange={value => updateConfig('publishSubmitJobUrl', value)} />
    </section>
    <aside><strong>Autenticación</strong>El widget utiliza primero la sesión activa del usuario en Experience Builder y conserva el token alternativo solo para pruebas controladas.</aside>
  </div>
}

export default Setting
