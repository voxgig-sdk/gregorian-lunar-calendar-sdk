# GregorianLunarCalendar SDK feature factory

from gregorianlunarcalendar_sdk.feature.base_feature import GregorianLunarCalendarBaseFeature
from gregorianlunarcalendar_sdk.feature.test_feature import GregorianLunarCalendarTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GregorianLunarCalendarBaseFeature(),
        "test": lambda: GregorianLunarCalendarTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
