export const GP_TASK_NAMES = {
  sondajes: 'Procesar archivo Excel',
  curvas: 'Procesar Master Plan   Curvas S',
  publicacion: 'Publicar resultado validado'
} as const

/** Accepts a Portal service URL, task URL, or full submitJob endpoint. */
export const toSubmitJobUrl = (value: string, taskName: string): string => {
  const clean = (value || '').trim().split(/[?#]/)[0].replace(/\/+$/, '')
  if (!clean || /\/submitJob$/i.test(clean)) return clean
  const marker = '/gpserver'
  const gpServerIndex = clean.toLowerCase().indexOf(marker)
  if (gpServerIndex < 0) return clean
  const gpServerEnd = gpServerIndex + marker.length
  const taskPath = clean.slice(gpServerEnd).replace(/^\/+/, '')
  return taskPath ? `${clean}/submitJob` : `${clean}/${encodeURIComponent(taskName)}/submitJob`
}

export const isSupportedGpUrl = (value: string): boolean =>
  /^https:\/\/.+\/GPServer(?:\/.+)?\/?(?:[?#].*)?$/i.test((value || '').trim())
