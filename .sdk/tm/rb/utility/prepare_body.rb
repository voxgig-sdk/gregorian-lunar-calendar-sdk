# GregorianLunarCalendar SDK utility: prepare_body
require_relative 'media'
module GregorianLunarCalendarUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return GregorianLunarCalendarUtilities.raw_body(ctx.reqdata) if GregorianLunarCalendarUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
