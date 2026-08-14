import { React } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { IMConfig } from '../config'
import './style.scss'

const DEFAULT_SUBMIT_URL = 'https://sig.aminerals.cl/vector/rest/services/ProcesarExcel/GPServer/Procesar%20archivo%20Excel/submitJob'
const DEFAULT_PUBLISH_URL = 'https://sig.aminerals.cl/vector/rest/services/PublicarResultadoValidado/GPServer/Publicar%20resultado%20validado/submitJob'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const value = props.config.submitJobUrl || ''
  const normalized = value.trim()
  const isValid = /^https:\/\/.+\/GPServer\/.+\/submitJob\/?$/i.test(normalized)
  const publishValue = props.config.publishSubmitJobUrl || DEFAULT_PUBLISH_URL
  const normalizedPublish = publishValue.trim()
  const isPublishValid = /^https:\/\/.+\/GPServer\/.+\/submitJob\/?$/i.test(normalizedPublish)

  const updateUrl = (submitJobUrl: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('submitJobUrl', submitJobUrl)
    })
  }

  const updatePublishUrl = (publishSubmitJobUrl: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('publishSubmitJobUrl', publishSubmitJobUrl)
    })
  }

  const updateMap = (useMapWidgetIds: string[]) => {
    props.onSettingChange({ id: props.id, useMapWidgetIds })
  }

  return (
    <div className="excel-uploader-setting jimu-widget-setting">
      <section>
        <span className="excel-uploader-setting__eyebrow">Visualización</span>
        <h3>Mapa de resultados</h3>
        <p>Seleccione el Map Widget donde se agregarán los puntos procesados y sus ventanas emergentes.</p>
        <MapWidgetSelector onSelect={updateMap} useMapWidgetIds={props.useMapWidgetIds} />
      </section>
      <section>
        <span className="excel-uploader-setting__eyebrow">Servicio de geoprocesamiento</span>
        <h3>Configuración de la GP Tool</h3>
        <p>Ingrese la URL completa de la operación <code>submitJob</code> que procesará los archivos Excel.</p>

        <label htmlFor={`${props.id}-gp-url`}>URL de la GP Tool</label>
        <textarea
          id={`${props.id}-gp-url`}
          value={value}
          rows={6}
          spellCheck={false}
          placeholder={DEFAULT_SUBMIT_URL}
          onChange={event => updateUrl(event.target.value)}
          onBlur={() => normalized && updateUrl(normalized.replace(/\/$/, ''))}
        />

        {normalized && !isValid && <div className="excel-uploader-setting__error">
          La dirección debe usar HTTPS y terminar en <strong>/submitJob</strong>.
        </div>}
        {isValid && <div className="excel-uploader-setting__ok">URL válida para una tarea asíncrona.</div>}

        <button type="button" onClick={() => updateUrl(DEFAULT_SUBMIT_URL)}>
          Restaurar URL predeterminada
        </button>

        <label htmlFor={`${props.id}-publish-gp-url`}>URL de publicación de resultados</label>
        <textarea
          id={`${props.id}-publish-gp-url`}
          value={publishValue}
          rows={6}
          spellCheck={false}
          placeholder={DEFAULT_PUBLISH_URL}
          onChange={event => updatePublishUrl(event.target.value)}
          onBlur={() => normalizedPublish && updatePublishUrl(normalizedPublish.replace(/\/$/, ''))}
        />
        {normalizedPublish && !isPublishValid && <div className="excel-uploader-setting__error">
          La URL de publicación debe usar HTTPS y terminar en <strong>/submitJob</strong>.
        </div>}
        {isPublishValid && <div className="excel-uploader-setting__ok">URL de publicación rápida válida.</div>}
      </section>

      <aside>
        El widget intentará primero la sesión del usuario autenticado en Experience Builder y luego los métodos alternativos configurados.
      </aside>
    </div>
  )
}

export default Setting
