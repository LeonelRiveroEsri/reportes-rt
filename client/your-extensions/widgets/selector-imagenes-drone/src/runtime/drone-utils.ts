export interface ParsedFlightName {
  date: Date | null
  dateKey: string
  year: string
  month: string
  place: string
  label: string
}

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const normalizeText = (value: unknown): string => String(value ?? '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export const parseFlightName = (title: string): ParsedFlightName => {
  const raw = String(title || '').trim()
  const match = raw.match(/^(\d{2}|\d{4})[_-](\d{1,2})[_-](\d{1,2})(?:[_-]+)?(.*)$/)
  if (!match) return { date: null, dateKey: '', year: 'Sin fecha', month: 'Sin fecha', place: raw, label: raw }
  const yearNumber = match[1].length === 2 ? 2000 + Number(match[1]) : Number(match[1])
  const monthNumber = Number(match[2])
  const dayNumber = Number(match[3])
  const candidate = new Date(yearNumber, monthNumber - 1, dayNumber)
  const valid = candidate.getFullYear() === yearNumber && candidate.getMonth() === monthNumber - 1 && candidate.getDate() === dayNumber
  const place = (match[4] || 'Vuelo sin sector').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!valid) return { date: null, dateKey: '', year: 'Sin fecha', month: 'Sin fecha', place, label: `${raw} · fecha no válida` }
  const dateKey = `${yearNumber}-${String(monthNumber).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`
  return {
    date: candidate,
    dateKey,
    year: String(yearNumber),
    month: MONTHS[monthNumber - 1],
    place,
    label: `${String(dayNumber).padStart(2, '0')} ${MONTHS[monthNumber - 1].slice(0, 3).toLowerCase()} ${yearNumber} · ${place}`
  }
}

export const matchesGroupTitle = (candidate: string, expected: string): boolean => {
  const groupKey = (value: string) => normalizeText(value)
    .replace(/\b(de|del|la|las|el|los)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const left = groupKey(candidate)
  const right = groupKey(expected || 'Imagenes de Drone')
  return left === right || left.includes(right)
}
