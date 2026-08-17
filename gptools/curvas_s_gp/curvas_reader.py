# -*- coding: utf-8 -*-
"""Lectura de Curvas S desde AVANCE PROGRAMA del libro maestro de sondajes."""

from curvas_avance_programa import read_avance_programa


OUTPUT_FIELDS = ["TIPO", "FECHA", "AÑO", "MES", "PRESUPUESTO", "REAL"]


def read_curvas(path):
    result, _source, metrics = read_avance_programa(path)
    result = result[OUTPUT_FIELDS].copy()
    metrics.update({
        "categorias": sorted(result["TIPO"].dropna().unique().tolist()),
        "anios": sorted(int(value) for value in result["AÑO"].dropna().unique()),
        "registros": int(len(result)),
    })
    return result, metrics
