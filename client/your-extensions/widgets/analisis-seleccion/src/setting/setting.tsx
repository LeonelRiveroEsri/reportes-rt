import { React } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { IMConfig, SpatialRelationship } from '../config'
import './style.scss'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const updateRelationship = (value: SpatialRelationship) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('spatialRelationship', value)
    })
  }

  const updateMaxCategories = (value: number) => {
    const safeValue = Math.max(3, Math.min(8, Math.round(value || 5)))
    props.onSettingChange({
      id: props.id,
      config: props.config.set('maxCategories', safeValue)
    })
  }

  return <div className="selection-analysis-setting jimu-widget-setting">
    <section>
      <span className="selection-analysis-setting__eyebrow">CONEXIÓN</span>
      <h3>Web map de análisis</h3>
      <p>Seleccione el widget Mapa sobre el que se dibujará el área de consulta.</p>
      <MapWidgetSelector
        onSelect={useMapWidgetIds => props.onSettingChange({ id: props.id, useMapWidgetIds })}
        useMapWidgetIds={props.useMapWidgetIds}
      />
    </section>

    <section>
      <span className="selection-analysis-setting__eyebrow">SELECCIÓN ESPACIAL</span>
      <h3>Criterio de consulta</h3>
      <label className="selection-analysis-setting__option">
        <input
          type="radio"
          name={`${props.id}-relationship`}
          checked={(props.config.spatialRelationship || 'intersects') === 'intersects'}
          onChange={() => updateRelationship('intersects')}
        />
        <span><strong>Interseca</strong><small>Incluye toda entidad que toque el dibujo.</small></span>
      </label>
      <label className="selection-analysis-setting__option">
        <input
          type="radio"
          name={`${props.id}-relationship`}
          checked={props.config.spatialRelationship === 'contains'}
          onChange={() => updateRelationship('contains')}
        />
        <span><strong>Contenida</strong><small>Incluye solo entidades contenidas por el dibujo.</small></span>
      </label>
    </section>

    <section>
      <span className="selection-analysis-setting__eyebrow">PRESENTACIÓN</span>
      <h3>Categorías del gráfico</h3>
      <label htmlFor={`${props.id}-categories`}>Cantidad máxima</label>
      <div className="selection-analysis-setting__number-row">
        <input
          id={`${props.id}-categories`}
          type="number"
          min="3"
          max="8"
          value={props.config.maxCategories || 5}
          onChange={event => updateMaxCategories(Number(event.target.value))}
        />
        <span>entre 3 y 8</span>
      </div>
      <p className="selection-analysis-setting__note">El widget elige automáticamente el campo categórico más representativo de cada capa visible.</p>
    </section>
  </div>
}

export default Setting
