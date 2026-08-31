import { React } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { IMConfig } from '../config'
import './style.scss'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const update = (key: 'groupTitle' | 'exclusiveVisibility' | 'zoomOnSelect', value: string | boolean) => {
    props.onSettingChange({ id: props.id, config: props.config.set(key, value) })
  }

  return <div className="drone-selector-setting jimu-widget-setting">
    <section>
      <span>CONEXIÓN</span>
      <h3>Mapa y grupo de imágenes</h3>
      <p>Seleccione el mapa que contiene el grupo de vuelos drone.</p>
      <MapWidgetSelector
        onSelect={useMapWidgetIds => props.onSettingChange({ id: props.id, useMapWidgetIds })}
        useMapWidgetIds={props.useMapWidgetIds}
      />
      <label htmlFor={`${props.id}-group`}>Nombre del grupo</label>
      <input id={`${props.id}-group`} value={props.config.groupTitle || 'Vuelos Drone PAO/Imagenes de Drone'}
        onChange={event => update('groupTitle', event.target.value)} />
      <small>Use “/” para separar grupos anidados. La comparación ignora tildes, mayúsculas y conectores como “de”.</small>
    </section>
    <section>
      <span>COMPORTAMIENTO</span>
      <label className="drone-selector-setting__check">
        <input type="checkbox" checked={props.config.exclusiveVisibility !== false}
          onChange={event => update('exclusiveVisibility', event.target.checked)} />
        <div><strong>Selección exclusiva</strong><small>Al activar un vuelo, oculta los demás.</small></div>
      </label>
      <label className="drone-selector-setting__check">
        <input type="checkbox" checked={props.config.zoomOnSelect !== false}
          onChange={event => update('zoomOnSelect', event.target.checked)} />
        <div><strong>Acercar al vuelo</strong><small>Navega a la extensión de la capa seleccionada.</small></div>
      </label>
    </section>
  </div>
}

export default Setting
