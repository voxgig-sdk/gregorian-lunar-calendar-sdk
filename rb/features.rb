# GregorianLunarCalendar SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GregorianLunarCalendarFeatures
  def self.make_feature(name)
    case name
    when "base"
      GregorianLunarCalendarBaseFeature.new
    when "ratelimit"
      GregorianLunarCalendarRatelimitFeature.new
    when "retry"
      GregorianLunarCalendarRetryFeature.new
    when "test"
      GregorianLunarCalendarTestFeature.new
    when "timeout"
      GregorianLunarCalendarTimeoutFeature.new
    else
      GregorianLunarCalendarBaseFeature.new
    end
  end
end
