# ProjectName SDK exists test

import pytest
from gregorianlunarcalendar_sdk import GregorianLunarCalendarSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GregorianLunarCalendarSDK.test(None, None)
        assert testsdk is not None
