"""Generador ReportLab para F-MA-018 Reporte de Terreno.

Reemplaza el Feature Report de Survey123. Puede consumir un diccionario ya
normalizado o consultar directamente el feature service mediante ArcGIS API
for Python. Los adjuntos se mantienen en el nivel al que pertenecen:
inspeccion, instalacion/accion, cierre de accion y cierre general.
"""

from __future__ import annotations

import argparse
import io
import json
import os
import tempfile
import time
import zipfile
import datetime as dt
from pathlib import Path
from typing import Any, Iterable

import requests
from PIL import Image as PILImage, ImageDraw, ImageOps
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, Image, KeepTogether, PageTemplate, Paragraph,
    PageBreak, Spacer, Table, TableStyle,
)

NAVY = colors.HexColor("#17365D")
BLUE = colors.HexColor("#DCE6F1")
GRID = colors.HexColor("#7F8C99")
LIGHT = colors.HexColor("#F2F2F2")
WHITE = colors.white
PAGE_W, PAGE_H = A4
MARGIN_X = 13 * mm
MARGIN_TOP = 17 * mm
MARGIN_BOTTOM = 15 * mm
CONTENT_W = PAGE_W - 2 * MARGIN_X
LABEL_W = 31 * mm
# Todas las tablas usan el mismo ancho que la tabla de imágenes.
FORM_W = CONTENT_W
# No usar Path.with_name aquí. Al publicar un servicio GP, ArcGIS reescribe
# "assets" como una ruta consolidada que puede contener varios directorios
# (por ejemplo, ../../cd/assets), y with_name rechaza ese valor. El operador /
# admite tanto la ruta local como la ruta reescrita por ArcGIS Server.
ASSETS_DIR = Path(__file__).resolve().parent / "assets"
LOGO_LOS_PELAMBRES = ASSETS_DIR / "logo_2.jpg"
LOGO_MEDIO_AMBIENTE = ASSETS_DIR / "logo_1.png"
MESES_ES = {
    1: "enero", 2: "febrero", 3: "marzo", 4: "abril",
    5: "mayo", 6: "junio", 7: "julio", 8: "agosto",
    9: "septiembre", 10: "octubre", 11: "noviembre", 12: "diciembre",
}

# Configuración autocontenida para ArcGIS Server. Las variables de entorno
# permiten reemplazar estos valores sin volver a publicar el servicio.
PORTAL_URL = os.environ.get("AMSA_PORTAL_URL", "https://sig.aminerals.cl/portal/")
PORTAL_USER = os.environ.get("AMSA_PORTAL_USER", "")
PORTAL_PASSWORD = os.environ.get("AMSA_PORTAL_PASSWORD", "")
FEATURE_ITEM_ID = "aa0a9bb3504b4916a61a12ca6a920739"
TEMPLATE_ITEM_ID = "677ae2fd7beb48c7a9ab2ac65913f8e6"


def connect_gis():
    """Crea la conexión al portal sin depender de archivos locales."""
    from arcgis import GIS
    if not PORTAL_USER or not PORTAL_PASSWORD:
        raise RuntimeError(
            "Configure AMSA_PORTAL_USER y AMSA_PORTAL_PASSWORD antes de ejecutar."
        )
    return GIS(PORTAL_URL, PORTAL_USER, PORTAL_PASSWORD)


def resolve_object_id(
    gis,
    item_id: str = FEATURE_ITEM_ID,
    object_id: int | str | None = None,
    lookback_minutes: float = 15,
) -> int | None:
    """Resuelve ObjectID explícito o el registro editado más recientemente.

    En modo automático se obtiene solo el primer registro ordenado por
    ``last_edited_date DESC`` y luego se valida en Python contra una ventana
    UTC. La comparación final se realiza en epoch milliseconds, por lo que no
    depende de la zona horaria configurada en ArcGIS Server, Portal o Chile.
    """
    if object_id not in (None, ""):
        value = int(object_id)
        if value <= 0:
            raise ValueError("ObjectID debe ser mayor que cero.")
        return value

    item = gis.content.get(item_id)
    if item is None or not item.layers:
        raise RuntimeError(f"No se encontró la capa principal del ítem {item_id}.")
    layer = item.layers[0]
    fields = {field.name.lower(): field.name for field in layer.properties.fields}
    edited_field = fields.get("last_edited_date")
    oid_field = layer.properties.objectIdField
    if not edited_field:
        raise RuntimeError("La capa principal no contiene last_edited_date.")

    result = layer.query(
        where="1=1",
        out_fields=f"{oid_field},{edited_field}",
        return_geometry=False,
        order_by_fields=f"{edited_field} DESC",
        result_record_count=1,
    )
    if not result.features:
        return None

    attributes = result.features[0].attributes
    value = attributes.get(edited_field)
    if isinstance(value, (int, float)):
        edited_ms = int(value)
    elif isinstance(value, dt.datetime):
        edited_at = value
        if edited_at.tzinfo is None:
            edited_at = edited_at.replace(tzinfo=dt.timezone.utc)
        else:
            edited_at = edited_at.astimezone(dt.timezone.utc)
        edited_ms = int(edited_at.timestamp() * 1000)
    elif isinstance(value, dt.date):
        edited_at = dt.datetime.combine(value, dt.time.min, tzinfo=dt.timezone.utc)
        edited_ms = int(edited_at.timestamp() * 1000)
    else:
        text = str(value or "").replace("Z", "+00:00")
        try:
            edited_at = dt.datetime.fromisoformat(text)
            if edited_at.tzinfo is None:
                edited_at = edited_at.replace(tzinfo=dt.timezone.utc)
            else:
                edited_at = edited_at.astimezone(dt.timezone.utc)
            edited_ms = int(edited_at.timestamp() * 1000)
        except ValueError as exc:
            raise RuntimeError(
                f"No fue posible interpretar last_edited_date={value!r}."
            ) from exc

    now_ms = int(time.time() * 1000)
    window_ms = int(float(lookback_minutes) * 60 * 1000)
    future_tolerance_ms = 10 * 60 * 1000
    age_ms = now_ms - edited_ms
    if age_ms < -future_tolerance_ms or age_ms > window_ms:
        return None
    return int(attributes[oid_field])


def configure_logo_assets(gis, workspace: str | os.PathLike) -> tuple[Path, Path]:
    """Descarga la plantilla del portal y extrae los logos para el job GP.

    Survey123 guarda ambos recursos dentro de ``word/media``. Se extraen al
    scratchFolder para no depender de las rutas reescritas al publicar en AGS.
    """
    global ASSETS_DIR, LOGO_LOS_PELAMBRES, LOGO_MEDIO_AMBIENTE

    assets_dir = Path(workspace) / "rt_report_assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    template_path = assets_dir / "template_fma018.docx"
    logo_medio_ambiente = assets_dir / "logo_1.png"
    logo_los_pelambres = assets_dir / "logo_2.jpg"

    if not logo_medio_ambiente.is_file() or not logo_los_pelambres.is_file():
        item = gis.content.get(TEMPLATE_ITEM_ID)
        if item is None:
            raise RuntimeError(
                f"No se encontró la plantilla {TEMPLATE_ITEM_ID} en el portal."
            )
        downloaded = Path(item.download(
            save_path=str(assets_dir), file_name=template_path.name
        ))
        with zipfile.ZipFile(downloaded) as archive:
            logo_medio_ambiente.write_bytes(archive.read("word/media/image1.png"))
            logo_los_pelambres.write_bytes(archive.read("word/media/image2.jpg"))

    ASSETS_DIR = assets_dir
    LOGO_LOS_PELAMBRES = logo_los_pelambres
    LOGO_MEDIO_AMBIENTE = logo_medio_ambiente
    return LOGO_LOS_PELAMBRES, LOGO_MEDIO_AMBIENTE


def _value(value: Any, default: str = "—") -> str:
    if value is None or value == "":
        return default
    return str(value)


def _date(value: Any) -> str:
    if value in (None, ""):
        return "—"
    if isinstance(value, (dt.date, dt.datetime)):
        return value.strftime("%d/%m/%Y")
    if isinstance(value, (int, float)):
        # ArcGIS REST dates are epoch milliseconds.
        try:
            return dt.datetime.fromtimestamp(value / 1000).strftime("%d/%m/%Y")
        except (ValueError, OSError, OverflowError):
            pass
    text = str(value)
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S", "%m/%d/%Y"):
        try:
            return dt.datetime.strptime(text[:19], fmt).strftime("%d/%m/%Y")
        except ValueError:
            continue
    return text


def _date_long_es(value: Any) -> str:
    """Fecha larga en español sin depender del locale de Windows/Python."""
    if value in (None, ""):
        return "—"
    parsed = None
    if isinstance(value, (dt.date, dt.datetime)):
        parsed = value
    elif isinstance(value, (int, float)):
        try:
            parsed = dt.datetime.fromtimestamp(value / 1000)
        except (ValueError, OSError, OverflowError):
            pass
    else:
        text = str(value).strip()
        for fmt, length in (
            ("%Y-%m-%dT%H:%M:%S", 19), ("%Y-%m-%d", 10),
            ("%m/%d/%Y", 10), ("%d/%m/%Y", 10),
        ):
            try:
                parsed = dt.datetime.strptime(text[:length], fmt)
                break
            except ValueError:
                continue
    if parsed is None:
        return _value(value)
    return f"{parsed.day} de {MESES_ES[parsed.month]} de {parsed.year}"


def _escape(value: Any) -> str:
    import html
    return html.escape(_value(value)).replace("\n", "<br/>")


def _checked(value: Any, expected: str) -> str:
    # ASCII evita que fuentes PDF base representen ambos glifos Unicode como ■.
    return "[X]" if str(value or "").strip().upper() == expected.upper() else "[ ]"


def _styles():
    styles = getSampleStyleSheet()
    return {
        "normal": ParagraphStyle("rt", parent=styles["Normal"], fontName="Helvetica", fontSize=8, leading=10),
        "small": ParagraphStyle("rt-small", parent=styles["Normal"], fontName="Helvetica", fontSize=7, leading=8.5),
        "label": ParagraphStyle("rt-label", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.2, leading=9),
        "section": ParagraphStyle("rt-section", parent=styles["Normal"], fontName="Helvetica-Bold", textColor=WHITE, fontSize=8.2, leading=10, alignment=TA_LEFT),
        "title": ParagraphStyle("rt-title", parent=styles["Normal"], fontName="Helvetica-Bold", textColor=NAVY, fontSize=14, leading=16, alignment=TA_CENTER),
        "photo": ParagraphStyle("rt-photo", parent=styles["Normal"], fontName="Helvetica-Oblique", fontSize=6.5, leading=8, alignment=TA_CENTER),
    }


S = _styles()


def P(value: Any, style: str = "normal") -> Paragraph:
    return Paragraph(_escape(value), S[style])


def _center(value: Any, bold: bool = False, size: float = 8.5) -> Paragraph:
    style = ParagraphStyle(
        f"rt-center-{bold}-{size}", parent=S["normal"],
        fontName="Helvetica-Bold" if bold else "Helvetica",
        fontSize=size, leading=size + 2, alignment=TA_CENTER,
    )
    return Paragraph(_escape(value), style)


def section(title: str) -> Table:
    t = Table([[Paragraph(_escape(title), S["section"])]], colWidths=[CONTENT_W], hAlign="LEFT")
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), NAVY), ("BOX", (0, 0), (-1, -1), .5, NAVY), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    return t


def fields(rows: list[list[Any]], widths: list[float] | None = None) -> Table:
    cooked = []
    for row in rows:
        cooked.append([P(v, "label" if i % 2 == 0 else "normal") if not hasattr(v, "wrap") else v for i, v in enumerate(row)])
    widths = widths or [LABEL_W, (CONTENT_W - 2 * LABEL_W) / 2, LABEL_W, (CONTENT_W - 2 * LABEL_W) / 2]
    t = Table(cooked, colWidths=widths, repeatRows=0, hAlign="LEFT")
    commands = [
        ("GRID", (0, 0), (-1, -1), .35, GRID), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (0, -1), BLUE), ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]
    if len(widths) == 4:
        commands.append(("BACKGROUND", (2, 0), (2, -1), BLUE))
    t.setStyle(TableStyle(commands))
    return t


def _read_attachment(item: Any) -> tuple[bytes, str]:
    if isinstance(item, (str, os.PathLike)):
        path = Path(item)
        return path.read_bytes(), path.name
    if isinstance(item, bytes):
        return item, "imagen"
    name = item.get("name") or item.get("filename") or "imagen"
    if item.get("bytes") is not None:
        return item["bytes"], name
    if item.get("path"):
        return Path(item["path"]).read_bytes(), name
    response = requests.get(item["url"], headers=item.get("headers"), params=item.get("params"), timeout=90)
    response.raise_for_status()
    return response.content, name


def photo_flowables(
    items: Iterable[Any], max_w: float = 150 * mm, max_h: float = 105 * mm,
    title: str = "IMÁGENES ADJUNTAS",
) -> list[Any]:
    """Distribuye adjuntos en una tabla de dos columnas.

    Una foto ocupa las dos columnas y queda centrada. Con tres o cualquier
    cantidad impar, la última también ocupa ambas columnas. La tabla puede
    dividirse entre filas cuando hay muchas fotografías.
    """
    items = list(items or [])
    if not items:
        return []

    two_columns = len(items) > 1
    column_w = CONTENT_W / 2
    image_max_w = min(max_w if not two_columns else column_w - 8 * mm, 82 * mm if two_columns else max_w)
    image_max_h = min(max_h, 68 * mm if two_columns else max_h)
    cells: list[Any] = []

    for item in items:
        try:
            raw, name = _read_attachment(item)
            pil = ImageOps.exif_transpose(PILImage.open(io.BytesIO(raw))).convert("RGB")
            w, h = pil.size
            scale = min(image_max_w / w, image_max_h / h)
            stream = io.BytesIO()
            pil.save(stream, format="JPEG", quality=88, optimize=True)
            stream.seek(0)
            photo = Image(stream, width=w * scale, height=h * scale, hAlign="CENTER")
            cells.append([photo, Spacer(1, 1.2 * mm), Paragraph(f"Fotografía. {_escape(name)}", S["photo"])])
        except Exception as exc:
            cells.append([P(f"No fue posible incorporar la imagen: {exc}", "small")])

    rows: list[list[Any]] = [[Paragraph(_escape(title), ParagraphStyle(
        "rt-photo-title", parent=S["normal"], fontName="Helvetica-Bold",
        fontSize=9, leading=11, alignment=TA_CENTER,
    )), ""]]
    spans = [("SPAN", (0, 0), (1, 0))]
    index = 0
    while index < len(cells):
        remaining = len(cells) - index
        if remaining == 1:
            rows.append([cells[index], ""])
            row = len(rows) - 1
            spans.append(("SPAN", (0, row), (1, row)))
            index += 1
        else:
            rows.append([cells[index], cells[index + 1]])
            index += 2

    table = Table(rows, colWidths=[column_w, column_w], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        *spans,
        ("GRID", (0, 0), (-1, -1), .6, colors.black),
        ("BACKGROUND", (0, 0), (-1, 0), BLUE),
        ("VALIGN", (0, 1), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 1), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 1), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 1), (-1, -1), 2 * mm),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 2 * mm),
        ("TOPPADDING", (0, 0), (-1, 0), 2),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
    ]))
    return [table, Spacer(1, 2 * mm)]


class RTDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str | os.PathLike):
        super().__init__(str(filename), pagesize=A4, leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM, title="F-MA-018 Reporte de Terreno")
        # Sin padding: encabezados, secciones y tablas comparten exactamente
        # los mismos bordes izquierdo y derecho.
        frame = Frame(
            MARGIN_X, MARGIN_BOTTOM, CONTENT_W,
            PAGE_H - MARGIN_TOP - MARGIN_BOTTOM,
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
            id="body",
        )
        self.addPageTemplates(PageTemplate(id="rt", frames=[frame], onPage=self._page))

    @staticmethod
    def _page(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(NAVY)
        canvas.setLineWidth(.7)
        canvas.line(MARGIN_X, 10 * mm, PAGE_W - MARGIN_X, 10 * mm)
        canvas.setFont("Helvetica", 6.5)
        canvas.setFillColor(colors.HexColor("#555555"))
        canvas.drawString(MARGIN_X, 6.5 * mm, "F-MA-018 · Reporte de Terreno Operacional")
        canvas.drawRightString(PAGE_W - MARGIN_X, 6.5 * mm, f"Página {doc.page}")
        canvas.restoreState()


def _header(data: dict[str, Any]) -> list[Any]:
    result: list[Any] = []
    logos = _logo_row()
    if logos:
        result += [logos, Spacer(1, 8 * mm)]
    title_style = ParagraphStyle(
        "rt-cover-title", parent=S["title"], textColor=colors.HexColor("#888888"),
        fontSize=14, leading=18, alignment=TA_CENTER,
    )
    result += [Paragraph("Reporte de Terreno<br/>OPERACIONAL", title_style), Spacer(1, 7 * mm)]
    return result


def _logo_row() -> Table | None:
    if not LOGO_LOS_PELAMBRES.exists() or not LOGO_MEDIO_AMBIENTE.exists():
        return None
    logos = Table([[
        # Plantilla: Los Pelambres a la izquierda y Medio Ambiente a la derecha.
        Image(str(LOGO_LOS_PELAMBRES), width=38 * mm, height=11.58 * mm),
        Image(str(LOGO_MEDIO_AMBIENTE), width=38 * mm, height=15.65 * mm),
    ]], colWidths=[FORM_W / 2, FORM_W / 2], hAlign="CENTER")
    logos.setStyle(TableStyle([
        ("ALIGN", (0, 0), (0, 0), "LEFT"), ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return logos


def _map_for_installation(
    inst: dict[str, Any], map_w: float = 108 * mm, map_h: float = 75.6 * mm,
) -> Image | Paragraph:
    """Exporta ortofoto Esri y marca las coordenadas UTM de la instalación."""
    try:
        x = float(inst.get("utm_coordx_inst"))
        y = float(inst.get("utm_coordy_inst"))
        radius = 700
        response = requests.get(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export",
            params={
                "bbox": f"{x-radius},{y-radius},{x+radius},{y+radius}",
                "bboxSR": 32719, "imageSR": 32719, "size": "600,420",
                "format": "jpg", "f": "image",
            }, timeout=45,
        )
        response.raise_for_status()
        pil = PILImage.open(io.BytesIO(response.content)).convert("RGB")
        draw = ImageDraw.Draw(pil)
        cx, cy = pil.width // 2, pil.height // 2
        # Pin azul con centro amarillo, similar al mapa del Feature Report.
        draw.ellipse((cx - 16, cy - 30, cx + 16, cy + 2), fill="#318CE7", outline="white", width=3)
        draw.polygon([(cx - 12, cy - 4), (cx + 12, cy - 4), (cx, cy + 22)], fill="#318CE7")
        draw.ellipse((cx - 6, cy - 20, cx + 6, cy - 8), fill="#718844", outline="white", width=2)
        draw.rectangle((0, pil.height - 18, pil.width, pil.height), fill=(255, 255, 255))
        draw.text((pil.width - 105, pil.height - 15), "Powered by Esri", fill=(80, 80, 80))
        stream = io.BytesIO()
        pil.save(stream, "JPEG", quality=88)
        stream.seek(0)
        return Image(stream, width=map_w, height=map_h, hAlign="CENTER")
    except Exception as exc:
        return P(f"Mapa no disponible: {exc}", "small")


def _installation_form(inst: dict[str, Any]) -> Table:
    x = inst.get("utm_coordx_inst")
    y = inst.get("utm_coordy_inst")
    try:
        x = f"{float(x):,.0f}"
        y = f"{float(y):,.0f}"
    except (TypeError, ValueError):
        pass
    rows = [
        [_center("ID", True), "", "", _center("NOMBRE ÁREA DE INSPECCIÓN", True), "", _center("ESTADO ÁREA DE INSPECCIÓN", True)],
        [_center(inst.get("id_instalacion")), "", "", _center(inst.get("nombre_inst")), "", _center(inst.get("estado_area") or inst.get("estado2"))],
        [_center("DESCRIPCIÓN DE ÁREA DE INSPECCIÓN", True), "", "", "", "", ""],
        [Paragraph(f"• &nbsp;&nbsp;{_escape(inst.get('descrip_inst'))}", ParagraphStyle("rt-inst-desc", parent=S["normal"], fontSize=8.5, leading=11, leftIndent=7 * mm)), "", "", "", "", ""],
        [_center("UBICACIÓN DE ÁREA DE INSPECCIÓN", True), "", "", "", "", ""],
        [_center("N", True), _center(y), _center("E", True), _center(x), _center("DATUM", True), _center("WGS 84")],
        [_map_for_installation(inst), "", "", "", "", ""],
    ]
    table = Table(rows, colWidths=[13 * mm, 40 * mm, 13 * mm, 40 * mm, 18 * mm, FORM_W - 124 * mm], rowHeights=[None, None, None, 16 * mm, None, None, 78 * mm], hAlign="CENTER")
    table.setStyle(TableStyle([
        ("SPAN", (0, 0), (2, 0)), ("SPAN", (3, 0), (4, 0)),
        ("SPAN", (0, 1), (2, 1)), ("SPAN", (3, 1), (4, 1)),
        ("SPAN", (0, 2), (5, 2)), ("SPAN", (0, 3), (5, 3)),
        ("SPAN", (0, 4), (5, 4)), ("SPAN", (0, 6), (5, 6)),
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 0), BLUE), ("BACKGROUND", (0, 2), (-1, 2), BLUE),
        ("BACKGROUND", (0, 4), (-1, 4), BLUE),
        ("BACKGROUND", (0, 5), (0, 5), BLUE), ("BACKGROUND", (2, 5), (2, 5), BLUE),
        ("BACKGROUND", (4, 5), (4, 5), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return table


def _action_form(action: dict[str, Any]) -> Table:
    extended = _date(action.get("plazo_ext_inst"))
    motive = _value(action.get("plazo_ext_inst_motivo"), "")
    extended_text = f"MOTIVO: {motive}" if motive else "MOTIVO:"
    rows = [
        [_center("ACCIÓN", True), ""],
        [_center(action.get("id_control_inst")), ""],
        [_center("ACCIONES DE CONTROL", True), ""],
        [Paragraph(f"• &nbsp;&nbsp;{_escape(action.get('accion_control_inst'))}", ParagraphStyle("rt-action-desc", parent=S["normal"], fontSize=8.5, leading=11, leftIndent=7 * mm)), ""],
        [_center("RESPONSABLES", True), _center("PLAZO", True)],
        [_center(action.get("resp_control_inst")), _center(_date(action.get("plazo_control_inst")))],
        [_center("PLAZO EXTENDIDO", True), _center("ESTADO", True)],
        [_center(extended_text), _center(action.get("estado_accion_inst"))],
        [_center(extended if extended != "—" else ""), ""],
        [_center("OBSERVACIÓN DE LA ANULACIÓN", True), _center("REALIZADO POR", True)],
        [_center(action.get("observ_anulacion_inst")), _center(action.get("autor_cierre_inst"))],
    ]
    table = Table(rows, colWidths=[FORM_W / 2, FORM_W / 2], rowHeights=[None, None, None, 16 * mm, None, None, None, 12 * mm, None, None, None], hAlign="CENTER")
    table.setStyle(TableStyle([
        ("SPAN", (0, 0), (1, 0)), ("SPAN", (0, 1), (1, 1)),
        ("SPAN", (0, 2), (1, 2)), ("SPAN", (0, 3), (1, 3)),
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 0), BLUE), ("BACKGROUND", (0, 2), (-1, 2), BLUE),
        ("BACKGROUND", (0, 4), (-1, 4), BLUE), ("BACKGROUND", (0, 6), (-1, 6), BLUE),
        ("BACKGROUND", (0, 9), (-1, 9), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return table


def _action_closure_form(action: dict[str, Any]) -> Table:
    """Tabla de cierre perteneciente a una acción de control."""
    rows = [
        [_center("CIERRE ACCIÓN", True), ""],
        [_center("REALIZADO POR", True), _center("TIPO", True)],
        [_center(action.get("autor_cierre_inst")), _center(action.get("tipo_cierre_inst"))],
        [_center("FECHA", True), _center("HORA", True)],
        [_center(_date(action.get("fecha_cierre_inst"))), _center(action.get("hora_cierre_inst"))],
        [_center("DESCRIPCIÓN CIERRE ACCIÓN", True), ""],
        [Paragraph(_escape(action.get("descrip_cierre_inst")), ParagraphStyle(
            "rt-action-close-description", parent=S["normal"], fontSize=8.5,
            leading=11, leftIndent=5 * mm, rightIndent=5 * mm,
        )), ""],
    ]
    table = Table(
        rows, colWidths=[FORM_W / 2, FORM_W / 2],
        rowHeights=[None, None, None, None, None, None, 22 * mm],
        hAlign="CENTER",
    )
    table.setStyle(TableStyle([
        ("SPAN", (0, 0), (1, 0)), ("SPAN", (0, 5), (1, 5)),
        ("SPAN", (0, 6), (1, 6)),
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 1), BLUE),
        ("BACKGROUND", (0, 3), (-1, 3), BLUE),
        ("BACKGROUND", (0, 5), (-1, 5), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return table


def _classification_form(data: dict[str, Any]) -> list[Any]:
    risk_values = ("SEGURIDAD", "SALUD", "SOCIAL", "AMBIENTAL")
    risk = Table([
        [_center("TIPO DE RIESGO ASOCIADO", True), "", "", ""],
        *[[_center(x, True) for x in risk_values]],
        *[[_center(_checked(data.get("riesgo"), x), size=10) for x in risk_values]],
    ], colWidths=[FORM_W / 4] * 4, hAlign="CENTER")
    risk.setStyle(TableStyle([
        ("SPAN", (0, 0), (3, 0)), ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 1), BLUE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))

    verification_values = (("DE PASO", "DE_PASO"), ("PLANIFICADA", "PLANIFICADA"), ("FISCALIZACIONES/AUDITORÍAS", "FISCALIZACIONES/AUDITORÍAS"))
    verification = Table([
        [_center("TIPO DE VERIFICACIÓN", True), "", ""],
        [_center(label, True) for label, _ in verification_values],
        [_center(_checked(data.get("verificacion"), value), size=10) for _, value in verification_values],
        [_center("REPORTADO EN SAP", True), "", ""],
        [_center("SI", True), _center("NO", True), _center("ID", True)],
        [_center(_checked(data.get("sap"), "Si"), size=10), _center(_checked(data.get("sap"), "No"), size=10), _center(data.get("n_sap"))],
    ], colWidths=[FORM_W / 3] * 3, hAlign="CENTER")
    verification.setStyle(TableStyle([
        ("SPAN", (0, 0), (2, 0)), ("SPAN", (0, 3), (2, 3)),
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 1), BLUE), ("BACKGROUND", (0, 3), (-1, 4), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))

    categories_top = (
        ("MANEJO DE PRODUCTOS QUÍMICOS / SUSTANCIAS PELIGROSAS", "SUSPEL"),
        ("MANEJO DE RESIDUOS", "RESIDUOS"), ("ORDEN Y ASEO", "HOUSKEEPING"),
        ("DERRAMES AGUA DE PROCESO, HIDROCARBUROS, PRODUCTOS QUÍMICOS, RESIDUOS PELIGROSOS", "DERRAMES"),
    )
    category = Table([
        [_center("CATEGORÍA DE VERIFICACIÓN", True), "", "", ""],
        [_center(label, True, 7.3) for label, _ in categories_top],
        [_center(_checked(data.get("cat_insp"), value), size=10) for _, value in categories_top],
        [_center("INCUMPLIMIENTOS SIA / VERIFICACIÓN SIA", True, 7.3), _center("OTROS INCUMPLIMIENTOS DE INSTRUCTIVOS, PROCEDIMIENTOS Y REGLAMENTOS AMBIENTALES", True, 7.3), "", _center("VERIFICACIÓN RCA", True, 7.3)],
        [_center(_checked(data.get("cat_insp"), "SIA"), size=10), _center(_checked(data.get("cat_insp"), "ESTANDAR_AMBIENTAL"), size=10), "", _center(_checked(data.get("cat_insp"), "RCA"), size=10)],
    ], colWidths=[FORM_W / 4] * 4, rowHeights=[None, 18 * mm, 7 * mm, 16 * mm, 7 * mm], hAlign="CENTER")
    category.setStyle(TableStyle([
        ("SPAN", (0, 0), (3, 0)), ("SPAN", (1, 3), (2, 3)), ("SPAN", (1, 4), (2, 4)),
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 1), BLUE), ("BACKGROUND", (0, 3), (-1, 3), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return [risk, Spacer(1, 5 * mm), verification, Spacer(1, 5 * mm), category]


def _general_location_form(data: dict[str, Any]) -> Table:
    proxy = {"utm_coordx_inst": data.get("utm_coordx"), "utm_coordy_inst": data.get("utm_coordy")}
    x, y = data.get("utm_coordx"), data.get("utm_coordy")
    try:
        x, y = f"{float(x):,.0f}", f"{float(y):,.0f}"
    except (TypeError, ValueError):
        pass
    rows = [
        [_center("UBICACIÓN GEOGRÁFICA GENERAL", True), "", "", "", "", ""],
        [_center("N", True), _center(y), _center("E", True), _center(x), _center("DATUM", True), _center("WGS 84")],
        [_map_for_installation(proxy, map_w=90 * mm, map_h=63 * mm), "", "", "", "", ""],
    ]
    table = Table(rows, colWidths=[13 * mm, 40 * mm, 13 * mm, 40 * mm, 18 * mm, FORM_W - 124 * mm], rowHeights=[None, None, 65 * mm], hAlign="CENTER")
    table.setStyle(TableStyle([
        ("SPAN", (0, 0), (5, 0)), ("SPAN", (0, 2), (5, 2)),
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 0), BLUE), ("BACKGROUND", (0, 1), (0, 1), BLUE),
        ("BACKGROUND", (2, 1), (2, 1), BLUE), ("BACKGROUND", (4, 1), (4, 1), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 2), (5, 2), 0),
        ("RIGHTPADDING", (0, 2), (5, 2), 0),
        ("TOPPADDING", (0, 0), (-1, 1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, 1), 2),
    ]))
    return table


def _inspection_closure_form(cierre: dict[str, Any]) -> Table:
    rows = [
        [_center("INSPECCIÓN DE CIERRE", True), ""],
        [_center("REALIZADO POR", True), _center("TIPO", True)],
        [_center(cierre.get("autor_cierre") or cierre.get("autor")), _center(cierre.get("tipo_cierre") or cierre.get("tipo"))],
        [_center("FECHA", True), _center("HORA", True)],
        [_center(_date(cierre.get("fecha_cierre") or cierre.get("fecha"))), _center(cierre.get("hora_cierre") or cierre.get("hora"))],
        [_center("DESCRIPCIÓN", True), ""],
        [Paragraph(_escape(cierre.get("descrip_cierre") or cierre.get("desc")), ParagraphStyle("rt-close-desc", parent=S["normal"], fontSize=8.5, leading=11, leftIndent=3 * mm)), ""],
    ]
    table = Table(rows, colWidths=[FORM_W / 2] * 2, rowHeights=[None, None, None, None, None, None, 22 * mm], hAlign="CENTER")
    table.setStyle(TableStyle([
        ("SPAN", (0, 0), (1, 0)), ("SPAN", (0, 5), (1, 5)), ("SPAN", (0, 6), (1, 6)),
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 1), BLUE), ("BACKGROUND", (0, 3), (-1, 3), BLUE),
        ("BACKGROUND", (0, 5), (-1, 5), BLUE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return table


def _first_page(data: dict[str, Any]) -> list[Any]:
    """Primera página, replicando la distribución de la plantilla Word."""
    company = " | ".join(x for x in [_value(data.get("empresa"), ""), _value(data.get("empresa_otra"), "")] if x)
    header_rows = [
        [_center("N° FOLIO", True), "", "", _center("ESTADO", True), "", ""],
        [_center(data.get("folio")), "", "", _center(data.get("estado") or data.get("estado3")), "", ""],
        [_center("ÁREA MLP", True), "", "", _center("SUB ÁREA", True), "", ""],
        [_center(data.get("area_mlp")), "", "", _center(data.get("subarea_mlp") or data.get("subarea_otros_mlp")), "", ""],
        [_center("EMPRESA", True), "", "", _center("GERENCIA RESPONSABLE", True), "", ""],
        [_center(company), "", "", _center(data.get("gerencia")), "", ""],
        [_center("¿PARTICIPA PERSONAL DE LA EMPRESA EN LA INSPECCIÓN?", True), "", "", "", "", ""],
        [_center("SI", True), "", _center("NO", True), "", _center("NOMBRE DEL PERSONAL DE LA EMPRESA", True), ""],
        [_center(_checked(data.get("empresa_responsable"), "Si"), size=10), "", _center(_checked(data.get("empresa_responsable"), "No"), size=10), "", _center(data.get("nombre_responsable")), ""],
        [_center("INSPECCIÓN", True), "", "", "", "", ""],
        [_center("INICIAL", True), "", "", _center("SEGUIMIENTO", True), "", ""],
        [_center(_checked(data.get("tipo_insp"), "Inicial"), size=10), "", "", _center(_checked(data.get("tipo_insp"), "Seguimiento"), size=10), "", ""],
        [_center("REALIZADO POR", True), "", "", _center("OBRA/INSTALACIÓN/ACTIVIDAD", True), "", ""],
        [_center(data.get("autor")), "", "", _center(data.get("oia")), "", ""],
        [_center("FECHA", True), "", "", _center("HORA", True), "", ""],
        [_center(_date_long_es(data.get("fecha"))), "", "", _center(data.get("hora")), "", ""],
        ["", "", "", "", "", ""],
    ]
    spans = []
    for row in (0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15):
        spans += [("SPAN", (0, row), (2, row)), ("SPAN", (3, row), (5, row))]
    spans += [
        ("SPAN", (0, 6), (5, 6)),
        ("SPAN", (0, 7), (1, 7)), ("SPAN", (2, 7), (3, 7)), ("SPAN", (4, 7), (5, 7)),
        ("SPAN", (0, 8), (1, 8)), ("SPAN", (2, 8), (3, 8)), ("SPAN", (4, 8), (5, 8)),
        ("SPAN", (0, 9), (5, 9)), ("SPAN", (0, 16), (5, 16)),
    ]
    form = Table(header_rows, colWidths=[FORM_W / 6] * 6, hAlign="CENTER")
    form.setStyle(TableStyle([
        *spans, ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 0), BLUE), ("BACKGROUND", (0, 2), (-1, 2), BLUE),
        ("BACKGROUND", (0, 4), (-1, 4), BLUE), ("BACKGROUND", (0, 6), (-1, 7), BLUE),
        ("BACKGROUND", (0, 9), (-1, 10), BLUE), ("BACKGROUND", (0, 12), (-1, 12), BLUE),
        ("BACKGROUND", (0, 14), (-1, 14), BLUE), ("BACKGROUND", (0, 16), (-1, 16), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2),
    ]))

    description = Table([
        [_center("DESCRIPCIÓN GENERAL", True)],
        [Paragraph(f"• &nbsp;&nbsp;{_escape(data.get('descrip'))}", ParagraphStyle("rt-description", parent=S["normal"], fontSize=8.5, leading=12, leftIndent=7 * mm, rightIndent=5 * mm))],
    ], colWidths=[FORM_W], rowHeights=[None, 22 * mm], hAlign="CENTER")
    description.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 0), BLUE), ("VALIGN", (0, 1), (0, 1), "MIDDLE"),
    ]))

    multiple = Table([
        [_center("¿POSEE VARIAS ÁREAS DE INSPECCIÓN?", True), "", ""],
        [_center("SI", True), _center("NO", True), _center("N° DE ÁREAS DE INSPECCIÓN", True)],
        [_center(_checked(data.get("varias_inst"), "Si"), size=10), _center(_checked(data.get("varias_inst"), "No"), size=10), _center(data.get("nro_inst"))],
    ], colWidths=[FORM_W / 4, FORM_W / 4, FORM_W / 2], rowHeights=[None, None, 12 * mm], hAlign="CENTER")
    multiple.setStyle(TableStyle([
        ("SPAN", (0, 0), (2, 0)), ("GRID", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
        ("BACKGROUND", (0, 0), (-1, 1), BLUE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return _header(data) + [form, Spacer(1, 9 * mm), description, Spacer(1, 14 * mm), multiple, PageBreak()]


def build_story(data: dict[str, Any]) -> list[Any]:
    st: list[Any] = _first_page(data)

    for i, inst in enumerate(data.get("instalaciones") or [], 1):
        if i == 1:
            logos = _logo_row()
            if logos:
                st += [logos, Spacer(1, 7 * mm)]
            title = Table([[_center("INSTALACIONES Y ACCIONES", True, 9)]], colWidths=[FORM_W], hAlign="CENTER")
            title.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), BLUE),
                ("BOX", (0, 0), (-1, -1), .45, colors.HexColor("#555555")),
                ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]))
            st += [title, Spacer(1, 9 * mm)]
        elif i > 1:
            st += [Spacer(1, 6 * mm)]
        st += [_installation_form(inst), Spacer(1, 8 * mm)]
        st += photo_flowables(inst.get("adjuntos"), 145 * mm, 90 * mm)
        for j, action in enumerate(inst.get("acciones") or [], 1):
            if j > 1:
                st += [Spacer(1, 5 * mm)]
            st += [_action_form(action)]
            if action.get("adjuntos"):
                st += [Spacer(1, 5 * mm)] + photo_flowables(action["adjuntos"])
            if any(action.get(k) for k in ("autor_cierre_inst", "tipo_cierre_inst", "fecha_cierre_inst", "descrip_cierre_inst", "adjuntos_cierre")):
                st += [Spacer(1, 6 * mm), _action_closure_form(action), Spacer(1, 5 * mm)]
                if action.get("adjuntos_cierre"):
                    st += photo_flowables(action["adjuntos_cierre"], title="IMÁGENES ADJUNTAS DEL CIERRE")

    st += [PageBreak()]
    logos = _logo_row()
    if logos:
        st += [logos, Spacer(1, 4 * mm)]
    final_checks = _classification_form(data)
    # Los separadores internos originales son de 5 mm; se compactan para
    # mantener clasificación y mapa general en una sola página.
    compact_checks: list[Any] = []
    for flowable in final_checks:
        compact_checks.append(Spacer(1, 3 * mm) if isinstance(flowable, Spacer) else flowable)
    st += [KeepTogether(compact_checks + [Spacer(1, 4 * mm), _general_location_form(data)]), Spacer(1, 4 * mm)]
    if data.get("adjuntos"):
        st += photo_flowables(data["adjuntos"], title="IMÁGENES ADJUNTAS DE LA INSPECCIÓN")

    cierre = data.get("cierre") or {}
    if cierre:
        # El cierre continúa en el espacio disponible. ReportLab hará el salto
        # automáticamente solo cuando la tabla ya no quepa en la página.
        st += [Spacer(1, 5 * mm), KeepTogether([_inspection_closure_form(cierre)])]
        if cierre.get("adjuntos"):
            st += [Spacer(1, 5 * mm)] + photo_flowables(cierre["adjuntos"])
    return st


def generate_report(data: dict[str, Any], output: str | os.PathLike) -> Path:
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    RTDocTemplate(output).build(build_story(data))
    return output


def load_arcgis_record(gis, item_id: str, object_id: int) -> dict[str, Any]:
    """Carga cabecera, tablas relacionadas y adjuntos del feature service."""
    item = gis.content.get(item_id)
    main = item.layers[0]
    feature = main.query(object_ids=str(object_id), out_fields="*", return_geometry=True).features
    if not feature:
        raise LookupError(f"No existe objectid={object_id}")
    data = dict(feature[0].attributes)
    gid = str(data.get("globalid") or data.get("GlobalID") or "")

    def attachments(layer, oid):
        if not layer.properties.get("hasAttachments"):
            return []
        infos = layer.attachments.get_list(oid=oid)
        return [{"name": a.get("name"), "keywords": a.get("keywords") or "", "url": f"{layer.url}/{oid}/attachments/{a.get('id')}", "params": {"token": gis._con.token}} for a in infos]

    def split_action_attachments(items):
        normal, closing = [], []
        for attachment in items:
            marker = f"{attachment.get('keywords', '')} {attachment.get('name', '')}".lower()
            (closing if "cierre" in marker else normal).append(attachment)
        return normal, closing

    data["adjuntos"] = attachments(main, object_id)
    installations, action_tables, closes = [], [], []
    for table in list(item.tables) + list(item.layers[1:]):
        fields_lower = {f.name.lower(): f.name for f in table.properties.fields}
        parent = fields_lower.get("parentglobalid")
        if not parent:
            continue
        table_fields = {f.name.lower() for f in table.properties.fields}
        if "id_control_inst" in table_fields:
            action_tables.append((table, parent))
            continue
        safe_gid = gid.replace("'", "''")
        rows = table.query(where=f"{parent}='{safe_gid}'", out_fields="*", return_geometry=True).features
        for row in rows:
            record = dict(row.attributes)
            oid_field = table.properties.objectIdField
            record["adjuntos"] = attachments(table, record[oid_field])
            names = {k.lower() for k in record}
            if "id_instalacion" in names:
                installations.append(record)
            elif "estado_cierre" in names or "id_cierre" in names:
                closes.append(record)

    actions = []
    installation_gids = [str(x.get("globalid") or x.get("GlobalID") or "") for x in installations]
    for table, parent in action_tables:
        if not installation_gids:
            continue
        quoted = ",".join("'" + x.replace("'", "''") + "'" for x in installation_gids)
        rows = table.query(where=f"{parent} IN ({quoted})", out_fields="*", return_geometry=True).features
        for row in rows:
            record = dict(row.attributes)
            oid = record[table.properties.objectIdField]
            record["adjuntos"], record["adjuntos_cierre"] = split_action_attachments(attachments(table, oid))
            actions.append(record)

    action_by_parent: dict[str, list[dict[str, Any]]] = {}
    for action in actions:
        action_by_parent.setdefault(str(action.get("parentglobalid", "")).lower(), []).append(action)
    for inst in installations:
        inst["acciones"] = action_by_parent.get(str(inst.get("globalid", "")).lower(), [])
    data["instalaciones"] = installations
    if closes:
        data["cierre"] = closes[0]
    return data


def report_name(data: dict[str, Any], object_id: int | None = None) -> str:
    folio = _value(data.get("folio"), "sin_folio")
    year = _value(data.get("ano_insp"), str(dt.datetime.now().year))
    suffix = f"_OID{object_id}" if object_id is not None else ""
    return f"F-MA-018_REPORTE_TERRENO_Folio_{folio}_{year}{suffix}.pdf"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--json", type=Path, help="Datos normalizados de entrada")
    source.add_argument("--objectid", type=int, help="ObjectID a consultar en ArcGIS")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--item-id", default=FEATURE_ITEM_ID)
    args = parser.parse_args()
    if args.json:
        data = json.loads(args.json.read_text(encoding="utf-8"))
    else:
        data = load_arcgis_record(connect_gis(), args.item_id, args.objectid)
    output = args.output or Path("reportes_reportlab") / report_name(data, args.objectid)
    print(generate_report(data, output))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
