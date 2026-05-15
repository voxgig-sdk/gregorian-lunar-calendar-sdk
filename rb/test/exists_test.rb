# GregorianLunarCalendar SDK exists test

require "minitest/autorun"
require_relative "../GregorianLunarCalendar_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GregorianLunarCalendarSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
