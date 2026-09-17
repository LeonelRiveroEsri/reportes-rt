import * as XLSX from 'xlsx'
import { jsPDF as JsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface ExportCategory {
  label: string
  count: number
  percent: number
}

export interface ExportLayerSummary {
  key: string
  title: string
  geometryType: string
  count: number
  percent: number
  color: string
  legendSymbol?: LegendSymbolStyle
  categoryFieldAlias: string
  categories: ExportCategory[]
  features: any[]
}

export interface LegendSymbolStyle {
  shape: 'point' | 'line' | 'polygon'
  color: [number, number, number]
  outlineColor: [number, number, number]
  outlineWidth: number
  size: number
}

export interface SelectionExportContext {
  reportTitle: string
  generatedAt: Date
  mapTitle: string
  basemapTitle: string
  scaleLabel: string
  relationshipLabel: string
  total: number
  areaLabel: string
  layers: ExportLayerSummary[]
}

export interface PdfExportContext extends SelectionExportContext {
  mapImageDataUrl?: string
}

export interface PdfExportResult {
  mapIncluded: boolean
  detailRows: number
  totalRows: number
  detailTruncated: boolean
}

interface FieldInfo {
  name: string
  alias: string
  type: string
  domain?: any
}

interface ExportColumn {
  field: FieldInfo
  header: string
  description: boolean
}

const EXCEL_MAX_DATA_ROWS = 1048575
const EXCEL_SAFE_ROW_LIMIT = 250000
const EXCEL_SAFE_CELL_LIMIT = 2000000
const WIDTH_SAMPLE_ROWS = 2000
const PDF_ROWS_PER_LAYER = 40
const PDF_TOTAL_DETAIL_ROWS = 300
const PDF_MAX_COLUMNS = 8
const PDF_MAP_LEGEND_LIMIT = 5
const FORMULA_PREFIX = /^[=+\-@]/

const layerOf = (feature: any): any => feature?.layer || feature?.sourceLayer?.layer || feature?.sourceLayer

const collectionToArray = (collection: any): any[] => {
  if (!collection) return []
  if (Array.isArray(collection)) return collection
  if (typeof collection.toArray === 'function') return collection.toArray()
  const items: any[] = []
  collection.forEach?.((item: any) => items.push(item))
  return items
}

const normalizeText = (value: unknown): string => String(value ?? '').split(String.fromCharCode(0)).join('')

const isDangerousSpreadsheetValue = (value: string): boolean => {
  const firstCharacter = value.charCodeAt(0)
  return firstCharacter === 9 || firstCharacter === 10 || firstCharacter === 13 || FORMULA_PREFIX.test(value.replace(/^\s+/, ''))
}

const protectSpreadsheetString = (value: unknown): unknown => {
  if (typeof value !== 'string') return value
  const clean = normalizeText(value)
  return isDangerousSpreadsheetValue(clean) ? `'${clean}` : clean
}

const getFields = (summary: ExportLayerSummary): FieldInfo[] => {
  const layerFields = collectionToArray(layerOf(summary.features[0])?.fields)
  const attributeNames = new Set<string>()
  summary.features.forEach(feature => Object.keys(feature?.attributes || {}).forEach(name => attributeNames.add(name)))
  const fields: FieldInfo[] = layerFields
    .filter(field => field?.name && attributeNames.has(field.name))
    .map(field => ({
      name: String(field.name),
      alias: String(field.alias || field.name),
      type: String(field.type || ''),
      domain: field.domain
    }))
  const knownNames = new Set(fields.map(field => field.name))
  attributeNames.forEach(name => {
    if (!knownNames.has(name)) fields.push({ name, alias: name, type: '' })
  })
  return fields
}

const getDomainLabel = (field: FieldInfo, rawValue: any): string => {
  const codedValues = field?.domain?.codedValues
  if (!Array.isArray(codedValues)) return ''
  const match = codedValues.find((item: any) => String(item.code) === String(rawValue))
  return match ? String(match.name) : ''
}

const normalizeAttributeValue = (rawValue: any, field: FieldInfo, description = false): any => {
  if (rawValue === null || rawValue === undefined) return ''
  if (description) return protectSpreadsheetString(getDomainLabel(field, rawValue))
  if (field.type.toLowerCase() === 'date' && (typeof rawValue === 'number' || /^\d+$/.test(String(rawValue)))) {
    const date = new Date(Number(rawValue))
    if (!Number.isNaN(date.getTime())) return date
  }
  if (typeof rawValue === 'object') {
    try { return protectSpreadsheetString(JSON.stringify(rawValue)) } catch (_) { return protectSpreadsheetString(String(rawValue)) }
  }
  return protectSpreadsheetString(rawValue)
}

const buildColumns = (summary: ExportLayerSummary): ExportColumn[] => {
  const fields = getFields(summary)
  const aliases = new Map<string, number>()
  fields.forEach(field => aliases.set(field.alias.toLowerCase(), (aliases.get(field.alias.toLowerCase()) || 0) + 1))
  const columns: ExportColumn[] = []
  fields.forEach(field => {
    const uniqueAlias = aliases.get(field.alias.toLowerCase()) === 1
    const baseHeader = uniqueAlias ? field.alias : `${field.alias} [${field.name}]`
    const hasDomain = Array.isArray(field?.domain?.codedValues)
    columns.push({ field, header: hasDomain ? `${baseHeader} [Código]` : baseHeader, description: false })
    if (hasDomain) columns.push({ field, header: `${baseHeader} [Descripción]`, description: true })
  })
  return columns
}

const buildRows = (summary: ExportLayerSummary, columns: ExportColumn[]): any[][] => summary.features.map(feature =>
  columns.map(column => normalizeAttributeValue(feature?.attributes?.[column.field.name], column.field, column.description))
)

const safeFilePart = (value: string, fallback = 'seleccion'): string => {
  const withoutControlCharacters = Array.from(normalizeText(value))
    .map(character => character.charCodeAt(0) < 32 ? '_' : character)
    .join('')
  const safe = withoutControlCharacters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 70)
  return safe || fallback
}

const timestamp = (date: Date): string => {
  const pad = (value: number) => value < 10 ? `0${value}` : String(value)
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}_${pad(date.getHours())}${pad(date.getMinutes())}`
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

const setColumnWidths = (sheet: XLSX.WorkSheet, rows: any[][]) => {
  const sampledRows = rows.length <= WIDTH_SAMPLE_ROWS + 1
    ? rows
    : [rows[0], ...rows.slice(1, WIDTH_SAMPLE_ROWS + 1)]
  const widthCount = sampledRows.reduce((maximum, row) => Math.max(maximum, row.length), 0)
  sheet['!cols'] = Array.from({ length: widthCount }, (_, columnIndex) => {
    const width = sampledRows.reduce((maximum, row) => {
      const value = row[columnIndex]
      const length = value instanceof Date ? 19 : String(value ?? '').length
      return Math.max(maximum, length)
    }, 10)
    return { wch: Math.min(42, width + 2) }
  })
}

const appendUniqueSheet = (workbook: XLSX.WorkBook, sheet: XLSX.WorkSheet, requestedName: string, usedNames: Set<string>) => {
  const base = normalizeText(requestedName).replace(/[\\/?*\[\]:]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 31) || 'Datos'
  let name = base
  let suffix = 2
  while (usedNames.has(name.toLowerCase())) {
    const tail = ` (${suffix++})`
    name = `${base.slice(0, 31 - tail.length)}${tail}`
  }
  usedNames.add(name.toLowerCase())
  XLSX.utils.book_append_sheet(workbook, sheet, name)
}

const geometryLabel = (geometryType: string): string => ({
  point: 'Puntos',
  multipoint: 'Multipuntos',
  polyline: 'Líneas',
  polygon: 'Polígonos',
  mesh: 'Mallas'
}[geometryType] || 'Entidades')

export const exportLayerCsv = (summary: ExportLayerSummary, generatedAt = new Date()): number => {
  const columns = buildColumns(summary)
  const rows = [columns.map(column => protectSpreadsheetString(column.header)), ...buildRows(summary, columns)]
  const sheet = XLSX.utils.aoa_to_sheet(rows, { cellDates: true, dateNF: 'dd/mm/yyyy hh:mm' })
  const csv = XLSX.utils.sheet_to_csv(sheet, { FS: ';', RS: '\r\n', blankrows: false })
  const filename = `analisis_seleccion_${safeFilePart(summary.title)}_${timestamp(generatedAt)}.csv`
  downloadBlob(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }), filename)
  return summary.features.length
}

export const exportSelectionExcel = (report: SelectionExportContext): number => {
  if (report.total > EXCEL_SAFE_ROW_LIMIT) {
    throw new Error(`La selección contiene ${report.total.toLocaleString('es-CL')} registros y supera el límite seguro de ${EXCEL_SAFE_ROW_LIMIT.toLocaleString('es-CL')} para Excel en el navegador. Reduzca el área de selección.`)
  }
  const estimatedCells = report.layers.reduce((sum, layer) => sum + layer.features.length * Math.max(1, buildColumns(layer).length), 0)
  if (estimatedCells > EXCEL_SAFE_CELL_LIMIT) {
    throw new Error(`La selección contiene aproximadamente ${estimatedCells.toLocaleString('es-CL')} celdas y supera el límite seguro de ${EXCEL_SAFE_CELL_LIMIT.toLocaleString('es-CL')} para Excel en el navegador. Reduzca el área de selección.`)
  }
  const workbook = XLSX.utils.book_new()
  const usedNames = new Set<string>()
  const summaryRows: any[][] = [
    [protectSpreadsheetString(report.reportTitle)],
    ['Fecha de generación', report.generatedAt],
    ['Web map', protectSpreadsheetString(report.mapTitle)],
    ['Mapa base', protectSpreadsheetString(report.basemapTitle)],
    ['Escala de referencia', protectSpreadsheetString(report.scaleLabel)],
    ['Relación espacial', protectSpreadsheetString(report.relationshipLabel)],
    ['Entidades seleccionadas', report.total],
    ['Capas con resultados', report.layers.length],
    ['Superficie', protectSpreadsheetString(report.areaLabel)],
    [],
    ['Capa', 'Geometría', 'Registros', 'Participación (%)'],
    ...report.layers.map(layer => [
      protectSpreadsheetString(layer.title),
      geometryLabel(layer.geometryType),
      layer.count,
      Number(layer.percent.toFixed(2))
    ])
  ]
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows, { cellDates: true, dateNF: 'dd/mm/yyyy hh:mm' })
  setColumnWidths(summarySheet, summaryRows)
  appendUniqueSheet(workbook, summarySheet, 'Resumen', usedNames)

  const categoryRows: any[][] = [['Capa', 'Campo', 'Categoría', 'Registros', 'Participación en la capa (%)']]
  report.layers.forEach(layer => layer.categories.forEach(category => categoryRows.push([
    protectSpreadsheetString(layer.title),
    protectSpreadsheetString(layer.categoryFieldAlias || 'Sin desglose'),
    protectSpreadsheetString(category.label),
    category.count,
    Number(category.percent.toFixed(2))
  ])))
  const categorySheet = XLSX.utils.aoa_to_sheet(categoryRows)
  setColumnWidths(categorySheet, categoryRows)
  if (categorySheet['!ref']) categorySheet['!autofilter'] = { ref: categorySheet['!ref'] }
  appendUniqueSheet(workbook, categorySheet, 'Categorías', usedNames)

  report.layers.forEach(layer => {
    const columns = buildColumns(layer)
    const dataRows = buildRows(layer, columns)
    for (let offset = 0, part = 1; offset < dataRows.length || (offset === 0 && !dataRows.length); offset += EXCEL_MAX_DATA_ROWS, part++) {
      const rows = [columns.map(column => protectSpreadsheetString(column.header)), ...dataRows.slice(offset, offset + EXCEL_MAX_DATA_ROWS)]
      const sheet = XLSX.utils.aoa_to_sheet(rows, { cellDates: true, dateNF: 'dd/mm/yyyy hh:mm' })
      setColumnWidths(sheet, rows)
      if (sheet['!ref']) sheet['!autofilter'] = { ref: sheet['!ref'] }
      const name = dataRows.length > EXCEL_MAX_DATA_ROWS ? `${layer.title} ${part}` : layer.title
      appendUniqueSheet(workbook, sheet, name, usedNames)
      if (!dataRows.length) break
    }
  })

  const bytes = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', compression: true, cellDates: true })
  const filename = `analisis_seleccion_${timestamp(report.generatedAt)}.xlsx`
  downloadBlob(new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), filename)
  return report.total
}

const hexToRgb = (hex: string): [number, number, number] => {
  const normalized = String(hex || '').replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return [15, 118, 110]
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16)
  ]
}

const layerColor = (layer: ExportLayerSummary): [number, number, number] => layer.legendSymbol?.color || hexToRgb(layer.color)

const drawLegendSymbol = (doc: JsPDF, layer: ExportLayerSummary, x: number, y: number) => {
  const symbol = layer.legendSymbol
  if (!symbol) {
    doc.setFillColor(...hexToRgb(layer.color))
    doc.roundedRect(x, y - 2.7, 3.2, 3.2, 0.5, 0.5, 'F')
    return
  }
  doc.setFillColor(...symbol.color)
  doc.setDrawColor(...symbol.outlineColor)
  doc.setLineWidth(Math.min(0.8, Math.max(0.2, symbol.outlineWidth * 0.25)))
  if (symbol.shape === 'point') {
    doc.circle(x + 1.6, y - 1.1, Math.min(2, Math.max(1.1, symbol.size * 0.16)), 'FD')
  } else if (symbol.shape === 'line') {
    doc.setLineWidth(Math.min(1.4, Math.max(0.5, symbol.outlineWidth * 0.5)))
    doc.line(x, y - 1.1, x + 4.2, y - 1.1)
  } else {
    doc.rect(x, y - 2.8, 4.2, 3.4, 'FD')
  }
}

const drawDonut = (doc: JsPDF, report: PdfExportContext, centerX: number, centerY: number, radius: number) => {
  if (!report.total || !report.layers.length) return
  let startAngle = -Math.PI / 2
  report.layers.forEach(layer => {
    const angle = (layer.count / report.total) * Math.PI * 2
    const steps = Math.max(2, Math.ceil(angle / (Math.PI / 18)))
    const points: Array<[number, number]> = [[centerX, centerY]]
    for (let index = 0; index <= steps; index++) {
      const current = startAngle + angle * index / steps
      points.push([centerX + Math.cos(current) * radius, centerY + Math.sin(current) * radius])
    }
    const vectors = points.slice(1).map((point, index) => [point[0] - points[index][0], point[1] - points[index][1]])
    doc.setFillColor(...layerColor(layer))
    doc.lines(vectors, points[0][0], points[0][1], [1, 1], 'F', true)
    startAngle += angle
  })
  doc.setFillColor(255, 255, 255)
  doc.circle(centerX, centerY, radius * 0.56, 'F')
  doc.setTextColor(24, 57, 74)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text(report.total.toLocaleString('es-CL'), centerX, centerY + 1, { align: 'center' })
  doc.setTextColor(91, 108, 118)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(5.5)
  doc.text('ENTIDADES', centerX, centerY + 4.5, { align: 'center' })
}

const clipText = (doc: JsPDF, value: string, maxWidth: number): string => {
  const text = normalizeText(value)
  if (doc.getTextWidth(text) <= maxWidth) return text
  let clipped = text
  while (clipped.length > 1 && doc.getTextWidth(`${clipped}...`) > maxWidth) clipped = clipped.slice(0, -1)
  return `${clipped}...`
}

const drawHeader = (doc: JsPDF, report: PdfExportContext, pageNumber: number, pageCount: number) => {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFillColor(17, 47, 67)
  doc.rect(0, 0, pageWidth, 24, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(145, 222, 215)
  doc.setFontSize(7)
  doc.text('AMSA  |  INTELIGENCIA TERRITORIAL', 14, 8)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(15)
  doc.text(clipText(doc, report.reportTitle, 170), 14, 17)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.text(report.generatedAt.toLocaleString('es-CL'), pageWidth - 14, 10, { align: 'right' })
  doc.setTextColor(203, 222, 228)
  doc.text(clipText(doc, report.mapTitle, 80), pageWidth - 14, 17, { align: 'right' })

  doc.setDrawColor(208, 220, 225)
  doc.line(14, pageHeight - 10, pageWidth - 14, pageHeight - 10)
  doc.setTextColor(91, 108, 118)
  doc.setFontSize(7)
  const pageLabel = `Página ${pageNumber} de ${pageCount}`
  const sourceWidth = Math.max(40, pageWidth - 36 - doc.getTextWidth(pageLabel))
  doc.text(clipText(doc, `Fuente: ${report.mapTitle} | ${report.basemapTitle}`, sourceWidth), 14, pageHeight - 5.5)
  doc.text(pageLabel, pageWidth - 14, pageHeight - 5.5, { align: 'right' })
}

const drawMapLegend = (doc: JsPDF, report: PdfExportContext, mapX: number, mapY: number, mapWidth: number) => {
  const visibleLayers = report.layers.slice(0, PDF_MAP_LEGEND_LIMIT)
  const additionalLayers = Math.max(0, report.layers.length - visibleLayers.length)
  const entries = visibleLayers.length + (additionalLayers > 0 ? 1 : 0)
  if (!entries) return

  const width = 78
  const rowHeight = 5.5
  const height = 11 + entries * rowHeight
  const x = mapX + mapWidth - width - 4
  const y = mapY + 4

  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(183, 201, 208)
  doc.roundedRect(x, y, width, height, 1.8, 1.8, 'FD')
  doc.setTextColor(35, 63, 78)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.5)
  doc.text('LEYENDA DEL ANÁLISIS', x + 4, y + 6.2)
  doc.setDrawColor(220, 229, 232)
  doc.line(x + 4, y + 8, x + width - 4, y + 8)

  visibleLayers.forEach((layer, index) => {
    const rowY = y + 12 + index * rowHeight
    drawLegendSymbol(doc, layer, x + 4, rowY)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(52, 72, 82)
    doc.setFontSize(6.2)
    const countLabel = layer.count.toLocaleString('es-CL')
    const titleWidth = Math.max(24, width - 17 - doc.getTextWidth(countLabel))
    doc.text(clipText(doc, layer.title, titleWidth), x + 9, rowY)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 61, 76)
    doc.text(countLabel, x + width - 4, rowY, { align: 'right' })
  })

  if (additionalLayers > 0) {
    const rowY = y + 12 + visibleLayers.length * rowHeight
    doc.setFillColor(148, 163, 184)
    doc.roundedRect(x + 4, rowY - 2.7, 3.2, 3.2, 0.5, 0.5, 'F')
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(75, 94, 104)
    doc.setFontSize(6.2)
    doc.text(`${additionalLayers} capas adicionales`, x + 9, rowY)
  }
}

const drawMap = (doc: JsPDF, report: PdfExportContext) => {
  const x = 14
  const y = 31
  const width = 269
  const height = 76
  doc.setFillColor(237, 243, 245)
  doc.setDrawColor(198, 214, 220)
  doc.roundedRect(x, y, width, height, 2, 2, 'FD')
  if (report.mapImageDataUrl) {
    const image = doc.getImageProperties(report.mapImageDataUrl)
    const ratio = Math.min((width - 1) / image.width, (height - 1) / image.height)
    const imageWidth = image.width * ratio
    const imageHeight = image.height * ratio
    doc.addImage(report.mapImageDataUrl, 'PNG', x + (width - imageWidth) / 2, y + (height - imageHeight) / 2, imageWidth, imageHeight, undefined, 'FAST')
    drawMapLegend(doc, report, x, y, width)
  } else {
    doc.setTextColor(92, 113, 123)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Captura del mapa no disponible', x + width / 2, y + height / 2 - 2, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('Los indicadores y las tablas del reporte permanecen completos.', x + width / 2, y + height / 2 + 4, { align: 'center' })
  }
  doc.setFillColor(255, 255, 255)
  doc.rect(x + 4, y + height - 10, width - 8, 7, 'F')
  doc.setTextColor(35, 63, 78)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.text(clipText(doc, report.mapTitle, 170), x + 7, y + height - 5.4)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(91, 108, 118)
  doc.text(`${report.scaleLabel} | ${report.relationshipLabel}`, x + width - 7, y + height - 5.4, { align: 'right' })
}

const drawKpis = (doc: JsPDF, report: PdfExportContext) => {
  const items = [
    ['ENTIDADES', report.total.toLocaleString('es-CL')],
    ['CAPAS', String(report.layers.length)],
    ['SUPERFICIE', report.areaLabel],
    ['CRITERIO', report.relationshipLabel]
  ]
  const gap = 4
  const x = 14
  const y = 113
  const width = (269 - gap * 3) / 4
  items.forEach((item, index) => {
    const itemX = x + index * (width + gap)
    doc.setFillColor(index === 0 ? 231 : 247, index === 0 ? 246 : 249, index === 0 ? 243 : 250)
    doc.setDrawColor(214, 226, 230)
    doc.roundedRect(itemX, y, width, 25, 2, 2, 'FD')
    doc.setTextColor(84, 105, 115)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    doc.text(item[0], itemX + 5, y + 7)
    doc.setTextColor(24, 57, 74)
    doc.setFontSize(index === 2 || index === 3 ? 12 : 16)
    doc.text(clipText(doc, item[1], width - 10), itemX + 5, y + 18.5)
  })
}

const drawRanking = (doc: JsPDF, report: PdfExportContext) => {
  const layers = report.layers.slice(0, 5)
  const x = 14
  const y = 147
  const width = 269
  doc.setTextColor(15, 118, 110)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('DISTRIBUCIÓN DE ENTIDADES POR CAPA', x, y)
  doc.setTextColor(31, 61, 76)
  doc.setFontSize(10)
  doc.text('Distribución y ranking de capas activas', x, y + 6)
  if (!layers.length) return
  drawDonut(doc, report, x + 24, y + 27, 17)
  const maximum = Math.max(...layers.map(layer => layer.count), 1)
  layers.forEach((layer, index) => {
    const rowY = y + 12 + index * 6.6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.8)
    doc.setTextColor(61, 82, 93)
    doc.text(clipText(doc, layer.title, 52), x + 48, rowY + 2.3)
    doc.setFillColor(235, 241, 243)
    doc.roundedRect(x + 104, rowY, 134, 3.6, 1.8, 1.8, 'F')
    doc.setFillColor(...layerColor(layer))
    doc.roundedRect(x + 104, rowY, Math.max(2, 134 * layer.count / maximum), 3.6, 1.8, 1.8, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 61, 76)
    doc.text(layer.count.toLocaleString('es-CL'), x + width, rowY + 2.8, { align: 'right' })
  })
  if (report.layers.length > layers.length) {
    doc.setTextColor(94, 112, 121)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.text(`El resumen tabular incluye ${report.layers.length - layers.length} capas adicionales.`, x + 48, y + 12 + layers.length * 6.6 + 2)
  }
}

const valueForPdf = (rawValue: any, field: FieldInfo): string => {
  const domainLabel = getDomainLabel(field, rawValue)
  if (domainLabel) return domainLabel
  const normalized = normalizeAttributeValue(rawValue, field)
  if (normalized instanceof Date) return normalized.toLocaleString('es-CL')
  return normalizeText(normalized)
}

const reportFields = (summary: ExportLayerSummary): FieldInfo[] => {
  const fields = getFields(summary)
  const layer = layerOf(summary.features[0])
  const objectIdField = String(layer?.objectIdField || '')
  const displayField = String(layer?.displayField || '')
  const preferred = [objectIdField, displayField].filter(Boolean)
  const ordered = [
    ...preferred.map(name => fields.find(field => field.name === name)).filter(Boolean),
    ...fields.filter(field => preferred.indexOf(field.name) < 0 && !/(blob|raster|xml|geometry)/i.test(field.type))
  ]
  const unique = new Map<string, FieldInfo>()
  ordered.forEach(field => unique.set(field.name, field))
  return Array.from(unique.values()).slice(0, PDF_MAX_COLUMNS)
}

export const exportSelectionPdf = (report: PdfExportContext): PdfExportResult => {
  const doc = new JsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true })
  doc.setProperties({
    title: report.reportTitle,
    subject: 'Resumen de selección espacial',
    author: 'AMSA',
    creator: 'ArcGIS Experience Builder - Análisis de Selección'
  })

  drawMap(doc, report)
  drawKpis(doc, report)
  drawRanking(doc, report)

  doc.addPage()
  doc.setTextColor(15, 118, 110)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('RESUMEN EJECUTIVO', 14, 33)
  doc.setTextColor(31, 61, 76)
  doc.setFontSize(12)
  doc.text('Capas con entidades seleccionadas', 14, 40)
  autoTable(doc, {
    startY: 45,
    margin: { top: 31, right: 14, bottom: 15, left: 14 },
    head: [['Capa', 'Geometría', 'Entidades', 'Participación']],
    body: report.layers.map(layer => [layer.title, geometryLabel(layer.geometryType), layer.count.toLocaleString('es-CL'), `${layer.percent.toFixed(1)}%`]),
    theme: 'striped',
    headStyles: { fillColor: [17, 74, 82], textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { textColor: [43, 65, 76], fontSize: 7.5, cellPadding: 2 },
    alternateRowStyles: { fillColor: [242, 247, 248] },
    columnStyles: { 2: { halign: 'right' }, 3: { halign: 'right' } }
  })

  let nextY = ((doc as any).lastAutoTable?.finalY || 45) + 8
  const categoryRows: any[][] = []
  report.layers.forEach(layer => layer.categories.forEach(category => categoryRows.push([
    layer.title,
    layer.categoryFieldAlias || 'Sin desglose',
    category.label,
    category.count.toLocaleString('es-CL'),
    `${category.percent.toFixed(1)}%`
  ])))
  if (categoryRows.length) {
    if (nextY > 165) {
      doc.addPage()
      nextY = 33
    }
    doc.setTextColor(15, 118, 110)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.text('DESGLOSE CATEGÓRICO', 14, nextY)
    autoTable(doc, {
      startY: nextY + 5,
      margin: { top: 31, right: 14, bottom: 15, left: 14 },
      head: [['Capa', 'Campo', 'Categoría', 'Registros', 'Participación']],
      body: categoryRows,
      theme: 'grid',
      headStyles: { fillColor: [30, 93, 101], textColor: 255, fontStyle: 'bold', fontSize: 7 },
      bodyStyles: { textColor: [48, 71, 82], fontSize: 6.8, cellPadding: 1.5 },
      styles: { lineColor: [218, 227, 230], lineWidth: 0.1 },
      columnStyles: { 3: { halign: 'right' }, 4: { halign: 'right' } }
    })
    nextY = ((doc as any).lastAutoTable?.finalY || nextY) + 8
  }

  let remainingBudget = PDF_TOTAL_DETAIL_ROWS
  let detailRows = 0
  let detailTruncated = false
  report.layers.forEach(layer => {
    if (remainingBudget <= 0) {
      detailTruncated = detailTruncated || layer.count > 0
      return
    }
    const fields = reportFields(layer)
    if (!layer.features.length) return
    if (!fields.length) {
      detailTruncated = true
      return
    }
    const rowLimit = Math.min(PDF_ROWS_PER_LAYER, remainingBudget, layer.features.length)
    const rows = layer.features.slice(0, rowLimit).map(feature => fields.map(field => valueForPdf(feature?.attributes?.[field.name], field)))
    if (nextY > 165) {
      doc.addPage()
      nextY = 33
    }
    autoTable(doc, {
      startY: nextY,
      margin: { top: 31, right: 14, bottom: 15, left: 14 },
      head: [
        [{ content: `CAPA: ${layer.title}  |  ${layer.count.toLocaleString('es-CL')} registros`, colSpan: fields.length, styles: { fillColor: [17, 74, 82], textColor: 255, fontStyle: 'bold', fontSize: 7.5 } }],
        fields.map(field => field.alias || field.name)
      ],
      body: rows,
      theme: 'grid',
      showHead: 'everyPage',
      headStyles: { fillColor: [224, 239, 238], textColor: [28, 67, 73], fontStyle: 'bold', fontSize: 6.5, cellPadding: 1.3 },
      bodyStyles: { textColor: [52, 72, 82], fontSize: 6, cellPadding: 1.15, overflow: 'linebreak' },
      styles: { lineColor: [218, 227, 230], lineWidth: 0.1, minCellWidth: 12 }
    })
    detailRows += rowLimit
    remainingBudget -= rowLimit
    detailTruncated = detailTruncated || rowLimit < layer.features.length || fields.length < getFields(layer).length
    nextY = ((doc as any).lastAutoTable?.finalY || nextY) + 8
  })

  if (detailTruncated) {
    if (nextY > 185) {
      doc.addPage()
      nextY = 34
    }
    doc.setFillColor(255, 247, 230)
    doc.setDrawColor(235, 193, 111)
    doc.roundedRect(14, nextY, 269, 13, 2, 2, 'FD')
    doc.setTextColor(112, 75, 18)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.text('El anexo PDF muestra una muestra acotada para mantener el reporte legible. Excel contiene toda la selección; CSV contiene la capa activa.', 19, nextY + 8)
  }

  const pageCount = doc.getNumberOfPages()
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
    doc.setPage(pageNumber)
    drawHeader(doc, report, pageNumber, pageCount)
  }
  doc.save(`reporte_seleccion_espacial_${timestamp(report.generatedAt)}.pdf`)
  return {
    mapIncluded: Boolean(report.mapImageDataUrl),
    detailRows,
    totalRows: report.total,
    detailTruncated
  }
}
