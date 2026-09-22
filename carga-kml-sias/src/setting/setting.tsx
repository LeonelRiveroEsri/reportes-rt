import { React } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { IMConfig } from '../config'
import './style.scss'

const DEFAULT_GP_URL = 'https://sig.aminerals.cl/vector/rest/services/CL_CEN_ADM/CL_CEN_ADM_SIAS_KmltolayerV2/GPServer/Carga%20KML%20SIA'
const DEFAULT_SURVEY_URL = 'https://survey123.arcgis.com/share/a921894bf7b84c968a991d0691db0e54'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const update = (key: 'gpTaskUrl' | 'surveyFormUrl' | 'maxFileSizeMb', value: string | number) => {
    props.onSettingChange({ id: props.id, config: props.config.set(key, value) })
  }
  const configuredGpUrl = props.config.gpTaskUrl || DEFAULT_GP_URL
  const gpUrl = /CL_CEN_ADM_SIAS_Kmltolayer\/GPServer/i.test(configuredGpUrl) ? DEFAULT_GP_URL : configuredGpUrl
  const surveyFormUrl = props.config.surveyFormUrl || DEFAULT_SURVEY_URL
  return <div className="kml-sias-setting jimu-widget-setting">
    <header><span>SIA · CENTINELA</span><h3>Configuración de carga KML/KMZ</h3><p>Defina el servicio publicado y el destino al finalizar.</p></header>
    <section>
      <label htmlFor={`${props.id}-gp`}>URL de la tarea GP</label>
      <textarea id={`${props.id}-gp`} rows={5} value={gpUrl} spellCheck={false} onChange={event => update('gpTaskUrl', event.target.value)} />
      <small>Debe terminar en la tarea dentro de <b>/GPServer/</b>. No incluya <b>/submitJob</b>.</small>
      <button type="button" onClick={() => update('gpTaskUrl', DEFAULT_GP_URL)}>Restaurar servicio</button>
    </section>
    <section>
      <label htmlFor={`${props.id}-survey`}>URL del formulario Survey123</label>
      <textarea id={`${props.id}-survey`} rows={3} value={surveyFormUrl} spellCheck={false} onChange={event => update('surveyFormUrl', event.target.value)} />
      <small>El widget agregará <b>mode=edit</b>, <b>globalId</b>, <b>token</b> y la URL del portal.</small>
      <button type="button" onClick={() => update('surveyFormUrl', DEFAULT_SURVEY_URL)}>Restaurar Survey123</button>
    </section>
    <section>
      <label htmlFor={`${props.id}-size`}>Tamaño máximo del archivo (MB)</label>
      <input id={`${props.id}-size`} type="number" min="1" max="100" value={props.config.maxFileSizeMb || 10} onChange={event => update('maxFileSizeMb', Math.max(1, Number(event.target.value) || 10))} />
    </section>
    <aside><strong>Autenticación</strong><span>Se utiliza la sesión activa del portal. El widget no almacena credenciales administrativas.</span></aside>
  </div>
}

export default Setting
