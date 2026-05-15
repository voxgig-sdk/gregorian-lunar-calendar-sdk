# GregorianLunarCalendar SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GregorianLunarCalendarFeatures
  def self.make_feature(name)
    case name
    when "base"
      GregorianLunarCalendarBaseFeature.new
    when "test"
      GregorianLunarCalendarTestFeature.new
    else
      GregorianLunarCalendarBaseFeature.new
    end
  end
end
