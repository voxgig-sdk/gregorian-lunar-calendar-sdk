# GregorianLunarCalendar SDK utility: make_context

from gregorianlunarcalendar_sdk.core.context import GregorianLunarCalendarContext


def make_context_util(ctxmap, basectx):
    return GregorianLunarCalendarContext(ctxmap, basectx)
