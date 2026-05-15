# GregorianLunarCalendar SDK utility: feature_add
module GregorianLunarCalendarUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
