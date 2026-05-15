# GregorianLunarCalendar SDK utility: make_context
require_relative '../core/context'
module GregorianLunarCalendarUtilities
  MakeContext = ->(ctxmap, basectx) {
    GregorianLunarCalendarContext.new(ctxmap, basectx)
  }
end
